'use client';

import { useState } from 'react';
import GroundworkGlobe from './GroundworkGlobe';
import Figure from './Figure';
import { CITIES, TONES, getCity } from './data/cities';
import { useOverlay, mergeHeadline, mergeRows, hasSourced } from './data/overlay';

const LI = 'https://www.linkedin.com/in/jyotsnamaheshwari/';

const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.25h4.5V24H.24V8.25Zm7.86 0h4.31v2.15h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24H8.1V8.25Z" />
  </svg>
);

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

function SecHead({ n, children }) {
  return (
    <div className="sec-head">
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</span>
      <span style={{ ...label, color: 'var(--text-muted)' }}>{children}</span>
      <span className="rule" />
    </div>
  );
}

const METRIC_FAMILIES = [
  ['01', 'Price and movement', 'Median ₹/sqft, 1, 3 and 5-year change, asking-to-registered spread, and the gap between a project and its own corridor.'],
  ['02', 'Income', 'Gross and net yield after maintenance and tax, price-to-rent, lease comparables, and what a realistic vacancy month does to the return.'],
  ['03', 'Supply', 'New launches, unsold inventory, months of overhang, and completions due in the next eight quarters within a 3 km radius.'],
  ['04', 'Demand and liquidity', 'Quarterly absorption, absorption against launches, resale velocity, and days on market. This is the number that tells you whether you can get out.'],
  ['05', 'Risk and governance', 'RERA standing, title and encumbrance, developer delivery history, delay rate on their last five projects, and live litigation.'],
  ['06', 'Infrastructure', 'Metro and road timelines with their slippage history, employment nodes within a commute, and what the corridor looks like if nothing gets built.'],
];

const METHOD = [
  ['01', 'Records first', 'Sub-registrar comparables and the RERA portal, pulled ourselves. A number reproduced by a reseller is not evidence.', 'Primary sources only'],
  ['02', 'Then the street', 'Site visits at two different hours, a footfall count where it matters, and conversations with people who already own there.', '10 to 12 visits per shortlist'],
  ['03', 'Conflicts stay visible', 'When two sources disagree we show you both rather than averaging them into a clean number that isn’t true.', 'The decision stays yours'],
];

const METHOD_ROWS = [
  ['Micro-markets assessed', '6 to 8'],
  ['Comparable transactions', '40+'],
  ['Turnaround', '3 weeks'],
  ['Format', 'PDF + call'],
];

