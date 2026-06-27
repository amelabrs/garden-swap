# Garden Swap — Test Strategy (Stage 5: AI Plant Doctor)

---

## AI Instructions (for future sessions)

> You are working on Garden Swap, a hyper-local plant trading PWA for Bangalore gardeners.
> This file contains the cumulative test strategy through Stage 5 (AI Plant Doctor).
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
**Subject:** Garden Swap — Stage 5 (AI Plant Doctor) is ready for testing 🌿

---

Hi Reshma,

Stage 5 of Garden Swap is live — we've added an AI-powered Plant Doctor that
lets Steward-tier users upload a photo of their plant and get an instant diagnosis:
cause, treatment steps, and prevention tips, powered by Claude AI.

**Test URL:** https://garden-swap.onrender.com
*(Note: it's on Render free tier — may take 30–60 seconds to wake up on first load)*

**Your login for Plant Doctor testing:** priya@demo.com / demo1234 (Steward tier)

**Full test plan:** https://garden-swap.onrender.com/test-plan

---

**What's new to test:**

1. **🩺 Doctor tab** — visible in the bottom nav for all users
2. **Upload a plant photo** — tap the upload area, choose a photo from your phone
3. **Get a diagnosis** — tap "Diagnose my plant →" and read the AI response
4. **Access control** — log in as rachel@demo.com (Sprout) and confirm the Doctor tab shows a locked/upgrade screen
5. **Usage counter** — confirm the "X diagnoses remaining this month" count decrements after each use

**Existing features to recheck** (make sure nothing broke):

- Shop tab: browse products, add to cart, checkout
- Swap feed, search, filters
- Swap requests and chat
- Wish list and smart match alerts (Grower tier)

Please note anything that feels off — wrong message, button not working, confusing flow,
AI response that seems wrong or unhelpful. No detail is too small.

Thanks so much!
Amel

---

## Test Cases

### TC-09 — Plant Doctor Access Control
| Step | Action | Expected |
|------|--------|----------|
| 1 | Open 🩺 Doctor tab without logging in | Locked/upgrade screen shown |
| 2 | Log in as rachel@demo.com (Sprout) → Doctor tab | Upgrade prompt with "Upgrade to Steward" button |
| 3 | Log in as faizan@demo.com (Grower) → Doctor tab | Upgrade prompt (Grower is not enough) |
| 4 | Log in as priya@demo.com (Steward) → Doctor tab | Upload UI appears |
| 5 | Direct POST /api/plant-doctor as Rachel (Sprout) | Returns 403 Forbidden |

### TC-10 — Plant Doctor Diagnosis Flow
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as Priya (Steward) → Doctor tab | Upload area and "Diagnose" button shown |
| 2 | Tap upload area | File picker opens; only JPEG/PNG/WebP selectable |
| 3 | Select a clear photo of a plant | Thumbnail preview appears; button becomes active |
| 4 | Tap "Diagnose my plant →" | Button shows "Analysing…", then result appears |
| 5 | Read the diagnosis | Contains headings: Diagnosis, Likely cause, Treatment, Prevention |
| 6 | Check usage counter below result | Shows "N diagnoses remaining this month" |
| 7 | Tap "Diagnose another plant" | Upload area resets, ready for a new photo |

### TC-11 — Plant Doctor Edge Cases
| Step | Action | Expected |
|------|--------|----------|
| 1 | Upload a non-plant photo (e.g. a selfie) | AI politely states the image is not a plant |
| 2 | Upload a healthy, thriving plant | AI confirms the plant looks healthy |
| 3 | Try to submit before selecting an image | "Diagnose" button remains disabled |
| 4 | Upload a photo > 10 MB | Error: "Image too large. Please upload under 10 MB." |
| 5 | Reload the page and revisit Doctor tab | Usage count is still accurate (persisted in DB) |

### TC-12 — Plant Doctor Rate Limit
| Step | Action | Expected |
|------|--------|----------|
| 1 | Use Plant Doctor 10 times in a month | All 10 succeed; counter reaches "0 remaining" |
| 2 | Attempt an 11th diagnosis | Error: "Monthly limit reached (10 diagnoses/month). Resets on the 1st." |
| 3 | Check usage as a different Steward user | Their own counter is independent |

### TC-01 — Product Browse (Stage 4 regression)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Open Shop tab | 12 products load in a grid |
| 2 | Tap "Plants" category | Only plant products shown |
| 3 | Tap "Tools" category | Pruning Shears + Tool Set shown |
| 4 | Type "cocopeat" in search | Cocopeat Block appears |
| 5 | Tap a product card | Detail modal opens with title, price, vendor, description |
| 6 | Sign out, open Shop | Products still visible (no login required to browse) |

### TC-02 — Cart (Stage 4 regression)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Add item without logging in | Sign-in prompt appears |
| 2 | Log in, add 1 product | Cart badge in topbar shows "1" |
| 3 | Add second product from different vendor | Both appear in cart drawer |
| 4 | Tap "+" on an item | Quantity increases, price updates |
| 5 | Tap "−" until qty = 0 | Item is removed from cart |
| 6 | Tap 🗑️ on an item | Item removed, badge updates |
| 7 | Tap "Clear cart" | Confirmation prompt → cart empties |

### TC-03 — Checkout (Stage 4 regression)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Add items to cart | Cart shows correct total |
| 2 | Tap "Checkout →" | Delivery details modal opens |
| 3 | Leave name blank, submit | Validation error shown |
| 4 | Fill in name, phone, address → submit | Success message with order number |
| 5 | Check cart after order | Cart is empty |

### TC-04 — Vendor Registration (Stage 4 regression)
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

### TC-05 — Steward Discount (Stage 4 regression)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as Priya (Steward tier) | Tier badge shows 🌳 Steward |
| 2 | Add items to cart, open cart | "🌳 Steward 10% discount applied!" banner shows |
| 3 | Check total in cart | Total is 10% less than item sum |
| 4 | Proceed to checkout | Checkout total matches discounted amount |

### TC-06 — Admin Panel (Stage 4 regression)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as amelabrs@gmail.com → Profile | "⚙️ Admin — Vendor Approvals" section visible |
| 2 | Log in as any other user → Profile | Admin section is NOT visible |
| 3 | Approve a pending vendor | Status → ✅, vendor can now add products |
| 4 | Reject a vendor | Status → ❌, vendor sees rejection screen |
| 5 | Direct GET /api/admin/vendors without admin token | Returns 403 |

### TC-07 — Regression (core swap features)
| Step | Action | Expected |
|------|--------|----------|
| 1 | Open Swap tab | Plant listings load |
| 2 | Post a new listing | Appears in feed |
| 3 | Request a swap | Chat opens |
| 4 | Add item to wish list (Sprout) | Capped at 5 items |
| 5 | Notification bell | Shows unread count for Grower+ |

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
| Priya Sharma | priya@demo.com | demo1234 | 🌳 Steward | Plant Doctor tester |
| Faizan Ahmed | faizan@demo.com | demo1234 | 🌿 Grower | Regular user |
| Rachel D'Souza | rachel@demo.com | demo1234 | 🌱 Sprout | Regular user |
| Deepak Gowda | deepak@demo.com | demo1234 | 🌱 Sprout | Vendor (Green Roots Nursery) |
| Amina Begum | amina@demo.com | demo1234 | 🌱 Sprout | Vendor (Bloom & Garden) |
| Reshma Rajkumar | reshma.rajkumar@gmail.com | demo1234 | 🌱 Sprout | Tester |
| Amel Rahman | amelabrs@gmail.com | demo1234 | 🌱 Sprout | Admin |
