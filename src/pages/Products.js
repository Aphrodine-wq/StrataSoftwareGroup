import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

function Products() {
  useScrollReveal();

  const products = [
    {
      name: 'After Hours AI Receptionist',
      tagline: 'Never miss a client call after 5 PM.',
      description:
        'An AI-powered phone receptionist that answers every call outside business hours — capturing leads, scheduling consultations, handling client intake, and sending you detailed transcripts. Built for law firms, insurance agencies, and professional services.',
      status: 'Live',
      features: [
        '24/7 after-hours call answering',
        'Automated appointment scheduling',
        'Client intake & lead capture',
        'Call transcription & message summaries',
        'Customizable greetings & scripts',
        'SMS & email notifications',
      ],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #3B82F6 100%)',
    },
    {
      name: 'Full Time AI Receptionist',
      tagline: 'Your front desk, fully automated.',
      description:
        'A dedicated AI receptionist that manages all inbound calls around the clock — intelligent routing, CRM synchronization, bilingual support, and a real-time analytics dashboard to track every interaction.',
      status: 'Live',
      features: [
        'Intelligent call routing & transfers',
        'CRM integration (Clio, Salesforce, HubSpot)',
        'Bilingual support (English & Spanish)',
        'Real-time analytics dashboard',
        'Overflow & peak-hour handling',
        'Custom call flows per department',
      ],
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
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

  return (
    <div className="products">
      <div className="page-header reveal">
        <h1>AI Solutions & Products</h1>
        <p>AI receptionists, workforce tools, and developer products built by Strata</p>
      </div>

      <div className="products-content">
        {/* Product Grid */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-card reveal reveal-delay-${Math.min(index + 1, 4)} ${product.status === 'Live' ? 'product-card--live' : 'product-card--upcoming'
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
      </div>
    </div>
  );
}

export default Products;
