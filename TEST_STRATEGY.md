# Garden Swap — Test Strategy (Stage 4: The Shop)

---

## AI Instructions (for future sessions)

> You are working on Garden Swap, a hyper-local plant trading PWA for Bangalore gardeners.
> This file contains the test strategy for Stage 4 (The Shop).
>
> **Your task:** Take the content of this file and ensure it is live as a hosted HTML page at
> `/test-plan` on Render (https://garden-swap.onrender.com/test-plan).
>
> The page is served from `frontend/test-plan.html` and routed in `backend/app.py`
> via `@app.get("/test-plan")`. If either file is missing or the route is broken, recreate them.
> Push to GitHub — Render auto-deploys from `main`.

---

## Email to Reshma

**To:** reshma.rajkumar@gmail.com
**Subject:** Garden Swap — Stage 4 (The Shop) is ready for testing 🌿

---

Hi Reshma,

Stage 4 of Garden Swap is live — we've added a full marketplace where vendors can sell
plants, pots, soil, fertilisers, tools and seeds. Would love your feedback before we
push this to production.

**Test URL:** https://garden-swap.onrender.com
*(Note: it's on Render free tier — may take 30–60 seconds to wake up on first load)*

**Your login:** reshma.rajkumar@gmail.com / demo1234

**Full test plan:** https://garden-swap.onrender.com/test-plan

---

**What's new to test:**

1. **Shop tab** — browse products across 7 categories
2. **Cart** — add items from multiple vendors, adjust quantities
3. **Checkout** — enter a delivery address and place an order
4. **Vendor registration** — click "Sell Here →" in the Shop tab and register as a vendor
5. **Steward discount** — upgrade to Steward tier and confirm 10% off at checkout

**Existing features to recheck** (make sure nothing broke):
- Plant listings feed, search and filters
- Swap requests and chat
- Wish list and smart match alerts (Grower tier)

Please note anything that feels off — wrong price, button not working, missing image,
confusing flow, anything. No detail is too small.

Thanks so much!
Amel

---

## Test Cases

### TC-01 — Product Browse
| Step | Action | Expected |
|------|--------|----------|
| 1 | Open Shop tab | 12 products load in a grid |
| 2 | Tap "Plants" category | Only plant products shown |
| 3 | Tap "Tools" category | Pruning Shears + Tool Set shown |
| 4 | Type "cocopeat" in search | Cocopeat Block appears |
| 5 | Tap a product card | Detail modal opens with title, price, vendor, description |
| 6 | Sign out, open Shop | Products still visible (no login required to browse) |

### TC-02 — Cart
| Step | Action | Expected |
|------|--------|----------|
| 1 | Add item without logging in | Sign-in prompt appears |
| 2 | Log in, add 1 product | Cart badge in topbar shows "1" |
| 3 | Add second product from different vendor | Both appear in cart drawer |
| 4 | Tap "+" on an item | Quantity increases, price updates |
| 5 | Tap "−" until qty = 0 | Item is removed from cart |
| 6 | Tap 🗑️ on an item | Item removed, badge updates |
| 7 | Tap "Clear cart" | Confirmation prompt → cart empties |

### TC-03 — Checkout (Dev Mode — no card needed)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Add items to cart | Cart shows correct total |
| 2 | Tap "Checkout →" | Delivery details modal opens |
| 3 | Leave name blank, submit | Validation error shown |
| 4 | Fill in name, phone, address → submit | Success message with order number |
| 5 | Check cart after order | Cart is empty |

### TC-04 — Vendor Registration
| Step | Action | Expected |
|------|--------|----------|
| 1 | Go to Shop → "Sell Here →" | Vendor registration form opens |
| 2 | Submit with empty shop name | Validation error |
| 3 | Submit with valid details | "Pending approval" screen |
| 4 | Log in as amelabrs@gmail.com → Profile | Admin panel shows vendor as ⏳ Pending |
| 5 | Click Approve | Vendor status changes to ✅ Approved |
| 6 | Log back in as vendor → "Sell Here →" | Vendor dashboard appears |
| 7 | Add product with title, price, category, image | Product appears in Shop grid |
| 8 | Delete product from dashboard | Product disappears from Shop |

### TC-05 — Steward Discount
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as Priya (steward tier) | Tier badge shows 🌳 Steward |
| 2 | Add items to cart, open cart | "🌳 Steward 10% discount applied!" banner shows |
| 3 | Check total in cart | Total is 10% less than item sum |
| 4 | Proceed to checkout | Checkout total matches discounted amount |

### TC-06 — Admin Panel
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as amelabrs@gmail.com → Profile | "⚙️ Admin — Vendor Approvals" section visible |
| 2 | Log in as any other user → Profile | Admin section is NOT visible |
| 3 | Approve a pending vendor | Status → ✅, vendor can now add products |
| 4 | Reject a vendor | Status → ❌, vendor sees rejection screen |
| 5 | Direct GET /api/admin/vendors without admin token | Returns 403 |

### TC-07 — Regression (existing features)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Open Swap tab | Plant listings load |
| 2 | Post a new listing | Appears in feed |
| 3 | Request a swap | Chat opens |
| 4 | Add item to wish list (Sprout) | Capped at 5 items |
| 5 | Subscribe to Grower (Stripe test) | Tier upgrades, smart match works |
| 6 | Notification bell | Shows unread count for Grower+ |

### TC-08 — Edge Cases
| Step | Action | Expected |
|------|--------|----------|
| 1 | Register as vendor twice | "Already registered" error |
| 2 | Add to cart — stock qty 2, try to add 5 | "Only 2 in stock" error |
| 3 | Submit checkout with empty cart | "Cart is empty" error |
| 4 | Open /test-plan URL | This test plan page loads |

---

## Credentials for Testing

| User | Email | Password | Tier | Role |
|------|-------|----------|------|------|
| Priya Sharma | priya@demo.com | demo1234 | 🌳 Steward | Regular user |
| Faizan Ahmed | faizan@demo.com | demo1234 | 🌿 Grower | Regular user |
| Rachel D'Souza | rachel@demo.com | demo1234 | 🌱 Sprout | Regular user |
| Deepak Gowda | deepak@demo.com | demo1234 | 🌱 Sprout | Vendor (Green Roots Nursery) |
| Amina Begum | amina@demo.com | demo1234 | 🌱 Sprout | Vendor (Bloom & Garden) |
| Reshma Rajkumar | reshma.rajkumar@gmail.com | demo1234 | 🌱 Sprout | Tester |
| Amel Rahman | amelabrs@gmail.com | demo1234 | 🌱 Sprout | Admin |
