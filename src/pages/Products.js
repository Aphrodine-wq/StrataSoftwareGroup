import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

function Products() {
  useScrollReveal();

  const products = [
    {
      name: 'Fair Trade Worker',
      tagline: 'Workforce management, reimagined.',
      description:
        'A comprehensive platform for managing worker scheduling, compliance tracking, and payroll integration — designed with fairness and transparency at its core.',
      status: 'Live',
      features: [
        'Smart scheduling & shift management',
        'Compliance & labor-law tracking',
        'Payroll integration (ADP, Gusto)',
        'Worker self-service portal',
        'Real-time analytics dashboard',
        'Multi-location support',
      ],
      gradient: 'linear-gradient(135deg, #B48A4A 0%, #7E5E33 100%)',
    },
    {
      name: 'CodeVault',
      tagline: 'Your codebase, documented automatically.',
      description:
        'AI-powered documentation engine that continuously analyzes your repository, generates living docs, and keeps them in sync with every commit.',
      status: 'Coming Q2 2026',
      features: [
        'Auto-generated API documentation',
        'Architecture diagram extraction',
        'Commit-linked changelog',
        'Search across docs & code',
      ],
      gradient: 'linear-gradient(135deg, #64748B 0%, #1E293B 100%)',
    },
    {
      name: 'FieldSync',
      tagline: 'Field operations, connected.',
      description:
        'A mobile-first platform for field service teams — dispatch, track, and report in real time, even offline.',
      status: 'Coming Q4 2026',
      features: [
        'Offline-first mobile app',
        'GPS dispatch & routing',
        'Photo/video job reports',
        'Customer notification system',
      ],
      gradient: 'linear-gradient(135deg, #475569 0%, #0F172A 100%)',
    },
  ];

  const tiers = [
    {
      name: 'Starter',
      price: '$49/mo',
      features: ['Up to 25 workers', 'Basic scheduling', 'Email support', 'Standard reports'],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$149/mo',
      features: ['Up to 150 workers', 'Advanced scheduling + compliance', 'Priority support', 'Custom integrations', 'Analytics dashboard'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited workers', 'Dedicated account manager', 'SLA guarantee', 'SSO & RBAC', 'On-premise option'],
      highlighted: false,
    },
  ];

  return (
    <div className="products">
      <div className="page-header reveal">
        <h1>Our Products</h1>
        <p>Software solutions we've built and maintain</p>
      </div>

      <div className="products-content">
        {/* Product Grid */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-card reveal reveal-delay-${index + 1} ${product.status === 'Live' ? 'product-card--live' : 'product-card--upcoming'
                }`}
            >
              <div
                className="product-card-header"
                style={{ background: product.gradient }}
              >
                <span className={`product-status ${product.status === 'Live' ? 'status-live' : 'status-upcoming'}`}>
                  {product.status}
                </span>
              </div>
              <div className="product-card-body">
                <h2>{product.name}</h2>
                <p className="product-tagline">{product.tagline}</p>
                <p className="product-description">{product.description}</p>

                <ul className="product-features">
                  {product.features.map((feature, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {product.status === 'Live' && (
                  <Link to="/contact" className="btn-primary product-cta">
                    Request Demo <span className="btn-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Tiers — Fair Trade Worker */}
        <section className="pricing-section reveal">
          <h2>Fair Trade Worker — Plans</h2>
          <p className="pricing-subtitle">Choose the plan that grows with your team</p>

          <div className="pricing-grid">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`pricing-card reveal reveal-delay-${index + 1} ${tier.highlighted ? 'pricing-card--highlighted' : ''
                  }`}
              >
                {tier.highlighted && <span className="pricing-badge">Most Popular</span>}
                <h3>{tier.name}</h3>
                <div className="pricing-price">{tier.price}</div>
                <ul className="pricing-features">
                  {tier.features.map((f, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={tier.highlighted ? 'btn-primary' : 'btn-secondary'}>
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;
