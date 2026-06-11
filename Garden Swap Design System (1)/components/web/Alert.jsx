/**
 * Garden Swap — Alert (web)
 * Inline banner. info=denim, success=fern, warning=honey, error=tomato.
 * Optional title line and dismiss button.
 */
export function Alert({ variant = 'info', title, children, dismissible = false, onDismiss, style }) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  const dismiss = () => { setDismissed(true); onDismiss?.(); };

  const themes = {
    info:    { fill: 'var(--denim-100)',   text: 'var(--denim-700)',  icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01' },
    success: { fill: 'var(--mint-100)',    text: 'var(--pine-700)',   icon: 'M20 6 9 17l-5-5' },
    warning: { fill: 'var(--honey-100)',   text: '#7A5C10',           icon: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' },
    error:   { fill: 'var(--clay-100)',    text: 'var(--clay-700)',   icon: 'M18 6 6 18M6 6l12 12' },
  };

  const t = themes[variant];

  return (
    <div role="alert" style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '13px 16px',
      background: t.fill,
      borderRadius: 'var(--radius)',
      border: `1px solid ${t.text}22`,
      ...style,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={t.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0, marginTop: 1 }}>
        <path d={t.icon} />
      </svg>
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'var(--text-sm)', color: t.text, marginBottom: 3,
          }}>{title}</div>
        )}
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          color: t.text, lineHeight: 'var(--leading-normal)',
        }}>{children}</div>
      </div>
      {dismissible && (
        <button onClick={dismiss} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 2, color: t.text, opacity: 0.6, flexShrink: 0,
          display: 'flex', alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { Alert });
