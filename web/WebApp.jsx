/* Garden Swap — WebApp.jsx (Bloom design system) */

// ── Shared helpers ─────────────────────────────────────────────────────────

const B = {
  green:       '#2E7D52',
  cream:       '#FFFBF5',
  orange:      '#DD7A2E',
  yellow:      '#E9B949',
  lightYellow: '#FBE6B0',
  darkText:    '#23302a',
  softText:    '#46544a',
  faintText:   '#6b7568',
  border:      '#E7DFC8',
  white:       '#fff',
  darkGreen:   '#1f4a32',
  cardShadow:  '0 8px 22px rgba(31,74,50,.08)',
};

const outfit = { fontFamily: 'Outfit, sans-serif' };
const figtree = { fontFamily: 'Figtree, sans-serif' };

function btnPrimary(extra) {
  return { ...figtree, background: B.orange, color: B.white, fontWeight: 700, fontSize: 18, padding: '16px 30px', borderRadius: 999, border: 'none', boxShadow: '0 8px 20px rgba(221,122,46,.30)', cursor: 'pointer', ...extra };
}
function btnSecondary(extra) {
  return { ...figtree, background: B.white, border: `2px solid ${B.green}`, color: B.green, fontWeight: 700, fontSize: 18, padding: '14px 28px', borderRadius: 999, cursor: 'pointer', ...extra };
}
function btnGreen(extra) {
  return { ...figtree, background: B.green, color: B.white, fontWeight: 700, fontSize: 17, padding: '13px 26px', borderRadius: 999, border: 'none', boxShadow: '0 6px 16px rgba(46,125,82,.28)', cursor: 'pointer', ...extra };
}

// ── BloomNav ───────────────────────────────────────────────────────────────

