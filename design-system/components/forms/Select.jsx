import React from 'react';

export function Select({ label, options = [], style, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>}
      <select style={{
        appearance: 'none', font: 'var(--type-body)', color: 'var(--ink-900)',
        background: 'var(--surface)', border: '1px solid var(--line-strong)',
        borderRadius: 'var(--radius-1)', padding: '11px 34px 11px 12px', cursor: 'pointer',
        backgroundImage: 'linear-gradient(45deg,transparent 50%,var(--ink-500) 50%),linear-gradient(135deg,var(--ink-500) 50%,transparent 50%)',
        backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 13px) 50%',
        backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat',
      }} {...rest}>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </label>
  );
}
