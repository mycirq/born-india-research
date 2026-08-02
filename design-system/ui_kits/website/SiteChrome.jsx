const WRAP = { maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--gutter)' };

function Wordmark({ inverse }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, letterSpacing: 'var(--tracking-tight)', color: inverse ? 'var(--text-on-dark)' : 'var(--text-heading)' }}>Born India Research</span>
    <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--text-on-dark-muted)' : 'var(--text-faint)' }}>Est. 2026 · India</span>
  </div>;
}

function SiteHeader({ onContact }) {
  return <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 5 }}>
    <div style={{ ...WRAP, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
      <Wordmark />
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {['How it works', 'Who it’s for', 'Methodology'].map(l =>
          <a key={l} href="#how" style={{ font: 'var(--type-small)', color: 'var(--text-body)', textDecoration: 'none' }}>{l}</a>)}
        <Button size="sm" onClick={onContact}>Get in touch</Button>
      </nav>
    </div>
  </header>;
}

function SiteFooter() {
  return <footer style={{ background: 'var(--surface-inverse)', marginTop: 'var(--space-9)' }}>
    <div style={{ ...WRAP, padding: '56px var(--gutter) 48px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 320 }}>
        <Wordmark inverse />
        <p style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)', marginTop: 18 }}>Born India Research Pvt Ltd · India</p>
        <a href="mailto:hello@mybornindiaresearch.com" style={{ font: 'var(--type-small)', color: 'var(--text-on-dark)', borderBottom: '1px solid rgba(255,253,248,.3)', textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>hello@mybornindiaresearch.com</a>
      </div>
      <div style={{ display: 'flex', gap: 56 }}>
        {[['Research', ['How it works', 'Methodology', 'Sample brief']], ['Firm', ['Who it’s for', 'Independence', 'Contact']]].map(([h, ls]) =>
          <div key={h}>
            <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--laterite-200)' }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {ls.map(l => <a key={l} href="#how" style={{ font: 'var(--type-small)', color: 'var(--text-on-dark-muted)', textDecoration: 'none' }}>{l}</a>)}
            </div>
          </div>)}
      </div>
    </div>
    <div style={{ borderTop: '1px solid rgba(255,253,248,.12)' }}>
      <div style={{ ...WRAP, padding: '18px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>We're early. Building slowly, honestly, the right way.</span>
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'rgba(164,155,137,.7)' }}>Research, not advice · No commissions</span>
      </div>
    </div>
  </footer>;
}
