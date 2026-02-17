import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import './Services.css';

function Services() {
  useScrollReveal();

  const services = [
    {
      name: 'Custom Software Development',
      description:
        'End-to-end custom software solutions tailored to your business needs. From web applications to enterprise platforms, we build scalable, maintainable software that grows with you.',
      price: 'Starting at $5,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      features: ['Full-stack development', 'API design & integration', 'Cloud deployment'],
    },
    {
      name: 'Mobile App Development',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices.',
      price: 'Starting at $8,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      features: ['iOS & Android', 'React Native / Flutter', 'App Store deployment'],
    },
    {
      name: 'UI/UX Design',
      description:
        'Human-centered design that balances beauty and usability. We create interfaces that feel intuitive and leave a lasting impression.',
      price: 'Starting at $3,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      features: ['Wireframing & prototyping', 'User research', 'Design systems'],
    },
    {
      name: 'Technical Consulting',
      description:
        'Strategic technology guidance to help you make informed decisions about architecture, stack selection, and engineering best practices.',
      price: 'Starting at $200/hr',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      features: ['Architecture review', 'Technology audit', 'Team mentoring'],
    },
    {
      name: 'Cloud & DevOps',
      description:
        'Modern cloud infrastructure and CI/CD pipelines that ensure your applications are reliable, scalable, and cost-efficient.',
      price: 'Starting at $3,000/mo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      features: ['AWS / GCP / Azure', 'CI/CD pipelines', 'Monitoring & alerts'],
    },
  ];

  const differentiators = [
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees, no scope creep. Detailed estimates upfront.',
      icon: '💎',
    },
    {
      title: 'Agile Delivery',
      description: '2-week sprints with demos. You see progress, not promises.',
      icon: '🚀',
    },
    {
      title: 'Code Ownership',
      description: 'You own 100% of the code. No lock-in, no licensing traps.',
      icon: '🔑',
    },
    {
      title: 'Post-Launch Support',
      description: '90-day warranty included with every project we ship.',
      icon: '🛡️',
    },
  ];

  return (
    <div className="services">
      <div className="page-header reveal">
        <h1>Our Services</h1>
        <p>Expert development and consulting tailored to your needs</p>
      </div>

      <div className="services-content">
        <section className="services-list">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-row reveal reveal-delay-${Math.min(index + 1, 4)}`}
            >
              <div className="service-accent" aria-hidden="true" />
              <div className="service-icon-container">
                {service.icon}
              </div>
              <div className="service-info">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="service-pricing">
                <span className="service-price">{service.price}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ── Why Choose Us ── */}
        <section className="why-choose-section reveal">
          <h2>Why Choose Strata?</h2>
          <div className="why-choose-grid">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className={`why-choose-card reveal reveal-delay-${index + 1}`}
              >
                <span className="why-choose-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="services-cta reveal">
          <h2>Need a Custom Solution?</h2>
          <p>
            Every project is unique. Let's discuss your requirements and find the
            perfect approach for your business.
          </p>
          <Link to="/contact" className="btn-primary">
            Request a Quote
            <span className="btn-arrow">→</span>
          </Link>
        </section>
      </div>

      {/* ── FAQ ── */}
      <FAQAccordion />
    </div>
  );
}

export default Services;
