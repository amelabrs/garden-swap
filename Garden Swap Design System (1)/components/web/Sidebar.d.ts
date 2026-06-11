import * as React from 'react';

/**
 * Filter sidebar for the Garden Swap browse page. Collapsible sections for
 * plant type, status, distance, condition, and light level.
 *
 * @startingPoint section="Web" subtitle="Browse filter sidebar — type, status, distance, condition" viewport="264x620"
 */
export interface SidebarFilters {
  type?: string;
  status?: string;
  distance?: string;
  condition?: string;
  light?: string;
}

export interface SidebarProps {
  filters?: SidebarFilters;
  onChange?: (filters: SidebarFilters) => void;
  onClear?: () => void;
  resultCount?: number;
  style?: React.CSSProperties;
}

export function Sidebar(props: SidebarProps): JSX.Element;
