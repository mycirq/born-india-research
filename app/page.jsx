'use client';

import { useEffect } from 'react';
import Globe from './Globe';

const LI = 'https://www.linkedin.com/in/jyotsnamaheshwari/';
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.25h4.5V24H.24V8.25Zm7.86 0h4.31v2.15h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24H8.1V8.25Z" />
  </svg>
);
const rd = (i) => ({ transitionDelay: `${i * 90}ms` });

export default function Page() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (reduce) { nodes.forEach((n) => n.classList.add('in')); return; }
    const countUp = (el) => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const to = Number(el.getAttribute('data-count')) || 0;
      const pad = Number(el.getAttribute('data-pad')) || 0;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / 900);
        const v = Math.round((1 - Math.pow(1 - t, 3)) * to);
        el.textContent = pad ? String(v).padStart(pad, '0') : String(v);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const label = { font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  const figure = { font: 'var(--type-figure)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' };

  const Stat = ({ children, count, pad }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...label, color: 'var(--text-faint)' }}>{children}</span>
      {count != null
        ? <span data-count={count} data-pad={pad} style={figure}>{pad ? '00' : '0'}</span>
        : <span style={figure}>0</span>}
    </div>
  );

  const SecHead = ({ n, children }) => (
    <div className="sec-head">
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</span>
      <span style={{ ...label, color: 'var(--text-muted)' }}>{children}</span>
      <span className="rule" />
    </div>
  );

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(247,244,236,.88)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="#top" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Born India Research</span>
            <span style={{ ...label, color: 'var(--text-faint)' }}>Est. 2026 · India</span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <a className="nav-links" href="#coverage" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Coverage</a>
            <a className="nav-links" href="#how" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>How it works</a>
            <a className="nav-links" href="#brief" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>The brief</a>
            <a className="nav-links" href="#founder" style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Founder</a>
            <a className="btn btn-primary btn-sm" href={LI} target="_blank" rel="noopener">Let&apos;s connect</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="wrap" style={{ padding: 'var(--space-9) var(--gutter) var(--space-8)' }}>
        <div className="g-hero" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <span className="reveal in" style={{ ...rd(0), display: 'inline-block', ...label, padding: '5px 9px', borderRadius: 'var(--radius-1)', background: 'var(--laterite-100)', color: 'var(--laterite-600)' }}>Day one · we&apos;re just getting started</span>
            <h1 className="reveal" style={{ ...rd(1), font: 'var(--type-display-1)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: '24px 0 20px', textWrap: 'pretty' }}>Invest in Indian property with <em style={{ color: 'var(--laterite-600)' }}>clarity</em>, not guesswork.</h1>
            <p className="reveal" style={{ ...rd(2), font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-lead)' }}>You have the capital. You don&apos;t have the time to scout cities, chase brokers, and separate signal from sales pitch. We do that groundwork.</p>
            <div className="reveal" style={{ ...rd(3), display: 'flex', gap: 14, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
              <a className="btn btn-secondary" href="#how">How it works</a>
            </div>
            <div className="reveal stats" style={{ ...rd(4), display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line-strong)' }}>
              <Stat count={4} pad={2}>Cities under coverage</Stat>
              <Stat>Commission earned</Stat>
              <Stat>Listings we sell</Stat>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
            <Globe />
            <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 'var(--space-3)', borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--laterite-500)', flex: '0 0 auto' }} />
                <span style={{ ...label, color: 'var(--text-muted)' }}>Under coverage</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>Gurgaon · Mumbai · Bengaluru · Dehradun</span>
                <span style={{ font: 'var(--type-caption)', color: 'var(--laterite-600)', borderBottom: '1px solid var(--laterite-200)' }}>Click India to open the map</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section style={{ background: 'var(--surface-inverse)', padding: 'var(--space-8) 0', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="reveal" style={{ font: 'var(--type-display-2)', color: 'var(--text-on-dark)', maxWidth: 900, letterSpacing: 'var(--tracking-tight)', textWrap: 'pretty' }}>Real estate in India doesn&apos;t have a data problem.<br /><em style={{ color: '#e0b49c' }}>It has a trust problem.</em></h2>
          <p className="reveal" style={{ ...rd(1), font: 'var(--type-small)', color: 'var(--text-on-dark-muted)', marginTop: 20, maxWidth: 560 }}>Everyone quoting you a number is also selling you something. We are the exception, structurally: no commissions, no listings, no referral fees.</p>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="wrap" style={{ padding: 'var(--space-8) var(--gutter) 0' }}>
        <SecHead n="01">Where we work</SecHead>
        <div className="g-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {[
            ['Gurgaon', '28.46°N 77.03°E', 'NCR, apartments and offices'],
            ['Mumbai', '19.08°N 72.88°E', 'MMR, redevelopment stock'],
            ['Bengaluru', '12.97°N 77.59°E', 'Plotted land, east corridor'],
            ['Dehradun', '30.32°N 78.03°E', 'Valley belt, second homes'],
          ].map(([name, coord, note], i) => (
            <div key={name} className="card card-city reveal" data-city={name} style={rd(i)}>
              <div style={{ ...label, color: 'var(--laterite-500)' }}>{coord}</div>
              <div style={{ font: 'var(--type-subtitle)', color: 'var(--text-heading)', marginTop: 10 }}>{name}</div>
              <div style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', marginTop: 6 }}>{note}</div>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ ...rd(4), font: 'var(--type-caption)', color: 'var(--text-faint)', marginTop: 'var(--space-4)' }}>Hover a city to find it on the globe, or click India to open the map. We add a city only once we can visit it properly.</p>
      </section>

      {/* How it works */}
      <section id="how" className="wrap" style={{ padding: 'var(--space-8) var(--gutter) 0' }}>
        <SecHead n="02">How it works</SecHead>
        <div className="g-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          {[
            ['01', 'We do the groundwork', 'Cities, micro-markets, the numbers, and the people. It is the homework most investors never have time to do properly.', 'Field visits · registry pulls · developer history'],
            ['02', 'Independent by design', "We're a research firm, not a broker. No commissions, no bias, just findings you can actually trust.", 'Paid by you · never by a seller'],
            ['03', 'You make the call', 'We hand you clarity and options, never pressure. Helping hands, and the decision always stays yours.', 'Research, not advice'],
          ].map(([n, t, body, foot], i) => (
            <div key={n} className="card card-how reveal" style={rd(i)}>
              <div style={{ ...label, color: 'var(--laterite-500)' }}>{n}</div>
              <div style={{ font: 'var(--type-subtitle)', color: 'var(--text-heading)', marginTop: 12 }}>{t}</div>
              <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', marginTop: 8 }}>{body}</p>
              <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--line)', font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{foot}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ ...rd(3), borderLeft: '2px solid var(--laterite-500)', paddingLeft: 16, marginTop: 'var(--space-6)' }}>
          <div style={{ ...label, color: 'var(--laterite-500)' }}>Field note</div>
          <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 6, maxWidth: 'var(--measure-prose)' }}>Every claim in a brief carries a source and a date. Where we couldn&apos;t verify something on the ground, we say so plainly rather than smoothing it over.</p>
        </div>
      </section>

      {/* Brief */}
      <section id="brief" className="wrap" style={{ padding: 'var(--space-8) var(--gutter) 0' }}>
        <SecHead n="03">What a brief contains</SecHead>
        <div className="g-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginTop: 'var(--space-5)' }}>
          <div className="reveal">
            {[
              ['Micro-markets assessed', '6 to 8'],
              ['Comparable transactions', '40+'],
              ['Site visits per shortlist', '10 to 12'],
              ['Turnaround', '3 weeks'],
              ['Format', 'PDF + call'],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', font: 'var(--type-data)', color: 'var(--text-body)', padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span>{k}</span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--ink-100)', margin: '0 10px', transform: 'translateY(-4px)' }} />
                <span style={{ color: 'var(--text-heading)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ ...rd(1), display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>A brief is a document you could hand to your lawyer or your accountant. It states what we checked, how we checked it, what we could not confirm, and where the risk sits.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Title & encumbrance', 'RERA status', 'Developer track record', 'Rental comparables', 'Exit liquidity', 'Infrastructure timelines'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <a className="btn-secondary" href="/brief/" style={{ alignSelf: 'flex-start', font: 'var(--type-small)', fontWeight: 500, color: 'var(--laterite-600)', border: 0, borderBottom: '1px solid var(--laterite-200)', padding: '0 0 2px', borderRadius: 0 }}>See a sample brief</a>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="wrap" style={{ padding: 'var(--space-8) var(--gutter) 0' }}>
        <SecHead n="04">Who is behind this</SecHead>
        <div className="reveal" style={{ marginTop: 'var(--space-5)' }}>
          <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)' }}>Jyotsna Maheshwari</h2>
          <div style={{ ...label, color: 'var(--laterite-600)', marginTop: 10 }}>Founder</div>
          <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)', marginTop: 20 }}>Born India Research is a one-person firm today, and that is deliberate. Every brief is researched, walked and written by the person whose name is on it.</p>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)', marginTop: 16 }}>If you want to know who is doing your homework, the answer is right here. Not a research desk, not an outsourced analyst pool. Read the profile, then judge for yourself whether we&apos;re the right people to help you decide.</p>
          <div style={{ display: 'flex', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
          </div>
          <div style={{ borderLeft: '2px solid var(--line-strong)', paddingLeft: 16, marginTop: 'var(--space-6)' }}>
            <div style={{ ...label, color: 'var(--ink-500)' }}>On the record</div>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 6, maxWidth: 'var(--measure-prose)' }}>Born India Research Pvt Ltd holds no brokerage licence, no listings and no commission arrangements with developers or sellers.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap" style={{ padding: 'var(--space-9) var(--gutter) var(--space-8)' }}>
        <div className="reveal g-cta cta-inner" style={{ background: 'var(--surface-inverse)', borderRadius: 'var(--radius-3)', padding: 'var(--space-8)', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 'var(--space-7)', alignItems: 'center' }}>
          <div>
            <div style={{ ...label, color: 'var(--laterite-200)' }}>Built for the capital-rich and time-poor</div>
            <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-on-dark)', letterSpacing: 'var(--tracking-tight)', marginTop: 16, textWrap: 'pretty' }}>Tell us what you&apos;re weighing up.</h2>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-on-dark-muted)', marginTop: 14, maxWidth: 460 }}>Engineers, doctors and founders: people who&apos;ve earned real wealth and want to invest it well, without spending weekends dealing with a hundred brokers.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <a className="btn btn-accent" href={LI} target="_blank" rel="noopener"><LinkedInIcon />Let&apos;s connect</a>
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>No sales call. A short conversation about what you&apos;re trying to decide.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--surface-inverse)' }}>
        <div className="wrap" style={{ padding: '56px var(--gutter) 48px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-dark)' }}>Born India Research</div>
            <div style={{ ...label, color: 'var(--text-on-dark-muted)', marginTop: 4 }}>Est. 2026 · India</div>
            <p style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)', marginTop: 18 }}>Born India Research Pvt Ltd · India</p>
            <a href="mailto:jyotsna@bornindiaresearch.com" style={{ font: 'var(--type-small)', color: 'var(--text-on-dark)', borderBottom: '1px solid rgba(255,253,248,.3)', display: 'inline-block', marginTop: 8 }}>jyotsna@bornindiaresearch.com</a>
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            <div>
              <div style={{ ...label, color: 'var(--laterite-200)' }}>Research</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                <a className="footlink" href="#coverage">Coverage</a>
                <a className="footlink" href="#how">How it works</a>
                <a className="footlink" href="#brief">The brief</a>
              </div>
            </div>
            <div>
              <div style={{ ...label, color: 'var(--laterite-200)' }}>Firm</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                <a className="footlink" href="#founder">Founder</a>
                <a className="footlink" href={LI} target="_blank" rel="noopener">LinkedIn</a>
                <a className="footlink" href="/brief/">Sample brief</a>
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
