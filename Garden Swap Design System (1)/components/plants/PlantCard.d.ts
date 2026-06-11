import * as React from 'react';

/**
 * The hero unit of the Garden Swap feed — a tappable plant listing card with
 * a full-bleed photo, title, status/type/rarity badges, and a distance ·
 * lister · rating footer. Composes the Badge primitive.
 *
 * @startingPoint section="Plants" subtitle="Feed listing card — photo, badges, distance & rating" viewport="320x320"
 */
export interface PlantCardProps {
  /** Photo URL (renders full-bleed, 200px tall, cover). */
  image: string;
  title: string;
  /** Listing status drives the green/blue badge. @default "swap" */
  status?: 'swap' | 'free';
  /** e.g. "Houseplant", "Succulent". */
  plantType?: string;
  /** Optional rarity badge (premium discovery). */
  rarity?: string;
  /** Pre-formatted distance, e.g. "2.1 mi". */
  distance?: string;
  /** Lister display name. */
  lister?: string;
  /** Lister rating, e.g. 4.9 — renders amber "4.9 ⭐". */
  rating?: number;
  /**
   * Card layout. "vertical" = stacked photo-top (mobile + web grid).
   * "horizontal" = photo left, text right (web list/search view). @default "vertical"
   */
  layout?: 'vertical' | 'horizontal';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export function PlantCard(props: PlantCardProps): JSX.Element;
