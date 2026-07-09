// Single source of truth for per-route SEO meta. Consumed by:
//   - scripts/prerender.mjs (build-time: bakes per-route static HTML)
//   - src/components/RouteMeta.js (runtime: updates head on client-side nav)
// .mjs so Node can load it as ESM (package.json has no "type" field) while
// CRA/webpack resolves it like any src module.

export const SITE_URL = 'https://www.stratasoftwaregroup.com';
export const TITLE_SUFFIX = ' | Strata Software Group';
export const OG_IMAGE = '/og-card.png';

const ORG_ID = `${SITE_URL}/#org`;

// Snapshot of src/data/websiteTemplates.js (name/price only — that file is ESM
// inside a CJS package, so Node scripts can't import it). Update here if the
// catalog changes.
const TEMPLATE_LIST = [
  ['Insurance Agency', 49], ['Portfolio', 79], ['Law Firm', 49],
  ['Tech Startup', 99], ['Luxury', 99], ['Creative Agency', 99],
  ['Sports News', 49], ['SaaS', 99], ['Real Estate', 79], ['Trade Work', 49],
  ['Startup Landing', 39], ['Restaurant Bistro', 39], ['Portfolio Creative', 39],
  ['Fitness Gym', 39], ['Medical Clinic', 39], ['E-Commerce Fashion', 39],
  ['Education Academy', 39], ['Travel Adventure', 39], ['Tech Blog', 39],
];

// Mirrors the VISIBLE questions in src/components/FAQAccordion.js (rendered on
// /services). Schema must match on-page content — keep in sync with that file.
const FAQS = [
  ['How does the receptionist handle legal client calls?', 'Our receptionist is trained to handle law firm calls with confidentiality and professionalism. It greets callers, asks screening questions, captures case details, runs basic conflict checks against your criteria, schedules consultations on your calendar, and sends you a detailed transcript and summary — all while maintaining attorney-client confidentiality standards.'],
  ['Can the receptionist integrate with my insurance CRM?', 'Yes! Our receptionist integrates with popular insurance CRMs like Salesforce, HubSpot, Applied Epic, and AMS360. It can log caller details, create new leads, update policy notes, and trigger follow-up workflows automatically. We also support custom integrations via API.'],
  ["What's the difference between After Hours and Full Time receptionist?", "The After Hours receptionist activates outside your business hours (evenings, weekends, holidays) to capture leads you'd otherwise miss. The Full Time receptionist handles all inbound calls 24/7 — acting as your complete front desk with intelligent call routing, CRM sync, bilingual support, and overflow handling during busy periods."],
  ['How long does setup take?', 'Most receptionist setups go live within 3–5 business days. We handle the configuration, script customization, CRM integration, and testing. You provide your preferences, greetings, and scheduling rules, and we take care of the rest.'],
  ['How long does a typical software project take?', 'Timelines vary based on scope and complexity. A simple web application typically takes 4–8 weeks, while a full-featured platform can take 3–6 months. We provide detailed timelines during our discovery phase.'],
  ['What technologies do you work with?', 'We specialize in modern stacks including React, Node.js, TypeScript, Python, and cloud services (AWS, GCP). We choose the best tools for each project rather than forcing a one-size-fits-all approach.'],
  ['Do you provide ongoing support after launch?', "Absolutely. We offer flexible maintenance and support plans that include bug fixes, feature updates, performance monitoring, and 24/7 emergency support. Your product doesn't stop at launch — neither do we."],
  ['How does your pricing work?', 'We offer both fixed-price and time-and-materials models. After our discovery workshop, we provide a detailed proposal with transparent pricing. No hidden fees, no surprises. Receptionist plans are billed monthly with no long-term contracts required.'],
];

