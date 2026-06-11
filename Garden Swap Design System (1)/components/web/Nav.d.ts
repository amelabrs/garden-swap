import * as React from 'react';

/**
 * Garden Swap site-wide navigation bar. Sticky top rail with logo, primary
 * nav links, global search, notifications, and a user avatar menu. On narrow
 * viewports the link row collapses behind a hamburger.
 *
 * @startingPoint section="Web" subtitle="Sticky top nav — logo, links, search, user menu" viewport="1200x64"
 */
export interface NavProps {
  /** Currently active route. Highlights the matching link. @default "browse" */
  page?: 'browse' | 'swaps' | 'messages' | 'profile' | 'home';
  /** Authenticated user — if absent the nav shows Sign in / Join buttons. */
  user?: {
    name: string;
    avatar?: string;
    /** Tier badge shown next to name. */
    tier?: 'sprout' | 'grower' | 'steward';
  };
  /** Called when a nav link or logo is clicked. */
  onNavigate?: (page: string) => void;
  /** Called when the search form is submitted. */
  onSearch?: (query: string) => void;
  /** Unread notification count — shows a red dot if > 0. @default 0 */
  notifCount?: number;
  style?: React.CSSProperties;
}

export function Nav(props: NavProps): JSX.Element;
