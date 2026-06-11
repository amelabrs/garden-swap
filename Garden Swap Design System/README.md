# Garden Swap — Design System

A localized, community-driven platform for gardening hobbyists to **swap, give away, buy, and learn about plants** — cuttings, seeds, houseplants, and the tools to keep them alive. Garden Swap is hyper-local first: every listing is anchored to a zip code and shown by distance, so a Monstera two miles away beats one across the state. The free tier keeps plant swapping open to everyone; premium tiers and a local marketplace pay the bills.

This design system is the single source of truth for designing **for** Garden Swap — recreating product screens, mocking new features, building decks, or shipping production UI.

> **About this system — read this first.** The original Garden Swap codebase was built by Claude Code as a *strictly utilitarian* prototype: no design intent, system fonts, emoji-as-icons, flat web-greens. This design system is a deliberate **rebrand** on top of that working product — it keeps every feature, flow, screen, and piece of copy faithful, but gives them a real, considered art direction. **The visuals here are the source of truth, not the original frontend.** Where this document and the old `frontend/style.css` disagree, this document wins.

---

## The rebrand direction — "Potting Shed"

Warm, tactile, a little editorial — the feeling of a well-loved potting bench: kraft paper, terracotta pots, seed packets, botanical field guides. It trades the prototype's flat web-app greens for an **earthen palette**, pairs an **editorial serif** with a **humanist grotesque**, and replaces emoji with a **proper line-icon set**. The result should feel like a beautifully-made indie gardening app, not a SaaS dashboard.

Three pillars:
1. **Earthen, not neon.** Kraft-cream paper, pine and fern greens, terracotta clay, honey. Color comes from the palette *and* from real plant photography — chrome stays quiet.
2. **Editorial voice.** A serif (Newsreader) carries plant names, headlines, and the magazine; a grotesque (Hanken Grotesk) does all the functional UI work. Hierarchy comes from *family* as well as size.
3. **Drawn, not typed.** A consistent line-icon set (the `Icon` component) replaces every emoji. Friendly, but intentional.

---

## Sources

The product behavior, flows, and copy were reverse-engineered from the Garden Swap codebase. If you have access, explore it to reproduce edge cases faithfully — **but take only behavior and content from it, not visual styling:**

