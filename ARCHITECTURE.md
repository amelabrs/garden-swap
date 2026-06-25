# Garden Swap — Architecture Document

**Version:** Stage 3 (Tiers)
**Last updated:** June 2026
**Status:** Development → Pre-Production

---

## 1. System Overview

```
          ┌──────────────────────┐      ┌──────────────────────┐
          │     WEB BROWSER      │      │   MOBILE DEVICE      │
          │  Desktop / Laptop    │      │  iOS / Android       │
          │  garden-swap.        │      │  Installed as PWA    │
          │  amelrahman.in       │      │  or via App Store    │
          └──────────┬───────────┘      └──────────┬───────────┘
                     │                             │
                     └──────────────┬──────────────┘
                                    │ HTTPS
                     ┌──────────────▼──────────────────────┐
                     │         RENDER (Cloud Host)         │
                     │                                     │
                     │  ┌─────────────────────────────┐   │
                     │  │     FastAPI (Python)        │   │
                     │  │     Backend API             │   │
                     │  │  - Auth (JWT tokens)        │   │
                     │  │  - Listings / Swaps         │   │
                     │  │  - Tiers / Wish List        │   │
                     │  │  - Notifications            │   │
                     │  │  - Stripe Webhooks          │   │
                     │  └──────┬──────────────────────┘   │
                     │         │                           │
                     │  ┌──────▼──────────────────────┐   │
                     │  │   PostgreSQL Database       │   │
                     │  │   (Render Managed)          │   │
                     │  └─────────────────────────────┘   │
                     └──────────────┬──────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                         │
┌──────────▼──────────┐  ┌─────────▼──────────┐  ┌─────────▼──────────┐
│      Cloudinary     │  │       Stripe        │  │   GoDaddy DNS      │
│   (Image Storage)   │  │   (Payments)        │  │  amelrahman.in     │
│  Plant photos       │  │  Subscriptions      │  │  CNAME → Render    │
└─────────────────────┘  └────────────────────┘  └────────────────────┘
```

---

## 2. Platform Strategy — Web & Mobile

Garden Swap is built as a **Progressive Web App (PWA)**, which means the same codebase runs on both web and mobile with no separate native app required.

### Web
- Accessible at `garden-swap.amelrahman.in` in any desktop or mobile browser
- Full functionality: browse, list, swap, chat, notifications

### Mobile — Two distribution paths

**Path 1 — Install from browser (PWA)**
Users can tap "Add to Home Screen" on iOS/Android and the app installs like a native app — full screen, app icon, no browser chrome.

