import React from 'react';

/**
 * Garden Swap — Select
 * Dropdown matching the product's filter/form selects. Two sizes: the
 * compact filter-bar pill and the full-width form field. Border turns
 * green on focus.
 */
export function Select({
  label,
  options = [],
  size = 'md',
  style,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);

  const sizes = {
    sm: { padding: '7px 12px', fontSize: 'var(--text-sm)', width: 'auto' },
    md: { padding: '11px 14px', fontSize: 'var(--text-base)', width: '100%' },
  };

  const field = {
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`, borderRadius: 'var(--radius)',
    background: 'var(--card)', color: 'var(--text-body)', outline: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
    ...sizes[size],
  };

  const select = (
    <select
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={label ? field : { ...field, ...style }}
      {...rest}
    >
      {children || options.map((o) => {
        const value = typeof o === 'string' ? o : o.value;
        const text = typeof o === 'string' ? o : o.label;
        return <option key={value} value={value}>{text}</option>;
      })}
    </select>
  );

  if (!label) return select;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...style }}>
      <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>{label}</label>
      {select}
    </div>
  );
}