- **GitHub:** [`amelabrs/garden-swap`](https://github.com/amelabrs/garden-swap) — the live (utilitarian) product.
  - `frontend/index.html` + `frontend/app.js` — the full mobile-first PWA: feed, listing detail, swap chat, profile, paywall. **Use for flow & copy reference only.**
  - `The_Plant_Swap_Platform_Blueprint.md` — the business & feature blueprint (tiers, workflows, copy, screen wireframes).
  - `frontend/style.css` — the *original* utilitarian stylesheet. **Superseded by this system — do not lift values from it.**

---

## The product at a glance

Garden Swap is a **single product**: a mobile-first Progressive Web App with a top bar, a bottom tab bar, and a floating "+" to list a plant.

**Primary surfaces**
- **Swap (Feed)** — the default landing screen. A radius-filtered grid of plant cards (photo, name, swap/free badge, type, distance, lister rating). Floating "+" FAB to list.
- **Listing Detail** — full-bleed photo, badges, description, lister + rating, "Request Swap".
- **Chats / Swap thread** — 1:1 negotiation with Accept / Decline / Confirm Handoff / Rate actions and a swap-state badge.
- **Profile** — display name, zip, rating, tier badge, wish list (limited on free tier), and your listings.
- **Paywall** — three-tier comparison modal (Sprout / Grower / Steward).
- **Notifications** — "Smart Match" alerts (premium) when a wished-for plant appears nearby.

**Tiers** — the spine of the product's economy. The growth metaphor (small → established → mighty) is the core brand device, rendered as line icons (`sprout` → `shrub` → `trees`), never emoji:

| Tier | Icon | Price | Identity |
| --- | --- | --- | --- |
| **Sprout** | `sprout` | Free | Limited (3 listings, 5 wishes), ad-supported |
| **Grower** | `shrub` | ₹99 / mo | Unlimited, smart-match, ad-free, magazine |
| **Steward** | `trees` | ₹249 / mo | Everything + courier discount, elite status, AI Plant Doctor |

> **Currency:** the blueprint quotes USD ($1 / $3) but the shipped product prices in **₹ (INR)** — Garden Swap launched in an Indian metro. This system follows the product and uses **₹**.

---

## CONTENT FUNDAMENTALS

How Garden Swap writes. *(The rebrand keeps the product's friendly voice — only the emoji leave.)*

- **Voice:** warm, encouraging, plainspoken neighbor. It sounds like a friendly gardener, not a SaaS dashboard. Community over commerce.
- **Person:** addresses the user as **"you"** ("Plants near you", "Be the first to list one!", "Add plants you're looking for"). Refers to the platform as **"Garden Swap"**, rarely "we".
- **Casing:** **Sentence case** everywhere — headings, buttons, labels. Title Case only for proper nouns and tier names (Sprout, Grower, Steward) and the magazine ("The Green Post"). Badges are the exception: short labels render **UPPERCASE** (tracked) via CSS `text-transform`, but are authored in normal case.
- **Length:** short. Buttons are 1–3 words ("Request Swap", "Send Request & Open Chat", "Publish Listing"). Empty states are two tiny lines: a situation + an invitation ("No plants found nearby." / "Be the first to list one!").
- **Punctuation:** friendly, light. Exclamation points are rationed, on invitations and confirmations ("Thanks for rating!"). Middots (`·`) separate inline meta.
- **No emoji in the UI.** The prototype prefixed labels with emoji; the rebrand replaces every one with an `Icon` glyph leading the label (an `Icon name="repeat"` before "Request Swap", not 🔄). Don't reintroduce emoji into product copy.
- **Tone in money moments:** paywalls stay gentle and benefit-led, never pushy — "Unlock more with Garden Swap", "Go ad-free with Grower", "Cancel anytime. No hidden fees." The secondary dismiss is soft ("Not now, thanks").
- **Trust language:** ratings, distances, and "Verified Partner" badges are front-and-center; the product constantly reassures.

**Representative copy**
- Search placeholder: *"Search plants near you…"*
- Feed eyebrow + title: *"Within 10 miles · 560001"* / *"Plants near you"*
- FAB intent: list a plant → *"List your plant"* → *"Publish Listing"*
- Swap CTA: *"Request Swap"* → *"Send Request & Open Chat"*
- Ad nudge: *"Go ad-free with Grower — Upgrade for ₹99/mo and never see ads again."*

---

## VISUAL FOUNDATIONS

The Garden Swap look is **warm, earthen, and editorial** — a potting-shed feeling, not a marketplace dashboard. Every value below lives in `tokens/` and is reachable as a CSS custom property; **always design with the tokens, never hardcoded hex.**

### Color
Two layers in `tokens/colors.css`: raw **primitives** (`--pine-700`, `--clay-600`, `--honey-500`…) and **semantic / legacy aliases** (`--color-primary`, plus the original token names re-pointed at the new palette so older work re-skins automatically).

- **Greens are the spine.** A pine→fern→sage→mint ramp: `--pine-900 #12301D` and `--pine-700 #1A4226` for dark chrome and headings, **`--fern-600 #285C39` for primary actions**, `--fern-400` for focus/hover, `--sage-300` for muted accents, `--mint-200`/`--mint-100` for chat bubbles and soft "swap" tints.
- **Terracotta clay is the warm accent.** `--clay-600 #B85C38` (on `--clay-100`) for secondary CTAs and — importantly — the **free / giveaway** badge. The convention is now **swap = mint green, free/giveaway = terracotta** (a gift is warm). This pairing is load-bearing across the feed.
- **Honey** `--honey-500 #DEA431` for ratings and highlights; **plum** `--plum-500` for rarity; **denim** `--denim-600` for the Steward tier and info.
- **Paper & ink neutrals:** kraft-cream page `--paper #F4EDDF`, warm-white card `--card #FFFDF8`, warm near-black ink `--ink #20251D`, warm hairline `--line #E6DCC8`. No cold greys.
- **Backgrounds:** the page is a soft kraft radial wash; cards are warm white. **No loud gradients** — only quiet paper washes and a single honey ad-banner tint. No dark mode.
- **Imagery is the color.** Cards are photo-forward — warm, naturally-lit real plant photos. Chrome stays quiet so the greenery pops; image placeholders fall back to a fern→mint gradient, never an abstract one.

### Type — `tokens/typography.css`, loaded from `tokens/fonts.css`
The rebrand introduces **two webfonts** (Google Fonts). This is an intentional departure from the prototype's system-only stack.
- **Newsreader** (`--font-serif`) — a warm editorial serif with true italics and optical sizing. Plant names, headings, view titles, and the "Green Post" magazine voice. Evokes seed catalogues and field guides.
- **Hanken Grotesk** (`--font-sans`) — a humanist grotesque for all UI: body, labels, buttons, badges, meta. Friendly and highly legible.
- **Hierarchy comes from family + size + weight.** Serif = editorial/naming; grotesque = functional. Scale runs `--text-xs .75rem` (badges) up to `--text-3xl 2.75rem` (display), with `--text-price` for tier prices. Weights 300–800.
- **Eyebrows** are the signature label treatment: `.gs-eyebrow` (or `--type-eyebrow`) — tiny, uppercase, tracked `+0.08em`, grotesque, muted. Used above titles ("Within 10 miles").
- **Badges:** tiny (`--text-xs`), 600-weight, UPPERCASE, tracked, on a colored pill.

### Spacing, radius & elevation — `tokens/spacing.css`
- **4px rhythm.** `--space-7 16px` is the default screen gutter.
- **Organic, generous rounding:** `--radius 12px` on buttons/inputs, **`--radius-card 18px`** on cards, `--radius-lg 24px` on modals, fully-rounded `--radius-pill` for buttons-by-default, search, chips and large badges.
- **Warm, layered shadows:** `--shadow` (two-layer, ink-tinted) at rest, `--shadow-hover` lifting on hover, `--shadow-fab` (fern glow), `--shadow-modal`. Cards carry a **warm kraft hairline** (`--line`) *and* a soft shadow — both, unlike the prototype.

### Motion & states
- **Organic and unhurried.** Transitions `--dur-base 0.2s` on a soft `--ease-out`. Cards **lift** on hover (`--lift` = `translateY(-3px)` + deeper shadow).
- **Buttons** deepen their fill on hover (e.g. `--fern-600`→`--pine-700`) and settle 1px on press — a tactile press, not a springy bounce. No infinite/looping animations.
- **Focus:** inputs swap their border to `--fern-400` with a soft 3px fern ring; a 2px fern focus ring elsewhere.

### Layout
- **Mobile-app shell, always:** a top bar (wordmark · search · location/bell), a fixed bottom nav (Swap · Chats · Profile), and a floating "+" FAB above the nav. Content scrolls between them with bottom padding to clear the nav.
- **Feed grid:** `auto-fill, minmax(280px, 1fr)` — one column on phones, multi-column wider. Sponsored ad banners span the full grid width for free users.
- **Modals** center over a warm `--scrim`, rounded `--radius-lg`, scroll internally. The chat thread is a tall flex column (header · messages · actions · input).

### Cards
The plant card is the hero unit: warm-white, **18px** rounded, kraft hairline + soft shadow, **full-bleed photo on top** (~188px, `object-fit: cover`) with status/rarity badges floated over the image, then an info block — **serif** plant name, muted type line, and a hairline-topped footer of `mapPin` distance · `star` rating · lister. It lifts on hover and is entirely tappable.

---

## ICONOGRAPHY

**Garden Swap's icon system is a line-icon set** — the `Icon` component (`components/core/Icon.jsx`), with path data from [Lucide](https://lucide.dev) (ISC-licensed). This **replaces the prototype's emoji** entirely. Icons render on a 24-grid at 1.75 stroke, round caps/joins, and inherit text color via `currentColor`.

**How icons are used**
- **One glyph, leading the label** — never a floating mystery-meat button. `<Icon name="repeat" size={16} /> Request Swap`.
- **Navigation:** `leaf`/`sprout` Swap · `message` Chats · `user` Profile. Top bar: `mapPin` location · `bell` notifications.
- **Status & meaning:** `repeat` swap · `gift` free · `star` rating (use `fill="currentColor"`) · `lock` premium · `sliders` filters · `handshake` handoff · `check` accept · `x` decline · `sun` light · `ruler` size · `heart` wish list · `sparkles` rarity/sponsored.
- **Tier marks:** `sprout` → `shrub` → `trees` for Sprout / Grower / Steward.

**Rules**
- **Use the `Icon` component, not emoji.** Match the vocabulary above before adding new glyphs (extend `Icon.jsx` with more Lucide paths if needed). One icon per element, leading the text.
- The **`leaf`** glyph is the logomark; the wordmark is **`leaf` + "Garden Swap"** set in Newsreader serif — on `--pine-900` (in a fern roundel) or on paper (in a mint roundel). See `assets/wordmark.card.html`.
- The **rating star** is the one filled icon (`fill="currentColor"`, honey); everything else is outline.
- For plant photography in mocks, use warm, naturally-lit real photos. Placeholders fall back to a fern→mint gradient.

See `assets/` for the wordmark, tier marks, and the full icon set.

---

## Index / Manifest

**Foundations**
- `styles.css` — entry point (link this one file). Imports everything below.
- `tokens/fonts.css` · `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/base.css`
- `guidelines/*.card.html` — foundation specimen cards (Type, Colors, Spacing).

**Components** (`components/`) — React primitives, namespace `window.GardenSwapDesignSystem_*` (call `check_design_system` for the exact suffix). Each has a `.jsx`, a `.d.ts` contract, and a `.prompt.md`:
- `core/` — **Icon**, **Button**, **Badge**, **TierBadge**, **Card**
- `forms/` — **Input**, **Select**
- `plants/` — **PlantCard**, **StarRating**

**UI kit** (`ui_kits/garden_swap_app/`) — interactive mobile-app recreation: Feed, Listing Detail, Chats, Profile, Paywall, in a phone frame. Self-contained (`ds-local.jsx` mirrors the primitives so it renders standalone), with sample data in `data.js`.

**Assets** (`assets/`) — wordmark specimen, tier marks, line-icon reference.

- `SKILL.md` — makes this system usable as a downloadable Claude Skill.

---

*A Potting Shed rebrand of the `amelabrs/garden-swap` product. Behavior & copy trace to the codebase; all visual styling is defined here.*
