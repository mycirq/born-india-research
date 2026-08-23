import { CITIES } from '../data/cities';

export const metadata = {
  title: 'Cities under coverage · Groundwork',
  description:
    'Independent real-estate research across Gurgaon, Mumbai, Bengaluru and Dehradun. We add a city only once we can walk it properly.',
  alternates: { canonical: '/cities/' },
};

const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

export default function CitiesIndex() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, letterSpacing: 'var(--tracking-ui)', color: 'var(--text-heading)' }}>Groundwork</span>
            <span style={{ ...label, color: 'var(--text-muted)' }}>By Born India Research</span>
          </a>
          <a className="btn btn-secondary btn-sm" href="/">← Back to site</a>
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-9)' }}>
        <div className="sec-head">
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>01</span>
          <span style={{ ...label, color: 'var(--text-muted)' }}>Where we work</span>
          <span className="rule" />
        </div>

        <h1 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-display-2)', marginTop: 'var(--space-5)', textWrap: 'pretty' }}>
          Four cities. We add one only once we can walk it properly.
        </h1>

        <div className="g-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-7)' }}>
          {CITIES.map((c) => {
            const live = c.stage === 'Live';
            return (
              <a key={c.id} href={`/cities/${c.id}/`} className="card card-city" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ ...label, color: 'var(--laterite-500)' }}>{c.coords}</span>
                  <span style={{ ...label, padding: '4px 8px', borderRadius: 'var(--radius-1)', background: live ? 'var(--verified-100)' : 'var(--caution-100)', color: live ? 'var(--verified-500)' : 'var(--caution-500)' }}>{c.stage}</span>
                </div>
                <div style={{ font: 'var(--type-title)', color: 'var(--text-heading)', marginTop: 10 }}>{c.name}</div>
                <div style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', marginTop: 6 }}>{c.focus}</div>
                <p style={{ font: 'var(--type-small)', color: 'var(--text-body)', marginTop: 14, maxWidth: '46ch' }}>{c.summary}</p>
                <div style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
                  {c.headline.slice(0, 3).map((h) => (
                    <div key={h.label}>
                      <div style={{ ...label, color: 'var(--text-faint)' }}>{h.label}</div>
                      <div style={{ font: 'var(--type-data)', color: 'var(--text-heading)', marginTop: 4 }}>{h.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ ...label, color: 'var(--laterite-600)', marginTop: 18 }}>Open {c.name} research →</div>
              </a>
            );
          })}
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
