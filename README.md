# Strata-Software

React frontend for Strata Software Group — AI agents, website templates, and marketing services.

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

## Performance (Lighthouse)

1. Build for production: `npm run build`
2. Serve the build: `npx serve -s build`
3. Open the served URL in Chrome
4. Open DevTools → Lighthouse, choose Performance (and optionally Accessibility), then Analyze

Compare LCP, INP, and CLS to the baseline in [docs/PERF_BASELINE.md](docs/PERF_BASELINE.md).

## Frontend architecture (post polish)

- **Lazy routes:** All page components are loaded via `React.lazy()` in [src/App.js](src/App.js). The initial bundle only includes the shell (Navigation, Footer, Error Boundary, etc.); route chunks load on demand.
- **Error Boundary:** App-level error boundary in [src/components/ErrorBoundary.js](src/components/ErrorBoundary.js) wraps the main content. It shows a “Something went wrong” UI with retry. Optional: set `window.__STRATA_LOG_ERROR__` to a function to log errors to your backend.
- **Suspense fallback:** Route loading uses [src/components/RouteFallback.js](src/components/RouteFallback.js) (skeleton that matches the main layout).
- **404:** Catch-all route renders [src/pages/NotFound.js](src/pages/NotFound.js).

## Contact form and API

The contact form ([src/pages/Contact.js](src/pages/Contact.js)) submits via POST to your backend.

- **Env var:** Set `REACT_APP_CONTACT_API_URL` to the full API URL (e.g. `https://api.example.com/contact`). If unset, the app uses `/api/contact` (relative; ensure your server or proxy serves that endpoint).
- The request body is JSON: `{ name, email, company, budget, message }`. Your backend should return 2xx on success; on non-2xx the app shows the response body’s `message` or `error` if present, or a generic error message.

## Other env vars

- `PUBLIC_URL` — Set by Create React App for deployment (e.g. GitHub Pages subpath). Used for assets and template preview URLs.
