/* Garden Swap UI kit — Paywall (tier comparison) */
function PaywallModal({ reason, onClose, onSubscribe }) {
  const { Button, Icon } = window.GardenSwapDesignSystem_0373cf;

  const tiers = [
    {
      key: 'sprout', icon: 'sprout', name: 'Sprout', price: 'Free', featured: false, accent: 'var(--pine-700)',
      feats: ['Up to 3 listings', 'Up to 5 wish items', 'Basic search & filters', 'Direct swap requests'],
      no: ['Smart match alerts', 'Advanced filters', 'Ad-free feed'],
      cta: <Button variant="outline" full disabled>Current Plan</Button>,
    },
    {
      key: 'grower', icon: 'shrub', name: 'Grower', price: '₹99', featured: true, accent: 'var(--fern-600)',
      feats: ['Unlimited listings', 'Unlimited wish list', 'Smart match alerts', 'Advanced filters', 'Ad-free feed', 'Magazine access'],
      no: [],
      cta: <Button variant="primary" full onClick={() => onSubscribe('grower')}>Upgrade to Grower</Button>,
    },
    {
      key: 'steward', icon: 'trees', name: 'Steward', price: '₹249', featured: false, accent: 'var(--denim-700)',
      feats: ['Everything in Grower', '10–15% courier discount', 'Elite community status', 'AI Plant Doctor (soon)'],
      no: [],
      cta: <Button variant="steward" full onClick={() => onSubscribe('steward')}>Upgrade to Steward</Button>,
    },
  ];

  return (
    <Modal onClose={onClose} maxWidth={520}>
      <CloseBtn onClose={onClose} />
      <div style={{ padding: '30px 22px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div className="gs-eyebrow" style={{ color: 'var(--clay-600)', marginBottom: 8 }}>Garden Swap Membership</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-2xl)', letterSpacing: 'var(--tracking-tight)', marginBottom: 8 }}>Unlock more with Garden Swap</h2>
          <p style={{ color: 'var(--text-subtle)', fontSize: 'var(--text-base)' }}>{reason}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tiers.map((t) => (
            <div key={t.key} style={{
              border: `1.5px solid ${t.featured ? 'var(--fern-500)' : 'var(--line)'}`,
              background: t.featured ? 'var(--mint-100)' : 'var(--card)',
              borderRadius: 'var(--radius-card)', padding: '18px 18px 16px', position: 'relative',
              boxShadow: t.featured ? 'var(--shadow)' : 'none',
            }}>
              {t.featured && (
                <div className="gs-eyebrow" style={{
                  position: 'absolute', top: -11, left: 18, background: 'var(--fern-600)', color: 'var(--paper)',
                  padding: '3px 12px', borderRadius: 'var(--radius-pill)', letterSpacing: 'var(--tracking-caps)',
                }}>Most Popular</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-lg)', color: t.accent }}>
                  <Icon name={t.icon} size={20} color={t.accent} /> {t.name}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-price)', fontWeight: 800, color: 'var(--pine-700)', lineHeight: 1 }}>
                  {t.price}{t.price !== 'Free' && <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-faint)' }}>/mo</span>}
                </span>
              </div>
              <ul style={{ listStyle: 'none', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                {t.feats.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink)' }}>
                    <Icon name="check" size={15} color="var(--fern-500)" /> {f}
                  </li>
                ))}
                {t.no.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-faint)' }}>
                    <Icon name="x" size={15} color="var(--line-strong)" /> {f}
                  </li>
                ))}
              </ul>
              {t.cta}
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginTop: 18 }}>Cancel anytime. No hidden fees.</p>
      </div>
    </Modal>
  );
}

Object.assign(window, { PaywallModal });
