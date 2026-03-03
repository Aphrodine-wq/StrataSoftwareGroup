import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import FloatingParticles from '../components/FloatingParticles';
import Tilt3DCard from '../components/Tilt3DCard';
import ProcessTimeline from '../components/ProcessTimeline';
import Testimonials from '../components/Testimonials';
import TechMarquee from '../components/TechMarquee';
import '../components/WebGLBackground.css';
import './Home.css';

const WebGLBackground = lazy(() => import('../components/WebGLBackground'));

function Home() {
  useScrollReveal();
  const [deferWebGL, setDeferWebGL] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const run = () => { if (!cancelled) setDeferWebGL(false); };
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(run, { timeout: 800 })
      : setTimeout(run, 400);
    return () => {
      cancelled = true;
      if (typeof requestIdleCallback !== 'undefined') cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  return (
    <div className="home">
      {/* ── Hero Section: CSS fallback first, WebGL loads after idle for faster paint ── */}
      <section className="hero">
        {deferWebGL ? (
          <div className="hero-shader webgl-bg--fallback" aria-hidden="true" />
        ) : (
          <Suspense fallback={<div className="hero-shader webgl-bg--fallback" aria-hidden="true" />}>
            <WebGLBackground className="hero-shader" />
          </Suspense>
        )}
        <FloatingParticles count={10} />

        {/* Layered depth elements */}
        <div className="hero-depth-layer hero-depth-1" aria-hidden="true" />
        <div className="hero-depth-layer hero-depth-2" aria-hidden="true" />
        <div className="hero-depth-layer hero-depth-3" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-label reveal">Custom Software · AI Tools · Game Development</p>
          <h1 className="hero-title reveal reveal-delay-1">
            We build software<br />
            <span className="hero-title-accent">that solves real problems.</span>
          </h1>
          <p className="hero-description reveal reveal-delay-2">
            Custom software development, AI-powered developer tools, game engines, and
            web applications — from architecture to deployment. Based in Dallas-Fort Worth,
            building for clients and shipping our own products.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <Link to="/contact" className="btn-primary">
              Get Started Today
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/services" className="btn-secondary">
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator reveal reveal-delay-4" aria-hidden="true">
          <div className="scroll-line" />
        </div>

      </section>

      {/* ── Section Divider ── */}
      <hr className="section-divider" />

      {/* ── Receptionist & Phone Solutions ── */}
      <section className="features-section">
        <div className="features-header reveal">
          <h2>Receptionist & Phone Solutions</h2>
          <p>24/7 phone answering for law firms, insurance agencies, and professional services</p>
        </div>

        <div className="features">
          <Tilt3DCard className="feature-card reveal reveal-delay-1">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3>After Hours Receptionist</h3>
            <p>Never lose a lead after 5 PM. We answer calls, take detailed messages, schedule consultations, and handle client intake — even at midnight.</p>
            <Link to="/services" className="feature-link">
              Learn More <span>→</span>
            </Link>
          </Tilt3DCard>

          <Tilt3DCard className="feature-card reveal reveal-delay-2">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Full Time Receptionist</h3>
            <p>24/7 call handling with CRM integration, smart routing, bilingual support, and real-time analytics for your practice or agency.</p>
            <Link to="/services" className="feature-link">
              Learn More <span>→</span>
            </Link>
          </Tilt3DCard>

          <Tilt3DCard className="feature-card reveal reveal-delay-3">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
            <h3>Premium Website Templates</h3>
            <p>Launch faster with production-ready templates built for law firms, insurance agencies, and professional services. Buy once, own forever.</p>
            <Link to="/templates" className="feature-link">
              Browse Templates <span>→</span>
            </Link>
          </Tilt3DCard>
        </div>
      </section>

      {/* ── Industry Focus ── */}
      <hr className="section-divider" />
      <section className="features-section">
        <div className="features-header reveal">
          <h2>Built for Your Industry</h2>
          <p>Purpose-built solutions that understand your clients</p>
        </div>

        <div className="features">
          <Tilt3DCard className="feature-card reveal reveal-delay-1">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Law Firms</h3>
            <p>Capture every potential client call. We handle initial consultations, conflict checks, case intake, and appointment scheduling — with full attorney-client confidentiality.</p>
          </Tilt3DCard>

          <Tilt3DCard className="feature-card reveal reveal-delay-2">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Insurance Agencies</h3>
            <p>Never miss a quote request or claims call. Our receptionist routes calls to the right agent, captures policy details, and schedules follow-ups automatically.</p>
          </Tilt3DCard>

          <Tilt3DCard className="feature-card reveal reveal-delay-3">
            <div className="feature-icon-container">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3>Professional Services</h3>
            <p>From accounting firms to medical practices — our receptionist adapts to your workflow, integrates with your tools, and keeps your front desk covered.</p>
          </Tilt3DCard>
        </div>
      </section>

      {/* ── Our Process ── */}
      <hr className="section-divider" />
      <ProcessTimeline />

      {/* ── Tech Marquee ── */}
      <TechMarquee />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA Banner ── */}
      <section className="cta-banner reveal">
        <div className="cta-glow" aria-hidden="true" />
        <div className="cta-glow-ring" aria-hidden="true" />
        <div className="cta-banner-content">
          <h2>Ready to Cover Your Front Desk 24/7?</h2>
          <p>Stop losing clients to missed calls. Get a receptionist that works around the clock.</p>
          <Link to="/contact" className="btn-primary">
            Get Started Today
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
