# The Plant Swap Platform: Business & Development Blueprint

## I. Core Concept & Value Proposition

**Platform:** A localized, community-driven platform for gardening enthusiasts to swap, buy, and learn about plants, cuttings, and seeds.

**Target Market:** Hyper-local gardening hobbyists and small urban growers (initially focusing on a single city/metro area).

**Core Value:** Free, trustworthy, local plant exchange supported by premium tools and a curated marketplace.

---

## II. Monetization Strategy (Freemium Model)

The platform generates revenue by monetizing advanced features, content, and logistics, while keeping the core plant swap free.

| Tier | Name | Monthly Charge | Key Features (Value Drivers) |
| --- | --- | --- | --- |
| **FREE** | **Sprout** | $0.00 | Limited Listings (3), Limited Wish List (5), Basic Search, Ad-supported, Free Community Events. |
| **PREMIUM 1** | **Grower** | **$1.00** | **UNLIMITED** Listings/Wish List, **Smart Match Notifications**, Ad-Free, **Basic Magazine Subscription** (Bundled). |
| **PREMIUM 2** | **Steward** | **$3.00** | All Grower features **PLUS** **AI Plant Doctor**, 10-15% **Courier Discount**, Elite Community Status. |

**Commerce Revenue Streams:**

- **Local Shop:** 10-15% commission on all sales from integrated local nurseries and service providers (LNS).
- **Courier:** 5-10% commission on platform-booked local delivery fees.
- **Advertising:** Sponsored listings/badges for LNS partners and dedicated ad slots within the free tier and magazine.

---

# Feature Specification Document (FSD): The Plant Swap Platform

## 1. Core Platform Management

| Feature | Specification Details | Workflow Summary |
| --- | --- | --- |
| **User Profiles & Onboarding** | Required Fields: Name, Email, Password, **Zip Code (MANDATORY)**, Photo (Optional), Growing Zone. | **W1:** User signs up → System verifies email → User enters Zip Code → Profile is created → System prompts user to post their first listing. |
| **Location Services** | **Primary Filter:** Listings are shown by distance from the user's registered Zip Code (default 10 miles radius, adjustable in settings). | **W2:** User opens app → System displays map/list view filtered by default radius → User adjusts radius/location → System reloads filtered listings. |
| **User Rating System** | Double-blind 1-5 star rating + text comment, tied to specific swap completion. | **W3:** Swap completes → System prevents both users from initiating new swaps → User A rates User B (rating hidden) → User B rates User A (rating hidden) → Both ratings submitted → System updates both public profiles → Restriction lifted. |

---

## 2. Plant Listings & Discovery (Meet for Swap Core)

| Feature | Specification Details | Workflow Summary |
| --- | --- | --- |
| **Plant Listing Creation** | **MANDATORY Fields:** Title, 1+ Photos, Plant Type (Dropdown), Condition (Dropdown), Status ("Swap" or "Free/Giveaway"), Location (Auto-filled from user profile). | **W4:** User clicks "+" → User uploads photos → User selects categories → User sets status → System publishes the listing → Listing status is set to "Available." |
| **Wish List & Matching** | Users can add any plant name to their private Wish List (limited for **Sprout** users). | **W5 (Sprout):** User adds item → System checks against 5-item limit → If over limit, **Soft Paywall** appears (Upgrade to **Grower**). |
| **Smart Match Notifications** | **Grower/Steward Exclusive:** Instant push/email notification when a newly posted listing matches an item on their Wish List AND is within their distance radius. | **W6 (Grower):** New plant posted → System checks against all Grower Wish Lists → If match, system sends "New Match Found" alert (Push/Email). |
| **Advanced Filtering** | **Grower/Steward Exclusive:** Filters for light needs, rarity, size, and **user rating** (e.g., only show plants from 4-star+ swappers). | **W7:** User accesses filter menu → Sprout sees only basic filters (Type, Location) → Grower/Steward sees all advanced filters → System returns narrowed results list. |

---

## 3. Communication & Swap Execution

