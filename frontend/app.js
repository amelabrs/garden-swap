/**
 * Garden Swap — Frontend App (Stage 2: The Swap)
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
let authMode = 'login'; // 'login' or 'signup'

const API = '';

// ── Init ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    requestLocation();
    setupEventListeners();
    loadFeed();
});

function setupEventListeners() {
    // Search
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    // Auth form
    document.getElementById('auth-form').addEventListener('submit', handleAuth);

    // Listing form
    document.getElementById('listing-form').addEventListener('submit', handleNewListing);

    // Image preview
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

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Modal backdrop close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal.id);
        });
    });

    // Swap request form
    document.getElementById('swap-request-form').addEventListener('submit', handleSwapRequest);

    // Chat input enter key
    document.getElementById('chat-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    // Rating form
    document.getElementById('rating-form').addEventListener('submit', handleRating);
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

    grid.innerHTML = listings.map(l => `
        <div class="plant-card" onclick="openDetail(${l.id})">
            <img src="${l.image_url}" alt="${escapeHtml(l.title)}" loading="lazy">
            <div class="plant-card-info">
                <div class="plant-card-title">${escapeHtml(l.title)}</div>
                <div class="plant-card-meta">
                    <span class="badge ${l.status === 'swap' ? 'badge-swap' : 'badge-free'}">
                        ${l.status === 'swap' ? '🔄 Swap' : '🎁 Free'}
                    </span>
                    <span class="badge badge-type">${escapeHtml(l.plant_type)}</span>
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
    `).join('');
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

        // Badges
        const statusBadge = document.getElementById('detail-status-badge');
        statusBadge.textContent = listing.status === 'swap' ? '🔄 Swap' : '🎁 Free';
        statusBadge.className = `badge ${listing.status === 'swap' ? 'badge-swap' : 'badge-free'}`;

        document.getElementById('detail-type-badge').textContent = listing.plant_type;
        document.getElementById('detail-condition-badge').textContent = listing.condition;

        // Meta
        document.getElementById('detail-meta').textContent =
            `Listed by ${listing.display_name}${listing.user_rating ? ' • ' + listing.user_rating + ' ⭐' : ''}`;

        // Distance
        if (userLat && listing.lat) {
            const dist = haversine(userLat, userLng, listing.lat, listing.lng);
            document.getElementById('detail-distance').textContent = `📍 ${dist.toFixed(1)} miles away`;
        } else {
            document.getElementById('detail-distance').textContent = '';
        }

        // Show delete button if it's the current user's listing
        const actions = document.getElementById('detail-actions');
        const swapBtnArea = document.getElementById('detail-swap-btn-area');
        if (currentUser && listing.user_id === currentUser.user_id) {
            actions.classList.remove('hidden');
            swapBtnArea.classList.add('hidden');
        } else {
            actions.classList.add('hidden');
            // Show swap button only if listing is available and user is logged in
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

    if (token && currentUser) {
        btn.textContent = 'Sign Out';
        btn.onclick = signOut;
        fab.classList.remove('hidden');
    } else {
        btn.textContent = 'Sign In';
        btn.onclick = () => openModal('auth-modal');
        fab.classList.add('hidden');
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

        if (!zipCode) {
            alert('Zip Code is required');
            return;
        }

        try {
            const res = await fetch(`${API}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username, display_name: displayName, zip_code: zipCode })
            });
            const data = await res.json();
            if (!res.ok) { alert(data.detail || 'Signup failed'); return; }

            token = data.token;
            currentUser = { user_id: data.user_id, username: data.username, display_name: data.display_name };
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
            currentUser = { user_id: data.user_id, username: data.username, display_name: data.display_name };
            localStorage.setItem('gs_token', token);
            localStorage.setItem('gs_user', JSON.stringify(currentUser));
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
    if (!token) {
        openModal('auth-modal');
        return;
    }
    // Show user's location
    if (currentUser) {
        document.getElementById('listing-location-hint').textContent = `📍 Location: Your registered zip code`;
    }
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
    const imageFile = document.getElementById('listing-image').files[0];

    if (!imageFile) {
        alert('Please select a photo');
        return;
    }
    if (!plantType) {
        alert('Please select a plant type');
        return;
    }
    if (!condition) {
        alert('Please select a condition');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('plant_type', plantType);
    formData.append('condition', condition);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
        const res = await fetch(`${API}/api/listings`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();
        if (res.status === 401) { signOut(); openModal('auth-modal'); return; }
        if (!res.ok) { alert(data.detail || 'Failed to create listing'); return; }

        closeModal('new-listing-modal');
        loadFeed();
    } catch (err) {
        alert('Failed to create listing');
    }
}

// ── Profile ────────────────────────────────────────────────────────────

async function loadProfile() {
    if (!currentUser) return;

    try {
        const res = await fetch(`${API}/api/profile/${currentUser.username}`);
        const profile = await res.json();

        const content = document.getElementById('profile-content');
        content.innerHTML = `
            <div class="profile-header">
                <h2>${escapeHtml(profile.display_name)}</h2>
                <p class="profile-meta">
                    @${escapeHtml(profile.username)} • 📍 ${escapeHtml(profile.zip_code)}
                    ${profile.rating ? ' • ' + profile.rating + ' ⭐ (' + profile.rating_count + ' ratings)' : ''}
                </p>
                <p class="profile-meta">Member since ${new Date(profile.member_since).toLocaleDateString()}</p>
            </div>
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
        `;
    } catch (err) {
        document.getElementById('profile-content').innerHTML = '<p>Failed to load profile.</p>';
    }
}

// ── Navigation ─────────────────────────────────────────────────────────

function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-view="${view}"]`).classList.add('active');

    document.getElementById('feed-view').classList.toggle('hidden', view !== 'feed');
    document.getElementById('profile-view').classList.toggle('hidden', view !== 'profile');
    document.getElementById('chats-view').classList.toggle('hidden', view !== 'chats');

    if (view === 'profile') {
        if (!currentUser) {
            openModal('auth-modal');
            switchView('feed');
            return;
        }
        loadProfile();
    } else if (view === 'chats') {
        if (!currentUser) {
            openModal('auth-modal');
            switchView('feed');
            return;
        }
        loadChats();
    }
}

// ── Modals ─────────────────────────────────────────────────────────────

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
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
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// ── Swap Request ───────────────────────────────────────────────────────

async function openSwapRequest() {
    if (!currentUser || !currentDetailListing) return;

    // Load user's own listings to offer
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
        console.error('Failed to load user listings for swap offer:', err);
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
    const selectGroup = document.getElementById('offer-select-group');
    if (offerType === 'trade') {
        selectGroup.classList.remove('hidden');
    } else {
        selectGroup.classList.add('hidden');
    }
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

    const body = {
        listing_id: currentDetailListing.id,
        swap_type: swapType,
        message: message || undefined
    };
    if (swapType === 'trade' && offeredListingId) {
        body.offered_listing_id = parseInt(offeredListingId);
    }

    try {
        const res = await fetch(`${API}/api/swaps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) { alert(data.detail || 'Failed to send swap request'); return; }

        closeModal('swap-request-modal');
        alert('Swap request sent! Check your Chats tab.');
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
            container.innerHTML = '<p style="text-align:center;padding:40px;color:var(--text-secondary);">No swap conversations yet. Request a swap from a plant listing!</p>';
            return;
        }

        container.innerHTML = swaps.map(s => {
            const otherName = s.lister_id === currentUser.user_id ? s.requester_name : s.lister_name;
            const stateClass = s.state;
            const stateLabel = s.state.charAt(0).toUpperCase() + s.state.slice(1);
            const lastMsg = s.last_message ? s.last_message.body : '';
            return `
                <div class="chat-card" onclick="openChat(${s.id})">
                    <div class="chat-content">
                        <div class="chat-card-header">
                            <strong>${escapeHtml(s.listing_title)}</strong>
                            <span class="badge badge-state-${stateClass}">${stateLabel}</span>
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

        // Header
        const otherName = swap.lister_id === currentUser.user_id ? swap.requester_name : swap.lister_name;
        document.getElementById('chat-header').innerHTML =
            `<strong>${escapeHtml(swap.listing_title)}</strong>
             <span style="font-size:0.85rem;color:#666;"> with ${escapeHtml(otherName)} • ${swap.swap_type === 'trade' ? '🔄 Swap' : '🎁 Free'} • ${swap.state}</span>`;

        // Messages
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

        // Actions based on state and role
        const actionsEl = document.getElementById('chat-actions');
        actionsEl.innerHTML = '';

        const isLister = swap.lister_id === currentUser.user_id;
        const isRequester = swap.requester_id === currentUser.user_id;
        const myRating = swap.ratings ? swap.ratings.find(r => r.rater_id === currentUser.user_id) : null;

        if (swap.state === 'pending' && isLister) {
            actionsEl.innerHTML = `
                <button class="btn btn-primary" onclick="acceptSwap(${swapId})">✅ Accept</button>
                <button class="btn btn-danger" onclick="declineSwap(${swapId})">❌ Decline</button>
            `;
        } else if (swap.state === 'accepted') {
            const myConfirmed = isLister ? swap.lister_confirmed : swap.requester_confirmed;
            if (!myConfirmed) {
                actionsEl.innerHTML = `
                    <button class="btn btn-primary" onclick="confirmSwap(${swapId})">🤝 Confirm Handoff Complete</button>
                `;
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

        // Show/hide input area based on state
        const inputArea = document.getElementById('chat-input-area');
        if (swap.state === 'declined') {
            inputArea.classList.add('hidden');
        } else {
            inputArea.classList.remove('hidden');
        }

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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ body })
        });
        if (res.ok) {
            input.value = '';
            openChat(currentSwapId); // Refresh messages
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
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            openChat(swapId);
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to accept');
        }
    } catch (err) {
        alert('Failed to accept swap');
    }
}

async function declineSwap(swapId) {
    if (!confirm('Decline this swap request?')) return;
    try {
        const res = await fetch(`${API}/api/swaps/${swapId}/decline`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            openChat(swapId);
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to decline');
        }
    } catch (err) {
        alert('Failed to decline swap');
    }
}

async function confirmSwap(swapId) {
    if (!confirm('Confirm that the plant handoff is complete?')) return;
    try {
        const res = await fetch(`${API}/api/swaps/${swapId}/confirm`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            openChat(swapId);
        } else {
            const data = await res.json();
            alert(data.detail || 'Failed to confirm');
        }
    } catch (err) {
        alert('Failed to confirm swap');
    }
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
        const btnScore = parseInt(btn.dataset.score);
        btn.classList.toggle('active', btnScore <= score);
    });
}

async function handleRating(e) {
    e.preventDefault();
    if (!selectedRating) { alert('Please select a rating'); return; }

    const comment = document.getElementById('rating-comment').value.trim();

    try {
        const res = await fetch(`${API}/api/swaps/${currentSwapId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
