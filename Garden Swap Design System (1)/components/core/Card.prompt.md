The base surface for everything in Garden Swap — white, 12px rounded, soft shadow, no border.

```jsx
<Card interactive onClick={open}>
  <img src={photo} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
  <div style={{ padding: 14 }}>…</div>
</Card>

<Card padded>  {/* profile section */}
  <h3>🎯 Wish List</h3>
</Card>
```

Use `interactive` for tappable cards (plant cards, chat rows) — it lifts `translateY(-2px)` and deepens the shadow on hover. Use `padded` for content sections that need the standard 16px inset. Leave unpadded when a full-bleed image sits at the top.
