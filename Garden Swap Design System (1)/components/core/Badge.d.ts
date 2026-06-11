import * as React from 'react';

/**
 * Small uppercase pill labelling a plant's status, type, condition, rarity,
 * or a swap's lifecycle state. The swap=green / free=blue pairing is
 * load-bearing across the feed — keep it consistent.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /**
   * Semantic category. swap/free for listing status; type/condition/rarity
   * for plant attributes; pending/accepted/completed/declined for swap state.
   * @default "type"
   */
  variant?:
    | 'swap'
    | 'free'
    | 'type'
    | 'condition'
    | 'rarity'
    | 'pending'
    | 'accepted'
    | 'completed'
    | 'declined';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
