import * as React from 'react';

/**
 * Amber star rating. Read-only display ("4.9 ⭐ (12)") for profiles and cards,
 * or an interactive 1–5 picker for the post-swap rating modal. Inactive stars
 * dim to 0.3 opacity, matching the product.
 */
export interface StarRatingProps {
  /** Current rating. Display mode shows it numerically; picker highlights up to it. @default 0 */
  value?: number;
  /** Number of ratings, shown as "(N)" in display mode. */
  count?: number;
  /** Render the 1–5 tappable picker instead of a read-only score. @default false */
  interactive?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Called with 1–5 when a star is clicked (interactive mode). */
  onChange?: (score: number) => void;
  style?: React.CSSProperties;
}

export function StarRating(props: StarRatingProps): JSX.Element;