**Path 2 — App Store publishing**
The PWA can be wrapped and submitted to both stores using free tools:
- **Google Play Store:** via [PWABuilder](https://www.pwabuilder.com) (Microsoft's free tool) — generates a TWA (Trusted Web Activity) wrapper
- **Apple App Store:** via PWABuilder or Capacitor — requires a Mac and an Apple Developer account ($99/year)

No code changes are needed to publish — the same frontend works across all three surfaces.

---

## 3. Current Stack (Development)

### Frontend
- **Language:** Vanilla HTML, CSS, JavaScript — no framework
- **Type:** Progressive Web App (PWA)
- **Runs on:** Desktop browsers, mobile browsers, installable on iOS & Android home screen
- **Served by:** FastAPI static file mount (`/frontend` folder)
- **Design System:** Garden Swap Design System (`/web` folder, served at `/design`)
- **Auth:** JWT tokens stored in `localStorage`

### Backend
- **Language:** Python 3.14
- **Framework:** FastAPI
- **Hosting:** Render (free tier — spins down after inactivity)
- **Auth:** JWT (python-jose), passwords hashed with bcrypt
- **Image uploads:** Cloudinary SDK

### Database
- **Local (dev):** SQLite — single file, zero setup
- **Production (Render):** PostgreSQL — managed by Render
- **ORM:** Raw SQL (no ORM) via sqlite3 / psycopg2

### External Services
| Service | Purpose | Current Mode |
|---|---|---|
| Cloudinary | Plant image storage & CDN | Production (free tier) |
| Stripe | Subscription payments | **Test mode** |
| Render | App hosting | Free tier |
| GoDaddy | Domain (`amelrahman.in`) | Purchased, DNS not yet wired |
| PWABuilder | App store publishing | Not yet initiated |

---

## 4. Data Model (Key Tables)

```
users
  id, email, username, display_name, zip_code
  lat, lng, rating_sum, rating_count
  tier (sprout / grower / steward)
  stripe_customer_id, stripe_subscription_id

listings
  id, user_id, title, plant_type, condition, status
  description, image_url, lat, lng
  light_needs, rarity, size, is_active

swaps
  id, listing_id, requester_id, lister_id
  swap_type, state (pending/accepted/declined/completed)
  lister_confirmed, requester_confirmed

messages
  id, swap_id, sender_id, body

ratings
  id, swap_id, rater_id, ratee_id, score, comment

wish_list
  id, user_id, plant_name

notifications
  id, user_id, body, listing_id, is_read
```

---

## 5. Tier System

| Feature | 🌱 Sprout (Free) | 🌿 Grower (₹99/mo) | 🌳 Steward (₹249/mo) |
|---|---|---|---|
| Active listings | Max 3 | Unlimited | Unlimited |
| Wish list items | Max 5 | Unlimited | Unlimited |
| Smart match alerts | ❌ | ✅ | ✅ |
| Advanced filters | ❌ | ✅ | ✅ |
| Ad-free feed | ❌ | ✅ | ✅ |
| Courier discount | ❌ | ❌ | 10–15% |
| AI Plant Doctor | ❌ | ❌ | Coming soon |

Tier upgrades handled via **Stripe Checkout** → webhook → database update.

---

## 6. What Changes for Production

### Hosting
| Item | Now | Production |
|---|---|---|
| Render plan | Free (cold starts) | Paid ~$7/mo (always on) |
| Database | Render PostgreSQL (dev) | Render PostgreSQL + automated backups |
| Domain | `garden-swap.onrender.com` | `garden-swap.amelrahman.in` |

### Payments
| Item | Now | Production |
|---|---|---|
| Stripe mode | Test (`sk_test_...`) | Live (`sk_live_...`) |
| Stripe products | Test prices | Real INR prices (₹99, ₹249) |
| Webhook | Test endpoint | Production endpoint on Render |
| What changes in code | Nothing | Just swap env vars on Render |

### Mobile Publishing
| Platform | Tool | Requirement | Cost |
|---|---|---|---|
| Google Play Store | PWABuilder | Google Developer account | $25 one-time |
| Apple App Store | PWABuilder / Capacitor | Apple Developer account + Mac | $99/year |

### Security Hardening
- Set `DEBUG=False` in FastAPI
- Tighten CORS to only allow the production domain
- Rotate JWT secret key to a strong production value
- Enable Render's DDoS protection

### DNS Setup (GoDaddy → Render)
```
Type   Name           Value                          TTL
CNAME  garden-swap    garden-swap-xxxx.onrender.com  600
```

---

## 7. What is NOT Yet Built (Future Stages)

- **Stage 4 — The Shop:** Local nursery supplier marketplace with Stripe Connect commissions
- **AI Plant Doctor:** Plant health diagnosis via photo (Steward tier)
- **Push notifications:** Real-time swap alerts via web push / APNs (currently in-app only)

---

## 8. Questions for Expert Review

1. Is PostgreSQL on Render sufficient for early production, or should we move to a dedicated RDS instance?
2. Is Cloudinary's free tier (25 GB storage, 25 GB bandwidth/mo) sufficient for launch?
3. Should we add a CDN (Cloudflare) in front of Render for performance and DDoS protection?
4. JWT tokens in localStorage — is this acceptable for this threat model, or should we move to httpOnly cookies?
5. Is the current single-server architecture sufficient, or do we need to plan for horizontal scaling?
6. For App Store publishing via PWABuilder — are there any PWA feature gaps (push notifications, offline mode) that need to be addressed before submission?
