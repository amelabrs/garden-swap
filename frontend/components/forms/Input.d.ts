import * as React from 'react';

/**
 * Text input field with optional label and hint. The border turns green on
 * focus. Use variant="search" for the rounded translucent search field that
 * sits in the dark top bar.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Field label rendered above the input. */
  label?: string;
  /** Muted helper text below the input. */
  hint?: string;
  /** Append an "(optional)" marker to the label. @default false */
  optional?: boolean;
  /** "search" = rounded translucent top-bar field. @default "default" */
  variant?: 'default' | 'search';
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
