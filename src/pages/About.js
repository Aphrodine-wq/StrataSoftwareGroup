import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Strata Software Group</h1>
        <p>Innovating since day one</p>
      </div>
      
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At Strata Software Group, we're dedicated to delivering cutting-edge software solutions
            that empower businesses to achieve their goals. We combine technical expertise with
            creative problem-solving to build products and services that make a difference.
          </p>
        </section>
        
        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>💡 Innovation</h3>
              <p>We embrace new technologies and approaches to solve complex problems</p>
            </div>
            <div className="value-item">
              <h3>🤝 Collaboration</h3>
              <p>We work closely with our clients to understand and exceed their expectations</p>
            </div>
            <div className="value-item">
              <h3>⚡ Excellence</h3>
              <p>We strive for the highest quality in everything we deliver</p>
            </div>
            <div className="value-item">
              <h3>🔒 Integrity</h3>
              <p>We build trust through transparency and honest communication</p>
            </div>
          </div>
        </section>
        
        <section className="team">
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced developers, designers, and project managers
            who are passionate about technology and committed to delivering exceptional results.
            With diverse backgrounds and expertise, we bring a wealth of knowledge to every project.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
