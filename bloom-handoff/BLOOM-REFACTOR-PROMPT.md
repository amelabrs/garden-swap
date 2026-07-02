# Garden Swap — Bloom Refactor Developer Prompt

## Objective
Refactor the React website (`web/WebApp.jsx`) to use the Bloom design system — a warm, peppy-yet-calming aesthetic with a new color palette (greens, oranges, honey yellows, browns) and typography (Outfit headlines, Figtree body). All four pages (Home, Browse, Detail, Profile) now have a finished Bloom reference design to match pixel-for-pixel.

## Context
- **Current state:** WebApp uses the Potting Shed design system (pine/fern/clay tokens, Newsreader/Hanken Grotesk)
- **Target state:** Apply the Bloom look across the whole site — every page has a reference HTML file to match
- **Design spec:** See `BLOOM-DESIGN-SPEC.md` for full color, type, spacing, and layout details
- **Component JSX:** See `BLOOM-HOMEPAGE.md` for copy-paste JSX structure of the shared nav, hero, buttons, and footer

## Reference HTML pages (open in a browser to see the exact target)
Each file is a self-contained, standalone HTML page — open it directly, no build needed. They are cross-linked, so you can click through the whole flow (logo → home, nav → browse, cards → detail, owner card → profile).

| Page | Reference file | Route |
|---|---|---|
| Home | `GardenSwap-Bloom.html` | `home` |
| Browse marketplace | `Bloom-Browse.html` | `browse` |
| Plant detail | `Bloom-Detail.html` | `detail` |
| User profile | `Bloom-Profile.html` | `profile` |

**Match these exactly** — colors, spacing, border-radii, shadows, and type are all final. Lift values straight from the HTML (every element is inline-styled, so the numbers are right there in the markup). The shared chrome (nav + footer band) is identical across all four pages; build it once as a reusable component.

## Changes Required

### 1. New Bloom Color Palette
Add these CSS variables to `web/tokens/colors.css` (or define inline):
```css
--bloom-green: #2E7D52;
--bloom-cream: #FFFBF5;
--bloom-orange: #DD7A2E;
--bloom-yellow: #E9B949;
--bloom-light-yellow: #FBE6B0;
--bloom-dark-text: #23302a;
--bloom-soft-text: #46544a;
--bloom-border: #E7DFC8;
```

### 2. Update WebApp.jsx

#### a) Import new fonts
```javascript
// Add to <head> or @import in styles
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Figtree:wght@400;500;600;700&display=swap');
```

#### b) Create a new BloomNavigation component
- Replace the current `Nav` with a Bloom-styled version (see `BLOOM-HOMEPAGE.md`)
- Cream background, green logo in Outfit 800, warm brown hover states
- Keep the notification badge and user avatar

