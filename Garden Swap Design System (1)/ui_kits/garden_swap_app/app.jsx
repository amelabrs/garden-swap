/* Garden Swap UI kit — app shell + orchestration */
const { useState } = React;

function TopBar({ tier }) {
  const { Input, Icon } = window.GardenSwapDesignSystem_0373cf;
  const isSprout = tier === 'sprout';
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px', background: 'var(--pine-900)', color: 'var(--text-on-dark)', flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 'var(--radius-full)', background: 'var(--fern-500)', flexShrink: 0 }}>
          <Icon name="leaf" size={17} color="var(--paper)" />
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: 500, whiteSpace: 'nowrap', color: 'var(--paper)', letterSpacing: '0' }}>Garden Swap</h1>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={chromeBtn} title="Location" aria-label="Location"><Icon name="mapPin" size={18} color="var(--paper)" /></button>
        {!isSprout && <button style={chromeBtn} title="Notifications" aria-label="Notifications"><Icon name="bell" size={18} color="var(--paper)" /></button>}
        <button style={chromeBtn} title="Profile" aria-label="Account"><Icon name="user" size={18} color="var(--paper)" /></button>
      </div>
      <div style={{ flexBasis: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span style={{ position: 'absolute', left: 14, display: 'flex', pointerEvents: 'none', opacity: 0.7 }}>
          <Icon name="search" size={16} color="var(--paper)" />
        </span>
        <Input variant="search" placeholder="Search plants near you…" style={{ paddingLeft: 38 }} />
      </div>
    </header>
  );
}

const chromeBtn = {
  width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: 'none', borderRadius: 'var(--radius-full)',
  background: 'rgba(244,237,223,0.10)', cursor: 'pointer',
};

function BottomNav({ view, setView }) {
  const { Icon } = window.GardenSwapDesignSystem_0373cf;
  const items = [
    { k: 'feed', label: 'Swap', icon: 'leaf' },
    { k: 'chats', label: 'Chats', icon: 'message' },
    { k: 'profile', label: 'Profile', icon: 'user' },
  ];
  return (
    <nav style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100, display: 'flex',
      background: 'var(--card)', borderTop: '1px solid var(--line)', padding: '8px 0 10px',
    }}>
      {items.map((it) => {
        const active = view === it.k;
        return (
          <button key={it.k} onClick={() => setView(it.k)} style={{
            flex: 1, border: 'none', background: 'none', padding: '4px 8px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)',
            color: active ? 'var(--fern-600)' : 'var(--text-faint)', fontWeight: active ? 600 : 500,
          }}>
            <Icon name={it.icon} size={21} strokeWidth={active ? 2 : 1.75} />
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}

function App() {
  const { Icon } = window.GardenSwapDesignSystem_0373cf;
  const [tier, setTier] = useState('sprout');
  const [view, setView] = useState('feed');
  const [detail, setDetail] = useState(null);
  const [swapReq, setSwapReq] = useState(null);
  const [chat, setChat] = useState(null);
  const [paywall, setPaywall] = useState(null);
  const [rating, setRating] = useState(false);
  const [newListing, setNewListing] = useState(false);
  const [toast, setToast] = useState(null);

  function flash(msg) { setToast(msg); setTimeout(() => setToast(null), 2400); }

  function openPaywall(reason) {
    const reasons = {
      ad_free: 'Go ad-free and unlock smart-match alerts with Grower.',
      upgrade: 'Grow your reach with a Garden Swap membership.',
    };
    setPaywall(reasons[reason] || reasons.upgrade);
  }

  function subscribe(t) {
    setTier(t); setPaywall(null);
    flash(`Welcome to ${t.charAt(0).toUpperCase() + t.slice(1)}!`);
  }

  return (
    <div style={{
      position: 'relative', width: 390, height: 800, background: 'var(--paper)',
      borderRadius: 40, overflow: 'hidden', boxShadow: '0 30px 70px rgba(32,37,29,0.34)',
      border: '11px solid #16140F', display: 'flex', flexDirection: 'column',
    }}>
      <TopBar tier={tier} />
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 70, position: 'relative' }}>
        {view === 'feed' && <FeedScreen tier={tier} onOpenListing={setDetail} onOpenPaywall={openPaywall} />}
        {view === 'chats' && <ChatsScreen onOpenChat={setChat} />}
        {view === 'profile' && <ProfileScreen tier={tier} onUpgrade={() => openPaywall('upgrade')} onOpenListing={setDetail} />}
      </div>

      {/* FAB */}
      <button onClick={() => setNewListing(true)} aria-label="List a plant" style={{
        position: 'absolute', bottom: 80, right: 18, width: 58, height: 58, borderRadius: 'var(--radius-full)',
        background: 'var(--fern-600)', color: '#fff', border: 'none',
        boxShadow: 'var(--shadow-fab)', cursor: 'pointer', zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="plus" size={26} color="#fff" /></button>

      <BottomNav view={view} setView={setView} />

      {/* overlays */}
      {detail && <DetailModal listing={detail} onClose={() => setDetail(null)}
        onRequestSwap={() => { setSwapReq(detail); setDetail(null); }} />}
      {swapReq && <SwapRequestModal listing={swapReq} onClose={() => setSwapReq(null)}
        onSend={() => { setSwapReq(null); setView('chats'); flash('Request sent — chat opened.'); }} />}
      {chat && <ChatThread chat={chat} onClose={() => setChat(null)} onRate={() => { setChat(null); setRating(true); }} />}
      {paywall && <PaywallModal reason={paywall} onClose={() => setPaywall(null)} onSubscribe={subscribe} />}
      {rating && <RatingModal onClose={() => { setRating(false); flash('Thanks for rating!'); }} />}
      {newListing && <NewListingModal onClose={() => { setNewListing(false); flash('Listing published!'); }} />}

      {toast && (
        <div style={{
          position: 'absolute', bottom: 92, left: '50%', transform: 'translateX(-50%)', zIndex: 400,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'var(--pine-900)', color: 'var(--paper)', padding: '11px 18px', borderRadius: 'var(--radius-pill)',
          fontSize: 'var(--text-sm)', fontWeight: 500, boxShadow: 'var(--shadow-modal)', whiteSpace: 'nowrap',
        }}>
          <Icon name="check" size={15} color="var(--mint-200)" /> {toast}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
