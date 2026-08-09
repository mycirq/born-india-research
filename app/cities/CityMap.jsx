'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toneColor } from '../data/cities';

const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

/**
 * Real basemap: CARTO light raster tiles, brand-tinted in CSS.
 *
 * Tiles are laid out as a plain <img> mosaic in the DOM rather than drawn into
 * a canvas, so pins stay real buttons with 44px touch targets and labels stay
 * selectable text.
 */
export default function CityMap({ city, pins, selected, onSelect }) {
  const mapRef = useRef(null);
  const measurerRef = useRef(null);
  const [zdelta, setZdelta] = useState(0);
  const [center, setCenter] = useState(null);
  const [layout, setLayout] = useState({ tiles: [], pins: [], labels: [], scale: null, fitted: true });

  const build = useCallback(() => {
    const el = mapRef.current;
    if (!el || !pins.length) return;
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;

    const lons = pins.map((p) => p.lon), lats = pins.map((p) => p.lat);
    const pad = w < 460 ? 0.16 : 0.24;
    const spanLon = Math.max(...lons) - Math.min(...lons) || 0.05;
    const fitLon = (Math.max(...lons) + Math.min(...lons)) / 2;
    const fitLat = (Math.max(...lats) + Math.min(...lats)) / 2;
    const cLon = center ? center[0] : fitLon;
    const cLat = center ? center[1] : fitLat;

    // Highest web-mercator zoom that still fits the padded bbox, then the
    // user's zoom delta on top.
    const yTop = merc(Math.max(...lats)), yBot = merc(Math.min(...lats));
    let fit = 14;
    for (; fit > 3; fit--) {
      const wp = 256 * Math.pow(2, fit);
      if ((spanLon / 360) * wp <= w * (1 - pad) && (Math.abs(yTop - yBot) / (2 * Math.PI)) * wp <= h * (1 - pad)) break;
    }
    const z = Math.max(4, Math.min(16, fit + zdelta));
    const world = 256 * Math.pow(2, z);
    const toPx = (lon, lat) => [
      ((lon + 180) / 360) * world,
      ((Math.PI - merc(lat)) / (2 * Math.PI)) * world,
    ];
    const c = toPx(cLon, cLat);
    const originX = c[0] - w / 2, originY = c[1] - h / 2;

    const tiles = [];
    const x0 = Math.floor(originX / 256), x1 = Math.floor((originX + w) / 256);
    const y0 = Math.floor(originY / 256), y1 = Math.floor((originY + h) / 256);
    const max = Math.pow(2, z);
    const sub = ['a', 'b', 'c'];
    let n = 0;
    for (let tx = x0; tx <= x1; tx++) {
      for (let ty = y0; ty <= y1; ty++) {
        if (ty < 0 || ty >= max) continue;
        const wx = ((tx % max) + max) % max;
        tiles.push({
          key: `${z}/${wx}/${ty}`,
          url: `https://${sub[n++ % 3]}.basemaps.cartocdn.com/light_all/${z}/${wx}/${ty}@2x.png`,
          x: Math.round(tx * 256 - originX),
          y: Math.round(ty * 256 - originY),
        });
      }
    }

    const compact = w < 460;
    const laid = pins.map((p, i) => {
      const q = toPx(p.lon, p.lat);
      return { i, name: p.name, num: i + 1, tone: p.tone, on: selected === i, x: q[0] - originX, y: q[1] - originY };
    });

    // Marker de-collision. Pins land at their exact projected pixel, which at
    // low zoom puts clustered micro-markets inside each other's 44px touch
    // target and makes one untappable. Nudge apart to a minimum centre
    // distance; a couple of pixels off true position is immaterial here.
    const minSep = compact ? 40 : 34;
    for (let pass = 0; pass < 12; pass++) {
      let moved = false;
      for (let a = 0; a < laid.length; a++) {
        for (let b = a + 1; b < laid.length; b++) {
          const A = laid[a], B = laid[b];
          let dx = B.x - A.x, dy = B.y - A.y;
          let d = Math.hypot(dx, dy);
          if (d >= minSep) continue;
          if (d < 0.01) { dx = b % 2 ? 1 : -1; dy = b % 3 ? 1 : -1; d = Math.hypot(dx, dy); }
          const push = (minSep - d) / 2;
          const ux = (dx / d) * push, uy = (dy / d) * push;
          A.x -= ux; A.y -= uy; B.x += ux; B.y += uy;
          moved = true;
        }
      }
      if (!moved) break;
    }
    laid.forEach((p) => {
      p.x = Math.round(Math.max(22, Math.min(w - 22, p.x)));
      p.y = Math.round(Math.max(22, Math.min(h - 22, p.y)));
    });

    // Label placement: four-side collision pass, clamped in bounds.
    const labels = [];
    if (!compact) {
      const boxes = laid.map((p) => ({ x0: p.x - 22, y0: p.y - 22, x1: p.x + 22, y1: p.y + 22 }));
      if (!measurerRef.current) measurerRef.current = document.createElement('canvas').getContext('2d');
      const m = measurerRef.current;
      m.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      // Selected pin places first so its label is never the one dropped.
      [...laid].sort((a, b) => (b.on ? 1 : 0) - (a.on ? 1 : 0)).forEach((p) => {
        const txt = p.name.toUpperCase();
        const bw = Math.ceil(m.measureText(txt).width + txt.length * 11 * 0.16 + 16);
        const bh = 21, gap = 18;
        const cands = [
          { x: p.x - bw / 2, y: p.y - gap - bh },
          { x: p.x - bw / 2, y: p.y + gap },
          { x: p.x + gap, y: p.y - bh / 2 },
          { x: p.x - gap - bw, y: p.y - bh / 2 },
        ];
        const ok = (b) =>
          b.x >= 4 && b.x + bw <= w - 4 && b.y >= 4 && b.y + bh <= h - 4 &&
          !boxes.some((r) => !(b.x + bw < r.x0 || b.x > r.x1 || b.y + bh < r.y0 || b.y > r.y1));
        let box = cands.find(ok);
        for (let r = 34; !box && r <= 82; r += 16) {
          for (let a = 0; a < 12 && !box; a++) {
            const rad = ((a * 30 - 90) * Math.PI) / 180;
            const t = { x: p.x + Math.cos(rad) * r - bw / 2, y: p.y + Math.sin(rad) * r - bh / 2 };
            if (ok(t)) box = t;
          }
        }
        // Still nothing: drop the label rather than stack it on a neighbour.
        // The numbered marker plus the chip legend still identifies it.
        if (!box) return;
        boxes.push({ x0: box.x, y0: box.y, x1: box.x + bw, y1: box.y + bh });
        labels.push({ name: p.name, x: Math.round(box.x), y: Math.round(box.y), on: p.on });
      });
    }

    const kmPx = (world / 40075) * Math.cos((cLat * Math.PI) / 180);
    const steps = [1, 2, 5, 10, 20, 25, 50, 100];
    const want = (w < 460 ? 70 : 100) / kmPx;
    const km = steps.reduce((b, s) => (Math.abs(s - want) < Math.abs(b - want) ? s : b), steps[0]);

    setLayout({
      tiles, pins: laid, labels,
      fitted: zdelta === 0 && !center,
      scale: { px: Math.round(km * kmPx), label: `${km} KM` },
    });
  }, [pins, zdelta, center, selected]);

  useEffect(() => { build(); }, [build]);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => build());
    ro.observe(el);
    let t = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - t < 220) return; // throttle so a trackpad flick is one step
      t = now;
      setZdelta((d) => Math.max(-2, Math.min(6, d + (e.deltaY < 0 ? 1 : -1))));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', onWheel); };
  }, [build]);

  const selectPin = (i) => {
    onSelect(i);
    setCenter([pins[i].lon, pins[i].lat]);
    setZdelta((d) => Math.max(d, 2));
  };

  const ctrl = {
    width: 34, height: 34, display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 1,
    background: 'rgba(255,253,248,.94)', border: '1px solid var(--line-strong)',
    borderRadius: 'var(--radius-1)', color: 'var(--ink-900)', cursor: 'pointer',
    transition: 'var(--transition)',
  };

  return (
    <div
      ref={mapRef}
      style={{
        position: 'relative', border: '1px solid var(--line-strong)',
        borderRadius: 'var(--radius-2)', background: 'var(--paper-sunk)',
        overflow: 'hidden', aspectRatio: '4/3', touchAction: 'manipulation',
      }}
    >
      {/* Basemap, desaturated and warmed to sit inside the paper palette */}
      <div style={{ position: 'absolute', inset: 0, filter: 'grayscale(1) sepia(.5) saturate(.62) brightness(1.02) contrast(1.04)' }}>
        {layout.tiles.map((t) => (
          <img key={t.key} src={t.url} alt="" style={{ position: 'absolute', left: t.x, top: t.y, width: 257, height: 257, display: 'block' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--laterite-100)', mixBlendMode: 'multiply', opacity: 0.24, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(21,19,14,.06)', pointerEvents: 'none' }} />

      {layout.labels.map((l) => (
        <span
          key={l.name}
          style={{
            position: 'absolute', left: l.x, top: l.y, ...label,
            padding: '4px 7px', borderRadius: 'var(--radius-1)',
            background: l.on ? 'var(--ink-900)' : 'rgba(255,253,248,.92)',
            color: l.on ? 'var(--paper)' : 'var(--ink-900)',
            border: '1px solid ' + (l.on ? 'var(--ink-900)' : 'var(--line-strong)'),
            whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 3,
          }}
        >
          {l.name}
        </span>
      ))}

      {layout.pins.map((p) => (
        <button
          key={p.i}
          onClick={() => selectPin(p.i)}
          aria-label={p.name}
          style={{
            position: 'absolute', left: p.x, top: p.y, width: 44, height: 44,
            margin: '-22px 0 0 -22px', display: 'grid', placeItems: 'center',
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            zIndex: p.on ? 5 : 2,
          }}
        >
          <span
            style={{
              display: 'grid', placeItems: 'center',
              width: p.on ? 30 : 24, height: p.on ? 30 : 24, borderRadius: '50%',
              background: p.on ? 'var(--ink-900)' : toneColor(p.tone),
              border: '2px solid var(--paper)',
              boxShadow: `0 0 0 1px ${toneColor(p.tone)},0 1px 3px rgba(21,19,14,.28)`,
              fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11,
              color: 'var(--paper)', transition: 'var(--transition)',
            }}
          >
            {p.num}
          </span>
        </button>
      ))}

      <div style={{ position: 'absolute', top: 12, left: 14, ...label, color: 'var(--ink-700)', pointerEvents: 'none', whiteSpace: 'nowrap', textShadow: '0 1px 0 rgba(247,244,236,.9)', zIndex: 4 }}>
        {city.name} · micro-markets
      </div>

      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 6 }}>
        <button onClick={() => setZdelta((d) => Math.min(6, d + 1))} aria-label="Zoom in" style={ctrl}>+</button>
        <button onClick={() => setZdelta((d) => Math.max(-2, d - 1))} aria-label="Zoom out" style={ctrl}>−</button>
        {!layout.fitted && (
          <button
            onClick={() => { setZdelta(0); setCenter(null); }}
            aria-label="Fit all micro-markets"
            style={{ ...ctrl, fontSize: 9, fontWeight: 500, letterSpacing: '.06em', background: 'var(--ink-900)', borderColor: 'var(--ink-900)', color: 'var(--paper)' }}
          >
            FIT
          </button>
        )}
      </div>

      {layout.scale && (
        <div style={{ position: 'absolute', bottom: 10, right: 14, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none', zIndex: 4 }}>
          <span style={{ display: 'block', height: 5, width: layout.scale.px, borderBottom: '1.5px solid var(--ink-700)', borderLeft: '1.5px solid var(--ink-700)', borderRight: '1.5px solid var(--ink-700)' }} />
          <span style={{ ...label, color: 'var(--ink-700)', textShadow: '0 1px 0 rgba(247,244,236,.9)' }}>{layout.scale.label}</span>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 10, left: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--ink-500)', pointerEvents: 'none', textShadow: '0 1px 0 rgba(247,244,236,.9)', zIndex: 4 }}>
        © OpenStreetMap · © CARTO
      </div>
    </div>
  );
}
