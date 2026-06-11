# Garden Swap Design System

**Potting Shed palette** — kraft-paper creams, deep pine and fern greens, terracotta clay, honey. Editorial serif display (Newsreader) + humanist grotesque UI (Hanken Grotesk).

## Tokens
All tokens live under `tokens/` and are imported via `styles.css`.

| File | Contents |
|---|---|
| `tokens/colors.css` | Primitives (pine, fern, clay, honey, plum, denim, tomato) + semantic roles + legacy aliases |
| `tokens/typography.css` | Font families, type scale, weights, leading, tracking |
| `tokens/spacing.css` | 4px spacing scale, radius, elevation, motion, **mobile** layout constants, **web** layout constants |
| `tokens/base.css` | Element resets, body defaults, `::selection`, `.gs-eyebrow` helper |
| `tokens/fonts.css` | `@font-face` / Google Fonts imports |

### Web layout tokens (new)
`--web-nav-h`, `--web-sidebar-w`, `--web-content-lg` (1200px max), `--web-page-px` (clamped gutter), `--web-grid-gap`, `--web-section-py`. See `tokens/spacing.css` for the full list.

## Components

### Core (`components/core/`)
`Button` · `Badge` · `Card` · `Icon` · `TierBadge`

### Forms (`components/forms/`)
`Input` · `Select`

### Plants (`components/plants/`)
`PlantCard` (vertical + **horizontal** layout variants) · `StarRating`

### Web (`components/web/`) — new
| Component | Purpose |
|---|---|
| `Nav` | Sticky pine-900 top bar — logo, links, search, user menu |
| `Footer` | Three-column link grid + pine-900 copyright bar |
| `Sidebar` | Collapsible filter panel for the browse page |
| `Pagination` | Prev / numbered pages / Next strip |
| `Breadcrumb` | Path trail with clickable ancestor links |
| `Alert` | Inline banners — info, success, warning, error |

## UI Kits

| Kit | Path | Description |
|---|---|---|
| Mobile app | `ui_kits/garden_swap_app/` | Feed, swap flow, chats, profile, paywall — phone-sized |
| Website | `ui_kits/garden_swap_web/` | Browse marketplace, plant detail, user profile — full desktop |

## Usage

```html
<link rel="stylesheet" href="path/to/styles.css">
<script src="path/to/_ds_bundle.js"></script>
<script>
  const { Button, Nav, PlantCard } = window.GardenSwapDesignSystem_0373cf;
</script>
```

## Palette at a glance
- **Page** `#F4EDDF` kraft cream · **Card** `#FFFDF8` warm white
- **Primary** `--fern-600 #285C39` · **Accent** `--clay-600 #B85C38`
- **Ink** `#20251D` · **Subtle** `#5C6151` · **Faint** `#8C8E7C`
