/* Garden Swap UI kit — Profile */
function ProfileScreen({ tier, onUpgrade, onOpenListing }) {
  const { TierBadge, Button, StarRating, Badge, Icon } = window.GardenSwapDesignSystem_0373cf;
  const wish = window.GS_WISHLIST;
  const myListings = window.GS_LISTINGS.slice(0, 3);
  const isSprout = tier === 'sprout';

  const sectionTitle = { fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-md)', display: 'flex', alignItems: 'center', gap: 7 };
  const panel = { background: 'var(--card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow)', padding: 18 };

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* header */}
      <div style={{ textAlign: 'center', padding: 22, ...panel }}>
        <div style={{
          width: 68, height: 68, borderRadius: 'var(--radius-full)', margin: '0 auto 12px',
          background: 'linear-gradient(135deg,var(--mint-200),var(--fern-500))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="leaf" size={30} color="#fff" /></div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', marginBottom: 4 }}>Devi Sharma</h2>
        <p style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--text-faint)', fontSize: 'var(--text-sm)', marginBottom: 12 }}>
          @devi <span style={{ color: 'var(--line-strong)' }}>·</span> <Icon name="mapPin" size={13} color="var(--clay-600)" /> 560001
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><StarRating value={4.8} count={23} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <TierBadge tier={tier} />
          {isSprout
            ? <Button variant="primary" size="sm" onClick={onUpgrade}><Icon name="sparkles" size={14} /> Upgrade Plan</Button>
            : <Button variant="outline" size="sm">Manage Plan</Button>}
        </div>
      </div>

      {/* wish list */}
      <div style={panel}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={sectionTitle}>
            <Icon name="heart" size={17} color="var(--clay-600)" /> Wish list
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', fontWeight: 400 }}>{wish.length}{isSprout ? '/5' : ''}</span>
          </h3>
          <Button variant="text">+ Add</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {wish.map((w) => (
            <div key={w} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 13px', background: 'var(--mint-100)', borderRadius: 'var(--radius)', fontSize: 'var(--text-base)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="leaf" size={15} color="var(--fern-600)" /> {w}</span>
              <button aria-label="Remove" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-faint)', display: 'flex', padding: 2 }}><Icon name="x" size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* listings */}
      <div style={panel}>
        <h3 style={{ ...sectionTitle, marginBottom: 14 }}><Icon name="leaf" size={17} color="var(--fern-600)" /> Your listings <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', fontWeight: 400 }}>{myListings.length}</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {myListings.map((l) => (
            <div key={l.id} onClick={() => onOpenListing(l)} style={{
              background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--line)', overflow: 'hidden', cursor: 'pointer',
            }}>
              <img src={l.image} alt={l.title} onError={(e) => { e.currentTarget.style.opacity = 0; }}
                style={{ width: '100%', height: 88, objectFit: 'cover', display: 'block', background: 'linear-gradient(150deg,var(--mint-200),var(--fern-400))' }} />
              <div style={{ padding: '10px 11px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-sm)', marginBottom: 7, lineHeight: 1.2 }}>{l.title}</div>
                <Badge variant={l.status === 'free' ? 'free' : 'swap'}><Icon name={l.status === 'free' ? 'gift' : 'repeat'} size={11} />{l.status === 'free' ? 'Free' : 'Swap'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
