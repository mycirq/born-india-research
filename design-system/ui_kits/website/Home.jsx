function Home() {
  const [intake, setIntake] = React.useState(false);
  const W = { maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--gutter)' };
  return <div style={{ background: 'var(--paper)', minHeight: '100%' }}>
    <SiteHeader onContact={() => setIntake(true)} />

    {/* Hero */}
    <section style={{ ...W, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr .65fr', gap: 'var(--space-8)', alignItems: 'end' }}>
        <div>
          <Badge tone="accent">Day one · we're just getting started</Badge>
          <h1 style={{ font: 'var(--type-display-1)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: '24px 0 20px' }}>
            Invest in Indian property with <em style={{ color: 'var(--laterite-600)' }}>clarity</em>, not guesswork.
          </h1>
          <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-lead)' }}>
            You have the capital. You don't have the time to scout cities, chase brokers, and separate signal from sales pitch.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30, alignItems: 'center' }}>
            <Button size="lg" onClick={() => setIntake(true)}>Get in touch</Button>
            <Button size="lg" variant="secondary" href="#how">How it works</Button>
          </div>
        </div>
        <div style={{ borderLeft: '1px solid var(--line-strong)', paddingLeft: 'var(--space-5)', display: 'grid', gap: 'var(--space-5)' }}>
          <StatBlock label="Cities under coverage" value="04" note="Bengaluru · Pune · Hyderabad · Chennai" />
          <StatBlock label="Commission earned" value="0" note="We are paid by you, never by a seller." />
        </div>
      </div>
    </section>

    {/* Belief band */}
    <section style={{ background: 'var(--surface-inverse)', padding: 'var(--space-8) 0' }}>
      <div style={{ ...W }}>
        <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-on-dark)', maxWidth: 900, letterSpacing: 'var(--tracking-tight)' }}>
          Real estate in India doesn't have a data problem.<br /><em style={{ color: '#e0b49c' }}>It has a trust problem.</em>
        </h2>
      </div>
    </section>

    {/* How */}
    <section id="how" style={{ ...W, paddingTop: 'var(--space-8)' }}>
      <SectionMarker number="01">How it works</SectionMarker>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
        <Card marker="01" title="We do the groundwork" footer="Field visits, registry pulls, developer history">
          Cities, micro-markets, the numbers, and the people — the homework most investors never have time to do properly.
        </Card>
        <Card marker="02" title="Independent by design" footer="No commissions · no listings · no referrals">
          We're a research firm, not a broker. No commissions, no bias — just findings you can actually trust.
        </Card>
        <Card marker="03" title="You make the call" footer="Helping hands, not a sales desk">
          We hand you clarity and options, never pressure. The decision always stays yours.
        </Card>
      </div>
      <Callout title="Field note" style={{ marginTop: 'var(--space-6)' }}>
        Every claim in a brief carries a source and a date. Where we couldn't verify something on the ground, we say so plainly rather than smoothing it over.
      </Callout>
    </section>

    {/* What's in a brief */}
    <section style={{ ...W, paddingTop: 'var(--space-8)' }}>
      <SectionMarker number="02">What a brief contains</SectionMarker>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginTop: 'var(--space-5)' }}>
        <div>
          {[['Micro-markets assessed', '6–8'], ['Comparable transactions', '40+'], ['Site visits per shortlist', '10–12'], ['Turnaround', '3 weeks'], ['Format', 'PDF + call']].map(([k, v]) =>
            <KeyValueRow key={k} label={k} value={v} style={{ borderBottom: '1px solid var(--line)' }} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>
            A brief is a document you could hand to your lawyer or your accountant. It states what we checked, how we checked it, what we could not confirm, and where the risk sits.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Title & encumbrance', 'RERA status', 'Developer track record', 'Rental comparables', 'Exit liquidity', 'Infrastructure timelines'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <div><Button variant="quiet" href="../research_brief/index.html">See a sample brief</Button></div>
        </div>
      </div>
    </section>

    {/* Who */}
    <section style={{ ...W, paddingTop: 'var(--space-8)' }}>
      <SectionMarker number="03">Who it's for</SectionMarker>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginTop: 'var(--space-5)', alignItems: 'start' }}>
        <h2 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)' }}>
          Built for the capital-rich and time-poor.
        </h2>
        <div>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>
            Engineers, doctors, founders — people who've earned real wealth and want to invest it well, without spending weekends dealing with a hundred brokers. That's who we're building for.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
            <Button onClick={() => setIntake(true)}>Start a conversation</Button>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
    <IntakeDialog open={intake} onClose={() => setIntake(false)} />
  </div>;
}
