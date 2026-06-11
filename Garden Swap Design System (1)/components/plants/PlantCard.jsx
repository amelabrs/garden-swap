import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Garden Swap — PlantCard
 * The hero unit of the feed. Two layouts:
 *  - "vertical" (default) — full-bleed photo top, text below. Mobile + web grid.
 *  - "horizontal" — photo left (fixed width), text right. Web list/search view.
 * Warm-white card with a kraft hairline; lifts on hover.
 */
export function PlantCard({
  image,
  title,
  status = 'swap',     // 'swap' | 'free'
  plantType,
  rarity,
  distance,            // e.g. "2.1 mi"
  lister,
  rating,              // e.g. 4.9
  layout = 'vertical', // 'vertical' | 'horizontal'
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const shell = {
    background: 'var(--card)',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--line)',
    boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow)',
    overflow: 'hidden',
    cursor: 'pointer',
    transform: hover ? 'var(--lift)' : 'none',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
    ...(layout === 'horizontal' ? { display: 'flex', flexDirection: 'row' } : {}),
    ...style,
  };

  const imgH  = layout === 'horizontal' ? '100%' : 188;
  const imgW  = layout === 'horizontal' ? 160    : '100%';
  const imgStyle = layout === 'horizontal'
    ? { width: imgW, minWidth: imgW, height: '100%', minHeight: 120, objectFit: 'cover', display: 'block', flexShrink: 0,
        background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))' }
    : { width: '100%', height: imgH, objectFit: 'cover', display: 'block',
        background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))' };

  const imgWrap = layout === 'horizontal'
    ? { position: 'relative', flexShrink: 0, width: imgW }
    : { position: 'relative' };

  const badges = (
    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
      <Badge variant={status === 'free' ? 'free' : 'swap'} style={{ background: status === 'free' ? 'var(--clay-100)' : 'var(--card)', boxShadow: 'var(--shadow-xs)' }}>
        <Icon name={status === 'free' ? 'gift' : 'repeat'} size={12} />
        {status === 'free' ? 'Free' : 'Swap'}
      </Badge>
      {rarity && (
        <Badge variant="rarity" style={{ boxShadow: 'var(--shadow-xs)' }}>
          <Icon name="sparkles" size={11} /> {rarity}
        </Badge>
      )}
    </div>
  );

  const body = (
    <div style={{ padding: '13px 15px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)',
          color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2,
        }}>{title}</div>
        {plantType && (
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginBottom: 10 }}>{plantType}</div>
        )}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 'var(--text-sm)', color: 'var(--text-subtle)',
        paddingTop: 10, borderTop: '1px solid var(--line)',
        marginTop: layout === 'horizontal' ? 'auto' : 0,
      }}>
        {distance && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
            <Icon name="mapPin" size={14} color="var(--sage-300)" /> {distance}
          </span>
        )}
        {rating != null && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <Icon name="star" size={13} fill="currentColor" color="var(--honey-500)" /> {rating}
          </span>
        )}
        {lister && (
          <span style={{ marginLeft: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-faint)' }}>
            {lister}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={shell}
      {...rest}
    >
      <div style={imgWrap}>
        <img src={image} alt={title} loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = 0; }}
          style={imgStyle}
        />
        {badges}
      </div>
      {body}
    </div>
  );
}
