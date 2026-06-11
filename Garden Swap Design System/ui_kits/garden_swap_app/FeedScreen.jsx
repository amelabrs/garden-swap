/* Garden Swap UI kit — Feed (Swap) screen */
function FeedScreen({ tier, onOpenListing, onOpenPaywall }) {
  const { PlantCard, Select, Icon } = window.GardenSwapDesignSystem_0373cf;
  const isSprout = tier === 'sprout';

  return (
    <div style={{ paddingBottom: 16 }}>
      {/* editorial header */}
      <div style={{ padding: '16px 16px 6px' }}>
        <div className="gs-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
          <Icon name="mapPin" size={13} color="var(--clay-600)" /> Within 10 miles · 560001
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 500, marginTop: 6, letterSpacing: 'var(--tracking-tight)' }}>
          Plants near you
        </h2>
      </div>

      {/* filter bar */}
      <div style={{ display: 'flex', gap: 8, padding: '4px 16px 14px', flexWrap: 'wrap' }}>
        <Select size="sm" options={['All Types', 'Houseplant', 'Succulent', 'Cutting', 'Seed', 'Herb']} />
        <Select size="sm" options={['All Status', 'Swap', 'Free']} />
        <Select size="sm" options={['10 mi', '5 mi', '25 mi']} />
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, padding: '0 16px' }}>
        {window.GS_LISTINGS.map((l, i) => (
          <React.Fragment key={l.id}>
            {isSprout && i === 3 && <AdBanner onClick={() => onOpenPaywall('ad_free')} />}
            <PlantCard
              image={l.image} title={l.title} status={l.status} plantType={l.plantType}
              rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating}
              onClick={() => onOpenListing(l)}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function AdBanner({ onClick }) {
  const { Icon } = window.GardenSwapDesignSystem_0373cf;
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      background: 'linear-gradient(135deg, var(--yellow-ad-1), var(--yellow-ad-2))',
      border: '1px solid var(--yellow-ad-border)', borderRadius: 'var(--radius-card)', cursor: 'pointer',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span className="gs-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--yellow-ad-label)' }}>
          <Icon name="sparkles" size={12} /> Sponsored
        </span>
        <strong style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--pine-700)', fontSize: 'var(--text-md)' }}>Go ad-free with Grower</strong>
        <span style={{ color: 'var(--text-subtle)', fontSize: 'var(--text-sm)' }}>Upgrade for ₹99/mo and never see ads again</span>
      </div>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '7px 14px', background: 'var(--fern-600)', color: 'var(--text-on-primary)',
        borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-sm)', fontWeight: 600, whiteSpace: 'nowrap',
      }}>Upgrade <Icon name="arrowRight" size={14} /></span>
    </div>
  );
}

Object.assign(window, { FeedScreen });
