# Performance baseline (Week 1)

Baseline recorded after implementing lazy routes, Error Boundary, and Preloader removal.

## Bundle size (after gzip)

- **Main chunk:** 80.56 kB — `build/static/js/main.*.js`
- **Lazy chunks:** Multiple route chunks (e.g. 222, 699, 256, 428, …) — total extra ~35 kB+ across routes
- **CSS:** main ~4.42 kB + chunk CSS

Run `npm run build` and check the "File sizes after gzip" output for current numbers.

## Lighthouse (run manually)

Run in Chrome DevTools → Lighthouse (Production build, e.g. `npx serve -s build`):

- **LCP** (Largest Contentful Paint): record value
- **INP / FID** (Interaction to Next Paint): record value
- **CLS** (Cumulative Layout Shift): record value

Re-measure in Week 6 and compare.

## Code changes in this baseline

- All page components are lazy-loaded via `React.lazy()`; `<Suspense>` uses `RouteFallback`.
- App-level `ErrorBoundary` wraps main content; optional logging via `window.__STRATA_LOG_ERROR__`.
- Unused `Preloader` component removed.

---

## Week 2 — Load performance

- **WebGL:** Disabled on viewport ≤768px and when `prefers-reduced-motion: reduce`; CSS gradient fallback used. Render loop pauses when `document.visibilityState === 'hidden'`.
- **FloatingParticles:** Count set to 0 when `prefers-reduced-motion: reduce`.
- **Fonts:** Google Fonts use `display=optional` to reduce layout shift and avoid blocking LCP.
- **Images:** Ensure `public/logo.png` (and any other images) are optimized (dimensions, WebP where applicable). Use responsive images (`srcset`) if logo appears at multiple sizes.

---

## Week 6 — Re-measure and refinement

- **Re-measure:** Run Lighthouse again (Production: `npm run build` then `npx serve -s build`, open in Chrome and run Lighthouse). Compare LCP, INP/FID, CLS to the baseline. Target: meaningful improvement in LCP and TTI; no regression in CLS.
- **Performance mark:** When the hero WebGL background has painted its first frame, `performance.mark('hero-ready')` is set. You can use Chrome DevTools → Performance to record and see this mark, or `performance.getEntriesByType('mark')` in the console.
- **Docs:** See project README for how to run the app, run Lighthouse, and env vars (e.g. contact form API).
