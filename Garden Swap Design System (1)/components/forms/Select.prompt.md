Dropdown for the feed filter bar and the listing form.

```jsx
{/* compact filter pill */}
<Select size="sm" options={['All Types','Houseplant','Succulent','Cutting','Seed']} />

{/* full-width labelled form field */}
<Select label="Condition" options={['Healthy','Needs TLC','Fresh Cutting','Seed Packet']} />
```

`size="sm"` is the auto-width filter-bar pill; `size="md"` (default) is the full-width labelled form field. Border turns green on focus to match `Input`.
