/* Garden Swap Web UI Kit — BrowsePage */
function BrowsePage({ onOpenListing }) {
  const [filters, setFilters] = React.useState({});
  const [viewMode, setViewMode] = React.useState('grid');
  const [sortBy, setSortBy] = React.useState('distance');
  const [currentPage, setCurrentPage] = React.useState(1);
  const PER_PAGE = 9;

  const filtered = window.GS_LISTINGS.filter(l => {
    if (filters.type   && l.plantType !== filters.type)   return false;
    if (filters.status && l.status    !== filters.status) return false;
    if (filters.light  && l.light     !== filters.light)  return false;
    if (filters.condition && l.condition !== filters.condition) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const clearFilters = () => { setFilters({}); setCurrentPage(1); };
  const changeFilters = (f) => { setFilters(f); setCurrentPage(1); };

  const ViewToggle = () => (
    <div style={{ display:'flex', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' }}>
      {[['grid', 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z'],
        ['list', 'M3 6h18M3 12h18M3 18h18']].map(([m, d]) => (
        <button key={m} onClick={() => setViewMode(m)} title={m} style={{
          padding:'7px 11px', background: viewMode===m ? 'var(--fern-600)' : 'var(--card)',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          color: viewMode===m ? 'white' : 'var(--ink-faint)',
          transition:'background var(--dur-base)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={m==='grid'?'currentColor':'none'}
            stroke={m==='list'?'currentColor':'none'} strokeWidth="2" strokeLinecap="round">
            <path d={d}/>
          </svg>
        </button>
      ))}
    </div>
  );

  const activeFilters = Object.entries(filters).filter(([,v]) => v);

  return (
    <div style={{ maxWidth:'var(--web-content-lg)', margin:'0 auto', padding:'28px var(--web-page-px) 64px' }}>
      <Breadcrumb items={[{ label:'Home', onClick:()=>{} }, { label:'Browse Plants' }]} />

      <div style={{ display:'flex', gap:36, marginTop:24, alignItems:'flex-start' }}>
        <Sidebar filters={filters} onChange={changeFilters} onClear={clearFilters} resultCount={filtered.length} />

        <main style={{ flex:1, minWidth:0 }}>
          {/* Page title + sort bar */}
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:16, gap:16, flexWrap:'wrap' }}>
            <div>
              <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-xl)', fontWeight:500, color:'var(--ink)', lineHeight:1.2 }}>
                Plants near you
              </h1>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--text-faint)', marginTop:3 }}>
                {filtered.length} listing{filtered.length!==1?'s':''} · within 10 mi of 560001
              </p>
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <Select size="sm" value={sortBy} onChange={e=>setSortBy(e.target.value)}
                options={[{value:'distance',label:'Nearest first'},{value:'newest',label:'Newest'},{value:'rating',label:'Top rated'}]} />
              <ViewToggle />
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
              {activeFilters.map(([k,v]) => (
                <span key={k} style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'4px 10px 4px 12px',
                  background:'var(--mint-100)', color:'var(--pine-700)',
                  borderRadius:'var(--radius-pill)', fontSize:'var(--text-xs)', fontWeight:600,
                }}>
                  {v}
                  <button onClick={() => changeFilters({...filters,[k]:undefined})} style={{
                    background:'none', border:'none', cursor:'pointer', padding:0,
                    color:'var(--pine-700)', display:'flex', lineHeight:1,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </span>
              ))}
              <button onClick={clearFilters} style={{
                background:'none', border:'none', cursor:'pointer', padding:'4px 10px',
                fontSize:'var(--text-xs)', color:'var(--tomato-600)', fontWeight:600, fontFamily:'var(--font-sans)',
              }}>Clear all</button>
            </div>
          )}

          {/* Plant grid / list */}
          {pageItems.length === 0 ? (
            <div style={{ textAlign:'center', padding:'64px 0', color:'var(--text-faint)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" style={{ opacity:.4, marginBottom:12 }}>
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'var(--text-lg)', marginBottom:8 }}>No plants found</p>
              <p style={{ fontSize:'var(--text-sm)' }}>Try broadening your filters.</p>
            </div>
          ) : (
            <div style={{
              display:'grid',
              gridTemplateColumns: viewMode==='grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr',
              gap: viewMode==='grid' ? 20 : 12,
            }}>
              {pageItems.map(l => (
                <PlantCard key={l.id}
                  image={l.image} title={l.title} status={l.status} plantType={l.plantType}
                  rarity={l.rarity} distance={l.distance} lister={l.lister} rating={l.rating}
                  layout={viewMode==='list' ? 'horizontal' : 'vertical'}
                  onClick={() => onOpenListing(l)}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display:'flex', justifyContent:'center', marginTop:40 }}>
              <Pagination page={currentPage} totalPages={totalPages} onPage={p => { setCurrentPage(p); }} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { BrowsePage });
