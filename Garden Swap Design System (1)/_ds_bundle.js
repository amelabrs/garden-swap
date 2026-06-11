/* @ds-bundle: {"format":3,"namespace":"GardenSwapDesignSystem_0373cf","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"TierBadge","sourcePath":"components/core/TierBadge.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"PlantCard","sourcePath":"components/plants/PlantCard.jsx"},{"name":"StarRating","sourcePath":"components/plants/StarRating.jsx"},{"name":"Alert","sourcePath":"components/web/Alert.jsx"},{"name":"Breadcrumb","sourcePath":"components/web/Breadcrumb.jsx"},{"name":"Footer","sourcePath":"components/web/Footer.jsx"},{"name":"Nav","sourcePath":"components/web/Nav.jsx"},{"name":"Pagination","sourcePath":"components/web/Pagination.jsx"},{"name":"Sidebar","sourcePath":"components/web/Sidebar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"6fe6ab409fe4","components/core/Button.jsx":"b061d187561f","components/core/Card.jsx":"13a0b815d56d","components/core/Icon.jsx":"8dc90fc08573","components/core/TierBadge.jsx":"1a99080b5dfa","components/forms/Input.jsx":"246e52a1c73a","components/forms/Select.jsx":"b3957bb9fac8","components/plants/PlantCard.jsx":"d5f9a5ecebe1","components/plants/StarRating.jsx":"83f9b559c012","components/web/Alert.jsx":"54c1cc84062a","components/web/Breadcrumb.jsx":"58df8cee3c8a","components/web/Footer.jsx":"01b8d8727be6","components/web/Nav.jsx":"0064979c4749","components/web/Pagination.jsx":"5ccd5cab31c3","components/web/Sidebar.jsx":"905283651d6d","ui_kits/garden_swap_app/ChatsScreen.jsx":"653dfe0c95c5","ui_kits/garden_swap_app/FeedScreen.jsx":"05047b4a7416","ui_kits/garden_swap_app/Modals.jsx":"69f93bc488ac","ui_kits/garden_swap_app/PaywallModal.jsx":"f76761c39afa","ui_kits/garden_swap_app/ProfileScreen.jsx":"850179701a96","ui_kits/garden_swap_app/app.jsx":"d82f370c826f","ui_kits/garden_swap_app/data.js":"661c33ca5cfa","ui_kits/garden_swap_app/ds-local.jsx":"2a38191c9566","ui_kits/garden_swap_web/BrowsePage.jsx":"52b3f2c83806","ui_kits/garden_swap_web/DetailPage.jsx":"801e83c3594d","ui_kits/garden_swap_web/ProfilePage.jsx":"71899d9ebff2","ui_kits/garden_swap_web/app.jsx":"c0035abe8c54","ui_kits/garden_swap_web/data.js":"e036be76468f","ui_kits/garden_swap_web/ds-local.jsx":"6bf1ade9947d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GardenSwapDesignSystem_0373cf = window.GardenSwapDesignSystem_0373cf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Badge
 * Small uppercase eyebrow-pill. Warm tints: swap = mint green, free/giveaway
 * = terracotta clay (a gift!), type = sage neutral, condition = honey,
 * rarity = plum, plus the swap-lifecycle states.
 */
function Badge({
  children,
  variant = 'type',
  style,
  ...rest
}) {
  const variants = {
    swap: {
      background: 'var(--badge-swap-fill)',
      color: 'var(--badge-swap-text)'
    },
    free: {
      background: 'var(--badge-free-fill)',
      color: 'var(--badge-free-text)'
    },
    type: {
      background: 'rgba(166,184,152,0.28)',
      color: '#41553A'
    },
    condition: {
      background: 'var(--honey-100)',
      color: '#8A6410'
    },
    rarity: {
      background: 'var(--plum-100)',
      color: 'var(--plum-500)'
    },
    pending: {
      background: 'var(--state-pending-fill)',
      color: 'var(--state-pending-text)'
    },
    accepted: {
      background: 'var(--state-accepted-fill)',
      color: 'var(--state-accepted-text)'
    },
    completed: {
      background: 'var(--state-completed-fill)',
      color: 'var(--state-completed-text)'
    },
    declined: {
      background: 'var(--state-declined-fill)',
      color: 'var(--state-declined-text)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 9px',
    borderRadius: 'var(--radius-badge)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-caps)',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...variants[variant]
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Button
 * Tactile pill/rounded button in the Potting Shed palette. Primary = fern
 * green, accent = terracotta clay, steward = denim, danger = tomato, plus
 * quiet outline/text. Hover lifts slightly and deepens; press settles.
 * Icons (the <Icon> component) go inside the label.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  pill = true,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const sizes = {
    sm: {
      padding: '7px 14px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '14px 26px',
      fontSize: 'var(--text-md)'
    }
  };
  const solid = (bg, bgHover, fg) => ({
    background: hover && !disabled ? bgHover : bg,
    color: fg,
    border: 'none',
    boxShadow: down ? 'none' : 'var(--shadow-xs)'
  });
  const variants = {
    primary: solid('var(--fern-600)', 'var(--pine-700)', 'var(--text-on-primary)'),
    accent: solid('var(--clay-600)', 'var(--clay-700)', '#FFF7F0'),
    steward: solid('var(--denim-600)', 'var(--denim-700)', '#F1F7F8'),
    danger: solid('var(--tomato-600)', '#A23D26', '#FFF3EE'),
    outline: {
      background: hover && !disabled ? 'var(--paper-raised)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--line-strong)'
    },
    text: {
      background: 'none',
      color: 'var(--fern-600)',
      border: 'none',
      padding: 0,
      fontWeight: 'var(--weight-semibold)',
      textDecoration: hover ? 'underline' : 'none'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: '0.01em',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-base), transform var(--dur-fast), box-shadow var(--dur-base)',
    width: full ? '100%' : undefined,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    transform: down && !disabled ? 'translateY(1px)' : 'none',
    opacity: disabled ? 0.5 : 1,
    ...sizes[size],
    ...variants[variant]
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Card
 * The warm-white, generously-rounded surface that holds most modules. A
 * faint kraft hairline plus a soft layered shadow; lifts on hover when
 * interactive.
 */
function Card({
  children,
  interactive = false,
  padded = false,
  bordered = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: bordered ? '1px solid var(--line)' : 'none',
    boxShadow: hover && interactive ? 'var(--shadow-hover)' : 'var(--shadow)',
    overflow: 'hidden',
    cursor: interactive ? 'pointer' : 'default',
    transform: hover && interactive ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
    padding: padded ? 'var(--space-8)' : 0
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Icon
 * The brand icon system. Line icons (paths sourced from Lucide, ISC-licensed)
 * at a consistent 24px grid, 1.75 stroke, round caps. Replaces the original
 * app's emoji-as-icons. Use `name`, `size`, and `color` (defaults to
 * currentColor so icons inherit text color).
 */

// Inner SVG markup per icon (Lucide path data).
const GS_ICONS = {
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  shrub: '<path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/>',
  flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9"/><path d="M7.5 12H9"/><path d="M16.5 12H15"/><path d="M12 16.5V15"/><path d="m8 8 1.88 1.88"/><path d="M14.12 9.88 16 8"/><path d="m8 16 1.88-1.88"/><path d="M14.12 14.12 16 16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  ruler: '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>'
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  fill = 'none',
  color = 'currentColor',
  style,
  ...rest
}) {
  const inner = GS_ICONS[name] || '';
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      flexShrink: 0,
      verticalAlign: 'middle',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}
Icon.names = Object.keys(GS_ICONS);
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/TierBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — TierBadge
 * The Sprout / Grower / Steward identity pill. The growth metaphor now reads
 * through line icons (sprout → shrub → trees) instead of emoji.
 */
function TierBadge({
  tier = 'sprout',
  showGlyph = true,
  style,
  ...rest
}) {
  const tiers = {
    sprout: {
      icon: 'sprout',
      label: 'Sprout',
      background: 'var(--mint-100)',
      color: 'var(--pine-700)'
    },
    grower: {
      icon: 'shrub',
      label: 'Grower',
      background: 'rgba(52,112,70,0.16)',
      color: 'var(--fern-600)'
    },
    steward: {
      icon: 'trees',
      label: 'Steward',
      background: 'var(--denim-100)',
      color: 'var(--denim-700)'
    }
  };
  const t = tiers[tier] || tiers.sprout;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 13px 5px 11px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    background: t.background,
    color: t.color
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest), showGlyph && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 15
  }), t.label);
}
Object.assign(__ds_scope, { TierBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TierBadge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Input
 * Text field matching the product's form styling: 8px radius, grey border
 * that turns green on focus. Supports an optional label and hint. Use
 * variant="search" for the rounded white-on-green top-bar search field.
 */
function Input({
  label,
  hint,
  optional = false,
  variant = 'default',
  type = 'text',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  if (variant === 'search') {
    return /*#__PURE__*/React.createElement("input", _extends({
      type: type,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        width: '100%',
        padding: '9px 16px',
        border: '1px solid rgba(244,237,223,0.18)',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-base)',
        background: focus ? 'rgba(244,237,223,0.22)' : 'rgba(244,237,223,0.12)',
        color: 'var(--text-on-dark)',
        outline: 'none',
        transition: 'background var(--dur-base)',
        ...style
      }
    }, rest));
  }
  const field = {
    width: '100%',
    padding: '11px 14px',
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-sans)',
    background: 'var(--card)',
    color: 'var(--text-body)',
    outline: 'none',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label, ' ', optional && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      fontWeight: 400
    }
  }, "(optional)")), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest)), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — Select
 * Dropdown matching the product's filter/form selects. Two sizes: the
 * compact filter-bar pill and the full-width form field. Border turns
 * green on focus.
 */
function Select({
  label,
  options = [],
  size = 'md',
  style,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      padding: '7px 12px',
      fontSize: 'var(--text-sm)',
      width: 'auto'
    },
    md: {
      padding: '11px 14px',
      fontSize: 'var(--text-base)',
      width: '100%'
    }
  };
  const field = {
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)',
    background: 'var(--card)',
    color: 'var(--text-body)',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
    ...sizes[size]
  };
  const select = /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: label ? field : {
      ...field,
      ...style
    }
  }, rest), children || options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  }));
  if (!label) return select;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label), select);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/plants/PlantCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — PlantCard
 * The hero unit of the feed. Two layouts:
 *  - "vertical" (default) — full-bleed photo top, text below. Mobile + web grid.
 *  - "horizontal" — photo left (fixed width), text right. Web list/search view.
 * Warm-white card with a kraft hairline; lifts on hover.
 */
