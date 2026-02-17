import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
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

  const team = [
    {
      name: 'Hannah White',
      role: 'Chief Growth Officer (CGO) & Co-Founder',
      bio: 'Drives growth and advertising strategy, paid media, funnel optimization, and go-to-market.',
      initials: 'HW',
      gradient: 'linear-gradient(135deg, #E0C38C, #B48A4A)',
      scope: [
        'Growth & advertising strategy',
        'Paid media oversight',
        'Funnel & conversion strategy',
        'Analytics & performance',
        'Go-to-market strategy',
        'Client growth conversations',
      ],
    },
    {
      name: 'Walt Burge',
      role: 'Chief Experience Officer (CXO) & Co-Founder',
      bio: 'Leads UX/UI strategy, product design systems, and conversion-focused design across web and apps.',
      initials: 'WB',
      gradient: 'linear-gradient(135deg, #B48A4A, #7E5E33)',
      scope: [
        'UX/UI strategy',
        'Product design systems',
        'User flows & accessibility',
        'Conversion-focused design',
        'Design leadership across web & apps',
      ],
    },
    {
      name: 'Mason Glen',
      role: 'Chief Technology Officer (CTO) & Co-Founder',
      bio: 'Owns architecture, engineering standards, app & web development, and dev team leadership.',
      initials: 'MG',
      gradient: 'linear-gradient(135deg, #9E763E, #B48A4A)',
      scope: [
        'Architecture & infrastructure',
        'Engineering standards',
        'App & web development',
        'Security & scalability',
        'Dev team leadership',
      ],
    },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Strata Software Group launched with a vision to redefine digital craftsmanship.' },
    { year: '2021', title: 'First Major Client', description: 'Delivered a full-stack platform serving 50K+ users within our first year.' },
    { year: '2023', title: 'Team Growth', description: 'Expanded to a multidisciplinary team of 15+ engineers, designers, and strategists.' },
    { year: '2025', title: 'Product Launch', description: 'Launched Fair Trade Worker, our first proprietary SaaS product.' },
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

          {/* Animated Stats Bar */}
          <div className="about-stats-bar reveal reveal-delay-1">
            <div className="about-stat">
              <span className="about-stat-number">
                <AnimatedCounter end={5} suffix="+" />
              </span>
              <span className="about-stat-label">Years of Experience</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">
                <AnimatedCounter end={50} suffix="+" />
              </span>
              <span className="about-stat-label">Projects Completed</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">
                <AnimatedCounter end={15} suffix="+" />
              </span>
              <span className="about-stat-label">Team Members</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">
                <AnimatedCounter end={12} suffix="+" />
              </span>
              <span className="about-stat-label">Industries Served</span>
            </div>
          </div>
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
          <h2>Leadership & Co-Founders</h2>
          <p>
            Strata is led by three co-founders who bring together growth, experience, and technology
            to deliver exceptional results for every client.
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className={`team-card reveal reveal-delay-${index + 1}`}>
                <div
                  className="team-card-avatar"
                  style={{ background: member.gradient }}
                >
                  {member.initials}
                </div>
                <h3 className="team-card-name">{member.name}</h3>
                <span className="team-card-role">{member.role}</span>
                <p className="team-card-bio">{member.bio}</p>
                {member.scope && member.scope.length > 0 && (
                  <ul className="team-card-scope" aria-label="Scope">
                    {member.scope.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="about-section reveal">
          <div className="about-section-label">
            <span className="about-section-number">04</span>
            <span className="about-section-line"></span>
            <span className="about-section-tag">Our Journey</span>
          </div>
          <h2>Key Milestones</h2>
          <div className="milestones-timeline">
            {milestones.map((ms, index) => (
              <div key={index} className={`milestone-item reveal reveal-delay-${Math.min(index + 1, 4)}`}>
                <div className="milestone-dot" />
                <div className="milestone-year">{ms.year}</div>
                <h3>{ms.title}</h3>
                <p>{ms.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