function BloomNav({ page, onNavigate, notifCount, user }) {
  return (
    <header style={{ background: B.cream, borderBottom: `1px solid ${B.border}`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div onClick={() => onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: B.green }} />
            <span style={{ ...outfit, fontWeight: 800, fontSize: 25, color: B.green }}>Garden Swap</span>
          </div>
          <nav style={{ display: 'flex', gap: 28 }}>
            {[['browse','Browse'],['events','Events'],['home','How it works']].map(([id, label]) => (
              <span key={id} onClick={() => onNavigate(id)} style={{ ...figtree, fontSize: 17, fontWeight: 600, color: page === id ? B.green : '#3c4b40', cursor: 'pointer' }}>{label}</span>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {notifCount > 0 && <span style={{ background: B.orange, color: B.white, borderRadius: 999, fontSize: 12, fontWeight: 700, padding: '2px 10px' }}>{notifCount}</span>}
          <span onClick={() => onNavigate('profile')} style={{ ...figtree, fontSize: 17, fontWeight: 600, color: '#3c4b40', cursor: 'pointer' }}>Sign in</span>
          <button onClick={() => onNavigate('browse')} style={btnGreen()}>Join free</button>
        </div>
      </div>
    </header>
  );
}

// ── BloomFooter ────────────────────────────────────────────────────────────

function BloomFooter({ onNavigate }) {
  return (
    <footer style={{ background: B.darkGreen, padding: '40px 44px', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ ...outfit, fontSize: 18, fontWeight: 800, color: B.white, marginBottom: 6 }}>🌿 Garden Swap</div>
          <div style={{ ...figtree, fontSize: 14, color: 'rgba(255,255,255,.6)' }}>Hyper-local plant trading · Bangalore</div>
        </div>
        {[['Browse','browse'],['Profile','profile'],['About','home']].map(([label, id]) => (
          <button key={id} onClick={() => onNavigate(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.6)', fontSize: 14, ...figtree }}>{label}</button>
        ))}
      </div>
    </footer>
  );
}

// ── BloomHome ──────────────────────────────────────────────────────────────

function BloomHome({ onNavigate, DS, listings }) {
  const { PlantCard } = DS;
  const all = listings || [];
  const PER = 8;
  const [pg, setPg] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(all.length / PER));
  const featured = all.slice((pg - 1) * PER, pg * PER);
  const heroImgs = [
    { src: './assets/plant-begonia.jpeg',   alt: 'Begonia',   rot: '-2deg'  },
    { src: './assets/plant-hibiscus.jpeg',  alt: 'Hibiscus',  rot: '1deg'   },
    { src: './assets/plant-caladium.jpeg',  alt: 'Caladium',  rot: '-1deg'  },
    { src: './assets/plant-succulent.jpeg', alt: 'Succulent', rot: '2deg'   },
  ];
  const cats = ['🌿 Tropicals','🌵 Succulents','✂️ Cuttings','🌱 Seedlings','🌺 Flowering','🌾 Herbs'];

  return (
    <div style={{ background: B.cream, ...figtree }}>
      {/* Hero */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <section style={{
          background: 'linear-gradient(135deg, #ECF7EC, #FBF1D8)',
          borderRadius: 30,
          padding: '56px 52px',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 48,
          alignItems: 'center',
          margin: '16px 0',
        }}>
          {/* Left */}
          <div>
            <span style={{ display: 'inline-block', background: B.lightYellow, color: '#8A6314', fontWeight: 700, fontSize: 14, letterSpacing: '.06em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 999, marginBottom: 22 }}>
              🌱 grow together
            </span>
            <h1 style={{ ...outfit, fontWeight: 800, fontSize: 54, lineHeight: 1.04, letterSpacing: '-.02em', color: B.darkGreen, marginBottom: 24 }}>
              Swap plants with gardeners down the lane.
            </h1>
            <p style={{ fontSize: 21, lineHeight: 1.55, color: B.softText, marginBottom: 30, maxWidth: 470 }}>
              Swap cuttings, share seedlings, and meet the green-thumbs on your street. It's free, friendly and a little bit addictive.
            </p>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', background: B.white, border: `1px solid ${B.border}`, borderRadius: 999, padding: '8px 8px 8px 24px', maxWidth: 480, boxShadow: '0 6px 22px rgba(31,74,50,.07)', marginBottom: 24 }}>
              <span style={{ fontSize: 16, color: '#8a857a', flex: 1 }}>Search "monstera", "tomato seeds"…</span>
              <button onClick={() => onNavigate('browse')} style={btnGreen({ fontSize: 16, padding: '11px 22px' })}>Search</button>
            </div>
            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('browse')} style={btnPrimary()}>Start swapping</button>
              <button onClick={() => onNavigate('browse')} style={btnSecondary()}>See how it works</button>
            </div>
            <p style={{ fontSize: 16, color: B.faintText }}>★ 1,240 plants rehomed this month · free to join</p>
          </div>
          {/* Right — 2×2 image grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {heroImgs.map(({ src, alt, rot }) => (
              <img key={alt} src={src} alt={alt} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 24, transform: `rotate(${rot})`, boxShadow: '0 10px 24px rgba(31,74,50,.16)' }} />
            ))}
          </div>
        </section>
      </div>

      {/* Category chips */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 44px 0' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => onNavigate('browse')} style={{ ...figtree, background: B.white, border: `1px solid ${B.border}`, color: B.darkText, fontWeight: 600, fontSize: 15, padding: '10px 20px', borderRadius: 999, cursor: 'pointer', boxShadow: B.cardShadow }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Featured listings */}
      {featured.length > 0 && (
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 44px 64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <h2 style={{ ...outfit, fontWeight: 700, fontSize: 28, color: B.darkText }}>Plants near you</h2>
            <button onClick={() => onNavigate('browse')} style={{ ...figtree, background: 'none', border: 'none', color: B.green, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>See all →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {featured.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} onClick={() => onNavigate('browse')} />)}
          </div>
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
              <button onClick={() => setPg(p => Math.max(1, p - 1))} disabled={pg <= 1} style={{ ...figtree, padding: '10px 24px', border: `1px solid ${B.border}`, borderRadius: 999, background: B.white, cursor: pg <= 1 ? 'default' : 'pointer', opacity: pg <= 1 ? .4 : 1, fontWeight: 600, fontSize: 15 }}>← Prev</button>
              <span style={{ ...figtree, fontSize: 14, color: B.softText }}>{pg} / {totalPages}</span>
              <button onClick={() => setPg(p => Math.min(totalPages, p + 1))} disabled={pg >= totalPages} style={{ ...figtree, padding: '10px 24px', border: `1px solid ${B.border}`, borderRadius: 999, background: B.white, cursor: pg >= totalPages ? 'default' : 'pointer', opacity: pg >= totalPages ? .4 : 1, fontWeight: 600, fontSize: 15 }}>Next →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── BrowseView ─────────────────────────────────────────────────────────────

function BloomSidebar({ filters, onChange, onClear, resultCount }) {
  const types = ['Houseplant','Succulent','Cutting','Herb','Vegetable','Seed'];
  const lights = ['Full Sun','Partial Sun','Low Light','Shade'];
  return (
    <aside style={{ width: 248, flexShrink: 0, background: B.white, border: `1px solid ${B.border}`, borderRadius: 24, padding: '24px 20px', position: 'sticky', top: 90, boxShadow: B.cardShadow }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ ...figtree, fontWeight: 700, fontSize: 16, color: B.darkText }}>Filters</span>
        <button onClick={onClear} style={{ ...figtree, background: 'none', border: 'none', cursor: 'pointer', color: B.green, fontSize: 14, fontWeight: 600 }}>Clear</button>
      </div>
      {[['Status', ['free','swap'], 'status'], ['Plant Type', types, 'type'], ['Light', lights, 'light']].map(([label, opts, key]) => (
        <div key={key} style={{ marginBottom: 18 }}>
          <div style={{ ...figtree, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: B.softText, marginBottom: 10 }}>{label}</div>
          {opts.map(o => (
            <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', ...figtree, fontSize: 15, color: B.darkText }}>
              <input type="checkbox" checked={filters[key] === o} onChange={() => onChange({ ...filters, [key]: filters[key] === o ? undefined : o })} />
              {key === 'status' ? (o === 'free' ? '🎁 Free' : '🔄 Swap') : o}
            </label>
          ))}
        </div>
      ))}
      <div style={{ paddingTop: 14, borderTop: `1px solid ${B.border}`, ...figtree, fontSize: 13, color: B.softText }}>{resultCount} result{resultCount !== 1 ? 's' : ''}</div>
    </aside>
  );
}

function BrowseView({ DS, listings, onOpenListing }) {
  const { PlantCard } = DS;
  const [filters, setFilters] = React.useState({});
  const [pg, setPg] = React.useState(1);
  const PER = 9;
  const all = listings || [];
  const filtered = all.filter(l => {
    if (filters.type   && l.plantType !== filters.type)   return false;
    if (filters.status && l.status    !== filters.status) return false;
    if (filters.light  && l.light     !== filters.light)  return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const items = filtered.slice((pg - 1) * PER, pg * PER);
  const setF = f => { setFilters(f); setPg(1); };

  return (
    <div style={{ background: B.cream, ...figtree, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 44px 64px' }}>
        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: B.softText, marginBottom: 8 }}>
            <span style={{ color: B.green, cursor: 'pointer' }}>Home</span> / Browse Plants
          </div>
          <h1 style={{ ...outfit, fontWeight: 800, fontSize: 40, color: B.darkText, marginBottom: 16 }}>Plants near you</h1>
          {/* Search bar */}
          <div style={{ display: 'flex', alignItems: 'center', background: B.white, border: `1px solid ${B.border}`, borderRadius: 999, padding: '8px 8px 8px 24px', maxWidth: 560, boxShadow: '0 6px 22px rgba(31,74,50,.07)', marginBottom: 16 }}>
            <span style={{ fontSize: 15, color: '#8a857a', flex: 1 }}>Search plants…</span>
            <button style={btnGreen({ fontSize: 15, padding: '10px 22px' })}>Search</button>
          </div>
          <p style={{ fontSize: 15, color: B.softText }}>{filtered.length} listings · within 10 km</p>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          <BloomSidebar filters={filters} onChange={setF} onClear={() => setF({})} resultCount={filtered.length} />
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {items.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} onClick={() => onOpenListing(l)} />)}
            </div>
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                <button onClick={() => setPg(p => Math.max(1, p - 1))} disabled={pg <= 1} style={{ ...figtree, padding: '10px 20px', border: `1px solid ${B.border}`, borderRadius: 999, background: B.white, cursor: pg <= 1 ? 'default' : 'pointer', opacity: pg <= 1 ? .4 : 1, fontWeight: 600 }}>← Prev</button>
                <span style={{ padding: '10px 16px', fontSize: 14, color: B.softText }}>Page {pg} of {totalPages}</span>
                <button onClick={() => setPg(p => Math.min(totalPages, p + 1))} disabled={pg >= totalPages} style={{ ...figtree, padding: '10px 20px', border: `1px solid ${B.border}`, borderRadius: 999, background: B.white, cursor: pg >= totalPages ? 'default' : 'pointer', opacity: pg >= totalPages ? .4 : 1, fontWeight: 600 }}>Next →</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ── DetailView ─────────────────────────────────────────────────────────────

function DetailView({ DS, listing, onBack, onViewProfile }) {
  const { Badge, Icon, StarRating, PlantCard } = DS;
  const [requested, setRequested] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [thumb, setThumb] = React.useState(0);
  if (!listing) return null;

  const thumbs = [listing.image];
  const others = (window.GS_LISTINGS || []).filter(l => l.id !== listing.id).slice(0, 3);

  const TagPill = ({ children }) => (
    <span style={{ ...figtree, display: 'inline-block', background: B.white, border: `1px solid ${B.border}`, color: B.softText, fontSize: 14, fontWeight: 500, padding: '6px 14px', borderRadius: 999 }}>{children}</span>
  );

  return (
    <div style={{ background: B.cream, ...figtree, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 44px 72px' }}>
        <div style={{ fontSize: 14, color: B.softText, marginBottom: 24 }}>
          <span onClick={onBack} style={{ color: B.green, cursor: 'pointer' }}>Home</span>
          {' / '}
          <span onClick={onBack} style={{ color: B.green, cursor: 'pointer' }}>Browse Plants</span>
          {' / '}
          <span>{listing.title}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 52, alignItems: 'flex-start' }}>
          {/* Gallery */}
          <div>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 32px rgba(31,74,50,.12)' }}>
              <img src={thumbs[thumb]} alt={listing.title} style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block', background: '#ECF7EC' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              {thumbs.map((src, i) => (
                <img key={i} src={src} alt="" onClick={() => setThumb(i)} style={{ width: 88, height: 66, objectFit: 'cover', borderRadius: 12, cursor: 'pointer', border: i === thumb ? `2px solid ${B.green}` : `2px solid ${B.border}`, background: '#ECF7EC' }} />
              ))}
            </div>
          </div>
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge variant={listing.status === 'free' ? 'free' : 'swap'}>{listing.status === 'free' ? 'Free' : 'Swap'}</Badge>
              {listing.rarity    && <Badge variant="rarity">{listing.rarity}</Badge>}
              {listing.plantType && <Badge variant="type">{listing.plantType}</Badge>}
            </div>
            <h1 style={{ ...outfit, fontWeight: 800, fontSize: 36, lineHeight: 1.1, color: B.darkText }}>{listing.title}</h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {listing.light     && <TagPill>☀️ {listing.light}</TagPill>}
              {listing.condition && <TagPill>📐 {listing.condition}</TagPill>}
              {listing.size      && <TagPill>🪴 {listing.size} plant</TagPill>}
              {listing.distance  && <TagPill>📍 {listing.distance}</TagPill>}
            </div>
            <p style={{ fontSize: 16, color: B.softText, lineHeight: 1.65 }}>{listing.desc}</p>
            <div style={{ height: 1, background: B.border }} />
            {/* Owner card */}
            <div onClick={onViewProfile} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 20, background: B.white, border: `1px solid ${B.border}`, cursor: 'pointer', boxShadow: B.cardShadow }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: B.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: B.white, flexShrink: 0 }}>{(listing.lister || '?').charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: B.darkText }}>{listing.lister}</div>
                <div style={{ fontSize: 13, color: B.softText, marginTop: 2 }}>Grower · 14 swaps completed</div>
              </div>
              <StarRating value={listing.rating} />
            </div>
            {/* CTAs */}
            {requested
              ? <div style={{ padding: '16px 20px', background: '#ECF7EC', borderRadius: 16, border: `1px solid ${B.green}`, color: B.darkGreen, fontWeight: 600 }}>✅ Request sent! {listing.lister} will get back to you within 48 hours.</div>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button onClick={() => setRequested(true)} style={btnPrimary({ width: '100%', fontSize: 17, padding: '18px 24px' })}>
                    {listing.status === 'free' ? '🎁 Request to Collect' : '🔄 Request Swap'}
                  </button>
                  <button onClick={() => setSaved(s => !s)} style={btnSecondary({ width: '100%', fontSize: 17, padding: '16px 24px' })}>
                    {saved ? '❤️ Saved to Wishlist' : '🤍 Save to Wishlist'}
                  </button>
                </div>}
          </div>
        </div>
        {/* More near you */}
        {others.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <h2 style={{ ...outfit, fontWeight: 700, fontSize: 28, color: B.darkText, marginBottom: 24 }}>More near you</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {others.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} onClick={() => {}} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ProfileView ────────────────────────────────────────────────────────────

function ProfileView({ DS, user, listings, onViewListing }) {
  const { TierBadge, PlantCard, Badge, StarRating } = DS;
  const [tab, setTab] = React.useState('listings');
  listings = (listings || []).slice(0, 6);
  const wishlist = window.GS_WISHLIST || [];
  const chats = window.GS_CHATS || [];
  const tabs = [['listings','My Listings',6],['swaps','Swap History',14],['wishlist','Wishlist',wishlist.length],['reviews','Reviews',8]];
  const reviews = [
    { from: 'Arjun', text: 'Quick and easy swap, plant was exactly as described!', rating: 5, date: '2 weeks ago' },
    { from: 'Meera', text: 'Really healthy cuttings. Super helpful and responsive.', rating: 5, date: '1 month ago' },
    { from: 'Kabir', text: 'Great experience overall. Would swap again.', rating: 4, date: '2 months ago' },
  ];
  const stats = [['6','Listings'],['14','Swaps'],['4.9','Rating'],['8','Reviews']];

  return (
    <div style={{ background: B.cream, ...figtree, minHeight: '100vh', paddingBottom: 72 }}>
      {/* Banner */}
      <div style={{ height: 200, background: 'linear-gradient(130deg, #1f4a32, #2E7D52 60%, #A6C98A)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: -46, left: 44, width: 94, height: 94, borderRadius: '50%', border: `4px solid ${B.cream}`, background: '#A6C98A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: 700, color: B.darkGreen, boxShadow: '0 6px 20px rgba(31,74,50,.2)' }}>P</div>
      </div>
      {/* Identity row */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 44px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 style={{ ...outfit, fontWeight: 800, fontSize: 28, color: B.darkText }}>{user.name}</h1>
            <TierBadge tier={user.tier || 'grower'} />
          </div>
          <p style={{ fontSize: 15, color: B.softText }}>Plant enthusiast · Bangalore, India · Member since Jan 2024</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={btnSecondary({ fontSize: 15, padding: '12px 22px' })}>Edit Profile</button>
          <button style={btnGreen({ fontSize: 15, padding: '12px 22px' })}>+ Add Listing</button>
        </div>
      </div>
      {/* Stat cards */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 44px 28px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 20, padding: '20px 32px', textAlign: 'center', flex: '1 1 120px', boxShadow: B.cardShadow }}>
            <div style={{ ...outfit, fontSize: 32, fontWeight: 800, color: B.darkText }}>{v}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: B.softText, textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Tab bar */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 44px', borderBottom: `2px solid ${B.border}`, display: 'flex', gap: 4 }}>
        {tabs.map(([id, label, count]) => (
          <button key={id} onClick={() => setTab(id)} style={{ ...figtree, background: 'none', border: 'none', cursor: 'pointer', padding: '14px 20px', fontWeight: tab === id ? 700 : 500, fontSize: 15, color: tab === id ? B.green : B.softText, borderBottom: tab === id ? `2px solid ${B.green}` : '2px solid transparent', marginBottom: -2 }}>
            {label} <span style={{ marginLeft: 6, padding: '2px 8px', borderRadius: 999, background: tab === id ? B.lightYellow : B.border, color: tab === id ? '#8A6314' : B.softText, fontSize: 12, fontWeight: 700 }}>{count}</span>
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 44px' }}>
        {tab === 'listings' && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>{listings.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} distance={l.distance} rating={l.rating} lister={l.lister} onClick={() => onViewListing(l)} />)}</div>}
        {tab === 'wishlist' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600 }}>{wishlist.map(item => <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: B.white, border: `1px solid ${B.border}`, borderRadius: 16, boxShadow: B.cardShadow }}><span style={{ fontSize: 18 }}>❤️</span><span style={{ ...outfit, fontSize: 16, color: B.darkText, flex: 1 }}>{item}</span></div>)}</div>}
        {tab === 'swaps' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 700 }}>{chats.map(c => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: B.white, border: `1px solid ${B.border}`, borderRadius: 16, boxShadow: B.cardShadow }}><div style={{ width: 42, height: 42, borderRadius: '50%', background: '#ECF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: B.darkGreen, flexShrink: 0 }}>{c.other.charAt(0)}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 15, color: B.darkText }}>{c.listingTitle}</div><div style={{ fontSize: 13, color: B.softText, marginTop: 2 }}>with {c.other}</div></div><Badge variant={c.state}>{c.state}</Badge></div>)}</div>}
        {tab === 'reviews' && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>{reviews.map((r, i) => <div key={i} style={{ padding: '20px', background: B.white, border: `1px solid ${B.border}`, borderRadius: 20, boxShadow: B.cardShadow }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}><div style={{ width: 36, height: 36, borderRadius: '50%', background: '#ECF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem', fontWeight: 700, color: B.darkGreen, flexShrink: 0 }}>{r.from.charAt(0)}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14, color: B.darkText }}>{r.from}</div><div style={{ fontSize: 12, color: B.softText }}>{r.date}</div></div><StarRating value={r.rating} /></div><p style={{ fontSize: 14, color: B.softText, lineHeight: 1.6, margin: 0 }}>{r.text}</p></div>)}</div>}
      </div>
    </div>
  );
}

// ── Events ─────────────────────────────────────────────────────────────────

const SAMPLE_EVENTS = [
  { id:1, title:'Bangalore Plant Swap Meet', date:'2026-07-12', time:'10:00 AM', location:'Cubbon Park Lawn', address:'Kasturba Road, Bengaluru', max_attendees:40, handling_fee:0, going:18, plants:24, organiser:'Priya Sharma', upcoming:true, image:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80', description:'Our monthly community plant swap in the heart of Bangalore. Bring cuttings, seeds, or pots to swap. Free entry, all are welcome. Come early for the best picks!' },
  { id:2, title:'Succulent & Cactus Circle', date:'2026-07-19', time:'4:00 PM', location:'Indiranagar Community Hall', address:'100 Feet Road, Indiranagar', max_attendees:20, handling_fee:50, going:11, plants:30, organiser:'Deepak Rao', upcoming:true, image:'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80', description:'Dedicated swap for succulent and cactus lovers. Small ₹50 handling fee to cover venue. Bring your rarest rosettes!' },
  { id:3, title:'Monstera Madness Swap', date:'2026-06-21', time:'11:00 AM', location:'Koramangala Social', address:'1st Block, Koramangala', max_attendees:30, handling_fee:0, going:27, plants:41, organiser:'Faizan Ahmed', upcoming:false, image:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80', description:'A past event dedicated to aroids, monsteras, and rare tropicals. Over 40 plants found new homes.' },
];

function BloomEventCard({ event, onClick }) {
  const isPast = !event.upcoming;
  return (
    <div onClick={onClick} style={{ background: B.white, borderRadius: 22, boxShadow: B.cardShadow, overflow: 'hidden', cursor: 'pointer', opacity: isPast ? .72 : 1, borderTop: `3px solid ${isPast ? B.border : B.green}` }}>
      <div style={{ position: 'relative' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', filter: isPast ? 'grayscale(40%)' : 'none' }} />
        {isPast && <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,.45)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, ...figtree }}>Past event</div>}
        {!isPast && event.handling_fee === 0 && <div style={{ position: 'absolute', top: 10, right: 10, background: B.green, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, ...figtree }}>Free</div>}
        {!isPast && event.handling_fee > 0 && <div style={{ position: 'absolute', top: 10, right: 10, background: B.orange, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, ...figtree }}>₹{event.handling_fee}</div>}
      </div>
      <div style={{ padding: '16px 18px' }}>
        <h3 style={{ ...outfit, fontWeight: 700, fontSize: 17, color: B.darkText, marginBottom: 8, lineHeight: 1.2 }}>{event.title}</h3>
        <div style={{ ...figtree, fontSize: 13, color: B.softText, marginBottom: 6 }}>📅 {event.date} · {event.time}</div>
        <div style={{ ...figtree, fontSize: 13, color: B.softText, marginBottom: 12 }}>📍 {event.location}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ ...figtree, fontSize: 12, fontWeight: 600, background: '#ECF7EC', color: B.green, padding: '4px 10px', borderRadius: 999 }}>✓ {event.going} going</span>
          <span style={{ ...figtree, fontSize: 12, fontWeight: 600, background: B.lightYellow, color: '#8A6314', padding: '4px 10px', borderRadius: 999 }}>🌿 {event.plants} plants</span>
        </div>
      </div>
    </div>
  );
}

function CreateEventModal({ onClose }) {
  const [form, setForm] = React.useState({ title:'', desc:'', location:'', address:'', date:'', time:'10:00 AM', max:20, fee:0 });
  const times = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,74,50,.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: B.cream, borderRadius: '24px 24px 0 0', padding: '32px 28px 40px', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', ...figtree }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ ...outfit, fontWeight: 800, fontSize: 22, color: B.darkText }}>Create Event</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: B.softText }}>✕</button>
        </div>
        {[['Title','title','text'],['Description','desc','text'],['Location name','location','text'],['Address','address','text']].map(([label, key, type]) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: B.darkText, marginBottom: 6 }}>{label}</label>
            <input type={type} value={form[key]} onChange={e => set(key)(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${B.border}`, borderRadius: 12, fontSize: 15, background: B.white, ...figtree, boxSizing: 'border-box' }} />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: B.darkText, marginBottom: 6 }}>Date</label>
          <input type="date" value={form.date} onChange={e => set('date')(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${B.border}`, borderRadius: 12, fontSize: 15, background: B.white, ...figtree, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: B.darkText, marginBottom: 8 }}>Time</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {times.map(t => <button key={t} onClick={() => set('time')(t)} style={{ ...figtree, padding: '8px 14px', borderRadius: 999, border: `1px solid ${form.time === t ? B.green : B.border}`, background: form.time === t ? '#ECF7EC' : B.white, color: form.time === t ? B.green : B.softText, fontWeight: form.time === t ? 700 : 500, fontSize: 13, cursor: 'pointer' }}>{t}</button>)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: B.darkText, marginBottom: 6 }}>Max attendees</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${B.border}`, borderRadius: 12, padding: '8px 16px', background: B.white }}>
              <button onClick={() => set('max')(Math.max(1, form.max - 1))} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: B.green, fontWeight: 700 }}>−</button>
              <span style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 16, color: B.darkText }}>{form.max}</span>
              <button onClick={() => set('max')(form.max + 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: B.green, fontWeight: 700 }}>+</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: B.darkText, marginBottom: 6 }}>Handling fee (₹)</label>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${B.border}`, borderRadius: 12, padding: '8px 16px', background: B.white }}>
              <span style={{ color: B.softText, marginRight: 8 }}>₹</span>
              <input type="number" min="0" value={form.fee} onChange={e => set('fee')(Number(e.target.value))} style={{ border: 'none', background: 'none', fontSize: 15, width: '100%', ...figtree, outline: 'none' }} />
            </div>
          </div>
        </div>
        <button style={btnPrimary({ width: '100%', fontSize: 17, padding: '18px' })} onClick={onClose}>Post Event</button>
      </div>
    </div>
  );
}

function PreBookModal({ plant, onClose, onConfirm }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,74,50,.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: B.white, borderRadius: 24, padding: '32px 28px', width: '100%', maxWidth: 400, ...figtree }}>
        <img src={plant.image} alt={plant.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 20 }} />
        <h3 style={{ ...outfit, fontWeight: 800, fontSize: 20, color: B.darkText, marginBottom: 10 }}>{plant.title}</h3>
        <p style={{ fontSize: 14, color: B.softText, lineHeight: 1.6, marginBottom: 24 }}>You're reserving this plant. Collect it at the event using your QR code or 6-digit claim code shown to the seller.</p>
        <button onClick={onConfirm} style={btnPrimary({ width: '100%', fontSize: 16, padding: '16px' })}>Confirm Pre-book</button>
        <button onClick={onClose} style={{ ...figtree, width: '100%', marginTop: 10, background: 'none', border: 'none', color: B.softText, fontSize: 14, cursor: 'pointer', padding: '8px' }}>Cancel</button>
      </div>
    </div>
  );
}

