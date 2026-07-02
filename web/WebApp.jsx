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
            {[['browse','Browse'],['home','How it works'],['home','Community']].map(([id, label], i) => (
              <span key={i} onClick={() => onNavigate(id)} style={{ ...figtree, fontSize: 17, fontWeight: 600, color: page === id && i === 0 ? B.green : '#3c4b40', cursor: 'pointer' }}>{label}</span>
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
  const PER = 6;
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
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: B.cream }}>
      <BloomNav page={page} user={user} onNavigate={navigate} notifCount={2} />
      <div style={{ flex: 1 }}>
        {page === 'home'    && <BloomHome onNavigate={navigate} DS={DS} listings={listings} />}
        {page === 'browse'  && <BrowseView DS={DS} listings={listings} onOpenListing={l => navigate('detail', { listing: l })} />}
        {page === 'detail'  && <DetailView DS={DS} listing={listing} onBack={() => navigate('browse')} onViewProfile={() => navigate('profile')} />}
        {(page === 'profile' || page === 'listings' || page === 'swaps') && <ProfileView DS={DS} user={user} listings={listings} onViewListing={l => navigate('detail', { listing: l })} />}
      </div>
      <BloomFooter onNavigate={navigate} />
    </div>
  );
}

module.exports = { GardenSwapWebApp };
