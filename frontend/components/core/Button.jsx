import React from 'react';

/**
 * Garden Swap — Button
 * Tactile pill/rounded button in the Potting Shed palette. Primary = fern
 * green, accent = terracotta clay, steward = denim, danger = tomato, plus
 * quiet outline/text. Hover lifts slightly and deepens; press settles.
 * Icons (the <Icon> component) go inside the label.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  pill = true,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);

  const sizes = {
    sm: { padding: '7px 14px', fontSize: 'var(--text-sm)' },
    md: { padding: '11px 20px', fontSize: 'var(--text-base)' },
    lg: { padding: '14px 26px', fontSize: 'var(--text-md)' },
  };

  const solid = (bg, bgHover, fg) => ({
    background: hover && !disabled ? bgHover : bg, color: fg, border: 'none',
    boxShadow: down ? 'none' : 'var(--shadow-xs)',
  });

  const variants = {
    primary: solid('var(--fern-600)', 'var(--pine-700)', 'var(--text-on-primary)'),
    accent:  solid('var(--clay-600)', 'var(--clay-700)', '#FFF7F0'),
    steward: solid('var(--denim-600)', 'var(--denim-700)', '#F1F7F8'),
    danger:  solid('var(--tomato-600)', '#A23D26', '#FFF3EE'),
    outline: {
      background: hover && !disabled ? 'var(--paper-raised)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--line-strong)',
    },
    text: {
      background: 'none', color: 'var(--fern-600)', border: 'none',
      padding: 0, fontWeight: 'var(--weight-semibold)',
      textDecoration: hover ? 'underline' : 'none',
    },
  };

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
    fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-semibold)',
    letterSpacing: '0.01em',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-base), transform var(--dur-fast), box-shadow var(--dur-base)',
    width: full ? '100%' : undefined, lineHeight: 1.2, whiteSpace: 'nowrap',
    transform: down && !disabled ? 'translateY(1px)' : 'none',
    opacity: disabled ? 0.5 : 1,
    ...sizes[size],
    ...variants[variant],
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{ ...base, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
