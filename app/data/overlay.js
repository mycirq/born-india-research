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