export default function Page() {
  const [selected, setSelected] = useState('gurgaon');
  const [level, setLevel] = useState(0);
  const city = getCity(selected);
  const overlay = useOverlay();
  const headline = mergeHeadline(city, overlay);
  const rows = mergeRows(city, overlay);
  const sourced = hasSourced(headline);

  const pick = (id) => { setSelected(id); setLevel(2); };
  const goBack = () => setLevel(level === 2 ? 1 : 0);
  const stage = level === 2 ? city.name.toUpperCase() : level === 1 ? 'INDIA' : 'LOCATING INDIA';

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(247,244,236,.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Mark />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Groundwork</span>
              <span style={{ ...label, color: 'var(--text-muted)' }}>By Born India Research</span>
            </span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <a className="nav-links" href="#cities" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Cities</a>
            <a className="nav-links" href="#metrics" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>What we track</a>
            <a className="nav-links" href="#method" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Method</a>
            <a className="nav-links" href="#founder" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Founder</a>
            <a className="btn btn-primary btn-sm" href={LI} target="_blank" rel="noopener">Let&apos;s connect</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="wrap" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-7)' }}>
        <div className="g-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1.02fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...label, padding: '5px 10px', borderRadius: 'var(--radius-1)', background: 'var(--laterite-100)', color: 'var(--laterite-600)' }}>
              Introducing Groundwork
            </span>
            <h1 style={{ font: 'var(--type-display-1)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: '22px 0 18px', textWrap: 'pretty' }}>
              City research for Indian property, built one street at a time.
            </h1>
            <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-lead)' }}>
              Groundwork is the research product from Born India Research. Six metric families per city, every figure sourced and dated, and the gaps marked as gaps.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="#cities">Open the city research</a>
              <a className="btn btn-secondary" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
            </div>
            <div className="stats" style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line-strong)', flexWrap: 'wrap' }}>
              {[['Cities live', '04'], ['Metric families', '06'], ['Commission earned', '0']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ ...label, color: 'var(--text-faint)' }}>{k}</span>
                  <span style={{ font: 'var(--type-figure)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Globe. The chips sit in normal flow beneath the canvas rather than
              absolutely at the wrapper's bottom edge, which made them collide
              with the sphere once the canvas filled the column. */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', minHeight: 560 }}>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <GroundworkGlobe selected={selected} level={level} onPick={pick} onLevel={setLevel} />

              <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
                <span style={{ ...label, color: 'var(--text-muted)' }}>{stage}</span>
              </div>

              {level > 0 && (
                <button onClick={goBack} className="chip" style={{ position: 'absolute', top: 0, right: 0, zIndex: 3 }}>
                  {level === 2 ? 'Back to India' : 'Back to globe'}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              {CITIES.map((c) => {
                const on = c.id === selected && level === 2;
                return (
                  <button
                    key={c.id}
                    onClick={() => pick(c.id)}
                    className="chip"
                    style={{ background: on ? 'var(--ink-900)' : 'var(--surface-card)', color: on ? '#fffdf8' : 'var(--ink-900)', borderColor: on ? 'var(--ink-900)' : 'var(--line-strong)' }}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 01 City research */}
      <section id="cities" className="wrap" style={{ paddingTop: 'var(--space-8)' }}>
        <SecHead n="01">City research</SecHead>

        <div className="g-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {CITIES.map((c) => {
            const on = c.id === selected;
            const live = c.stage === 'Live';
            return (
              <a
                key={c.id}
                href={`/cities/${c.id}/`}
                onMouseEnter={() => pick(c.id)}
                className="card card-city"
                style={{
                  textAlign: 'left', textDecoration: 'none',
                  background: on ? 'var(--paper-sunk)' : 'var(--surface-card)',
                  borderColor: on ? 'var(--laterite-500)' : 'var(--line)',
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ ...label, color: 'var(--laterite-500)' }}>{c.coords}</span>
                  <span style={{ ...label, padding: '4px 8px', borderRadius: 'var(--radius-1)', background: live ? 'var(--verified-100)' : 'var(--caution-100)', color: live ? 'var(--verified-500)' : 'var(--caution-500)' }}>
                    {c.stage}
                  </span>
                </span>
                <span style={{ font: 'var(--type-subtitle)', color: 'var(--text-heading)' }}>{c.name}</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{c.rate}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: c.up ? 'var(--verified-500)' : 'var(--flag-500)' }}>{c.move}</span>
                </span>
                <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{c.focus}</span>
                <span style={{ ...label, color: 'var(--laterite-600)', marginTop: 2 }}>Open city research →</span>
              </a>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-2)', background: 'var(--surface-card)', padding: 'var(--card-padding)', marginTop: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--line-strong)' }}>
            <div>
              <div style={{ ...label, color: 'var(--laterite-500)' }}>{city.kicker}</div>
              <div style={{ font: 'var(--type-title)', color: 'var(--text-heading)', marginTop: 8 }}>{city.name}</div>
              <div style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 'var(--measure-prose)' }}>{city.summary}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
              <span style={{ ...label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: sourced ? 'var(--verified-100)' : 'var(--caution-100)', color: sourced ? 'var(--verified-500)' : 'var(--caution-500)' }}>
                {sourced ? 'Sourced figures' : 'Illustrative desk figures'}
              </span>
              <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>
                {sourced ? `Updated ${overlay.generated_at}` : city.asOf}
              </span>
              <a className="btn btn-primary" href={`/cities/${city.id}/`} style={{ padding: '10px 18px', fontSize: 14, whiteSpace: 'nowrap' }}>
                Open the full {city.name} page →
              </a>
            </div>
          </div>

          <div className="g-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 'var(--space-5)', padding: 'var(--space-5) 0', borderBottom: '1px solid var(--line)' }}>
            {headline.map((h) => <Figure key={h.label} entry={h} />)}
          </div>

          <div className="g-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', paddingTop: 'var(--space-5)' }}>
            <div>
              <div style={{ ...label, color: 'var(--text-faint)', marginBottom: 10 }}>The metric sheet</div>
              {rows.map((r) => (
                <div key={r.k} style={{ padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, color: 'var(--text-body)' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>{r.k}</span>
                    <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
                    <span style={{ color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.v}</span>
                  </div>
                  {r.status === 'sourced' && (
                    <div style={{ font: 'var(--type-caption)', color: 'var(--verified-500)', marginTop: 3 }}>{r.source}</div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div style={{ ...label, color: 'var(--text-faint)', marginBottom: 10 }}>Micro-markets in scope</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 280 }}>
                  <tbody>
                    {city.micro.map((m) => (
                      <tr key={m.name} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ font: 'var(--type-small)', color: 'var(--text-heading)', padding: '10px 8px 10px 0' }}>{m.name}</td>
                        <td style={{ font: 'var(--type-data)', fontSize: 13, color: 'var(--text-body)', padding: '10px 8px', textAlign: 'right', whiteSpace: 'nowrap' }}>{m.rate}</td>
                        <td style={{ padding: '8px 0 8px 8px', textAlign: 'right', width: 1, whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'inline-block', ...label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: TONES[m.tone][0], color: TONES[m.tone][1] }}>{m.verdict}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ borderLeft: '2px solid var(--laterite-500)', paddingLeft: 16, marginTop: 'var(--space-5)' }}>
                <div style={{ ...label, color: 'var(--laterite-500)' }}>Field note</div>
                <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 6 }}>{city.note}</p>
              </div>
            </div>
          </div>
        </div>

        <p style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', marginTop: 'var(--space-4)', maxWidth: 'var(--measure-prose)' }}>
          The figures above are illustrative desk estimates, not registered transaction evidence. A live Groundwork city sheet carries a source and a date on every line.
        </p>
      </section>

      {/* 02 What we track */}
      <section id="metrics" className="wrap" style={{ paddingTop: 'var(--space-8)' }}>
        <SecHead n="02">What we track</SecHead>
        <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)', marginTop: 'var(--space-5)' }}>
          Six families, the same six in every city, so two cities can actually be compared. Price tells you what happened; supply and demand tell you what happens next.
        </p>
        <div className="g-six" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {METRIC_FAMILIES.map(([n, t, body]) => (
            <div key={n} className="card card-how">
              <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</div>
              <div style={{ font: 'var(--type-subtitle)', color: 'var(--text-heading)', marginTop: 12 }}>{t}</div>
              <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', marginTop: 8 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section style={{ background: 'var(--surface-inverse)', padding: 'var(--space-8) 0', marginTop: 'var(--space-8)' }}>
        <div className="wrap">
          <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-on-dark)', maxWidth: 900, letterSpacing: 'var(--tracking-tight)', textWrap: 'pretty' }}>
            Real estate in India doesn&apos;t have a data problem.<br /><em style={{ color: '#e0b49c' }}>It has a trust problem.</em>
          </h2>
          <p style={{ font: 'var(--type-small)', color: 'var(--text-on-dark-muted)', marginTop: 20, maxWidth: 560 }}>
            Everyone quoting you a number is also selling you something. Groundwork exists because we are the exception, structurally: no commissions, no listings, no referral fees.
          </p>
        </div>
      </section>

      {/* 03 Method */}
      <section id="method" className="wrap" style={{ paddingTop: 'var(--space-8)' }}>
        <SecHead n="03">How Groundwork is made</SecHead>
        <div className="g-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {METHOD.map(([n, t, body, foot]) => (
            <div key={n} className="card card-how">
              <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</div>
              <div style={{ font: 'var(--type-subtitle)', color: 'var(--text-heading)', marginTop: 12 }}>{t}</div>
              <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', marginTop: 8 }}>{body}</p>
              <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--line)', font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{foot}</div>
            </div>
          ))}
        </div>
        <div className="g-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', marginTop: 'var(--space-6)' }}>
          <div>
            {METHOD_ROWS.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, padding: '9px 0', borderBottom: i < METHOD_ROWS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ whiteSpace: 'nowrap' }}>{k}</span>
                <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
                <span style={{ color: 'var(--text-heading)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>
              A Groundwork sheet is a document you could hand to your lawyer or your accountant. It states what we checked, how we checked it, what we could not confirm, and where the risk sits.
            </p>
            <a href="/brief/" style={{ alignSelf: 'flex-start', font: 'var(--type-small)', fontWeight: 500, color: 'var(--laterite-600)', borderBottom: '1px solid var(--laterite-200)', paddingBottom: 2, textDecoration: 'none' }}>
              Read a real desk brief
            </a>
          </div>
        </div>
      </section>

      {/* 04 Founder */}
      <section id="founder" className="wrap" style={{ paddingTop: 'var(--space-8)' }}>
        <SecHead n="04">Who is behind this</SecHead>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)' }}>Jyotsna Maheshwari</h2>
          <div style={{ ...label, color: 'var(--laterite-600)', marginTop: 10 }}>Founder, Born India Research</div>
          <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)', marginTop: 20 }}>
            Groundwork is a one-person product today, and that is deliberate. Every sheet is researched, walked and written by the person whose name is on it.
          </p>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)', marginTop: 16 }}>
            If you want to know who is doing your homework, the answer is right here. Not a research desk, not an outsourced analyst pool.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
          </div>
          <div style={{ borderLeft: '2px solid var(--line-strong)', paddingLeft: 16, marginTop: 'var(--space-6)' }}>
            <div style={{ ...label, color: 'var(--ink-500)' }}>On the record</div>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 6, maxWidth: 'var(--measure-prose)' }}>
              Born India Research Pvt Ltd holds no brokerage licence, no listings and no commission arrangements with developers or sellers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)' }}>
        <div className="g-cta cta-inner" style={{ background: 'var(--surface-inverse)', borderRadius: 'var(--radius-3)', padding: 'var(--space-8)', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 'var(--space-7)', alignItems: 'center' }}>
          <div>
            <div style={{ ...label, color: 'var(--laterite-200)' }}>Built for the capital-rich and time-poor</div>
            <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-on-dark)', letterSpacing: 'var(--tracking-tight)', marginTop: 16, textWrap: 'pretty' }}>
              Tell us which city you&apos;re weighing up.
            </h2>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-on-dark-muted)', marginTop: 14, maxWidth: 460 }}>
              Engineers, doctors and founders: people who&apos;ve earned real wealth and want to invest it well, without spending weekends dealing with a hundred brokers.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <a className="btn btn-accent" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>No sales call. A short conversation about what you&apos;re trying to decide.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--surface-inverse)' }}>
        <div className="wrap" style={{ padding: '56px var(--gutter) 44px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--text-on-dark)' }}>Groundwork</div>
            <div style={{ ...label, color: 'var(--laterite-200)', marginTop: 6 }}>A product of Born India Research</div>
            <p style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)', marginTop: 18 }}>Born India Research Pvt Ltd · Est. 2026 · India</p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div>
              <div style={{ ...label, color: 'var(--laterite-200)' }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                <a className="footlink" href="#cities">Cities</a>
                <a className="footlink" href="#metrics">What we track</a>
                <a className="footlink" href="#method">Method</a>
              </div>
            </div>
            <div>
              <div style={{ ...label, color: 'var(--laterite-200)' }}>Firm</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                <a className="footlink" href="#founder">Founder</a>
                <a className="footlink" href={LI} target="_blank" rel="noopener">Let&apos;s connect</a>
                <a className="footlink" href="/privacy/">Privacy</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,253,248,.12)' }}>
          <div className="wrap" style={{ padding: '18px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>We&apos;re early. Building slowly, honestly, the right way.</span>
            <span style={{ ...label, color: 'rgba(164,155,137,.7)' }}>Research, not advice · No commissions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
