import React from 'react';
import './Portfolio.css';

function Portfolio() {
  const projects = [
    {
      title: 'Example Fulfilled Contract',
      description: 'Example of a fulfilled contract',
      technologies: 'React, Node.js, MongoDB',
      link: '#'
    }
  ];

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>Our Portfolio</h1>
        <p>Showcasing our successful client projects</p>
      </div>
      
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <a href={project.link} key={index} className="portfolio-card">
            <div className="card-content">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="technologies">
                <span className="tech-label">Technologies:</span>
                <span className="tech-stack">{project.technologies}</span>
              </div>
            </div>
            <div className="card-footer">
              <span className="view-project">View Project →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
