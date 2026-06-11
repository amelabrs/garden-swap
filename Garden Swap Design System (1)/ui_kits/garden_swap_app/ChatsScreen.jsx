/* Garden Swap UI kit — Chats list + thread */
function ChatsScreen({ onOpenChat }) {
  const { Badge, Icon } = window.GardenSwapDesignSystem_0373cf;
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 500, marginBottom: 14, letterSpacing: 'var(--tracking-tight)' }}>Your swaps</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {window.GS_CHATS.map((c) => (
          <div key={c.id} onClick={() => onOpenChat(c)} style={{
            padding: 14, background: 'var(--card)', borderRadius: 'var(--radius-card)',
            border: '1px solid var(--line)', boxShadow: 'var(--shadow)', cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
              <strong style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-md)' }}>{c.listingTitle}</strong>
              <Badge variant={c.state}>{c.state}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-sm)', color: 'var(--text-subtle)', marginBottom: 6 }}>
              with {c.other} · <Icon name={c.swapType === 'trade' ? 'repeat' : 'gift'} size={13} /> {c.swapType === 'trade' ? 'Swap' : 'Free'}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {c.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatThread({ chat, onClose, onAccept, onRate }) {
  const { Button, Icon } = window.GardenSwapDesignSystem_0373cf;
  const [msgs, setMsgs] = React.useState(chat.messages);
  const [draft, setDraft] = React.useState('');
  const [state, setState] = React.useState(chat.state);
  const endRef = React.useRef(null);
  React.useEffect(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [msgs]);

  function send() {
    if (!draft.trim()) return;
    setMsgs([...msgs, { mine: true, body: draft.trim(), time: 'now' }]);
    setDraft('');
  }

  return (
    <Sheet onClose={onClose}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, background: 'var(--card)' }}>
        <div>
          <strong style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--text-md)' }}>{chat.listingTitle}</strong>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>with {chat.other} · {state}</div>
        </div>
        <button onClick={onClose} style={iconClose} aria-label="Close"><Icon name="x" size={18} /></button>
      </div>

      <div ref={endRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--paper)' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            maxWidth: '76%', padding: '9px 13px', borderRadius: 16, fontSize: 'var(--text-base)', lineHeight: 1.4,
            alignSelf: m.mine ? 'flex-end' : 'flex-start',
            borderBottomRightRadius: m.mine ? 5 : 16, borderBottomLeftRadius: m.mine ? 16 : 5,
            background: m.mine ? 'var(--mint-200)' : 'var(--card)',
            border: m.mine ? 'none' : '1px solid var(--line)',
            color: m.mine ? 'var(--pine-900)' : 'var(--ink)',
          }}>
            {!m.mine && m.sender && <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fern-600)', marginBottom: 2 }}>{m.sender}</div>}
            <div>{m.body}</div>
            <div style={{ fontSize: '0.7rem', color: m.mine ? 'rgba(20,48,29,0.5)' : 'var(--text-faint)', marginTop: 3 }}>{m.time}</div>
          </div>
        ))}
      </div>

      {state === 'pending' && (
        <div style={{ padding: '10px 16px', display: 'flex', gap: 8, borderTop: '1px solid var(--line)', background: 'var(--card)' }}>
          <Button variant="primary" size="sm" onClick={() => setState('accepted')}><Icon name="check" size={15} /> Accept</Button>
          <Button variant="danger" size="sm" onClick={() => setState('declined')}><Icon name="x" size={15} /> Decline</Button>
        </div>
      )}
      {state === 'accepted' && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)', background: 'var(--card)' }}>
          <Button variant="primary" size="sm" onClick={() => setState('completed')}><Icon name="handshake" size={16} /> Confirm handoff complete</Button>
        </div>
      )}
      {state === 'completed' && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)', background: 'var(--card)' }}>
          <Button variant="primary" size="sm" onClick={onRate}><Icon name="star" size={15} fill="currentColor" /> Rate this swap</Button>
        </div>
      )}

      {state !== 'declined' && (
        <div style={{ display: 'flex', gap: 8, padding: '10px 16px', borderTop: '1px solid var(--line)', background: 'var(--card)' }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && send()}
            placeholder="Type a message…" style={{
              flex: 1, padding: '10px 14px', border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-base)', outline: 'none', fontFamily: 'var(--font-sans)', background: 'var(--card)',
            }} />
          <Button variant="primary" pill onClick={send} aria-label="Send"><Icon name="send" size={16} /></Button>
        </div>
      )}
    </Sheet>
  );
}

Object.assign(window, { ChatsScreen, ChatThread });
