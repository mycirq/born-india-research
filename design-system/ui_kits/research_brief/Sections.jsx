function Summary() {
  return <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
    <div>
      <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--laterite-500)', marginBottom: 14 }}>M3M Capital Walk · Sector 113, Gurugram</div>
      <h1 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: 0 }}>
        Every number on this asset is a marketing number. None of it is transaction evidence yet.
      </h1>
      <p style={{ font: 'var(--type-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-prose)', marginTop: 18 }}>
        You asked us to look at a retail unit at M3M Capital Walk on the Dwarka Expressway. This is the desk stage: what the public record says, what it does not say, and what we need to check on the ground before you commit capital.
      </p>
    </div>
    <div data-grid="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-5)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line-strong)' }}>
      <StatBlock label="Quoted rate" value="12,100" unit="/sqft" note="Channel-partner listing, unverified" />
      <StatBlock label="Corridor flat avg" value="14,000" unit="/sqft" note="99acres, Dwarka Expressway" />
      <StatBlock label="Corridor 1-yr" value="+12" unit="%" note="99acres flat rates" />
      <StatBlock label="Registered comps" value="0" note="None obtained at desk stage" />
    </div>
    <Callout title="Our view">
      Do not sign anything on the strength of what is online. The two entry quotes we found for the same asset imply rates 32 percent apart, the connectivity claims contradict each other by a factor of three, and we have not yet seen a single registered transaction. The corridor itself is real and has moved hard; this particular unit is unpriced until we pull the records.
    </Callout>
  </div>;
}

const CLAIMS = [
  { id: 'rera', claim: 'RERA registration', value: 'GGM/365/97/2019/59', verdict: 'caution', vlabel: 'Unconfirmed', src: 'Realty Assistant listing', note: 'Quoted by one channel-partner site. We have not yet matched it against the Haryana RERA portal ourselves, and a registration number reproduced by a reseller is not evidence of current standing.' },
  { id: 'rate', claim: 'Quoted rate', value: '₹12,100 /sqft onward', verdict: 'flag', vlabel: 'Conflicting', src: 'Realty Assistant vs others', note: 'Two other listings quote entry tickets of ₹53.34 L for 373 sqft (₹14,300 /sqft) and ₹66 L for 350 sqft (₹18,857 /sqft). Three sources, three different implied rates, for units of near-identical size.' },
  { id: 'scale', claim: 'Project scale', value: '~8.26 lakh sqft, 876 units', verdict: 'caution', vlabel: 'Unconfirmed', src: 'Developer marketing', note: 'Repeated near-verbatim across every reseller page, which usually means one developer source rather than independent confirmation. 12 acres and a 1 km high-street frontage are quoted alongside it.' },
  { id: 'airport', claim: 'IGI airport drive', value: '7 min vs 20-25 min', verdict: 'flag', vlabel: 'Conflicting', src: 'Two reseller sites', note: 'One page claims roughly 7 minutes, another 20 to 25 minutes, for the same address. A third-party route check at peak hour is on our site-visit list.' },
  { id: 'metro', claim: 'Dwarka metro distance', value: '3 km vs 6 km', verdict: 'flag', vlabel: 'Conflicting', src: 'Two reseller sites', note: 'Material to footfall assumptions for a retail asset. We will measure it, not accept it.' },
  { id: 'corridor', claim: 'Corridor appreciation', value: '+12% 1yr, +75% 3yr', verdict: 'verified', vlabel: 'Multi-source', src: '99acres, Magicbricks via DLC', note: 'The corridor-level move is corroborated by more than one independent portal. This is the strongest number in the brief, and it describes the corridor, not this asset.' },
  { id: 'yield', claim: 'Commercial yield', value: '6-7% claimed', verdict: 'caution', vlabel: 'Unconfirmed', src: 'DLC Group blog, 2026', note: 'An advocacy source. Residential yield on the same corridor is put at about 2 percent by 99acres, so the commercial figure needs lease evidence before you rely on it.' },
];

