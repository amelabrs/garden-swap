/**
 * Garden Swap — Pagination (web)
 * Prev / numbered / Next strip. Active page filled with fern-600;
 * neighbours ±2 shown with ellipsis beyond.
 */
export function Pagination({ page = 1, totalPages, onPage, style }) {
  if (totalPages <= 1) return null;

  const go = (p) => { if (p >= 1 && p <= totalPages) onPage?.(p); };

  // Build page list with ellipsis
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  const Btn = ({ children, active, disabled, onClick }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          minWidth: 36, height: 36, padding: '0 6px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius)',
          border: active ? 'none' : '1px solid var(--line)',
          background: active ? 'var(--fern-600)' : hov && !disabled ? 'var(--paper-raised)' : 'var(--card)',
          color: active ? 'white' : disabled ? 'var(--ink-faint)' : 'var(--text-body)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          fontWeight: active ? 600 : 400,
          cursor: disabled ? 'default' : 'pointer',
          transition: 'background var(--dur-base)',
          opacity: disabled ? 0.4 : 1,
        }}
      >{children}</button>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, ...style }}>
      <Btn disabled={page === 1} onClick={() => go(page - 1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        <span style={{ marginLeft: 4 }}>Prev</span>
      </Btn>

      {pages.map((p, i) =>
        p === '…'
          ? <span key={`e${i}`} style={{ padding: '0 4px', color: 'var(--ink-faint)', fontSize: 'var(--text-sm)' }}>…</span>
          : <Btn key={p} active={p === page} onClick={() => go(p)}>{p}</Btn>
      )}

      <Btn disabled={page === totalPages} onClick={() => go(page + 1)}>
        <span style={{ marginRight: 4 }}>Next</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
      </Btn>
    </div>
  );
}

Object.assign(window, { Pagination });
