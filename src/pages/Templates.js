import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { websiteTemplates, websiteTemplateCategories } from '../data/websiteTemplates';
import './Templates.css';

const baseUrl = process.env.PUBLIC_URL || '';

function Templates() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? websiteTemplates
      : websiteTemplates.filter((t) => t.category === activeCategory);

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
            Launch your law firm, insurance agency, or professional services website in hours — not weeks.
            Every template is built by Strata to the same standard as our client work, with clean code,
            responsive design, and a premium feel out of the box. Pair any template with our AI
            Receptionist for a complete client-acquisition system. Purchase once, own forever.
          </p>
        </div>

        {/* Category Filter */}
        <div className="templates-filter reveal">
          {websiteTemplateCategories.map((cat) => (
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
                  <span className="template-price">
                    {template.price != null ? `$${template.price}` : 'Contact for price'}
                  </span>
                  <div className="template-actions">
                    <a
                      href={baseUrl + template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary template-preview-btn"
                    >
                      Preview
                    </a>
                    <Link
                      to={`/templates/preview/${template.id}`}
                      className="template-preview-inpage"
                    >
                      View in page
                    </Link>
                    <Link to={`/templates/checkout/${template.id}`} className="btn-primary template-cta">
                      Purchase <span className="btn-arrow">→</span>
                    </Link>
                  </div>
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
