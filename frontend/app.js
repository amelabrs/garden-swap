/**
 * Garden Swap — Frontend App (Stage 3: The Tiers)
 */

// ── State ──────────────────────────────────────────────────────────────

let token = localStorage.getItem('gs_token');
let currentUser = JSON.parse(localStorage.getItem('gs_user') || 'null');
let userLat = 0;
let userLng = 0;
let listings = [];
let currentDetailListing = null;
let currentSwapId = null;
let selectedRating = 0;
let authMode = 'login';
let paywallFeature = '';  // reason shown in paywall modal
let advancedFiltersVisible = false;

// ── Shop State ─────────────────────────────────────────────────────────
let shopCategory = '';
let shopProducts = [];
let currentProduct = null;
let cartData = { items: [], total: 0, count: 0 };

const API = '';

// Tier helpers
const TIER_ORDER = { sprout: 0, grower: 1, steward: 2 };
function hasAccess(requiredTier) {
    const userTier = currentUser?.tier || 'sprout';
    return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}
function isSprout() { return !currentUser || currentUser.tier === 'sprout'; }

// ── Init ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    requestLocation();
    setupEventListeners();
    loadFeed();
    checkUrlParams();
    registerServiceWorker();
    if (token) registerPushIfSupported();
});

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed')) {
        const tier = params.get('subscribed');
        alert(`🎉 Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Your subscription is active.`);
        if (token) refreshMe();
        window.history.replaceState({}, '', '/');
    }
    if (params.get('cancelled')) {
        window.history.replaceState({}, '', '/');
    }
    if (params.get('shop_success')) {
        alert('🎉 Order placed successfully! Check your orders in the Shop tab.');
        cartData = { items: [], total: 0, count: 0 };
        updateCartBadge(0);
        window.history.replaceState({}, '', '/');
        switchView('shop');
    }
    if (params.get('shop_cancelled')) {
        window.history.replaceState({}, '', '/');
    }
}

async function refreshMe() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/api/me`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
            const data = await res.json();
            currentUser = { ...currentUser, tier: data.tier, unread_notifications: data.unread_notifications };
            localStorage.setItem('gs_user', JSON.stringify(currentUser));
            updateAuthUI();
        }
    } catch (err) {}
}

function setupEventListeners() {
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    document.getElementById('auth-form').addEventListener('submit', handleAuth);
    document.getElementById('listing-form').addEventListener('submit', handleNewListing);

    document.getElementById('listing-image').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('listing-image-preview').innerHTML =
                    `<img src="${ev.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal.id);
        });
    });

    document.getElementById('swap-request-form').addEventListener('submit', handleSwapRequest);
    document.getElementById('chat-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    document.getElementById('rating-form').addEventListener('submit', handleRating);
    document.getElementById('location-btn').addEventListener('click', requestLocation);
}

// ── Location ───────────────────────────────────────────────────────────

function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLat = pos.coords.latitude;
                userLng = pos.coords.longitude;
                document.getElementById('location-status').textContent =
                    `📍 Plants within ${document.getElementById('filter-radius').value} miles`;
                loadFeed();
            },
            () => {
                document.getElementById('location-status').textContent = '📍 Showing all plants';
                loadFeed();
            }
        );
    } else {
        document.getElementById('location-status').textContent = '📍 Showing all plants';
    }
}

// ── Feed ───────────────────────────────────────────────────────────────

async function loadFeed() {
    const radius = document.getElementById('filter-radius').value;
    const plantType = document.getElementById('filter-type').value;
    const status = document.getElementById('filter-status').value;
    const q = document.getElementById('search-input').value.trim();

    let url = `${API}/api/listings?radius=${radius}`;
    if (userLat) url += `&lat=${userLat}&lng=${userLng}`;
    if (plantType) url += `&plant_type=${encodeURIComponent(plantType)}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;

    // Advanced filters (Grower+ only)
    if (!isSprout() && advancedFiltersVisible) {
        const lightNeeds = document.getElementById('filter-light-needs').value;
        const rarity = document.getElementById('filter-rarity').value;
        const size = document.getElementById('filter-size').value;
        const minRating = document.getElementById('filter-min-rating').value;
        if (lightNeeds) url += `&light_needs=${encodeURIComponent(lightNeeds)}`;
        if (rarity) url += `&rarity=${encodeURIComponent(rarity)}`;
        if (size) url += `&size=${encodeURIComponent(size)}`;
        if (minRating && minRating !== '0') url += `&min_rating=${minRating}`;
    }

    try {
        const res = await fetch(url);
        listings = await res.json();
        renderFeed();
    } catch (err) {
        console.error('Failed to load feed:', err);
    }
}

function renderFeed() {
    const grid = document.getElementById('plant-grid');
    const empty = document.getElementById('empty-state');
    const count = document.getElementById('listing-count');

    if (listings.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        count.textContent = '';
        return;
    }

    empty.classList.add('hidden');
    count.textContent = `${listings.length} plant${listings.length !== 1 ? 's' : ''}`;

    const showAds = isSprout();
    let html = '';

    listings.forEach((l, index) => {
        // Inject ad banner every 4 cards for Sprout users
        if (showAds && index > 0 && index % 4 === 0) {
            html += renderAdBanner();
        }
        html += renderPlantCard(l);
    });

    grid.innerHTML = html;
}

function renderPlantCard(l) {
    const rarityBadge = l.rarity ? `<span class="badge badge-rarity">${escapeHtml(l.rarity)}</span>` : '';
    return `
        <div class="plant-card" onclick="openDetail(${l.id})">
            <img src="${l.image_url}" alt="${escapeHtml(l.title)}" loading="lazy">
            <div class="plant-card-info">
                <div class="plant-card-title">${escapeHtml(l.title)}</div>
                <div class="plant-card-meta">
                    <span class="badge ${l.status === 'swap' ? 'badge-swap' : 'badge-free'}">
                        ${l.status === 'swap' ? '🔄 Swap' : '🎁 Free'}
                    </span>
                    <span class="badge badge-type">${escapeHtml(l.plant_type)}</span>
                    ${rarityBadge}
                </div>
                <div class="plant-card-footer">
                    <span class="plant-card-distance">
                        ${l.distance_miles != null ? l.distance_miles + ' mi' : ''}
                    </span>
                    <span>${escapeHtml(l.display_name)}</span>
                    <span class="plant-card-rating">
                        ${l.user_rating ? l.user_rating + ' ⭐' : ''}
                    </span>
                </div>
            </div>
        </div>
    `;
}

function renderAdBanner() {
    return `
        <div class="ad-banner" onclick="openPaywall('ad_free')">
            <div class="ad-label">🌻 Sponsored</div>
            <div class="ad-body">
                <strong>Go ad-free with Grower</strong>
                <span>Upgrade for ₹99/mo and never see ads again</span>
            </div>
            <button class="ad-upgrade-btn">Upgrade →</button>
        </div>
    `;
}

// ── Advanced Filters ───────────────────────────────────────────────────

function toggleAdvancedFilters() {
    advancedFiltersVisible = !advancedFiltersVisible;
    const bar = document.getElementById('advanced-filter-bar');
    const locked = document.getElementById('advanced-filter-locked');
    const controls = document.getElementById('advanced-filter-controls');
    const label = document.getElementById('advanced-filter-label');

    bar.classList.toggle('hidden', !advancedFiltersVisible);

    if (advancedFiltersVisible) {
        label.textContent = '⚙️ Less';
        if (isSprout()) {
            locked.classList.remove('hidden');
            controls.classList.add('hidden');
        } else {
            locked.classList.add('hidden');
            controls.classList.remove('hidden');
        }
    } else {
        label.textContent = '⚙️ More';
    }
}

// ── Filters ────────────────────────────────────────────────────────────

function applyFilters() {
    const radius = document.getElementById('filter-radius').value;
    document.getElementById('location-status').textContent =
        userLat ? `📍 Plants within ${radius} miles` : '📍 Showing all plants';
    loadFeed();
}

function clearFilters() {
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-radius').value = '10';
    document.getElementById('search-input').value = '';
    if (!isSprout()) {
        document.getElementById('filter-light-needs').value = '';
        document.getElementById('filter-rarity').value = '';
        document.getElementById('filter-size').value = '';
        document.getElementById('filter-min-rating').value = '0';
    }
    applyFilters();
}

// ── Detail Modal ───────────────────────────────────────────────────────

async function openDetail(id) {
    try {
        const res = await fetch(`${API}/api/listings/${id}`);
        const listing = await res.json();
        currentDetailListing = listing;

        document.getElementById('detail-image').src = listing.image_url;
        document.getElementById('detail-title').textContent = listing.title;
        document.getElementById('detail-desc').textContent = listing.description || 'No description provided.';

        const statusBadge = document.getElementById('detail-status-badge');
        statusBadge.textContent = listing.status === 'swap' ? '🔄 Swap' : '🎁 Free';
        statusBadge.className = `badge ${listing.status === 'swap' ? 'badge-swap' : 'badge-free'}`;

        document.getElementById('detail-type-badge').textContent = listing.plant_type;
        document.getElementById('detail-condition-badge').textContent = listing.condition;

        const rarityBadge = document.getElementById('detail-rarity-badge');
        if (listing.rarity) {
            rarityBadge.textContent = listing.rarity;
            rarityBadge.classList.remove('hidden');
        } else {
            rarityBadge.classList.add('hidden');
        }

        // Optional attribute line
        const attrs = [];
        if (listing.light_needs) attrs.push(`☀️ ${listing.light_needs}`);
        if (listing.size) attrs.push(`📏 ${listing.size}`);
        document.getElementById('detail-attrs').textContent = attrs.join('  ·  ');

        document.getElementById('detail-meta').textContent =
            `Listed by ${listing.display_name}${listing.user_rating ? ' • ' + listing.user_rating + ' ⭐' : ''}`;

        if (userLat && listing.lat) {
            const dist = haversine(userLat, userLng, listing.lat, listing.lng);
            document.getElementById('detail-distance').textContent = `📍 ${dist.toFixed(1)} miles away`;
        } else {
            document.getElementById('detail-distance').textContent = '';
        }

        const actions = document.getElementById('detail-actions');
        const swapBtnArea = document.getElementById('detail-swap-btn-area');
        if (currentUser && listing.user_id === currentUser.user_id) {
            actions.classList.remove('hidden');
            swapBtnArea.classList.add('hidden');
        } else {
            actions.classList.add('hidden');
            if (currentUser && listing.swap_status === 'available') {
                swapBtnArea.classList.remove('hidden');
            } else {
                swapBtnArea.classList.add('hidden');
            }
        }

        openModal('detail-modal');
    } catch (err) {
        console.error('Failed to load listing detail:', err);
    }
}

async function deleteListing() {
    if (!currentDetailListing || !confirm('Delete this listing?')) return;

    try {
        const res = await fetch(`${API}/api/listings/${currentDetailListing.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            closeModal('detail-modal');
            loadFeed();
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to delete');
        }
    } catch (err) {
        alert('Failed to delete listing');
    }
}

