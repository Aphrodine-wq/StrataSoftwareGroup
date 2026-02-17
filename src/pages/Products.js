import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

function Products() {
  useScrollReveal();

  const products = [
    {
      title: 'Fair Trade Worker',
      description: 'Fair Trade Worker is a platform that allows you to find the best team and best price for your project. Connect with verified contractors, get AI-powered quotes, and enjoy payment protection on every job.',
      features: ['AI Quote Estimates', 'Extensive Contractor Network', 'Payment Protection'],
      status: 'In Development',
      link: '#'
    }
  ];

  return (
    <div className="products">
      <div className="page-header reveal">
        <h1>Our Products</h1>
        <p>Innovative in-house software solutions</p>
      </div>

      <div className="products-grid">
        {products.map((product, index) => (
          <a href={product.link} key={index} className="product-card reveal reveal-delay-1">
            {/* Accent top border */}
            <div className="product-card-accent" aria-hidden="true"></div>

            <div className="card-content">
              <div className="product-card-header">
                <div className="product-icon-container">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                {product.status && (
                  <span className="product-status">{product.status}</span>
                )}
              </div>

              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>

              <ul className="features-list">
                {product.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-footer">
              <span className="learn-more">
                Learn More
                <span className="learn-more-arrow">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Placeholder for future products */}
      <div className="products-coming-soon reveal">
        <div className="coming-soon-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3>More Products Coming Soon</h3>
        <p>We're working on exciting new tools and platforms. Stay tuned for updates.</p>
      </div>
    </div>
  );
}

export default Products;