function Claims() {
  const [sel, setSel] = React.useState(CLAIMS[0].id);
  const c = CLAIMS.find(x => x.id === sel);
  return <div>
    <SectionMarker number="02">Claims register</SectionMarker>
    <p style={{ font: 'var(--type-small)', color: 'var(--text-muted)', margin: '16px 0 0', maxWidth: 'var(--measure-prose)' }}>
      Every factual claim we could find about this asset, with where it came from and whether it survives a second look. Select a row.
    </p>
    <div data-grid="split" style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 'var(--space-6)', marginTop: 'var(--space-5)' }}>
      <div data-scroll style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 320 }}>
          <thead><tr>{['Claim', 'Public record', 'Status'].map((h, i) =>
            <th key={h} style={{ textAlign: i === 2 ? 'right' : 'left', font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '0 0 10px', borderBottom: '1px solid var(--line-strong)', whiteSpace: 'nowrap', width: i === 2 ? 1 : 'auto' }}>{h}</th>)}</tr></thead>
          <tbody>{CLAIMS.map(r => {
            const on = r.id === sel;
            return <tr key={r.id} onClick={() => setSel(r.id)} style={{ cursor: 'pointer', background: on ? 'var(--paper-sunk)' : 'transparent', borderBottom: '1px solid var(--line)' }}>
              <td style={{ font: 'var(--type-small)', color: 'var(--text-heading)', padding: '11px 8px 11px 10px', borderLeft: '2px solid ' + (on ? 'var(--laterite-500)' : 'transparent') }}>{r.claim}</td>
              <td style={{ font: 'var(--type-data)', fontSize: 13, padding: '11px 8px', color: 'var(--text-body)' }}>{r.value}</td>
              <td style={{ textAlign: 'right', padding: '9px 0 9px 8px', width: 1, whiteSpace: 'nowrap' }}><Badge tone={r.verdict}>{r.vlabel}</Badge></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <div>
        <Card marker={c.claim} title={c.vlabel} tone="sunk" footer={'Source: ' + c.src + ' · read 2 Aug 2026'}>{c.note}</Card>
      </div>
    </div>
  </div>;
}

function Pricing() {
  return <div>
    <SectionMarker number="03">Pricing and corridor comparables</SectionMarker>
    <div data-grid="split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', marginTop: 'var(--space-5)' }}>
      <div>
        <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 8 }}>The asset, as quoted</div>
        {[['Developer', 'M3M India Pvt Ltd'], ['Location', 'Sector 113, Dwarka Expressway'], ['Asset type', 'High-street retail'], ['Quoted rate', '₹12,100 /sqft onward'], ['Entry ticket A', '₹53.34 L / 373 sqft'], ['Entry ticket B', '₹66 L / 350 sqft'], ['Implied spread', '32%']].map(([k, v]) =>
          <KeyValueRow key={k} label={k} value={v} style={{ borderBottom: '1px solid var(--line)' }} />)}
      </div>
      <div>
        <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 8 }}>The corridor, per the portals</div>
        {[['Flat range', '₹11,000 to ₹16,750 /sqft'], ['Flat average', '₹14,000 /sqft'], ['Land average', '₹22,200 /sqft'], ['1-year change', '+12.0%'], ['3-year change', '+75.0%'], ['5-year change', '+152.3%'], ['Residential yield', '~2%']].map(([k, v]) =>
          <KeyValueRow key={k} label={k} value={v} style={{ borderBottom: '1px solid var(--line)' }} />)}
      </div>
    </div>
    <Callout tone="caution" title="Reading these together" style={{ marginTop: 'var(--space-6)' }}>
      A separate 2026 developer publication puts the corridor average at ₹21,700 to ₹24,000 per sqft, well above the portal figure of about ₹14,000. We are not treating either as settled. Corridor averages also mix residential stock; they are context for a retail unit, not a comparable set for one.
    </Callout>
  </div>;
}

function Risks() {
  return <div>
    <SectionMarker number="04">Risks and unknowns</SectionMarker>
    <div style={{ display: 'grid', gap: 'var(--space-5)', marginTop: 'var(--space-5)', maxWidth: 'var(--measure-prose)' }}>
      <Callout tone="flag" title="No transaction evidence">We hold zero registered comparables for this project. Until we pull the sub-registrar record for Sector 113, the quoted rate is an asking price, not a market price.</Callout>
      <Callout tone="flag" title="Source monoculture">Almost every page describing this asset reproduces the same developer copy. Repetition across ten reseller sites is one source, not ten.</Callout>
      <Callout tone="caution" title="Retail-specific exposure">Yield on a retail unit depends on the tenant, the lease and the actual footfall, none of which are public. A large single-owner high street can also be leased against you: neighbouring vacancy is your problem too.</Callout>
      <Callout tone="caution" title="Infrastructure timing">The metro extension along the corridor is widely described as confirmed for 2026-27. Treat any price case that depends on it as a pessimistic case until it opens.</Callout>
      <Callout tone="neutral" title="What we could not verify at desk stage">The RERA record, the actual carpet-to-super area ratio, current lease rentals in the scheme, the possession position, and whether the two conflicting entry tickets refer to different floors or different dates.</Callout>
    </div>
  </div>;
}

function Method() {
  return <div>
    <SectionMarker number="05">Methodology and sources</SectionMarker>
    <div data-grid="split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', marginTop: 'var(--space-5)' }}>
      <p style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>
        This is a desk-stage brief. Everything in it was read from public web sources on 2 August 2026 and is labelled with where it came from. Nothing here has been confirmed by a site visit, a sub-registrar search or a RERA portal check, and we have deliberately not smoothed over the places where sources disagree. Born India Research holds no brokerage licence and no commission arrangement with M3M India or any reseller named. Nothing in this brief is investment advice.
      </p>
      <div>
        {[['Portal rates', '99acres, Dwarka Expressway'], ['Corridor history', 'Magicbricks via DLC Group'], ['Asset claims', '5 channel-partner listings'], ['Corridor comparison', 'Developer blog, May 2026'], ['Records read', '2 Aug 2026'], ['Prepared by', 'J. Maheshwari']].map(([k, v]) =>
          <KeyValueRow key={k} label={k} value={v} style={{ borderBottom: '1px solid var(--line)' }} />)}
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Callout tone="neutral" title="Next stage, if you want it">Sub-registrar comparables for Sector 113, a RERA portal pull, two site visits at different hours with a footfall count, and a conversation with two existing unit owners. Three weeks.</Callout>
        </div>
      </div>
    </div>
  </div>;
}