function PlantCard({
  image,
  title,
  status = 'swap',
  // 'swap' | 'free'
  plantType,
  rarity,
  distance,
  // e.g. "2.1 mi"
  lister,
  rating,
  // e.g. 4.9
  layout = 'vertical',
  // 'vertical' | 'horizontal'
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shell = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--line)',
    boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow)',
    overflow: 'hidden',
    cursor: 'pointer',
    transform: hover ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
    ...(layout === 'horizontal' ? {
      display: 'flex',
      flexDirection: 'row'
    } : {}),
    ...style
  };
  const imgH = layout === 'horizontal' ? '100%' : 188;
  const imgW = layout === 'horizontal' ? 160 : '100%';
  const imgStyle = layout === 'horizontal' ? {
    width: imgW,
    minWidth: imgW,
    height: '100%',
    minHeight: 120,
    objectFit: 'cover',
    display: 'block',
    flexShrink: 0,
    background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))'
  } : {
    width: '100%',
    height: imgH,
    objectFit: 'cover',
    display: 'block',
    background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))'
  };
  const imgWrap = layout === 'horizontal' ? {
    position: 'relative',
    flexShrink: 0,
    width: imgW
  } : {
    position: 'relative'
  };
  const badges = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: status === 'free' ? 'free' : 'swap',
    style: {
      background: status === 'free' ? 'var(--clay-100)' : 'var(--card)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: status === 'free' ? 'gift' : 'repeat',
    size: 12
  }), status === 'free' ? 'Free' : 'Swap'), rarity && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "rarity",
    style: {
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkles",
    size: 11
  }), " ", rarity));
  const body = /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 15px 14px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--ink)',
      marginBottom: 4,
      lineHeight: 1.2
    }
  }, title), plantType && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      marginBottom: 10
    }
  }, plantType)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)',
      paddingTop: 10,
      borderTop: '1px solid var(--line)',
      marginTop: layout === 'horizontal' ? 'auto' : 0
    }
  }, distance && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mapPin",
    size: 14,
    color: "var(--sage-300)"
  }), " ", distance), rating != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: 13,
    fill: "currentColor",
    color: "var(--honey-500)"
  }), " ", rating), lister && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'var(--text-faint)'
    }
  }, lister)));
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: shell
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: imgWrap
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    loading: "lazy",
    onError: e => {
      e.currentTarget.style.opacity = 0;
    },
    style: imgStyle
  }), badges), body);
}
Object.assign(__ds_scope, { PlantCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/plants/PlantCard.jsx", error: String((e && e.message) || e) }); }

// components/plants/StarRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Garden Swap — StarRating
 * Honey-colored stars (the Icon "star"). Read-only display ("4.9 · 12 swaps")
 * or an interactive 1–5 picker for the post-swap rating sheet.
 */
function StarRating({
  value = 0,
  count,
  interactive = false,
  size = 'md',
  onChange,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(0);
  const px = size === 'lg' ? 28 : size === 'sm' ? 15 : 18;
  if (!interactive) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        color: 'var(--honey-600)',
        fontSize: 'var(--text-sm)',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "star",
      size: px,
      fill: "currentColor",
      color: "var(--honey-500)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--ink)'
      }
    }, Number(value).toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)',
        fontWeight: 400
      }
    }, "\xB7 ", count, " swaps"));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 6,
      ...style
    }
  }, rest), [1, 2, 3, 4, 5].map(n => {
    const active = n <= (hover || value);
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      onClick: () => onChange && onChange(n),
      onMouseEnter: () => setHover(n),
      onMouseLeave: () => setHover(0),
      "aria-label": `${n} star${n > 1 ? 's' : ''}`,
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 0,
        color: active ? 'var(--honey-500)' : 'var(--line-strong)',
        transform: active ? 'scale(1)' : 'scale(0.94)',
        transition: 'color var(--dur-fast), transform var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "star",
      size: px,
      fill: "currentColor",
      color: "currentColor"
    }));
  }));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/plants/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/web/Alert.jsx
try { (() => {
/**
 * Garden Swap — Alert (web)
 * Inline banner. info=denim, success=fern, warning=honey, error=tomato.
 * Optional title line and dismiss button.
 */
function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  style
}) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  const dismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };
  const themes = {
    info: {
      fill: 'var(--denim-100)',
      text: 'var(--denim-700)',
      icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01'
    },
    success: {
      fill: 'var(--mint-100)',
      text: 'var(--pine-700)',
      icon: 'M20 6 9 17l-5-5'
    },
    warning: {
      fill: 'var(--honey-100)',
      text: '#7A5C10',
      icon: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
    },
    error: {
      fill: 'var(--clay-100)',
      text: 'var(--clay-700)',
      icon: 'M18 6 6 18M6 6l12 12'
    }
  };
  const t = themes[variant];
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '13px 16px',
      background: t.fill,
      borderRadius: 'var(--radius)',
      border: `1px solid ${t.text}22`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.text,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: t.icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      color: t.text,
      marginBottom: 3
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: t.text,
      lineHeight: 'var(--leading-normal)'
    }
  }, children)), dismissible && /*#__PURE__*/React.createElement("button", {
    onClick: dismiss,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 2,
      color: t.text,
      opacity: 0.6,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(window, {
  Alert
});
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Alert.jsx", error: String((e && e.message) || e) }); }

// components/web/Breadcrumb.jsx
try { (() => {
/**
 * Garden Swap — Breadcrumb (web)
 * Compact path trail separated by › chevrons. All items except the last
 * are clickable links in fern-green.
 */
function Breadcrumb({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flexWrap: 'wrap',
      ...style
    }
  }, items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "var(--ink-faint)",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m9 18 6-6-6-6"
    })), isLast ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-subtle)',
        fontFamily: 'var(--font-sans)'
      }
    }, item.label) : /*#__PURE__*/React.createElement("button", {
      onClick: item.onClick,
      style: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--fern-600)',
        fontWeight: 500
      },
      onMouseEnter: e => e.currentTarget.style.textDecoration = 'underline',
      onMouseLeave: e => e.currentTarget.style.textDecoration = 'none'
    }, item.label));
  }));
}
Object.assign(window, {
  Breadcrumb
});
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/web/Footer.jsx
try { (() => {
/**
 * Garden Swap — Footer (web)
 * Three-column link grid on a warm kraft background, with logo tagline and
 * bottom copyright bar in pine-900.
 */
function Footer({
  onNavigate,
  style
}) {
  const go = id => onNavigate?.(id);
  const col = (heading, links) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      color: 'var(--ink-faint)'
    }
  }, heading), links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      padding: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)',
      transition: 'color var(--dur-base)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fern-600)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-subtle)'
  }, label)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--paper-raised)',
      borderTop: '1px solid var(--line)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--web-content-lg)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--web-page-px)',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 28 28",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "14",
    r: "14",
    fill: "var(--fern-600)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 22c-4 0-7-3-7-7 0-3 2-5.5 5-6.5C14 6 16 4 18 3c.5 1.5.5 4 0 6-1.5 2-3 3-4 4 2 0 4.5-1 6-3 .5 2.5 0 5-2 7-1.5 1.5-3 2-4 2z",
    fill: "#F4EDDF"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1rem',
      fontWeight: 500,
      color: 'var(--ink)'
    }
  }, "Garden Swap")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)',
      lineHeight: 'var(--leading-normal)',
      maxWidth: 240
    }
  }, "Trade, gift, and discover plants with growers in your neighbourhood.")), col('Explore', [['browse', 'Browse Plants'], ['map', 'Map View'], ['free', 'Free Plants'], ['trending', 'Trending']]), col('Community', [['how-it-works', 'How It Works'], ['forum', 'Forum'], ['blog', 'Garden Blog'], ['stewards', 'Stewards']]), col('Account', [['profile', 'My Profile'], ['listings', 'My Listings'], ['swaps', 'My Swaps'], ['settings', 'Settings']])), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--pine-900)',
      padding: '14px var(--web-page-px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'rgba(244,237,223,0.45)',
      fontFamily: 'var(--font-sans)'
    }
  }, "\xA9 2026 Garden Swap. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, [['privacy', 'Privacy'], ['terms', 'Terms'], ['contact', 'Contact']].map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-sans)',
      color: 'rgba(244,237,223,0.45)'
    }
  }, label)))));
}
Object.assign(window, {
  Footer
});
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Footer.jsx", error: String((e && e.message) || e) }); }

// components/web/Nav.jsx
try { (() => {
/**
 * Garden Swap — Nav (web)
 * Sticky pine-900 top bar: wordmark logo, primary links, global search,
 * notification bell, and user avatar menu. Collapses to hamburger below 900px.
 */
function Nav({
  page = 'browse',
  user,
  onNavigate,
  onSearch,
  notifCount = 0,
  style
}) {
  const [searchVal, setSearchVal] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchFocus, setSearchFocus] = React.useState(false);
  const links = [{
    id: 'browse',
    label: 'Browse'
  }, {
    id: 'swaps',
    label: 'My Swaps'
  }, {
    id: 'messages',
    label: 'Messages'
  }];
  const go = id => {
    onNavigate?.(id);
    setMobileOpen(false);
  };
  const tierColors = {
    sprout: {
      bg: 'var(--mint-100)',
      color: 'var(--pine-700)'
    },
    grower: {
      bg: 'var(--honey-100)',
      color: '#8A6410'
    },
    steward: {
      bg: 'var(--denim-100)',
      color: 'var(--denim-700)'
    }
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 'var(--web-nav-h)',
      background: 'var(--pine-900)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(16px, 3vw, 40px)',
      gap: 0,
      boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0 20px 0 0',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "14",
    r: "14",
    fill: "var(--fern-600)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 22c-4 0-7-3-7-7 0-3 2-5.5 5-6.5C14 6 16 4 18 3c.5 1.5.5 4 0 6-1.5 2-3 3-4 4 2 0 4.5-1 6-3 .5 2.5 0 5-2 7-1.5 1.5-3 2-4 2z",
    fill: "#F4EDDF"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.1rem',
      fontWeight: 500,
      color: 'var(--paper)',
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap'
    }
  }, "Garden Swap")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: 1
    },
    className: "gs-web-nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => go(l.id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      fontWeight: page === l.id ? 600 : 400,
      color: page === l.id ? 'var(--paper)' : 'rgba(244,237,223,0.62)',
      background: page === l.id ? 'rgba(255,255,255,0.10)' : 'transparent',
      transition: 'background var(--dur-base), color var(--dur-base)'
    }
  }, l.label))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSearch?.(searchVal);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      background: searchFocus ? 'rgba(244,237,223,0.18)' : 'rgba(244,237,223,0.10)',
      border: `1px solid ${searchFocus ? 'rgba(244,237,223,0.3)' : 'rgba(244,237,223,0.12)'}`,
      borderRadius: 'var(--radius-pill)',
      padding: '0 14px',
      gap: 8,
      transition: 'background var(--dur-base), border-color var(--dur-base)',
      width: searchFocus ? 240 : 190,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgba(244,237,223,0.5)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", {
    value: searchVal,
    onChange: e => setSearchVal(e.target.value),
    onFocus: () => setSearchFocus(true),
    onBlur: () => setSearchFocus(false),
    placeholder: "Search plants\u2026",
    style: {
      background: 'none',
      border: 'none',
      outline: 'none',
      fontSize: 'var(--text-sm)',
      color: 'var(--paper)',
      width: '100%',
      padding: '8px 0'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      paddingLeft: 12,
      flexShrink: 0
    }
  }, user && /*#__PURE__*/React.createElement("button", {
    onClick: () => go('notifications'),
    style: {
      position: 'relative',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 8,
      borderRadius: 'var(--radius-full)',
      color: 'rgba(244,237,223,0.7)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.268 21a2 2 0 0 0 3.464 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
  })), notifCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 7,
      height: 7,
      background: 'var(--tomato-600)',
      borderRadius: 'var(--radius-full)',
      border: '1.5px solid var(--pine-900)'
    }
  })), user ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenuOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'none',
      border: '1px solid rgba(244,237,223,0.18)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 10px 5px 6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-full)',
      background: 'var(--fern-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: 'var(--paper)',
      overflow: 'hidden',
      flexShrink: 0
    }
  }, user.avatar ? /*#__PURE__*/React.createElement("img", {
    src: user.avatar,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : user.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-sans)'
    }
  }, user.name.split(' ')[0]), user.tier && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.65rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      padding: '2px 6px',
      borderRadius: 'var(--radius-badge)',
      ...tierColors[user.tier]
    }
  }, user.tier)), menuOpen && /*#__PURE__*/React.createElement("div", {
    onClick: () => setMenuOpen(false),
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-modal)',
      minWidth: 180,
      overflow: 'hidden',
      zIndex: 200
    }
  }, [['profile', 'My Profile'], ['listings', 'My Listings'], ['settings', 'Settings'], ['signout', 'Sign out']].map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id),
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '10px 16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      color: id === 'signout' ? 'var(--tomato-600)' : 'var(--text-body)',
      borderTop: id === 'signout' ? '1px solid var(--line)' : 'none'
    }
  }, label)))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('signin'),
    style: {
      background: 'none',
      border: '1px solid rgba(244,237,223,0.3)',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      padding: '7px 16px',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--paper)'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('join'),
    style: {
      background: 'var(--fern-600)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      padding: '7px 16px',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      color: 'var(--text-on-primary)'
    }
  }, "Join free"))));
}
Object.assign(window, {
  Nav
});
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Nav.jsx", error: String((e && e.message) || e) }); }

