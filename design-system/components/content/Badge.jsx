import React from 'react';

const tones = {
  neutral:  ['var(--paper-sunk)', 'var(--ink-500)'],
  accent:   ['var(--laterite-100)', 'var(--laterite-600)'],
  verified: ['var(--verified-100)', 'var(--verified-500)'],
  caution:  ['var(--caution-100)', 'var(--caution-500)'],
  flag:     ['var(--flag-100)', 'var(--flag-500)'],
};

export function Badge({ tone = 'neutral', children, style }) {
  const [bg, fg] = tones[tone];
  return (
    <span style={{
      display: 'inline-block', font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase', padding: '5px 9px', borderRadius: 'var(--radius-1)',
      background: bg, color: fg, ...style,
    }}>{children}</span>
  );
}