function ClaimCodeScreen({ plant, onClose }) {
  const TOTAL = 60;
  const [secs, setSecs] = React.useState(TOTAL);
  const [code, setCode] = React.useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const token = React.useRef('GS-' + Math.random().toString(36).slice(2,10).toUpperCase());
  const R = 36, CIRC = 2 * Math.PI * R;

  React.useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          setCode(String(Math.floor(100000 + Math.random() * 900000)));
          return TOTAL;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(token.current)}&bgcolor=1f4a32&color=FFFBF5&margin=10`;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,74,50,.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: B.cream, borderRadius: 24, padding: '32px 28px', width: '100%', maxWidth: 480, ...figtree }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ ...outfit, fontWeight: 800, fontSize: 20, color: B.darkText }}>Your Claim Code</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: B.softText }}>✕</button>
        </div>
        <p style={{ fontSize: 14, color: B.softText, marginBottom: 24, textAlign: 'center' }}>Show this to the seller at the event to claim <strong>{plant.title}</strong></p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* QR panel */}
          <div style={{ background: B.darkGreen, borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={qrUrl} alt="QR Code" style={{ width: 160, height: 160, borderRadius: 8 }} />
          </div>
          {/* Code panel */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {code.split('').map((d, i) => (
                <div key={i} style={{ width: 40, height: 52, background: B.white, border: `2px solid ${B.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', ...outfit, fontSize: 24, fontWeight: 800, color: B.darkGreen, boxShadow: B.cardShadow }}>{d}</div>
              ))}
            </div>
            {/* Countdown ring */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <svg width={90} height={90}>
                <circle cx={45} cy={45} r={R} fill="none" stroke={B.border} strokeWidth={5} />
                <circle cx={45} cy={45} r={R} fill="none" stroke={B.green} strokeWidth={5}
                  strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - secs / TOTAL)}
                  strokeLinecap="round" transform="rotate(-90 45 45)" style={{ transition: 'stroke-dashoffset .9s linear' }} />
                <text x={45} y={50} textAnchor="middle" style={{ ...figtree, fontSize: 18, fontWeight: 700, fill: B.darkText }}>{secs}s</text>
              </svg>
              <span style={{ fontSize: 12, color: B.softText }}>Code refreshes every 60s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QRScannerOverlay({ onClose }) {
  const [manual, setManual] = React.useState(false);
  const [code, setCode] = React.useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', fontSize: 22, borderRadius: '50%', width: 44, height: 44, cursor: 'pointer' }}>✕</button>
      {!manual ? (
        <>
          <div style={{ position: 'relative', width: 260, height: 260 }}>
            <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,.15)', borderRadius: 16 }} />
            {[['0 0','tl'],['auto 0','tr'],['0 auto','bl'],['auto auto','br']].map(([inset, k]) => (
              <div key={k} style={{ position: 'absolute', width: 32, height: 32, top: inset.split(' ')[0] === '0' ? 0 : 'auto', bottom: inset.split(' ')[0] === 'auto' ? 0 : 'auto', left: inset.split(' ')[1] === '0' ? 0 : 'auto', right: inset.split(' ')[1] === 'auto' ? 0 : 'auto', borderTop: k.startsWith('t') ? `3px solid ${B.green}` : 'none', borderBottom: k.startsWith('b') ? `3px solid ${B.green}` : 'none', borderLeft: k.endsWith('l') ? `3px solid ${B.green}` : 'none', borderRight: k.endsWith('r') ? `3px solid ${B.green}` : 'none', borderRadius: k === 'tl' ? '8px 0 0 0' : k === 'tr' ? '0 8px 0 0' : k === 'bl' ? '0 0 0 8px' : '0 0 8px 0' }} />
            ))}
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: `${B.green}88`, transform: 'translateY(-50%)' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 24, ...figtree, fontSize: 15 }}>Point at the plant QR code</p>
          <button onClick={() => setManual(true)} style={{ marginTop: 16, background: 'none', border: 'none', color: B.green, fontSize: 14, fontWeight: 600, cursor: 'pointer', ...figtree }}>Enter code manually</button>
        </>
      ) : (
        <div style={{ background: B.cream, borderRadius: 24, padding: '32px 28px', width: '90%', maxWidth: 360, ...figtree }}>
          <h3 style={{ ...outfit, fontWeight: 800, fontSize: 20, color: B.darkText, marginBottom: 16 }}>Enter claim code</h3>
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="6-digit code" maxLength={6} style={{ width: '100%', padding: '14px 18px', border: `1px solid ${B.border}`, borderRadius: 12, fontSize: 22, textAlign: 'center', letterSpacing: '0.3em', ...outfit, fontWeight: 700, boxSizing: 'border-box', marginBottom: 16 }} />
          <button style={btnPrimary({ width: '100%', fontSize: 16, padding: '16px' })} onClick={onClose}>Verify Code</button>
          <button onClick={() => setManual(false)} style={{ ...figtree, width: '100%', marginTop: 10, background: 'none', border: 'none', color: B.softText, fontSize: 14, cursor: 'pointer' }}>← Back to scanner</button>
        </div>
      )}
    </div>
  );
}