// components/web/Pagination.jsx
try { (() => {
/**
 * Garden Swap — Pagination (web)
 * Prev / numbered / Next strip. Active page filled with fern-600;
 * neighbours ±2 shown with ellipsis beyond.
 */
function Pagination({
  page = 1,
  totalPages,
  onPage,
  style
}) {
  if (totalPages <= 1) return null;
  const go = p => {
    if (p >= 1 && p <= totalPages) onPage?.(p);
  };

  // Build page list with ellipsis
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i >= page - 2 && i <= page + 2) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }
  const Btn = ({
    children,
    active,
    disabled,
    onClick
  }) => {
    const [hov, setHov] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      disabled: disabled,
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        minWidth: 36,
        height: 36,
        padding: '0 6px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius)',
        border: active ? 'none' : '1px solid var(--line)',
        background: active ? 'var(--fern-600)' : hov && !disabled ? 'var(--paper-raised)' : 'var(--card)',
        color: active ? 'white' : disabled ? 'var(--ink-faint)' : 'var(--text-body)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: active ? 600 : 400,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background var(--dur-base)',
        opacity: disabled ? 0.4 : 1
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    disabled: page === 1,
    onClick: () => go(page - 1)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m15 18-6-6 6-6"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4
    }
  }, "Prev")), pages.map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: `e${i}`,
    style: {
      padding: '0 4px',
      color: 'var(--ink-faint)',
      fontSize: 'var(--text-sm)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement(Btn, {
    key: p,
    active: p === page,
    onClick: () => go(p)
  }, p)), /*#__PURE__*/React.createElement(Btn, {
    disabled: page === totalPages,
    onClick: () => go(page + 1)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 4
    }
  }, "Next"), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  }))));
}
Object.assign(window, {
  Pagination
});
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/web/Sidebar.jsx
try { (() => {
/**
 * Garden Swap — Sidebar (web)
 * Filter panel for the Browse page. Collapsible sections with radio groups
 * and a clear-all link. Sits in a 264px column at ≥ 900px.
 */
function Sidebar({
  filters = {},
  onChange,
  onClear,
  resultCount,
  style
}) {
  const set = (key, val) => onChange?.({
    ...filters,
    [key]: val
  });
  const [open, setOpen] = React.useState({
    type: true,
    status: true,
    distance: true,
    condition: false,
    light: false
  });
  const toggle = k => setOpen(o => ({
    ...o,
    [k]: !o[k]
  }));
  const activeCount = Object.values(filters).filter(Boolean).length;
  const Section = ({
    id,
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggle(id),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '13px 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, label, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--ink-faint)",
    strokeWidth: "2",
    strokeLinecap: "round",
    style: {
      transform: open[id] ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), open[id] && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, children));
  const Radio = ({
    group,
    value,
    label
  }) => {
    const active = filters[group] === value || !filters[group] && value === '';
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        color: active ? 'var(--pine-700)' : 'var(--text-body)',
        fontWeight: active ? 600 : 400
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 'var(--radius-full)',
        flexShrink: 0,
        border: `2px solid ${active ? 'var(--fern-600)' : 'var(--line-strong)'}`,
        background: active ? 'var(--fern-600)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all var(--dur-base)'
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: 'white'
      }
    })), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: group,
      value: value,
      checked: active,
      onChange: () => set(group, value || undefined),
      style: {
        display: 'none'
      }
    }), label);
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--web-sidebar-w)',
      flexShrink: 0,
      background: 'var(--surface-page)',
      padding: '0 0 var(--space-10)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, "Filters ", activeCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--fern-600)',
      color: 'white',
      fontSize: '0.65rem',
      fontWeight: 700,
      marginLeft: 6
    }
  }, activeCount)), activeCount > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'var(--text-xs)',
      color: 'var(--fern-600)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600
    }
  }, "Clear all")), resultCount != null && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      paddingBottom: 8
    }
  }, resultCount, " plant", resultCount !== 1 ? 's' : '', " found"), /*#__PURE__*/React.createElement(Section, {
    id: "type",
    label: "Plant Type"
  }, ['', 'Houseplant', 'Succulent', 'Cutting', 'Herb', 'Seed', 'Tree & Shrub', 'Aquatic'].map(v => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    group: "type",
    value: v,
    label: v || 'All types'
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "status",
    label: "Listing Type"
  }, [['', 'All listings'], ['swap', 'Swap'], ['free', 'Free / Giveaway']].map(([v, l]) => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    group: "status",
    value: v,
    label: l
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "distance",
    label: "Distance"
  }, [['', 'Any distance'], ['2', 'Within 2 mi'], ['5', 'Within 5 mi'], ['10', 'Within 10 mi'], ['25', 'Within 25 mi']].map(([v, l]) => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    group: "distance",
    value: v,
    label: l
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "condition",
    label: "Condition"
  }, ['', 'Healthy', 'Fresh Cutting', 'Seed Packet', 'Bare Root'].map(v => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    group: "condition",
    value: v,
    label: v || 'Any condition'
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "light",
    label: "Light Needs"
  }, ['', 'Full Sun', 'Partial Sun', 'Low Light'].map(v => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    group: "light",
    value: v,
    label: v || 'Any light'
  }))));
}
Object.assign(window, {
  Sidebar
});
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/ChatsScreen.jsx
try { (() => {
/* Garden Swap UI kit — Chats list + thread */
function ChatsScreen({
  onOpenChat
}) {
  const {
    Badge,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 500,
      marginBottom: 14,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Your swaps"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, window.GS_CHATS.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    onClick: () => onOpenChat(c),
    style: {
      padding: 14,
      background: 'var(--card)',
      borderRadius: 'var(--radius-card)',
      border: '1px solid var(--line)',
      boxShadow: 'var(--shadow)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-md)'
    }
  }, c.listingTitle), /*#__PURE__*/React.createElement(Badge, {
    variant: c.state
  }, c.state)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)',
      marginBottom: 6
    }
  }, "with ", c.other, " \xB7 ", /*#__PURE__*/React.createElement(Icon, {
    name: c.swapType === 'trade' ? 'repeat' : 'gift',
    size: 13
  }), " ", c.swapType === 'trade' ? 'Swap' : 'Free'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.preview)))));
}
function ChatThread({
  chat,
  onClose,
  onAccept,
  onRate
}) {
  const {
    Button,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const [msgs, setMsgs] = React.useState(chat.messages);
  const [draft, setDraft] = React.useState('');
  const [state, setState] = React.useState(chat.state);
  const endRef = React.useRef(null);
  React.useEffect(() => {
    if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight;
  }, [msgs]);
  function send() {
    if (!draft.trim()) return;
    setMsgs([...msgs, {
      mine: true,
      body: draft.trim(),
      time: 'now'
    }]);
    setDraft('');
  }
  return /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--line)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
      background: 'var(--card)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-md)'
    }
  }, chat.listingTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)'
    }
  }, "with ", chat.other, " \xB7 ", state)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: iconClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    ref: endRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      background: 'var(--paper)'
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      maxWidth: '76%',
      padding: '9px 13px',
      borderRadius: 16,
      fontSize: 'var(--text-base)',
      lineHeight: 1.4,
      alignSelf: m.mine ? 'flex-end' : 'flex-start',
      borderBottomRightRadius: m.mine ? 5 : 16,
      borderBottomLeftRadius: m.mine ? 16 : 5,
      background: m.mine ? 'var(--mint-200)' : 'var(--card)',
      border: m.mine ? 'none' : '1px solid var(--line)',
      color: m.mine ? 'var(--pine-900)' : 'var(--ink)'
    }
  }, !m.mine && m.sender && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      fontWeight: 600,
      color: 'var(--fern-600)',
      marginBottom: 2
    }
  }, m.sender), /*#__PURE__*/React.createElement("div", null, m.body), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: m.mine ? 'rgba(20,48,29,0.5)' : 'var(--text-faint)',
      marginTop: 3
    }
  }, m.time)))), state === 'pending' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      display: 'flex',
      gap: 8,
      borderTop: '1px solid var(--line)',
      background: 'var(--card)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => setState('accepted')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  }), " Accept"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm",
    onClick: () => setState('declined')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15
  }), " Decline")), state === 'accepted' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      borderTop: '1px solid var(--line)',
      background: 'var(--card)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => setState('completed')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "handshake",
    size: 16
  }), " Confirm handoff complete")), state === 'completed' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      borderTop: '1px solid var(--line)',
      background: 'var(--card)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onRate
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 15,
    fill: "currentColor"
  }), " Rate this swap")), state !== 'declined' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '10px 16px',
      borderTop: '1px solid var(--line)',
      background: 'var(--card)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyUp: e => e.key === 'Enter' && send(),
    placeholder: "Type a message\u2026",
    style: {
      flex: 1,
      padding: '10px 14px',
      border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-base)',
      outline: 'none',
      fontFamily: 'var(--font-sans)',
      background: 'var(--card)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    pill: true,
    onClick: send,
    "aria-label": "Send"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  }))));
}
Object.assign(window, {
  ChatsScreen,
  ChatThread
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/ChatsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/FeedScreen.jsx
try { (() => {
/* Garden Swap UI kit — Feed (Swap) screen */
function FeedScreen({
  tier,
  onOpenListing,
  onOpenPaywall
}) {
  const {
    PlantCard,
    Select,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const isSprout = tier === 'sprout';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gs-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 13,
    color: "var(--clay-600)"
  }), " Within 10 miles \xB7 560001"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 500,
      marginTop: 6,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Plants near you")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '4px 16px 14px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: ['All Types', 'Houseplant', 'Succulent', 'Cutting', 'Seed', 'Herb']
  }), /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: ['All Status', 'Swap', 'Free']
  }), /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: ['10 mi', '5 mi', '25 mi']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 14,
      padding: '0 16px'
    }
  }, window.GS_LISTINGS.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: l.id
  }, isSprout && i === 3 && /*#__PURE__*/React.createElement(AdBanner, {
    onClick: () => onOpenPaywall('ad_free')
  }), /*#__PURE__*/React.createElement(PlantCard, {
    image: l.image,
    title: l.title,
    status: l.status,
    plantType: l.plantType,
    rarity: l.rarity,
    distance: l.distance,
    lister: l.lister,
    rating: l.rating,
    onClick: () => onOpenListing(l)
  })))));
}
function AdBanner({
  onClick
}) {
  const {
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'linear-gradient(135deg, var(--yellow-ad-1), var(--yellow-ad-2))',
      border: '1px solid var(--yellow-ad-border)',
      borderRadius: 'var(--radius-card)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gs-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      color: 'var(--yellow-ad-label)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 12
  }), " Sponsored"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      color: 'var(--pine-700)',
      fontSize: 'var(--text-md)'
    }
  }, "Go ad-free with Grower"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-sm)'
    }
  }, "Upgrade for \u20B999/mo and never see ads again")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '7px 14px',
      background: 'var(--fern-600)',
      color: 'var(--text-on-primary)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, "Upgrade ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 14
  })));
}
Object.assign(window, {
  FeedScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/FeedScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/Modals.jsx
try { (() => {
/* Garden Swap UI kit — shared modal shells + detail / paywall / rating / new-listing / swap-request */

const iconClose = {
  border: 'none',
  background: 'transparent',
  color: 'var(--text-subtle)',
  width: 32,
  height: 32,
  borderRadius: 'var(--radius-full)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};
const closeX = {
  position: 'absolute',
  top: 12,
  right: 12,
  border: 'none',
  background: 'rgba(20,30,18,0.45)',
  color: '#fff',
  width: 34,
  height: 34,
  borderRadius: 'var(--radius-full)',
  cursor: 'pointer',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
function CloseBtn({
  onClose,
  onImage = false
}) {
  const {
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: onImage ? closeX : {
      ...iconClose,
      position: 'absolute',
      top: 14,
      right: 14,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: onImage ? 18 : 20,
    color: onImage ? '#fff' : 'var(--text-subtle)'
  }));
}

/* Full-cover panel inside the phone (used by chat thread) */
function Sheet({
  children,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--card)',
      zIndex: 300,
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}

/* Centered card over a scrim (detail, paywall, rating) */
function Modal({
  children,
  onClose,
  maxWidth = 460
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 300,
      background: 'var(--scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--card)',
      borderRadius: 'var(--radius-lg)',
      width: '100%',
      maxWidth,
      maxHeight: '90%',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: 'var(--shadow-modal)'
    }
  }, children));
}
const modalTitle = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontSize: 'var(--text-xl)',
  letterSpacing: 'var(--tracking-tight)',
  color: 'var(--ink)'
};

/* ── Listing detail ─────────────────────────────────────────── */
function DetailModal({
  listing,
  onClose,
  onRequestSwap
}) {
  const {
    Badge,
    Button,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement(CloseBtn, {
    onClose: onClose,
    onImage: true
  }), /*#__PURE__*/React.createElement("img", {
    src: listing.image,
    alt: listing.title,
    onError: e => {
      e.currentTarget.style.opacity = 0;
    },
    style: {
      width: '100%',
      height: 240,
      objectFit: 'cover',
      display: 'block',
      background: 'linear-gradient(150deg,var(--mint-200),var(--fern-400))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px 22px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...modalTitle,
      marginBottom: 10
    }
  }, listing.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: listing.status === 'free' ? 'free' : 'swap'
  }, /*#__PURE__*/React.createElement(Icon, {
    name: listing.status === 'free' ? 'gift' : 'repeat',
    size: 12
  }), listing.status === 'free' ? 'Free' : 'Swap'), /*#__PURE__*/React.createElement(Badge, {
    variant: "type"
  }, listing.plantType), /*#__PURE__*/React.createElement(Badge, {
    variant: "condition"
  }, listing.condition), listing.rarity && /*#__PURE__*/React.createElement(Badge, {
    variant: "rarity"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 11
  }), " ", listing.rarity)), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink)',
      lineHeight: 'var(--leading-normal)',
      marginBottom: 16
    }
  }, listing.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginBottom: 16,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)'
    }
  }, listing.light && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 15,
    color: "var(--honey-500)"
  }), " ", listing.light), listing.size && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ruler",
    size: 15,
    color: "var(--sage-300)"
  }), " ", listing.size)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      marginBottom: 16,
      background: 'var(--paper-raised)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      background: 'linear-gradient(135deg,var(--mint-200),var(--fern-500))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 600
    }
  }, listing.lister), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-sm)',
      color: 'var(--honey-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 13,
    fill: "currentColor",
    color: "var(--honey-500)"
  }), " ", listing.rating)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 14,
    color: "var(--clay-600)"
  }), " ", listing.distance)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onRequestSwap
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "repeat",
    size: 17
  }), " Request Swap")));
}

