import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Templates.css';

const templates = [
  {
    id: 1,
    name: 'Executive Dashboard',
    category: 'Dashboard',
    description: 'A comprehensive analytics dashboard with KPI cards, charts, and data tables — ready to plug into any SaaS product.',
    price: 149,
    badge: 'Best Seller',
    features: ['7 chart types', 'Dark & light mode', 'Fully responsive', 'React + Recharts'],
    gradient: 'linear-gradient(135deg, #B48A4A 0%, #7E5E33 100%)',
    previewTag: 'React',
  },
  {
    id: 2,
    name: 'SaaS Landing Page',
    category: 'Landing Page',
    description: 'A conversion-optimised landing page template for software products. Includes hero, features, pricing, and CTA sections.',
    price: 99,
    badge: null,
    features: ['Pricing table', 'Animated hero', 'Email capture form', 'SEO-ready HTML'],
    gradient: 'linear-gradient(135deg, #4F84C4 0%, #1E293B 100%)',
    previewTag: 'React',
  },
  {
    id: 3,
    name: 'Admin Control Panel',
    category: 'Dashboard',
    description: 'Full-featured admin panel with user management, role-based access UI, audit logs, and notification centre.',
    price: 199,
    badge: 'New',
    features: ['User management UI', 'RBAC-ready', 'Notification centre', 'Sidebar navigation'],
    gradient: 'linear-gradient(135deg, #2F8F83 0%, #0F172A 100%)',
    previewTag: 'React',
  },
  {
    id: 4,
    name: 'Marketing Agency Site',
    category: 'Website',
    description: 'A sleek multi-page website template for agencies — portfolio, services, team, and contact — all connected.',
    price: 129,
    badge: null,
    features: ['5 pages included', 'Animated sections', 'Contact form', 'Portfolio grid'],
    gradient: 'linear-gradient(135deg, #64748B 0%, #1E293B 100%)',
    previewTag: 'React',
  },
  {
    id: 5,
    name: 'E-Commerce Storefront',
    category: 'E-Commerce',
    description: 'A modern storefront UI with product listings, cart drawer, checkout flow, and order confirmation — frontend only.',
    price: 179,
    badge: null,
    features: ['Product grid & filters', 'Cart & checkout UI', 'Wishlist', 'Mobile-first'],
    gradient: 'linear-gradient(135deg, #D2A24C 0%, #7E5E33 100%)',
    previewTag: 'React',
  },
  {
    id: 6,
    name: 'Developer Portfolio',
    category: 'Website',
    description: 'A minimal, elegant portfolio for developers and designers. Showcase projects, skills, and contact info with flair.',
    price: 79,
    badge: 'Popular',
    features: ['Projects showcase', 'Skills section', 'Blog-ready', 'Dark theme'],
    gradient: 'linear-gradient(135deg, #475569 0%, #0F172A 100%)',
    previewTag: 'React',
  },
];

const categories = ['All', 'Dashboard', 'Landing Page', 'Website', 'E-Commerce'];

function Templates() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="templates">
      {/* Page Header */}
      <div className="page-header reveal">
        <h1>Templates</h1>
        <p>Premium, production-ready templates to launch faster</p>
      </div>

      <div className="templates-content">
        {/* Intro */}
        <div className="templates-intro reveal">
          <p>
            Every template is built by the Strata team to the same standard as our client
            work — clean code, responsive design, and a premium feel out of the box.
            Purchase once, own forever.
          </p>
        </div>

        {/* Category Filter */}
        <div className="templates-filter reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="templates-grid">
          {filtered.map((template, index) => (
            <div
              key={template.id}
              className={`template-card reveal reveal-delay-${Math.min(index + 1, 4)}`}
            >
              {/* Card Header */}
              <div
                className="template-card-header"
                style={{ background: template.gradient }}
              >
                <span className="template-preview-tag">{template.previewTag}</span>
                {template.badge && (
                  <span className="template-badge">{template.badge}</span>
                )}
              </div>

              {/* Card Body */}
              <div className="template-card-body">
                <div className="template-meta">
                  <span className="template-category">{template.category}</span>
                </div>
                <h2>{template.name}</h2>
                <p className="template-description">{template.description}</p>

                <ul className="template-features">
                  {template.features.map((feat, i) => (
                    <li key={i}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="template-footer">
                  <span className="template-price">${template.price}</span>
                  <Link to="/contact" className="btn-primary template-cta">
                    Purchase <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Template CTA */}
        <section className="templates-custom reveal">
          <div className="templates-custom-inner">
            <h2>Need a custom template?</h2>
            <p>
              Don't see what you need? We build bespoke templates and UI kits tailored
              to your brand, stack, and workflow.
            </p>
            <Link to="/contact" className="btn-primary">
              Talk to us <span className="btn-arrow">→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Templates;