// ── Auth ───────────────────────────────────────────────────────────────

function updateAuthUI() {
    const btn = document.getElementById('auth-btn');
    const fab = document.getElementById('fab');
    const notifBtn = document.getElementById('notif-btn');
    const cartBtn = document.getElementById('cart-btn');

    if (token && currentUser) {
        btn.textContent = 'Sign Out';
        btn.onclick = signOut;
        fab.classList.remove('hidden');
        cartBtn.classList.remove('hidden');

        // Notification bell for Grower/Steward
        if (!isSprout()) {
            notifBtn.classList.remove('hidden');
            const unread = currentUser.unread_notifications || 0;
            const badge = document.getElementById('notif-badge');
            if (unread > 0) {
                badge.textContent = unread > 9 ? '9+' : unread;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        } else {
            notifBtn.classList.add('hidden');
        }

        // Load cart count silently
        loadCartCount();
    } else {
        btn.textContent = 'Sign In';
        btn.onclick = () => openModal('auth-modal');
        fab.classList.add('hidden');
        notifBtn.classList.add('hidden');
        cartBtn.classList.add('hidden');
    }
}

function toggleAuthMode(e) {
    e.preventDefault();
    authMode = authMode === 'login' ? 'signup' : 'login';
    const title = document.getElementById('auth-title');
    const fields = document.getElementById('signup-fields');
    const submit = document.getElementById('auth-submit');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleLink = document.getElementById('auth-toggle-link');

    if (authMode === 'signup') {
        title.textContent = 'Sign Up';
        fields.classList.remove('hidden');
        submit.textContent = 'Sign Up';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign In';
    } else {
        title.textContent = 'Sign In';
        fields.classList.add('hidden');
        submit.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = 'Sign Up';
    }
}

async function handleAuth(e) {
    e.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (authMode === 'signup') {
        const username = document.getElementById('auth-username').value;
        const displayName = document.getElementById('auth-displayname').value;
        const zipCode = document.getElementById('auth-zipcode').value;

        if (!zipCode) { alert('Zip Code is required'); return; }

        try {
            const res = await fetch(`${API}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username, display_name: displayName, zip_code: zipCode })
            });
            const data = await res.json();
            if (!res.ok) { alert(data.detail || 'Signup failed'); return; }

            token = data.token;
            currentUser = { user_id: data.user_id, username: data.username,
                            display_name: data.display_name, tier: data.tier || 'sprout' };
            localStorage.setItem('gs_token', token);
            localStorage.setItem('gs_user', JSON.stringify(currentUser));
            updateAuthUI();
            closeModal('auth-modal');
            loadFeed();
        } catch (err) {
            alert('Signup failed');
        }
    } else {
        try {
            const res = await fetch(`${API}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) { alert(data.detail || 'Login failed'); return; }

            token = data.token;
            currentUser = { user_id: data.user_id, username: data.username,
                            display_name: data.display_name, tier: data.tier || 'sprout' };
            localStorage.setItem('gs_token', token);
            localStorage.setItem('gs_user', JSON.stringify(currentUser));

            // Fetch full /api/me to get unread_notifications etc.
            await refreshMe();

            updateAuthUI();
            closeModal('auth-modal');
            registerPushIfSupported();
            loadFeed();
        } catch (err) {
            alert('Login failed');
        }
    }
}

function signOut() {
    token = null;
    currentUser = null;
    localStorage.removeItem('gs_token');
    localStorage.removeItem('gs_user');
    updateAuthUI();
    switchView('feed');
}

// ── New Listing ────────────────────────────────────────────────────────

function openNewListing() {
    if (!token) { openModal('auth-modal'); return; }
    document.getElementById('listing-location-hint').textContent = `📍 Location: Your registered zip code`;
    document.getElementById('listing-form').reset();
    document.getElementById('listing-image-preview').innerHTML = '';
    openModal('new-listing-modal');
}

async function handleNewListing(e) {
    e.preventDefault();

    const title = document.getElementById('listing-title').value;
    const plantType = document.getElementById('listing-type').value;
    const condition = document.getElementById('listing-condition').value;
    const status = document.querySelector('input[name="listing-status"]:checked').value;
    const description = document.getElementById('listing-description').value;
    const lightNeeds = document.getElementById('listing-light').value;
    const rarity = document.getElementById('listing-rarity').value;
    const size = document.getElementById('listing-size').value;
    const imageFile = document.getElementById('listing-image').files[0];

    if (!imageFile) { alert('Please select a photo'); return; }
    if (!plantType) { alert('Please select a plant type'); return; }
    if (!condition) { alert('Please select a condition'); return; }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('plant_type', plantType);
    formData.append('condition', condition);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('light_needs', lightNeeds);
    formData.append('rarity', rarity);
    formData.append('size', size);
    formData.append('image', imageFile);

    try {
        const res = await fetch(`${API}/api/listings`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();
        if (res.status === 401) { signOut(); openModal('auth-modal'); return; }
        if (res.status === 403 && data.detail && data.detail.startsWith('SPROUT_LIMIT')) {
            closeModal('new-listing-modal');
            openPaywall('listing_limit');
            return;
        }
        if (!res.ok) { alert(data.detail || 'Failed to create listing'); return; }

        closeModal('new-listing-modal');
        // Refresh user data to update listing count
        await refreshMe();
        loadFeed();
    } catch (err) {
        alert('Failed to create listing');
    }
}

// ── Profile ────────────────────────────────────────────────────────────

async function loadProfile() {
    if (!currentUser) return;

    try {
        const [profileRes, wishRes, adminRes] = await Promise.all([
            fetch(`${API}/api/profile/${currentUser.username}`),
            token ? fetch(`${API}/api/wish-list`, { headers: { 'Authorization': `Bearer ${token}` } }) : Promise.resolve(null),
            token ? fetch(`${API}/api/admin/vendors`, { headers: { 'Authorization': `Bearer ${token}` } }) : Promise.resolve(null),
        ]);

        const profile = await profileRes.json();
        const wishList = wishRes && wishRes.ok ? await wishRes.json() : [];
        const adminVendors = adminRes && adminRes.ok ? await adminRes.json() : null;

        const tier = profile.tier || 'sprout';
        const tierLabel = { sprout: '🌱 Sprout', grower: '🌿 Grower', steward: '🌳 Steward' }[tier] || '🌱 Sprout';
        const tierClass = `tier-badge-${tier}`;

        const content = document.getElementById('profile-content');
        content.innerHTML = `
            <div class="profile-header">
                <h2>${escapeHtml(profile.display_name)}</h2>
                <p class="profile-meta">
                    @${escapeHtml(profile.username)} • 📍 ${escapeHtml(profile.zip_code)}
                    ${profile.rating ? ' • ' + profile.rating + ' ⭐ (' + profile.rating_count + ' ratings)' : ''}
                </p>
                <p class="profile-meta">Member since ${new Date(profile.member_since).toLocaleDateString()}</p>
                <div class="profile-tier-row">
                    <span class="tier-badge ${tierClass}">${tierLabel}</span>
                    ${tier === 'sprout' ? `<button class="btn-upgrade-inline" onclick="openPaywall('upgrade')">Upgrade Plan</button>` : `<button class="btn-outline-small" onclick="confirmCancelSubscription()">Manage Plan</button>`}
                </div>
            </div>

            <!-- Wish List -->
            <div class="profile-section">
                <div class="section-header">
                    <h3>🎯 Wish List <span class="section-count">${wishList.length}${tier === 'sprout' ? '/5' : ''}</span></h3>
                    <button class="btn-text" onclick="openAddWishItem()">+ Add</button>
                </div>
                ${wishList.length === 0
                    ? '<p class="empty-inline">No items yet. Add plants you\'re looking for to get smart match alerts (Grower+).</p>'
                    : `<div class="wish-list">
                        ${wishList.map(w => `
                            <div class="wish-item">
                                <span>🌿 ${escapeHtml(w.plant_name)}</span>
                                <button class="wish-delete-btn" onclick="deleteWishItem(${w.id})">✕</button>
                            </div>
                        `).join('')}
                       </div>`
                }
                <div id="add-wish-form" class="add-wish-form hidden">
                    <input type="text" id="wish-input" placeholder="e.g. Monstera, Pothos..." maxlength="100">
                    <button class="btn btn-primary btn-sm" onclick="addWishItem()">Add</button>
                    <button class="btn btn-sm" onclick="closeAddWish()">Cancel</button>
                </div>
            </div>

            <!-- Listings -->
            <div class="profile-section">
                <h3 style="margin-bottom:12px;">Your Listings (${profile.listings.length})</h3>
                <div class="profile-listings">
                    ${profile.listings.map(l => `
                        <div class="plant-card" onclick="openDetail(${l.id})">
                            <img src="${l.image_url}" alt="${escapeHtml(l.title)}" loading="lazy">
                            <div class="plant-card-info">
                                <div class="plant-card-title">${escapeHtml(l.title)}</div>
                                <div class="plant-card-meta">
                                    <span class="badge ${l.status === 'swap' ? 'badge-swap' : 'badge-free'}">
                                        ${l.status === 'swap' ? '🔄 Swap' : '🎁 Free'}
                                    </span>
                                    <span class="badge badge-type">${escapeHtml(l.plant_type)}</span>
                                    ${!l.is_active ? '<span class="badge badge-condition">Inactive</span>' : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${adminVendors ? renderAdminPanel(adminVendors) : ''}

            <!-- Push Notifications -->
            <div class="profile-section">
                <h3 style="margin-bottom:8px;">🔔 Push Notifications</h3>
                <p style="font-size:0.83rem;color:#666;margin-bottom:10px;">Get notified for swap requests, accepted swaps, and plant matches — even when the app is closed.</p>
                <button class="btn btn-outline-small" onclick="enablePushNotifications()">Enable Notifications</button>
            </div>
        `;
    } catch (err) {
        document.getElementById('profile-content').innerHTML = '<p style="padding:20px">Failed to load profile.</p>';
    }
}

// ── Wish List ──────────────────────────────────────────────────────────

function openAddWishItem() {
    document.getElementById('add-wish-form').classList.remove('hidden');
    document.getElementById('wish-input').focus();
}

function closeAddWish() {
    document.getElementById('add-wish-form').classList.add('hidden');
    document.getElementById('wish-input').value = '';
}

async function addWishItem() {
    const name = document.getElementById('wish-input').value.trim();
    if (!name) { alert('Please enter a plant name'); return; }

    try {
        const res = await fetch(`${API}/api/wish-list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ plant_name: name })
        });
        const data = await res.json();
        if (res.status === 403 && data.detail && data.detail.startsWith('SPROUT_LIMIT')) {
            closeAddWish();
            openPaywall('wishlist_limit');
            return;
        }
        if (!res.ok) { alert(data.detail || 'Failed to add item'); return; }
        loadProfile();
    } catch (err) {
        alert('Failed to add item');
    }
}