| Feature | Specification Details | Workflow Summary |
| --- | --- | --- |
| **Direct Swap Request** | User B initiates a swap with User A's listing. Option for User B to offer one of their own plants or just request the plant. | **W8:** User B finds listing → Clicks "Request Swap" → System opens private chat → User B sends initial message → Status changes to "Pending Negotiation" for User A. |
| **In-App Chat (Private)** | Simple messaging interface for 1:1 negotiation (text only). Must include an **"Accept/Decline"** button. | **W9:** Chat initiated → Users negotiate → User A clicks **"Accept Swap"** → Status changes to "Swap Accepted" → System triggers the completion options (Pickup/Courier). |
| **Swap Completion Options** | Two distinct options after "Swap Accepted": **1) Arrange Pickup** or **2) Ship via Platform Courier.** | **W10 (Pickup):** User A confirms "Picked Up" → System prompts User B to confirm "Received." **W10 (Courier):** Triggers the dedicated Courier Workflow (see section 4). |

---

## 4. Local Courier & Shop (Monetization Workflows)

| Feature | Specification Details | Workflow Summary |
| --- | --- | --- |
| **Courier Workflow** | Integrated booking and payment processing. Funds held in **Escrow** until safe delivery is confirmed. | **W11:** Swap Accepted → Receiver selects "Ship Courier" → System displays quote → Receiver pays (includes fees) → Funds held → Delivery confirmed by Receiver → Funds released to Courier and Platform → **Rating Triggered (W3).** |
| **Local Shop Integration** | Display separate product listings from verified LNS partners. Simple cart and checkout system. | **W12 (Shop Purchase):** User browses Shop → Adds product to cart → Checks out → System processes payment → System notifies LNS Partner for fulfillment → **Platform takes commission.** |
| **Subscription Paywall** | User attempts to access a locked feature (e.g., unlimited listings, AI Plant Doctor). | **W13:** User clicks locked feature → System detects Sprout tier → Modal overlay appears comparing **Sprout vs. Grower vs. Steward** features and prices → User selects tier and processes payment via a secure gateway. |

---

## 5. Local Shop & Supplier Integration (The "Shop" Tab)

The Shop feature will be a distinct marketplace section focusing on monetization through commissions and sponsored listings.

### A. Shop User Roles & Onboarding

| Role | Access Level | Onboarding Workflow |
| --- | --- | --- |
| **Swapper (Customer)** | View products, search, add to cart, purchase. | **W14:** Swapper clicks **"Shop" tab** → Browses listings → Adds product → Checkout. |
| **Supplier (Vendor)** | Dedicated **Supplier Dashboard** to upload inventory, manage orders, view sales reports. | **W15:** Supplier applies via web form → Platform approves → System creates a **Vendor Account** → Supplier receives login for the dashboard to list products. |

### B. Shop Features & Specification

| Feature | Specification Details | Impact/Monetization |
| --- | --- | --- |
| **"Shop" Tab Placement** | Must be a **primary navigation tab** at the bottom of the app (next to "Swap," "Profile," etc.). | High visibility for monetization. |
| **Product Listings** | **Required Fields:** Product Name, Price, Stock Level, 1+ Photo, Category (Soil, Pots, Tools, etc.), Supplier (Linked to Vendor Profile). | Populates the revenue stream. |
| **Local Filters** | Customers can filter by **Supplier Proximity** ("Nearest Suppliers") or by **Supplier Type** (e.g., "Nurseries," "Services," "Online Retailers"). | Improves customer experience; supports hyper-local partners. |
| **Order Management** | Basic E-commerce system with **Cart, Checkout, and Order Status** (New Order, Ready for Pickup, Shipped, Delivered). | Necessary for commission tracking and partner accountability. |
| **Supplier Commission** | Payment Gateway (e.g., Stripe Connect) handles transactions. **Platform takes 10-15% commission** automatically before sending the remainder to the supplier. | Primary monetization method. |

---

## 6. Magazine & Article Publishing (The "News" Tab)

This feature must support both free daily articles (content marketing) and premium monthly subscription access (recurring revenue).

### A. Tab Placement & Access

| Feature | Specification Details | Access Control |
| --- | --- | --- |
| **"News" Tab Placement** | Dedicated **primary navigation tab** for all articles and magazine issues. | Single point of access for content. |
| **Content Types** | **Articles:** Free, short-form daily/weekly content. **Magazine Issues:** Long-form, curated monthly publication. | Drives both daily traffic and monthly revenue. |
| **Magazine Reader** | Content must be readable **within the app only** (e.g., a simple HTML viewer or integrated PDF viewer) to prevent sharing outside the subscription gate. | Protects subscription content exclusivity. |

### B. Magazine Subscription Workflows

