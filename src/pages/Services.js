import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import './Services.css';

function Services() {
  useScrollReveal();

  const services = [
    {
      name: 'After Hours AI Phone Receptionist',
      description:
        'Never lose a client after business hours. Our AI receptionist answers every call, captures caller details, schedules consultations, handles intake forms, and sends you a full transcript — so you wake up to new leads, not missed calls.',
      price: 'Contact for Pricing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      features: ['24/7 call answering after hours', 'Call transcription & message summaries', 'Appointment scheduling', 'Client intake & lead capture'],
    },
    {
      name: 'Full Time AI Receptionist',
      description:
        'A dedicated AI receptionist that handles all inbound calls around the clock — routing callers to the right person, answering common questions, syncing with your CRM, and providing bilingual support for a seamless client experience.',
      price: 'Contact for Pricing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      features: ['Intelligent call routing & transfers', 'CRM integration (Clio, Salesforce, etc.)', 'Bilingual (English & Spanish)', 'Real-time analytics dashboard'],
    },
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
      title: 'AI-Powered 24/7',
      description: 'Your AI receptionist never takes a day off — answering calls at midnight, weekends, and holidays.',
      icon: '🤖',
    },
    {
      title: 'Industry-Trained',
      description: 'Built specifically for law firms, insurance agencies, and professional services.',
      icon: '🎯',
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees, no per-minute surprises. Simple, predictable plans.',
      icon: '💎',
    },
    {
      title: 'Fast Setup',
      description: 'Go live in days, not months. We handle setup, training, and integration.',
      icon: '🚀',
    },
  ];

  return (
    <div className="services">
      <div className="page-header reveal">
        <h1>AI Receptionist Services & More</h1>
        <p>AI-powered phone solutions and expert development tailored to your business</p>
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
          <h2>Ready for an AI Receptionist?</h2>
          <p>
            Stop losing clients to missed calls. Let's set up your AI receptionist
            and start capturing every lead — after hours and beyond.
          </p>
          <Link to="/contact" className="btn-primary">
            Get Started
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
