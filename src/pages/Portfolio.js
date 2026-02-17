import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Portfolio.css';

function Portfolio() {
  useScrollReveal();

  const projects = [
    {
      title: 'Example Fulfilled Contract',
      description: 'A comprehensive full-stack application delivered on time and within budget. Built with modern technologies and scalable architecture.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      category: 'Full-Stack',
      link: '#'
    }
  ];

  return (
    <div className="portfolio">
      <div className="page-header reveal">
        <h1>Our Portfolio</h1>
        <p>Showcasing our successful client projects</p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <a href={project.link} key={index} className="portfolio-card reveal reveal-delay-1">
            {/* Image placeholder area */}
            <div className="portfolio-card-image">
              <div className="portfolio-card-image-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              {project.category && (
                <span className="portfolio-category">{project.category}</span>
              )}
            </div>

            <div className="card-content">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>

            <div className="card-footer">
              <span className="view-project">
                View Project
                <span className="view-project-arrow">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
