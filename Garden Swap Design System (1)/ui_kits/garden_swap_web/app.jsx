/* Garden Swap Web UI Kit — app.jsx (root shell + router) */
function App() {
  const [page, setPage]       = React.useState('browse');
  const [listing, setListing] = React.useState(null);

  const user = { name: 'Priya Sharma', tier: 'grower' };

  const navigate = (p, data) => {
    setPage(p);
    if (data?.listing) setListing(data.listing);
    // Scroll main area back to top
    const el = document.getElementById('gs-main');
    if (el) el.scrollTop = 0;
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--surface-page)' }}>
      <Nav
        page={page}
        user={user}
        onNavigate={navigate}
        onSearch={q => navigate('browse')}
        notifCount={2}
      />

      <div id="gs-main" style={{ flex:1, overflowY:'auto' }}>
        {page === 'browse' && (
          <BrowsePage onOpenListing={l => navigate('detail', { listing: l })} />
        )}
        {page === 'detail' && (
          <DetailPage
            listing={listing}
            onBack={() => navigate('browse')}
            onViewProfile={() => navigate('profile')}
          />
        )}
        {(page === 'profile' || page === 'listings') && (
          <ProfilePage
            user={user}
            onViewListing={l => navigate('detail', { listing: l })}
          />
        )}
        {page === 'home' && (
          <BrowsePage onOpenListing={l => navigate('detail', { listing: l })} />
        )}
        {page === 'swaps' && (
          <ProfilePage
            user={user}
            onViewListing={l => navigate('detail', { listing: l })}
          />
        )}
      </div>

      <Footer onNavigate={navigate} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
