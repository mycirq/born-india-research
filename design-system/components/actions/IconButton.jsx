import React from 'react';

export function IconButton({ label, children, onClick, size = 36, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button aria-label={label} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size, display: 'inline-grid', placeItems: 'center',
        background: hover ? 'var(--paper-sunk)' : 'transparent',
        color: 'var(--ink-700)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-1)', cursor: 'pointer',
        transition: 'var(--transition)', ...style,
      }} {...rest}>
      {children}
    </button>
  );
}
