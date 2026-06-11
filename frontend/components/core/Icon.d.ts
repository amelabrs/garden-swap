import * as React from 'react';

/** Available icon names (Lucide-derived line set). */
export type IconName =
  | 'leaf' | 'sprout' | 'trees' | 'shrub' | 'flower'
  | 'sun' | 'ruler' | 'mapPin' | 'bell' | 'message' | 'user'
  | 'heart' | 'repeat' | 'gift' | 'star' | 'lock' | 'sliders'
  | 'handshake' | 'check' | 'x' | 'search' | 'plus' | 'arrowRight'
  | 'sparkles' | 'newspaper' | 'droplet' | 'send';

/**
 * Garden Swap's line-icon system (paths from Lucide, ISC-licensed). Replaces
 * the original app's emoji icons. Renders a 24-grid SVG at 1.75 stroke; pass
 * `fill="currentColor"` for the filled star used in ratings.
 */
export interface IconProps {
  name: IconName;
  /** Pixel size (width = height). @default 20 */
  size?: number;
  /** @default 1.75 */
  strokeWidth?: number;
  /** "none" (outline) or "currentColor" (filled, e.g. star). @default "none" */
  fill?: string;
  /** Stroke color — defaults to currentColor so it inherits text color. */
  color?: string;
  style?: React.CSSProperties;
}

export function Icon(props: IconProps): JSX.Element;
