import React from 'react';

/**
 * Garden Swap — Card
 * The warm-white, generously-rounded surface that holds most modules. A
 * faint kraft hairline plus a soft layered shadow; lifts on hover when
 * interactive.
 */
export function Card({
  children,
  interactive = false,
  padded = false,
  bordered = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const base = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: bordered ? '1px solid var(--line)' : 'none',
    boxShadow: hover && interactive ? 'var(--shadow-hover)' : 'var(--shadow)',
    overflow: 'hidden',
    cursor: interactive ? 'pointer' : 'default',
    transform: hover && interactive ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
    padding: padded ? 'var(--space-8)' : 0,
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{ ...base, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
