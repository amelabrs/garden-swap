import * as React from 'react';

/**
 * Garden Swap primary action button. Use for every tappable action —
 * primary (green) for the main CTA, danger (orange) for destructive/decline,
 * steward (blue) for the top premium tier, outline/text for low emphasis.
 *
 * @startingPoint section="Core" subtitle="Branded button — primary, danger, steward, outline, text" viewport="700x160"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual role. primary=fern, accent=clay, steward=denim. @default "primary" */
  variant?: 'primary' | 'accent' | 'danger' | 'steward' | 'outline' | 'text';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width. @default false */
  full?: boolean;
  /** Fully-rounded pill shape. @default true */
  pill?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