| Subscription Event | User Action | System Workflow |
| --- | --- | --- |
| **Subscription Purchase** | User clicks "Subscribe to Magazine" or upgrades to **Grower** tier. | **W16:** User processes payment → System updates **User Profile** status to "Magazine Subscriber" (with access expiry date). |
| **Access Control (Paywall)** | User clicks on a premium magazine issue or a locked article. | **W17:** System checks User Profile status: **IF** "Subscriber" → Grant access. **ELSE** → Display Paywall Modal (Compare free vs. paid access) → Prompt for subscription. |
| **Monthly Publication** | (Admin Action): Admin uploads the new monthly magazine issue file. | **W18:** Admin uploads new issue → System sets publication date → System auto-sends a **Push Notification** to all subscribers: *"The December Issue of The Green Post is here!"* |

### C. Magazine Monetization Tie-in

- **Premium Content:** Use the magazine as a key incentive for the **Grower** and **Steward** tiers.
- **Advertising Slots:** Integrate paid, sponsored ad placements **within the digital magazine viewer** to create an additional recurring revenue stream.

---

# Wireframe

## Swap Request Workflow

The goal of this workflow is to create a seamless, non-committal way for a **Requestor** to signal interest and initiate a private negotiation with the **Lister**.

### 1. The Swap Request Workflow (W8)

| Step | User Action (Requestor - User B) | System Action | User Action (Lister - User A) |
| --- | --- | --- | --- |
| **1. Initiation** | User B is on User A's plant listing page and clicks the **"Request Swap"** button. | System checks User B's eligibility (e.g., is User B's profile active, have they completed the tutorial?). | N/A |
| **2. Offer Selection** | User B selects the type of offer (Mandatory step): **A) Offer One of My Plants (Trade)** or **B) Request as Giveaway/Free.** | System routes the selection to the chat thread. | N/A |
| **3. Draft Message** | User B writes an optional initial message (e.g., "Hi, I love your Monstera!"). | System creates a new private, 1:1 chat thread labeled with the plant's name and user names. | N/A |
| **4. Submission** | User B clicks **"Send Request & Start Chat."** | System sends a **Push Notification** and an in-app alert to User A. System sets the Listing Status to **"Negotiation Pending."** | User A receives the notification: *"[User B] is interested in swapping for your [Plant Name]."* |
| **5. Response** | N/A | N/A | User A opens the chat → Can view User B's public profile and rating → Clicks **"View Request"** to see the proposed offer. |
| **6. Negotiation** | Users communicate in the private chat until they mutually agree on the exchange details (plant/cutting, logistics). | N/A | N/A |
| **7. Final Decision** | N/A | N/A | User A clicks either **"Accept Swap"** (Triggers W10) or **"Decline Request"** (Ends thread; Listing status returns to "Available"). |

### 2. Wireframe Elements: Swap Request Screen

*Screen Title: Request a Swap for [Plant Name]*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **Plant Thumbnail** | Image & Text | Small photo and name of the plant being requested. | For confirmation purposes. |
| **User A Rating** | Display Badge | Shows User A's (Lister's) average rating (e.g., 4.8⭐️) and number of completed swaps. | Builds trust for the Requestor. |
| **Swap Option 1 (Trade)** | Button / Radio | **"Offer a Plant for Trade"** | **Action:** Triggers a modal/dropdown allowing User B to select one of their own listed plants to offer in exchange. |
| **Swap Option 2 (Free)** | Button / Radio | **"Request as a Giveaway"** | **Action:** If the Lister's listing status is "Swap" (not "Free"), this button includes a small disclaimer: *"Lister may request a trade."* |
| **Message Field** | Text Input | **"Optional message to the Lister (Max 250 characters)"** | Pre-populates the first chat message. |
| **Call-to-Action** | Primary Button | **"Send Request & Open Chat"** | Submits the request and initiates the private chat thread (Step 4 of the workflow). |
| **Cancel** | Secondary Button | **"Cancel"** | Returns the user to the plant listing page. |

### 3. Wireframe Elements: Lister's Notification & Chat

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **In-App Notification** | Push/Bell Icon | Alert reads: *"[User B] has requested a swap for your [Plant Name]."* | Instant, non-intrusive alert. |
| **Private Chat Screen** | Chat Interface | Displays User B's initial message (from the Message Field). | This is where all negotiation and final acceptance occurs. |
| **Profile Access** | Link/Icon | Link to **User B's Public Profile** (including their rating and wish list). | Allows User A to vet the potential swapper. |
| **Decision Buttons** | Primary/Secondary | **"Accept Swap"** (Green) and **"Decline Request"** (Red). | These must be clearly visible in the chat interface to finalize the transaction. |

