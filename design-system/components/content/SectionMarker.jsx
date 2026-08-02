import React from 'react';

export function SectionMarker({ number, children, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, ...style }}>
      {number && <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--laterite-500)' }}>{number}</span>}
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{children}</span>
      <span style={{ flex: 1, borderTop: '1px solid var(--line-strong)' }} />
    </div>
  );
}
