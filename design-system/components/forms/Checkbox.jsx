import React from 'react';

export function Checkbox({ label, checked, onChange, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', ...style }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 17, height: 17, flex: '0 0 auto', marginTop: 2, display: 'grid', placeItems: 'center',
        borderRadius: 'var(--radius-1)', transition: 'var(--transition)',
        border: '1px solid ' + (checked ? 'var(--laterite-500)' : 'var(--line-strong)'),
        background: checked ? 'var(--laterite-500)' : 'var(--surface)',
      }}>
        {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fffdf8" strokeWidth="3.5" strokeLinecap="square"><path d="M4 12.5l5.5 5.5L20 6" /></svg>}
      </span>
      <span style={{ font: 'var(--type-small)', color: 'var(--text-body)' }}>{label}</span>
    </label>
  );
}
