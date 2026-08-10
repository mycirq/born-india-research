'use client';

import { useEffect, useState } from 'react';

/**
 * Runtime data overlay.
 *
 * The site is a static export, so the figures in app/data/cities.js are baked
 * into the HTML at build time — good for SEO and it means the page is never
 * empty. groundwork-be publishes /data/cities.json on its own cadence; we fetch
 * it after mount and overlay anything it carries.
 *
 * Consequences worth keeping: no rebuild is needed to ship new figures, and if
 * the backend is down or has never run, the page silently keeps its baseline.
 */
export function useOverlay() {
  const [overlay, setOverlay] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('/data/cities.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (alive && j && j.cities) setOverlay(j); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return overlay;
}

/**
 * Merge a city's baseline headline array with whatever the overlay knows.
 * Returns entries shaped for <Figure>: value plus provenance and status.
 */
export function mergeHeadline(city, overlay) {
  const live = overlay?.cities?.[city.id]?.headline || {};
  return city.headline.map((h) => {
    const o = h.key && live[h.key];
    if (!o) return { ...h, status: 'desk' };
    if (o.status === 'gap') {
      return { ...h, status: 'gap', value: null, note: o.display || h.note, source: o.source, url: o.url, asOf: o.as_of };
    }
    return {
      ...h,
      value: o.display ?? h.value,
      note: o.unit || h.note,
      status: o.status,
      source: o.source,
      url: o.url,
      asOf: o.as_of,
    };
  });
}

/** True once any figure for this city is genuinely sourced. */
export function hasSourced(entries) {
  return entries.some((e) => e.status === 'sourced');
}

/* Metrics the backend can publish that have no baseline row of their own.
 * They are appended to the metric sheet once real, and simply absent until
 * then — a row that says nothing is worse than no row. */
const EXTRA_ROWS = {
  psf_small: 'Rate, under 60 sqm',
  psf_mid: 'Rate, 60 to 110 sqm',
  psf_large: 'Rate, over 110 sqm',
  projects_registered: 'RERA-registered projects',
  launches_last_year: 'Launches, last 12 months',
  completions_due_2y: 'Completions due, 2 years',
  developer_slippage_pct: 'Developer delay rate',
};

/**
 * Merge a city's static metric sheet with sourced figures.
 *
 * Baseline rows carrying a `key` are replaced when the backend has that metric;
 * sourced metrics with no baseline row are appended. Rows the backend knows
 * nothing about are left exactly as written.
 */
export function mergeRows(city, overlay) {
  const live = overlay?.cities?.[city.id]?.headline || {};

  const rows = city.rows.map((r) => {
    const o = r.key && live[r.key];
    if (!o || o.status === 'gap') return { ...r, status: 'desk' };
    return { ...r, v: o.display ?? r.v, status: o.status, source: o.source, asOf: o.as_of };
  });

  const shown = new Set(city.rows.map((r) => r.key).filter(Boolean));
  for (const [key, label] of Object.entries(EXTRA_ROWS)) {
    const o = live[key];
    if (!o || shown.has(key) || o.status !== 'sourced') continue;
    rows.push({ key, k: label, v: o.display, status: 'sourced', source: o.source, asOf: o.as_of });
  }
  return rows;
}

/* Labels for micro-market metrics the backend can publish. */
const MARKET_ROWS = {
  projects_registered: 'RERA projects within 3 km',
};

/**
 * Merge a micro-market's static rows with anything sourced for it.
 * Sourced rows are appended and carry their own provenance, so a pin can show
 * a real figure alongside desk estimates without the two being confused.
 */
export function mergeMarketRows(cityId, marketName, staticRows, overlay) {
  const live = overlay?.cities?.[cityId]?.markets?.[marketName] || {};
  const rows = staticRows.map(([k, v]) => ({ k, v, status: 'desk' }));
  for (const [key, labelText] of Object.entries(MARKET_ROWS)) {
    const o = live[key];
    if (!o || o.status !== 'sourced') continue;
    rows.push({ k: labelText, v: o.display, status: 'sourced', source: o.source });
  }
  return rows;
}
