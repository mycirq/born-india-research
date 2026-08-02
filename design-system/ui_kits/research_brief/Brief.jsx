const SECTIONS = [
  { id: 'summary', label: 'Summary & our view', render: () => <Summary /> },
  { id: 'claims', label: 'Claims register', render: () => <Claims /> },
  { id: 'pricing', label: 'Pricing & comparables', render: () => <Pricing /> },
  { id: 'risks', label: 'Risks & unknowns', render: () => <Risks /> },
  { id: 'method', label: 'Methodology & sources', render: () => <Method /> },
];

function Brief() {
  const [active, setActive] = React.useState('summary');
  const [toast, setToast] = React.useState(false);
  const sec = SECTIONS.find(s => s.id === active);
  return <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
    <BriefBar onDownload={() => { setToast(true); setTimeout(() => setToast(false), 2200); }} />
    <div data-shell style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: '232px 1fr', gap: 'var(--space-8)' }}>
      <aside data-aside style={{ paddingTop: 'var(--space-7)' }}>
        <Contents items={SECTIONS} active={active} onPick={setActive} />
        <div data-meta style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line)' }}>
          <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>Prepared for</div>
          <div style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>Manushivam Maheshwari</div>
          <div style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', marginTop: 4 }}>Issued 2 Aug 2026</div>
        </div>
      </aside>
      <main data-main style={{ padding: 'var(--space-7) 0 var(--space-9)', minWidth: 0 }}>{sec.render()}</main>
    </div>
    {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'var(--surface-inverse)', color: 'var(--text-on-dark)', font: 'var(--type-small)', padding: '12px 18px', borderRadius: 'var(--radius-2)', boxShadow: 'var(--shadow-2)', zIndex: 9 }}>
      Preparing BIR-2026-021.pdf...
    </div>}
  </div>;
}