async function deleteWishItem(itemId) {
    try {
        const res = await fetch(`${API}/api/wish-list/${itemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { loadProfile(); }
        else { const d = await res.json(); alert(d.detail || 'Failed to remove'); }
    } catch (err) {
        alert('Failed to remove item');
    }
}

// ── Notifications View ─────────────────────────────────────────────────

async function loadNotifications() {
    const list = document.getElementById('notifications-list');
    const empty = document.getElementById('notifications-empty');
    list.innerHTML = '<p style="text-align:center;padding:20px;">Loading…</p>';

    try {
        const res = await fetch(`${API}/api/notifications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const notifs = await res.json();

        if (notifs.length === 0) {
            list.innerHTML = '';
            empty.classList.remove('hidden');
            return;
        }

        empty.classList.add('hidden');
        list.innerHTML = notifs.map(n => `
            <div class="notif-card ${n.is_read ? '' : 'notif-unread'}">
                <div class="notif-main" onclick="openNotif(${n.id}, ${n.listing_id})">
                    <div class="notif-body">${escapeHtml(n.body)}</div>
                    <div class="notif-time">${new Date(n.created_at).toLocaleDateString()}</div>
                </div>
                <button class="notif-delete-btn" onclick="deleteNotification(${n.id})" title="Delete">✕</button>
            </div>
        `).join('');

        // Update badge in header
        const unread = notifs.filter(n => !n.is_read).length;
        currentUser.unread_notifications = unread;
        localStorage.setItem('gs_user', JSON.stringify(currentUser));
        updateAuthUI();
    } catch (err) {
        list.innerHTML = '<p style="padding:20px;color:red;">Failed to load notifications.</p>';
    }
}

async function openNotif(notifId, listingId) {
    // Mark as read
    try {
        await fetch(`${API}/api/notifications/${notifId}/read`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
    } catch (err) {}

    // Open the listing if there is one
    if (listingId) {
        openDetail(listingId);
        switchView('feed');
    }
}

async function deleteNotification(notifId) {
    try {
        await fetch(`${API}/api/notifications/${notifId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadNotifications();
    } catch (err) {}
}

async function clearAllNotifications() {
    if (!confirm('Clear all notifications?')) return;
    try {
        await fetch(`${API}/api/notifications`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadNotifications();
    } catch (err) {}
}

// ── Paywall ────────────────────────────────────────────────────────────

const PAYWALL_REASONS = {
    listing_limit:    'You\'ve reached the 3-listing limit for Sprout accounts.',
    wishlist_limit:   'You\'ve reached the 5-item wish list limit for Sprout accounts.',
    advanced_filters: 'Advanced filters (rarity, light needs, rating) are a Grower feature.',
    ad_free:          'Upgrade to Grower for an ad-free plant browsing experience.',
    smart_match:      'Smart match alerts notify you when a wished-for plant is listed nearby.',
    upgrade:          'Unlock more features with a Garden Swap premium plan.',
};

function openPaywall(feature) {
    paywallFeature = feature;
    const reason = PAYWALL_REASONS[feature] || '';
    document.getElementById('paywall-reason').textContent = reason;

    // Update Sprout "Current Plan" button state based on whether user is logged in
    const sproutBtn = document.querySelector('.tier-sprout .btn');
    if (sproutBtn) {
        sproutBtn.disabled = true;
        sproutBtn.textContent = currentUser ? 'Current Plan' : 'Free Tier';
    }

    openModal('paywall-modal');
}

async function startSubscription(tier) {
    if (!token) {
        closeModal('paywall-modal');
        openModal('auth-modal');
        return;
    }

    try {
        const res = await fetch(`${API}/api/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ tier })
        });
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 501) {
                alert('Stripe payments are not yet configured. Check back soon!');
            } else {
                alert(data.detail || 'Failed to start subscription');
            }
            return;
        }
        // Redirect to Stripe Checkout
        window.location.href = data.checkout_url;
    } catch (err) {
        alert('Failed to start subscription. Please try again.');
    }
}

async function confirmCancelSubscription() {
    if (!confirm('Cancel your subscription? You\'ll keep your tier until the end of the billing period.')) return;

    try {
        const res = await fetch(`${API}/api/cancel-subscription`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message || 'Subscription cancelled.');
        } else {
            alert(data.detail || 'Could not cancel subscription.');
        }
    } catch (err) {
        alert('Failed to cancel subscription.');
    }
}

// ── Navigation ─────────────────────────────────────────────────────────

function switchView(view) {
    const views = ['feed', 'shop', 'doctor', 'profile', 'chats', 'notifications', 'events', 'event-detail'];
    views.forEach(v => {
        const el = document.getElementById(`${v}-view`);
        if (el) el.classList.toggle('hidden', v !== view);
    });

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (view === 'shop') {
        loadShop();
    } else if (view === 'doctor') {
        loadDoctorView();
    } else if (view === 'profile') {
        if (!currentUser) { openModal('auth-modal'); switchView('feed'); return; }
        loadProfile();
    } else if (view === 'chats') {
        if (!currentUser) { openModal('auth-modal'); switchView('feed'); return; }
        loadChats();
    } else if (view === 'notifications') {
        if (!currentUser) { openModal('auth-modal'); switchView('feed'); return; }
        if (isSprout()) { openPaywall('smart_match'); switchView('feed'); return; }
        loadNotifications();
    } else if (view === 'events') {
        if (!currentUser) { openModal('auth-modal'); switchView('feed'); return; }
        loadEvents();
    }
}

// ── Modals ─────────────────────────────────────────────────────────────

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ── Swap Request ───────────────────────────────────────────────────────

async function openSwapRequest() {
    if (!currentUser || !currentDetailListing) return;

    try {
        const res = await fetch(`${API}/api/profile/${currentUser.username}`);
        const profile = await res.json();
        const select = document.getElementById('swap-offer-listing');
        select.innerHTML = '<option value="">Select a plant to offer…</option>' +
            profile.listings
                .filter(l => l.is_active && l.id !== currentDetailListing.id)
                .map(l => `<option value="${l.id}">${escapeHtml(l.title)}</option>`)
                .join('');
    } catch (err) {
        console.error('Failed to load user listings:', err);
    }

    document.getElementById('swap-request-plant').innerHTML =
        `<strong>${escapeHtml(currentDetailListing.title)}</strong> — ${escapeHtml(currentDetailListing.display_name)}`;
    document.getElementById('swap-request-message').value = '';
    document.querySelector('input[name="swap-offer-type"][value="trade"]').checked = true;
    toggleOfferSelect();
    closeModal('detail-modal');
    openModal('swap-request-modal');
}

function toggleOfferSelect() {
    const offerType = document.querySelector('input[name="swap-offer-type"]:checked').value;
    document.getElementById('offer-select-group').classList.toggle('hidden', offerType !== 'trade');
}

async function handleSwapRequest(e) {
    e.preventDefault();

    const swapType = document.querySelector('input[name="swap-offer-type"]:checked').value;
    const offeredListingId = document.getElementById('swap-offer-listing').value;
    const message = document.getElementById('swap-request-message').value.trim();

    if (swapType === 'trade' && !offeredListingId) {
        alert('Please select a plant to offer');
        return;
    }

    const body = { listing_id: currentDetailListing.id, swap_type: swapType, message: message || undefined };
    if (swapType === 'trade' && offeredListingId) body.offered_listing_id = parseInt(offeredListingId);

    try {
        const res = await fetch(`${API}/api/swaps`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) { alert(data.detail || 'Failed to send swap request'); return; }

        closeModal('swap-request-modal');
        switchView('chats');
    } catch (err) {
        alert('Failed to send swap request');
    }
}

// ── Chats / Swaps List ─────────────────────────────────────────────────

