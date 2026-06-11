Small uppercase eyebrow-pill labelling a plant's status, type, condition, rarity, or a swap's lifecycle state.

```jsx
<Badge variant="swap"><Icon name="repeat" size={12} /> Swap</Badge>
<Badge variant="free"><Icon name="gift" size={12} /> Free</Badge>
<Badge variant="type">Houseplant</Badge>
<Badge variant="condition">Needs TLC</Badge>
<Badge variant="rarity">Rare</Badge>
<Badge variant="accepted">Accepted</Badge>
```

The convention is now **swap = mint green, free/giveaway = terracotta clay** (a gift is warm) — keep it consistent, users scan for it. Labels are authored normal-case; the pill uppercases and letter-spaces them. Status badges may carry a small leading `Icon`; attribute badges (type/condition/rarity) go bare.
