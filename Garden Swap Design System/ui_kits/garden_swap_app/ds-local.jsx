/* Garden Swap UI kit — self-contained copy of the redesigned DS primitives.
   Loaded AFTER _ds_bundle.js. If the compiled bundle is present we use it;
   otherwise these local copies back the kit so it renders standalone.
   Source of truth remains components/. */

const GS_ICON_PATHS = {
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
  shrub: '<path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  ruler: '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  star: '<path d="M11.5 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.1 2.1 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .29-.9l5.17-.76a2.1 2.1 0 0 0 1.6-1.16z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>',
  newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.02l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.02.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
};

function GS_Icon({ name, size = 20, strokeWidth = 1.75, fill = 'none', color = 'currentColor', style, ...rest }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
    dangerouslySetInnerHTML={{ __html: GS_ICON_PATHS[name] || '' }} {...rest} />;
}

function GS_Button({ children, variant = 'primary', size = 'md', full = false, pill = true, disabled = false, type = 'button', onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const sizes = {
    sm: { padding: '7px 14px', fontSize: 'var(--text-sm)' },
    md: { padding: '11px 20px', fontSize: 'var(--text-base)' },
    lg: { padding: '14px 26px', fontSize: 'var(--text-md)' },
  };
  const solid = (bg, bgHover, fg) => ({ background: hover && !disabled ? bgHover : bg, color: fg, border: 'none', boxShadow: down ? 'none' : 'var(--shadow-xs)' });
  const variants = {
    primary: solid('var(--fern-600)', 'var(--pine-700)', 'var(--text-on-primary)'),
    accent:  solid('var(--clay-600)', 'var(--clay-700)', '#FFF7F0'),
    steward: solid('var(--denim-600)', 'var(--denim-700)', '#F1F7F8'),
    danger:  solid('var(--tomato-600)', '#A23D26', '#FFF3EE'),
    outline: { background: hover && !disabled ? 'var(--paper-raised)' : 'transparent', color: 'var(--text-body)', border: '1px solid var(--line-strong)' },
    text: { background: 'none', color: 'var(--fern-600)', border: 'none', padding: 0, fontWeight: 'var(--weight-semibold)', textDecoration: hover ? 'underline' : 'none' },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
    fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-semibold)', letterSpacing: '0.01em',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius)', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-base), transform var(--dur-fast), box-shadow var(--dur-base)',
    width: full ? '100%' : undefined, lineHeight: 1.2, whiteSpace: 'nowrap',
    transform: down && !disabled ? 'translateY(1px)' : 'none', opacity: disabled ? 0.5 : 1,
    ...sizes[size], ...variants[variant],
  };
  return <button type={type} disabled={disabled} onClick={onClick}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setDown(false); }}
    onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)}
    style={{ ...base, ...style }} {...rest}>{children}</button>;
}

function GS_Badge({ children, variant = 'type', style, ...rest }) {
  const variants = {
    swap: { background: 'var(--badge-swap-fill)', color: 'var(--badge-swap-text)' },
    free: { background: 'var(--badge-free-fill)', color: 'var(--badge-free-text)' },
    type: { background: 'rgba(166,184,152,0.28)', color: '#41553A' },
    condition: { background: 'var(--honey-100)', color: '#8A6410' },
    rarity: { background: 'var(--plum-100)', color: 'var(--plum-500)' },
    pending: { background: 'var(--state-pending-fill)', color: 'var(--state-pending-text)' },
    accepted: { background: 'var(--state-accepted-fill)', color: 'var(--state-accepted-text)' },
    completed: { background: 'var(--state-completed-fill)', color: 'var(--state-completed-text)' },
    declined: { background: 'var(--state-declined-fill)', color: 'var(--state-declined-text)' },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px',
    borderRadius: 'var(--radius-badge)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-semibold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)',
    lineHeight: 1.4, whiteSpace: 'nowrap', ...variants[variant],
  };
  return <span style={{ ...base, ...style }} {...rest}>{children}</span>;
}

function GS_TierBadge({ tier = 'sprout', showGlyph = true, style, ...rest }) {
  const tiers = {
    sprout: { icon: 'sprout', label: 'Sprout', background: 'var(--mint-100)', color: 'var(--pine-700)' },
    grower: { icon: 'shrub', label: 'Grower', background: 'rgba(52,112,70,0.16)', color: 'var(--fern-600)' },
    steward: { icon: 'trees', label: 'Steward', background: 'var(--denim-100)', color: 'var(--denim-700)' },
  };
  const t = tiers[tier] || tiers.sprout;
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 13px 5px 11px',
    borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)', lineHeight: 1.2, whiteSpace: 'nowrap', background: t.background, color: t.color,
  };
  return <span style={{ ...base, ...style }} {...rest}>{showGlyph && <GS_Icon name={t.icon} size={15} />}{t.label}</span>;
}

function GS_Card({ children, interactive = false, padded = false, bordered = true, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    background: 'var(--card)', borderRadius: 'var(--radius-card)', border: bordered ? '1px solid var(--line)' : 'none',
    boxShadow: hover && interactive ? 'var(--shadow-hover)' : 'var(--shadow)', overflow: 'hidden',
    cursor: interactive ? 'pointer' : 'default', transform: hover && interactive ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)', padding: padded ? 'var(--space-8)' : 0,
  };
  return <div onClick={onClick} onMouseEnter={() => interactive && setHover(true)}
    onMouseLeave={() => interactive && setHover(false)} style={{ ...base, ...style }} {...rest}>{children}</div>;
}

