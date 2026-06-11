/* Garden Swap Web UI Kit — ProfilePage */
function ProfilePage({ user, onViewListing }) {
  const [tab, setTab] = React.useState('listings');
  const listings = window.GS_LISTINGS.filter(l => l.lister === 'Priya');
  const allListings = window.GS_LISTINGS.slice(0, 6);

  const tabs = [
    { id:'listings',  label:'My Listings',   count: 6  },
    { id:'swaps',     label:'Swap History',  count: 14 },
    { id:'wishlist',  label:'Wishlist',      count: window.GS_WISHLIST.length },
    { id:'reviews',   label:'Reviews',       count: 8  },
  ];

  const reviews = [
    { from:'Arjun',  text:'Quick and easy swap, plant was exactly as described. Highly recommend!', rating:5, date:'2 weeks ago' },
    { from:'Meera',  text:'Really healthy cuttings. Priya was super helpful and responsive.',       rating:5, date:'1 month ago' },
    { from:'Kabir',  text:'Great experience overall. Would swap again.',                           rating:4, date:'2 months ago' },
    { from:'Rohan',  text:'Beautiful plant, well-packed for transport. Very happy.',                rating:5, date:'3 months ago' },
  ];

  return (
    <div style={{ maxWidth:'var(--web-content-lg)', margin:'0 auto', paddingBottom:72 }}>
      {/* Cover */}
      <div style={{
        height:200, position:'relative',
        background:'linear-gradient(130deg, var(--pine-900) 0%, var(--fern-600) 60%, var(--sage-300) 100%)',
      }}>
        <div style={{
          position:'absolute', bottom:-44, left:'var(--web-page-px)',
          width:90, height:90, borderRadius:'50%',
          border:'4px solid var(--paper)',
          background:'var(--sage-300)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'2rem', fontWeight:700, color:'var(--pine-900)',
          boxShadow:'var(--shadow)',
        }}>P</div>
      </div>

      {/* Identity row */}
      <div style={{ padding:'58px var(--web-page-px) 20px', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, color:'var(--ink)' }}>
              {user.name}
            </h1>
            <TierBadge tier={user.tier || 'grower'} />
          </div>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--text-subtle)' }}>
            Plant enthusiast · Bangalore, India · Member since Jan 2024
          </p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Button variant="outline" size="sm">Edit Profile</Button>
          <Button size="sm"><Icon name="plus" size={15} /> Add Listing</Button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        display:'flex', gap:0, padding:'0 var(--web-page-px) 24px',
        borderBottom:'2px solid var(--line)',
      }}>
        {[['6','Listings'],['14','Swaps'],['4.9','Rating'],['8','Reviews']].map(([val, label], i) => (
          <div key={label} style={{
            padding:'12px 28px 12px', textAlign:'center',
            borderRight: i<3 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:400, color:'var(--ink)' }}>{val}</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'var(--tracking-caps)', fontWeight:600, marginTop:2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', padding:'0 var(--web-page-px)', gap:0, borderBottom:'2px solid var(--line)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background:'none', border:'none', cursor:'pointer',
            padding:'13px 22px',
            fontFamily:'var(--font-sans)', fontWeight: tab===t.id ? 600 : 400,
            fontSize:'var(--text-sm)', color: tab===t.id ? 'var(--pine-700)' : 'var(--text-subtle)',
            borderBottom: tab===t.id ? '2px solid var(--fern-600)' : '2px solid transparent',
            marginBottom:-2, transition:'color var(--dur-base)',
            display:'flex', alignItems:'center', gap:6,
          }}>
            {t.label}
            <span style={{
              padding:'1px 7px', borderRadius:'var(--radius-badge)',
              background: tab===t.id ? 'var(--mint-100)' : 'var(--paper-raised)',
              color: tab===t.id ? 'var(--pine-700)' : 'var(--ink-faint)',
              fontSize:'var(--text-xs)', fontWeight:600,
            }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding:'28px var(--web-page-px)' }}>
        {tab === 'listings' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:20 }}>
            {allListings.map(l => (
              <PlantCard key={l.id} image={l.image} title={l.title} status={l.status}
                plantType={l.plantType} distance={l.distance} rating={l.rating} lister={l.lister}
                onClick={() => onViewListing(l)} />
            ))}
            <div onClick={() => {}} style={{
              border:'2px dashed var(--line)', borderRadius:'var(--radius-card)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:10, minHeight:220, cursor:'pointer', color:'var(--ink-faint)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--fern-400)'; e.currentTarget.style.color='var(--fern-600)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.color='var(--ink-faint)'; }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5v14"/></svg>
              <span style={{ fontSize:'var(--text-sm)', fontWeight:600 }}>Add listing</span>
            </div>
          </div>
        )}

        {tab === 'wishlist' && (
          <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:600 }}>
            {window.GS_WISHLIST.map(item => (
              <div key={item} style={{
                display:'flex', alignItems:'center', gap:14,
                padding:'14px 18px', background:'var(--card)',
                border:'1px solid var(--line)', borderRadius:'var(--radius-card)',
              }}>
                <Icon name="heart" size={16} color="var(--clay-600)" />
                <span style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-md)', color:'var(--ink)', flex:1 }}>{item}</span>
                <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:'var(--text-sm)', color:'var(--fern-600)', fontWeight:600, fontFamily:'var(--font-sans)', display:'flex', alignItems:'center', gap:4 }}>
                  Find <Icon name="arrowRight" size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'swaps' && (
          <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:700 }}>
            {window.GS_CHATS.map(chat => (
              <div key={chat.id} style={{
                display:'flex', alignItems:'center', gap:16,
                padding:'14px 18px', background:'var(--card)',
                border:'1px solid var(--line)', borderRadius:'var(--radius-card)',
              }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'var(--mint-200)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:700, color:'var(--pine-700)', flexShrink:0 }}>
                  {chat.other.charAt(0)}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{chat.listingTitle}</div>
                  <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', marginTop:2 }}>with {chat.other} · {chat.messages[0]?.time}</div>
                </div>
                <Badge variant={chat.state}>{chat.state}</Badge>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ padding:'18px', background:'var(--card)', border:'1px solid var(--line)', borderRadius:'var(--radius-card)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--sage-300)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', fontWeight:700, color:'var(--pine-900)', flexShrink:0 }}>{r.from.charAt(0)}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{r.from}</div>
                    <div style={{ fontSize:'var(--text-xs)', color:'var(--ink-faint)' }}>{r.date}</div>
                  </div>
                  <StarRating value={r.rating} />
                </div>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--text-body)', lineHeight:'var(--leading-normal)' }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ProfilePage });