async function loadChats() {
    const container = document.getElementById('chats-list');
    container.innerHTML = '<p style="text-align:center;padding:20px;">Loading…</p>';

    try {
        const res = await fetch(`${API}/api/swaps`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.status === 401) { signOut(); openModal('auth-modal'); return; }
        const swaps = await res.json();

        if (swaps.length === 0) {
            container.innerHTML = '<p style="text-align:center;padding:40px;color:var(--text-muted);">No swap conversations yet. Request a swap from a plant listing!</p>';
            return;
        }

        container.innerHTML = swaps.map(s => {
            const otherName = s.lister_id === currentUser.user_id ? s.requester_name : s.lister_name;
            const stateLabel = s.state.charAt(0).toUpperCase() + s.state.slice(1);
            const lastMsg = s.last_message ? s.last_message.body : '';
            return `
                <div class="chat-card" onclick="openChat(${s.id})">
                    <div class="chat-content">
                        <div class="chat-card-header">
                            <strong>${escapeHtml(s.listing_title)}</strong>
                            <span class="badge badge-state-${s.state}">${stateLabel}</span>
                        </div>
                        <div class="chat-card-meta">
                            with ${escapeHtml(otherName)} • ${s.swap_type === 'trade' ? '🔄 Swap' : '🎁 Free'}
                        </div>
                        ${lastMsg ? `<div class="chat-card-preview">${escapeHtml(lastMsg)}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = '<p style="text-align:center;color:red;">Failed to load conversations.</p>';
    }
}

// ── Chat Modal ─────────────────────────────────────────────────────────

async function openChat(swapId) {
    currentSwapId = swapId;

    try {
        const res = await fetch(`${API}/api/swaps/${swapId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const swap = await res.json();

        const otherName = swap.lister_id === currentUser.user_id ? swap.requester_name : swap.lister_name;
        document.getElementById('chat-header').innerHTML =
            `<strong>${escapeHtml(swap.listing_title)}</strong>
             <span style="font-size:0.85rem;color:#666;"> with ${escapeHtml(otherName)} • ${swap.swap_type === 'trade' ? '🔄 Swap' : '🎁 Free'} • ${swap.state}</span>`;

        const messagesEl = document.getElementById('chat-messages');
        if (swap.messages && swap.messages.length > 0) {
            messagesEl.innerHTML = swap.messages.map(m => {
                const isMine = m.sender_id === currentUser.user_id;
                return `<div class="msg-bubble ${isMine ? 'mine' : 'theirs'}">
                    ${!isMine ? `<div class="msg-sender">${escapeHtml(m.display_name)}</div>` : ''}
                    <div class="msg-body">${escapeHtml(m.body)}</div>
                    <div class="msg-time">${new Date(m.created_at).toLocaleString()}</div>
                </div>`;
            }).join('');
        } else {
            messagesEl.innerHTML = '<div class="msg-bubble system">No messages yet. Start the conversation!</div>';
        }
        messagesEl.scrollTop = messagesEl.scrollHeight;

        const actionsEl = document.getElementById('chat-actions');
        actionsEl.innerHTML = '';

        const isLister = swap.lister_id === currentUser.user_id;
        const myRating = swap.ratings ? swap.ratings.find(r => r.rater_id === currentUser.user_id) : null;

        if (swap.state === 'pending' && isLister) {
            actionsEl.innerHTML = `
                <button class="btn btn-primary" onclick="acceptSwap(${swapId})">✅ Accept</button>
                <button class="btn btn-danger" onclick="declineSwap(${swapId})">❌ Decline</button>
            `;
        } else if (swap.state === 'accepted') {
            const myConfirmed = isLister ? swap.lister_confirmed : swap.requester_confirmed;
            if (!myConfirmed) {
                actionsEl.innerHTML = `<button class="btn btn-primary" onclick="confirmSwap(${swapId})">🤝 Confirm Handoff Complete</button>`;
            } else {
                actionsEl.innerHTML = `<p class="text-muted">Waiting for other party to confirm…</p>`;
            }
        } else if (swap.state === 'completed') {
            if (!myRating) {
                actionsEl.innerHTML = `<button class="btn btn-primary" onclick="openRatingModal(${swapId})">⭐ Rate this swap</button>`;
            } else {
                actionsEl.innerHTML = `<p class="text-muted">You rated this swap ${myRating.score} ⭐</p>`;
            }
        }

        const inputArea = document.getElementById('chat-input-area');
        inputArea.classList.toggle('hidden', swap.state === 'declined');

        openModal('chat-modal');
    } catch (err) {
        console.error('Failed to open chat:', err);
        alert('Failed to load conversation');
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const body = input.value.trim();
    if (!body || !currentSwapId) return;

    try {
        const res = await fetch(`${API}/api/swaps/${currentSwapId}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ body })
        });
        if (res.ok) {
            input.value = '';
            openChat(currentSwapId);
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to send message');
        }
    } catch (err) {
        alert('Failed to send message');
    }
}

// ── Swap Actions ───────────────────────────────────────────────────────

async function acceptSwap(swapId) {
    try {
        const res = await fetch(`${API}/api/swaps/${swapId}/accept`, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { openChat(swapId); }
        else { const d = await res.json(); alert(d.detail || 'Failed to accept'); }
    } catch (err) { alert('Failed to accept swap'); }
}

async function declineSwap(swapId) {
    if (!confirm('Decline this swap request?')) return;
    try {
        const res = await fetch(`${API}/api/swaps/${swapId}/decline`, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { openChat(swapId); }
        else { const d = await res.json(); alert(d.detail || 'Failed to decline'); }
    } catch (err) { alert('Failed to decline swap'); }
}

async function confirmSwap(swapId) {
    if (!confirm('Confirm that the plant handoff is complete?')) return;
    try {
        const res = await fetch(`${API}/api/swaps/${swapId}/confirm`, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { openChat(swapId); }
        else { const d = await res.json(); alert(d.detail || 'Failed to confirm'); }
    } catch (err) { alert('Failed to confirm swap'); }
}

// ── Rating ─────────────────────────────────────────────────────────────

function openRatingModal(swapId) {
    currentSwapId = swapId;
    selectedRating = 0;
    document.querySelectorAll('.star-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('rating-comment').value = '';
    closeModal('chat-modal');
    openModal('rating-modal');
}

function setRating(score) {
    selectedRating = score;
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.score) <= score);
    });
}

