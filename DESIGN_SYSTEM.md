# KISSA — Design System Reference

> Audited from the live codebase on 2026-11-13.
> This document captures every visual convention currently in use so that new pages and components stay consistent.

---

## 1. Framework, Language & Architecture

| Aspect | Detail |
|---|---|
| **Framework** | React Router v7 (SSR mode) with Vite 8 |
| **Language** | TypeScript (React 19, JSX) |
| **Package manager** | npm (lockfile present) |
| **Shopify SDK** | `@shopify/hydrogen@^2026.10.2`, `@shopify/storefront-api-client@^2.0.1` |
| **Dev server** | `react-router dev` (Vite, port 5173) |
| **SSR** | Enabled (`ssr: true` in `react-router.config.ts`) |
| **Middleware** | React Router v8 middleware (`future.v8_middleware: true`) — Hydrogen's `handleRequest` creates a Storefront client and attaches it via `createContext` |

### Folder Structure

```
app/                        ← React Router application root
  root.tsx                  ← Document shell (html, head, body)
  routes.ts                 ← Route manifest (code-based, not file-system)
  routes/
    home.tsx                ← Landing page (index route "/")
    collections-all.tsx     ← Collection grid ("/collections/all")
  components/
    Navbar.tsx              ← Floating glass navbar + announcement bar
    home/
      OurStory.tsx          ← Brand narrative & heritage section ("Some beginnings happen quietly")
    collection/
      CollectionHero.tsx    ← Hero header for collection page
      ProductCard.tsx       ← Single product card
      EmptyState.tsx        ← Empty-state placeholder
  lib/
    context.ts              ← React Router createContext for StorefrontClient
    shopify.ts              ← handleRequest — Hydrogen route handling + redirect handler
    storefront.ts           ← createRequestStorefrontClient (private token, IN locale)
    route-templates.ts      ← Shopify route templates
    collection-filters.ts   ← Category/sort/search logic

src/                        ← Interactive 3D scene layer (ThreeUI)
  App.tsx                   ← MengToSketchbook scene (client-only, lazy-loaded)
  index.css                 ← Global stylesheet (1 256 lines)
  index.ts                  ← ThreeUI barrel exports
  main.tsx                  ← Standalone CSR entry (dev preview)
  shaders/                  ← ThreeUI scene documents + CSS

public/
  kissa-logo*.png           ← Brand logos
  images/                   ← SVG bottle illustrations
  landing-pages/
    meng-to-sketchbook.html ← Static fallback landing page (4 026 lines, fully self-contained)
    meng-to-sketchbook/     ← Assets: fonts, watercolour images, bottles
```

### Routing

| Route | File | Description |
|---|---|---|
| `/` (index) | `app/routes/home.tsx` | Landing page — loads the interactive ThreeUI scene; falls back to an iframe of the static HTML page |
| `/collections/all` | `app/routes/collections-all.tsx` | All-products grid with filters, sort, search, pagination |

Routes are declared manually in `app/routes.ts` (code-based routing with `index()` and `route()`), **not** file-system routing.

---

## 2. Colour Palette

All colours are declared as CSS custom properties on `:root` in `src/index.css`:

### Core Palette

| Token | Hex / Value | Usage |
|---|---|---|
| `--paper` | `#F8F4E7` | Page background, selection text colour |
| `--paper-card` | `#F0E9DA` | Card backgrounds, empty-state background |
| `--paper-cream` | `#FDFCF8` | Coffret/discovery callout backgrounds, lighter panels |
| `--ink` | `#4E342E` | Primary text, headings, button fill, nav links |
| `--ink-soft` | `rgba(78, 52, 46, 0.70)` | Body copy, descriptions, secondary text |
| `--ink-faint` | `rgba(78, 52, 46, 0.45)` | Tertiary text, hints, volume labels |
| `--hairline` | `rgba(78, 52, 46, 0.14)` | Card borders, dividers, hairlines |
| `--hairline-strong` | `rgba(78, 52, 46, 0.25)` | Hover borders, stronger dividers |
| `--earth` / `--gold` | `#CC5500` | Accent colour — CTAs on hover, section labels, badges, links, selection background |
| `--earth-dark` | `#A84400` | Darker accent — badge text, voucher copy, hero italic emphasis |
| `--gold-soft` | `rgba(204, 85, 0, 0.15)` | Accent tint backgrounds |
| `--sage` | `#5a6856` | Reserved (declared but not prominently used) |

