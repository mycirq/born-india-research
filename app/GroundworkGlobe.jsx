'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import { CITIES } from './data/cities';

const INDIA_ID = '356';
const START = [-140, -30];
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Three viewing levels: 0 the spinning globe, 1 zoomed to India, 2 zoomed to a
 * city. `level` and `selected` are owned by the page so the cards, chips and
 * detail panel stay in sync; the animation state lives in refs here.
 */
export default function GroundworkGlobe({ selected, level, onPick, onLevel }) {
  const canvasRef = useRef(null);
  const s = useRef({
    ctx: null, projection: null, path: null, graticule: null,
    land: null, india: null, borders: null,
    landHi: null, indiaHi: null, bordersHi: null,
    focusRot: null, indiaK: null,
    rot: START.slice(), zoom: 0, target: 0, cityZoom: 0, cityTarget: 0,
    t0: null, hover: null, raf: 0, size: 0, baseScale: 0,
    offscreen: false, base: null, baseKey: '', lastFrame: 0, settled: false,
    ro: null, io: null, mounted: false,
  }).current;

  // Mirror props into refs so the rAF loop never reads stale values.
  const levelRef = useRef(level);
  const selectedRef = useRef(selected);
  const onPickRef = useRef(onPick);
  const onLevelRef = useRef(onLevel);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { selectedRef.current = selected; }, [selected]);
  useEffect(() => { onPickRef.current = onPick; onLevelRef.current = onLevel; });

  // Zoom targets follow the level. Level 2 also drills to the selected city.
  useEffect(() => {
    if (level === 0) { s.target = 0; s.cityTarget = 0; }
    else if (level === 1) { s.target = 1; s.cityTarget = 0; }
    else { s.target = 1; s.cityTarget = 1; }
  }, [level, selected, s]);

  useEffect(() => {
    s.mounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const css = (n, f) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      return v || f;
    };

    const resize = () => {
      if (!canvas || !s.ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 500;
      canvas.width = w * dpr;
      canvas.height = w * dpr;
      s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.size = w;
      s.baseScale = w / 2 - 12;
      s.projection.translate([w / 2, w / 2]);
      s.baseKey = ''; // force the cached base layer to repaint
    };

    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };

    const nearestCity = (p) => {
      let hit = null;
      CITIES.forEach((c) => {
        const q = s.projection([c.lon, c.lat]);
        if (q && Math.hypot(q[0] - p[0], q[1] - p[1]) < 18) hit = c;
      });
      return hit;
    };

    const goBack = () => {
      if (levelRef.current === 2) onLevelRef.current(1);
      else onLevelRef.current(0);
    };

    const onClick = (e) => {
      if (!s.projection) return;
      const p = local(e);
      const hit = nearestCity(p);
      if (hit) return onPickRef.current(hit.id);
      const geo = s.projection.invert(p);
      const inside = geo && s.india && d3.geoContains(s.india, geo);
      if (inside && levelRef.current === 0) onLevelRef.current(1);
      else if (!inside && levelRef.current > 0) goBack();
    };

    const onMove = (e) => {
      if (!s.projection) return;
      const hit = nearestCity(local(e));
      s.hover = hit ? hit.id : null;
      canvas.style.cursor = hit ? 'pointer' : 'default';
    };

    const palette = () => ({
      india: css('--laterite-500', '#a8461d'),
      ink: css('--ink-900', '#15130e'),
      muted: css('--ink-500', '#6b6455'),
      paper: css('--paper', '#f7f4ec'),
      grat: css('--line-strong', '#d6cfbe'),
    });

    const drawBase = (ctx, z, cz) => {
      const size = s.size;
      const C = {
        sphere: css('--paper-sunk', '#f0ece0'),
        grat: css('--line-strong', '#d6cfbe'),
        land: css('--ink-100', '#cfc8b8'),
        india: css('--laterite-500', '#a8461d'),
        indiaSoft: css('--laterite-100', '#f3e4db'),
        ink: css('--ink-900', '#15130e'),
      };
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2); ctx.clip();

      ctx.beginPath(); s.path({ type: 'Sphere' });
      ctx.fillStyle = C.sphere; ctx.fill();

      ctx.beginPath(); s.path(s.graticule);
      ctx.strokeStyle = C.grat; ctx.globalAlpha = 0.5 * (1 - z * 0.7); ctx.lineWidth = 0.5; ctx.stroke();
      ctx.globalAlpha = 1;

      // Detailed geometry only once we are zoomed in AND motion has stopped.
      // Painting 50m while the city zoom is still animating is what caused the
      // stutter when drilling into a city: every frame missed the cache and
      // re-pathed high-resolution world geometry at 3.4x scale.
      const hi = z > 0.85 && s.settled && s.landHi;
      const land = hi ? s.landHi : s.land;
      const borders = hi ? s.bordersHi : s.borders;
      const india = hi ? s.indiaHi : s.india;

      if (land) {
        ctx.beginPath(); s.path(land);
        ctx.fillStyle = C.land; ctx.globalAlpha = 1 - z * 0.5; ctx.fill(); ctx.globalAlpha = 1;

        ctx.beginPath(); s.path(borders);
        ctx.strokeStyle = C.grat; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.75; ctx.stroke();
        ctx.globalAlpha = 1;

        if (india) {
          ctx.beginPath(); s.path(india);
          ctx.fillStyle = C.india; ctx.globalAlpha = 1 - z; ctx.fill();
          ctx.fillStyle = C.indiaSoft; ctx.globalAlpha = z * (1 - cz * 0.45); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = C.india; ctx.lineWidth = 1.4 + z * 0.9; ctx.lineJoin = 'round'; ctx.stroke();
        }
      }
      ctx.restore();

      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
      ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.26 * (1 - z * 0.6); ctx.lineWidth = 1; ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawCities = (ctx, C, el, z) => {
      const center = [-s.rot[0], -s.rot[1]];
      const sel = selectedRef.current;
      const placed = [];
      const visible = [];

      CITIES.forEach((c, i) => {
        if (d3.geoDistance([c.lon, c.lat], center) > Math.PI / 2) return;
        const p = s.projection([c.lon, c.lat]);
        if (!p) return;
        const isSel = sel === c.id && levelRef.current === 2;
        const on = s.hover === c.id || isSel;
        visible.push({ c, i, p, on });
        placed.push({ x0: p[0] - 14, y0: p[1] - 14, x1: p[0] + 14, y1: p[1] + 14 });
      });

      visible.forEach(({ c, i, p, on }) => {
        // Click affordance: a slow expanding ring on every city.
        const phase = (el * 0.5 + i * 0.25) % 1;
        ctx.beginPath(); ctx.arc(p[0], p[1], 3 + phase * (on ? 20 : 13), 0, Math.PI * 2);
        ctx.strokeStyle = C.india; ctx.globalAlpha = (1 - phase) * (on ? 0.6 : 0.34);
        ctx.lineWidth = 1.1; ctx.stroke(); ctx.globalAlpha = 1;

        // Hit-target ring, always visible so the marker reads as a control.
        ctx.beginPath(); ctx.arc(p[0], p[1], on ? 13 : 10, 0, Math.PI * 2);
        ctx.strokeStyle = on ? C.ink : C.muted; ctx.globalAlpha = on ? 0.75 : 0.4;
        ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;

        ctx.beginPath(); ctx.arc(p[0], p[1], on ? 5 : 3.4, 0, Math.PI * 2);
        ctx.fillStyle = on ? C.ink : C.india; ctx.fill();
        ctx.strokeStyle = C.paper; ctx.lineWidth = 1.4; ctx.stroke();

        if (z > 0.3) {
          ctx.globalAlpha = Math.min(1, (z - 0.3) / 0.35);
          const text = c.name.toUpperCase();
          ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
          const tw = ctx.measureText(text).width;
          const bw = tw + 14, bh = 20;
          const gap = on ? 13 : 10;

          // Candidate anchors in preference order: above, below, right, left.
          // Tested against every marker disc and every label already placed, so
          // a tight pair splits apart instead of one box burying the other.
          const cands = [
            { x: p[0] - bw / 2, y: p[1] - gap - 14 - bh, sx: p[0] },
            { x: p[0] - bw / 2, y: p[1] + gap + 14, sx: p[0] },
            { x: p[0] + gap + 12, y: p[1] - bh / 2, sx: null },
            { x: p[0] - gap - 12 - bw, y: p[1] - bh / 2, sx: null },
          ];
          const hits = (b) =>
            placed.some((q) => !(b.x + bw < q.x0 || b.x > q.x1 || b.y + bh < q.y0 || b.y > q.y1));
          let box = cands.find((b) => !hits(b));
          if (!box) {
            box = { ...cands[0] };
            for (let k = 0; k < 8 && hits(box); k++) box.y -= bh + 6;
          }
          placed.push({ x0: box.x, y0: box.y, x1: box.x + bw, y1: box.y + bh });

          ctx.strokeStyle = on ? C.ink : C.muted;
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (box.sx != null) {
            ctx.moveTo(p[0], box.y < p[1] ? box.y + bh : box.y);
            ctx.lineTo(p[0], box.y < p[1] ? p[1] - gap : p[1] + gap);
          } else {
            const side = box.x > p[0] ? -1 : 1;
            ctx.moveTo(box.x + (side < 0 ? 0 : bw), p[1]);
            ctx.lineTo(p[0] + gap * -side, p[1]);
          }
          ctx.stroke();

          ctx.fillStyle = on ? C.ink : C.paper;
          ctx.strokeStyle = on ? C.ink : C.grat;
          ctx.beginPath(); ctx.rect(box.x, box.y, bw, bh); ctx.fill(); ctx.stroke();
          ctx.fillStyle = on ? C.paper : C.ink;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(text, box.x + bw / 2, box.y + bh / 2 + 0.5);
          ctx.textAlign = 'start';
          ctx.globalAlpha = 1;
        }
      });
    };

    // The sphere, graticule, landmasses and India outline only change when the
    // projection changes. They are painted into an offscreen canvas and blitted
    // each frame, so an idle globe costs one drawImage plus four markers.
    const draw = (el, z, cz) => {
      const ctx = s.ctx, size = s.size;
      if (!ctx) return;

      // While anything is moving every frame is a cache miss, so the offscreen
      // canvas costs a full repaint *plus* a blit. Draw straight to the visible
      // canvas during motion and only cache once the view settles.
      if (!s.settled) {
        ctx.clearRect(0, 0, size, size);
        drawBase(ctx, z, cz);
        drawCities(ctx, palette(), el, z);
        s.baseKey = '';
        return;
      }

      const key =
        s.rot[0].toFixed(2) + ',' + s.rot[1].toFixed(2) + ',' +
        s.projection.scale().toFixed(1) + ',' + size + ',' +
        (z > 0.85 && s.landHi ? 'hi' : 'lo') + ',' + z.toFixed(2);
      if (key !== s.baseKey) {
        if (!s.base || s.base.width !== ctx.canvas.width) {
          s.base = document.createElement('canvas');
          s.base.width = ctx.canvas.width;
          s.base.height = ctx.canvas.height;
        }
        const bctx = s.base.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bctx.clearRect(0, 0, size, size);
        s.path.context(bctx);
        drawBase(bctx, z, cz);
        s.path.context(ctx);
        s.baseKey = key;
      }
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(s.base, 0, 0, size, size);
      drawCities(ctx, palette(), el, z);
    };

    const loop = () => {
      const tick = (now) => {
        if (!s.mounted) return;
        s.raf = requestAnimationFrame(tick);

        // Cap at ~30fps. State still advances while the globe is off screen (so
        // it is settled by the time you scroll to it) but nothing is painted.
        if (now - (s.lastFrame || 0) < 33) return;
        s.lastFrame = now;

        if (s.t0 === null) s.t0 = now;
        const el = (now - s.t0) / 1000;
        const intro = Math.min(1, el / 1.8);
        const e = easeOutCubic(intro);

        s.zoom += (s.target - s.zoom) * 0.055;
        s.cityZoom += (s.cityTarget - s.cityZoom) * 0.06;
        // Snap the tail of the easing so "settled" is reached instead of
        // asymptotically approached, which would keep us on the slow path.
        if (Math.abs(s.target - s.zoom) < 0.002) s.zoom = s.target;
        if (Math.abs(s.cityTarget - s.cityZoom) < 0.002) s.cityZoom = s.cityTarget;
        const wasSettled = s.settled;
        s.settled = s.zoom === s.target && s.cityZoom === s.cityTarget && intro >= 1;
        if (s.settled && !wasSettled) s.baseKey = ''; // repaint once at full detail
        const z = easeInOut(Math.max(0, Math.min(1, s.zoom)));
        const cz = easeInOut(Math.max(0, Math.min(1, s.cityZoom)));

        const fr = s.focusRot || [-80, -14];
        const spun = [lerp(START[0], fr[0], e), lerp(START[1], fr[1], e)];
        const city = CITIES.find((c) => c.id === selectedRef.current) || CITIES[0];
        const cityRot = [-city.lon, -city.lat];
        const base = [lerp(spun[0], fr[0], z), lerp(spun[1], fr[1], z)];
        s.rot = [lerp(base[0], cityRot[0], cz), lerp(base[1], cityRot[1], cz)];

        const indiaScale = s.indiaK ? s.size * s.indiaK : s.baseScale;
        const cityScale = indiaScale * 3.4;
        const scale = lerp(lerp(s.baseScale, indiaScale, z), cityScale, cz);
        s.projection.rotate(s.rot).scale(scale);

        if (levelRef.current === 0 && s.zoom > 0.5) onLevelRef.current(1);
        if (!s.offscreen) draw(el, z, cz);
      };
      s.raf = requestAnimationFrame(tick);
    };

    s.ctx = canvas.getContext('2d');
    s.projection = d3.geoOrthographic().rotate(s.rot).precision(0.4);
    s.path = d3.geoPath(s.projection, s.ctx);
    s.graticule = d3.geoGraticule10();
    resize();
    s.ro = new ResizeObserver(resize); s.ro.observe(canvas);
    s.io = new IntersectionObserver((es) => { s.offscreen = !es[0].isIntersecting; }, { threshold: 0 });
    s.io.observe(canvas);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', () => { s.hover = null; });
    loop();

    const load = (u) => fetch(u).then((r) => r.json());
    load('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((topo) => {
        if (!s.mounted) return;
        const fc = topojson.feature(topo, topo.objects.countries);
        s.land = { type: 'FeatureCollection', features: fc.features.filter((f) => String(f.id) !== INDIA_ID) };
        s.india = fc.features.find((f) => String(f.id) === INDIA_ID) || null;
        s.borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);

        // 110m is what animates; 50m swaps in only once we are zoomed into
        // India, where the coarse outline reads as a cartoon and motion has
        // stopped. Drawing 50m every frame is what made this page lag.
        load('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
          .then((hi) => {
            if (!s.mounted) return;
            const hfc = topojson.feature(hi, hi.objects.countries);
            s.landHi = { type: 'FeatureCollection', features: hfc.features.filter((f) => String(f.id) !== INDIA_ID) };
            s.indiaHi = hfc.features.find((f) => String(f.id) === INDIA_ID) || null;
            s.bordersHi = topojson.mesh(hi, hi.objects.countries, (a, b) => a !== b);
            s.baseKey = '';
          })
          .catch(() => {});

        if (s.india) {
          const c = d3.geoCentroid(s.india);
          s.focusRot = [-c[0], -c[1]];
          const probe = d3.geoOrthographic().rotate(s.focusRot).translate([0, 0]).scale(1).precision(0.4);
          const b = d3.geoPath(probe).bounds(s.india);
          s.indiaK = 0.72 / Math.max(b[1][0] - b[0][0], b[1][1] - b[0][1]);
        }
        s.target = 1; // drill into India automatically
      })
      .catch(() => { s.land = null; });

    return () => {
      s.mounted = false;
      cancelAnimationFrame(s.raf);
      if (s.ro) s.ro.disconnect();
      if (s.io) s.io.disconnect();
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', maxWidth: 560, aspectRatio: '1', display: 'block', touchAction: 'manipulation' }}
    />
  );
}