async function handleRating(e) {
    e.preventDefault();
    if (!selectedRating) { alert('Please select a rating'); return; }

    const comment = document.getElementById('rating-comment').value.trim();
    try {
        const res = await fetch(`${API}/api/swaps/${currentSwapId}/rate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ score: selectedRating, comment: comment || undefined })
        });
        if (res.ok) {
            closeModal('rating-modal');
            alert('Thanks for rating!');
            loadChats();
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to submit rating');
        }
    } catch (err) {
        alert('Failed to submit rating');
    }
}

// ── Utilities ──────────────────────────────────────────────────────────

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function haversine(lat1, lng1, lat2, lng2) {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Admin Panel ────────────────────────────────────────────────────────

function renderAdminPanel(vendors) {
    const statusLabel = { 0: '⏳ Pending', 1: '✅ Approved', '-1': '❌ Rejected' };
    const rows = vendors.length === 0
        ? '<p style="color:#888;padding:8px 0;">No vendor registrations yet.</p>'
        : vendors.map(v => `
            <div class="admin-vendor-row">
                <div class="admin-vendor-info">
                    <strong>${escapeHtml(v.shop_name)}</strong>
                    <span class="admin-vendor-status">${statusLabel[String(v.is_approved)] || '?'}</span><br>
                    <span style="font-size:0.8rem;color:#666;">${escapeHtml(v.email)} · ${escapeHtml(v.phone || '—')}</span><br>
                    <span style="font-size:0.8rem;color:#888;">${escapeHtml(v.description || '')}</span>
                </div>
                <div class="admin-vendor-actions">
                    ${v.is_approved !== 1 ? `<button class="btn btn-primary btn-sm" onclick="adminApprove(${v.id})">Approve</button>` : ''}
                    ${v.is_approved !== -1 ? `<button class="btn btn-danger btn-sm" onclick="adminReject(${v.id})">Reject</button>` : ''}
                </div>
            </div>
        `).join('');

    return `
        <div class="profile-section admin-section">
            <h3 style="margin-bottom:12px;">⚙️ Admin — Vendor Approvals</h3>
            <div class="admin-vendor-list">${rows}</div>
        </div>
    `;
}

async function adminApprove(vendorId) {
    try {
        const res = await fetch(`${API}/api/admin/vendors/${vendorId}/approve`, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) loadProfile();
        else { const d = await res.json(); alert(d.detail || 'Failed'); }
    } catch (err) { alert('Failed to approve'); }
}

async function adminReject(vendorId) {
    if (!confirm('Reject this vendor?')) return;
    try {
        const res = await fetch(`${API}/api/admin/vendors/${vendorId}/reject`, {
            method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) loadProfile();
        else { const d = await res.json(); alert(d.detail || 'Failed'); }
    } catch (err) { alert('Failed to reject'); }
}

// ── Shop ───────────────────────────────────────────────────────────────

async function loadShop() {
    const grid = document.getElementById('shop-grid');
    const empty = document.getElementById('shop-empty');
    const loading = document.getElementById('shop-loading');
    if (!grid) return;

    const q = (document.getElementById('shop-search')?.value || '').trim();
    let url = `${API}/api/shop/products?limit=60`;
    if (shopCategory) url += `&category=${encodeURIComponent(shopCategory)}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;

    grid.innerHTML = '';
    loading?.classList.remove('hidden');
    empty?.classList.add('hidden');

    // Ratings load in parallel — cards read productRatings after both settle
    loadProductRatings();

    try {
        const res = await fetch(url);
        shopProducts = await res.json();
        loading?.classList.add('hidden');

        if (shopProducts.length === 0) {
            empty?.classList.remove('hidden');
            return;
        }
        grid.innerHTML = shopProducts.map(renderProductCard).join('');
    } catch (err) {
        loading?.classList.add('hidden');
        grid.innerHTML = '<p style="padding:20px;color:red;">Failed to load shop.</p>';
    }
}

function filterShop(cat) {
    shopCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    loadShop();
}

let productRatings = {}; // { productId: { avg, count } } — loaded once per shop visit

async function loadProductRatings() {
    try {
        const res = await fetch(`${API}/api/shop/products/ratings`);
        if (res.ok) productRatings = await res.json();
    } catch (_) {}
}

function starsHtml(avg, count) {
    if (!avg) return '';
    const full = Math.round(avg);
    const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
    return `<span class="product-stars" title="${avg} / 5">${stars} <span class="stars-count">(${count})</span></span>`;
}

function renderProductCard(p) {
    const stockBadge = p.stock_qty > 0
        ? `<span class="stock-badge stock-low">${p.stock_qty} left</span>`
        : `<span class="stock-badge stock-ok">In Stock</span>`;
    const img = p.image_url || '';
    const rating = productRatings[String(p.id)];
    const stars = rating ? starsHtml(rating.avg, rating.count) : '';
    return `
        <div class="product-card" onclick="openProductDetail(${p.id})">
            <div class="product-card-img-wrap">
                <img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.parentElement.style.background='#eef6ee'">
                <span class="product-cat-chip">${escapeHtml(p.category)}</span>
            </div>
            <div class="product-card-body">
                <div class="product-card-title">${escapeHtml(p.title)}</div>
                <div class="product-card-shop">${escapeHtml(p.shop_name)}</div>
                ${stars}
                <div class="product-card-footer">
                    <span class="product-price-tag">₹${p.price.toLocaleString('en-IN')}</span>
                    ${stockBadge}
                </div>
            </div>
        </div>
    `;
}

async function openProductDetail(productId) {
    try {
        const res = await fetch(`${API}/api/shop/products/${productId}`);
        if (!res.ok) { alert('Product not found'); return; }
        currentProduct = await res.json();

        const img = document.getElementById('product-detail-image');
        img.src = currentProduct.image_url || '';
        img.style.display = currentProduct.image_url ? 'block' : 'none';

        document.getElementById('product-detail-category').textContent = currentProduct.category;
        document.getElementById('product-detail-title').textContent = currentProduct.title;
        document.getElementById('product-detail-price').textContent = `₹${currentProduct.price.toLocaleString('en-IN')}`;
        document.getElementById('product-detail-vendor').textContent = `🏪 ${currentProduct.shop_name}`;
        document.getElementById('product-detail-desc').textContent = currentProduct.description || '';

        const stockEl = document.getElementById('product-detail-stock');
        if (currentProduct.stock_qty > 0) {
            stockEl.textContent = `${currentProduct.stock_qty} in stock`;
            stockEl.className = 'product-stock-badge stock-low';
        } else {
            stockEl.textContent = 'In Stock';
            stockEl.className = 'product-stock-badge stock-ok';
        }

        document.getElementById('product-detail-qty').value = 1;

        // Load reviews asynchronously
        const reviewSection = document.getElementById('product-reviews-section');
        reviewSection.innerHTML = '<p style="font-size:0.8rem;color:#aaa;margin-top:14px;">Loading reviews…</p>';
        openModal('product-detail-modal');
        loadProductReviews(productId, reviewSection);
    } catch (err) {
        alert('Failed to load product');
    }
}

async function loadProductReviews(productId, container) {
    try {
        const res = await fetch(`${API}/api/products/${productId}/reviews`);
        if (!res.ok) { container.innerHTML = ''; return; }
        const data = await res.json();
        if (data.count === 0) {
            container.innerHTML = '<p style="font-size:0.8rem;color:#bbb;margin-top:14px;">No reviews yet — be the first!</p>';
            return;
        }
        const avgStars = starsHtml(data.avg_rating, data.count);
        const rows = data.reviews.map(r => `
            <div class="review-row">
                <div class="review-header">
                    <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                    <span class="review-author">${escapeHtml(r.display_name || r.username)}</span>
                    <span class="review-date">${new Date(r.created_at).toLocaleDateString('en-IN')}</span>
                </div>
                ${r.comment ? `<p class="review-comment">${escapeHtml(r.comment)}</p>` : ''}
            </div>
        `).join('');
        container.innerHTML = `
            <div class="reviews-section">
                <div class="reviews-title">Reviews &nbsp; ${avgStars}</div>
                ${rows}
            </div>`;
    } catch (_) { container.innerHTML = ''; }
}

function changeProductQty(delta) {
    const input = document.getElementById('product-detail-qty');
    const newVal = Math.max(1, parseInt(input.value || 1) + delta);
    input.value = newVal;
}

async function addToCartFromModal() {
    if (!currentProduct) return;
    if (!token) { closeModal('product-detail-modal'); openModal('auth-modal'); return; }

    const qty = parseInt(document.getElementById('product-detail-qty').value) || 1;
    await addToCart(currentProduct.id, qty);
    closeModal('product-detail-modal');
    openCartDrawer();
}

async function addToCart(productId, qty = 1) {
    if (!token) { openModal('auth-modal'); return; }
    try {
        const res = await fetch(`${API}/api/shop/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ product_id: productId, quantity: qty })
        });
        if (!res.ok) {
            const d = await res.json();
            alert(d.detail || 'Failed to add to cart');
            return;
        }
        await loadCartCount();
    } catch (err) {
        alert('Failed to add to cart');
    }
}

async function loadCartCount() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/api/shop/cart`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) return;
        cartData = await res.json();
        updateCartBadge(cartData.count);
    } catch (err) {}
}

function updateCartBadge(count) {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    if (count > 0) {
        badge.textContent = count > 9 ? '9+' : count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

async function openCartDrawer() {
    if (!token) { openModal('auth-modal'); return; }
    document.getElementById('cart-overlay').classList.remove('hidden');
    document.getElementById('cart-drawer').classList.remove('hidden');
    await renderCart();
}

function closeCartDrawer() {
    document.getElementById('cart-overlay').classList.add('hidden');
    document.getElementById('cart-drawer').classList.add('hidden');
}

async function renderCart() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/api/shop/cart`, { headers: { 'Authorization': `Bearer ${token}` } });
        cartData = await res.json();
    } catch (err) { return; }

    const list = document.getElementById('cart-items-list');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const footer = document.getElementById('cart-footer');
    const discountNote = document.getElementById('steward-discount-note');

    if (!cartData.items || cartData.items.length === 0) {
        list.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        footer.classList.add('hidden');
        updateCartBadge(0);
        return;
    }

    emptyMsg.classList.add('hidden');
    footer.classList.remove('hidden');

    const isStew = currentUser?.tier === 'steward';
    discountNote.classList.toggle('hidden', !isStew);

    const displayTotal = isStew ? cartData.total * 0.9 : cartData.total;
    document.getElementById('cart-total-amount').textContent = `₹${displayTotal.toFixed(0)}`;
    if (isStew) {
        document.getElementById('cart-total-amount').textContent = `₹${(cartData.total * 0.9).toFixed(0)} (was ₹${cartData.total.toFixed(0)})`;
    }

    updateCartBadge(cartData.count);

    list.innerHTML = cartData.items.map(item => `
        <div class="cart-item">
            <img src="${escapeHtml(item.image_url || '')}" alt="${escapeHtml(item.title)}" class="cart-item-img"
                 onerror="this.style.display='none'">
            <div class="cart-item-info">
                <div class="cart-item-title">${escapeHtml(item.title)}</div>
                <div class="cart-item-shop">${escapeHtml(item.shop_name)}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, ${item.quantity + 1})">+</button>
                <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

async function changeCartQty(itemId, newQty) {
    if (newQty < 1) { await removeFromCart(itemId); return; }
    try {
        await fetch(`${API}/api/shop/cart/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ quantity: newQty })
        });
        await renderCart();
    } catch (err) {}
}

async function removeFromCart(itemId) {
    try {
        await fetch(`${API}/api/shop/cart/${itemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        await renderCart();
    } catch (err) {}
}

async function clearCartConfirm() {
    if (!confirm('Clear all items from cart?')) return;
    try {
        await fetch(`${API}/api/shop/cart`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        cartData = { items: [], total: 0, count: 0 };
        await renderCart();
    } catch (err) {}
}

function openCheckoutModal() {
    if (!cartData.items || cartData.items.length === 0) return;
    closeCartDrawer();

    const isStew = currentUser?.tier === 'steward';
    const total = isStew ? cartData.total * 0.9 : cartData.total;
    const itemLines = cartData.items.map(i =>
        `${escapeHtml(i.title)} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`
    ).join('<br>');

    document.getElementById('checkout-summary').innerHTML = `
        <div class="checkout-items">${itemLines}</div>
        ${isStew ? '<div class="steward-discount">🌳 Steward 10% discount applied</div>' : ''}
        <div class="checkout-total">Total: <strong>₹${total.toFixed(0)}</strong></div>
    `;

    document.getElementById('checkout-form').reset();
    if (currentUser?.display_name) {
        document.getElementById('checkout-name').value = currentUser.display_name;
    }
    openModal('checkout-modal');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (form) form.addEventListener('submit', handleCheckout);

    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) addProductForm.addEventListener('submit', handleAddProduct);

    const productImageInput = document.getElementById('product-image-file');
    if (productImageInput) {
        productImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('product-image-preview').innerHTML =
                        `<img src="${ev.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

async function handleCheckout(e) {
    e.preventDefault();
    const btn = document.getElementById('checkout-submit-btn');
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !address) { alert('Name and address are required'); return; }

    btn.disabled = true;
    btn.textContent = 'Processing…';

    try {
        const res = await fetch(`${API}/api/shop/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ shipping_name: name, shipping_phone: phone, shipping_address: address })
        });
        const data = await res.json();

        if (!res.ok) {
            alert(data.detail || 'Checkout failed');
            btn.disabled = false;
            btn.textContent = 'Pay Securely →';
            return;
        }

        if (data.checkout_url) {
            // Stripe Checkout redirect
            window.location.href = data.checkout_url;
        } else {
            // Dev mode: order placed directly
            closeModal('checkout-modal');
            const reviewableItems = cartData.items ? [...cartData.items] : [];
            cartData = { items: [], total: 0, count: 0 };
            updateCartBadge(0);
            showOrderSuccessBanner(data.order_id, reviewableItems);
            switchView('shop');
        }
    } catch (err) {
        alert('Checkout failed. Please try again.');
        btn.disabled = false;
        btn.textContent = 'Pay Securely →';
    }
}

// ── Vendor Portal ──────────────────────────────────────────────────────

async function openVendorPortal() {
    openModal('vendor-portal-modal');
    document.getElementById('vendor-portal-inner').innerHTML = '<p style="text-align:center;padding:20px;">Loading…</p>';

    if (!token) {
        document.getElementById('vendor-portal-inner').innerHTML = `
            <div class="vendor-register-panel">
                <h2>🏪 Sell on Garden Swap</h2>
                <p>Sign in to register as a vendor or access your dashboard.</p>
                <button class="btn btn-primary" onclick="closeModal('vendor-portal-modal'); openModal('auth-modal')">Sign In →</button>
            </div>
        `;
        return;
    }

    try {
        const res = await fetch(`${API}/api/shop/vendors/me`, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        const vendor = data.vendor;

        if (!vendor) {
            renderVendorRegisterForm();
        } else if (vendor.is_approved === 0) {
            renderVendorPending(vendor);
        } else if (vendor.is_approved === -1) {
            renderVendorRejected();
        } else {
            await renderVendorDashboard(vendor);
        }
    } catch (err) {
        document.getElementById('vendor-portal-inner').innerHTML = '<p style="padding:20px;color:red;">Failed to load.</p>';
    }
}

function renderVendorRegisterForm() {
    document.getElementById('vendor-portal-inner').innerHTML = `
        <div class="vendor-register-panel">
            <h2>🏪 Become a Vendor</h2>
            <p style="color:#555;margin-bottom:16px;">Sell plants, pots, tools and more to Bangalore gardeners. Admin approval required before your shop goes live.</p>
            <form id="vendor-register-form">
                <div class="form-group">
                    <label>Shop Name</label>
                    <input type="text" id="vendor-shop-name" placeholder="e.g. Green Roots Nursery" required maxlength="80">
                </div>
                <div class="form-group">
                    <label>Description <span class="label-optional">(optional)</span></label>
                    <textarea id="vendor-description" rows="3" placeholder="What do you sell? Your experience, location…" maxlength="300"></textarea>
                </div>
                <div class="form-group">
                    <label>Phone <span class="label-optional">(optional)</span></label>
                    <input type="tel" id="vendor-phone" placeholder="+91 98765 43210" maxlength="20">
                </div>
                <p style="font-size:0.8rem;color:#888;margin-bottom:12px;">Commission: 10% per sale. Steward buyers get a 10% discount. Delivery handled by you.</p>
                <button type="submit" class="btn btn-primary btn-full">Submit for Approval</button>
            </form>
        </div>
    `;
    document.getElementById('vendor-register-form').addEventListener('submit', handleVendorRegister);
}

function renderVendorPending(vendor) {
    document.getElementById('vendor-portal-inner').innerHTML = `
        <div class="vendor-register-panel">
            <h2>⏳ Approval Pending</h2>
            <p>Your shop <strong>${escapeHtml(vendor.shop_name)}</strong> is under review.</p>
            <p style="color:#666;margin-top:8px;">You'll be notified once approved. Usually within 24 hours.</p>
        </div>
    `;
}

function renderVendorRejected() {
    document.getElementById('vendor-portal-inner').innerHTML = `
        <div class="vendor-register-panel">
            <h2>❌ Application Not Approved</h2>
            <p style="color:#666;">Your vendor application was not approved. Please contact us for details.</p>
        </div>
    `;
}

async function renderVendorDashboard(vendor) {
    try {
        const [productsRes, ordersRes, statsRes] = await Promise.all([
            fetch(`${API}/api/shop/vendor/products`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API}/api/shop/vendor/orders`,   { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API}/api/shop/vendor/stats`,    { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);
        const { products } = await productsRes.json();
        const orders = await ordersRes.json();
        const stats = await statsRes.json();

        // Build a quick lookup: product_id → units_sold + revenue
        const soldMap = {};
        (stats.product_stats || []).forEach(s => { soldMap[s.product_id] = s; });

        const productRows = products.length === 0
            ? '<p style="color:#888;">No products yet. Add your first product!</p>'
            : products.map(p => {
                const s = soldMap[p.id];
                const soldBadge = s
                    ? `<span class="vendor-sold-badge">${s.units_sold} sold · ₹${Number(s.revenue).toLocaleString('en-IN')}</span>`
                    : `<span class="vendor-sold-badge vendor-sold-zero">No sales yet</span>`;
                return `
                <div class="vendor-product-row ${!p.is_active ? 'product-inactive' : ''}">
                    <img src="${escapeHtml(p.image_url || '')}" alt="${escapeHtml(p.title)}" class="vendor-product-thumb" onerror="this.style.display='none'">
                    <div class="vendor-product-info">
                        <strong>${escapeHtml(p.title)}</strong>
                        <span class="product-cat-chip" style="font-size:0.75rem;">${escapeHtml(p.category)}</span><br>
                        <span style="color:#2d6a4f;font-weight:600;">₹${p.price.toLocaleString('en-IN')}</span>
                        <span style="color:#888;font-size:0.8rem;"> · ${p.stock_qty === 0 ? 'Unlimited' : p.stock_qty + ' in stock'}</span>
                        ${soldBadge}
                    </div>
                    <button class="btn-text btn-text-danger" onclick="deleteVendorProduct(${p.id})">Delete</button>
                </div>`;
            }).join('');

        const orderRows = orders.length === 0
            ? '<p style="color:#888;">No orders yet.</p>'
            : orders.map(o => `
                <div class="vendor-order-row">
                    <div><strong>${escapeHtml(o.title)}</strong> × ${o.quantity}</div>
                    <div style="color:#2d6a4f;font-weight:600;">₹${o.subtotal.toLocaleString('en-IN')}</div>
                    <div style="font-size:0.8rem;color:#666;">${escapeHtml(o.shipping_name)} · ${escapeHtml(o.shipping_phone || '')} · <span class="badge badge-state-${o.status}">${o.status}</span></div>
                    <div style="font-size:0.75rem;color:#aaa;">${new Date(o.created_at || o.order_date).toLocaleDateString('en-IN')}</div>
                    <div style="font-size:0.8rem;color:#555;">${escapeHtml(o.shipping_address)}</div>
                </div>
            `).join('');

        document.getElementById('vendor-portal-inner').innerHTML = `
            <div class="vendor-dashboard">
                <div class="vendor-dash-header">
                    <div>
                        <h2>🏪 ${escapeHtml(vendor.shop_name)}</h2>
                        <p style="color:#666;font-size:0.85rem;">${escapeHtml(vendor.description || '')}</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="openModal('add-product-modal')">+ Add Product</button>
                </div>

                <div class="vendor-stats-bar">
                    <div class="vendor-stat">
                        <span class="vendor-stat-value">₹${Number(stats.total_revenue).toLocaleString('en-IN')}</span>
                        <span class="vendor-stat-label">Total Revenue</span>
                    </div>
                    <div class="vendor-stat">
                        <span class="vendor-stat-value">${stats.total_orders}</span>
                        <span class="vendor-stat-label">Orders</span>
                    </div>
                    <div class="vendor-stat">
                        <span class="vendor-stat-value">${stats.items_sold}</span>
                        <span class="vendor-stat-label">Items Sold</span>
                    </div>
                    <div class="vendor-stat">
                        <span class="vendor-stat-value">${products.length}</span>
                        <span class="vendor-stat-label">Products Listed</span>
                    </div>
                </div>

                <div class="vendor-section">
                    <h3>Your Products (${products.length})</h3>
                    <div class="vendor-products-list">${productRows}</div>
                </div>

                <div class="vendor-section">
                    <h3>Incoming Orders (${orders.length})</h3>
                    <div class="vendor-orders-list">${orderRows}</div>
                </div>
            </div>
        `;
    } catch (err) {
        document.getElementById('vendor-portal-inner').innerHTML = '<p style="padding:20px;color:red;">Failed to load dashboard.</p>';
    }
}

async function handleVendorRegister(e) {
    e.preventDefault();
    const shopName = document.getElementById('vendor-shop-name').value.trim();
    const description = document.getElementById('vendor-description').value.trim();
    const phone = document.getElementById('vendor-phone').value.trim();

    if (!shopName) { alert('Shop name is required'); return; }

    try {
        const res = await fetch(`${API}/api/shop/vendors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ shop_name: shopName, description, phone })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.detail || 'Registration failed'); return; }
        openVendorPortal();
    } catch (err) {
        alert('Registration failed. Please try again.');
    }
}

async function handleAddProduct(e) {
    e.preventDefault();
    if (!token) return;

    const title = document.getElementById('product-title-input').value.trim();
    const category = document.getElementById('product-category-input').value;
    const price = document.getElementById('product-price-input').value;
    const stock = document.getElementById('product-stock-input').value;
    const desc = document.getElementById('product-desc-input').value.trim();
    const imageFile = document.getElementById('product-image-file').files[0];

    if (!title || !category || !price) { alert('Title, category and price are required'); return; }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock_qty', stock || '0');
    formData.append('description', desc);
    if (imageFile) formData.append('image', imageFile);

    try {
        const res = await fetch(`${API}/api/shop/products`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();
        if (!res.ok) { alert(data.detail || 'Failed to add product'); return; }
        closeModal('add-product-modal');
        document.getElementById('add-product-form').reset();
        document.getElementById('product-image-preview').innerHTML = '';
        openVendorPortal();
        loadShop();
    } catch (err) {
        alert('Failed to add product. Please try again.');
    }
}

async function deleteVendorProduct(productId) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
        const res = await fetch(`${API}/api/shop/products/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            openVendorPortal();
            loadShop();
        } else {
            const d = await res.json();
            alert(d.detail || 'Failed to delete product');
        }
    } catch (err) {
        alert('Failed to delete product');
    }
}

// ── Stage 6B: Reviews ───────────────────────────────────────────────────

let pendingReview = null; // { order_item_id, product_id, vendor_id, title }
let reviewStarValue = 0;

function showOrderSuccessBanner(orderId, items) {
    const banner = document.createElement('div');
    banner.className = 'order-success-banner';
    const itemLinks = items.map((it, i) => `
        <button class="btn-rate-item" onclick="openReviewModal({
            order_item_id: ${it.order_item_id || it.id || i},
            product_id: ${it.product_id || it.id},
            vendor_id: ${it.vendor_id || 0},
            title: '${(it.title || it.name || 'Product').replace(/'/g, "\\'")}'
        }, this.closest('.order-success-banner'))">
            Rate: ${escapeHtml(it.title || it.name || 'Product')} ★
        </button>`).join('');
    banner.innerHTML = `
        <div class="order-success-inner">
            <div class="order-success-title">✅ Order #${orderId} placed!</div>
            <p>The vendor will contact you for delivery. Got a moment to rate your items?</p>
            <div class="order-rate-items">${itemLinks || ''}</div>
            <button class="btn-text" onclick="this.closest('.order-success-banner').remove()" style="margin-top:8px;">Dismiss</button>
        </div>`;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 60000);
}

function openReviewModal(item, bannerEl) {
    pendingReview = item;
    reviewStarValue = 0;
    document.getElementById('review-modal-product').textContent = `Rating for: ${item.title}`;
    document.getElementById('review-comment').value = '';
    document.getElementById('review-msg').textContent = '';
    document.querySelectorAll('.shop-star').forEach(b => b.classList.remove('active'));
    openModal('review-modal');
}

function setReviewStar(val) {
    reviewStarValue = val;
    document.querySelectorAll('.shop-star').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.v) <= val);
    });
}

