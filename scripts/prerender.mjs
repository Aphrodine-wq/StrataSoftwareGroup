// Build-time prerender: clones build/index.html for every route in pageMeta,
// swapping in unique <title>, meta description, canonical, OG/Twitter tags and
// injecting breadcrumb + page JSON-LD. Each route gets a real static HTML file
// so crawlers and social scrapers see per-page meta before JS runs.
// Served by Vercel via cleanUrls (/services -> build/services.html); the SPA
// rewrite in vercel.json stays as fallback for dynamic routes (checkout, 404).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageMeta, SITE_URL, TITLE_SUFFIX, OG_IMAGE } from '../src/seo/pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(__dirname, '..', 'build');
const shellPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(shellPath)) {
  console.error('[prerender] build/index.html not found — run react-scripts build first.');
  process.exit(1);
}

const shell = fs.readFileSync(shellPath, 'utf8');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildBreadcrumbJsonLd(breadcrumbs) {
  if (!breadcrumbs || !breadcrumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.path === '/' ? '/' : b.path}`,
    })),
  };
}

function renderPage(meta) {
  const fullTitle = meta.title + TITLE_SUFFIX;
  const canonical = `${SITE_URL}${meta.path}`;
  const ogImage = `${SITE_URL}${meta.ogImage ?? OG_IMAGE}`;

  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(
    /<meta name="description"[^>]*?content="[^"]*"[^>]*?\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
  );
  html = html.replace(
    /<meta property="og:description"[^>]*?content="[^"]*"[^>]*?\/?>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description"[^>]*?content="[^"]*"[^>]*?\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

  if (meta.keywords && meta.keywords.length) {
    html = html.replace(
      /<meta name="keywords"[^>]*?content="[^"]*"[^>]*?\/?>/,
      `<meta name="keywords" content="${escapeHtml(meta.keywords.join(', '))}" />`,
    );
  }

  // Page-level JSON-LD (breadcrumb + page schema), marked so RouteMeta can
  // replace them on client-side navigation.
  const blocks = [];
  const crumb = buildBreadcrumbJsonLd(meta.breadcrumbs);
  if (crumb) blocks.push(crumb);
  if (meta.jsonLd) {
    if (Array.isArray(meta.jsonLd)) blocks.push(...meta.jsonLd);
    else blocks.push(meta.jsonLd);
  }
  if (blocks.length) {
    const scripts = blocks
      .map((b) => `<script type="application/ld+json" data-page-jsonld="true">${JSON.stringify(b)}</script>`)
      .join('\n  ');
    html = html.replace(/<\/head>/, `  ${scripts}\n</head>`);
  }

  // Per-page noscript fallback so JS-less crawlers read page-specific text
  // (derived from meta, not from the visible React copy).
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p><p><a href="${SITE_URL}/">Strata Software Group</a></p></noscript>`,
  );

  return html;
}

const results = [];
for (const [route, meta] of Object.entries(pageMeta)) {
  if (route === '/') continue; // homepage keeps the shell's own meta
  const outPath = path.join(buildDir, `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const html = renderPage(meta);
  fs.writeFileSync(outPath, html);
  results.push({ route, file: path.relative(buildDir, outPath), bytes: html.length });
}

console.log(`[prerender] generated ${results.length} static pages:`);
for (const r of results) {
  console.log(`  ${r.route.padEnd(20)} -> build/${r.file}  (${r.bytes}b)`);
}
