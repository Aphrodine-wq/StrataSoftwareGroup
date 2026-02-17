import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Services.css';

function Services() {
  useScrollReveal();

  const services = [
    {
      name: 'Custom Software Development',
      description: 'Tailored software solutions built to meet your specific business needs, from concept to deployment.',
      price: 'Starting at $10,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      name: 'Web Application Development',
      description: 'Modern, responsive web applications using the latest technologies and best practices.',
      price: 'Starting at $7,500',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that your users will love.',
      price: 'Starting at $12,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      name: 'UI/UX Design',
      description: 'User-centered design that creates engaging and intuitive experiences your customers will remember.',
      price: 'Starting at $3,000',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
    },
    {
      name: 'API Development & Integration',
      description: 'RESTful APIs and third-party service integrations that connect your ecosystem seamlessly.',
      price: 'Starting at $4,500',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      ),
    },
    {
      name: 'Technical Consulting',
      description: 'Expert guidance on architecture, technology stack, and best practices from seasoned engineers.',
      price: '$200/hour',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    }
  ];

  return (
    <div className="services">
      <div className="page-header reveal">
        <h1>Our Services</h1>
        <p>Professional software development tailored to your needs</p>
      </div>

      <div className="services-list">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-row reveal reveal-delay-${Math.min(index + 1, 4)}`}
          >
            <div className="service-icon-container">
              {service.icon}
            </div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <div className="service-price">
              <span className="price">{service.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="services-cta reveal">
        <p>Need a custom solution? Let's talk about your specific requirements.</p>
        <Link to="/contact" className="btn-primary">
          Request a Quote <span className="btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default Services;
