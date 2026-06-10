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
        // Refresh user data to get updated tier
        if (token) refreshMe();
        window.history.replaceState({}, '', '/');
    }
    if (params.get('cancelled')) {
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

    if (token && currentUser) {
        btn.textContent = 'Sign Out';
        btn.onclick = signOut;
        fab.classList.remove('hidden');

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
    } else {
        btn.textContent = 'Sign In';
        btn.onclick = () => openModal('auth-modal');
        fab.classList.add('hidden');
        notifBtn.classList.add('hidden');
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
        const [profileRes, wishRes] = await Promise.all([
            fetch(`${API}/api/profile/${currentUser.username}`),
            token ? fetch(`${API}/api/wish-list`, { headers: { 'Authorization': `Bearer ${token}` } }) : Promise.resolve(null)
        ]);

        const profile = await profileRes.json();
        const wishList = wishRes && wishRes.ok ? await wishRes.json() : [];

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
    const views = ['feed', 'profile', 'chats', 'notifications'];
    views.forEach(v => {
        const el = document.getElementById(`${v}-view`);
        if (el) el.classList.toggle('hidden', v !== view);
    });

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (view === 'profile') {
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
