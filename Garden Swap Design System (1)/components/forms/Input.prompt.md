Text field for forms and the top-bar search.

```jsx
<Input label="Plant Name" placeholder="e.g. Monstera Deliciosa" />
<Input label="Light Needs" optional hint="Helps Grower+ filters find it" />
<Input variant="search" placeholder="Search plants near you…" />
```

Default fields show a grey border that turns green on focus. `variant="search"` renders the translucent white-on-green pill used in the dark top bar. Labels and hints are sentence case; mark non-required fields with `optional`.