### Hardcoded Supplementary Colours

| Hex | Context |
|---|---|
| `#3D261C` | Hover-darkened ink (dropdown links, mega-menu headings) |
| `#63433B` | Hero primary button hover, account submit hover |
| `#B85D36` | Cart badge background |
| `#2B2625` | Navbar icon default colour |
| `#EFE8D8` | Footer background, card media placeholder |
| `#EFE6D8` | Hero stage card background |
| `#E3D9C3` | Placeholder gradient end in product cards |
| `#FFFFFF` | Icon button fills, pure white overlays |

---

## 3. Typography

### Font Families

| Token | Stack | Role |
|---|---|---|
| `--display` | `'Instrument Serif', "New York", Georgia, 'Times New Roman', serif` | Headings, hero titles, card titles, prices |
| `--font` | `'Newsreader', "New York", Georgia, 'Times New Roman', serif` | Body copy, descriptions, taglines |
| `--sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | UI elements — nav links, badges, buttons, labels, marquee |

Fonts are loaded from Google Fonts (in `<head>` and via `@import` in CSS) **and** as local WOFF2 files in `public/landing-pages/meng-to-sketchbook/`.

### Type Scale

#### Headings (Display)

| Context | `font-family` | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| Hero H1 (collection page) | `--display` | `clamp(42px, 6vw, 76px)` | 400 | 1.08 | — |
| Hero editorial title (landing) | `--display` | `clamp(32px, 4.4vw, 56px)` | 400 | 1.06 | −0.01em |
| Section titles | `--display` | `clamp(30px, 3.8vw, 46px)` | 400 | 1.12 | — |
| Coffret / feature title | `--display` | `clamp(28px, 3.2vw, 42px)` | 400 | 1.15 | — |
| Card title | `--display` | 26px | 400 | 1.2 | — |
| Empty-state heading | `--display` | 32px | 400 | — | — |
| Footer newsletter heading | `--display` | 24px | 400 | — | — |
| Cart drawer heading | `--display` | 24px | 400 | — | −0.01em |

#### Body / Prose (Newsreader)

| Context | Size | Weight | Line Height |
|---|---|---|---|
| Hero subtitle | `clamp(15px, 1.4vw, 17.5px)` | 300 | 1.52 |
| Section description | `clamp(16px, 1.6vw, 18px)` | 300 | 1.65 |
| Card description | 14–14.5px | 300 | 1.55 |
| Footer tagline | 16px | 400 (italic) | 1.6 |
| Body (atelier content) | `clamp(16px, 1.5vw, 18px)` | 300 | 1.75 |

#### UI / Sans (Inter)

| Context | Size | Weight | Letter Spacing |
|---|---|---|---|
| Nav links | 13.5px | 500 | — |
| Nav pill button | 13.5px | 600 | — |
| Mega-menu category | 13px | 500 | — |
| Button label (CTA) | 11px | 500–600 | 0.22em |
| Section label (kicker) | 11–11.5px | 500–600 | 0.22em |
| Marquee announcement | 10.5px | 500 | 0.18em |
| Filter pill | 11px | 500 | 0.08em |
| Card badge | 10px | 500 | 0.22em |
| Card specimen label | 11px | 600 | 0.22em |
| Note pill | 10.5–11px | 500 | 0.02em |
| Footer link | 11px | — | 0.1em |
| Footer copyright | 11px | — | 0.06em |

### Tracking (Letter-Spacing) Tokens

| Token | Value | Usage |
|---|---|---|
| `--track-caps` | `0.22em` | Uppercase labels, buttons, badges |
| `--track-nav` | `0.08em` | Navigation items, filter pills, sort selects |

---

## 4. Spacing, Container Widths & Breakpoints

### Container Widths

| Context | `max-width` |
|---|---|
| Glass navbar | 1380px |
| Hero stage card | 1380px |
| Product grid (React) | 1320px |
| Collection page callout | 1320px |
| Landing page grid | 1200px |
| Atelier section | 1160px |
| Footer (landing page) | 1160px |
| Hero collection header | 960px |
| Quiz section | 960px |
| Footer (React) inner | 900px |
| Search input | 420px |
| Section header | 700px |

### Horizontal Padding Pattern

Content sections use `padding: 0 clamp(16px, 4vw, 40px)` for responsive side padding. The navbar uses `padding: 0 clamp(12px, 3.2vw, 36px)`.

### Spacing Scale (commonly recurring values)

| px | Context |
|---|---|
| 4–6 | Tight gaps between pills, badge padding, sub-labels |
| 8–10 | Button inner padding, small gaps, icon spacing |
| 12–14 | Card body gaps, badge offsets from edges |
| 16–18 | Medium gaps, card padding |
| 20–24 | Section internal spacing, footer padding, card body padding |
| 28–30 | Section separators, feature card inner padding |
| 40 | Product grid gap |
| 48–60 | Large section spacing, footer padding |
| 80–90 | Section vertical margin, hero vertical padding |

### Breakpoints

| Width | What Changes |
|---|---|
| **1040px** | Desktop nav links hide (burger-only navigation) |
| **960px** | Hero pillars: 4 columns → 2 columns |
| **880px** | Coffret: 2-column grid → stacked. Atelier: 2-column → stacked. Footer: 4-column → 2-column |
| **820px** | Hero glass pills: hide secondary pills on smaller screens |
| **680px** | Plates archive: hide accord column |
| **640px** | Announcement bar: shorter height (30px), smaller text. Navbar mobile |
| **560px** | Hero pillars → single column |
| **540px** | Footer → single column |

### Border Radii

| Token / Value | Usage |
|---|---|
| `9999px` | Pill buttons, nav bar, filter pills, search inputs, announcement bar badges |
| `36px` | Cart drawer |
| `24px` | Mega-menu dropdowns, filter pills, search inputs, load-more buttons |
| `20px` | Menu dropdown, collections dropdown, coffret card, quiz card, callout card |
| `18px` | Atelier media, cart items |
| `14px` | Perfume cards, quiz options, product cards |
| `12px` | Mega-menu category buttons, card badges, note pills, pillar cards, voucher box |
| `10px` | Menu links, collections items |

---

## 5. Reusable Components

### React Components

| Component | File Path | Description |
|---|---|---|
| **Navbar** | [`app/components/Navbar.tsx`](file:///d:/KISSA%20-%20Storefront/app/components/Navbar.tsx) | Announcement marquee bar + floating frosted-glass navbar with hamburger menu dropdown, centered logo, search/account/cart icon buttons |
| **CollectionHero** | [`app/components/collection/CollectionHero.tsx`](file:///d:/KISSA%20-%20Storefront/app/components/collection/CollectionHero.tsx) | Section kicker label, display title, italic description, search input, category filter pills, sort select, result count |
| **ProductCard** | [`app/components/collection/ProductCard.tsx`](file:///d:/KISSA%20-%20Storefront/app/components/collection/ProductCard.tsx) | Perfume card — image (4:5), edition badge, specimen label, title, note pills, description, price, "Add to Bag" button |
| **EmptyState** | [`app/components/collection/EmptyState.tsx`](file:///d:/KISSA%20-%20Storefront/app/components/collection/EmptyState.tsx) | Centred card with logo, heading, body, reset CTA |
| **Scene (ThreeUI)** | [`src/App.tsx`](file:///d:/KISSA%20-%20Storefront/src/App.tsx) | Full-viewport interactive 3D landing page scene (`MengToSketchbookLandingPage` from ThreeUI) |

### CSS-Only Component Patterns (in `src/index.css`)

All styling is done via a single global CSS file — no CSS modules, Tailwind, or CSS-in-JS.

| Pattern | CSS Class(es) | Notes |
|---|---|---|
| **Announcement Bar** | `.kissa-announcement-bar`, `.kissa-marquee-track`, `.kissa-marquee-set`, `.kissa-marquee-msg`, `.kissa-marquee-sep` | Infinite horizontal marquee, pauses on hover |
| **Glass Navbar** | `.kissa-nav-container`, `.kissa-glass-navbar`, `.kissa-nav-logo`, `.kissa-nav-icon-btn`, `.kissa-nav-link`, `.kissa-nav-pill-btn` | Sticky, frosted-glass, centered logo, pill shape |
| **Menu Dropdown** | `.kissa-menu-nav-dropdown`, `.menu-dropdown-link`, `.menu-dropdown-sublink` | Numbered sidebar-to-dropdown nav |
| **Mega Menu** | `.kissa-mega-menu-dropdown`, `.kissa-mega-menu-cat-btn`, `.kissa-mega-product-card` | Fragrances 2-pane dropdown with product cards |
| **Collections Dropdown** | `.kissa-collections-dropdown`, `.kissa-collections-item` | Simple link list with item pills |
| **Filter Pill** | `.kissa-filter-btn`, `.kissa-filter-btn.active` | Active = ink background, paper text |
| **Perfume Card** | `.kissa-perfume-card`, `.kissa-card-media`, `.kissa-card-img`, `.kissa-card-badge`, `.kissa-card-body`, `.kissa-card-title`, `.kissa-note-pill`, `.kissa-card-footer`, `.kissa-add-btn` | Full product card |
| **Section Header** | `.section-header`, `.section-label`, `.section-title`, `.section-desc` | Centred kicker + title + description (landing page HTML) |
| **Coffret Feature** | `.coffret-feature`, `.coffret-card`, `.coffret-media`, `.coffret-body`, `.coffret-btn` | Discovery set banner (landing page HTML) |
| **Quiz / Scent Diagnosis** | `.quiz-section`, `.quiz-card`, `.quiz-step-dot`, `.quiz-option`, `.quiz-result-box` | 3-step quiz with options grid (landing page HTML) |
| **Atelier Story** | `.atelier-section`, `.atelier-split`, `.atelier-media`, `.atelier-pillars`, `.pillar-card` | 2-column image + copy (landing page HTML) |
| **Editorial Landscape Footer** | `.kissa-footer`, `.kissa-footer__content`, `.kissa-footer__brand`, `.kissa-footer__logo`, `.kissa-footer__headline`, `.kissa-footer__description`, `.kissa-footer__copyright`, `.kissa-footer__links`, `.kissa-footer__group`, `.kissa-footer__heading`, `.kissa-footer__list`, `.kissa-footer__link`, `.kissa-footer__wordmark`, `.kissa-footer__wordmark-img` | Atmospheric editorial footer with full-width landscape background, 4-column grid, and oversized translucent KISSA wordmark anchored at bottom |
| **Cart Drawer** | `.cart-drawer`, `.cart-item`, `.cart-close-btn` | Floating glassmorphism slide-in drawer (landing page HTML) |
| **Search Overlay** | `.search-backdrop`, `.search-input`, `.search-results-list` | Full-screen overlay search (landing page HTML) |
| **Product Detail Modal** | `.modal-backdrop`, `.modal-dialog`, `.modal-art-view`, `.modal-add-btn` | Product detail flyover (landing page HTML) |
| **Toast Notification** | `.toast-msg` | Slide-up toast for "added to bag" (landing page HTML) |
| **Search Input** | `.kissa-search-wrap`, `.kissa-search-input` | Pill-shaped frosted search input |
| **Sort Select** | `.kissa-sort-select` | Pill-shaped select dropdown |
| **Load More** | `.kissa-load-more-btn` | Ghost/outline pill button |
| **Accessibility** | `.sr-only` | Screen-reader-only utility class |
| **Background Wash** | `.kissa-wash` | Fixed painted-paper texture with gradient overlay |

### Buttons Reference

| Name | Class | Background | Text | Shape | Hover |
|---|---|---|---|---|---|
| **Primary CTA** | `.kissa-add-btn` / `.hero-btn-primary` | `--ink` (#4E342E) | `--paper` (#F8F4E7) | Pill (r=20–9999px) | bg → `--earth`, translateY(−1px), orange glow shadow |
| **Secondary CTA** | `.hero-btn-secondary` | white/72% | `--ink` | Pill | bg → white, border → ink, colour → earth |
| **Ghost/Outline** | `.kissa-load-more-btn` | transparent | `--ink` | Pill | border → earth, colour → earth |
| **Filter Pill** | `.kissa-filter-btn` | white/45% blur | `--ink-soft` | Pill (r=24px) | Active: ink bg, paper text |
| **Coffret CTA** | `.coffret-btn` | `--ink` | `--paper` | Pill (r=30px) | bg → earth |
| **Nav Icon** | `.kissa-nav-icon-btn` | `#FFFFFF` | `#2B2625` | Circle (44px) | scale(1.05), elevated shadow, colour → earth |