---

## Feature Specification: Local Shop & Supplier Integration

### 1. Screen Title: The Gardener's Market (or similar)

#### A. Shop Discovery Workflow (W12)

| Step | User Action (Swapper/Customer) | System Action | Notes |
| --- | --- | --- | --- |
| **1. Access** | User taps the **"Shop" tab** in the main navigation. | System loads the Shop landing page, displaying featured listings and local suppliers. | High-visibility entry point. |
| **2. Filtering** | User selects a filter (e.g., "Nearest Suppliers," "Pots," "Garden Services"). | System filters product/supplier database based on user's location (Zip Code) and the selected category. | Crucial for hyper-local focus. |
| **3. Browsing** | User taps on a specific product or a Supplier's Profile. | System loads the **Product Detail Page** or the **Supplier Profile Page**. | Leads to purchase or service booking. |
| **4. Purchase** | User adds items to the cart and proceeds to checkout. | System processes payment via secured gateway (W12) and notifies the relevant Supplier. | Triggers the commission revenue stream. |

#### B. Wireframe Elements: Main Shop Landing Page

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **Navigation** | Primary Tab Bar | Must highlight **"Shop"** tab. | Bottom of screen for easy access. |
| **Search Bar** | Text Input | **"Search products, suppliers, or services..."** | Essential for high-intent buyers. |
| **Category Filters** | Horizontal Scroll Bar | Pills/Buttons: **Pots, Soil, Tools, Services, Seeds, Fertilizer.** | Allows quick filtering without leaving the top of the screen. |
| **Section 1: Featured Suppliers** | Horizontal Carousel | Displays 3-5 **Sponsored LNS** (Local Nursery & Services) Partners with their logo and a "Verified Partner" badge. | **Monetization Slot:** High-value advertising space. |
| **Section 2: Near Me** | List/Grid View | Displays the **top 10 closest product listings** from any LNS partner near the user's registered Zip Code. | Drives local traffic and purchases. |
| **Section 3: Services Available** | Card View | Highlights available services (e.g., "Need Repotting? Book a Local Expert!") with links to the Service Listings category. | Promotes the Service booking feature. |
| **Section 4: All Suppliers** | Button/Link | **"View All Local Nurseries & Services"** | Leads to a dedicated directory listing all approved LNS partners. |

### 2. Wireframe Elements: Supplier Profile Page

*Screen Title: [Supplier Name] - Verified Local Partner*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **Header** | Image/Logo | Supplier's branding and banner image. | Visual identification. |
| **Supplier Rating** | Display Badge | Average 1-5 star rating and review count specific to the LNS (separate from swap rating). | Establishes commercial trust. |
| **Details** | Text/Map | Address, operating hours, quick link to call/email, embedded **Mini-Map** showing location. | Essential business information. |
| **Description** | Text Block | Supplier's specialty (e.g., "Specializing in Rare Aroids and Organic Fertilizers"). | Vendor's pitch to the customer. |
| **Product Showcase** | Grid View | Displays all current **Product Listings** uploaded by the Supplier (with price and stock level). | Primary purchase mechanism. |
| **Booking/Services** | Button/Link | **"Book a Consultation"** (if applicable) | Leads to the service calendar booking integration. |
| **User Reviews** | List | Dedicated section for user comments and star ratings about the business's service. | Social proof. |

---

## 🪴 Feature Specification: Plant Listing & Discovery

### A. Discovery Feed (The Main App Screen)

| Feature | Specification Details | Workflow |
| --- | --- | --- |
| **"Swap" Tab Placement** | Must be the **default landing screen** after login. | Ensures high engagement with available plants. |
| **Location Filter** | Displays radius (e.g., "10 Miles from [Zip Code]") at the top. Tappable to adjust the radius (5 mi, 10 mi, 25 mi) or change the Zip Code. | **W2:** User opens app → System loads feed filtered by default radius. |
| **Listing Card View** | Each listing is a card showing: **Photo (large), Plant Name, Lister Rating (e.g., 4.5 ⭐️), Distance (e.g., 2 mi), Status (Swap/Free).** | Provides glanceable, trustworthy information. |
| **Filtering/Sorting** | Persistent icon (e.g., funnel icon) to access the filter menu. **Grower/Steward** tiers get access to advanced filters (Rarity, Light Needs, User Rating). | User taps filter icon → System displays filter modal → User applies filters → Feed updates. |
| **CTA for Listing** | Floating Action Button (FAB) or prominent **"+"** icon to start a new listing. | **W4:** User clicks FAB → Starts the Listing Creation Workflow. |