function BloomEventDetail({ event, onBack, listings }) {
  const [going, setGoing] = React.useState(false);
  const [prebook, setPrebook] = React.useState(null);
  const [claim, setClaim] = React.useState(null);
  const [scanner, setScanner] = React.useState(false);
  const plants = listings.slice(0, 6);
  const attendees = ['Priya','Faizan','Rachel','Deepak','Amina','Joel'];

  return (
    <div style={{ background: B.cream, ...figtree, minHeight: '100vh' }}>
      {prebook && <PreBookModal plant={prebook} onClose={() => setPrebook(null)} onConfirm={() => { setClaim(prebook); setPrebook(null); }} />}
      {claim && <ClaimCodeScreen plant={claim} onClose={() => setClaim(null)} />}
      {scanner && <QRScannerOverlay onClose={() => setScanner(false)} />}
      {/* Hero */}
      <div style={{ position: 'relative', height: 280 }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(31,74,50,.7))' }} />
        <button onClick={onBack} style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', fontSize: 20, borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', backdropFilter: 'blur(4px)' }}>←</button>
        <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
          <h1 style={{ ...outfit, fontWeight: 800, fontSize: 26, color: '#fff', lineHeight: 1.15, marginBottom: 6 }}>{event.title}</h1>
          <div style={{ ...figtree, fontSize: 14, color: 'rgba(255,255,255,.85)' }}>by {event.organiser}</div>
        </div>
      </div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px 80px' }}>
        {/* Info block */}
        <div style={{ background: B.white, borderRadius: 20, padding: '20px 22px', boxShadow: B.cardShadow, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['📅',`${event.date} · ${event.time}`],['📍',event.location],['👥',`Max ${event.max_attendees} attendees`],['💸',event.handling_fee === 0 ? 'Free entry' : `₹${event.handling_fee} handling fee`]].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 14, color: B.softText, lineHeight: 1.45 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 15, color: B.softText, lineHeight: 1.7, marginBottom: 24 }}>{event.description}</p>
        {/* RSVP */}
        <button onClick={() => setGoing(g => !g)} style={going ? btnSecondary({ width: '100%', fontSize: 17, padding: '18px', marginBottom: 24 }) : btnPrimary({ width: '100%', fontSize: 17, padding: '18px', marginBottom: 24 })}>
          {going ? '✓ I\'m Going' : 'Join Event'}
        </button>
        {/* Attendees */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ ...outfit, fontWeight: 700, fontSize: 18, color: B.darkText, marginBottom: 14 }}>Going ({event.going + (going ? 1 : 0)})</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {attendees.map(name => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: B.white, border: `1px solid ${B.border}`, borderRadius: 999, padding: '6px 14px 6px 8px', boxShadow: B.cardShadow }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: B.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>{name[0]}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: B.darkText }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Plants being brought */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ ...outfit, fontWeight: 700, fontSize: 18, color: B.darkText }}>Plants being brought ({event.plants})</h3>
            <button onClick={() => setScanner(true)} style={btnGreen({ fontSize: 13, padding: '8px 16px' })}>📷 Scan QR</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {plants.map(p => (
              <div key={p.id} style={{ background: B.white, borderRadius: 16, overflow: 'hidden', boxShadow: B.cardShadow }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ ...figtree, fontSize: 13, fontWeight: 600, color: B.darkText, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</div>
                  <button onClick={() => setPrebook(p)} style={btnGreen({ fontSize: 12, padding: '7px 14px', width: '100%' })}>Pre-book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BloomEvents({ onNavigate, onOpenEvent }) {
  const [events, setEvents] = React.useState(SAMPLE_EVENTS);
  const [showCreate, setShowCreate] = React.useState(false);
  const upcoming = events.filter(e => e.upcoming);
  const past = events.filter(e => !e.upcoming);

  React.useEffect(() => {
    fetch('/api/events').then(r => r.json()).then(data => {
      const items = Array.isArray(data) ? data : (data.events || []);
      if (items.length) setEvents(items.map(e => ({ ...e, upcoming: new Date(e.event_date) >= new Date() })));
    }).catch(() => {});
  }, []);

  return (
    <div style={{ background: B.cream, ...figtree, minHeight: '100vh' }}>
      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} />}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 44px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h1 style={{ ...outfit, fontWeight: 800, fontSize: 40, color: B.darkText, marginBottom: 6 }}>Plant Swap Events</h1>
            <p style={{ fontSize: 16, color: B.softText }}>Meet fellow gardeners, swap in person, and find rare plants.</p>
          </div>
          <button onClick={() => setShowCreate(true)} style={btnPrimary({ fontSize: 15, padding: '14px 24px' })}>+ Host an Event</button>
        </div>
        {upcoming.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ ...outfit, fontWeight: 700, fontSize: 24, color: B.darkText, marginBottom: 20 }}>Upcoming</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {upcoming.map(e => <BloomEventCard key={e.id} event={e} onClick={() => onOpenEvent(e)} />)}
            </div>
          </div>
        )}
        {past.length > 0 && (
          <div>
            <h2 style={{ ...outfit, fontWeight: 700, fontSize: 24, color: B.darkText, marginBottom: 20 }}>Past Events</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {past.map(e => <BloomEventCard key={e.id} event={e} onClick={() => onOpenEvent(e)} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── App shell ──────────────────────────────────────────────────────────────

function mapListing(l) {
  const rating = l.user_rating || (l.rating_count ? l.rating_sum / l.rating_count : 4.5);
  return {
    id:        l.id,
    title:     l.title,
    status:    l.status,
    plantType: l.plant_type,
    condition: l.condition,
    rarity:    l.rarity,
    light:     l.light_needs,
    size:      l.size,
    distance:  l.distance_miles ? `${l.distance_miles.toFixed(1)} mi` : '—',
    lister:    l.display_name || l.username || 'Gardener',
    rating:    Math.round(rating * 10) / 10,
    image:     l.image_url,
    desc:      l.description,
  };
}

function GardenSwapWebApp() {
  const DS = window.GardenSwapDesignSystem_0373cf || {};
  const [page, setPage] = React.useState('home');
  const [listing, setListing] = React.useState(null);
  const [event, setEvent] = React.useState(null);
  const [listings, setListings] = React.useState((window.GS_LISTINGS || []).slice());
  const user = { name: 'Priya Sharma', tier: 'grower' };

  React.useEffect(() => {
    fetch('/api/listings?limit=50')
      .then(r => r.json())
      .then(data => {
        const items = Array.isArray(data) ? data : (data.listings || data.items || []);
        if (items.length) setListings(items.map(mapListing));
      })
      .catch(() => {});
  }, []);

  // expose for child components still reading window.GS_LISTINGS
  window.GS_LISTINGS = listings;

  const navigate = (p, data) => {
    setPage(p);
    if (data && data.listing) setListing(data.listing);
    if (data && data.event) setEvent(data.event);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: B.cream }}>
      <BloomNav page={page} user={user} onNavigate={navigate} notifCount={2} />
      <div style={{ flex: 1 }}>
        {page === 'home'        && <BloomHome onNavigate={navigate} DS={DS} listings={listings} />}
        {page === 'browse'      && <BrowseView DS={DS} listings={listings} onOpenListing={l => navigate('detail', { listing: l })} />}
        {page === 'detail'      && <DetailView DS={DS} listing={listing} onBack={() => navigate('browse')} onViewProfile={() => navigate('profile')} />}
        {page === 'events'      && <BloomEvents onNavigate={navigate} onOpenEvent={e => navigate('eventDetail', { event: e })} />}
        {page === 'eventDetail' && <BloomEventDetail event={event} onBack={() => navigate('events')} listings={listings} />}
        {(page === 'profile' || page === 'listings' || page === 'swaps') && <ProfileView DS={DS} user={user} listings={listings} onViewListing={l => navigate('detail', { listing: l })} />}
      </div>
      <BloomFooter onNavigate={navigate} />
    </div>
  );
}

module.exports = { GardenSwapWebApp };
