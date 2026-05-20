# Garden Swap — Implementation Strategy

## TL;DR Difficulty Rating

| Aspect | Difficulty (1-5) | Notes |
|--------|:-:|-------|
| Overall concept | ⭐⭐⭐⭐ | Multi-sided marketplace with payments, events, and subscriptions |
| MVP (Stage 1-2) | ⭐⭐ | Very achievable — listing + chat + location |
| Payments/Escrow (Courier) | ⭐⭐⭐⭐ | Stripe Connect escrow pattern, well-documented but careful |
| Shop/Supplier Integration | ⭐⭐⭐ | Standard e-commerce with commission split |
| Magazine/Subscriptions | ⭐⭐⭐ | Content gating + recurring billing |
| QR Event System | ⭐⭐⭐ | QR generation is easy; real-time scan verification adds complexity |
| AI Plant Doctor | ⭐⭐⭐⭐⭐ | Skip for now. Future feature. |

---

## Do You Need React? No.

Same rationale as ArtLocal — a **Progressive Web App** does everything the Plant Swap needs for Stages 1-4:

- Camera access (plant photos, QR scanning)
- GPS (hyper-local filtering)
- Push notifications (match alerts, new messages)
- Installable on phone (manifest.json)

**Recommended stack:**

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | PWA (vanilla JS + CSS) | Matches your existing skills |
| Backend | Python (FastAPI) | Fast, async, great for real-time chat |
| Database | SQLite → PostgreSQL | Start simple, migrate when you have users |
| Hosting | Render.com | You already use this |
| Payments | Stripe Connect | Handles escrow, commission splits, subscriptions |
| Maps | Leaflet.js + OpenStreetMap | Free, no API key needed |
| File Storage | Cloudinary (free tier) | Plant photo uploads/resizing |
| Push Notifications | Web Push API | Free, built into PWA |
| QR Codes | `qrcode` (Python) + `html5-qrcode` (JS) | Lightweight libraries |

---

## Staged Implementation Plan

### Stage 1: "The Swap Feed" (1-2 weeks) ✅ EASIEST START

**Goal:** Users can list plants, browse nearby listings, and filter. No messaging or payments yet.

Build:
- [ ] Landing page with card-based feed (plant photo, name, distance, status tag)
- [ ] User signup/login (email + password + mandatory Zip Code)
- [ ] Plant listing creation form: photos, plant name, type dropdown, condition dropdown, swap/free status
- [ ] Store images on Cloudinary (free tier)
- [ ] Geo-location: browser GPS → calculate distance from user's Zip Code to each listing
- [ ] Distance badge on each card ("1.5 mi away")
- [ ] Default 10-mile radius filter (adjustable: 5 / 10 / 25 mi)
- [ ] Basic search (plant name)
- [ ] Basic filters: plant type, status (Swap / Free)
- [ ] User profile page (name, zip, rating placeholder, their listings)
- [ ] Listing detail view (full photos, description, lister info)

**What you'll learn:** File uploads, geolocation API, distance math (haversine), basic CRUD

**Can demo:** "Look, plants near me available for swap!" — this alone is compelling.

---

### Stage 2: "The Swap" (2-3 weeks)

**Goal:** Users can request swaps, chat, and complete exchanges. The core loop works.

Build:
- [ ] "Request Swap" button on listing detail → opens swap request screen
- [ ] Swap request screen: offer a trade (select from own listings) OR request as giveaway
- [ ] Optional initial message (max 250 chars)
- [ ] Private 1:1 in-app chat (WebSocket or polling)
- [ ] Chat shows Accept/Decline buttons for the Lister
- [ ] Listing status transitions: Available → Negotiation Pending → Swap Accepted → Completed
- [ ] Swap completion: "Arrange Pickup" option (manual confirmation by both parties)
- [ ] Double-blind rating system (1-5 stars + comment, revealed after both submit)
- [ ] User rating displayed on profile and listing cards
- [ ] Push notification: "User B is interested in your [Plant Name]"
- [ ] Conversations list with unread indicators

**What you'll learn:** Real-time messaging, state machines (listing status), rating systems

---

### Stage 3: "The Tiers" (1-2 weeks)