### B. Plant Listing Creation (W4)

| Feature | Specification Details | Workflow |
| --- | --- | --- |
| **Image Upload** | **Mandatory.** Allows for multiple photos (3 minimum recommended). Must include a "Crop/Edit" function. | User taps "+" → System accesses camera/photo library → Photos are uploaded and displayed as thumbnails. |
| **Plant Details** | Text input for **Plant Name** (auto-suggest/complete optional) and **Botanical Name** (optional). | User enters basic identification details. |
| **Condition & Status** | Dropdowns for **Condition** ("Pest-Free/Healthy," "Needs TLC," "Fresh Cutting") and **Status** ("Swap," "Free/Giveaway"). | Crucial for setting expectations and filtering. |
| **Location Confirmation** | Display text: "Listing Location: [User's Registered Zip Code]." Tappable to temporarily adjust location (e.g., for a different city swap). | Ensures accurate local listings. |
| **Description** | Multi-line text area for **Care Needs** and **Swap Preferences** (e.g., "Looking for rare Aroids only," "Will accept any Pothos"). | Facilitates smooth negotiation. |
| **Publish** | Final button to submit the listing. | **W4:** User taps "Publish" → System validates all mandatory fields → Listing goes live. |

### 2. Wireframe Elements: Discovery Feed (The "Swap" Tab)

*Screen Title: Plants Near You*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **1. Header/Location** | Text & Icon | **"Plants within 10 Miles"** (Tappable settings icon next to it). | Top bar for controlling location radius. |
| **2. Search Bar** | Text Input | **"Search Pothos, Monstera, or rare finds..."** | Essential for specific searches. |
| **3. Filter/Sort Icon** | Button (Funnel Icon) | Opens the **Filter Modal** (includes basic and premium advanced filters). | Persistent access to sorting options. |
| **4. Listing Card (Repeating Unit)** | Card View | **Photo** (Large, dominant visual), **Plant Name** (Bold), **Lister Rating** (e.g., 4.9 ⭐️), **Distance** (e.g., 1.5 mi), **Status Tag** (Green for "Swap," Blue for "Free") | The core display unit—optimized for quick scanning. |
| **5. Floating Action Button (FAB)** | Icon Button | Large **"+"** icon in the bottom right corner. | Primary call-to-action for creating a new listing. |
| **6. Main Navigation** | Tab Bar | **Swap, Shop, News, Profile** | Bottom of screen. |

### 3. Wireframe Elements: Plant Listing Creation Screen

*Screen Title: List Your Plant*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **1. Photo Uploader** | Box Area | **"Add Photos (Min 1, Max 5)"** → Tap to open camera/library. | Mandatory field for trust and visibility. |
| **2. Plant Name** | Text Input | Label: Plant Name (e.g., "Pothos") | Required. |
| **3. Plant Type** | Dropdown Select | Options: Houseplant, Succulent, Cutting, Seed, Vegetable, Herb. | Required for filtering. |
| **4. Plant Condition** | Dropdown Select | Options: Healthy/Pest-Free, Needs TLC, Fresh Cutting, Seed Packet. | Required for managing user expectations. |
| **5. Swap Status** | Radio Buttons | **Swap** (default) / **Free/Giveaway** | Sets user intent. |
| **6. Description** | Multi-Line Text | **"Care Info, Rarity, and Swap Preferences"** | Open field for negotiation details. |
| **7. Location Display** | Text Block | **Listing Location: 12345 (Change)** | Confirms location to the Lister. |
| **8. Call-to-Action** | Primary Button | **"Publish Listing"** | Finalizes and submits the listing (disabled until all mandatory fields are filled). |

---

## Feature Specification: Magazine Publishing & Reading

### A. The "News" Tab (Landing Screen)

