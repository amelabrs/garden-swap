/* Garden Swap Web UI Kit — DetailPage */
function DetailPage({ listing, onBack, onViewProfile }) {
  const [requested, setRequested] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [activeThumb, setActiveThumb] = React.useState(0);
  if (!listing) return null;

  const thumbUrls = [
    listing.image,
    listing.image.replace('w=800', 'w=400') + '&sat=-30',
    listing.image.replace('w=800', 'w=400') + '&blur=1',
  ];

  const others = window.GS_LISTINGS.filter(l => l.id !== listing.id && l.plantType === listing.plantType).slice(0, 3);
  const fallbackOthers = window.GS_LISTINGS.filter(l => l.id !== listing.id).slice(0, 3);
  const similar = others.length >= 2 ? others : fallbackOthers;

  const Tag = ({ icon, label }) => (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'5px 11px', borderRadius:'var(--radius-pill)',
      background:'var(--paper-raised)', border:'1px solid var(--line)',
      fontSize:'var(--text-sm)', color:'var(--text-subtle)',
    }}>
      <Icon name={icon} size={13} color="var(--sage-300)" /> {label}
    </span>
  );

  return (
    <div style={{ maxWidth:'var(--web-content-lg)', margin:'0 auto', padding:'28px var(--web-page-px) 72px' }}>
      <Breadcrumb items={[
        { label:'Home', onClick:()=>{} },
        { label:'Browse Plants', onClick: onBack },
        { label: listing.title },
      ]} />

      {/* Main two-col layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:52, marginTop:28 }}>
        {/* Left — images */}
        <div>
          <div style={{ borderRadius:'var(--radius-card)', overflow:'hidden', boxShadow:'var(--shadow)' }}>
            <img src={thumbUrls[activeThumb]} alt={listing.title} style={{
              width:'100%', height:460, objectFit:'cover', display:'block',
              background:'linear-gradient(150deg, var(--mint-200), var(--fern-400))',
              transition:'opacity var(--dur-base)',
            }} />
          </div>
          <div style={{ display:'flex', gap:10, marginTop:12 }}>
            {thumbUrls.map((src, i) => (
              <img key={i} src={src} alt="" onClick={() => setActiveThumb(i)} style={{
                width:82, height:62, objectFit:'cover', borderRadius:'var(--radius)',
                cursor:'pointer', flexShrink:0,
                border: i===activeThumb ? '2px solid var(--fern-600)' : '2px solid var(--line)',
                transition:'border-color var(--dur-base)',
                background:'var(--mint-200)',
              }} />
            ))}
          </div>
        </div>

        {/* Right — details */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {/* Badges */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <Badge variant={listing.status==='free' ? 'free' : 'swap'}>
              {listing.status==='free' ? 'Free' : 'Swap'}
            </Badge>
            {listing.rarity    && <Badge variant="rarity">{listing.rarity}</Badge>}
            {listing.plantType && <Badge variant="type">{listing.plantType}</Badge>}
          </div>

          <h1 style={{
            fontFamily:'var(--font-serif)', fontSize:'var(--text-2xl)',
            fontWeight:400, letterSpacing:'var(--tracking-tight)',
            color:'var(--ink)', lineHeight:1.1,
          }}>{listing.title}</h1>

          {/* Tag pills */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {listing.light     && <Tag icon="sun"     label={listing.light} />}
            {listing.condition && <Tag icon="ruler"   label={listing.condition} />}
            {listing.size      && <Tag icon="sprout"  label={`${listing.size} plant`} />}
            {listing.distance  && <Tag icon="mapPin"  label={listing.distance} />}
          </div>

          <p style={{ fontSize:'var(--text-base)', color:'var(--text-body)', lineHeight:'var(--leading-normal)' }}>
            {listing.desc}
          </p>

          <div style={{ height:1, background:'var(--line)' }} />

          {/* Lister card */}
          <div onClick={onViewProfile} style={{
            display:'flex', alignItems:'center', gap:14,
            padding:'14px 16px', borderRadius:'var(--radius-card)',
            background:'var(--paper-raised)', border:'1px solid var(--line)',
            cursor:'pointer', transition:'box-shadow var(--dur-base)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow-hover)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
          >
            <div style={{
              width:44, height:44, borderRadius:'50%', background:'var(--fern-600)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.1rem', fontWeight:700, color:'var(--paper)', flexShrink:0,
            }}>{(listing.lister||'?').charAt(0)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--ink)' }}>{listing.lister}</div>
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-faint)', marginTop:2 }}>Grower · 14 swaps completed</div>
            </div>
            <StarRating value={listing.rating} />
          </div>

          {/* CTA */}
          {requested ? (
            <Alert variant="success" title="Request sent!">
              {listing.lister} will get back to you within 48 hours.
            </Alert>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <Button size="lg" full onClick={() => setRequested(true)}>
                <Icon name={listing.status==='free' ? 'gift' : 'repeat'} size={18} />
                {listing.status==='free' ? 'Request to Collect' : 'Request Swap'}
              </Button>
              <Button variant="outline" size="lg" full onClick={() => setSaved(s => !s)}>
                <Icon name="heart" size={18} />
                {saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Similar plants */}
      {similar.length > 0 && (
        <div style={{ marginTop:64 }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-lg)', fontWeight:500, color:'var(--ink)', marginBottom:20 }}>
            More near you
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {similar.map(l => (
              <PlantCard key={l.id}
                image={l.image} title={l.title} status={l.status} plantType={l.plantType}
                rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating}
                onClick={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DetailPage });
