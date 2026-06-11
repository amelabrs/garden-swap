Amber swap rating — read-only score or interactive picker.

```jsx
{/* display: profile / card */}
<StarRating value={4.9} count={12} />

{/* picker: post-swap rating modal */}
<StarRating value={score} interactive size="lg" onChange={setScore} />
```

Display mode prints "4.9 ⭐ (12)". Interactive mode renders five tappable stars that dim to 0.3 when inactive (faithful to the product's rating modal). Trust signals like this are front-and-center in Garden Swap — use them on listers, profiles, and supplier pages.
