import * as React from 'react';

/**
 * Inline alert / banner. Four semantic variants using the Potting Shed
 * palette: info (denim), success (fern), warning (honey), error (tomato).
 * Optionally dismissible.
 *
 * @startingPoint section="Web" subtitle="Alert banner — info, success, warning, error" viewport="640x180"
 */
export interface AlertProps {
  /** Visual role. @default "info" */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Bold heading line (optional). */
  title?: string;
  children: React.ReactNode;
  /** Show ✕ dismiss button. @default false */
  dismissible?: boolean;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export function Alert(props: AlertProps): JSX.Element;
