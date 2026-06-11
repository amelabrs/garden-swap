import * as React from 'react';

/**
 * Page-number pagination strip. Renders prev / numbered pages / next with the
 * Potting Shed palette — active page uses fern-600 fill.
 *
 * @startingPoint section="Web" subtitle="Pagination — prev, pages, next" viewport="500x56"
 */
export interface PaginationProps {
  /** Current page (1-indexed). @default 1 */
  page?: number;
  /** Total number of pages. */
  totalPages: number;
  onPage?: (page: number) => void;
  style?: React.CSSProperties;
}

export function Pagination(props: PaginationProps): JSX.Element;