async function submitReview() {
    if (!pendingReview) return;
    if (!reviewStarValue) { alert('Please select a star rating.'); return; }
    if (!token) { alert('Please sign in to leave a review.'); return; }
    const comment = document.getElementById('review-comment').value.trim();
    const res = await fetch(`${API}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...pendingReview, rating: reviewStarValue, comment })
    });
    const data = await res.json();
    const msg = document.getElementById('review-msg');
    if (res.ok) {
        msg.textContent = 'Review submitted — thank you!';
        msg.style.color = '#2d6a4f';
        setTimeout(() => closeModal('review-modal'), 1500);
        loadProductRatings();
    } else {
        msg.textContent = data.detail || 'Could not submit review.';
        msg.style.color = '#c62828';
    }
}

// ── Stage 5: AI Plant Doctor ────────────────────────────────────────────

let doctorImageFile = null;

function loadDoctorView() {
    const locked = document.getElementById('doctor-locked');
    const panel = document.getElementById('doctor-panel');

    if (!currentUser || currentUser.tier !== 'steward') {
        locked.classList.remove('hidden');
        panel.classList.add('hidden');
        return;
    }

    locked.classList.add('hidden');
    panel.classList.remove('hidden');
    doctorImageFile = null;
    resetDoctorUpload();
}

function resetDoctorUpload() {
    doctorImageFile = null;
    document.getElementById('doctor-upload-placeholder').classList.remove('hidden');
    const preview = document.getElementById('doctor-preview-img');
    preview.classList.add('hidden');
    preview.src = '';
    document.getElementById('doctor-image-input').value = '';
    document.getElementById('doctor-submit-btn').disabled = true;
    document.getElementById('doctor-result').classList.add('hidden');
    document.getElementById('doctor-result').innerHTML = '';
}

function onDoctorImageSelected(input) {
    const file = input.files[0];
    if (!file) return;
    doctorImageFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('doctor-preview-img');
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        document.getElementById('doctor-upload-placeholder').classList.add('hidden');
        document.getElementById('doctor-submit-btn').disabled = false;
    };
    reader.readAsDataURL(file);
}

async function submitToDoctor() {
    if (!doctorImageFile) return;

    const btn = document.getElementById('doctor-submit-btn');
    const resultEl = document.getElementById('doctor-result');

    btn.disabled = true;
    btn.textContent = 'Analysing…';
    resultEl.classList.add('hidden');
    resultEl.innerHTML = '';

    try {
        const formData = new FormData();
        formData.append('image', doctorImageFile);

        const res = await fetch('/api/plant-doctor', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();

        if (!res.ok) {
            resultEl.innerHTML = `<div class="doctor-error">⚠️ ${data.detail || 'Diagnosis failed. Please try again.'}</div>`;
            resultEl.classList.remove('hidden');
            btn.disabled = false;
            btn.textContent = 'Diagnose my plant →';
            return;
        }

        const diagnosisHtml = data.diagnosis
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        resultEl.innerHTML = `
            <div class="doctor-diagnosis">
                ${diagnosisHtml}
            </div>
            <p class="doctor-remaining">${data.remaining} diagnosis${data.remaining === 1 ? '' : 'es'} remaining this month</p>
            <button class="btn btn-secondary" onclick="resetDoctorUpload()">Diagnose another plant</button>
        `;
        resultEl.classList.remove('hidden');

        const usageNote = document.getElementById('doctor-usage-note');
        usageNote.textContent = `${data.remaining} diagnosis${data.remaining === 1 ? '' : 'es'} remaining this month`;

        btn.textContent = 'Diagnose my plant →';
    } catch (err) {
        resultEl.innerHTML = '<div class="doctor-error">⚠️ Network error. Please try again.</div>';
        resultEl.classList.remove('hidden');
        btn.disabled = false;
        btn.textContent = 'Diagnose my plant →';
    }
}

// ── Stage 6C: Push Notifications ───────────────────────────────────────

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
}

async function registerPushIfSupported() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (Notification.permission === 'denied') return;
    try {
        // Fetch VAPID public key
        const keyRes = await fetch(`${API}/api/push/vapid-public-key`);
        if (!keyRes.ok) return;
        const { key } = await keyRes.json();
        if (!key) return;

        const reg = await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();

        if (!sub) {
            // Request permission only when already granted or on explicit action
            if (Notification.permission !== 'granted') return;
            sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: _urlBase64ToUint8Array(key)
            });
        }

        // Send subscription to backend
        await fetch(`${API}/api/push/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ subscription: sub.toJSON() })
        });
    } catch (_) {}
}

