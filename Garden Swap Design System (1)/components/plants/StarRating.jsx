import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Garden Swap — StarRating
 * Honey-colored stars (the Icon "star"). Read-only display ("4.9 · 12 swaps")
 * or an interactive 1–5 picker for the post-swap rating sheet.
 */
export function StarRating({
  value = 0,
  count,
  interactive = false,
  size = 'md',
  onChange,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(0);
  const px = size === 'lg' ? 28 : size === 'sm' ? 15 : 18;

  if (!interactive) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--honey-600)', fontSize: 'var(--text-sm)', ...style }} {...rest}>
        <Icon name="star" size={px} fill="currentColor" color="var(--honey-500)" />
        <span style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--ink)' }}>{Number(value).toFixed(1)}</span>
        {count != null && (
          <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>· {count} swaps</span>
        )}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 6, ...style }} {...rest}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange && onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0,
              color: active ? 'var(--honey-500)' : 'var(--line-strong)',
              transform: active ? 'scale(1)' : 'scale(0.94)',
              transition: 'color var(--dur-fast), transform var(--dur-fast)',
            }}
          >
            <Icon name="star" size={px} fill="currentColor" color="currentColor" />
          </button>
        );
      })}
    </div>
  );
}
