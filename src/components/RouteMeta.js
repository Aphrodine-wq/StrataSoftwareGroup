import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageMeta, SITE_URL, TITLE_SUFFIX } from '../seo/pages.mjs';

// Keeps <head> meta in sync on client-side navigation. The prerendered HTML
// (scripts/prerender.mjs) already serves correct meta on first load; this
// covers SPA transitions so title/canonical/OG/JSON-LD match the active route.
function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const meta = pageMeta[route];
    if (!meta) return; // dynamic routes (preview/checkout/404) keep current head

    const fullTitle = route === '/' ? meta.title : meta.title + TITLE_SUFFIX;
    const canonical = `${SITE_URL}${meta.path}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);

    // Swap page-level JSON-LD (breadcrumbs + page schema)
    document.head
      .querySelectorAll('script[data-page-jsonld="true"]')
      .forEach((el) => el.remove());
    const blocks = [];
    if (meta.breadcrumbs && meta.breadcrumbs.length) {
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: meta.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path === '/' ? '/' : b.path}`,
        })),
      });
    }
    if (meta.jsonLd) {
      if (Array.isArray(meta.jsonLd)) blocks.push(...meta.jsonLd);
      else blocks.push(meta.jsonLd);
    }
    for (const block of blocks) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-jsonld', 'true');
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}

export default RouteMeta;
