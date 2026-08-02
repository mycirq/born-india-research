'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const CITIES = [
  { name: 'Gurgaon', lon: 77.03, lat: 28.46, dx: -14, dy: -12, anchor: 'right' },
  { name: 'Mumbai', lon: 72.88, lat: 19.08, dx: -14, dy: 4, anchor: 'right' },
  { name: 'Bengaluru', lon: 77.59, lat: 12.97, dx: 14, dy: 10, anchor: 'left' },
  { name: 'Dehradun', lon: 78.03, lat: 30.32, dx: 14, dy: -10, anchor: 'left' },
];
const INDIA_ID = '356';
const FOCUS = [-80, -14];
const START = [-140, -30];
const SPIN_SPEED = 2.5;
const GLOBE_STYLE = 'solid';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

export default function Globe() {
  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const s = useRef({
    ctx: null, projection: null, path: null, graticule: null,
    land: null, india: null, borders: null, focusRot: null, indiaK: null,
    rot: START.slice(), hoverCity: null, pointerCity: null,
    zoom: 0, target: 0, t0: null, raf: 0, size: 0, baseScale: 0, ro: null,
  }).current;

  const setZoom = (on) => { s.target = on ? 1 : 0; setZoomed(on); };

  useEffect(() => {
    let mounted = true;
    const canvas = canvasRef.current;

    const css = (name, fb) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    };
    const resize = () => {
      if (!canvas || !s.ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 480;
      canvas.width = w * dpr; canvas.height = w * dpr;
      s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.size = w; s.baseScale = w / 2 - 12;
      s.projection.translate([w / 2, w / 2]);
    };
    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onClick = (e) => {
      if (!s.india || !s.projection) return;
      const geo = s.projection.invert(local(e));
      const inside = geo && d3.geoContains(s.india, geo);
      if (inside && s.target === 0) setZoom(true);
      else if (!inside && s.target === 1) setZoom(false);
    };
    const onMove = (e) => {
      if (!s.projection) return;
      const p = local(e);
      let near = null;
      CITIES.forEach((c) => {
        const q = s.projection([c.lon, c.lat]);
        if (q && Math.hypot(q[0] - p[0], q[1] - p[1]) < 12) near = c.name;
      });
      s.pointerCity = near;
      const geo = s.projection.invert(p);
      const overIndia = geo && s.india && d3.geoContains(s.india, geo);
      canvas.style.cursor = near || overIndia ? 'pointer' : 'default';
    };

    const drawCities = (C, el, z) => {
      const { ctx, projection: proj } = s;
      const center = [-s.rot[0], -s.rot[1]];
      const active = s.pointerCity || s.hoverCity;
      let tip = null;
      CITIES.forEach((c, i) => {
        if (d3.geoDistance([c.lon, c.lat], center) > Math.PI / 2) return;
        const p = proj([c.lon, c.lat]);
        if (!p) return;
        const on = active === c.name;
        const phase = (el * 0.55 + i * 0.25) % 1;
        const r = 2.6 + phase * (on ? 15 : 9);
        ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.strokeStyle = C.india; ctx.globalAlpha = (1 - phase) * (on ? 0.6 : 0.32);
        ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(p[0], p[1], on ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = on ? C.ink : C.india; ctx.fill();
        ctx.strokeStyle = C.paper; ctx.lineWidth = 1.2; ctx.stroke();
        if (z > 0.35) {
          ctx.globalAlpha = Math.min(1, (z - 0.35) / 0.4);
          const right = c.anchor === 'left';
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + (right ? 9 : -9), p[1] + c.dy * 0.5);
          ctx.strokeStyle = C.muted; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
          ctx.textAlign = right ? 'left' : 'right'; ctx.textBaseline = 'middle';
          ctx.fillStyle = on ? C.ink : C.muted;
          ctx.fillText(c.name.toUpperCase(), p[0] + c.dx, p[1] + c.dy * 0.5);
          ctx.globalAlpha = 1; ctx.textAlign = 'start';
        }
        if (on) tip = { p, name: c.name };
      });
      const tipEl = tipRef.current;
      if (!tipEl) return;
      if (tip && z < 0.35) {
        const box = canvas.getBoundingClientRect();
        const host = tipEl.parentNode.getBoundingClientRect();
        tipEl.textContent = tip.name;
        tipEl.style.left = box.left - host.left + tip.p[0] + 'px';
        tipEl.style.top = box.top - host.top + tip.p[1] + 'px';
        tipEl.style.opacity = '1';
      } else tipEl.style.opacity = '0';
    };

    const draw = (el, z) => {
      const { ctx, size } = s;
      if (!ctx) return;
      const C = {
        sphere: css('--paper-sunk', '#f0ece0'), grat: css('--line-strong', '#d6cfbe'),
        land: css('--ink-100', '#cfc8b8'), india: css('--laterite-500', '#a8461d'),
        indiaSoft: css('--laterite-100', '#f3e4db'), ink: css('--ink-900', '#15130e'),
        muted: css('--ink-500', '#6b6455'), paper: css('--paper', '#f7f4ec'),
      };
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2); ctx.clip();
      ctx.beginPath(); s.path({ type: 'Sphere' }); ctx.fillStyle = C.sphere; ctx.fill();
      ctx.beginPath(); s.path(s.graticule);
      ctx.strokeStyle = C.grat; ctx.globalAlpha = 0.5 * (1 - z * 0.6); ctx.lineWidth = 0.5; ctx.stroke();
      ctx.globalAlpha = 1;
      if (s.land) {
        const outline = GLOBE_STYLE === 'outline';
        ctx.beginPath(); s.path(s.land);
        if (outline) { ctx.strokeStyle = C.land; ctx.lineWidth = 0.7; ctx.stroke(); }
        else { ctx.fillStyle = C.land; ctx.globalAlpha = 1 - z * 0.45; ctx.fill(); ctx.globalAlpha = 1; }
        ctx.beginPath(); s.path(s.borders);
        ctx.strokeStyle = C.grat; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.8; ctx.stroke(); ctx.globalAlpha = 1;
        if (s.india) {
          ctx.beginPath(); s.path(s.india);
          ctx.fillStyle = C.india; ctx.globalAlpha = 1 - z; ctx.fill();
          ctx.fillStyle = C.indiaSoft; ctx.globalAlpha = z; ctx.fill(); ctx.globalAlpha = 1;
          ctx.strokeStyle = C.india; ctx.lineWidth = 1.4 + z * 0.8; ctx.lineJoin = 'round'; ctx.stroke();
        }
      }
      ctx.restore();
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
      ctx.strokeStyle = C.ink; ctx.globalAlpha = 0.28 * (1 - z * 0.7); ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
      drawCities(C, el, z);
    };

    const loop = () => {
      const tick = (now) => {
        if (!mounted) return;
        if (s.t0 === null) s.t0 = now;
        const el = (now - s.t0) / 1000;
        const intro = Math.min(1, el / 2.4);
        const e = easeOutCubic(intro);
        const drift = intro >= 1 ? Math.sin((el - 2.4) * 0.18) * 11 * SPIN_SPEED : 0;
        s.zoom += (s.target - s.zoom) * 0.075;
        if (Math.abs(s.target - s.zoom) < 0.001) s.zoom = s.target;
        const z = easeInOut(Math.max(0, Math.min(1, s.zoom)));
        const globeRot = [
          START[0] + (FOCUS[0] - START[0]) * e + drift * (1 - z),
          START[1] + (FOCUS[1] - START[1]) * e,
        ];
        const fr = s.focusRot || FOCUS;
        s.rot = [lerp(globeRot[0], fr[0], z), lerp(globeRot[1], fr[1], z)];
        const tgt = s.indiaK ? s.size * s.indiaK : s.baseScale;
        s.projection.rotate(s.rot).scale(lerp(s.baseScale, tgt, z));
        draw(el, z);
        s.raf = requestAnimationFrame(tick);
      };
      s.raf = requestAnimationFrame(tick);
    };

    const cityEls = Array.from(document.querySelectorAll('[data-city]'));
    const enter = (el) => () => { s.hoverCity = el.getAttribute('data-city'); };
    const leave = () => { s.hoverCity = null; };
    const cleanups = cityEls.map((el) => {
      const en = enter(el); el.addEventListener('mouseenter', en); el.addEventListener('mouseleave', leave);
      return () => { el.removeEventListener('mouseenter', en); el.removeEventListener('mouseleave', leave); };
    });

    s.ctx = canvas.getContext('2d');
    s.projection = d3.geoOrthographic().rotate(s.rot).precision(0.4);
    s.path = d3.geoPath(s.projection, s.ctx);
    s.graticule = d3.geoGraticule10();
    resize();
    s.ro = new ResizeObserver(resize); s.ro.observe(canvas);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', () => { s.pointerCity = null; });
    loop();

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((topo) => {
        if (!mounted) return;
        const fc = topojson.feature(topo, topo.objects.countries);
        s.land = { type: 'FeatureCollection', features: fc.features.filter((f) => String(f.id) !== INDIA_ID) };
        s.india = fc.features.find((f) => String(f.id) === INDIA_ID) || null;
        s.borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);
        if (s.india) {
          const c = d3.geoCentroid(s.india);
          s.focusRot = [-c[0], -c[1]];
          const probe = d3.geoOrthographic().rotate(s.focusRot).translate([0, 0]).scale(1).precision(0.4);
          const b = d3.geoPath(probe).bounds(s.india);
          s.indiaK = 0.74 / Math.max(b[1][0] - b[0][0], b[1][1] - b[0][1]);
        }
      })
      .catch(() => { s.land = null; });

    return () => {
      mounted = false;
      cancelAnimationFrame(s.raf);
      if (s.ro) s.ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
      <canvas ref={canvasRef} style={{ width: '100%', aspectRatio: '1', display: 'block' }} />
      <div
        ref={tipRef}
        style={{
          position: 'absolute', left: 0, top: 0, pointerEvents: 'none', opacity: 0,
          transition: 'opacity 160ms var(--ease)', background: 'var(--surface-inverse)',
          color: 'var(--text-on-dark)', font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', padding: '6px 10px', borderRadius: 'var(--radius-1)',
          whiteSpace: 'nowrap', transform: 'translate(-50%,-160%)', zIndex: 2,
        }}
      />
      {zoomed && (
        <button
          onClick={() => setZoom(false)}
          className="btn btn-secondary btn-sm"
          style={{
            position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-mono)',
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', fontSize: 11,
            background: 'var(--surface-card)', zIndex: 3,
          }}
        >
          Back to globe
        </button>
      )}
    </div>
  );
}
