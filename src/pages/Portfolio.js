import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Portfolio.css';

function Portfolio() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'G-Rump',
      description:
        'AI coding agent for macOS — 54K lines of Swift with multi-model AI support (OpenRouter, Anthropic, OpenAI, Ollama), 100+ local tools, MCP integration, and agent orchestration. macOS native built with SwiftUI.',
      category: 'Product',
      technologies: ['Swift', 'SwiftUI', 'AI/LLM', 'MCP'],
      gradient: 'linear-gradient(135deg, #3D3B5C, #1E1D2E)',
      stats: { timeline: 'Live', team: 'Strata' },
      url: 'https://www.g-rump.com',
    },
    {
      title: 'AEON',
      description:
        'Multi-language static analysis engine — 85K lines of Python powering 20+ language adapters, deep code analysis with AI-powered suggestions, and a CLI-first interface built for developer workflows.',
      category: 'Product',
      technologies: ['Python', 'AI/ML', 'Static Analysis', 'CLI'],
      gradient: 'linear-gradient(135deg, #1A3A5C, #0D1F33)',
      stats: { timeline: 'Live', team: 'Strata' },
    },
    {
      title: 'Driftlands',
      description:
        'Survival crafting game built with Bevy and Rust — procedural world generation, combat, crafting, farming, and building systems. 40 user stories covering a full gameplay loop from exploration to base defense.',
      category: 'Product',
      technologies: ['Rust', 'Bevy', 'Procedural Gen', 'ECS'],
      gradient: 'linear-gradient(135deg, #2D5A3D, #1A3522)',
      stats: { timeline: 'In Development', team: 'Strata' },
    },
    {
      title: 'FairTradeWorker.com',
      description:
        'Fair trade and ethical sourcing platform connecting workers with transparent supply chains and sustainable business practices.',
      category: 'Client',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #B48A4A, #7E5E33)',
      stats: { timeline: 'Live', team: 'Strata' },
      url: 'https://www.FairTradeWorker.com',
    },
    {
      title: 'Life Balance Oxford',
      description:
        'Wellness and life coaching services in Oxford — helping clients achieve balance through personalized guidance and holistic approaches.',
      category: 'Client',
      technologies: ['React', 'WordPress', 'SEO'],
      gradient: 'linear-gradient(135deg, #4A5D6B, #2A3540)',
      stats: { timeline: 'Live', team: 'Strata' },
      url: 'https://www.lifebalanceoxford.com',
    },
    {
      title: 'Ole Miss 365',
      description:
        'Productivity and wellness platform delivering daily insights, mindfulness tools, and organizational solutions for individuals and teams.',
      category: 'Client',
      technologies: ['React', 'Node.js', 'Cloud'],
      gradient: 'linear-gradient(135deg, #5E4B6E, #2E2535)',
      stats: { timeline: 'Live', team: 'Strata' },
      url: 'https://olemiss365.com/',
    },
  ];

  const categories = ['All', 'Product', 'Client'];

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
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-card-link"
                >
                  Visit Site →
                </a>
              )}
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