---

## 6. Animation & Transition Styles

### Easing Curve

```css
--ease: cubic-bezier(0.16, 1, 0.3, 1);   /* Deceleration / "ease-out expo" */
```

Used for virtually all interactive transitions across the site.

### Hover Transitions

| Element | Duration | Effect |
|---|---|---|
| Nav icon buttons | 0.22s | `scale(1.05)`, elevated shadow, colour change |
| Nav icon buttons (active) | — | `scale(0.96)` |
| Nav links / pills | 0.2–0.22s | Background tint, colour change |
| Logo | 0.25s | `scale(1.05)` |
| Dropdown open/close | 0.24s | `opacity` 0→1, `translateY(−8px → 0)`, `scale(0.98 → 1)` |
| Chevron rotation | 0.22s | `rotate(180deg)` |
| Perfume cards | 0.35s | `translateY(−6px)`, elevated shadow |
| Card image zoom | 0.5s | `scale(1.05)` |
| Product card (landing) | 0.3s | `translateY(−6px)`, shadow |
| Mega-menu product cards | 0.22s | `translateY(−3px)`, elevated shadow, border tint |
| Bottle images in mega menu | 0.25s | `scale(1.05)` |
| Hero main image | 0.8s | `scale(1.02)` (very slow, cinematic) |
| Coffret image | 0.6s | `scale(1.03)` |
| Atelier image | 0.5s | `scale(1.02)` |
| Buttons (add to bag, CTA) | 0.22s | `translateY(−1px)`, colour change, shadow |
| Filter pills | 0.22s | Border colour, translateY(−1px) |
| Menu dropdown links | 0.2s | Background tint, `translateX(3px)` |
| Cart drawer | 0.42s | `translateX(100% + 32px → 0)` |
| Cart backdrop | 0.35s | `opacity` |
| Cards: inspect trigger | 0.25s | `opacity` 0→1, `translateY(6px → 0)` |

