Branded button covering every tappable action in Garden Swap. Pill-shaped by default; icons go inside the label.

```jsx
<Button variant="primary"><Icon name="repeat" size={16} /> Request Swap</Button>
<Button variant="primary" full>Publish Listing</Button>
<Button variant="accent">Reserve this plant</Button>          {/* terracotta */}
<Button variant="danger" size="sm"><Icon name="x" size={15} /> Decline</Button>
<Button variant="steward">Upgrade to Steward</Button>
<Button variant="outline" size="sm">Manage Plan</Button>
<Button variant="text">+ Add</Button>
```

Variants: `primary` (fern green, the default CTA), `accent` (terracotta clay, warm secondary CTA), `steward` (denim, top tier), `danger` (tomato), `outline` / `text` (quiet). Sizes `sm | md | lg`. `full` stretches; set `pill={false}` for the softer 12px-rounded rectangle. Hover deepens the fill; press settles 1px. Pair with the `Icon` component, never emoji.
