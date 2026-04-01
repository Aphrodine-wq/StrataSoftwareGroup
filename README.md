# Strata Software

React frontend for Strata Software Group -- company site with service pages, template marketplace, and Stripe-powered checkout. Deployed on Vercel.

**Live:** [stratasoftwaregroup.com](https://www.stratasoftwaregroup.com)

## Run the app

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Then serve the `build` folder (e.g. `npx serve -s build`) and open the URL in your browser.

## Tech stack

- **React 19** with react-router-dom v7 (SPA)
- **Create React App** (react-scripts 5.0.1)
- **Stripe** -- @stripe/stripe-js (client) + stripe (server) for template purchases
- **Vercel** -- hosting, serverless API functions, analytics (@vercel/analytics)

## Pages and routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with WebGL background, particles, tech marquee, testimonials |
| `/products` | Products | Product offerings |
| `/services` | Services | Service descriptions with process timeline and FAQ |
| `/portfolio` | Portfolio | Project showcase |
| `/about` | About | Company info |
| `/templates` | Templates | Template marketplace -- browse, filter by category |
| `/templates/preview/:id` | TemplatePreview | Live preview of a template in iframe |
| `/templates/checkout/:id` | TemplateCheckout | Stripe checkout initiation for a template |
| `/checkout/success` | CheckoutSuccess | Post-purchase confirmation (verifies Stripe session) |
| `/checkout/cancel` | CheckoutCancel | Cancelled checkout return page |
| `/contact` | Contact | Contact form (name, email, company, budget, message) |
| `*` | NotFound | 404 catch-all |

## Frontend architecture

- **Lazy routes:** All page components are loaded via `React.lazy()` in [src/App.js](src/App.js). The initial bundle only includes the shell (Navigation, Footer, ErrorBoundary, CursorGlow); route chunks load on demand.
- **Error Boundary:** App-level error boundary in [src/components/ErrorBoundary.js](src/components/ErrorBoundary.js) wraps main content. Shows a "Something went wrong" UI with retry. Optional: set `window.__STRATA_LOG_ERROR__` to a function to log errors to your backend.
- **Suspense fallback:** Route loading uses [src/components/RouteFallback.js](src/components/RouteFallback.js) (skeleton that matches the main layout).
- **404:** Catch-all route renders [src/pages/NotFound.js](src/pages/NotFound.js).
- **CursorGlow:** Custom cursor glow effect rendered app-wide.
- **PageTransition:** Transition animation between route changes.
- **ScrollToTop:** Scroll-to-top button component.

### Components

| Component | Description |
|-----------|-------------|
| Navigation | Top nav bar (desktop) + bottom tab bar (mobile) |
| Footer | Site footer |
| ErrorBoundary | App-level error boundary with retry |
| RouteFallback | Skeleton loading state for lazy routes |
| CursorGlow | Custom cursor glow effect |
| PageTransition | Route transition animation |
| ScrollToTop | Scroll-to-top button |
| WebGLBackground | WebGL shader background for hero sections |
| FloatingParticles | Floating particle animation |
| TechMarquee | Scrolling technology marquee |
| Testimonials | Customer testimonials section |
| ProcessTimeline | Step-by-step process visualization |
| FAQAccordion | Expandable FAQ section |
| AnimatedCounter | Animated number counter |
| Tilt3DCard | 3D tilt effect card wrapper |

### Hooks

| Hook | Description |
|------|-------------|
| useScrollReveal | Scroll-triggered reveal animations |
| useTilt3D | 3D tilt effect on mouse movement |

## API (Vercel Serverless Functions)

All API routes live in the `api/` directory and run as Vercel serverless functions.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/create-checkout-session` | POST | Creates a Stripe Checkout Session for a template purchase. Validates template ID against server-side price catalog. |
| `/api/verify-session` | GET | Verifies a Stripe session by `session_id` query param. Used by the success page to confirm payment. |
| `/api/webhook` | POST | Stripe webhook handler for `checkout.session.completed` events. Signature-verified. |

### Contact form

The contact form ([src/pages/Contact.js](src/pages/Contact.js)) submits via POST to the contact API.

- **Env var:** Set `REACT_APP_CONTACT_API_URL` to the full API URL (e.g. `https://api.example.com/contact`). If unset, the app uses `/api/contact` (relative).
- The request body is JSON: `{ name, email, company, budget, message }`. Your backend should return 2xx on success; on non-2xx the app shows the response body's `message` or `error` if present, or a generic error message.

## Template marketplace

The site sells website templates through a Stripe-integrated storefront. Templates are defined in [src/data/websiteTemplates.js](src/data/websiteTemplates.js).

### Template catalog

**Premium templates (10):** Insurance ($49), Portfolio ($79), Law Firm ($49), Tech Startup ($99), Luxury ($99), Creative Agency ($99), Sports News ($49), SaaS ($99), Real Estate ($79), Trade Work ($49). Four of these include WebGL shaders (Tech Startup, Luxury, Creative Agency, SaaS).

**Standard templates (9):** Startup Landing, Restaurant Bistro, Portfolio Creative, Fitness Gym, Medical Clinic, E-Commerce Fashion, Education Academy, Travel Adventure, Tech Blog -- all $39 each.

Template source files live in `Website Templates/` and are copied to `public/website-templates/` at build time via the `prebuild` script (`scripts/copy-website-templates.mjs`). The TemplatePreview page loads them in an iframe from the public path.

Categories: Business, Creative, Tech, Media, Landing Page, Hospitality, Health, E-Commerce, Education, Travel.

### Checkout flow

1. User browses `/templates` and selects a template
2. User clicks buy on `/templates/checkout/:id`
3. Frontend calls `POST /api/create-checkout-session` with `{ templateId, templateName }`
4. Server creates a Stripe Checkout Session with price from server-side catalog (prevents tampering)
5. User is redirected to Stripe Checkout
6. On success, Stripe redirects to `/checkout/success?session_id=...&template=...`
7. Success page calls `GET /api/verify-session?session_id=...` to confirm payment
8. Stripe sends `checkout.session.completed` webhook to `/api/webhook` for fulfillment logging

## Environment variables

### Client-side (REACT_APP_*)

| Variable | Description |
|----------|-------------|
| `REACT_APP_CONTACT_API_URL` | Full URL for the contact form API. Defaults to `/api/contact` if unset. |
| `PUBLIC_URL` | Set by Create React App for deployment (e.g. GitHub Pages subpath). Used for assets and template preview URLs. |

### Server-side (Vercel)

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key for creating checkout sessions and verifying payments. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret for verifying webhook event signatures. |

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Production build (runs `prebuild` first to copy templates) |
| `npm run copy-templates` | Manually copy `Website Templates/` to `public/website-templates/` |
| `npm test` | Run tests |
| `npm run make-logo-transparent` | Remove near-black background from `logo.png` using Sharp |

## Project structure

```
strata-software/
  api/
    create-checkout-session.js    Stripe checkout session creation
    verify-session.js             Stripe session verification
    webhook.js                    Stripe webhook handler
  docs/
    PERF_BASELINE.md              Performance baseline measurements
  public/
    website-templates/            Template files served at build time (copied from Website Templates/)
    logo.png                      Site logo (transparent background)
    sitemap.xml                   Sitemap
  ralph/
    prd.json                      PRD in Ralph agent format
  scripts/
    copy-website-templates.mjs    Copies templates to public/ at build time
    make-logo-transparent.mjs     Logo background removal script
    make-logo-transparent.cjs     CJS version of logo script
  src/
    components/                   26 shared components (see table above)
    data/
      websiteTemplates.js         Template catalog (19 templates with prices, metadata)
    hooks/
      useScrollReveal.js          Scroll reveal animation hook
      useTilt3D.js                3D tilt effect hook
    pages/                        12 page components (see routes table above)
    App.js                        Router, lazy loading, layout shell
    index.js                      Entry point
    index.css                     Global styles
  Website Templates/              Source template files (10 premium + 9 standard)
  vercel.json                     Vercel config (rewrites, headers)
  package.json
```

## Performance (Lighthouse)

1. Build for production: `npm run build`
2. Serve the build: `npx serve -s build`
3. Open the served URL in Chrome
4. Open DevTools -> Lighthouse, choose Performance (and optionally Accessibility), then Analyze

Compare LCP, INP, and CLS to the baseline in [docs/PERF_BASELINE.md](docs/PERF_BASELINE.md).

## Deployment

Deployed on Vercel. The `vercel.json` configures:
- SPA fallback: all non-API routes rewrite to `/index.html`
- API routes: `/api/*` forwarded to serverless functions in `api/`
- Cache headers: API responses set to `no-store`
