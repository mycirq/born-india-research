import React from 'react';

export function StatBlock({ label, value, unit, note, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</span>
      <span style={{ font: 'var(--type-figure)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>
        {value}{unit && <span style={{ fontSize: 18, color: 'var(--text-muted)', marginLeft: 2 }}>{unit}</span>}
      </span>
      {note && <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{note}</span>}
    </div>
  );
}
