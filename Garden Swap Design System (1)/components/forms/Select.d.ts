import * as React from 'react';

export type SelectOption = string | { value: string; label: string };

/**
 * Dropdown for filters and forms. size="sm" is the compact filter-bar pill;
 * size="md" is the full-width labelled form field. Pass options as an array
 * or provide <option> children directly.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  /** Field label rendered above (md size, forms). */
  label?: string;
  /** Options as strings or {value,label} objects. */
  options?: SelectOption[];
  /** @default "md" */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Select(props: SelectProps): JSX.Element;
