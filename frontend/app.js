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
    const views = ['feed', 'shop', 'profile', 'chats', 'notifications'];
    views.forEach(v => {
        const el = document.getElementById(`${v}-view`);
        if (el) el.classList.toggle('hidden', v !== view);
    });

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (view === 'shop') {
        loadShop();
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

function renderProductCard(p) {
    const stockBadge = p.stock_qty > 0
        ? `<span class="stock-badge stock-low">${p.stock_qty} left</span>`
        : `<span class="stock-badge stock-ok">In Stock</span>`;
    const img = p.image_url || '';
    return `
        <div class="product-card" onclick="openProductDetail(${p.id})">
            <div class="product-card-img-wrap">
                <img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.parentElement.style.background='#eef6ee'">
                <span class="product-cat-chip">${escapeHtml(p.category)}</span>
            </div>
            <div class="product-card-body">
                <div class="product-card-title">${escapeHtml(p.title)}</div>
                <div class="product-card-shop">${escapeHtml(p.shop_name)}</div>
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
        openModal('product-detail-modal');
    } catch (err) {
        alert('Failed to load product');
    }
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
            cartData = { items: [], total: 0, count: 0 };
            updateCartBadge(0);
            alert(`✅ Order #${data.order_id} placed! The vendor will contact you for delivery.`);
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
        const [productsRes, ordersRes] = await Promise.all([
            fetch(`${API}/api/shop/vendor/products`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API}/api/shop/vendor/orders`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);
        const { products } = await productsRes.json();
        const orders = await ordersRes.json();

        const productRows = products.length === 0
            ? '<p style="color:#888;">No products yet. Add your first product!</p>'
            : products.map(p => `
                <div class="vendor-product-row ${!p.is_active ? 'product-inactive' : ''}">
                    <img src="${escapeHtml(p.image_url || '')}" alt="${escapeHtml(p.title)}" class="vendor-product-thumb" onerror="this.style.display='none'">
                    <div class="vendor-product-info">
                        <strong>${escapeHtml(p.title)}</strong>
                        <span class="product-cat-chip" style="font-size:0.75rem;">${escapeHtml(p.category)}</span><br>
                        <span style="color:#2d6a4f;font-weight:600;">₹${p.price.toLocaleString('en-IN')}</span>
                        <span style="color:#888;font-size:0.8rem;"> · ${p.stock_qty === 0 ? 'Unlimited' : p.stock_qty + ' in stock'}</span>
                    </div>
                    <button class="btn-text btn-text-danger" onclick="deleteVendorProduct(${p.id})">Delete</button>
                </div>
            `).join('');

        const orderRows = orders.length === 0
            ? '<p style="color:#888;">No orders yet.</p>'
            : orders.map(o => `
                <div class="vendor-order-row">
                    <div><strong>${escapeHtml(o.title)}</strong> × ${o.quantity}</div>
                    <div style="color:#2d6a4f;font-weight:600;">₹${o.subtotal.toLocaleString('en-IN')}</div>
                    <div style="font-size:0.8rem;color:#666;">${escapeHtml(o.shipping_name)} · ${escapeHtml(o.shipping_phone || '')} · <span class="badge badge-state-${o.status}">${o.status}</span></div>
                    <div style="font-size:0.75rem;color:#aaa;">${new Date(o.created_at || o.order_date).toLocaleDateString()}</div>
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
