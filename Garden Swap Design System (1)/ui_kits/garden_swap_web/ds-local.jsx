/* Garden Swap Web UI Kit — ds-local.jsx
   Exposes all design-system components as globals.
   Core/forms/plants come from the compiled bundle.
   Web components come from the bundle when available, with a
   fallback to the direct-Babel-loaded globals for pre-bundle runs. */
const _GS = window.GardenSwapDesignSystem_0373cf || {};
const {
  Button, Badge, Card, Icon, TierBadge,
  Input, Select, PlantCard, StarRating,
} = _GS;
// Web components: bundle takes priority, globals as fallback
const Nav        = _GS.Nav        || window.Nav;
const Footer     = _GS.Footer     || window.Footer;
const Sidebar    = _GS.Sidebar    || window.Sidebar;
const Pagination = _GS.Pagination || window.Pagination;
const Breadcrumb = _GS.Breadcrumb || window.Breadcrumb;
const Alert      = _GS.Alert      || window.Alert;
Object.assign(window, {
  Button, Badge, Card, Icon, TierBadge,
  Input, Select, PlantCard, StarRating,
  Nav, Footer, Sidebar, Pagination, Breadcrumb, Alert,
});
