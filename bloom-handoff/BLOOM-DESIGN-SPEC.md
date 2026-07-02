# Garden Swap — Bloom Homepage Design Spec

## Overview
A fresh, peppy-yet-calming redesign of the Garden Swap homepage. The direction emphasizes large, legible type, generous spacing, and a warm green + yellow + orange + brown palette that feels designed and editorial.

## Color Palette
- **Primary Green**: `#2E7D52` (vivid, warm fern)
- **Cream/Paper**: `#FFFBF5` (warm off-white background)
- **Orange/Coral**: `#DD7A2E` (warm primary CTA)
- **Yellow Accent**: `#E9B949` (honey, highlights)
- **Light Yellow**: `#FBE6B0` (pill backgrounds)
- **Dark Text**: `#23302a` (ink, high contrast)
- **Soft Text**: `#46544a` (secondary text)
- **Borders**: `#E7DFC8` (subtle, light)

## Typography
- **Headlines**: Outfit 800 (sans-serif, geometric, confident)
- **Body**: Figtree 400–700 (friendly sans-serif)
- **Sizes**:
  - Hero headline: 54px, 800 weight, -2% letter-spacing
  - Subheading: 21px, regular, line-height 1.55
  - Nav/UI: 17px, 600 weight
  - Labels: 14px, 700 weight, uppercase, 6% letter-spacing

## Layout & Spacing
- **Max-width**: 1320px (centered)
- **Padding**: 22px nav, 44px horizontal margins, 52px hero padding
- **Gap spacing**: 48px between columns, 16px in grids, 28px in nav
- **Border radius**: 30px hero, 24px images, 999px (pills/buttons)
- **Shadows**: Soft drop-shadow on buttons & cards (0 6px 22px rgba(31,74,50,.07) on lighter elements, stronger on darker)

## Key Sections

### Navigation
- Logo + "Garden Swap" in Outfit 800, 25px, green
- Links: Browse, How it works, Community (17px, 600, #3c4b40)
- Sign in link (17px, 600)
- "Join free" button: green bg, white text, rounded pill

### Hero Section
- **Background**: Gradient (135deg, #ECF7EC → #FBF1D8) with 30px border-radius
- **Layout**: 2-column grid (1.05fr / 0.95fr), 48px gap, center-aligned
- **Left column**:
  - Pill: "🌱 grow together" (Outfit 700, 14px, uppercase, #FBE6B0 bg, #8A6314 text)
  - Headline: "Swap plants with gardeners down the lane." (Outfit 800, 54px)
  - Body: "Swap cuttings..." (Figtree, 21px, #46544a)
  - Search bar: white bg, border #E7DFC8, green "Search" button (rounded pill)
  - Buttons: "Start swapping" (orange, shadow), "See how it works" (white/green border)
  - Footer text: "★ 1,240 plants rehomed..." (16px, #6b7568)
- **Right column**: 2x2 grid of plant images (200px height, 24px border-radius, -2deg rotate, shadow)

### Featured Plants (Listings)
- **Layout**: Likely a grid or carousel below hero
- **Card structure**: Image + plant name + owner + quick stats
- **Styling**: Rounded corners, subtle borders, warm shadows

## Buttons & Interaction States
- **Primary (CTA)**: Orange (#DD7A2E), white text, 18px Figtree 700, padding 16px 30px, rounded pill, shadow
- **Secondary**: White bg, green border (2px), green text, 18px Figtree 700, padding 14px 28px
- **Tertiary (small)**: Green bg, white text, 17px, padding 13px 26px, rounded pill

## Images
Four plant photos used in hero collage:
1. `assets/plant-begonia.jpeg` — Silver-veined begonia (top-left, -2deg rotate)
2. `assets/plant-hibiscus.jpeg` — Red/yellow hibiscus (top-right, slight rotate)
3. `assets/plant-caladium.jpeg` — White-spotted caladium (bottom-left, rotate)
4. `assets/plant-succulent.jpeg` — Pale succulent rosette (bottom-right, rotate)

All images: 24px border-radius, shadow 0 10px 24px rgba(31,74,50,.16)

## Tone & Copy
- **Headline**: Action-oriented, friendly ("Swap plants with gardeners down the lane")
- **Subheading**: Conversational, benefit-driven ("Swap cuttings, share seedlings, and meet the green-thumbs on your street")
- **CTA**: Direct, warm ("Start swapping", "Join free")

## Mobile / Responsive Notes
- Stack hero 2-column to 1-column on tablets/mobile
- Adjust font sizes down: hero headline ~36–42px on mobile
- Maintain pill/button touch targets (min 44px)
- Single-column plant grid on mobile

---

**Status**: Final direction approved. Ready for development handoff or component library integration.
