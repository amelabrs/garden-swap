/**
 * Garden Swap — Nav (web)
 * Sticky pine-900 top bar: wordmark logo, primary links, global search,
 * notification bell, and user avatar menu. Collapses to hamburger below 900px.
 */
export function Nav({
  page = 'browse',
  user,
  onNavigate,
  onSearch,
  notifCount = 0,
  style,
}) {
  const [searchVal, setSearchVal] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchFocus, setSearchFocus] = React.useState(false);

  const links = [
    { id: 'browse',   label: 'Browse' },
    { id: 'swaps',    label: 'My Swaps' },
    { id: 'messages', label: 'Messages' },
  ];

  const go = (id) => { onNavigate?.(id); setMobileOpen(false); };

  const tierColors = {
    sprout:  { bg: 'var(--mint-100)',  color: 'var(--pine-700)' },
    grower:  { bg: 'var(--honey-100)', color: '#8A6410' },
    steward: { bg: 'var(--denim-100)', color: 'var(--denim-700)' },
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      height: 'var(--web-nav-h)',
      background: 'var(--pine-900)',
      display: 'flex', alignItems: 'center',
      padding: '0 clamp(16px, 3vw, 40px)',
      gap: 0,
      boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
      ...style,
    }}>
      {/* Logo */}
      <button onClick={() => go('home')} style={{
        display: 'flex', alignItems: 'center', gap: 9,
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '0 20px 0 0', flexShrink: 0,
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="var(--fern-600)" />
          <path d="M14 22c-4 0-7-3-7-7 0-3 2-5.5 5-6.5C14 6 16 4 18 3c.5 1.5.5 4 0 6-1.5 2-3 3-4 4 2 0 4.5-1 6-3 .5 2.5 0 5-2 7-1.5 1.5-3 2-4 2z" fill="#F4EDDF" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 500,
          color: 'var(--paper)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}>Garden Swap</span>
      </button>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} className="gs-web-nav-links">
        {links.map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-sans)',
            fontWeight: page === l.id ? 600 : 400,
            color: page === l.id ? 'var(--paper)' : 'rgba(244,237,223,0.62)',
            background: page === l.id ? 'rgba(255,255,255,0.10)' : 'transparent',
            transition: 'background var(--dur-base), color var(--dur-base)',
          }}>{l.label}</button>
        ))}
      </div>

      {/* Search */}
      <form onSubmit={e => { e.preventDefault(); onSearch?.(searchVal); }} style={{
        display: 'flex', alignItems: 'center',
        background: searchFocus ? 'rgba(244,237,223,0.18)' : 'rgba(244,237,223,0.10)',
        border: `1px solid ${searchFocus ? 'rgba(244,237,223,0.3)' : 'rgba(244,237,223,0.12)'}`,
        borderRadius: 'var(--radius-pill)',
        padding: '0 14px', gap: 8,
        transition: 'background var(--dur-base), border-color var(--dur-base)',
        width: searchFocus ? 240 : 190,
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(244,237,223,0.5)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          placeholder="Search plants…"
          style={{
            background: 'none', border: 'none', outline: 'none',
            fontSize: 'var(--text-sm)',
            color: 'var(--paper)',
            width: '100%', padding: '8px 0',
          }}
        />
      </form>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 12, flexShrink: 0 }}>
        {/* Notifications */}
        {user && (
          <button onClick={() => go('notifications')} style={{
            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, borderRadius: 'var(--radius-full)',
            color: 'rgba(244,237,223,0.7)',
            display: 'flex', alignItems: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
            </svg>
            {notifCount > 0 && (
              <span style={{
                position: 'absolute', top: 5, right: 5,
                width: 7, height: 7,
                background: 'var(--tomato-600)',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--pine-900)',
              }} />
            )}
          </button>
        )}

        {/* User avatar / auth buttons */}
        {user ? (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: '1px solid rgba(244,237,223,0.18)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 10px 5px 6px', cursor: 'pointer',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 'var(--radius-full)',
                background: 'var(--fern-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, color: 'var(--paper)',
                overflow: 'hidden', flexShrink: 0,
              }}>
                {user.avatar
                  ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--paper)', fontFamily: 'var(--font-sans)' }}>
                {user.name.split(' ')[0]}
              </span>
              {user.tier && (
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '2px 6px', borderRadius: 'var(--radius-badge)',
                  ...tierColors[user.tier],
                }}>{user.tier}</span>
              )}
            </button>

            {menuOpen && (
              <div onClick={() => setMenuOpen(false)} style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-modal)',
                minWidth: 180, overflow: 'hidden', zIndex: 200,
              }}>
                {[['profile', 'My Profile'], ['listings', 'My Listings'], ['settings', 'Settings'], ['signout', 'Sign out']].map(([id, label]) => (
                  <button key={id} onClick={() => go(id)} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-sans)',
                    color: id === 'signout' ? 'var(--tomato-600)' : 'var(--text-body)',
                    borderTop: id === 'signout' ? '1px solid var(--line)' : 'none',
                  }}>{label}</button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => go('signin')} style={{
              background: 'none', border: '1px solid rgba(244,237,223,0.3)',
              borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              padding: '7px 16px', fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--paper)',
            }}>Sign in</button>
            <button onClick={() => go('join')} style={{
              background: 'var(--fern-600)', border: 'none',
              borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              padding: '7px 16px', fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              color: 'var(--text-on-primary)',
            }}>Join free</button>
          </div>
        )}
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });
