import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

function About() {
  useScrollReveal();

  const values = [
    {
      title: 'Innovation',
      description: 'We embrace new technologies and approaches to solve complex problems',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
      ),
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients to understand and exceed their expectations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we deliver',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      title: 'Integrity',
      description: 'We build trust through transparency and honest communication',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="about">
      <div className="page-header reveal">
        <h1>About Strata Software Group</h1>
        <p>Innovating since day one</p>
      </div>

      <div className="about-content">
        {/* Mission */}
        <section className="about-section reveal">
          <div className="about-section-label">
            <span className="about-section-number">01</span>
            <span className="about-section-line"></span>
            <span className="about-section-tag">Our Mission</span>
          </div>
          <h2>Empowering Businesses Through Technology</h2>
          <p>
            At Strata Software Group, we're dedicated to delivering cutting-edge software solutions
            that empower businesses to achieve their goals. We combine technical expertise with
            creative problem-solving to build products and services that make a difference.
          </p>
        </section>

        {/* Values */}
        <section className="about-section reveal">
          <div className="about-section-label">
            <span className="about-section-number">02</span>
            <span className="about-section-line"></span>
            <span className="about-section-tag">Our Values</span>
          </div>
          <h2>What Drives Us</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-item reveal reveal-delay-${index + 1}`}
              >
                <div className="value-icon-container">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="about-section reveal">
          <div className="about-section-label">
            <span className="about-section-number">03</span>
            <span className="about-section-line"></span>
            <span className="about-section-tag">Our Team</span>
          </div>
          <h2>Passionate Problem Solvers</h2>
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
