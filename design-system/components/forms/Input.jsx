import React from 'react';

export function Input({ label, hint, error, prefix, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface)', borderRadius: 'var(--radius-1)',
        border: '1px solid ' + (error ? 'var(--flag-500)' : focus ? 'var(--border-focus)' : 'var(--line-strong)'),
        boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: 'var(--transition)', padding: '0 12px',
      }}>
        {prefix && <span style={{ font: 'var(--type-data)', color: 'var(--text-faint)' }}>{prefix}</span>}
        <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 0, outline: 0, background: 'transparent', font: 'var(--type-body)', color: 'var(--ink-900)', padding: '11px 0' }} {...rest} />
      </span>
      {(hint || error) && <span style={{ font: 'var(--type-caption)', color: error ? 'var(--flag-500)' : 'var(--text-muted)' }}>{error || hint}</span>}
    </label>
  );
}
