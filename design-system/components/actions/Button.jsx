import React from 'react';

const base = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  font: 'var(--type-small)', fontWeight: 500, textDecoration: 'none',
  borderRadius: 'var(--radius-1)', border: '1px solid transparent',
  cursor: 'pointer', transition: 'var(--transition)', whiteSpace: 'nowrap',
};

const sizes = {
  sm: { padding: '7px 14px', fontSize: 13 },
  md: { padding: '11px 20px', fontSize: 14 },
  lg: { padding: '14px 26px', fontSize: 15 },
};

const variants = {
  primary: { background: 'var(--action-primary-bg)', color: 'var(--action-primary-fg)' },
  secondary: { background: 'transparent', color: 'var(--ink-900)', borderColor: 'var(--line-strong)' },
  accent: { background: 'var(--laterite-500)', color: '#fffdf8' },
  quiet: { background: 'transparent', color: 'var(--laterite-600)', padding: 0, borderBottom: '1px solid var(--laterite-200)', borderRadius: 0 },
};

const hovers = {
  primary: { background: 'var(--action-primary-bg-hover)' },
  secondary: { borderColor: 'var(--ink-900)' },
  accent: { background: 'var(--laterite-600)' },
  quiet: { borderBottomColor: 'var(--laterite-600)' },
};

export function Button({ variant = 'primary', size = 'md', href, disabled, icon, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const s = {
    ...base,
    ...(variant === 'quiet' ? {} : sizes[size]),
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(disabled ? { opacity: 0.4, cursor: 'not-allowed' } : null),
    ...style,
  };
  return (
    <Tag href={href} disabled={!href && disabled} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {icon}{children}
    </Tag>
  );
}
