export const metadata = {
  title: 'Sample brief · Born India Research',
  description: 'A representative Born India Research investment brief — anonymised sample.',
};

const label = { font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

function Verdict({ tone, children }) {
  const map = {
    verified: ['var(--verified-100)', 'var(--verified-500)'],
    caution: ['var(--caution-100)', 'var(--caution-500)'],
    flag: ['var(--flag-100)', 'var(--flag-500)'],
  };
  const [bg, fg] = map[tone] || map.caution;
  return (
    <span style={{ ...label, display: 'inline-block', padding: '5px 10px', borderRadius: 'var(--radius-1)', background: bg, color: fg }}>{children}</span>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', font: 'var(--type-data)', color: 'var(--text-body)', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
      <span>{k}</span>
      <span style={{ flex: 1, borderBottom: '1px dotted var(--ink-100)', margin: '0 10px', transform: 'translateY(-4px)' }} />
      <span style={{ color: 'var(--text-heading)', textAlign: 'right' }}>{v}</span>
    </div>
  );
}

function SecHead({ n, children }) {
  return (
    <div className="sec-head" style={{ marginBottom: 'var(--space-4)' }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</span>
      <span style={{ ...label, color: 'var(--text-muted)' }}>{children}</span>
      <span className="rule" />
    </div>
  );
}

export default function Brief() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Born India Research</span>
            <span style={{ ...label, color: 'var(--text-faint)' }}>Est. 2026 · India</span>
          </a>
          <a className="btn btn-secondary btn-sm" href="/">← Back to site</a>
        </div>
      </header>

      <main className="wrap" style={{ maxWidth: 860, padding: 'var(--space-8) var(--gutter) var(--space-9)' }}>
        {/* Cover */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ ...label, color: 'var(--laterite-500)' }}>Investment brief · Sample</span>
          <span style={{ ...label, color: 'var(--text-faint)' }}>Ref BIR-2026-0007 · Jun 2026</span>
        </div>
        <h1 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: '18px 0 12px', textWrap: 'pretty' }}>
          4BHK, Golf Course Extension Road, Gurgaon
        </h1>
        <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)' }}>
          A representative, anonymised brief. It shows the shape of what we deliver — what we checked, what we could confirm, and what we could not.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          <Verdict tone="verified">Title clean</Verdict>
          <Verdict tone="caution">Pricing 6–9% above fair band</Verdict>
          <Verdict tone="flag">Possession risk: 1 of 2 towers delayed</Verdict>
        </div>

        {/* Summary */}
        <section style={{ marginTop: 'var(--space-8)' }}>
          <SecHead n="01">The short version</SecHead>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)' }}>
            The unit is well located and the title is clean. Our concern is price: current ask sits 6–9% above the fair band set by the last four comparable resales on the same road. The developer has a solid record, but the adjacent tower in the same project slipped its committed possession date by 11 months, which is a signal worth pricing in. If you can negotiate to the top of our fair band, this is a defensible buy. At ask, you are paying tomorrow&apos;s price today.
        </p>
        </section>

        {/* Snapshot */}
        <section style={{ marginTop: 'var(--space-7)' }}>
          <SecHead n="02">Snapshot</SecHead>
          <Row k="Ask price" v="₹4.35 Cr" />
          <Row k="Our fair band" v="₹3.95 – ₹4.10 Cr" />
          <Row k="Carpet area" v="2,180 sq ft" />
          <Row k="Comparable resales (12 mo)" v="4 on-road, 40+ micro-market" />
          <Row k="RERA status" v="Registered · HARERA-GGM-421-2019" />
          <Row k="Indicative gross yield" v="2.8 – 3.1%" />
        </section>

        {/* Micro-markets */}
        <section style={{ marginTop: 'var(--space-7)' }}>
          <SecHead n="03">What we checked on the ground</SecHead>
          <ul style={{ font: 'var(--type-body)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)', paddingLeft: 18, margin: 0, display: 'grid', gap: 8 }}>
            <li>11 site visits across Jun–Jul 2026; two at night to check security and water supply.</li>
            <li>Registry pull on the tower and the two adjacent towers; encumbrance certificate clean.</li>
            <li>Developer&apos;s last three delivered projects reviewed for delay and construction quality.</li>
            <li>Four comparable resales verified against sub-registrar records, not portal listings.</li>
          </ul>
        </section>

        {/* Risk */}
        <section style={{ marginTop: 'var(--space-7)' }}>
          <SecHead n="04">Where the risk sits</SecHead>
          <div className="card card-how" style={{ padding: 'var(--card-padding)' }}>
            <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)' }}>
              Tower B (adjacent, same developer) delayed possession by 11 months in 2023. The subject unit is in Tower A, delivered on time — but a repeat slippage would soften resale sentiment for the whole project. We could not independently confirm the current construction-finance position of the developer; treat the possession comfort as good, not guaranteed.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section style={{ marginTop: 'var(--space-7)' }}>
          <SecHead n="05">Method &amp; limits</SecHead>
          <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)' }}>
            Every figure above carries a source and a date in the full PDF. Where a claim relies on a single source, we say so. Born India Research holds no brokerage licence, no listings, and no commission arrangement with any developer or seller. This is research, not investment advice — the decision is yours.
          </p>
        </section>

        <div style={{ display: 'flex', gap: 14, marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="https://www.linkedin.com/in/jyotsnamaheshwari/" target="_blank" rel="noopener">Discuss a brief like this</a>
          <a className="btn btn-secondary" href="/">Back to site</a>
        </div>
      </main>

      <footer style={{ background: 'var(--surface-inverse)' }}>
        <div className="wrap" style={{ padding: '28px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>Sample brief · figures illustrative</span>
          <span style={{ ...label, color: 'rgba(164,155,137,.7)' }}>Research, not advice · No commissions</span>
        </div>
      </footer>
    </div>
  );
}
