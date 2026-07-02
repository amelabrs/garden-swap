# Bloom Homepage — Design Component

**File:** `web/pages/BloomHomepage.jsx`

## Layout
- **Max-width:** 1320px, centered
- **Background:** `#FFFBF5` (warm cream)
- **Font:** Figtree (body), Outfit (headlines)

## Sections

### 1. Navigation
```jsx
<nav style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '22px 44px',
  background: '#FFFBF5'
}}>
  {/* Logo + links */}
  <div style={{ display: 'flex', gap: 40 }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#2E7D52' }} />
      <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 25, color: '#2E7D52' }}>
        Garden Swap
      </span>
    </div>
    <div style={{ display: 'flex', gap: 28, fontSize: 17, fontWeight: 600, color: '#3c4b40' }}>
      <span>Browse</span>
      <span>How it works</span>
      <span>Community</span>
    </div>
  </div>
  
  {/* Sign in + Join */}
  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
    <span style={{ fontSize: 17, fontWeight: 600, color: '#3c4b40' }}>Sign in</span>
    <button style={{
      background: '#2E7D52',
      color: '#fff',
      fontWeight: 700,
      fontSize: 17,
      padding: '13px 26px',
      borderRadius: 999,
      border: 'none',
      boxShadow: '0 6px 16px rgba(46,125,82,.28)',
      cursor: 'pointer'
    }}>
      Join free
    </button>
  </div>
</nav>
```

### 2. Hero Section
```jsx
<section style={{
  margin: '8px 24px 0',
  background: 'linear-gradient(135deg, #ECF7EC, #FBF1D8)',
  borderRadius: 30,
  padding: '56px 52px',
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  gap: 48,
  alignItems: 'center'
}}>
  {/* Left: copy + CTA */}
  <div>
    <span style={{
      display: 'inline-block',
      background: '#FBE6B0',
      color: '#8A6314',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '8px 16px',
      borderRadius: 999,
      marginBottom: 22
    }}>
      🌱 grow together
    </span>
    
    <h1 style={{
      fontFamily: 'Outfit',
      fontWeight: 800,
      fontSize: 54,
      lineHeight: 1.04,
      letterSpacing: '-.02em',
      color: '#1f4a32',
      marginBottom: 24
    }}>
      Swap plants with gardeners down the lane.
    </h1>
    
    <p style={{
      fontSize: 21,
      lineHeight: 1.55,
      color: '#46544a',
      marginBottom: 30,
      maxWidth: 470
    }}>
      Swap cuttings, share seedlings, and meet the green-thumbs on your street. 
      It's free, friendly and a little bit addictive.
    </p>
    
    {/* Search bar */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      border: '1px solid #E7DFC8',
      borderRadius: 999,
      padding: '8px 8px 8px 24px',
      maxWidth: 480,
      boxShadow: '0 6px 22px rgba(31,74,50,.07)',
      marginBottom: 24
    }}>
      <span style={{ fontSize: 18, color: '#8a857a' }}>
        Search "monstera", "tomato seeds"…
      </span>
      <button style={{
        marginLeft: 'auto',
        background: '#2E7D52',
        color: '#fff',
        fontWeight: 700,
        fontSize: 17,
        padding: '13px 26px',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer'
      }}>
        Search
      </button>
    </div>
    
    {/* CTAs */}
    <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
      <button style={{
        background: '#DD7A2E',
        color: '#fff',
        fontWeight: 700,
        fontSize: 18,
        padding: '16px 30px',
        borderRadius: 999,
        border: 'none',
        boxShadow: '0 8px 20px rgba(221,122,46,.30)',
        cursor: 'pointer'
      }}>
        Start swapping
      </button>
      <button style={{
        background: '#fff',
        border: '2px solid #2E7D52',
        color: '#2E7D52',
        fontWeight: 700,
        fontSize: 18,
        padding: '14px 28px',
        borderRadius: 999,
        cursor: 'pointer'
      }}>
        See how it works
      </button>
    </div>
    
    <p style={{ fontSize: 16, color: '#6b7568' }}>
      ★ 1,240 plants rehomed this month · free to join
    </p>
  </div>
  
  {/* Right: 2x2 image grid */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  }}>
    <img src="assets/plant-begonia.jpeg" alt="Begonia" 
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 24,
        transform: 'rotate(-2deg)',
        boxShadow: '0 10px 24px rgba(31,74,50,.16)'
      }} />
    <img src="assets/plant-hibiscus.jpeg" alt="Hibiscus"
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 24,
        transform: 'rotate(1deg)',
        boxShadow: '0 10px 24px rgba(31,74,50,.16)'
      }} />
    <img src="assets/plant-caladium.jpeg" alt="Caladium"
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 24,
        transform: 'rotate(-1deg)',
        boxShadow: '0 10px 24px rgba(31,74,50,.16)'
      }} />
    <img src="assets/plant-succulent.jpeg" alt="Succulent"
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 24,
        transform: 'rotate(2deg)',
        boxShadow: '0 10px 24px rgba(31,74,50,.16)'
      }} />
  </div>
</section>
```

---

## Browse Page (Keep existing with minor style tweaks)
- Use `--text-body` and `--text-faint` tokens instead of hardcoded grays
- Sidebar: add warm hover states (mint-100 on filter hover)
- PlantCard: keep the design system component, but ensure spacing matches Bloom (20px gap in grid)

---

## Detail Page (Keep existing)
- No changes needed; integrates well with Bloom's warm palette

---

## Profile Page (Keep existing)
- No changes needed; the pine-900 header works with Bloom

---

## Footer (Add Bloom version)
```jsx
<footer style={{
  background: '#1f4a32',
  color: '#rgba(255,255,255,.6)',
  padding: '40px 44px',
  marginTop: 'auto'
}}>
  <div style={{
    maxWidth: 1320,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'space-between'
  }}>
    <div>
      <div style={{
        fontFamily: 'Outfit',
        fontSize: 18,
        color: '#fff',
        marginBottom: 6,
        fontWeight: 800
      }}>
        🌿 Garden Swap
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)' }}>
        Hyper-local plant trading · Bangalore
      </div>
    </div>
    {[['Browse', 'browse'], ['Profile', 'profile'], ['About', 'home']].map(([label, id]) => (
      <button key={id} onClick={() => navigate(id)} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'rgba(255,255,255,.6)',
        fontSize: 14,
        fontFamily: 'Figtree'
      }}>
        {label}
      </button>
    ))}
  </div>
</footer>
```
