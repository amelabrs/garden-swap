Garden Swap's line-icon system — the brand replacement for emoji. Paths are Lucide (ISC-licensed).

```jsx
<Icon name="leaf" />
<Icon name="repeat" size={16} />                 {/* swap */}
<Icon name="gift" size={16} />                   {/* free / giveaway */}
<Icon name="star" fill="currentColor" color="var(--honey-500)" />  {/* filled rating star */}
<Icon name="mapPin" size={15} color="var(--text-subtle)" />
```

Icons inherit text color via `currentColor`. Use `fill="currentColor"` only for the rating star (everything else is outline). The plant glyphs — `leaf`, `sprout`, `shrub`, `trees`, `flower` — double as the Sprout/Grower/Steward tier marks and brand decoration. Default size 20px, stroke 1.75. See `Icon.names` for the full set.
