/* Garden Swap UI kit — shared modal shells + detail / paywall / rating / new-listing / swap-request */

const iconClose = {
  border: 'none', background: 'transparent', color: 'var(--text-subtle)',
  width: 32, height: 32, borderRadius: 'var(--radius-full)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};

const closeX = {
  position: 'absolute', top: 12, right: 12, border: 'none', background: 'rgba(20,30,18,0.45)',
  color: '#fff', width: 34, height: 34, borderRadius: 'var(--radius-full)',
  cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
};

function CloseBtn({ onClose, onImage = false }) {
  const { Icon } = window.GardenSwapDesignSystem_0373cf;
  return (
    <button onClick={onClose} aria-label="Close" style={onImage ? closeX : { ...iconClose, position: 'absolute', top: 14, right: 14, zIndex: 10 }}>
      <Icon name="x" size={onImage ? 18 : 20} color={onImage ? '#fff' : 'var(--text-subtle)'} />
    </button>
  );
}

/* Full-cover panel inside the phone (used by chat thread) */
function Sheet({ children, onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--card)', zIndex: 300, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}

/* Centered card over a scrim (detail, paywall, rating) */
function Modal({ children, onClose, maxWidth = 460 }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 300, background: 'var(--scrim)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--card)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth,
        maxHeight: '90%', overflowY: 'auto', position: 'relative', boxShadow: 'var(--shadow-modal)',
      }}>
        {children}
      </div>
    </div>
  );
}

const modalTitle = {
  fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-xl)',
  letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
};

/* ── Listing detail ─────────────────────────────────────────── */
function DetailModal({ listing, onClose, onRequestSwap }) {
  const { Badge, Button, Icon } = window.GardenSwapDesignSystem_0373cf;
  return (
    <Modal onClose={onClose}>
      <CloseBtn onClose={onClose} onImage />
      <img src={listing.image} alt={listing.title}
        onError={(e) => { e.currentTarget.style.opacity = 0; }}
        style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block', background: 'linear-gradient(150deg,var(--mint-200),var(--fern-400))' }} />
      <div style={{ padding: '18px 22px 22px' }}>
        <h2 style={{ ...modalTitle, marginBottom: 10 }}>{listing.title}</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <Badge variant={listing.status === 'free' ? 'free' : 'swap'}>
            <Icon name={listing.status === 'free' ? 'gift' : 'repeat'} size={12} />{listing.status === 'free' ? 'Free' : 'Swap'}
          </Badge>
          <Badge variant="type">{listing.plantType}</Badge>
          <Badge variant="condition">{listing.condition}</Badge>
          {listing.rarity && <Badge variant="rarity"><Icon name="sparkles" size={11} /> {listing.rarity}</Badge>}
        </div>
        <p style={{ color: 'var(--ink)', lineHeight: 'var(--leading-normal)', marginBottom: 16 }}>{listing.desc}</p>
        <div style={{ display: 'flex', gap: 18, marginBottom: 16, fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
          {listing.light && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="sun" size={15} color="var(--honey-500)" /> {listing.light}</span>}
          {listing.size && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="ruler" size={15} color="var(--sage-300)" /> {listing.size}</span>}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', marginBottom: 16,
          background: 'var(--paper-raised)', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg,var(--mint-200),var(--fern-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="user" size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{listing.lister}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', color: 'var(--honey-600)' }}>
              <Icon name="star" size={13} fill="currentColor" color="var(--honey-500)" /> {listing.rating}
            </div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
            <Icon name="mapPin" size={14} color="var(--clay-600)" /> {listing.distance}
          </span>
        </div>
        <Button variant="primary" full onClick={onRequestSwap}><Icon name="repeat" size={17} /> Request Swap</Button>
      </div>
    </Modal>
  );
}

/* ── Swap request ───────────────────────────────────────────── */
function SwapRequestModal({ listing, onClose, onSend }) {
  const { Button, Icon } = window.GardenSwapDesignSystem_0373cf;
  const [offer, setOffer] = React.useState('trade');
  const [msg, setMsg] = React.useState('');
  const opt = (val, icon, label) => (
    <label onClick={() => setOffer(val)} style={{
      display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', padding: '12px 14px',
      borderRadius: 'var(--radius)', border: `1.5px solid ${offer === val ? 'var(--fern-500)' : 'var(--line)'}`,
      background: offer === val ? 'var(--mint-100)' : 'var(--card)', transition: 'all var(--dur-base)',
    }}>
      <Icon name={icon} size={18} color={offer === val ? 'var(--fern-600)' : 'var(--text-subtle)'} />
      <span style={{ fontSize: 'var(--text-base)', fontWeight: offer === val ? 600 : 400 }}>{label}</span>
    </label>
  );
  return (
    <Modal onClose={onClose} maxWidth={440}>
      <CloseBtn onClose={onClose} />
      <div style={{ padding: '24px 24px 26px' }}>
        <h2 style={{ ...modalTitle, marginBottom: 16 }}>Request a swap</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', background: 'var(--paper-raised)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', marginBottom: 16 }}>
          <Icon name="leaf" size={16} color="var(--fern-600)" />
          <strong style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{listing.title}</strong>
          <span style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)' }}>· {listing.lister}</span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="gs-eyebrow" style={{ display: 'block', marginBottom: 9 }}>What would you like to offer?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {opt('trade', 'leaf', 'Offer one of my plants')}
            {opt('giveaway', 'gift', 'Request as a giveaway')}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label className="gs-eyebrow" style={{ display: 'block', marginBottom: 6 }}>Message to the lister (optional)</label>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={2} maxLength={250}
            placeholder="Hi! I love your plant…" style={{
              width: '100%', padding: '11px 14px', border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', resize: 'vertical',
              fontFamily: 'var(--font-sans)', background: 'var(--card)', color: 'var(--ink)',
            }} />
        </div>
        <Button variant="primary" full onClick={onSend}><Icon name="send" size={16} /> Send Request &amp; Open Chat</Button>
      </div>
    </Modal>
  );
}

/* ── Rating ─────────────────────────────────────────────────── */
function RatingModal({ onClose }) {
  const { Button, StarRating } = window.GardenSwapDesignSystem_0373cf;
  const [score, setScore] = React.useState(0);
  return (
    <Modal onClose={onClose} maxWidth={400}>
      <CloseBtn onClose={onClose} />
      <div style={{ padding: '24px 24px 26px', textAlign: 'center' }}>
        <h2 style={{ ...modalTitle, marginBottom: 8 }}>Rate this swap</h2>
        <p style={{ marginBottom: 18, color: 'var(--text-subtle)', fontSize: 'var(--text-base)' }}>How was your swap with Kabir?</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <StarRating value={score} interactive size="lg" onChange={setScore} />
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginBottom: 18 }}>{score ? `${score} of 5 stars` : 'Tap to rate'}</p>
        <textarea rows={2} maxLength={200} placeholder="Add a note (optional)…" style={{
          width: '100%', padding: '11px 14px', border: '1px solid var(--line-strong)',
          borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', resize: 'vertical',
          fontFamily: 'var(--font-sans)', background: 'var(--card)', marginBottom: 18, textAlign: 'left',
        }} />
        <Button variant="primary" full onClick={onClose}>Submit Rating</Button>
      </div>
    </Modal>
  );
}