#### c) Add a BloomHomepage component (or BloomHeroSection)
- Only shown when `page === 'home'` (currently defaults to browse)
- Full 2-column grid: left = copy + search + CTAs, right = 2x2 plant image grid
- Gradient background (135deg, #ECF7EC → #FBF1D8)
- Use the exact JSX from `BLOOM-HOMEPAGE.md`

#### d) Update page navigation logic
All routes now render the Bloom shared chrome (`BloomNavigation` + Bloom footer band). Build the chrome once and wrap every view in it:
```javascript
<div className="bloom-app">
  <BloomNavigation page={page} onNavigate={navigate} />
  {page === 'home'    && <BloomHome onNavigate={navigate} />}
  {page === 'browse'  && <BloomBrowse onOpenListing={l => navigate('detail', {listing:l})} />}
  {page === 'detail'  && <BloomDetail listing={listing} onViewProfile={() => navigate('profile')} />}
  {page === 'profile' && <BloomProfile onViewListing={l => navigate('detail', {listing:l})} />}
  <BloomFooterBand onNavigate={navigate} />
</div>
```

#### e) Rebuild Browse / Detail / Profile to the Bloom reference
These are **full Bloom redesigns**, not the old Potting Shed views — match the reference HTML files exactly:
- **`Bloom-Browse.html`** — breadcrumb, big page title, search bar, category chips, left filter sidebar (248px, white rounded card), 3-col card grid, pill pagination
- **`Bloom-Detail.html`** — 2-col (1.1fr / .9fr): gallery with thumbnails + info column (badges, big title, tag pills, description, owner card, orange "Request Swap" + outline "Save to Wishlist"), then "More near you" 3-up
- **`Bloom-Profile.html`** — gradient banner, avatar bubble, identity row, 4 stat cards, tab bar, listings grid
- Cards: white `#fff`, `border-radius: 24px`, shadow `0 8px 22px rgba(31,74,50,.08)`; grid gap 24px
- Footer band (green rounded CTA strip) is the same on every page

### 3. Image Assets
Ensure these files exist in `web/assets/` or link to them:
- `plant-begonia.jpeg` — silver-veined begonia (top-left, -2deg rotate)
- `plant-hibiscus.jpeg` — red/yellow hibiscus (top-right, 1deg rotate)
- `plant-caladium.jpeg` — white-spotted caladium (bottom-left, -1deg rotate)
- `plant-succulent.jpeg` — pale succulent rosette (bottom-right, 2deg rotate)

All images: 200px height in hero, 24px border-radius, shadow: `0 10px 24px rgba(31,74,50,.16)`

### 4. Button Styles
Define or update button classes:
```javascript
// Primary CTA (orange)
style={{
  background: '#DD7A2E',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  padding: '16px 30px',
  borderRadius: 999,
  boxShadow: '0 8px 20px rgba(221,122,46,.30)',
  cursor: 'pointer'
}}

// Secondary (white + green border)
style={{
  background: '#fff',
  border: '2px solid #2E7D52',
  color: '#2E7D52',
  fontWeight: 700,
  fontSize: 18,
  padding: '14px 28px',
  borderRadius: 999,
  cursor: 'pointer'
}}

// Tertiary/small (green)
style={{
  background: '#2E7D52',
  color: '#fff',
  fontWeight: 700,
  fontSize: 17,
  padding: '13px 26px',
  borderRadius: 999,
  boxShadow: '0 6px 16px rgba(46,125,82,.28)',
  cursor: 'pointer'
}}
```

### 5. Search Bar (Hero)
```javascript
style={{
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  border: '1px solid #E7DFC8',
  borderRadius: 999,
  padding: '8px 8px 8px 24px',
  maxWidth: 480,
  boxShadow: '0 6px 22px rgba(31,74,50,.07)',
  marginBottom: 24
}}
```

### 6. Layout Adjustments
- Hero max-width: 1320px, centered (use `margin: '0 auto'`)
- Hero padding: 56px sides, 52px top/bottom
- Section padding: 28px vertical, `var(--web-page-px)` horizontal
- Grid gaps: 48px (hero columns), 20px (plant grid, browse listings)
- All borders/dividers: `#E7DFC8`

## Testing Checklist
- [ ] Homepage renders with Bloom hero (gradient, 2-column, images)
- [ ] Navigation bar is cream-colored with green logo
- [ ] All buttons match the three CTA styles (orange, white+green, green)
- [ ] Search bar placeholder visible, "Search" button is green
- [ ] Plant images rotate slightly and cast shadows correctly
- [ ] Browse / Detail / Profile match their Bloom reference HTML pixel-for-pixel
- [ ] Responsive: hero and grids stack to 1 column on tablet/mobile
- [ ] Page navigation (home → browse → detail → profile) works smoothly
- [ ] Bloom footer band (green rounded CTA strip) appears on every page

## File Structure After Refactor
```
web/
├── index.html
├── WebApp.jsx (Bloom chrome + routing)
├── components/
│   ├── BloomNavigation.jsx (new — shared top nav)
│   ├── BloomFooterBand.jsx (new — shared footer CTA strip)
│   ├── BloomHome.jsx (new — hero, categories, listings)
│   ├── BloomBrowse.jsx (new — filters + grid + pagination)
│   ├── BloomDetail.jsx (new — gallery + info + more-near-you)
│   ├── BloomProfile.jsx (new — banner, stats, tabs, grid)
│   └── ... (other existing components)
├── assets/  (plant photos — begonia, hibiscus, caladium, succulent, + card-*.jpeg)
├── tokens/
│   ├── colors.css (add Bloom palette)
│   └── ... (other tokens)
└── ... (existing files)
```

## Design System Integration
- The Bloom look is applied **site-wide** — all four pages share the cream background, Outfit/Figtree type, and the green/orange/honey/brown palette.
- The Potting Shed DS components (Button, PlantCard, Badge, etc.) can be **restyled to Bloom tokens** or replaced with the inline-styled Bloom markup from the reference files — your call based on how much of the DS you want to keep.
- Keep one shared nav + footer component; every page mounts them.

## Questions?
Refer to `BLOOM-DESIGN-SPEC.md` for the full color palette, type scale, shadows, and spacing scale. All exact values are documented there.