async function enablePushNotifications() {
    if (!('Notification' in window)) {
        alert('Push notifications are not supported on this device.');
        return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        await registerPushIfSupported();
        alert('✅ Notifications enabled! You\'ll get alerts for swap requests and matches.');
    } else {
        alert('Notifications permission was denied. You can enable it in your browser settings.');
    }
}

function _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const output = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
    return output;
}

// ── Stage 6: Events ────────────────────────────────────────────────────

let _currentEventId = null;
let _currentEventData = null;
let _claimInterval = null;
let _scannerStream = null;
let _scannerAnimFrame = null;
let _prebookContext = null;   // { plant_tag_id, event_id, plant_name, handling_fee }
let _claimContext = null;     // { prebooking_id, claim_token, claim_secret, plant_name }

async function loadEvents() {
    const list = document.getElementById('events-list');
    list.innerHTML = '<p style="color:#888;text-align:center">Loading events…</p>';

    // Show admin create button if admin
    const adminBtn = document.getElementById('admin-create-event-btn');
    if (adminBtn && currentUser && currentUser.email === 'amelabrs@gmail.com') {
        adminBtn.classList.remove('hidden');
    }

    const res = await apiFetch('/api/events');
    if (!res.ok) { list.innerHTML = '<p style="color:#c00">Failed to load events.</p>'; return; }
    const { events } = await res.json();

    if (!events.length) {
        list.innerHTML = '<p style="color:#888;text-align:center;padding:2rem">No upcoming events yet. Watch this space! 🌱</p>';
        return;
    }

    list.innerHTML = events.map(ev => {
        const date = new Date(ev.event_date + 'T' + ev.event_time);
        const dateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        const timeStr = ev.event_time.slice(0, 5);
        const feeHtml = ev.handling_fee > 0
            ? `<span class="event-fee-badge">£${Number(ev.handling_fee).toFixed(2)} handling</span>` : '';
        const rsvpHtml = ev.i_rsvped
            ? '<span class="event-rsvp-count">✅ Going</span>'
            : `<span class="event-rsvp-count">${ev.rsvp_count} going</span>`;
        return `
        <div class="event-card" onclick="openEventDetail(${ev.id})">
            <div class="event-card-header">
                <div class="event-card-title">${escHtml(ev.title)}</div>
                <div class="event-card-date">📅 ${dateStr} · ${timeStr}</div>
            </div>
            <div class="event-card-body">
                <div class="event-card-location">📍 ${escHtml(ev.location_name)}</div>
                ${ev.description ? `<div class="event-card-desc">${escHtml(ev.description.slice(0, 100))}${ev.description.length > 100 ? '…' : ''}</div>` : ''}
                <div class="event-card-footer">${rsvpHtml}${feeHtml}</div>
            </div>
        </div>`;
    }).join('');
}

async function openEventDetail(eventId) {
    _currentEventId = eventId;
    switchView('event-detail');
    const content = document.getElementById('event-detail-content');
    content.innerHTML = '<p style="color:#888;text-align:center;padding:2rem">Loading…</p>';

    const res = await apiFetch(`/api/events/${eventId}`);
    if (!res.ok) { content.innerHTML = '<p style="color:#c00">Failed to load event.</p>'; return; }
    const { event: ev, plants } = await res.json();
    _currentEventData = ev;

    const date = new Date(ev.event_date + 'T' + ev.event_time);
    const dateStr = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = ev.event_time.slice(0, 5);

    const rsvpBtn = ev.i_rsvped
        ? `<button class="btn btn-outline" onclick="toggleRSVP(false)">✅ I'm going · Cancel</button>`
        : `<button class="btn btn-primary" onclick="toggleRSVP(true)">📅 RSVP</button>`;

    const tagBtn = `<button class="btn btn-outline" onclick="openTagPlants(${eventId})">🌿 Tag My Plants</button>`;

    const mapLink = ev.address
        ? `<a href="https://maps.google.com/?q=${encodeURIComponent(ev.address)}" target="_blank" style="color:#2d6a4f;font-size:0.85rem">📍 View on map</a>`
        : '';

    const plantsHtml = plants.length ? plants.map(p => {
        const img = p.image_url ? `<img src="${escHtml(p.image_url)}" alt="${escHtml(p.plant_name)}" loading="lazy">` : `<div style="height:100px;background:#e9f5ee;display:flex;align-items:center;justify-content:center;font-size:1.5rem">🌿</div>`;
        const bookedOverlay = p.is_prebooked ? `<div class="prebooked-overlay">Pre-Booked</div>` : '';
        const prebookBtn = !p.is_prebooked && p.owner !== (currentUser && currentUser.username)
            ? `<button class="ep-prebook-btn" onclick="startPrebook(${p.tag_id},${eventId},'${escHtml(p.plant_name).replace(/'/g,"\\'")}',${ev.handling_fee || 0})">🔖 Pre-Book</button>`
            : '';
        const claimBtn = p.prebooking_id
            ? `<button class="ep-prebook-btn" style="background:#40916c" onclick="openClaimModal(${p.prebooking_id})">📲 My Code</button>`
            : '';
        return `
        <div class="event-plant-card">
            ${img}
            <div class="event-exclusive-badge">Event</div>
            ${bookedOverlay}
            <div class="ep-info">
                <div class="ep-name">${escHtml(p.plant_name)}</div>
                <div class="ep-owner">by ${escHtml(p.owner)}</div>
            </div>
            ${claimBtn || prebookBtn}
        </div>`;
    }).join('') : '<p style="color:#aaa;font-size:0.85rem">No plants tagged yet. Be the first! 🌱</p>';

    content.innerHTML = `
    <div class="event-detail-hero">
        <div class="event-detail-title">${escHtml(ev.title)}</div>
        <div class="event-detail-meta">📅 ${dateStr} · ${timeStr} &nbsp;·&nbsp; 📍 ${escHtml(ev.location_name)}</div>
        ${ev.max_attendees ? `<div class="event-detail-meta" style="margin-top:0.2rem">👥 Max ${ev.max_attendees} attendees</div>` : ''}
    </div>
    <div class="event-detail-body">
        ${ev.description ? `<p class="event-detail-desc">${escHtml(ev.description)}</p>` : ''}
        ${mapLink}
        <div class="event-actions" style="margin-top:0.75rem">
            ${rsvpBtn}
            ${tagBtn}
            <button class="btn btn-outline" onclick="openScannerModal()">📷 Scan QR</button>
        </div>
        <div class="event-plants-section">
            <h3>🌿 Plants at this event (${plants.length})</h3>
            <div class="event-plants-grid">${plantsHtml}</div>
        </div>
    </div>`;
}

