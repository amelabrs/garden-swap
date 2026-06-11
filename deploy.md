Here's how to integrate the design system into a real codebase:

Design siste

Option A — Plain HTML / static site (simplest)
Copy two things from the zip into your project:

styles.css          ← all design tokens
tokens/             ← token partials (imported by styles.css)
_ds_bundle.js       ← all 15 compiled React components
Then in any HTML page:

<link rel="stylesheet" href="path/to/styles.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="path/to/_ds_bundle.js"></script>

<script>
  const { Button, Nav, PlantCard, Footer } =
    window.GardenSwapDesignSystem_0373cf;
</script>
Option B — React / Next.js / Vite
Copy styles.css + tokens/ into your public/ or src/styles/
Copy the source JSX files from components/ into your codebase
Import directly:
// Import tokens globally (e.g. in _app.jsx or main.jsx)
import './styles.css';

// Import individual components
import { Button } from './components/core/Button.jsx';
import { Nav }    from './components/web/Nav.jsx';
import { PlantCard } from './components/plants/PlantCard.jsx';
Note: The JSX files use plain React with no build-tool-specific syntax, so they drop straight into any Vite, CRA, or Next.js project.

Option C — Use a template as a starting page
Copy a whole template folder (e.g. templates/garden-swap-web/) into your project, update the ds-base.js path to point at your styles.css and _ds_bundle.js, and you have a working starting point.

Token-only usage (no React)
If you just need the CSS variables:

<link rel="stylesheet" href="styles.css">
Then use tokens anywhere:

.my-button {
  background: var(--fern-600);
  border-radius: var(--radius-pill);
  font-family: var(--font-sans);
  padding: var(--space-3) var(--space-6);
}
Bottom line: styles.css + _ds_bundle.js are the two deployment artifacts. Everything else is source.