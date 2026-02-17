import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Portfolio.css';

function Portfolio() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'NexPay Financial Platform',
      description:
        'A next-generation payment processing dashboard serving 10K+ merchants with real-time analytics, fraud detection, and multi-currency support.',
      category: 'Full-Stack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      gradient: 'linear-gradient(135deg, #1E3A5F, #0D1B2A)',
      stats: { timeline: '14 weeks', team: '5 engineers' },
    },
    {
      title: 'FreshRoute Delivery',
      description:
        'Mobile-first ordering and logistics app for a farm-to-table delivery service, handling 2K+ daily orders across 3 cities.',
      category: 'Mobile',
      technologies: ['React Native', 'Firebase', 'Maps API', 'Stripe'],
      gradient: 'linear-gradient(135deg, #2D4A22, #1A2B15)',
      stats: { timeline: '10 weeks', team: '3 engineers' },
    },
    {
      title: 'Meridian Health Portal',
      description:
        'HIPAA-compliant patient portal with appointment scheduling, telehealth integration, and secure messaging for a regional health network.',
      category: 'Web App',
      technologies: ['Next.js', 'TypeScript', 'AWS', 'Twilio'],
      gradient: 'linear-gradient(135deg, #3B2D5E, #1A1232)',
      stats: { timeline: '18 weeks', team: '6 engineers' },
    },
    {
      title: 'Volta Brand Identity',
      description:
        'Complete brand identity and marketing site for an EV charging startup — logo, design system, illustrations, and responsive website.',
      category: 'Design',
      technologies: ['Figma', 'Svelte', 'GSAP', 'Contentful'],
      gradient: 'linear-gradient(135deg, #5E3B25, #2E1A0F)',
      stats: { timeline: '6 weeks', team: '2 designers' },
    },
  ];

  const categories = ['All', 'Full-Stack', 'Web App', 'Mobile', 'Design'];

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="portfolio">
      <div className="page-header reveal">
        <h1>Our Portfolio</h1>
        <p>A selection of projects we're proud of</p>
      </div>

      {/* Filter Bar */}
      <div className="portfolio-filters reveal">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filtered.map((project, index) => (
          <div
            key={project.title}
            className={`portfolio-card reveal reveal-delay-${Math.min(index + 1, 4)}`}
          >
            {/* Color gradient header replacing placeholder image */}
            <div
              className="portfolio-card-image"
              style={{ background: project.gradient }}
            >
              <span className="portfolio-category-tag">{project.category}</span>

              {/* Hover stats overlay */}
              <div className="portfolio-overlay">
                <div className="portfolio-overlay-stat">
                  <span className="portfolio-overlay-label">Timeline</span>
                  <span className="portfolio-overlay-value">{project.stats.timeline}</span>
                </div>
                <div className="portfolio-overlay-stat">
                  <span className="portfolio-overlay-label">Team</span>
                  <span className="portfolio-overlay-value">{project.stats.team}</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card-body">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="portfolio-tech-row">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="portfolio-tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="portfolio-empty">No projects in this category yet. Check back soon!</p>
      )}
    </div>
  );
}

export default Portfolio;
