/**
 * Garden Swap — Footer (web)
 * Three-column link grid on a warm kraft background, with logo tagline and
 * bottom copyright bar in pine-900.
 */
export function Footer({ onNavigate, style }) {
  const go = (id) => onNavigate?.(id);

  const col = (heading, links) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)',
        fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-caps)', color: 'var(--ink-faint)',
      }}>{heading}</span>
      {links.map(([id, label]) => (
        <button key={id} onClick={() => go(id)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', padding: 0,
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          color: 'var(--text-subtle)',
          transition: 'color var(--dur-base)',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fern-600)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}
        >{label}</button>
      ))}
    </div>
  );

  return (
    <footer style={{ background: 'var(--paper-raised)', borderTop: '1px solid var(--line)', ...style }}>
      <div style={{
        maxWidth: 'var(--web-content-lg)', margin: '0 auto',
        padding: 'var(--space-12) var(--web-page-px)',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 'var(--space-10)',
      }}>
        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="var(--fern-600)" />
              <path d="M14 22c-4 0-7-3-7-7 0-3 2-5.5 5-6.5C14 6 16 4 18 3c.5 1.5.5 4 0 6-1.5 2-3 3-4 4 2 0 4.5-1 6-3 .5 2.5 0 5-2 7-1.5 1.5-3 2-4 2z" fill="#F4EDDF" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: '1rem',
              fontWeight: 500, color: 'var(--ink)',
            }}>Garden Swap</span>
          </div>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-subtle)',
            lineHeight: 'var(--leading-normal)', maxWidth: 240,
          }}>
            Trade, gift, and discover plants with growers in your neighbourhood.
          </p>
        </div>

        {col('Explore',  [['browse','Browse Plants'],['map','Map View'],['free','Free Plants'],['trending','Trending']])}
        {col('Community',[['how-it-works','How It Works'],['forum','Forum'],['blog','Garden Blog'],['stewards','Stewards']])}
        {col('Account',  [['profile','My Profile'],['listings','My Listings'],['swaps','My Swaps'],['settings','Settings']])}
      </div>

      {/* Bottom bar */}
      <div style={{
        background: 'var(--pine-900)',
        padding: '14px var(--web-page-px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(244,237,223,0.45)', fontFamily: 'var(--font-sans)' }}>
          © 2026 Garden Swap. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['privacy','Privacy'],['terms','Terms'],['contact','Contact']].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'var(--text-xs)', fontFamily: 'var(--font-sans)',
              color: 'rgba(244,237,223,0.45)',
            }}>{label}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