### Keyframe Animations

| Animation | Duration | Description |
|---|---|---|
| `kissa-marquee` | 45s linear infinite | Horizontal marquee scroll (−50% translateX) |
| `cue-breathe` | 2.6s ease-in-out infinite | Hero scroll cue — opacity pulses between 0.2 and 0.8 |
| `fade-up` | 0.4s ease | Quiz result reveal |

### Cart Badge

The cart badge on the navbar icon scales to `1.08` on parent hover (0.2s with `--ease`).

---

## 7. Image Style

### Aspect Ratios

| Context | Ratio | Notes |
|---|---|---|
| Product card image (React) | **4 : 5** | Portrait cards for perfume products |
| Product card image (landing HTML) | **4 : 3** | Slightly different in the static version |
| Hero stage image | **16 : 9** | `max-height: 760px`, `object-fit: cover` |
| Coffret media | **16 : 10** | At breakpoint ≤ 880px |
| Mega-menu bottle thumbnail | 78 × 104px | `object-fit: contain`, inside flex container |
| Cart item image | 52 × 52px | Square thumbnail, `object-fit: contain` |
| Footer logo | 38px height | `width: auto` |
| Navbar logo | `clamp(26px, 2.8vw, 34px)` height | `width: auto` |

### Image Treatment

- **Product images**: `object-fit: cover` with slight zoom on hover (`scale(1.03–1.05)`, 0.5s ease)
- **Bottle SVGs**: `object-fit: contain` with `drop-shadow(0 4px 8px rgba(78,52,46,0.12))`
- **Logo images**: `drop-shadow(0 1px 1px rgba(255,255,255,0.7–0.8))` for legibility against paper
- **Background wash**: Fixed `bg-wash.jpg` at `opacity: 0.85–0.88`, with gradient overlay fading to `--paper`