function GS_Input({ label, hint, optional = false, variant = 'default', type = 'text', style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  if (variant === 'search') {
    return <input type={type} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ width: '100%', padding: '9px 16px', border: '1px solid rgba(244,237,223,0.18)', borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-base)', background: focus ? 'rgba(244,237,223,0.22)' : 'rgba(244,237,223,0.12)',
        color: 'var(--text-on-dark)', outline: 'none', transition: 'background var(--dur-base)', ...style }} {...rest} />;
  }
  const field = {
    width: '100%', padding: '11px 14px', border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`,
    borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', fontFamily: 'var(--font-sans)', background: 'var(--card)',
    color: 'var(--text-body)', outline: 'none', boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...style }}>
      {label && <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>{label}{' '}
        {optional && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', fontWeight: 400 }}>(optional)</span>}</label>}
      <input type={type} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={field} {...rest} />
      {hint && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>{hint}</p>}
    </div>
  );
}

function GS_Select({ label, options = [], size = 'md', style, children, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: { padding: '7px 12px', fontSize: 'var(--text-sm)', width: 'auto' },
    md: { padding: '11px 14px', fontSize: 'var(--text-base)', width: '100%' },
  };
  const field = {
    border: `1px solid ${focus ? 'var(--fern-400)' : 'var(--line-strong)'}`, borderRadius: 'var(--radius)',
    background: 'var(--card)', color: 'var(--text-body)', outline: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
    boxShadow: focus ? '0 0 0 3px rgba(76,138,92,0.14)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)', ...sizes[size],
  };
  const select = (
    <select onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={label ? field : { ...field, ...style }} {...rest}>
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

function GS_PlantCard({ image, title, status = 'swap', plantType, rarity, distance, lister, rating, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: 'var(--card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)',
        boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow)', overflow: 'hidden', cursor: 'pointer',
        transform: hover ? 'var(--lift)' : 'none', transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)', ...style }} {...rest}>
      <div style={{ position: 'relative' }}>
        <img src={image} alt={title} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0; }}
          style={{ width: '100%', height: 188, objectFit: 'cover', display: 'block', background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <GS_Badge variant={status === 'free' ? 'free' : 'swap'} style={{ background: status === 'free' ? 'var(--clay-100)' : 'var(--card)', boxShadow: 'var(--shadow-xs)' }}>
            <GS_Icon name={status === 'free' ? 'gift' : 'repeat'} size={12} />{status === 'free' ? 'Free' : 'Swap'}
          </GS_Badge>
          {rarity && <GS_Badge variant="rarity" style={{ boxShadow: 'var(--shadow-xs)' }}><GS_Icon name="sparkles" size={11} /> {rarity}</GS_Badge>}
        </div>
      </div>
      <div style={{ padding: '13px 15px 14px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)', color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2 }}>{title}</div>
        {plantType && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginBottom: 10 }}>{plantType}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--text-sm)', color: 'var(--text-subtle)', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
          {distance && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}><GS_Icon name="mapPin" size={14} color="var(--sage-300)" /> {distance}</span>}
          {rating != null && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><GS_Icon name="star" size={13} fill="currentColor" color="var(--honey-500)" /> {rating}</span>}
          {lister && <span style={{ marginLeft: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-faint)' }}>{lister}</span>}
        </div>
      </div>
    </div>
  );
}

function GS_StarRating({ value = 0, count, interactive = false, size = 'md', onChange, style, ...rest }) {
  const [hover, setHover] = React.useState(0);
  const px = size === 'lg' ? 28 : size === 'sm' ? 15 : 18;
  if (!interactive) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--honey-600)', fontSize: 'var(--text-sm)', ...style }} {...rest}>
        <GS_Icon name="star" size={px} fill="currentColor" color="var(--honey-500)" />
        <span style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--ink)' }}>{Number(value).toFixed(1)}</span>
        {count != null && <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>· {count} swaps</span>}
      </span>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 6, ...style }} {...rest}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hover || value);
        return <button key={n} type="button" onClick={() => onChange && onChange(n)}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} aria-label={`${n} star`}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0,
            color: active ? 'var(--honey-500)' : 'var(--line-strong)', transform: active ? 'scale(1)' : 'scale(0.94)',
            transition: 'color var(--dur-fast), transform var(--dur-fast)' }}>
          <GS_Icon name="star" size={px} fill="currentColor" color="currentColor" /></button>;
      })}
    </div>
  );
}

window.GS_UI = {
  Icon: GS_Icon, Button: GS_Button, Badge: GS_Badge, TierBadge: GS_TierBadge, Card: GS_Card,
  Input: GS_Input, Select: GS_Select, PlantCard: GS_PlantCard, StarRating: GS_StarRating,
};
if (!window.GardenSwapDesignSystem_0373cf || !window.GardenSwapDesignSystem_0373cf.PlantCard) {
  window.GardenSwapDesignSystem_0373cf = window.GS_UI;
}
