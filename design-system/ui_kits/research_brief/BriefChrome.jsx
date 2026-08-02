function BriefBar({ onDownload }) {
  return <div data-bar style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '14px 28px', borderBottom: '1px solid var(--line)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 5, flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-heading)' }}>Born India Research</span>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Brief BIR-2026-021</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Badge tone="caution">Desk stage only</Badge>
      <Button size="sm" variant="secondary" onClick={onDownload}>Download PDF</Button>
    </div>
  </div>;
}

function Contents({ items, active, onPick }) {
  return <nav data-toc style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Contents</div>
    {items.map((it, i) => {
      const on = active === it.id;
      return <button key={it.id} onClick={() => onPick(it.id)} style={{
        display: 'flex', gap: 12, alignItems: 'baseline', textAlign: 'left', cursor: 'pointer',
        background: on ? 'var(--paper-sunk)' : 'transparent', border: 0,
        borderLeft: '2px solid ' + (on ? 'var(--laterite-500)' : 'transparent'),
        padding: '9px 12px', transition: 'var(--transition)', whiteSpace: 'nowrap',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: on ? 'var(--laterite-500)' : 'var(--text-faint)' }}>{String(i + 1).padStart(2, '0')}</span>
        <span style={{ font: 'var(--type-small)', color: on ? 'var(--text-heading)' : 'var(--text-muted)' }}>{it.label}</span>
      </button>;
    })}
  </nav>;
}
