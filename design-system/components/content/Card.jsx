import React from 'react';

export function Card({ marker, title, children, footer, tone = 'default', style }) {
  const tones = {
    default: { background: 'var(--surface-card)', borderColor: 'var(--line)' },
    sunk: { background: 'var(--paper-sunk)', borderColor: 'var(--line-strong)' },
    inverse: { background: 'var(--surface-inverse)', borderColor: 'var(--surface-inverse)' },
  };
  const inverse = tone === 'inverse';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', border: '1px solid', borderRadius: 'var(--radius-2)',
      padding: 'var(--card-padding)', ...tones[tone], ...style,
    }}>
      {marker && <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--laterite-200)' : 'var(--laterite-500)', marginBottom: 12 }}>{marker}</div>}
      {title && <div style={{ font: 'var(--type-subtitle)', color: inverse ? 'var(--text-on-dark)' : 'var(--text-heading)', marginBottom: 8 }}>{title}</div>}
      <div style={{ font: 'var(--type-small)', color: inverse ? 'var(--text-on-dark-muted)' : 'var(--text-muted)' }}>{children}</div>
      {footer && <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid ' + (inverse ? 'rgba(255,253,248,.15)' : 'var(--line)'), font: 'var(--type-caption)', color: inverse ? 'var(--text-on-dark-muted)' : 'var(--text-faint)' }}>{footer}</div>}
    </div>
  );
}
