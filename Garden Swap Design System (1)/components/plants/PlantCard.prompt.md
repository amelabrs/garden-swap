The feed's hero unit — a tappable plant listing card. Composes `Badge` internally.

```jsx
<PlantCard
  image="https://images.unsplash.com/photo-…"
  title="Monstera Deliciosa"
  status="swap"            // green badge; "free" → blue
  plantType="Houseplant"
  rarity="Rare"            // optional purple badge
  distance="2.1 mi"
  lister="Priya"
  rating={4.9}
  onClick={() => openDetail(id)}
/>
```

Photo is full-bleed at the top (200px, cover). The card lifts on hover and is entirely clickable. Drop `rarity` for common plants; omit `rating` for new listers. Lay several out in a `grid` of `minmax(280px, 1fr)` to recreate the feed.
