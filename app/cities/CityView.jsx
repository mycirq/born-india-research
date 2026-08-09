'use client';

import { useState } from 'react';
import CityMap from './CityMap';
import Figure from '../Figure';
import { CITIES, TONES, getPins } from '../data/cities';
import { useOverlay, mergeHeadline, hasSourced } from '../data/overlay';

const LI = 'https://www.linkedin.com/in/jyotsnamaheshwari/';
const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

const Mark = () => (
  <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="31" fill="#a8461d" />
    <g stroke="#f7f4ec" fill="none" strokeWidth="1.4" opacity=".62">
      <ellipse cx="32" cy="32" rx="12.5" ry="31" />
      <line x1="1" y1="32" x2="63" y2="32" />
    </g>
    <circle cx="41.5" cy="24" r="4.6" fill="#f7f4ec" />
  </svg>
);

export default function CityView({ city }) {
  const pins = getPins(city.id);
  const [pin, setPin] = useState(0);
  const active = pins[pin] || pins[0];
  const overlay = useOverlay();
  const headline = mergeHeadline(city, overlay);
  const sourced = hasSourced(headline);

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Header + city switcher */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(247,244,236,.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ minHeight: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingTop: 12, paddingBottom: 12 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Mark />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Groundwork</span>
              <span style={{ ...label, color: 'var(--text-muted)' }}>By Born India Research</span>
            </span>
          </a>
          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CITIES.map((c) => {
              const on = c.id === city.id;
              return (
                <a
                  key={c.id}
                  href={`/cities/${c.id}/`}
                  className="chip"
                  style={{ background: on ? 'var(--ink-900)' : 'var(--surface-card)', color: on ? '#fffdf8' : 'var(--ink-900)', borderColor: on ? 'var(--ink-900)' : 'var(--line-strong)', textDecoration: 'none' }}
                >
                  {c.name}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-9)' }}>
        <a href="/#cities" style={{ ...label, color: 'var(--text-muted)', textDecoration: 'none' }}>← All cities</a>

        <div className="g-two" style={{ display: 'grid', gridTemplateColumns: '1.6fr .9fr', gap: 'var(--space-7)', alignItems: 'end', marginTop: 'var(--space-4)' }}>
          <div>
            <div style={{ ...label, color: 'var(--laterite-500)' }}>{city.kicker}</div>
            <h1 style={{ font: 'var(--type-display-1)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', marginTop: 10, textWrap: 'pretty' }}>
              {city.name}
            </h1>
            <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', marginTop: 18, maxWidth: 'var(--measure-prose)' }}>{city.summary}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <span style={{ ...label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: sourced ? 'var(--verified-100)' : 'var(--caution-100)', color: sourced ? 'var(--verified-500)' : 'var(--caution-500)' }}>
              {sourced ? 'Sourced figures' : 'Illustrative desk figures'}
            </span>
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>
              {sourced ? `Updated ${overlay.generated_at}` : city.asOf}
            </span>
          </div>
        </div>

        {/* Headline metrics */}
        <div className="g-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line-strong)' }}>
          {headline.map((h) => <Figure key={h.label} entry={h} />)}
        </div>

        {/* 01 Micro-market map */}
        <div className="sec-head" style={{ marginTop: 'var(--space-8)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>01</span>
          <span style={{ ...label, color: 'var(--text-muted)' }}>Micro-market map</span>
          <span className="rule" />
        </div>

        <div className="g-mapsplit" style={{ display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
          <CityMap city={city} pins={pins} selected={pin} onSelect={setPin} />

          <aside style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-2)', background: 'var(--surface-card)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ ...label, color: 'var(--laterite-500)' }}>Selected micro-market</div>
                <div style={{ font: 'var(--type-title)', color: 'var(--text-heading)', marginTop: 8 }}>{active.name}</div>
              </div>
              <span style={{ ...label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: TONES[active.tone][0], color: TONES[active.tone][1], whiteSpace: 'nowrap' }}>
                {active.verdict}
              </span>
            </div>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)' }}>{active.note}</p>
            <div>
              {active.rows.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, color: 'var(--text-body)', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>{k}</span>
                  <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
                  <span style={{ color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {pins.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPin(i)}
                  className="chip"
                  style={{ background: i === pin ? 'var(--ink-900)' : 'var(--surface-card)', color: i === pin ? 'var(--paper)' : 'var(--ink-900)', borderColor: i === pin ? 'var(--ink-900)' : 'var(--line-strong)' }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </aside>
        </div>
        <p style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', marginTop: 'var(--space-3)' }}>
          Pins sit at approximate micro-market centroids. Figures are desk estimates pending registry verification.
        </p>

        {/* The metric sheet */}
        <div className="sec-head" style={{ marginTop: 'var(--space-8)' }}>
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>02</span>
          <span style={{ ...label, color: 'var(--text-muted)' }}>The metric sheet</span>
          <span className="rule" />
        </div>
        <div className="g-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', marginTop: 'var(--space-5)' }}>
          <div>
            {city.rows.map((r) => (
              <div key={r.k} style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, color: 'var(--text-body)', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ whiteSpace: 'nowrap' }}>{r.k}</span>
                <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
                <span style={{ color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ borderLeft: '2px solid var(--laterite-500)', paddingLeft: 16 }}>
              <div style={{ ...label, color: 'var(--laterite-500)' }}>Field note</div>
              <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 6 }}>{city.note}</p>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href={LI} target="_blank" rel="noopener">Commission a brief on {city.name}</a>
              <a className="btn btn-secondary" href="/brief/">See a sample brief</a>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ background: 'var(--surface-inverse)' }}>
        <div className="wrap" style={{ padding: '28px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>Groundwork · a product of Born India Research Pvt Ltd</span>
          <span style={{ ...label, color: 'rgba(164,155,137,.7)' }}>Research, not advice · No commissions</span>
        </div>
      </footer>
    </div>
  );
}