/* ── Swap request ───────────────────────────────────────────── */
function SwapRequestModal({
  listing,
  onClose,
  onSend
}) {
  const {
    Button,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const [offer, setOffer] = React.useState('trade');
  const [msg, setMsg] = React.useState('');
  const opt = (val, icon, label) => /*#__PURE__*/React.createElement("label", {
    onClick: () => setOffer(val),
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      cursor: 'pointer',
      padding: '12px 14px',
      borderRadius: 'var(--radius)',
      border: `1.5px solid ${offer === val ? 'var(--fern-500)' : 'var(--line)'}`,
      background: offer === val ? 'var(--mint-100)' : 'var(--card)',
      transition: 'all var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    color: offer === val ? 'var(--fern-600)' : 'var(--text-subtle)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: offer === val ? 600 : 400
    }
  }, label));
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    maxWidth: 440
  }, /*#__PURE__*/React.createElement(CloseBtn, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 26px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...modalTitle,
      marginBottom: 16
    }
  }, "Request a swap"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '11px 14px',
      background: 'var(--paper-raised)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 16,
    color: "var(--fern-600)"
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500
    }
  }, listing.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontSize: 'var(--text-sm)'
    }
  }, "\xB7 ", listing.lister)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "gs-eyebrow",
    style: {
      display: 'block',
      marginBottom: 9
    }
  }, "What would you like to offer?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, opt('trade', 'leaf', 'Offer one of my plants'), opt('giveaway', 'gift', 'Request as a giveaway'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "gs-eyebrow",
    style: {
      display: 'block',
      marginBottom: 6
    }
  }, "Message to the lister (optional)"), /*#__PURE__*/React.createElement("textarea", {
    value: msg,
    onChange: e => setMsg(e.target.value),
    rows: 2,
    maxLength: 250,
    placeholder: "Hi! I love your plant\u2026",
    style: {
      width: '100%',
      padding: '11px 14px',
      border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--text-base)',
      resize: 'vertical',
      fontFamily: 'var(--font-sans)',
      background: 'var(--card)',
      color: 'var(--ink)'
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onSend
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  }), " Send Request & Open Chat")));
}

/* ── Rating ─────────────────────────────────────────────────── */
function RatingModal({
  onClose
}) {
  const {
    Button,
    StarRating
  } = window.GardenSwapDesignSystem_0373cf;
  const [score, setScore] = React.useState(0);
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    maxWidth: 400
  }, /*#__PURE__*/React.createElement(CloseBtn, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 26px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...modalTitle,
      marginBottom: 8
    }
  }, "Rate this swap"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 18,
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-base)'
    }
  }, "How was your swap with Kabir?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(StarRating, {
    value: score,
    interactive: true,
    size: "lg",
    onChange: setScore
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      marginBottom: 18
    }
  }, score ? `${score} of 5 stars` : 'Tap to rate'), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    maxLength: 200,
    placeholder: "Add a note (optional)\u2026",
    style: {
      width: '100%',
      padding: '11px 14px',
      border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--text-base)',
      resize: 'vertical',
      fontFamily: 'var(--font-sans)',
      background: 'var(--card)',
      marginBottom: 18,
      textAlign: 'left'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onClose
  }, "Submit Rating")));
}

