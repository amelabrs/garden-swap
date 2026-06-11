/* Garden Swap — Mobile App Template (MobileApp.jsx)
   Loaded via x-import in GardenSwapApp.dc.html.
   React injected by DC runtime. DS components from bundle. */

const GS = () => window.GardenSwapDesignSystem_0373cf || {};

/* ── Top bar ─────────────────────────────────────────────── */
function TopBar({ tier }) {
  const { Icon, Input } = GS();
  return (
    <header style={{ position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:'var(--pine-900)', color:'var(--text-on-dark)', flexWrap:'wrap' }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, flex:1, minWidth:0 }}>
        <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'var(--radius-full)', background:'var(--fern-500)', flexShrink:0 }}>
          <Icon name="leaf" size={17} color="var(--paper)" />
        </span>
        <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-lg)', fontWeight:500, whiteSpace:'nowrap', color:'var(--paper)', margin:0 }}>Garden Swap</h1>
      </div>
      <div style={{ display:'flex', gap:4 }}>
        {[['mapPin','Location'],['bell','Notifications'],['user','Profile']].map(([icon, label]) => (
          <button key={icon} title={label} aria-label={label} style={{ width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center', border:'none', borderRadius:'var(--radius-full)', background:'rgba(244,237,223,0.10)', cursor:'pointer' }}>
            <Icon name={icon} size={18} color="var(--paper)" />
          </button>
        ))}
      </div>
      <div style={{ flexBasis:'100%', position:'relative', display:'flex', alignItems:'center' }}>
        <span style={{ position:'absolute', left:14, display:'flex', pointerEvents:'none', opacity:0.7 }}><Icon name="search" size={16} color="var(--paper)" /></span>
        <Input variant="search" placeholder="Search plants near you…" style={{ paddingLeft:38 }} />
      </div>
    </header>
  );
}