/* ── New listing ────────────────────────────────────────────── */
function NewListingModal({ onClose }) {
  const { Button, Input, Select, Icon } = window.GardenSwapDesignSystem_0373cf;
  const [status, setStatus] = React.useState('swap');
  const statusOpt = (val, icon, label) => (
    <label onClick={() => setStatus(val)} style={{
      flex: 1, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      padding: '11px 10px', borderRadius: 'var(--radius)',
      border: `1.5px solid ${status === val ? 'var(--fern-500)' : 'var(--line)'}`,
      background: status === val ? 'var(--mint-100)' : 'var(--card)',
      fontSize: 'var(--text-base)', fontWeight: status === val ? 600 : 400, transition: 'all var(--dur-base)',
    }}>
      <Icon name={icon} size={16} color={status === val ? 'var(--fern-600)' : 'var(--text-subtle)'} /> {label}
    </label>
  );
  return (
    <Modal onClose={onClose} maxWidth={440}>
      <CloseBtn onClose={onClose} />
      <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={modalTitle}>List your plant</h2>
        <div style={{
          border: '1.5px dashed var(--line-strong)', borderRadius: 'var(--radius)', padding: '26px 12px',
          textAlign: 'center', color: 'var(--text-faint)', fontSize: 'var(--text-sm)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'var(--paper-raised)',
        }}>
          <Icon name="plus" size={24} color="var(--sage-300)" />
          Add photos (min 1, max 5)
        </div>
        <Input label="Plant name" placeholder="e.g. Monstera Deliciosa" />
        <Select label="Plant type" options={['Select type…', 'Houseplant', 'Succulent', 'Cutting', 'Seed', 'Herb']} />
        <Select label="Condition" options={['Select condition…', 'Healthy', 'Needs TLC', 'Fresh Cutting', 'Seed Packet']} />
        <div>
          <label className="gs-eyebrow" style={{ display: 'block', marginBottom: 9 }}>Status</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {statusOpt('swap', 'repeat', 'Swap')}
            {statusOpt('free', 'gift', 'Free / Giveaway')}
          </div>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>
          <Icon name="mapPin" size={14} color="var(--clay-600)" /> Location: your registered zip code
        </p>
        <Button variant="primary" full onClick={onClose}>Publish Listing</Button>
      </div>
    </Modal>
  );
}

Object.assign(window, { Sheet, Modal, closeX, iconClose, CloseBtn, DetailModal, SwapRequestModal, RatingModal, NewListingModal });
