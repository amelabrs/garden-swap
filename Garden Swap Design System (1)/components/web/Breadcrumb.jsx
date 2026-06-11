/**
 * Garden Swap — Breadcrumb (web)
 * Compact path trail separated by › chevrons. All items except the last
 * are clickable links in fern-green.
 */
export function Breadcrumb({ items = [], style }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: 'flex', alignItems: 'center', gap: 4,
      flexWrap: 'wrap',
      ...style,
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            )}
            {isLast ? (
              <span style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-subtle)',
                fontFamily: 'var(--font-sans)',
              }}>{item.label}</span>
            ) : (
              <button onClick={item.onClick} style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--fern-600)',
                fontWeight: 500,
              }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >{item.label}</button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

Object.assign(window, { Breadcrumb });