**Goal:** Freemium model is live. Premium features are gated.

Build:
- [ ] Tier system: Sprout (free), Grower ($1/mo), Steward ($3/mo)
- [ ] Sprout limits: max 3 active listings, max 5 wish list items, ads shown
- [ ] Wish List feature (add plant names you're looking for)
- [ ] Smart Match Notifications (Grower+): alert when a new listing matches wish list + radius
- [ ] Advanced filters (Grower+): light needs, rarity, size, user rating threshold
- [ ] Subscription paywall modal (tier comparison table)
- [ ] Stripe Checkout for recurring subscriptions
- [ ] Ad slots in the feed for Sprout users (placeholder banners)
- [ ] Ad-free experience for Grower/Steward

**What you'll learn:** Subscription billing, feature gating, tiered access control

---

### Stage 4: "The Shop" (2-3 weeks)

**Goal:** Local nurseries and suppliers can sell products through the platform.

Build:
- [ ] "Shop" tab in main navigation
- [ ] Supplier application form + admin approval workflow
- [ ] Supplier Dashboard: upload products, manage inventory, view orders
- [ ] Product listings: name, price, stock, photos, category (Pots, Soil, Tools, Seeds, etc.)
- [ ] Shop landing page: search bar, category filter pills, "Featured Suppliers" carousel
- [ ] "Near Me" section: closest products based on user Zip Code
- [ ] Supplier Profile page: logo, rating, hours, map, product grid
- [ ] Cart + Checkout (Stripe Connect — platform takes 10-15% commission)
- [ ] Order status flow: New → Ready for Pickup → Shipped → Delivered
- [ ] Supplier notifications on new orders

**What you'll learn:** Multi-vendor e-commerce, Stripe Connect split payments, admin workflows

---

### Stage 5: "The Magazine" (1-2 weeks)

**Goal:** Content drives daily engagement and subscription revenue.

Build:
- [ ] "News" tab in main navigation
- [ ] Free articles section: title, excerpt, photo, full reader
- [ ] Admin publishing dashboard: upload articles (free) and magazine issues (premium)
- [ ] Magazine issue display: cover art, title, date, access indicator badge
- [ ] Paywall: Grower/Steward can read magazine; Sprout sees "Upgrade to Read" overlay
- [ ] In-app magazine reader (HTML viewer, no download/print)
- [ ] Push notification to subscribers when new issue publishes
- [ ] Ad slots within the magazine reader (sponsored content)

**What you'll learn:** Content management, access-controlled readers, push notifications

---

### Stage 6: "The Events" (2-3 weeks)

**Goal:** In-person swap meets with pre-booking and QR verification.

Build:
- [ ] Events section (in News or Community tab)
- [ ] Event listing: date, time, location (map), description
- [ ] RSVP registration (Grower/Steward only can tag plants)
- [ ] Plant tagging: select which of your listings you're bringing to the event
- [ ] "Event Exclusive" badge on tagged listings
- [ ] Event plant gallery: browse all tagged plants for a specific event
- [ ] "Pre-Book" button: freezes a listing for the booker
- [ ] QR Claim Code: unique, single-use, regenerates every 60 seconds
- [ ] QR Scanner: Giver scans Receiver's code at the event
- [ ] Manual 6-digit backup code entry
- [ ] Swap marked complete on successful scan → triggers rating system
- [ ] Optional event handling fee ($0.50-$1.00) on pre-bookings

**What you'll learn:** QR generation/scanning, time-limited tokens, event logistics

---

### Stage 7: "The Courier" (2-3 weeks)

**Goal:** Platform-managed delivery with escrow for non-local swaps.

Build:
- [ ] "Ship via Courier" option after swap accepted
- [ ] Delivery quote generation (distance-based pricing)
- [ ] Payment processing with escrow (funds held until delivery confirmed)
- [ ] Receiver confirms "Received" → funds released to courier + platform fee
- [ ] Steward tier gets 10-15% courier discount
- [ ] Courier commission: platform takes 5-10% of delivery fee
- [ ] Delivery tracking status updates

**What you'll learn:** Escrow patterns, multi-party payment flows

---

### Stage 8: "The Polish" (ongoing)

- [ ] AI Plant Doctor (Steward exclusive) — image-based plant diagnosis
- [ ] Elite Community Status badges
- [ ] "Verified Partner" badges for suppliers
- [ ] Email notifications (SendGrid)
- [ ] Analytics for suppliers (views, sales)
- [ ] Moderation tools (report listings, block users)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────┐
│              BROWSER (PWA)                   │
│  index.html / app.js / style.css            │
│  manifest.json + service-worker.js          │
└─────────────────┬───────────────────────────┘
                  │ HTTPS (JSON API + WebSocket)
                  ▼
┌─────────────────────────────────────────────┐
│         PYTHON BACKEND (FastAPI)            │
│  /api/listings  /api/auth  /api/chat        │
│  /api/swaps  /api/shop  /api/events         │
│  /api/magazine  /api/subscriptions          │
└──┬──────┬──────────┬──────────┬─────────────┘
   │      │          │          │
   ▼      ▼          ▼          ▼
┌──────┐ ┌──────────┐ ┌──────┐ ┌──────────┐
│SQLite│ │Cloudinary│ │Stripe│ │ Web Push │
│ (DB) │ │ (images) │ │Connect│ │  (notif) │
└──────┘ └──────────┘ └──────┘ └──────────┘
```

---

## File Structure (Target)

```
garden-swap/
├── The_Plant_Swap_Platform_Blueprint.md   ← spec (exists)
├── IMPLEMENTATION_STRATEGY.md             ← this file
├── backend/
│   ├── app.py                  ← FastAPI main
│   ├── models.py               ← DB models (users, listings, swaps, orders)
│   ├── auth.py                 ← login/signup/tiers
│   ├── listings.py             ← plant listing CRUD
│   ├── swaps.py                ← swap request/accept/complete logic
│   ├── chat.py                 ← WebSocket messaging
│   ├── shop.py                 ← supplier products, cart, orders
│   ├── magazine.py             ← articles, issues, access control
│   ├── events.py               ← event RSVP, tagging, QR codes
│   ├── geo.py                  ← distance calculations
│   ├── payments.py             ← Stripe subscriptions + Connect
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   ├── manifest.json
│   └── service-worker.js
└── data/
    └── gardenswap.db           ← SQLite database
```

---

## Quick Wins (Do These First)

1. **Card-based plant feed** — photo-dominant cards with green/blue status tags. Just CSS. 30 min.
2. **Geolocation + distance badge** — `navigator.geolocation.getCurrentPosition()` is 5 lines of JS.
3. **Image upload to Cloudinary** — free account, 10 lines of Python.
4. **Zip code radius filter** — haversine formula, copy-paste function.
5. **Swap/Free status toggle** — simple radio buttons on listing form, color-coded tags in feed.

These 5 things together = a working demo that looks like a real plant swap app.

---

## Key Decisions to Make Later

| Decision | Options | When to decide |
|----------|---------|----------------|
| Domain name | gardenswap.app? plantswap.co? | Before launch |
| Platform commission % | 10-15% on shop sales | Before Stage 4 |
| Courier fee % | 5-10% | Before Stage 7 |
| Subscription prices | $1/$3 as spec'd, or adjust? | Before Stage 3 |
| Max listing distance | 10mi default, user-adjustable | Stage 1 (configurable) |
| Moderation | Manual? AI? Community reports? | When you have >50 users |
| Magazine frequency | Monthly? Bi-weekly? | Before Stage 5 |
| Legal | Terms of service, liability for swaps | Before real money flows |

---

## Summary

The Plant Swap Platform is bigger than ArtLocal (events, magazine, courier, multi-tier subscriptions) but the core is the same pattern:

- A listing feed (you've done this) +
- Location awareness (browser API, easy) +
- Messaging (WebSocket, medium) +
- Payments (Stripe Connect, medium) +
- Content gate (subscription check, easy)

Start with Stage 1. Get plants on a feed with distance badges. Everything else is incremental.

---

## Test Cases

### Stage 1 — "The Swap Feed"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 1.1 | Feed loads without login | Open app | Card feed shows seed listings with plant photos, names, status tags (green "Swap" / blue "Free") |
| 1.2 | Geolocation distance | Allow location permission | Distance badges appear (e.g. "2.3 mi"); feed sorts by proximity |
| 1.3 | Feed works without location | Deny location permission | Feed still loads showing all listings; no distance badges; "Showing all plants" status |
| 1.4 | Sign up | Click Sign Up → fill name, email, password, Zip Code → submit | Account created, redirected to feed, profile shows zip code |
| 1.5 | Sign up requires Zip Code | Try to submit sign-up form without Zip Code | Validation prevents submit (mandatory field) |
| 1.6 | Login | Sign in with test credentials | Succeeds, auth state persists on reload |
| 1.7 | Create plant listing | Tap "+" → upload photo → fill name, select type, condition, swap status → Publish | New card appears in feed; shows in user's profile |
| 1.8 | Listing requires photo | Try to submit listing without photo | Validation prevents submit |
| 1.9 | Listing requires plant type | Try to submit listing without selecting plant type dropdown | Validation prevents submit |
| 1.10 | Listing detail view | Tap any card in the feed | Detail view shows full photo(s), plant name, description, condition, lister info, distance |
| 1.11 | Radius filter | Change radius from 10mi to 5mi | Feed reloads showing only listings within 5 miles |
| 1.12 | Search by name | Type "Monstera" in search bar | Only listings with "Monstera" in title shown |
| 1.13 | Filter by type | Select "Succulent" from type filter | Only succulent listings shown |
| 1.14 | Filter by status | Select "Free" from status filter | Only "Free/Giveaway" listings shown |
| 1.15 | Profile view | Tap Profile tab | Shows user's name, zip code, all their listings |
| 1.16 | Delete listing | Open own listing → tap Delete → confirm | Listing removed from feed and profile |
| 1.17 | Location auto-fills on listing | Create a new listing | Location field shows user's registered Zip Code (pre-filled) |

---

### Stage 2 — "The Swap"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 2.1 | Request Swap button visible | Open another user's listing | "Request Swap" button shown |
| 2.2 | Request Swap not on own listing | Open your own listing | "Request Swap" button NOT shown; Delete/Edit shown instead |
| 2.3 | Swap request — offer trade | Click "Request Swap" → select "Offer a Plant" → pick own listing → send | Chat thread created; lister receives notification |
| 2.4 | Swap request — request giveaway | Click "Request Swap" → select "Request as Giveaway" → send | Chat thread created with giveaway intent noted |
| 2.5 | Optional message | Write initial message on swap request screen → send | Message appears as first message in chat thread |
| 2.6 | Lister receives notification | Log in as the Lister | Notification: "[User B] is interested in your [Plant Name]" |
| 2.7 | Chat opens | Both users navigate to the conversation | Private 1:1 chat visible to both parties |
| 2.8 | Send message in chat | Type text → Send | Message appears in chat as "mine" bubble |
| 2.9 | Receive message | Log in as other user | Message appears as "theirs" bubble |
| 2.10 | Listing status — pending | After swap request sent | Listing shows "Negotiation Pending" status |
| 2.11 | Accept swap | Lister clicks "Accept Swap" in chat | Status changes to "Swap Accepted"; both users see completion options |
| 2.12 | Decline swap | Lister clicks "Decline" in chat | Listing status returns to "Available"; chat thread closed |
| 2.13 | Confirm pickup — giver | After Accept → Giver clicks "Marked as Picked Up" | System prompts Receiver to confirm |
| 2.14 | Confirm received — receiver | Receiver clicks "Confirm Received" | Swap marked Complete; rating prompt appears |
| 2.15 | Rate swap — double blind | User A submits 4-star rating | Rating hidden until User B also submits |
| 2.16 | Ratings revealed | Both users submit ratings | Both ratings appear on respective profiles |
| 2.17 | Rating shows on listing cards | After completing a rated swap | User's average rating (e.g. 4.5 ⭐) visible on their listing cards |
| 2.18 | Conversations list | Tap Messages/Chat icon | All active conversations shown with last message preview |
| 2.19 | Unread indicator | Receive a message → check conversations list | Unread badge shown on conversation |
| 2.20 | Auth required for swap request | Without logging in, tap "Request Swap" | "Please sign in" prompt appears |

---

### Stage 3 — "The Tiers"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 3.1 | Sprout limit — listings | As Sprout user, create 4th listing | Soft paywall modal appears: "Upgrade to Grower for unlimited listings" |
| 3.2 | Sprout limit — wish list | As Sprout user, add 6th wish list item | Soft paywall modal appears: "Upgrade to Grower" |
| 3.3 | Wish list add | Add "Philodendron" to wish list | Item saved to wish list (viewable in profile) |
| 3.4 | Smart Match — Grower | As Grower, have "Pothos" on wish list; another user posts a Pothos within radius | Push notification: "New Match Found — Pothos listed 3 mi away!" |
| 3.5 | Smart Match — Sprout blocked | As Sprout user with wish list items | No match notifications sent (feature locked) |
| 3.6 | Advanced filters — Grower | As Grower, open filter menu | Advanced filters visible (rarity, light needs, user rating) |
| 3.7 | Advanced filters — Sprout blocked | As Sprout user, open filter menu | Only basic filters shown (type, location); advanced shows lock icon |
| 3.8 | Paywall modal | Tap any locked feature as Sprout | Modal shows Sprout vs Grower vs Steward comparison table with prices |
| 3.9 | Subscribe to Grower | Click "Upgrade to Grower" → complete Stripe Checkout | Tier updated; limits removed; ad-free experience |
| 3.10 | Subscribe to Steward | Click "Upgrade to Steward" → complete Stripe Checkout | Tier updated; all premium features unlocked |
| 3.11 | Ads shown for Sprout | Browse feed as Sprout user | Sponsored/ad banners appear between listing cards |
| 3.12 | Ads hidden for Grower | Browse feed as Grower user | No ad banners in feed |
| 3.13 | Cancel subscription | Go to Profile → Subscription → Cancel | Tier reverts to Sprout at end of billing period |

---

### Stage 4 — "The Shop"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 4.1 | Shop tab visible | Open app | "Shop" tab in bottom navigation bar |
| 4.2 | Shop landing loads | Tap Shop tab | Landing page shows search bar, category pills, featured suppliers, near-me products |
| 4.3 | Category filter | Tap "Pots" category pill | Only pot products shown |
| 4.4 | Search products | Type "organic fertilizer" in search | Matching products displayed |
| 4.5 | Near Me section | Allow location | "Near Me" shows products from closest suppliers |
| 4.6 | Product detail | Tap a product | Shows full photo, price, stock level, supplier info, "Add to Cart" button |
| 4.7 | Add to cart | Tap "Add to Cart" | Item added; cart badge shows count |
| 4.8 | Cart view | Tap cart icon | Shows all items, quantities, total price |
| 4.9 | Checkout | Tap "Checkout" → complete Stripe payment | Order placed; confirmation shown |
| 4.10 | Supplier notification | After checkout | Supplier receives "New Order" notification in their dashboard |
| 4.11 | Commission deducted | Check Stripe dashboard after purchase | Platform received 10-15% commission; remainder sent to supplier |
| 4.12 | Supplier profile | Tap a supplier name | Shows supplier logo, rating, hours, map, product grid |
| 4.13 | Supplier dashboard — add product | Log in as supplier → Add Product form → submit | Product appears in shop |
| 4.14 | Supplier dashboard — manage orders | Log in as supplier → Orders tab | Shows order list with status (New, Ready, Shipped, Delivered) |
| 4.15 | Order status update | Supplier marks order "Ready for Pickup" | Customer sees updated status |
| 4.16 | Supplier application | Fill supplier application form → submit | Application marked "Pending"; admin can approve |
| 4.17 | Supplier approval | Admin approves application | Supplier receives vendor account credentials |

---

### Stage 5 — "The Magazine"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 5.1 | News tab visible | Open app | "News" tab in navigation |
| 5.2 | Free articles load | Tap News tab | Recent free articles shown with title, excerpt, photo |
| 5.3 | Read free article | Tap any free article | Full article opens in-app reader |
| 5.4 | Magazine issue displayed | View News tab | Featured issue card shows cover art, title, date |
| 5.5 | Access indicator — subscribed | As Grower/Steward, view magazine card | Green "SUBSCRIBED" badge shown |
| 5.6 | Access indicator — locked | As Sprout, view magazine card | Yellow "PREMIUM - TAP TO UNLOCK" badge shown |
| 5.7 | Paywall on tap | As Sprout, tap magazine issue | Paywall modal appears comparing tiers |
| 5.8 | Magazine reader opens | As Grower, tap magazine issue | In-app reader opens with full content |
| 5.9 | No download option | Open magazine reader | No download, print, or share-outside options available |
| 5.10 | New issue notification | Admin publishes new issue | All Grower/Steward users receive push: "The [Month] Issue is here!" |
| 5.11 | Admin upload | Admin access publishing dashboard → upload issue → publish | Issue appears in News tab for subscribers |
| 5.12 | Ad slots in magazine | Read magazine issue | Sponsored ads appear within the reader content |

---

### Stage 6 — "The Events"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 6.1 | Events section visible | Navigate to Events | Upcoming local events listed with date, time, location |
| 6.2 | Event detail | Tap an event | Shows full details: date, time, map, description, RSVP button |
| 6.3 | RSVP — premium only | As Grower, tap "Register" | RSVP confirmed; prompted to tag plants |
| 6.4 | RSVP — Sprout blocked | As Sprout, tap "Register" | Paywall: "Upgrade to tag plants for events" |
| 6.5 | Tag plants for event | After RSVP, select plants from own listings | Selected plants get "Event Exclusive" badge |
| 6.6 | Event plant gallery | View event → "Plants at this Event" tab | All tagged plants displayed in grid |
| 6.7 | Pre-Book plant | Tap "Pre-Book" on an event plant | Listing frozen; status changes to "Pre-booked for [Event]" |
| 6.8 | Pre-booked can't be booked again | Another user tries to pre-book same plant | "Already pre-booked" message shown |
| 6.9 | Show Claim Code | Receiver opens "My Bookings" at event | QR code displayed with plant info |
| 6.10 | QR regenerates | Wait 60 seconds on Claim Code screen | QR code refreshes (new code generated) |
| 6.11 | Scan to Give | Giver opens "Scan to Give" → scans Receiver's QR | "Success! Swap Complete" message for both |
| 6.12 | Rating triggered after scan | After successful QR scan | Both users receive "Rate this swap" prompt |
| 6.13 | Manual backup code | Receiver taps "Code not scanning?" | 6-digit backup code displayed; Giver can enter manually |
| 6.14 | Event handling fee | Complete a pre-booked swap | Small fee ($0.50-$1.00) charged to booker |
| 6.15 | Safety text on QR | View Claim Code screen | Warning shown: "Only show this code when you have the plant in your hands" |

---

### Stage 7 — "The Courier"

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 7.1 | Courier option appears | After swap accepted | "Ship via Platform Courier" option shown alongside "Arrange Pickup" |
| 7.2 | Delivery quote | Select "Ship Courier" | System displays delivery quote based on distance |
| 7.3 | Steward discount | As Steward, view delivery quote | 10-15% discount applied; original and discounted prices shown |
| 7.4 | Payment + escrow | Receiver pays for delivery | Funds held in escrow (not released to courier) |
| 7.5 | Delivery confirmation | Receiver clicks "Confirm Received" | Funds released to courier; platform takes 5-10% fee |
| 7.6 | Rating after courier delivery | After delivery confirmed | Rating system triggered for both swapper parties |
| 7.7 | Escrow timeout | Receiver doesn't confirm after X days | System sends reminder; admin can intervene |

---

### Database Upgrade (Apply Before Deploy)

| # | Test | Steps | Expected |
|---|------|-------|----------|
| DB.1 | Local dev uses SQLite | Run locally without DATABASE_URL | App works with SQLite file |
| DB.2 | Render uses PostgreSQL | Set DATABASE_URL env var on Render | App connects to PG, tables auto-created |
| DB.3 | Seed data on fresh DB | First deploy with empty PG | Seed listings and test users auto-inserted |
| DB.4 | Data survives redeploy | Redeploy on Render | All users, listings, swaps, messages persist |
