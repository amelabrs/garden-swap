import React from 'react';

/**
 * Garden Swap — Badge
 * Small uppercase eyebrow-pill. Warm tints: swap = mint green, free/giveaway
 * = terracotta clay (a gift!), type = sage neutral, condition = honey,
 * rarity = plum, plus the swap-lifecycle states.
 */
export function Badge({ children, variant = 'type', style, ...rest }) {
  const variants = {
    swap:      { background: 'var(--badge-swap-fill)', color: 'var(--badge-swap-text)' },
    free:      { background: 'var(--badge-free-fill)', color: 'var(--badge-free-text)' },
    type:      { background: 'rgba(166,184,152,0.28)', color: '#41553A' },
    condition: { background: 'var(--honey-100)', color: '#8A6410' },
    rarity:    { background: 'var(--plum-100)', color: 'var(--plum-500)' },
    pending:   { background: 'var(--state-pending-fill)', color: 'var(--state-pending-text)' },
    accepted:  { background: 'var(--state-accepted-fill)', color: 'var(--state-accepted-text)' },
    completed: { background: 'var(--state-completed-fill)', color: 'var(--state-completed-text)' },
    declined:  { background: 'var(--state-declined-fill)', color: 'var(--state-declined-text)' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 9px',
    borderRadius: 'var(--radius-badge)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-caps)',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...variants[variant],
  };

  return (
    <span style={{ ...base, ...style }} {...rest}>
      {children}
    </span>
  );
}