| Feature | Specification Details | Workflow |
| --- | --- | --- |
| **"News" Tab Placement** | Primary navigation tab. Must load instantly. | Single access point for all content. |
| **Section 1: Free Articles** | Displays the 3 most recent short-form articles (Local Tips, Event Recaps). Tapping an article opens the full, free content. | Drives daily traffic and basic community engagement. |
| **Section 2: Premium Magazine** | Large, prominent card or carousel showcasing the **latest monthly issue** cover and title (e.g., "The Green Post - December Issue"). | Primary call-to-action for subscription. |
| **Access Status** | Clearly displays **"Subscribed"** or **"Upgrade to Read"** over the magazine cover image. | Instantly communicates access status to the user. |

### B. Magazine Reader Workflow (Premium Access)

| Step | User Action (Swapper/Customer) | System Action | Notes |
| --- | --- | --- | --- |
| **1. Access Attempt** | User taps on the latest monthly Magazine Issue. | System checks **User Profile** status (Sprout, Grower, Steward). | Content protection starts here. |
| **2. Paywall Check** | N/A | **IF** status is **Grower/Steward** → Grant access to the reader. **ELSE** → Display Paywall Modal. | This is the crucial monetization gate. |
| **3. Paywall Display** | User views the modal comparing "Free" vs. "Basic Mag" vs. "Grower" tiers. | System displays price comparison and feature list. | **W13/W16:** Prompts the user to purchase a subscription. |
| **4. Reading Experience** | User navigates the issue (swiping pages, reading text). | Content is loaded **In-App Only** via a secured viewer. **No Download/Print options.** | Protects content from being easily shared. |

### C. Admin/Publisher Workflow (Behind the Scenes)

| Step | Admin Action | System Action | Notes |
| --- | --- | --- | --- |
| **1. Content Upload** | Admin accesses the Publishing Dashboard and uploads the final digital file (PDF/HTML package) for the monthly issue. | System tags the content as **"Premium,"** associates it with the current month, and stores it securely. | New issue is prepared. |
| **2. Notification** | Admin clicks **"Publish & Notify Subscribers."** | System sends a **Push Notification** to all active **Grower** and **Steward** members: *"The [Month] Issue is live!"* | Drives immediate traffic to the new content. |

### 2. Wireframe Elements: The "News" Tab (Magazine Landing Page)

*Screen Title: The Green Post*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **1. Featured Issue Card** | Large Card | Displays the **Cover Art, Issue Title, and Date.** | Dominant element for the premium content. |
| **2. Access Indicator** | Badge Overlay | **"SUBSCRIBED"** (Green) or **"PREMIUM - TAP TO UNLOCK"** (Yellow). | Clear status display. Tapping the latter triggers the Paywall Modal. |
| **3. Section Header** | Text | **"Latest Local Articles (Free)"** | Separates free and paid content clearly. |
| **4. Article List (Repeating)** | List View | **Article Title, Short Excerpt, and Photo.** Tapping opens the article reader. | Drives daily engagement. |
| **5. CTA/Ad Slot** | Banner/Card | **"Want to write for The Green Post? Partner with us!"** | Monetization slot targeting potential LNS sponsors. |

### 3. Wireframe Elements: Premium Paywall Modal

*Modal Title: Unlock The Green Post Magazine*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **Value Pitch** | Text Block | **"Access Unlimited Articles, Exclusive Guides, and Expert Interviews."** | Sells the benefits of the subscription. |
| **Tier Comparison** | Table/Card | Compares **Sprout (Free)** features vs. **Grower ($3.99/mo)** features (highlighting the bundled magazine access). | Drives the user to the purchase decision. |
| **Primary CTA** | Button | **"Upgrade to Grower: $3.99/month"** | Direct link to the payment processing screen (W16). |
| **Secondary CTA** | Link | **"Not Now, Thanks"** | Allows the user to close the modal and return to the free content without friction. |

---

## Feature Specification: Event Pre-Booking

### 1. Event Registration & Plant Tagging (Workflow)

| Step | User Action (Premium Member) | System Action |
| --- | --- | --- |
| **1. Discovery** | User navigates to the "Events" section in the **News** or **Community** tab. | System displays upcoming local events. |
| **2. Registration** | User clicks "Register" for a specific event. | System verifies **Grower/Steward** status. If verified, system confirms RSVP. |
| **3. Tagging** | User is prompted: *"Bringing plants to this swap? Tag them now!"* | System pulls up the user's active **Plant Listings**. |
| **4. Selection** | User selects specific plants they are bringing to the physical event. | System adds an **"Event Exclusive"** badge to those listings and links them to that specific event page. |

### 2. The "Pre-Book" System

