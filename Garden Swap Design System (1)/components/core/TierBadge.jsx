import React from 'react';
import { Icon } from './Icon.jsx';

/**
 * Garden Swap — TierBadge
 * The Sprout / Grower / Steward identity pill. The growth metaphor now reads
 * through line icons (sprout → shrub → trees) instead of emoji.
 */
export function TierBadge({ tier = 'sprout', showGlyph = true, style, ...rest }) {
  const tiers = {
    sprout:  { icon: 'sprout', label: 'Sprout',  background: 'var(--mint-100)',         color: 'var(--pine-700)' },
    grower:  { icon: 'shrub',  label: 'Grower',  background: 'rgba(52,112,70,0.16)',    color: 'var(--fern-600)' },
    steward: { icon: 'trees',  label: 'Steward', background: 'var(--denim-100)',        color: 'var(--denim-700)' },
  };
  const t = tiers[tier] || tiers.sprout;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 13px 5px 11px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    background: t.background,
    color: t.color,
  };

  return (
    <span style={{ ...base, ...style }} {...rest}>
      {showGlyph && <Icon name={t.icon} size={15} />}
      {t.label}
    </span>
  );
}
