import React from 'react';

/**
 * Garden Swap — Input
 * Text field matching the product's form styling: 8px radius, grey border
 * that turns green on focus. Supports an optional label and hint. Use
 * variant="search" for the rounded white-on-green top-bar search field.
 */
export function Input({
  label,
  hint,
  optional = false,
  variant = 'default',
  type = 'text',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);

  if (variant === 'search') {
    return (
      <input
        type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          padding: '9px 16px',
          border: '1px solid rgba(244,237,223,0.18)',
          borderRadius: 'var(--radius-pill)',
          fontSize: 'var(--text-base)',
          background: focus ? 'rgba(244,237,223,0.22)' : 'rgba(244,237,223,0.12)',
          color: 'var(--text-on-dark)',
          outline: 'none',
          transition: 'background var(--dur-base)',
          ...style,
        }}
        {...rest}
      />
    );
  }

  const field = {
    width: '100%',
    padding: '11px 14px',
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-sans)',
    background: 'var(--card)',
    color: 'var(--text-body)',
    outline: 'none',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...style }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>
          {label}{' '}
          {optional && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', fontWeight: 400 }}>(optional)</span>}
        </label>
      )}
      <input type={type} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={field} {...rest} />
      {hint && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>{hint}</p>}
    </div>
  );
}