export const pageMeta = {
  '/': {
    // Homepage meta lives in public/index.html (the shell) — prerender skips it.
    title: 'Strata Software Group — Receptionists | Website Design | Marketing Services',
    description: 'Strata Software Group — phone receptionists, custom website design, and digital marketing for law firms, insurance agencies, and small businesses.',
    path: '/',
  },
  '/products': {
    title: 'AI Phone Receptionist Products — After Hours & Full Time',
    description: 'AI phone receptionists for law firms and insurance agencies — After Hours and Full Time plans with intelligent call routing, CRM integration, bilingual support, and client intake automation.',
    path: '/products',
    keywords: ['phone receptionist', 'after hours receptionist', 'full time receptionist', 'virtual receptionist for lawyers', 'insurance agency receptionist'],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/products#app`,
      name: 'Strata Receptionist',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      url: `${SITE_URL}/products`,
      description: 'Phone receptionist and virtual receptionist for law firms, insurance agencies, and professional services. Handles inbound calls, schedules appointments, captures leads, and integrates with CRMs.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for pricing — custom plans available' },
      provider: { '@id': ORG_ID },
      featureList: ['24/7 phone answering', 'Intelligent call routing', 'CRM integration', 'Bilingual support', 'Client intake automation', 'Real-time analytics'],
    },
  },
  '/services': {
    title: 'Receptionist Services, Website Design & Digital Marketing',
    description: 'Phone receptionist deployment, custom website design, SEO, and digital marketing for law firms, insurance agencies, and small businesses. Receptionist setups go live in 3–5 business days.',
    path: '/services',
    keywords: ['receptionist service', 'law firm receptionist', 'website design', 'SEO services', 'digital marketing', 'lead generation'],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/services#service`,
        name: 'Strata Software Group',
        url: `${SITE_URL}/services`,
        description: 'Full-service phone receptionist deployment, website design, and digital marketing for professional services firms.',
        areaServed: 'US',
        parentOrganization: { '@id': ORG_ID },
        serviceType: ['Phone Receptionist Service', 'Website Design & Development', 'Digital Marketing & SEO', 'Lead Generation', 'Custom Software Development'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Strata Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'After Hours Phone Receptionist', description: 'Receptionist that answers client calls after business hours, takes messages, schedules consultations, and handles intake for law firms and insurance agencies.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Time Receptionist', description: '24/7 receptionist with intelligent call routing, CRM integration, bilingual support, and analytics dashboard.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Website Design & Development', description: 'Professional website design and development for law firms, insurance agencies, and small businesses. SEO-optimized, mobile-responsive sites that convert visitors into clients.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing & SEO', description: 'Search engine optimization, pay-per-click advertising, social media marketing, content marketing, and lead generation campaigns for professional services.' } },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  },
  '/portfolio': {
    title: 'Portfolio — Client Work & Case Studies',
    description: 'Client work and case studies from Strata Software Group — websites, receptionist deployments, and custom software built for professional services firms.',
    path: '/portfolio',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/portfolio#page`,
      name: 'Portfolio — Strata Software Group',
      url: `${SITE_URL}/portfolio`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  },
  '/about': {
    title: 'About Us — Oxford, Mississippi Software Company',
    description: 'Strata Software Group is an Oxford, Mississippi software company building AI receptionists, custom websites, and software for law firms, insurance agencies, and small businesses.',
    path: '/about',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#page`,
      name: 'About Strata Software Group',
      url: `${SITE_URL}/about`,
      about: { '@id': ORG_ID },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  },
  '/templates': {
    title: 'Premium Website Templates — Law, Insurance, Real Estate & More',
    description: 'Production-ready website templates for law firms, insurance agencies, real estate, SaaS, and creative agencies. Single-file, SEO-optimized, mobile-responsive — from $39.',
    path: '/templates',
    keywords: ['website template', 'law firm website template', 'insurance website template', 'small business website'],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Templates', path: '/templates' }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Premium Website Templates',
      description: 'Production-ready website templates for law firms, insurance agencies, real estate, SaaS, and more.',
      url: `${SITE_URL}/templates`,
      numberOfItems: TEMPLATE_LIST.length,
      itemListElement: TEMPLATE_LIST.map(([name, price], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `${name} Website Template`,
          offers: { '@type': 'Offer', price: String(price), priceCurrency: 'USD' },
        },
      })),
    },
  },
  '/contact': {
    title: 'Contact Us — Book a Demo or Request a Quote',
    description: 'Get in touch with Strata Software Group — book a receptionist demo, request a website or marketing quote, or email info@stratasoftwaregroup.com.',
    path: '/contact',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#page`,
      name: 'Contact Strata Software Group',
      url: `${SITE_URL}/contact`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  },
};
