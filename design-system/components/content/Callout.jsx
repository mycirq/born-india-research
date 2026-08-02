import React from 'react';

export function Callout({ title, tone = 'accent', children, style }) {
  const rule = { accent: 'var(--laterite-500)', caution: 'var(--caution-500)', flag: 'var(--flag-500)', neutral: 'var(--line-strong)' };
  const colors = { accent: 'var(--laterite-500)', caution: 'var(--caution-500)', flag: 'var(--flag-500)', neutral: 'var(--ink-500)' };
  return (
    <div style={{ borderLeft: '2px solid ' + rule[tone], paddingLeft: 16, ...style }}>
      {title && <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: colors[tone], marginBottom: 6 }}>{title}</div>}
      <div style={{ font: 'var(--type-small)', color: 'var(--text-body)', maxWidth: 'var(--measure-prose)' }}>{children}</div>
    </div>
  );
}
