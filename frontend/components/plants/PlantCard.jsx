import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Garden Swap — PlantCard
 * The hero unit of the feed. Full-bleed photo, a serif plant name, a row of
 * status/type/rarity badges, and an icon-driven footer of distance · lister ·
 * rating. Warm-white card with a kraft hairline; lifts on hover.
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
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--line)',
        boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hover ? 'var(--lift)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = 0; }}
          style={{
            width: '100%', height: 188, objectFit: 'cover', display: 'block',
            background: 'linear-gradient(150deg, var(--mint-200), var(--fern-400))',
          }}
        />
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
      </div>
      <div style={{ padding: '13px 15px 14px' }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)',
          color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2,
        }}>
          {title}
        </div>
        {plantType && (
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginBottom: 10 }}>{plantType}</div>
        )}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 'var(--text-sm)', color: 'var(--text-subtle)',
          paddingTop: 10, borderTop: '1px solid var(--line)',
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
    </div>
  );
}