/* ── New listing ────────────────────────────────────────────── */
function NewListingModal({
  onClose
}) {
  const {
    Button,
    Input,
    Select,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const [status, setStatus] = React.useState('swap');
  const statusOpt = (val, icon, label) => /*#__PURE__*/React.createElement("label", {
    onClick: () => setStatus(val),
    style: {
      flex: 1,
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '11px 10px',
      borderRadius: 'var(--radius)',
      border: `1.5px solid ${status === val ? 'var(--fern-500)' : 'var(--line)'}`,
      background: status === val ? 'var(--mint-100)' : 'var(--card)',
      fontSize: 'var(--text-base)',
      fontWeight: status === val ? 600 : 400,
      transition: 'all var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: status === val ? 'var(--fern-600)' : 'var(--text-subtle)'
  }), " ", label);
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    maxWidth: 440
  }, /*#__PURE__*/React.createElement(CloseBtn, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: modalTitle
  }, "List your plant"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px dashed var(--line-strong)',
      borderRadius: 'var(--radius)',
      padding: '26px 12px',
      textAlign: 'center',
      color: 'var(--text-faint)',
      fontSize: 'var(--text-sm)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      background: 'var(--paper-raised)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 24,
    color: "var(--sage-300)"
  }), "Add photos (min 1, max 5)"), /*#__PURE__*/React.createElement(Input, {
    label: "Plant name",
    placeholder: "e.g. Monstera Deliciosa"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Plant type",
    options: ['Select type…', 'Houseplant', 'Succulent', 'Cutting', 'Seed', 'Herb']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Condition",
    options: ['Select condition…', 'Healthy', 'Needs TLC', 'Fresh Cutting', 'Seed Packet']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "gs-eyebrow",
    style: {
      display: 'block',
      marginBottom: 9
    }
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, statusOpt('swap', 'repeat', 'Swap'), statusOpt('free', 'gift', 'Free / Giveaway'))), /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 14,
    color: "var(--clay-600)"
  }), " Location: your registered zip code"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onClose
  }, "Publish Listing")));
}
Object.assign(window, {
  Sheet,
  Modal,
  closeX,
  iconClose,
  CloseBtn,
  DetailModal,
  SwapRequestModal,
  RatingModal,
  NewListingModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/Modals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/PaywallModal.jsx
try { (() => {
/* Garden Swap UI kit — Paywall (tier comparison) */
function PaywallModal({
  reason,
  onClose,
  onSubscribe
}) {
  const {
    Button,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const tiers = [{
    key: 'sprout',
    icon: 'sprout',
    name: 'Sprout',
    price: 'Free',
    featured: false,
    accent: 'var(--pine-700)',
    feats: ['Up to 3 listings', 'Up to 5 wish items', 'Basic search & filters', 'Direct swap requests'],
    no: ['Smart match alerts', 'Advanced filters', 'Ad-free feed'],
    cta: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      full: true,
      disabled: true
    }, "Current Plan")
  }, {
    key: 'grower',
    icon: 'shrub',
    name: 'Grower',
    price: '₹99',
    featured: true,
    accent: 'var(--fern-600)',
    feats: ['Unlimited listings', 'Unlimited wish list', 'Smart match alerts', 'Advanced filters', 'Ad-free feed', 'Magazine access'],
    no: [],
    cta: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      full: true,
      onClick: () => onSubscribe('grower')
    }, "Upgrade to Grower")
  }, {
    key: 'steward',
    icon: 'trees',
    name: 'Steward',
    price: '₹249',
    featured: false,
    accent: 'var(--denim-700)',
    feats: ['Everything in Grower', '10–15% courier discount', 'Elite community status', 'AI Plant Doctor (soon)'],
    no: [],
    cta: /*#__PURE__*/React.createElement(Button, {
      variant: "steward",
      full: true,
      onClick: () => onSubscribe('steward')
    }, "Upgrade to Steward")
  }];
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onClose,
    maxWidth: 520
  }, /*#__PURE__*/React.createElement(CloseBtn, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 22px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gs-eyebrow",
    style: {
      color: 'var(--clay-600)',
      marginBottom: 8
    }
  }, "Garden Swap Membership"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-2xl)',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 8
    }
  }, "Unlock more with Garden Swap"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-base)'
    }
  }, reason)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, tiers.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.key,
    style: {
      border: `1.5px solid ${t.featured ? 'var(--fern-500)' : 'var(--line)'}`,
      background: t.featured ? 'var(--mint-100)' : 'var(--card)',
      borderRadius: 'var(--radius-card)',
      padding: '18px 18px 16px',
      position: 'relative',
      boxShadow: t.featured ? 'var(--shadow)' : 'none'
    }
  }, t.featured && /*#__PURE__*/React.createElement("div", {
    className: "gs-eyebrow",
    style: {
      position: 'absolute',
      top: -11,
      left: 18,
      background: 'var(--fern-600)',
      color: 'var(--paper)',
      padding: '3px 12px',
      borderRadius: 'var(--radius-pill)',
      letterSpacing: 'var(--tracking-caps)'
    }
  }, "Most Popular"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-lg)',
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 20,
    color: t.accent
  }), " ", t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-price)',
      fontWeight: 800,
      color: 'var(--pine-700)',
      lineHeight: 1
    }
  }, t.price, t.price !== 'Free' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 500,
      color: 'var(--text-faint)'
    }
  }, "/mo"))), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      fontSize: 'var(--text-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      marginBottom: 14
    }
  }, t.feats.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "var(--fern-500)"
  }), " ", f)), t.no.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15,
    color: "var(--line-strong)"
  }), " ", f))), t.cta))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      marginTop: 18
    }
  }, "Cancel anytime. No hidden fees.")));
}
Object.assign(window, {
  PaywallModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/PaywallModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/ProfileScreen.jsx
try { (() => {
/* Garden Swap UI kit — Profile */
function ProfileScreen({
  tier,
  onUpgrade,
  onOpenListing
}) {
  const {
    TierBadge,
    Button,
    StarRating,
    Badge,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const wish = window.GS_WISHLIST;
  const myListings = window.GS_LISTINGS.slice(0, 3);
  const isSprout = tier === 'sprout';
  const sectionTitle = {
    fontFamily: 'var(--font-serif)',
    fontWeight: 500,
    fontSize: 'var(--text-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 7
  };
  const panel = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--line)',
    boxShadow: 'var(--shadow)',
    padding: 18
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 22,
      ...panel
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 68,
      height: 68,
      borderRadius: 'var(--radius-full)',
      margin: '0 auto 12px',
      background: 'linear-gradient(135deg,var(--mint-200),var(--fern-500))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 30,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-xl)',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 4
    }
  }, "Devi Sharma"), /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      color: 'var(--text-faint)',
      fontSize: 'var(--text-sm)',
      marginBottom: 12
    }
  }, "@devi ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--line-strong)'
    }
  }, "\xB7"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 13,
    color: "var(--clay-600)"
  }), " 560001"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(StarRating, {
    value: 4.8,
    count: 23
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TierBadge, {
    tier: tier
  }), isSprout ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onUpgrade
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14
  }), " Upgrade Plan") : /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Manage Plan"))), /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: sectionTitle
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 17,
    color: "var(--clay-600)"
  }), " Wish list", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      fontWeight: 400
    }
  }, wish.length, isSprout ? '/5' : '')), /*#__PURE__*/React.createElement(Button, {
    variant: "text"
  }, "+ Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, wish.map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 13px',
      background: 'var(--mint-100)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--text-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 15,
    color: "var(--fern-600)"
  }), " ", w), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      display: 'flex',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15
  })))))), /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...sectionTitle,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 17,
    color: "var(--fern-600)"
  }), " Your listings ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      fontWeight: 400
    }
  }, myListings.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, myListings.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => onOpenListing(l),
    style: {
      background: 'var(--card)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--line)',
      overflow: 'hidden',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.image,
    alt: l.title,
    onError: e => {
      e.currentTarget.style.opacity = 0;
    },
    style: {
      width: '100%',
      height: 88,
      objectFit: 'cover',
      display: 'block',
      background: 'linear-gradient(150deg,var(--mint-200),var(--fern-400))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 11px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--text-sm)',
      marginBottom: 7,
      lineHeight: 1.2
    }
  }, l.title), /*#__PURE__*/React.createElement(Badge, {
    variant: l.status === 'free' ? 'free' : 'swap'
  }, /*#__PURE__*/React.createElement(Icon, {
    name: l.status === 'free' ? 'gift' : 'repeat',
    size: 11
  }), l.status === 'free' ? 'Free' : 'Swap')))))));
}
Object.assign(window, {
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/app.jsx
try { (() => {
/* Garden Swap UI kit — app shell + orchestration */
const {
  useState
} = React;
function TopBar({
  tier
}) {
  const {
    Input,
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const isSprout = tier === 'sprout';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      background: 'var(--pine-900)',
      color: 'var(--text-on-dark)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-full)',
      background: 'var(--fern-500)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 17,
    color: "var(--paper)"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      color: 'var(--paper)',
      letterSpacing: '0'
    }
  }, "Garden Swap")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: chromeBtn,
    title: "Location",
    "aria-label": "Location"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mapPin",
    size: 18,
    color: "var(--paper)"
  })), !isSprout && /*#__PURE__*/React.createElement("button", {
    style: chromeBtn,
    title: "Notifications",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18,
    color: "var(--paper)"
  })), /*#__PURE__*/React.createElement("button", {
    style: chromeBtn,
    title: "Profile",
    "aria-label": "Account"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18,
    color: "var(--paper)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexBasis: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      display: 'flex',
      pointerEvents: 'none',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "var(--paper)"
  })), /*#__PURE__*/React.createElement(Input, {
    variant: "search",
    placeholder: "Search plants near you\u2026",
    style: {
      paddingLeft: 38
    }
  })));
}
const chromeBtn = {
  width: 38,
  height: 38,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 'var(--radius-full)',
  background: 'rgba(244,237,223,0.10)',
  cursor: 'pointer'
};
function BottomNav({
  view,
  setView
}) {
  const {
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const items = [{
    k: 'feed',
    label: 'Swap',
    icon: 'leaf'
  }, {
    k: 'chats',
    label: 'Chats',
    icon: 'message'
  }, {
    k: 'profile',
    label: 'Profile',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      background: 'var(--card)',
      borderTop: '1px solid var(--line)',
      padding: '8px 0 10px'
    }
  }, items.map(it => {
    const active = view === it.k;
    return /*#__PURE__*/React.createElement("button", {
      key: it.k,
      onClick: () => setView(it.k),
      style: {
        flex: 1,
        border: 'none',
        background: 'none',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: active ? 'var(--fern-600)' : 'var(--text-faint)',
        fontWeight: active ? 600 : 500
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 21,
      strokeWidth: active ? 2 : 1.75
    }), it.label);
  }));
}
function App() {
  const {
    Icon
  } = window.GardenSwapDesignSystem_0373cf;
  const [tier, setTier] = useState('sprout');
  const [view, setView] = useState('feed');
  const [detail, setDetail] = useState(null);
  const [swapReq, setSwapReq] = useState(null);
  const [chat, setChat] = useState(null);
  const [paywall, setPaywall] = useState(null);
  const [rating, setRating] = useState(false);
  const [newListing, setNewListing] = useState(false);
  const [toast, setToast] = useState(null);
  function flash(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }
  function openPaywall(reason) {
    const reasons = {
      ad_free: 'Go ad-free and unlock smart-match alerts with Grower.',
      upgrade: 'Grow your reach with a Garden Swap membership.'
    };
    setPaywall(reasons[reason] || reasons.upgrade);
  }
  function subscribe(t) {
    setTier(t);
    setPaywall(null);
    flash(`Welcome to ${t.charAt(0).toUpperCase() + t.slice(1)}!`);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 390,
      height: 800,
      background: 'var(--paper)',
      borderRadius: 40,
      overflow: 'hidden',
      boxShadow: '0 30px 70px rgba(32,37,29,0.34)',
      border: '11px solid #16140F',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    tier: tier
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 70,
      position: 'relative'
    }
  }, view === 'feed' && /*#__PURE__*/React.createElement(FeedScreen, {
    tier: tier,
    onOpenListing: setDetail,
    onOpenPaywall: openPaywall
  }), view === 'chats' && /*#__PURE__*/React.createElement(ChatsScreen, {
    onOpenChat: setChat
  }), view === 'profile' && /*#__PURE__*/React.createElement(ProfileScreen, {
    tier: tier,
    onUpgrade: () => openPaywall('upgrade'),
    onOpenListing: setDetail
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNewListing(true),
    "aria-label": "List a plant",
    style: {
      position: 'absolute',
      bottom: 80,
      right: 18,
      width: 58,
      height: 58,
      borderRadius: 'var(--radius-full)',
      background: 'var(--fern-600)',
      color: '#fff',
      border: 'none',
      boxShadow: 'var(--shadow-fab)',
      cursor: 'pointer',
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 26,
    color: "#fff"
  })), /*#__PURE__*/React.createElement(BottomNav, {
    view: view,
    setView: setView
  }), detail && /*#__PURE__*/React.createElement(DetailModal, {
    listing: detail,
    onClose: () => setDetail(null),
    onRequestSwap: () => {
      setSwapReq(detail);
      setDetail(null);
    }
  }), swapReq && /*#__PURE__*/React.createElement(SwapRequestModal, {
    listing: swapReq,
    onClose: () => setSwapReq(null),
    onSend: () => {
      setSwapReq(null);
      setView('chats');
      flash('Request sent — chat opened.');
    }
  }), chat && /*#__PURE__*/React.createElement(ChatThread, {
    chat: chat,
    onClose: () => setChat(null),
    onRate: () => {
      setChat(null);
      setRating(true);
    }
  }), paywall && /*#__PURE__*/React.createElement(PaywallModal, {
    reason: paywall,
    onClose: () => setPaywall(null),
    onSubscribe: subscribe
  }), rating && /*#__PURE__*/React.createElement(RatingModal, {
    onClose: () => {
      setRating(false);
      flash('Thanks for rating!');
    }
  }), newListing && /*#__PURE__*/React.createElement(NewListingModal, {
    onClose: () => {
      setNewListing(false);
      flash('Listing published!');
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 92,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 400,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'var(--pine-900)',
      color: 'var(--paper)',
      padding: '11px 18px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      boxShadow: 'var(--shadow-modal)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "var(--mint-200)"
  }), " ", toast));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/data.js
