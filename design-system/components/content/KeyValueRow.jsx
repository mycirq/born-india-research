import React from 'react';

export function KeyValueRow({ label, value, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, font: 'var(--type-data)', fontSize: 14, color: 'var(--text-body)', padding: '9px 0', ...style }}>
      <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ flex: '1 1 12px', minWidth: 12, borderBottom: '1px dotted var(--ink-100)', margin: '0 6px', transform: 'translateY(-4px)' }} />
      <span style={{ color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums', textAlign: 'right', minWidth: 0 }}>{value}</span>
    </div>
  );
}
