import * as React from 'react';

/**
 * Subscription-tier identity pill (Sprout / Grower / Steward). The
 * three-plant growth metaphor is Garden Swap's core brand device — use this
 * wherever a user's plan is shown (profile, paywall, elite status).
 */
export interface TierBadgeProps {
  /** @default "sprout" */
  tier?: 'sprout' | 'grower' | 'steward';
  /** Show the leading plant glyph. @default true */
  showGlyph?: boolean;
  style?: React.CSSProperties;
}

export function TierBadge(props: TierBadgeProps): JSX.Element;
