import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Home.css';

function Home() {
  useScrollReveal();

  return (
    <div className="home">
      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true"></div>
        <div className="hero-glow" aria-hidden="true"></div>

        <div className="hero-content">
          <p className="hero-label reveal">Software Engineering Studio</p>
          <h1 className="hero-title reveal reveal-delay-1">
            Building Tomorrow's<br />
            <span className="hero-title-accent">Solutions Today</span>
          </h1>
          <p className="hero-description reveal reveal-delay-2">
            We deliver innovative software solutions, custom development services,
            and cutting-edge products to help your business thrive in the digital age.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <Link to="/contact" className="btn-primary">
              Start a Project
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>

        {/* Decorative metrics */}
        <div className="hero-stats reveal reveal-delay-4">
          <div className="hero-stat">
            <span className="hero-stat-number">50+</span>
            <span className="hero-stat-label">Projects Delivered</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">99%</span>
            <span className="hero-stat-label">Client Satisfaction</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">24/7</span>
            <span className="hero-stat-label">Support Available</span>
          </div>
        </div>
      </section>

      {/* ── Section Divider ── */}
      <hr className="section-divider" />

      {/* ── Features Section ── */}
      <section className="features-section">
        <div className="features-header reveal">
          <h2>What We Do</h2>
          <p>End-to-end software solutions crafted with precision</p>
        </div>

        <div className="features">
          <div className="feature-card reveal reveal-delay-1">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <h3>Innovative Products</h3>
            <p>Explore our suite of in-house software solutions designed to solve real-world problems at scale.</p>
            <Link to="/products" className="feature-link">
              Explore Products <span>→</span>
            </Link>
          </div>

          <div className="feature-card reveal reveal-delay-2">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Professional Services</h3>
            <p>Expert development and consulting services tailored to your unique business challenges.</p>
            <Link to="/services" className="feature-link">
              Our Services <span>→</span>
            </Link>
          </div>

          <div className="feature-card reveal reveal-delay-3">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
            <h3>Proven Portfolio</h3>
            <p>View our track record of successful client projects spanning multiple industries.</p>
            <Link to="/portfolio" className="feature-link">
              View Portfolio <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner reveal">
        <div className="cta-banner-content">
          <h2>Ready to Build Something Great?</h2>
          <p>Let's discuss your next project and turn your vision into reality.</p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
