# 🌿 Garden Swap Design System Website

This folder contains a standalone showcase website for the **Garden Swap Design System (Potting Shed rebrand)**.

## Files

- **index.html** — Showcase website with color palette, component library, and usage guide
- **styles.css** — Main stylesheet entry point (imports all token layers)
- **tokens/** — CSS custom property definitions
  - `fonts.css` — Font families and imports (Newsreader serif, Hanken Grotesk sans)
  - `colors.css` — Complete palette (primitives + semantic + legacy aliases)
  - `typography.css` — Font sizes, weights, line heights
  - `spacing.css` — Spacing scale, radius, shadows, layout constants
  - `base.css` — Default element styling
- **_ds_bundle.js** — Compiled React components (15 total: Badge, Button, Card, Icon, TierBadge, Input, Select, PlantCard, StarRating, Alert, Breadcrumb, Footer, Nav, Pagination, Sidebar)

## Local Testing

1. Ensure backend is configured to serve this folder:
   ```python
   # In backend/app.py
   app.mount("/design", StaticFiles(directory="../web", html=True), name="design")
   ```

2. Start the backend:
   ```bash
   cd backend && uvicorn app:app --reload
   ```

3. Open browser to:
   ```
   http://localhost:8000/design/
   ```

4. Verify:
   - Color swatches render with correct colors
   - Typography and spacing display correctly
   - Component list shows all 15 components
   - Browser console shows `window.GardenSwapDesignSystem_0373cf` available

## Deployment

1. Commit changes:
   ```bash
   git add web/
   git commit -m "Add design system website showcase"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Redeploy to Render:
   - Render watches GitHub and auto-deploys on push
   - Website will be live at: `https://garden-swap-api.onrender.com/design/`

## Component Access

In HTML or React:

```javascript
const { Button, Card, Badge } = window.GardenSwapDesignSystem_0373cf;
```

## Design Philosophy

**Potting Shed rebrand** — a warm, earthen palette:
- **Kraft paper** (#F4EDDF) — page backgrounds, warmth
- **Pine & Fern greens** (#12301D → #285C39) — primary colors, nature
- **Terracotta clay** (#B85C38) — accent, highlights
- **Honey/gold** (#DEA431) — ratings, premium
- **Denim** (#2E5E6E) — info, steward actions
- **Tomato** (#BF4A30) — danger, decline

Token layers:
1. **Primitives** — raw hues (--pine-700, --clay-600)
2. **Semantic roles** — purpose-driven (--color-primary, --surface-page)
3. **Legacy aliases** — original names re-pointed to new palette (--green-dark, etc.)

This enables consistent, maintainable theming across all Garden Swap interfaces.
