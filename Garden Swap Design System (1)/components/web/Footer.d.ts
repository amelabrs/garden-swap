import * as React from 'react';

/**
 * Site footer for Garden Swap web. Three-column link grid with brand tagline
 * and bottom copyright bar.
 *
 * @startingPoint section="Web" subtitle="Site footer — brand, links, copyright" viewport="1200x280"
 */
export interface FooterProps {
  onNavigate?: (page: string) => void;
  style?: React.CSSProperties;
}

export function Footer(props: FooterProps): JSX.Element;