### Overlays

- **Hero stage card**: Inner vignette via `::after` pseudo-element: `box-shadow: inset 0 0 70px rgba(78,52,46,0.08)`
- **Wash gradient**: `linear-gradient(180deg, rgba(paper, 0.22–0.25) 0%, rgba(paper, 0.65–0.7) 50%, paper 90–92%)`
- **Card badges**: Frosted pill with `backdrop-filter: blur(4px)`, semi-transparent background `rgba(248,244,231,0.92)`

### Glassmorphism Pattern (Recurring)

Used on the navbar, dropdowns, hero pills, and cart drawer:

```css
background: linear-gradient(135deg, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.48) 45%, ...);
backdrop-filter: blur(28–36px) saturate(165–180%);
border: 1px solid rgba(255,255,255,0.85–0.9);
box-shadow: 0 18px 42px -12px rgba(78,52,46,0.12), ...;
/* Inner white highlight */
inset 0 1.5px 2px rgba(255,255,255,0.95);
```

---

## 8. Shopify Data Fetching

### Architecture

The storefront uses **Shopify Hydrogen 2026.10** as a request-handler library (not as a framework):

1. **Middleware** (`app/root.tsx` lines 17–24): Every request passes through `handleRequest()` which creates a `StorefrontClient` and sets it on React Router's context via `createContext`.
2. **Client creation** (`app/lib/storefront.ts`): Uses `createStorefrontClient()` with a **private** storefront token, hardcoded to locale `IN` / `EN`.
3. **Route handling** (`app/lib/shopify.ts`): `handleShopifyRoutes()` processes Shopify-owned routes; `handleShopifyRedirects()` handles 404→redirect for Shopify URLs.
4. **Route loaders** access the storefront client via `context.get(storefrontContext)`.

