import * as React from 'react';

/**
 * Breadcrumb trail for nested pages (e.g. Browse › Houseplants › Monstera).
 * Items after the last are linked; the last is plain text (current page).
 *
 * @startingPoint section="Web" subtitle="Breadcrumb — path navigation" viewport="480x36"
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  style?: React.CSSProperties;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
