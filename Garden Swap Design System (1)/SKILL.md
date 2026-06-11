---
name: garden-swap-design
description: Use this skill to generate well-branded interfaces and assets for Garden Swap — a hyper-local, community plant-swap mobile app — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

`README.md` carries the full brand: product context, content/voice rules, the **Potting Shed** visual direction, and the line-icon system. `styles.css` (with `tokens/*.css`) is the single CSS entry point — link it and design with the custom properties. `components/` holds the React primitives (Icon, Button, Badge, TierBadge, Card, Input, Select, PlantCard, StarRating) and `ui_kits/garden_swap_app/` is a working interactive recreation of the app you can read for layout and flow patterns. `guidelines/` and `assets/` hold specimen cards (colors, type, spacing, wordmark, tier marks, icon set).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

**Important context:** Garden Swap's original frontend was a strictly utilitarian Claude Code prototype (system fonts, emoji, flat web-greens). This system is a deliberate **rebrand** — keep the product's features, flows, and copy faithful, but the visual styling here supersedes the old frontend. Take behavior and content from the codebase; take all styling from this system.

Key things to get right for Garden Swap: the warm earthen "Potting Shed" palette (kraft-cream paper, pine/fern greens, terracotta clay accent, honey, plum); the swap = mint-green / free = terracotta badge convention; the **Newsreader serif + Hanken Grotesk** pairing (serif for plant names & headings, grotesque for UI); the **line-icon system** (the `Icon` component — never emoji); organic rounding (18px cards) on warm layered shadows + kraft hairlines; the mobile-app shell (top bar · bottom nav · "+" FAB); and the Sprout → Grower → Steward tier metaphor rendered as sprout/shrub/trees icons. Voice is warm, sentence-case, "you"-addressed, gently encouraging — never pushy.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
