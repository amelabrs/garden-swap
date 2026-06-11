import * as React from 'react';

/**
 * The white, 12px-rounded, softly-shadowed surface that underpins nearly
 * every Garden Swap module — plant cards, profile sections, chat rows.
 * Elevation (not borders) does the separating.
 */
export interface CardProps {
  children: React.ReactNode;
  /** Lift + deepen shadow on hover; sets pointer cursor. @default false */
  interactive?: boolean;
  /** Apply standard 20px inner padding. @default false */
  padded?: boolean;
  /** Show the warm kraft hairline border. @default true */
  bordered?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
