/* Garden Swap — Website Template (WebApp.jsx)
   Loaded via x-import. React is injected by the DC runtime.
   DS components accessed from window.GardenSwapDesignSystem_0373cf. */

function BrowseView({ DS, onOpenListing }) {
  const { Breadcrumb, Sidebar, Select, PlantCard, Pagination } = DS;
  const [filters, setFilters] = React.useState({});
  const [viewMode, setViewMode] = React.useState('grid');
  const [sortBy, setSortBy] = React.useState('distance');
  const [pg, setPg] = React.useState(1);
  const PER = 9;
  const all = window.GS_LISTINGS || [];
  const filtered = all.filter(l => {
    if (filters.type && l.plantType !== filters.type) return false;
    if (filters.status && l.status !== filters.status) return false;
    if (filters.light && l.light !== filters.light) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const items = filtered.slice((pg - 1) * PER, pg * PER);
  const active = Object.entries(filters).filter(([, v]) => v);
  const setF = f => { setFilters(f); setPg(1); };

  return (
    <div style={{ maxWidth: 'var(--web-content-lg)', margin: '0 auto', padding: '28px var(--web-page-px) 64px' }}>
      <Breadcrumb items={[{ label: 'Home', onClick: () => {} }, { label: 'Browse Plants' }]} />
      <div style={{ display: 'flex', gap: 36, marginTop: 24, alignItems: 'flex-start' }}>
        <Sidebar filters={filters} onChange={setF} onClear={() => setF({})} resultCount={filtered.length} />
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--ink)' }}>Plants near you</h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginTop: 3 }}>{filtered.length} listings · within 10 mi</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Select size="sm" value={sortBy} onChange={e => setSortBy(e.target.value)}
                options={[{value:'distance',label:'Nearest first'},{value:'newest',label:'Newest'},{value:'rating',label:'Top rated'}]} />
              <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                {['grid', 'list'].map(m => (
                  <button key={m} onClick={() => setViewMode(m)} style={{ padding: '7px 11px', border: 'none', cursor: 'pointer', background: viewMode === m ? 'var(--fern-600)' : 'var(--card)', color: viewMode === m ? 'white' : 'var(--ink-faint)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={m==='grid'?'currentColor':'none'} stroke={m==='list'?'currentColor':'none'} strokeWidth="2" strokeLinecap="round">
                      {m === 'grid' ? <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/> : <path d="M3 6h18M3 12h18M3 18h18"/>}
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {active.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {active.map(([k, v]) => (
                <span key={k} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px 4px 12px', background:'var(--mint-100)', color:'var(--pine-700)', borderRadius:'var(--radius-pill)', fontSize:'var(--text-xs)', fontWeight:600 }}>
                  {v}
                  <button onClick={() => setF({...filters,[k]:undefined})} style={{ background:'none', border:'none', cursor:'pointer', padding:0, color:'var(--pine-700)', display:'flex', lineHeight:1 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </span>
              ))}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr', gap: viewMode === 'grid' ? 20 : 12 }}>
            {items.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} layout={viewMode === 'list' ? 'horizontal' : 'vertical'} onClick={() => onOpenListing(l)} />)}
          </div>
          {totalPages > 1 && <div style={{ display:'flex', justifyContent:'center', marginTop:40 }}><Pagination page={pg} totalPages={totalPages} onPage={setPg} /></div>}
        </main>
      </div>
    </div>
  );
}

function DetailView({ DS, listing, onBack, onViewProfile }) {
  const { Breadcrumb, Badge, Icon, Button, StarRating, Alert, PlantCard } = DS;
  const [requested, setRequested] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [thumb, setThumb] = React.useState(0);
  if (!listing) return null;
  const thumbs = [listing.image, listing.image.replace('w=800','w=400')+'&sat=-30', listing.image.replace('w=800','w=400')+'&blur=1'];
  const others = (window.GS_LISTINGS||[]).filter(l => l.id !== listing.id).slice(0, 3);
  const Tag = ({ icon, label }) => (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'5px 11px', borderRadius:'var(--radius-pill)', background:'var(--paper-raised)', border:'1px solid var(--line)', fontSize:'var(--text-sm)', color:'var(--text-subtle)' }}>
      <Icon name={icon} size={13} color="var(--sage-300)" /> {label}
    </span>
  );
  return (
    <div style={{ maxWidth:'var(--web-content-lg)', margin:'0 auto', padding:'28px var(--web-page-px) 72px' }}>
      <Breadcrumb items={[{label:'Home',onClick:()=>{}},{label:'Browse Plants',onClick:onBack},{label:listing.title}]} />
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:52, marginTop:28 }}>
        <div>
          <div style={{ borderRadius:'var(--radius-card)', overflow:'hidden', boxShadow:'var(--shadow)' }}>
            <img src={thumbs[thumb]} alt={listing.title} style={{ width:'100%', height:460, objectFit:'cover', display:'block', background:'linear-gradient(150deg,var(--mint-200),var(--fern-400))' }} />
          </div>
          <div style={{ display:'flex', gap:10, marginTop:12 }}>
            {thumbs.map((src, i) => <img key={i} src={src} alt="" onClick={() => setThumb(i)} style={{ width:82, height:62, objectFit:'cover', borderRadius:'var(--radius)', cursor:'pointer', border: i===thumb ? '2px solid var(--fern-600)' : '2px solid var(--line)', background:'var(--mint-200)' }} />)}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <Badge variant={listing.status==='free'?'free':'swap'}>{listing.status==='free'?'Free':'Swap'}</Badge>
            {listing.rarity && <Badge variant="rarity">{listing.rarity}</Badge>}
            {listing.plantType && <Badge variant="type">{listing.plantType}</Badge>}
          </div>
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-2xl)', fontWeight:400, letterSpacing:'var(--tracking-tight)', color:'var(--ink)', lineHeight:1.1 }}>{listing.title}</h1>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {listing.light     && <Tag icon="sun"    label={listing.light} />}
            {listing.condition && <Tag icon="ruler"  label={listing.condition} />}
            {listing.size      && <Tag icon="sprout" label={`${listing.size} plant`} />}
            {listing.distance  && <Tag icon="mapPin" label={listing.distance} />}
          </div>
          <p style={{ fontSize:'var(--text-base)', color:'var(--text-body)', lineHeight:'var(--leading-normal)' }}>{listing.desc}</p>
          <div style={{ height:1, background:'var(--line)' }} />
          <div onClick={onViewProfile} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:'var(--radius-card)', background:'var(--paper-raised)', border:'1px solid var(--line)', cursor:'pointer' }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:'var(--fern-600)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', fontWeight:700, color:'var(--paper)', flexShrink:0 }}>{(listing.lister||'?').charAt(0)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{listing.lister}</div>
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', marginTop:2 }}>Grower · 14 swaps completed</div>
            </div>
            <StarRating value={listing.rating} />
          </div>
          {requested
            ? <Alert variant="success" title="Request sent!">{listing.lister} will get back to you within 48 hours.</Alert>
            : <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <Button size="lg" full onClick={() => setRequested(true)}><Icon name={listing.status==='free'?'gift':'repeat'} size={18} />{listing.status==='free'?'Request to Collect':'Request Swap'}</Button>
                <Button variant="outline" size="lg" full onClick={() => setSaved(s=>!s)}><Icon name="heart" size={18} />{saved?'Saved to Wishlist':'Save to Wishlist'}</Button>
              </div>}
        </div>
      </div>
      {others.length > 0 && (
        <div style={{ marginTop:64 }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-lg)', fontWeight:500, color:'var(--ink)', marginBottom:20 }}>More near you</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {others.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating} onClick={() => {}} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileView({ DS, user, onViewListing }) {
  const { TierBadge, PlantCard, Badge, Icon, StarRating, Button } = DS;
  const [tab, setTab] = React.useState('listings');
  const listings = (window.GS_LISTINGS||[]).slice(0, 6);
  const wishlist = window.GS_WISHLIST || [];
  const chats = window.GS_CHATS || [];
  const tabs = [['listings','My Listings',6],['swaps','Swap History',14],['wishlist','Wishlist',wishlist.length],['reviews','Reviews',8]];
  const reviews = [
    {from:'Arjun',text:'Quick and easy swap, plant was exactly as described!',rating:5,date:'2 weeks ago'},
    {from:'Meera',text:'Really healthy cuttings. Super helpful and responsive.',rating:5,date:'1 month ago'},
    {from:'Kabir',text:'Great experience overall. Would swap again.',rating:4,date:'2 months ago'},
  ];
  return (
    <div style={{ maxWidth:'var(--web-content-lg)', margin:'0 auto', paddingBottom:72 }}>
      <div style={{ height:200, position:'relative', background:'linear-gradient(130deg,var(--pine-900),var(--fern-600) 60%,var(--sage-300))' }}>
        <div style={{ position:'absolute', bottom:-44, left:'var(--web-page-px)', width:90, height:90, borderRadius:'50%', border:'4px solid var(--paper)', background:'var(--sage-300)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', fontWeight:700, color:'var(--pine-900)', boxShadow:'var(--shadow)' }}>P</div>
      </div>
      <div style={{ padding:'58px var(--web-page-px) 20px', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, color:'var(--ink)' }}>{user.name}</h1>
            <TierBadge tier={user.tier||'grower'} />
          </div>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--text-subtle)' }}>Plant enthusiast · Bangalore, India · Member since Jan 2024</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Button variant="outline" size="sm">Edit Profile</Button>
          <Button size="sm"><Icon name="plus" size={15} /> Add Listing</Button>
        </div>
      </div>
      <div style={{ display:'flex', padding:'0 var(--web-page-px)', borderBottom:'2px solid var(--line)' }}>
        {[['6','Listings'],['14','Swaps'],['4.9','Rating'],['8','Reviews']].map(([v,l],i) => (
          <div key={l} style={{ padding:'12px 28px', textAlign:'center', borderRight:i<3?'1px solid var(--line)':'none' }}>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:400, color:'var(--ink)' }}>{v}</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'var(--tracking-caps)', fontWeight:600, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', padding:'0 var(--web-page-px)', borderBottom:'2px solid var(--line)', marginBottom:0 }}>
        {tabs.map(([id,label,count]) => (
          <button key={id} onClick={() => setTab(id)} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 22px', fontFamily:'var(--font-sans)', fontWeight:tab===id?600:400, fontSize:'var(--text-sm)', color:tab===id?'var(--pine-700)':'var(--text-subtle)', borderBottom:tab===id?'2px solid var(--fern-600)':'2px solid transparent', marginBottom:-2, display:'flex', alignItems:'center', gap:6 }}>
            {label}
            <span style={{ padding:'1px 7px', borderRadius:'var(--radius-badge)', background:tab===id?'var(--mint-100)':'var(--paper-raised)', color:tab===id?'var(--pine-700)':'var(--ink-faint)', fontSize:'var(--text-xs)', fontWeight:600 }}>{count}</span>
          </button>
        ))}
      </div>
      <div style={{ padding:'28px var(--web-page-px)' }}>
        {tab==='listings' && <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:20 }}>{listings.map(l => <PlantCard key={l.id} image={l.image} title={l.title} status={l.status} plantType={l.plantType} distance={l.distance} rating={l.rating} lister={l.lister} onClick={() => onViewListing(l)} />)}</div>}
        {tab==='wishlist' && <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:600 }}>{wishlist.map(item => <div key={item} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', background:'var(--card)', border:'1px solid var(--line)', borderRadius:'var(--radius-card)' }}><Icon name="heart" size={16} color="var(--clay-600)" /><span style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-md)', color:'var(--ink)', flex:1 }}>{item}</span></div>)}</div>}
        {tab==='swaps' && <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:700 }}>{chats.map(c => <div key={c.id} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 18px', background:'var(--card)', border:'1px solid var(--line)', borderRadius:'var(--radius-card)' }}><div style={{ width:40, height:40, borderRadius:'50%', background:'var(--mint-200)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:700, color:'var(--pine-700)', flexShrink:0 }}>{c.other.charAt(0)}</div><div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{c.listingTitle}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', marginTop:2 }}>with {c.other}</div></div><Badge variant={c.state}>{c.state}</Badge></div>)}</div>}
        {tab==='reviews' && <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>{reviews.map((r,i) => <div key={i} style={{ padding:'18px', background:'var(--card)', border:'1px solid var(--line)', borderRadius:'var(--radius-card)' }}><div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}><div style={{ width:34, height:34, borderRadius:'50%', background:'var(--sage-300)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', fontWeight:700, color:'var(--pine-900)', flexShrink:0 }}>{r.from.charAt(0)}</div><div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{r.from}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--ink-faint)' }}>{r.date}</div></div><StarRating value={r.rating} /></div><p style={{ fontSize:'var(--text-sm)', color:'var(--text-body)', lineHeight:'var(--leading-normal)', margin:0 }}>{r.text}</p></div>)}</div>}
      </div>
    </div>
  );
}

function GardenSwapWebApp() {
  const DS = window.GardenSwapDesignSystem_0373cf || {};
  const [page, setPage] = React.useState('browse');
  const [listing, setListing] = React.useState(null);
  const user = { name: 'Priya Sharma', tier: 'grower' };

  const navigate = (p, data) => {
    setPage(p);
    if (data && data.listing) setListing(data.listing);
    const el = document.getElementById('gs-main');
    if (el) el.scrollTop = 0;
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--surface-page)' }}>
      <DS.Nav page={page} user={user} onNavigate={navigate} notifCount={2} />
      <div id="gs-main" style={{ flex:1, overflowY:'auto' }}>
        {(page==='browse'||page==='home') && <BrowseView DS={DS} onOpenListing={l => navigate('detail',{listing:l})} />}
        {page==='detail' && <DetailView DS={DS} listing={listing} onBack={() => navigate('browse')} onViewProfile={() => navigate('profile')} />}
        {(page==='profile'||page==='listings'||page==='swaps') && <ProfileView DS={DS} user={user} onViewListing={l => navigate('detail',{listing:l})} />}
      </div>
      <DS.Footer onNavigate={navigate} />
    </div>
  );
}

module.exports = { GardenSwapWebApp };