try { (() => {
/* Garden Swap UI kit — sample data (fake, for the recreation) */

var GS_LISTINGS = [{
  id: 1,
  title: 'Monstera Deliciosa',
  status: 'swap',
  plantType: 'Houseplant',
  condition: 'Healthy',
  rarity: 'Rare',
  light: 'Partial Sun',
  size: 'Large',
  distance: '2.1 mi',
  lister: 'Priya',
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80',
  desc: 'Big, happy split-leaf Monstera. Pest-free. Looking to swap for a rare aroid or a Philodendron Pink Princess.'
}, {
  id: 2,
  title: 'Echeveria cuttings',
  status: 'free',
  plantType: 'Succulent',
  condition: 'Fresh Cutting',
  light: 'Full Sun',
  size: 'Small',
  distance: '0.8 mi',
  lister: 'Arjun',
  rating: 4.6,
  image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
  desc: 'A whole tray of rosette cuttings, rooted and ready. Free to a good home — just bring a pot.'
}, {
  id: 3,
  title: 'Golden Pothos',
  status: 'swap',
  plantType: 'Cutting',
  condition: 'Healthy',
  light: 'Low Light',
  size: 'Medium',
  distance: '1.5 mi',
  lister: 'Meera',
  rating: 5.0,
  image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600&q=80',
  desc: 'Fast-growing golden pothos vines. Trailing nicely. Will accept any trailing plant in return.'
}, {
  id: 4,
  title: 'Snake Plant pups',
  status: 'free',
  plantType: 'Houseplant',
  condition: 'Healthy',
  light: 'Low Light',
  size: 'Small',
  distance: '3.4 mi',
  lister: 'Kabir',
  rating: 4.7,
  image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7c?w=600&q=80',
  desc: 'Several Sansevieria pups divided from the mother plant. Nearly unkillable — great for beginners.'
}, {
  id: 5,
  title: 'Basil & Mint seedlings',
  status: 'swap',
  plantType: 'Herb',
  condition: 'Healthy',
  light: 'Full Sun',
  size: 'Small',
  distance: '0.5 mi',
  lister: 'Ananya',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80',
  desc: 'Kitchen herb seedlings, started three weeks ago. Swapping for any vegetable starts.'
}, {
  id: 6,
  title: 'Tomato seeds (heirloom)',
  status: 'free',
  plantType: 'Seed',
  condition: 'Seed Packet',
  light: 'Full Sun',
  size: 'Small',
  distance: '4.0 mi',
  lister: 'Rohan',
  rating: 4.5,
  image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80',
  desc: 'Saved heirloom tomato seeds from last season. Brandywine and Cherokee Purple. Packet of ~20.'
}];
var GS_CHATS = [{
  id: 11,
  listingTitle: 'Monstera Deliciosa',
  other: 'Priya',
  state: 'pending',
  swapType: 'trade',
  preview: 'Hi! I love your Monstera — would you take a Pink Princess cutting?',
  messages: [{
    mine: true,
    body: 'Hi! I love your Monstera — would you take a Pink Princess cutting?',
    time: '2:14 PM'
  }]
}, {
  id: 12,
  listingTitle: 'Golden Pothos',
  other: 'Meera',
  state: 'accepted',
  swapType: 'trade',
  preview: 'Great — see you Saturday at the cafe!',
  messages: [{
    mine: false,
    sender: 'Meera',
    body: 'Yes, happy to swap for your spider plant!',
    time: 'Mon 5:01 PM'
  }, {
    mine: true,
    body: 'Perfect. Can you do this weekend?',
    time: 'Mon 5:04 PM'
  }, {
    mine: false,
    sender: 'Meera',
    body: 'Great — see you Saturday at the cafe!',
    time: 'Mon 5:06 PM'
  }]
}, {
  id: 13,
  listingTitle: 'Snake Plant pups',
  other: 'Kabir',
  state: 'completed',
  swapType: 'giveaway',
  preview: 'Thanks so much, they look great!',
  messages: [{
    mine: false,
    sender: 'Kabir',
    body: 'All yours — picked up?',
    time: 'Last week'
  }, {
    mine: true,
    body: 'Got them, thanks so much, they look great!',
    time: 'Last week'
  }]
}];
var GS_WISHLIST = ['Pink Princess', 'String of Hearts', 'Variegated Monstera'];
Object.assign(window, {
  GS_LISTINGS,
  GS_CHATS,
  GS_WISHLIST
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_app/ds-local.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Garden Swap UI kit — self-contained copy of the redesigned DS primitives.
   Loaded AFTER _ds_bundle.js. If the compiled bundle is present we use it;
   otherwise these local copies back the kit so it renders standalone.
   Source of truth remains components/. */

const GS_ICON_PATHS = {
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  shrub: '<path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  ruler: '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  star: '<path d="M11.5 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.1 2.1 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .29-.9l5.17-.76a2.1 2.1 0 0 0 1.6-1.16z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>',
  newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.02l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.02.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>'
};
function GS_Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  fill = 'none',
  color = 'currentColor',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      flexShrink: 0,
      verticalAlign: 'middle',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: GS_ICON_PATHS[name] || ''
    }
  }, rest));
}
function GS_Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  pill = true,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const sizes = {
    sm: {
      padding: '7px 14px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '14px 26px',
      fontSize: 'var(--text-md)'
    }
  };
  const solid = (bg, bgHover, fg) => ({
    background: hover && !disabled ? bgHover : bg,
    color: fg,
    border: 'none',
    boxShadow: down ? 'none' : 'var(--shadow-xs)'
  });
  const variants = {
    primary: solid('var(--fern-600)', 'var(--pine-700)', 'var(--text-on-primary)'),
    accent: solid('var(--clay-600)', 'var(--clay-700)', '#FFF7F0'),
    steward: solid('var(--denim-600)', 'var(--denim-700)', '#F1F7F8'),
    danger: solid('var(--tomato-600)', '#A23D26', '#FFF3EE'),
    outline: {
      background: hover && !disabled ? 'var(--paper-raised)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--line-strong)'
    },
    text: {
      background: 'none',
      color: 'var(--fern-600)',
      border: 'none',
      padding: 0,
      fontWeight: 'var(--weight-semibold)',
      textDecoration: hover ? 'underline' : 'none'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: '0.01em',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-base), transform var(--dur-fast), box-shadow var(--dur-base)',
    width: full ? '100%' : undefined,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    transform: down && !disabled ? 'translateY(1px)' : 'none',
    opacity: disabled ? 0.5 : 1,
    ...sizes[size],
    ...variants[variant]
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
function GS_Badge({
  children,
  variant = 'type',
  style,
  ...rest
}) {
  const variants = {
    swap: {
      background: 'var(--badge-swap-fill)',
      color: 'var(--badge-swap-text)'
    },
    free: {
      background: 'var(--badge-free-fill)',
      color: 'var(--badge-free-text)'
    },
    type: {
      background: 'rgba(166,184,152,0.28)',
      color: '#41553A'
    },
    condition: {
      background: 'var(--honey-100)',
      color: '#8A6410'
    },
    rarity: {
      background: 'var(--plum-100)',
      color: 'var(--plum-500)'
    },
    pending: {
      background: 'var(--state-pending-fill)',
      color: 'var(--state-pending-text)'
    },
    accepted: {
      background: 'var(--state-accepted-fill)',
      color: 'var(--state-accepted-text)'
    },
    completed: {
      background: 'var(--state-completed-fill)',
      color: 'var(--state-completed-text)'
    },
    declined: {
      background: 'var(--state-declined-fill)',
      color: 'var(--state-declined-text)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 9px',
    borderRadius: 'var(--radius-badge)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-caps)',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...variants[variant]
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
function GS_TierBadge({
  tier = 'sprout',
  showGlyph = true,
  style,
  ...rest
}) {
  const tiers = {
    sprout: {
      icon: 'sprout',
      label: 'Sprout',
      background: 'var(--mint-100)',
      color: 'var(--pine-700)'
    },
    grower: {
      icon: 'shrub',
      label: 'Grower',
      background: 'rgba(52,112,70,0.16)',
      color: 'var(--fern-600)'
    },
    steward: {
      icon: 'trees',
      label: 'Steward',
      background: 'var(--denim-100)',
      color: 'var(--denim-700)'
    }
  };
  const t = tiers[tier] || tiers.sprout;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 13px 5px 11px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    background: t.background,
    color: t.color
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest), showGlyph && /*#__PURE__*/React.createElement(GS_Icon, {
    name: t.icon,
    size: 15
  }), t.label);
}
function GS_Card({
  children,
  interactive = false,
  padded = false,
  bordered = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: bordered ? '1px solid var(--line)' : 'none',
    boxShadow: hover && interactive ? 'var(--shadow-hover)' : 'var(--shadow)',
    overflow: 'hidden',
    cursor: interactive ? 'pointer' : 'default',
    transform: hover && interactive ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
    padding: padded ? 'var(--space-8)' : 0
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      ...base,
      ...style
    }
  }, rest), children);
}
function GS_Input({
  label,
  hint,
  optional = false,
  variant = 'default',
  type = 'text',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  if (variant === 'search') {
    return /*#__PURE__*/React.createElement("input", _extends({
      type: type,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        width: '100%',
        padding: '9px 16px',
        border: '1px solid rgba(244,237,223,0.18)',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-base)',
        background: focus ? 'rgba(244,237,223,0.22)' : 'rgba(244,237,223,0.12)',
        color: 'var(--text-on-dark)',
        outline: 'none',
        transition: 'background var(--dur-base)',
        ...style
      }
    }, rest));
  }
  const field = {
    width: '100%',
    padding: '11px 14px',
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-sans)',
    background: 'var(--card)',
    color: 'var(--text-body)',
    outline: 'none',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label, ' ', optional && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      fontWeight: 400
    }
  }, "(optional)")), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest)), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, hint));
}
function GS_Select({
  label,
  options = [],
  size = 'md',
  style,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      padding: '7px 12px',
      fontSize: 'var(--text-sm)',
      width: 'auto'
    },
    md: {
      padding: '11px 14px',
      fontSize: 'var(--text-base)',
      width: '100%'
    }
  };
  const field = {
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)',
    background: 'var(--card)',
    color: 'var(--text-body)',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
    ...sizes[size]
  };
  const select = /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: label ? field : {
      ...field,
      ...style
    }
  }, rest), children || options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  }));
  if (!label) return select;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label), select);
}
function GS_PlantCard({
  image,
  title,
  status = 'swap',
  plantType,
  rarity,
  distance,
  lister,
  rating,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--card)',
      borderRadius: 'var(--radius-card)',
      border: '1px solid var(--line)',
      boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow)',
      overflow: 'hidden',
      cursor: 'pointer',
      transform: hover ? 'var(--lift)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    loading: "lazy",
    onError: e => {
      e.currentTarget.style.opacity = 0;
    },
    style: {
      width: '100%',
      height: 188,
      objectFit: 'cover',
      display: 'block',
      background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(GS_Badge, {
    variant: status === 'free' ? 'free' : 'swap',
    style: {
      background: status === 'free' ? 'var(--clay-100)' : 'var(--card)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(GS_Icon, {
    name: status === 'free' ? 'gift' : 'repeat',
    size: 12
  }), status === 'free' ? 'Free' : 'Swap'), rarity && /*#__PURE__*/React.createElement(GS_Badge, {
    variant: "rarity",
    style: {
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(GS_Icon, {
    name: "sparkles",
    size: 11
  }), " ", rarity))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 15px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--ink)',
      marginBottom: 4,
      lineHeight: 1.2
    }
  }, title), plantType && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      marginBottom: 10
    }
  }, plantType), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)',
      paddingTop: 10,
      borderTop: '1px solid var(--line)'
    }
  }, distance && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(GS_Icon, {
    name: "mapPin",
    size: 14,
    color: "var(--sage-300)"
  }), " ", distance), rating != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(GS_Icon, {
    name: "star",
    size: 13,
    fill: "currentColor",
    color: "var(--honey-500)"
  }), " ", rating), lister && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'var(--text-faint)'
    }
  }, lister))));
}
function GS_StarRating({
  value = 0,
  count,
  interactive = false,
  size = 'md',
  onChange,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(0);
  const px = size === 'lg' ? 28 : size === 'sm' ? 15 : 18;
  if (!interactive) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        color: 'var(--honey-600)',
        fontSize: 'var(--text-sm)',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(GS_Icon, {
      name: "star",
      size: px,
      fill: "currentColor",
      color: "var(--honey-500)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--ink)'
      }
    }, Number(value).toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)',
        fontWeight: 400
      }
    }, "\xB7 ", count, " swaps"));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 6,
      ...style
    }
  }, rest), [1, 2, 3, 4, 5].map(n => {
    const active = n <= (hover || value);
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      onClick: () => onChange && onChange(n),
      onMouseEnter: () => setHover(n),
      onMouseLeave: () => setHover(0),
      "aria-label": `${n} star`,
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 0,
        color: active ? 'var(--honey-500)' : 'var(--line-strong)',
        transform: active ? 'scale(1)' : 'scale(0.94)',
        transition: 'color var(--dur-fast), transform var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement(GS_Icon, {
      name: "star",
      size: px,
      fill: "currentColor",
      color: "currentColor"
    }));
  }));
}
window.GS_UI = {
  Icon: GS_Icon,
  Button: GS_Button,
  Badge: GS_Badge,
  TierBadge: GS_TierBadge,
  Card: GS_Card,
  Input: GS_Input,
  Select: GS_Select,
  PlantCard: GS_PlantCard,
  StarRating: GS_StarRating
};
if (!window.GardenSwapDesignSystem_0373cf || !window.GardenSwapDesignSystem_0373cf.PlantCard) {
  window.GardenSwapDesignSystem_0373cf = window.GS_UI;
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_app/ds-local.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/BrowsePage.jsx
try { (() => {
/* Garden Swap Web UI Kit — BrowsePage */
function BrowsePage({
  onOpenListing
}) {
  const [filters, setFilters] = React.useState({});
  const [viewMode, setViewMode] = React.useState('grid');
  const [sortBy, setSortBy] = React.useState('distance');
  const [currentPage, setCurrentPage] = React.useState(1);
  const PER_PAGE = 9;
  const filtered = window.GS_LISTINGS.filter(l => {
    if (filters.type && l.plantType !== filters.type) return false;
    if (filters.status && l.status !== filters.status) return false;
    if (filters.light && l.light !== filters.light) return false;
    if (filters.condition && l.condition !== filters.condition) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };
  const changeFilters = f => {
    setFilters(f);
    setCurrentPage(1);
  };
  const ViewToggle = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden'
    }
  }, [['grid', 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z'], ['list', 'M3 6h18M3 12h18M3 18h18']].map(([m, d]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setViewMode(m),
    title: m,
    style: {
      padding: '7px 11px',
      background: viewMode === m ? 'var(--fern-600)' : 'var(--card)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: viewMode === m ? 'white' : 'var(--ink-faint)',
      transition: 'background var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: m === 'grid' ? 'currentColor' : 'none',
    stroke: m === 'list' ? 'currentColor' : 'none',
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  })))));
  const activeFilters = Object.entries(filters).filter(([, v]) => v);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--web-content-lg)',
      margin: '0 auto',
      padding: '28px var(--web-page-px) 64px'
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'Home',
      onClick: () => {}
    }, {
      label: 'Browse Plants'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      marginTop: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    filters: filters,
    onChange: changeFilters,
    onClear: clearFilters,
    resultCount: filtered.length
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 16,
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 500,
      color: 'var(--ink)',
      lineHeight: 1.2
    }
  }, "Plants near you"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, filtered.length, " listing", filtered.length !== 1 ? 's' : '', " \xB7 within 10 mi of 560001")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    value: sortBy,
    onChange: e => setSortBy(e.target.value),
    options: [{
      value: 'distance',
      label: 'Nearest first'
    }, {
      value: 'newest',
      label: 'Newest'
    }, {
      value: 'rating',
      label: 'Top rated'
    }]
  }), /*#__PURE__*/React.createElement(ViewToggle, null))), activeFilters.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 16
    }
  }, activeFilters.map(([k, v]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px 4px 12px',
      background: 'var(--mint-100)',
      color: 'var(--pine-700)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600
    }
  }, v, /*#__PURE__*/React.createElement("button", {
    onClick: () => changeFilters({
      ...filters,
      [k]: undefined
    }),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: 'var(--pine-700)',
      display: 'flex',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: clearFilters,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 10px',
      fontSize: 'var(--text-xs)',
      color: 'var(--tomato-600)',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)'
    }
  }, "Clear all")), pageItems.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '64px 0',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "48",
    height: "48",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.25",
    strokeLinecap: "round",
    style: {
      opacity: .4,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      marginBottom: 8
    }
  }, "No plants found"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)'
    }
  }, "Try broadening your filters.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr',
      gap: viewMode === 'grid' ? 20 : 12
    }
  }, pageItems.map(l => /*#__PURE__*/React.createElement(PlantCard, {
    key: l.id,
    image: l.image,
    title: l.title,
    status: l.status,
    plantType: l.plantType,
    rarity: l.rarity,
    distance: l.distance,
    lister: l.lister,
    rating: l.rating,
    layout: viewMode === 'list' ? 'horizontal' : 'vertical',
    onClick: () => onOpenListing(l)
  }))), totalPages > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: currentPage,
    totalPages: totalPages,
    onPage: p => {
      setCurrentPage(p);
    }
  })))));
}
Object.assign(window, {
  BrowsePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/BrowsePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/DetailPage.jsx
try { (() => {
/* Garden Swap Web UI Kit — DetailPage */
function DetailPage({
  listing,
  onBack,
  onViewProfile
}) {
  const [requested, setRequested] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [activeThumb, setActiveThumb] = React.useState(0);
  if (!listing) return null;
  const thumbUrls = [listing.image, listing.image.replace('w=800', 'w=400') + '&sat=-30', listing.image.replace('w=800', 'w=400') + '&blur=1'];
  const others = window.GS_LISTINGS.filter(l => l.id !== listing.id && l.plantType === listing.plantType).slice(0, 3);
  const fallbackOthers = window.GS_LISTINGS.filter(l => l.id !== listing.id).slice(0, 3);
  const similar = others.length >= 2 ? others : fallbackOthers;
  const Tag = ({
    icon,
    label
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--paper-raised)',
      border: '1px solid var(--line)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13,
    color: "var(--sage-300)"
  }), " ", label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--web-content-lg)',
      margin: '0 auto',
      padding: '28px var(--web-page-px) 72px'
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'Home',
      onClick: () => {}
    }, {
      label: 'Browse Plants',
      onClick: onBack
    }, {
      label: listing.title
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 52,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: thumbUrls[activeThumb],
    alt: listing.title,
    style: {
      width: '100%',
      height: 460,
      objectFit: 'cover',
      display: 'block',
      background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))',
      transition: 'opacity var(--dur-base)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 12
    }
  }, thumbUrls.map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    alt: "",
    onClick: () => setActiveThumb(i),
    style: {
      width: 82,
      height: 62,
      objectFit: 'cover',
      borderRadius: 'var(--radius)',
      cursor: 'pointer',
      flexShrink: 0,
      border: i === activeThumb ? '2px solid var(--fern-600)' : '2px solid var(--line)',
      transition: 'border-color var(--dur-base)',
      background: 'var(--mint-200)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: listing.status === 'free' ? 'free' : 'swap'
  }, listing.status === 'free' ? 'Free' : 'Swap'), listing.rarity && /*#__PURE__*/React.createElement(Badge, {
    variant: "rarity"
  }, listing.rarity), listing.plantType && /*#__PURE__*/React.createElement(Badge, {
    variant: "type"
  }, listing.plantType)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--ink)',
      lineHeight: 1.1
    }
  }, listing.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, listing.light && /*#__PURE__*/React.createElement(Tag, {
    icon: "sun",
    label: listing.light
  }), listing.condition && /*#__PURE__*/React.createElement(Tag, {
    icon: "ruler",
    label: listing.condition
  }), listing.size && /*#__PURE__*/React.createElement(Tag, {
    icon: "sprout",
    label: `${listing.size} plant`
  }), listing.distance && /*#__PURE__*/React.createElement(Tag, {
    icon: "mapPin",
    label: listing.distance
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-normal)'
    }
  }, listing.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--line)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: onViewProfile,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      borderRadius: 'var(--radius-card)',
      background: 'var(--paper-raised)',
      border: '1px solid var(--line)',
      cursor: 'pointer',
      transition: 'box-shadow var(--dur-base)'
    },
    onMouseEnter: e => e.currentTarget.style.boxShadow = 'var(--shadow-hover)',
    onMouseLeave: e => e.currentTarget.style.boxShadow = 'none'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--fern-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      fontWeight: 700,
      color: 'var(--paper)',
      flexShrink: 0
    }
  }, (listing.lister || '?').charAt(0)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--ink)'
    }
  }, listing.lister), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      marginTop: 2
    }
  }, "Grower \xB7 14 swaps completed")), /*#__PURE__*/React.createElement(StarRating, {
    value: listing.rating
  })), requested ? /*#__PURE__*/React.createElement(Alert, {
    variant: "success",
    title: "Request sent!"
  }, listing.lister, " will get back to you within 48 hours.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    full: true,
    onClick: () => setRequested(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: listing.status === 'free' ? 'gift' : 'repeat',
    size: 18
  }), listing.status === 'free' ? 'Request to Collect' : 'Request Swap'), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    full: true,
    onClick: () => setSaved(s => !s)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 18
  }), saved ? 'Saved to Wishlist' : 'Save to Wishlist')))), similar.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--ink)',
      marginBottom: 20
    }
  }, "More near you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, similar.map(l => /*#__PURE__*/React.createElement(PlantCard, {
    key: l.id,
    image: l.image,
    title: l.title,
    status: l.status,
    plantType: l.plantType,
    rarity: l.rarity,
    distance: l.distance,
    lister: l.lister,
    rating: l.rating,
    onClick: () => {}
  })))));
}
Object.assign(window, {
  DetailPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/DetailPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/ProfilePage.jsx
try { (() => {
/* Garden Swap Web UI Kit — ProfilePage */
function ProfilePage({
  user,
  onViewListing
}) {
  const [tab, setTab] = React.useState('listings');
  const listings = window.GS_LISTINGS.filter(l => l.lister === 'Priya');
  const allListings = window.GS_LISTINGS.slice(0, 6);
  const tabs = [{
    id: 'listings',
    label: 'My Listings',
    count: 6
  }, {
    id: 'swaps',
    label: 'Swap History',
    count: 14
  }, {
    id: 'wishlist',
    label: 'Wishlist',
    count: window.GS_WISHLIST.length
  }, {
    id: 'reviews',
    label: 'Reviews',
    count: 8
  }];
  const reviews = [{
    from: 'Arjun',
    text: 'Quick and easy swap, plant was exactly as described. Highly recommend!',
    rating: 5,
    date: '2 weeks ago'
  }, {
    from: 'Meera',
    text: 'Really healthy cuttings. Priya was super helpful and responsive.',
    rating: 5,
    date: '1 month ago'
  }, {
    from: 'Kabir',
    text: 'Great experience overall. Would swap again.',
    rating: 4,
    date: '2 months ago'
  }, {
    from: 'Rohan',
    text: 'Beautiful plant, well-packed for transport. Very happy.',
    rating: 5,
    date: '3 months ago'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--web-content-lg)',
      margin: '0 auto',
      paddingBottom: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      position: 'relative',
      background: 'linear-gradient(130deg, var(--pine-900) 0%, var(--fern-600) 60%, var(--sage-300) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -44,
      left: 'var(--web-page-px)',
      width: 90,
      height: 90,
      borderRadius: '50%',
      border: '4px solid var(--paper)',
      background: 'var(--sage-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 700,
      color: 'var(--pine-900)',
      boxShadow: 'var(--shadow)'
    }
  }, "P")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '58px var(--web-page-px) 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 500,
      color: 'var(--ink)'
    }
  }, user.name), /*#__PURE__*/React.createElement(TierBadge, {
    tier: user.tier || 'grower'
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-subtle)'
    }
  }, "Plant enthusiast \xB7 Bangalore, India \xB7 Member since Jan 2024")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Edit Profile"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Add Listing"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      padding: '0 var(--web-page-px) 24px',
      borderBottom: '2px solid var(--line)'
    }
  }, [['6', 'Listings'], ['14', 'Swaps'], ['4.9', 'Rating'], ['8', 'Reviews']].map(([val, label], i) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      padding: '12px 28px 12px',
      textAlign: 'center',
      borderRight: i < 3 ? '1px solid var(--line)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-xl)',
      fontWeight: 400,
      color: 'var(--ink)'
    }
  }, val), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-caps)',
      fontWeight: 600,
      marginTop: 2
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      padding: '0 var(--web-page-px)',
      gap: 0,
      borderBottom: '2px solid var(--line)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '13px 22px',
      fontFamily: 'var(--font-sans)',
      fontWeight: tab === t.id ? 600 : 400,
      fontSize: 'var(--text-sm)',
      color: tab === t.id ? 'var(--pine-700)' : 'var(--text-subtle)',
      borderBottom: tab === t.id ? '2px solid var(--fern-600)' : '2px solid transparent',
      marginBottom: -2,
      transition: 'color var(--dur-base)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, t.label, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '1px 7px',
      borderRadius: 'var(--radius-badge)',
      background: tab === t.id ? 'var(--mint-100)' : 'var(--paper-raised)',
      color: tab === t.id ? 'var(--pine-700)' : 'var(--ink-faint)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600
    }
  }, t.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px var(--web-page-px)'
    }
  }, tab === 'listings' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 20
    }
  }, allListings.map(l => /*#__PURE__*/React.createElement(PlantCard, {
    key: l.id,
    image: l.image,
    title: l.title,
    status: l.status,
    plantType: l.plantType,
    distance: l.distance,
    rating: l.rating,
    lister: l.lister,
    onClick: () => onViewListing(l)
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => {},
    style: {
      border: '2px dashed var(--line)',
      borderRadius: 'var(--radius-card)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      minHeight: 220,
      cursor: 'pointer',
      color: 'var(--ink-faint)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--fern-400)';
      e.currentTarget.style.color = 'var(--fern-600)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.color = 'var(--ink-faint)';
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5v14"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600
    }
  }, "Add listing"))), tab === 'wishlist' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 600
    }
  }, window.GS_WISHLIST.map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 18px',
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 16,
    color: "var(--clay-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--text-md)',
      color: 'var(--ink)',
      flex: 1
    }
  }, item), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 'var(--text-sm)',
      color: 'var(--fern-600)',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "Find ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 13
  }))))), tab === 'swaps' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 700
    }
  }, window.GS_CHATS.map(chat => /*#__PURE__*/React.createElement("div", {
    key: chat.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px 18px',
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--mint-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: 700,
      color: 'var(--pine-700)',
      flexShrink: 0
    }
  }, chat.other.charAt(0)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--ink)'
    }
  }, chat.listingTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      marginTop: 2
    }
  }, "with ", chat.other, " \xB7 ", chat.messages[0]?.time)), /*#__PURE__*/React.createElement(Badge, {
    variant: chat.state
  }, chat.state)))), tab === 'reviews' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 16
    }
  }, reviews.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '18px',
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--sage-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.85rem',
      fontWeight: 700,
      color: 'var(--pine-900)',
      flexShrink: 0
    }
  }, r.from.charAt(0)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--ink)'
    }
  }, r.from), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--ink-faint)'
    }
  }, r.date)), /*#__PURE__*/React.createElement(StarRating, {
    value: r.rating
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-normal)'
    }
  }, r.text))))));
}
Object.assign(window, {
  ProfilePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/ProfilePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/app.jsx
try { (() => {
/* Garden Swap Web UI Kit — app.jsx (root shell + router) */
function App() {
  const [page, setPage] = React.useState('browse');
  const [listing, setListing] = React.useState(null);
  const user = {
    name: 'Priya Sharma',
    tier: 'grower'
  };
  const navigate = (p, data) => {
    setPage(p);
    if (data?.listing) setListing(data.listing);
    // Scroll main area back to top
    const el = document.getElementById('gs-main');
    if (el) el.scrollTop = 0;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    page: page,
    user: user,
    onNavigate: navigate,
    onSearch: q => navigate('browse'),
    notifCount: 2
  }), /*#__PURE__*/React.createElement("div", {
    id: "gs-main",
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, page === 'browse' && /*#__PURE__*/React.createElement(BrowsePage, {
    onOpenListing: l => navigate('detail', {
      listing: l
    })
  }), page === 'detail' && /*#__PURE__*/React.createElement(DetailPage, {
    listing: listing,
    onBack: () => navigate('browse'),
    onViewProfile: () => navigate('profile')
  }), (page === 'profile' || page === 'listings') && /*#__PURE__*/React.createElement(ProfilePage, {
    user: user,
    onViewListing: l => navigate('detail', {
      listing: l
    })
  }), page === 'home' && /*#__PURE__*/React.createElement(BrowsePage, {
    onOpenListing: l => navigate('detail', {
      listing: l
    })
  }), page === 'swaps' && /*#__PURE__*/React.createElement(ProfilePage, {
    user: user,
    onViewListing: l => navigate('detail', {
      listing: l
    })
  })), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/data.js
try { (() => {
/* Garden Swap — Web UI Kit data (extended from app) */
var GS_LISTINGS = [{
  id: 1,
  title: 'Monstera Deliciosa',
  status: 'swap',
  plantType: 'Houseplant',
  condition: 'Healthy',
  rarity: 'Rare',
  light: 'Partial Sun',
  size: 'Large',
  distance: '2.1 mi',
  lister: 'Priya',
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
  desc: 'Big, happy split-leaf Monstera. Pest-free. Looking to swap for a rare aroid or a Philodendron Pink Princess.'
}, {
  id: 2,
  title: 'Echeveria cuttings',
  status: 'free',
  plantType: 'Succulent',
  condition: 'Fresh Cutting',
  light: 'Full Sun',
  size: 'Small',
  distance: '0.8 mi',
  lister: 'Arjun',
  rating: 4.6,
  image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
  desc: 'A whole tray of rosette cuttings, rooted and ready. Free to a good home — just bring a pot.'
}, {
  id: 3,
  title: 'Golden Pothos',
  status: 'swap',
  plantType: 'Cutting',
  condition: 'Healthy',
  light: 'Low Light',
  size: 'Medium',
  distance: '1.5 mi',
  lister: 'Meera',
  rating: 5.0,
  image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800&q=80',
  desc: 'Fast-growing golden pothos vines. Trailing nicely. Will accept any trailing plant in return.'
}, {
  id: 4,
  title: 'Snake Plant pups',
  status: 'free',
  plantType: 'Houseplant',
  condition: 'Healthy',
  light: 'Low Light',
  size: 'Small',
  distance: '3.4 mi',
  lister: 'Kabir',
  rating: 4.7,
  image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7c?w=800&q=80',
  desc: 'Several Sansevieria pups divided from the mother plant. Nearly unkillable — great for beginners.'
}, {
  id: 5,
  title: 'Basil & Mint seedlings',
  status: 'swap',
  plantType: 'Herb',
  condition: 'Healthy',
  light: 'Full Sun',
  size: 'Small',
  distance: '0.5 mi',
  lister: 'Ananya',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800&q=80',
  desc: 'Kitchen herb seedlings, started three weeks ago. Swapping for any vegetable starts.'
}, {
  id: 6,
  title: 'Tomato seeds (heirloom)',
  status: 'free',
  plantType: 'Seed',
  condition: 'Seed Packet',
  light: 'Full Sun',
  size: 'Small',
  distance: '4.0 mi',
  lister: 'Rohan',
  rating: 4.5,
  image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80',
  desc: 'Saved heirloom tomato seeds from last season. Brandywine and Cherokee Purple. Packet of ~20.'
}, {
  id: 7,
  title: 'Fiddle Leaf Fig',
  status: 'swap',
  plantType: 'Houseplant',
  condition: 'Healthy',
  rarity: 'Rare',
  light: 'Bright Indirect',
  size: 'Large',
  distance: '1.2 mi',
  lister: 'Divya',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1616347366210-37b7e73f2660?w=800&q=80',
  desc: 'Gorgeous statement FLF, about 5 feet tall. Needs a new home with more space. Swap for anything interesting.'
}, {
  id: 8,
  title: 'Bird of Paradise',
  status: 'swap',
  plantType: 'Houseplant',
  condition: 'Healthy',
  light: 'Full Sun',
  size: 'Large',
  distance: '2.8 mi',
  lister: 'Suresh',
  rating: 4.3,
  image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=800&q=80',
  desc: 'Strelitzia nicolai — never bloomed indoors but absolutely stunning foliage. Large, established plant.'
}, {
  id: 9,
  title: 'String of Pearls',
  status: 'swap',
  plantType: 'Succulent',
  condition: 'Healthy',
  rarity: 'Uncommon',
  light: 'Bright Indirect',
  size: 'Small',
  distance: '0.9 mi',
  lister: 'Neha',
  rating: 5.0,
  image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80',
  desc: 'Long cascading strings, very healthy. Looking for other rare succulents or cacti in return.'
}, {
  id: 10,
  title: 'Peace Lily',
  status: 'free',
  plantType: 'Houseplant',
  condition: 'Healthy',
  light: 'Low Light',
  size: 'Medium',
  distance: '1.8 mi',
  lister: 'Ravi',
  rating: 4.4,
  image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&q=80',
  desc: 'Moving house and cannot take it with me. In full bloom — very healthy, no pests.'
}, {
  id: 11,
  title: 'Calathea Orbifolia',
  status: 'swap',
  plantType: 'Houseplant',
  condition: 'Healthy',
  rarity: 'Uncommon',
  light: 'Low Light',
  size: 'Medium',
  distance: '3.1 mi',
  lister: 'Priya',
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=800&q=80',
  desc: 'Beautiful round-leaf Calathea. Healthy and putting out new growth. Seeking Marantas or other Calatheas.'
}, {
  id: 12,
  title: 'Cactus mix (5 pots)',
  status: 'free',
  plantType: 'Succulent',
  condition: 'Healthy',
  light: 'Full Sun',
  size: 'Small',
  distance: '5.0 mi',
  lister: 'Arjun',
  rating: 4.6,
  image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
  desc: 'Five small cactus pots — all different species. Perfect windowsill collection starter.'
}];
var GS_CHATS = [{
  id: 11,
  listingTitle: 'Monstera Deliciosa',
  other: 'Priya',
  state: 'pending',
  preview: 'Hi! I love your Monstera — would you take a Pink Princess cutting?',
  messages: [{
    mine: true,
    body: 'Hi! I love your Monstera — would you take a Pink Princess cutting?',
    time: '2:14 PM'
  }]
}, {
  id: 12,
  listingTitle: 'Golden Pothos',
  other: 'Meera',
  state: 'accepted',
  preview: 'Great — see you Saturday at the cafe!',
  messages: [{
    mine: false,
    sender: 'Meera',
    body: 'Yes, happy to swap for your spider plant!',
    time: 'Mon 5:01 PM'
  }, {
    mine: true,
    body: 'Perfect. Can you do this weekend?',
    time: 'Mon 5:04 PM'
  }, {
    mine: false,
    sender: 'Meera',
    body: 'Great — see you Saturday at the cafe!',
    time: 'Mon 5:06 PM'
  }]
}, {
  id: 13,
  listingTitle: 'Snake Plant pups',
  other: 'Kabir',
  state: 'completed',
  preview: 'Thanks so much, they look great!',
  messages: [{
    mine: false,
    sender: 'Kabir',
    body: 'All yours — picked up?',
    time: 'Last week'
  }, {
    mine: true,
    body: 'Got them, thanks so much, they look great!',
    time: 'Last week'
  }]
}];
var GS_WISHLIST = ['Pink Princess Philodendron', 'String of Hearts', 'Variegated Monstera', 'Hoya Kerrii'];
Object.assign(window, {
  GS_LISTINGS,
  GS_CHATS,
  GS_WISHLIST
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/data.js", error: String((e && e.message) || e) }); }

// ui_kits/garden_swap_web/ds-local.jsx
try { (() => {
/* Garden Swap Web UI Kit — ds-local.jsx
   Exposes all design-system components as globals.
   Core/forms/plants come from the compiled bundle.
   Web components come from the bundle when available, with a
   fallback to the direct-Babel-loaded globals for pre-bundle runs. */
const _GS = window.GardenSwapDesignSystem_0373cf || {};
const {
  Button,
  Badge,
  Card,
  Icon,
  TierBadge,
  Input,
  Select,
  PlantCard,
  StarRating
} = _GS;
// Web components: bundle takes priority, globals as fallback
const Nav = _GS.Nav || window.Nav;
const Footer = _GS.Footer || window.Footer;
const Sidebar = _GS.Sidebar || window.Sidebar;
const Pagination = _GS.Pagination || window.Pagination;
const Breadcrumb = _GS.Breadcrumb || window.Breadcrumb;
const Alert = _GS.Alert || window.Alert;
Object.assign(window, {
  Button,
  Badge,
  Card,
  Icon,
  TierBadge,
  Input,
  Select,
  PlantCard,
  StarRating,
  Nav,
  Footer,
  Sidebar,
  Pagination,
  Breadcrumb,
  Alert
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/garden_swap_web/ds-local.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.TierBadge = __ds_scope.TierBadge;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.PlantCard = __ds_scope.PlantCard;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Sidebar = __ds_scope.Sidebar;

})();