### GraphQL Queries

#### Home Page (`app/routes/home.tsx`)

```graphql
query Products {
  products(first: 8) {
    nodes {
      id, title, handle
      featuredImage { url, altText }
      priceRange { minVariantPrice { amount, currencyCode } }
    }
  }
}
```

Fetches 8 products to display count in the floating "View All Fragrances" pill. Products are also sent via `postMessage` to the iframe fallback.

#### Collections Page (`app/routes/collections-all.tsx`)

```graphql
query AllProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    nodes {
      id, title, handle, description, productType, tags
      featuredImage { url, altText, width, height }
      images(first: 2) { nodes { url, altText } }
      priceRange {
        minVariantPrice { amount, currencyCode }
        maxVariantPrice { amount, currencyCode }
      }
    }
    pageInfo { hasNextPage, endCursor }
  }
}
```

Fetches 50 products per page with cursor-based pagination. Filtering (category, search) and sorting are done **client-side** over all loaded products.

### Environment Variables

| Variable | Purpose |
|---|---|
| `PUBLIC_STORE_DOMAIN` | Shopify store domain |
| `PRIVATE_STOREFRONT_API_TOKEN` | Private Storefront API token |
| `PUBLIC_STOREFRONT_ID` | Storefront ID (optional) |

### Landing Page (Static HTML)

The static fallback `meng-to-sketchbook.html` receives products from the parent React app via `window.postMessage({ type: "shopify_products", products })`. It also receives cart state via `postMessage` and sends `{ type: "cart_toggle" }` events back to the parent.

---

## Appendix: Key Observations

> [!IMPORTANT]
> **Two parallel implementations exist.** The static HTML landing page (`meng-to-sketchbook.html`, 4 026 lines) and the React component tree duplicate many patterns (navbar, cards, footer, cart). The HTML version has more sections (quiz, atelier, coffret, sketchbook, plates archive, cart drawer, search, checkout) that do **not** yet exist as React components.

> [!NOTE]
> **No CSS modules or utility framework.** All styles live in a single `src/index.css` (1 256 lines) using BEM-inspired class names prefixed with `kissa-` (React layer) or unprefixed (HTML landing page). The landing page HTML has its own embedded `<style>` block (≈ 1 900 lines).

> [!TIP]
> **CSS variable naming is consistent.** Both the React CSS and HTML `<style>` block share the exact same `:root` custom property names and values. New pages should use these tokens rather than hardcoding colours.

> [!WARNING]
> **Cart and checkout are HTML-only.** The glassmorphism cart drawer, product detail modal, search overlay, checkout flow, scent quiz, and account panel exist only in the static HTML landing page's JavaScript — none are React components yet.