/* ── Bottom nav ──────────────────────────────────────────── */
function BottomNav({ view, setView }) {
  const { Icon } = GS();
  const items = [['feed','Swap','leaf'],['chats','Chats','message'],['profile','Profile','user']];
  return (
    <nav style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:100, display:'flex', background:'var(--card)', borderTop:'1px solid var(--line)', padding:'8px 0 10px' }}>
      {items.map(([k, label, icon]) => {
        const active = view === k;
        return (
          <button key={k} onClick={() => setView(k)} style={{ flex:1, border:'none', background:'none', padding:'4px 8px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, fontFamily:'var(--font-sans)', fontSize:'var(--text-xs)', color:active?'var(--fern-600)':'var(--text-faint)', fontWeight:active?600:500 }}>
            <Icon name={icon} size={21} strokeWidth={active?2:1.75} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

/* ── Feed screen ─────────────────────────────────────────── */
function FeedScreen({ tier, onOpenListing, onOpenPaywall }) {
  const { PlantCard, Select, Icon } = GS();
  return (
    <div style={{ paddingBottom:16 }}>
      <div style={{ padding:'16px 16px 6px' }}>
        <div className="gs-eyebrow" style={{ display:'flex', alignItems:'center', gap:5 }}>
          <Icon name="mapPin" size={13} color="var(--clay-600)" /> Within 10 miles · 560001
        </div>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, marginTop:6, letterSpacing:'var(--tracking-tight)', margin:'6px 0 0' }}>
          Plants near you
        </h2>
      </div>
      <div style={{ display:'flex', gap:8, padding:'4px 16px 14px', flexWrap:'wrap' }}>
        <Select size="sm" options={['All Types','Houseplant','Succulent','Cutting','Seed','Herb']} />
        <Select size="sm" options={['All Status','Swap','Free']} />
        <Select size="sm" options={['10 mi','5 mi','25 mi']} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:14, padding:'0 16px' }}>
        {(window.GS_LISTINGS||[]).map((l, i) => (
          <React.Fragment key={l.id}>
            {tier==='sprout' && i===3 && (
              <div onClick={() => onOpenPaywall('ad_free')} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'linear-gradient(135deg,var(--yellow-ad-1),var(--yellow-ad-2))', border:'1px solid var(--yellow-ad-border)', borderRadius:'var(--radius-card)', cursor:'pointer' }}>
                <div style={{ flex:1 }}>
                  <div className="gs-eyebrow" style={{ color:'var(--yellow-ad-label)', display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name="sparkles" size={12} /> Sponsored
                  </div>
                  <strong style={{ fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--pine-700)', fontSize:'var(--text-md)', display:'block', marginTop:3 }}>Go ad-free with Grower</strong>
                  <span style={{ color:'var(--text-subtle)', fontSize:'var(--text-sm)' }}>Upgrade for ₹99/mo and never see ads again</span>
                </div>
                <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 14px', background:'var(--fern-600)', color:'var(--text-on-primary)', borderRadius:'var(--radius-pill)', fontSize:'var(--text-sm)', fontWeight:600, whiteSpace:'nowrap' }}>
                  Upgrade <Icon name="arrowRight" size={14} />
                </span>
              </div>
            )}
            <PlantCard image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} onClick={() => onOpenListing(l)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── Chats screen ────────────────────────────────────────── */
function ChatsScreen() {
  const { Badge, Icon } = GS();
  return (
    <div style={{ padding:16 }}>
      <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, marginBottom:14, letterSpacing:'var(--tracking-tight)', margin:'0 0 14px' }}>Your swaps</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {(window.GS_CHATS||[]).map(c => (
          <div key={c.id} style={{ padding:14, background:'var(--card)', borderRadius:'var(--radius-card)', border:'1px solid var(--line)', boxShadow:'var(--shadow)', cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:4 }}>
              <strong style={{ fontFamily:'var(--font-serif)', fontWeight:500, fontSize:'var(--text-md)' }}>{c.listingTitle}</strong>
              <Badge variant={c.state}>{c.state}</Badge>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'var(--text-sm)', color:'var(--text-subtle)', marginBottom:6 }}>
              with {c.other} · <Icon name={c.swapType==='trade'?'repeat':'gift'} size={13} /> {c.swapType==='trade'?'Swap':'Free'}
            </div>
            <div style={{ fontSize:'var(--text-sm)', color:'var(--text-faint)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.preview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Profile screen ──────────────────────────────────────── */
function ProfileScreen({ tier, onUpgrade }) {
  const { TierBadge, Button, PlantCard, Icon } = GS();
  return (
    <div style={{ padding:'0 0 16px' }}>
      <div style={{ background:'linear-gradient(160deg,var(--pine-900),var(--fern-600))', padding:'28px 16px 40px', textAlign:'center' }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--sage-300)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', fontWeight:700, color:'var(--pine-900)', margin:'0 auto 10px', border:'3px solid rgba(255,255,255,0.2)' }}>P</div>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, color:'var(--paper)', margin:'0 0 6px' }}>Priya Sharma</h2>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <TierBadge tier={tier} />
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-around', padding:'16px', borderBottom:'1px solid var(--line)' }}>
        {[['6','Listings'],['14','Swaps'],['4.9','Rating']].map(([v, l]) => (
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:400, color:'var(--ink)' }}>{v}</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'var(--tracking-caps)', fontWeight:600 }}>{l}</div>
          </div>
        ))}
      </div>
      {tier === 'sprout' && (
        <div style={{ margin:'14px 16px 0', padding:'14px 16px', background:'linear-gradient(135deg,var(--honey-100),var(--honey-200))', borderRadius:'var(--radius-card)', border:'1px solid var(--honey-200)' }}>
          <div style={{ fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--pine-700)', marginBottom:4 }}>Unlock Grower features</div>
          <div style={{ fontSize:'var(--text-sm)', color:'var(--text-subtle)', marginBottom:10 }}>Smart matching, ad-free browsing, priority listings.</div>
          <Button size="sm" onClick={onUpgrade}><Icon name="sparkles" size={15} /> Upgrade to Grower</Button>
        </div>
      )}
      <div style={{ padding:'16px 16px 0' }}>
        <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-md)', fontWeight:500, color:'var(--ink)', margin:'0 0 12px' }}>My listings</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:12 }}>
          {(window.GS_LISTINGS||[]).slice(0, 3).map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} distance={l.distance} rating={l.rating} lister={l.lister} onClick={() => {}} />)}
        </div>
      </div>
    </div>
  );
}

/* ── Root app ────────────────────────────────────────────── */
function GardenSwapMobileApp() {
  const { Icon } = GS();
  const [tier, setTier] = React.useState('sprout');
  const [view, setView] = React.useState('feed');
  const [toast, setToast] = React.useState(null);

  const flash = msg => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  return (
    <div style={{ position:'relative', width:390, height:800, background:'var(--paper)', borderRadius:40, overflow:'hidden', boxShadow:'0 30px 70px rgba(32,37,29,0.34)', border:'11px solid #16140F', display:'flex', flexDirection:'column' }}>
      <TopBar tier={tier} />
      <div style={{ flex:1, overflowY:'auto', paddingBottom:70 }}>
        {view==='feed'    && <FeedScreen    tier={tier} onOpenListing={() => {}} onOpenPaywall={() => flash('Upgrade to Grower to go ad-free!')} />}
        {view==='chats'   && <ChatsScreen />}
        {view==='profile' && <ProfileScreen tier={tier} onUpgrade={() => { setTier('grower'); flash('Welcome to Grower!'); }} />}
      </div>
      <button aria-label="List a plant" style={{ position:'absolute', bottom:80, right:18, width:58, height:58, borderRadius:'var(--radius-full)', background:'var(--fern-600)', color:'#fff', border:'none', boxShadow:'var(--shadow-fab)', cursor:'pointer', zIndex:90, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Icon name="plus" size={26} color="#fff" />
      </button>
      <BottomNav view={view} setView={setView} />
      {toast && (
        <div style={{ position:'absolute', bottom:92, left:'50%', transform:'translateX(-50%)', zIndex:400, display:'inline-flex', alignItems:'center', gap:7, background:'var(--pine-900)', color:'var(--paper)', padding:'11px 18px', borderRadius:'var(--radius-pill)', fontSize:'var(--text-sm)', fontWeight:500, boxShadow:'var(--shadow-modal)', whiteSpace:'nowrap' }}>
          <Icon name="check" size={15} color="var(--mint-200)" /> {toast}
        </div>
      )}
    </div>
  );
}

module.exports = { GardenSwapMobileApp };
