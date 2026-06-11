/**
 * Garden Swap — Sidebar (web)
 * Filter panel for the Browse page. Collapsible sections with radio groups
 * and a clear-all link. Sits in a 264px column at ≥ 900px.
 */
export function Sidebar({ filters = {}, onChange, onClear, resultCount, style }) {
  const set = (key, val) => onChange?.({ ...filters, [key]: val });
  const [open, setOpen] = React.useState({ type: true, status: true, distance: true, condition: false, light: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));

  const activeCount = Object.values(filters).filter(Boolean).length;

  const Section = ({ id, label, children }) => (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button onClick={() => toggle(id)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '13px 0', fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-body)',
      }}>
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round"
          style={{ transform: open[id] ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open[id] && <div style={{ paddingBottom: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>}
    </div>
  );

  const Radio = ({ group, value, label }) => {
    const active = filters[group] === value || (!filters[group] && value === '');
    return (
      <label style={{
        display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer',
        fontSize: 'var(--text-sm)', color: active ? 'var(--pine-700)' : 'var(--text-body)',
        fontWeight: active ? 600 : 400,
      }}>
        <span style={{
          width: 16, height: 16, borderRadius: 'var(--radius-full)', flexShrink: 0,
          border: `2px solid ${active ? 'var(--fern-600)' : 'var(--line-strong)'}`,
          background: active ? 'var(--fern-600)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all var(--dur-base)',
        }}>
          {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'white' }} />}
        </span>
        <input type="radio" name={group} value={value} checked={active}
          onChange={() => set(group, value || undefined)}
          style={{ display: 'none' }} />
        {label}
      </label>
    );
  };

  return (
    <aside style={{
      width: 'var(--web-sidebar-w)', flexShrink: 0,
      background: 'var(--surface-page)',
      padding: '0 0 var(--space-10)',
      ...style,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 0 4px',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: 'var(--text-sm)', color: 'var(--text-body)',
        }}>
          Filters {activeCount > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--fern-600)', color: 'white',
              fontSize: '0.65rem', fontWeight: 700, marginLeft: 6,
            }}>{activeCount}</span>
          )}
        </span>
        {activeCount > 0 && (
          <button onClick={onClear} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: 'var(--text-xs)', color: 'var(--fern-600)',
            fontFamily: 'var(--font-sans)', fontWeight: 600,
          }}>Clear all</button>
        )}
      </div>

      {resultCount != null && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', paddingBottom: 8 }}>
          {resultCount} plant{resultCount !== 1 ? 's' : ''} found
        </p>
      )}

      <Section id="type" label="Plant Type">
        {['', 'Houseplant', 'Succulent', 'Cutting', 'Herb', 'Seed', 'Tree & Shrub', 'Aquatic'].map(v => (
          <Radio key={v} group="type" value={v} label={v || 'All types'} />
        ))}
      </Section>

      <Section id="status" label="Listing Type">
        {[['', 'All listings'], ['swap', 'Swap'], ['free', 'Free / Giveaway']].map(([v, l]) => (
          <Radio key={v} group="status" value={v} label={l} />
        ))}
      </Section>

      <Section id="distance" label="Distance">
        {[['', 'Any distance'], ['2', 'Within 2 mi'], ['5', 'Within 5 mi'], ['10', 'Within 10 mi'], ['25', 'Within 25 mi']].map(([v, l]) => (
          <Radio key={v} group="distance" value={v} label={l} />
        ))}
      </Section>

      <Section id="condition" label="Condition">
        {['', 'Healthy', 'Fresh Cutting', 'Seed Packet', 'Bare Root'].map(v => (
          <Radio key={v} group="condition" value={v} label={v || 'Any condition'} />
        ))}
      </Section>

      <Section id="light" label="Light Needs">
        {['', 'Full Sun', 'Partial Sun', 'Low Light'].map(v => (
          <Radio key={v} group="light" value={v} label={v || 'Any light'} />
        ))}
      </Section>
    </aside>
  );
}

Object.assign(window, { Sidebar });
