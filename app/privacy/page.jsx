export const metadata = {
  title: 'Privacy policy · Groundwork',
  description:
    'How Born India Research Pvt Ltd collects, uses and stores personal data, including data accessed through the LinkedIn API.',
  alternates: { canonical: '/privacy/' },
};

const label = {
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
};

const EFFECTIVE = '10 August 2026';

function SecHead({ n, children }) {
  return (
    <div className="sec-head" style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-7)' }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{n}</span>
      <span style={{ ...label, color: 'var(--text-muted)' }}>{children}</span>
      <span className="rule" />
    </div>
  );
}

function P({ children }) {
  return (
    <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: '0 0 14px', textWrap: 'pretty' }}>
      {children}
    </p>
  );
}

function Bullet({ children }) {
  return (
    <li style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: '0 0 10px', paddingLeft: 4 }}>
      {children}
    </li>
  );
}

export default function Privacy() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>Groundwork</span>
            <span style={{ ...label, color: 'var(--text-faint)' }}>by Born India Research</span>
          </a>
          <a className="btn btn-secondary btn-sm" href="/">← Back to site</a>
        </div>
      </header>

      <main className="wrap" style={{ maxWidth: 760, padding: 'var(--space-8) var(--gutter) var(--space-9)' }}>
        <span style={{ ...label, color: 'var(--laterite-500)' }}>Legal</span>
        <h1 style={{ font: 'var(--type-display-2)', color: 'var(--text-heading)', letterSpacing: 'var(--tracking-tight)', margin: '18px 0 12px' }}>
          Privacy policy
        </h1>
        <P>
          Born India Research Pvt Ltd (&ldquo;Born India Research&rdquo;, &ldquo;we&rdquo;) publishes
          independent real-estate investment research under the product name Groundwork. This policy
          explains what personal data we collect, why, and what we do with it. Effective {EFFECTIVE}.
        </P>

        <SecHead n="01">Who we are</SecHead>
        <P>
          Born India Research Pvt Ltd is a private limited company registered in India. For any
          question about this policy or about data we hold, write to{' '}
          <a href="mailto:jyotsna@bornindiaresearch.com" style={{ color: 'var(--laterite-500)' }}>
            jyotsna@bornindiaresearch.com
          </a>
          . We answer data requests ourselves; there is no third-party support desk.
        </P>

        <SecHead n="02">What we collect</SecHead>
        <P>We keep this deliberately small. In practice there are three categories.</P>
        <ul style={{ margin: '0 0 14px', paddingLeft: 20 }}>
          <Bullet>
            <strong>What you send us.</strong> If you email us or engage us for a research brief, we
            hold your name, contact details and whatever you choose to tell us about the property or
            question at hand.
          </Bullet>
          <Bullet>
            <strong>Site analytics.</strong> Aggregate, non-identifying counts of page views. We do
            not run advertising trackers, we do not build visitor profiles, and we do not sell or
            share any visitor data.
          </Bullet>
          <Bullet>
            <strong>LinkedIn account data, where you authorise it.</strong> See section 3.
          </Bullet>
        </ul>
        <P>
          The research itself is built from published sources — NHB RESIDEX, RERA registries and
          similar public records — not from personal data about site visitors.
        </P>

        <SecHead n="03">LinkedIn data</SecHead>
        <P>
          We operate a private internal tool that publishes our own research updates to our own
          LinkedIn presence: the Born India Research company page and the profiles of our own team
          members. It uses LinkedIn&rsquo;s official API and nothing else.
        </P>
        <ul style={{ margin: '0 0 14px', paddingLeft: 20 }}>
          <Bullet>
            <strong>Whose data.</strong> Only members of our own team who have personally signed in
            and granted consent through LinkedIn&rsquo;s standard OAuth screen. We do not access,
            collect, scrape or store data about any other LinkedIn member.
          </Bullet>
          <Bullet>
            <strong>What we receive.</strong> The signed-in member&rsquo;s name, LinkedIn member
            identifier, email address, and an access token permitting us to publish content on their
            behalf and on behalf of pages they administer.
          </Bullet>
          <Bullet>
            <strong>How it is stored.</strong> Access tokens are held on company-controlled machines
            in owner-only readable files. They are never transmitted to any third party, never
            embedded in the website, and never shared between accounts.
          </Bullet>
          <Bullet>
            <strong>What we do with it.</strong> Publish, edit and delete our own posts. That is the
            entire purpose. We do not send messages, do not read or collect other members&rsquo;
            content, do not harvest connections, and do not use LinkedIn data for advertising,
            profiling, lead generation or resale.
          </Bullet>
          <Bullet>
            <strong>Revoking access.</strong> Any team member can revoke our app at any time from
            LinkedIn&rsquo;s Settings under Data Privacy → Permitted Services. We delete the stored
            token on request, and tokens expire on their own within roughly sixty days.
          </Bullet>
        </ul>
        <P>
          We comply with the LinkedIn API Terms of Use. We do not use unofficial or undocumented
          LinkedIn endpoints, and we do not scrape LinkedIn.
        </P>

        <SecHead n="04">How we use what we collect</SecHead>
        <P>
          To deliver research you have asked for, to reply to you, to publish our own findings, and
          to meet our legal and accounting obligations. We do not sell personal data. We hold no
          brokerage licence and take no commission from any developer or seller, so we have no
          referral relationship into which your details could be passed.
        </P>

        <SecHead n="05">Who else sees it</SecHead>
        <P>
          Ordinary service providers that keep the business running — email, cloud hosting and
          database hosting — process data on our behalf under their own contractual obligations. We
          disclose data beyond that only where the law requires it. We do not transfer personal data
          to any party for their own marketing purposes.
        </P>

        <SecHead n="06">How long we keep it</SecHead>
        <P>
          Client engagement records are retained for as long as the relationship continues and
          afterwards for the period Indian tax and company law requires. Enquiries that do not
          become engagements are deleted within twelve months. LinkedIn access tokens are deleted on
          revocation or expiry.
        </P>

        <SecHead n="07">Your rights</SecHead>
        <P>
          You may ask us what personal data we hold about you, ask us to correct it, or ask us to
          delete it. Write to{' '}
          <a href="mailto:jyotsna@bornindiaresearch.com" style={{ color: 'var(--laterite-500)' }}>
            jyotsna@bornindiaresearch.com
          </a>{' '}
          and we will respond within thirty days.
        </P>

        <SecHead n="08">Changes</SecHead>
        <P>
          If we change this policy we will change the effective date at the top and, where the change
          is material, say so on the site. This version is effective {EFFECTIVE}.
        </P>

        <div style={{ display: 'flex', gap: 14, marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
          <a className="btn btn-secondary" href="/">Back to site</a>
        </div>
      </main>

      <footer style={{ background: 'var(--surface-inverse)' }}>
        <div className="wrap" style={{ padding: '28px var(--gutter)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: 'var(--type-caption)', color: 'var(--text-on-dark-muted)' }}>
            Born India Research Pvt Ltd
          </span>
          <span style={{ ...label, color: 'rgba(164,155,137,.7)' }}>Research, not advice · No commissions</span>
        </div>
      </footer>
    </div>
  );
}