async function toggleRSVP(going) {
    if (!_currentEventId) return;
    const method = going ? 'POST' : 'DELETE';
    const res = await apiFetch(`/api/events/${_currentEventId}/rsvp`, { method });
    if (res.ok) openEventDetail(_currentEventId);
}

// ── Tag plants ──────────────────────────────────────────────────────────

async function openTagPlants(eventId) {
    openModal('tag-plant-modal');
    const list = document.getElementById('tag-plant-list');
    list.innerHTML = '<p style="color:#888">Loading your listings…</p>';

    const res = await apiFetch(`/api/events/${eventId}/my-listings`);
    if (!res.ok) { list.innerHTML = '<p style="color:#c00">Failed to load listings.</p>'; return; }
    const { listings } = await res.json();

    if (!listings.length) {
        list.innerHTML = '<p style="color:#888">You have no active listings. Add one first!</p>';
        return;
    }

    list.innerHTML = listings.map(l => `
        <div class="tag-plant-item ${l.tagged ? 'tagged' : ''}" id="tpi-${l.id}" onclick="toggleTagPlant(${eventId},${l.id},${l.tagged ? 1 : 0})">
            ${l.image_url ? `<img src="${escHtml(l.image_url)}" alt="">` : '<div style="width:48px;height:48px;background:#e9f5ee;border-radius:8px;display:flex;align-items:center;justify-content:center">🌿</div>'}
            <span class="tag-plant-item-name">${escHtml(l.plant_name)}</span>
        </div>
    `).join('');
}

async function toggleTagPlant(eventId, listingId, isTagged) {
    if (isTagged) {
        const res = await apiFetch(`/api/events/tag-plant?event_id=${eventId}&listing_id=${listingId}`, { method: 'DELETE' });
        if (!res.ok) { const d = await res.json(); alert(d.detail || 'Failed to untag'); return; }
    } else {
        const res = await apiFetch('/api/events/tag-plant', {
            method: 'POST',
            body: JSON.stringify({ event_id: eventId, listing_id: listingId })
        });
        if (!res.ok) { const d = await res.json(); alert(d.detail || 'Failed to tag'); return; }
    }
    // Refresh the list
    await openTagPlants(eventId);
    // Refresh event detail plants grid in background
    if (_currentEventId === eventId) openEventDetail(eventId);
}

// ── Pre-book ─────────────────────────────────────────────────────────────

function startPrebook(plantTagId, eventId, plantName, handlingFee) {
    _prebookContext = { plant_tag_id: plantTagId, event_id: eventId, plant_name: plantName, handling_fee: handlingFee };
    document.getElementById('prebook-plant-name').textContent = `Plant: ${plantName}`;
    document.getElementById('prebook-fee-note').textContent = handlingFee > 0
        ? `A £${Number(handlingFee).toFixed(2)} handling fee applies for pre-bookings at this event.`
        : 'No handling fee for this event.';
    document.getElementById('prebook-msg').textContent = '';
    openModal('prebook-confirm-modal');
}

async function confirmPrebook() {
    if (!_prebookContext) return;
    const msg = document.getElementById('prebook-msg');
    msg.textContent = 'Booking…';
    const res = await apiFetch('/api/events/prebook', {
        method: 'POST',
        body: JSON.stringify({ event_id: _prebookContext.event_id, plant_tag_id: _prebookContext.plant_tag_id })
    });
    if (!res.ok) {
        const d = await res.json();
        msg.textContent = d.detail || 'Failed to pre-book.';
        return;
    }
    const data = await res.json();
    closeModal('prebook-confirm-modal');
    // Open claim code modal immediately
    _claimContext = {
        prebooking_id: data.prebooking_id,
        claim_token: data.claim_token,
        claim_secret: data.claim_secret,
        plant_name: _prebookContext.plant_name,
    };
    openClaimCodeUI();
    // Refresh event detail
    if (_currentEventId) openEventDetail(_currentEventId);
}

// ── Claim code (TOTP) ─────────────────────────────────────────────────────

async function openClaimModal(prebookingId) {
    const res = await apiFetch(`/api/events/prebook/${prebookingId}`);
    if (!res.ok) { alert('Could not load pre-booking.'); return; }
    const pb = await res.json();
    if (pb.is_claimed) { alert('This pre-booking has already been claimed. Swap complete! 🌱'); return; }
    _claimContext = {
        prebooking_id: pb.id,
        claim_token: pb.claim_token,
        claim_secret: pb.claim_secret,
        plant_name: pb.plant_name,
    };
    openClaimCodeUI();
}

async function _totpCode(secret, counter) {
    // HMAC-SHA1(secret, counter as 8-byte big-endian) → 6 digits
    if (counter === undefined) counter = Math.floor(Date.now() / 60000);
    const keyMaterial = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
    );
    const buf = new ArrayBuffer(8);
    new DataView(buf).setBigUint64(0, BigInt(counter), false);
    const sig = await crypto.subtle.sign('HMAC', keyMaterial, buf);
    const h = new Uint8Array(sig);
    const offset = h[19] & 0x0F;
    const code = ((h[offset] & 0x7F) << 24 | h[offset+1] << 16 | h[offset+2] << 8 | h[offset+3]) % 1000000;
    return String(code).padStart(6, '0');
}

function openClaimCodeUI() {
    const modal = document.getElementById('claim-code-modal');
    modal.classList.remove('hidden');

    // Generate QR
    const qrDiv = document.getElementById('claim-qr');
    qrDiv.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrDiv, {
            text: _claimContext.claim_token,
            width: 200, height: 200,
            colorDark: '#1b4332', colorLight: '#ffffff',
        });
    } else {
        qrDiv.textContent = _claimContext.claim_token;
    }

    document.getElementById('claim-modal-plant').textContent = _claimContext.plant_name;
    _startTotpTick();
}

function _startTotpTick() {
    if (_claimInterval) clearInterval(_claimInterval);
    const tick = async () => {
        const code = await _totpCode(_claimContext.claim_secret);
        document.getElementById('claim-totp-digits').textContent = code;
        const secs = 60 - (Math.floor(Date.now() / 1000) % 60);
        document.getElementById('claim-totp-timer').textContent = secs + 's';
    };
    tick();
    _claimInterval = setInterval(tick, 1000);
}

function closeClaimModal() {
    document.getElementById('claim-code-modal').classList.add('hidden');
    if (_claimInterval) { clearInterval(_claimInterval); _claimInterval = null; }
}

// ── QR Scanner ────────────────────────────────────────────────────────────

let _scanClaimToken = null;

async function openScannerModal() {
    _scanClaimToken = null;
    document.getElementById('scanner-msg').textContent = '';
    document.getElementById('manual-code-input').value = '';
    openModal('scanner-modal');

    const video = document.getElementById('scanner-video');
    const canvas = document.getElementById('scanner-canvas');

    try {
        _scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = _scannerStream;
        video.play();
        _scanLoop(video, canvas);
    } catch {
        document.getElementById('scanner-msg').textContent = 'Camera not available — use manual code entry.';
    }
}

function _scanLoop(video, canvas) {
    const ctx = canvas.getContext('2d');
    const tick = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qr = typeof jsQR !== 'undefined' ? jsQR(img.data, img.width, img.height) : null;
            if (qr && qr.data) {
                _scanClaimToken = qr.data;
                submitScanResult(qr.data);
                return;
            }
        }
        _scannerAnimFrame = requestAnimationFrame(tick);
    };
    _scannerAnimFrame = requestAnimationFrame(tick);
}

function closeScannerModal() {
    document.getElementById('scanner-modal').classList.add('hidden');
    if (_scannerStream) { _scannerStream.getTracks().forEach(t => t.stop()); _scannerStream = null; }
    if (_scannerAnimFrame) { cancelAnimationFrame(_scannerAnimFrame); _scannerAnimFrame = null; }
}

async function submitManualCode() {
    const code = document.getElementById('manual-code-input').value.trim();
    if (!code) return;
    await submitScanResult(code);
}

async function submitScanResult(codeOrToken) {
    if (_scannerAnimFrame) { cancelAnimationFrame(_scannerAnimFrame); _scannerAnimFrame = null; }
    const msg = document.getElementById('scanner-msg');
    msg.textContent = 'Verifying…';

    // We need the claim_token from the QR. If the user typed a 6-digit code, we need a token too.
    // The lister should first manually input the booker's claim_token (from QR data), then it auto-verifies.
    // For 6-digit manual entry: the lister enters the TOTP code; we send it with the token they scanned earlier
    // or we ask for the token first. Simplest UX: if 6 digits → ask for token; if UUID format → use as token.

    const isToken = /^[0-9a-f-]{36}$/.test(codeOrToken);
    const token = isToken ? codeOrToken : (_scanClaimToken || '');
    const code = isToken ? codeOrToken : codeOrToken;

    const res = await apiFetch('/api/events/claim/verify', {
        method: 'POST',
        body: JSON.stringify({ claim_token: token, code: code })
    });
    if (!res.ok) {
        const d = await res.json();
        msg.style.color = '#c00';
        msg.textContent = d.detail || 'Verification failed.';
        return;
    }
    const d = await res.json();
    msg.style.color = '#2d6a4f';
    msg.textContent = d.message || 'Swap complete!';
    closeScannerModal();
    if (_currentEventId) setTimeout(() => openEventDetail(_currentEventId), 800);
}

// ── Create Event (Admin) ──────────────────────────────────────────────────

function openCreateEvent() {
    openModal('create-event-modal');
    document.getElementById('create-event-msg').textContent = '';
}

async function submitCreateEvent() {
    const title = document.getElementById('ev-title').value.trim();
    const desc = document.getElementById('ev-desc').value.trim();
    const location = document.getElementById('ev-location').value.trim();
    const address = document.getElementById('ev-address').value.trim();
    const date = document.getElementById('ev-date').value;
    const time = document.getElementById('ev-time').value;
    const max = parseInt(document.getElementById('ev-max').value) || 0;
    const fee = parseFloat(document.getElementById('ev-fee').value) || 0;
    const msg = document.getElementById('create-event-msg');

    if (!title || !location || !date || !time) {
        msg.textContent = 'Title, venue, date and time are required.';
        return;
    }
    msg.textContent = 'Creating…';
    const res = await apiFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ title, description: desc, location_name: location, address, event_date: date, event_time: time, max_attendees: max, handling_fee: fee })
    });
    if (!res.ok) {
        const d = await res.json();
        msg.textContent = d.detail || 'Failed to create event.';
        return;
    }
    closeModal('create-event-modal');
    await loadEvents();
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
