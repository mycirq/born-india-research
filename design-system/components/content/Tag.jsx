import React from 'react';

export function Tag({ children, style }) {
  return (
    <span style={{
      display: 'inline-block', font: 'var(--type-caption)', color: 'var(--text-body)',
      padding: '4px 10px', border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-1)', background: 'transparent', ...style,
    }}>{children}</span>
  );
}