| Role | Action | Result |
| --- | --- | --- |
| **The Browser** | Views the Event page and clicks **"Plants at this Event."** | Sees a curated gallery of plants tagged for that specific date/location. |
| **The Booker** | Clicks **"Pre-Book"** on a plant. | System "freezes" the listing so no one else can book it. Status changes to **"Pre-booked for [Event Name]."** |
| **The Exchange** | At the event, the Booker shows a **Claim QR Code** to the Owner. | Owner scans code via the app → Swap is marked **"Complete"** → **Rating System** is triggered. |

### Wireframe Elements: Event Details & Plant Gallery

*Screen Title: [City] Monthly Swap Meet*

| UI Element | Type | Content/Functionality | Notes |
| --- | --- | --- | --- |
| **Event Header** | Image/Text | Date, Time, Location (Map Pin), and Event Description. | Basic logistics. |
| **RSVP Button** | Primary Button | **"Register for Event"** | Triggers the tagging workflow for Premium members. |
| **Section Toggle** | Tabs/Buttons | Details \| Attendees \| Plants at this Event | Navigation between event info sections. |
| **Plant Catalog** | Grid View | Shows cards of all plants tagged for this event. Each card has a **"Pre-Book"** button. | **Monetization:** Only Premium members can tag plants; anyone can browse, but Pre-booking can be limited to Premium tiers. |
| **"My Event Pass"** | Floating Button | **"View My Bookings"** | Quick access to the QR codes the user needs to show at the event to claim their plants. |

### Updated Business Blueprint Addition

**Monetization & Engagement Strategy:**

- **Exclusivity:** Only **Grower** and **Steward** members can "List/Tag" plants for events. This encourages users to upgrade so they can "guarantee" their plants find a home before they even arrive at the meetup.
- **Service Fee:** A small "Event Handling Fee" ($0.50–$1.00) for successful pre-bookings to cover the cost of the QR system and event organization.
- **Safety:** Since the swap happens in person, the "Courier" workflow is bypassed, but the **Rating System** remains mandatory to ensure people actually bring the plants they promised.

---

## 📲 Feature Specification: QR Code Claim Workflow

### 1. The Hand-off Process (At the Event)

| Step | User Action (The Giver) | User Action (The Receiver) | System Action |
| --- | --- | --- | --- |
| **1. Identity** | Opens App → "My Events" → **"My Event Pass."** | Opens App → "My Events" → **"My Bookings."** | N/A |
| **2. Verification** | Selects the specific plant being handed over. | Selects the plant they are claiming. | N/A |
| **3. The Scan** | Clicks **"Scan to Give."** (Opens Camera). | Clicks **"Show Claim Code."** (Displays QR). | System generates a unique, single-use encrypted QR code. |
| **4. Confirmation** | Scans the Receiver's phone screen. | Holds phone for scanning. | System matches the IDs → Validates the Pre-booking. |
| **5. Completion** | Receives "Success" message. | Receives "Plant Claimed" message. | **Status:** Changes to "Swapped." **Rating:** Push notification sent to both to "Rate Now." |

### 2. Wireframe Elements: The "Event Pass" & Scanner

**Screen A: Receiver's "Claim Code"**

| UI Element | Type | Functionality |
| --- | --- | --- |
| **Plant Header** | Thumbnail | Shows photo/name of the plant being claimed. |
| **QR Code** | Dynamic Image | The "Claim Key" (regenerates every 60 seconds for security). |
| **Safety Text** | Warning | *"Only show this code when you have the plant in your hands."* |

**Screen B: Giver's "Scanner"**

| UI Element | Type | Functionality |
| --- | --- | --- |
| **Camera View** | Live Feed | Standard QR scanning frame. |
| **Flash Toggle** | Icon | For scanning in low-light event venues (e.g., inside a cafe). |
| **Manual Entry** | Link | *"Code not scanning? Enter 6-digit backup code."* |

---

## Finalizing Your Full Blueprint

You now have a complete, end-to-end specification for a **high-trust, monetized, community-driven plant swap ecosystem**.

### Summary of Your Unique Business Moat

- **Trust:** Mandatory double-blind ratings and QR-verified hand-offs.
- **Convenience:** Hyper-local search + Integrated Courier + Event Pre-booking.
- **Community:** Monthly in-person events and a dedicated expert magazine.
- **Monetization:** 3-tier subscriptions, Shop commissions, Courier fees, and Magazine ads.
