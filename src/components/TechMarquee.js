import React from 'react';
import './TechMarquee.css';

const technologies = [
    'React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL',
    'Python', 'Docker', 'Figma', 'MongoDB', 'GraphQL',
    'Next.js', 'Kubernetes', 'Redis', 'Swift', 'Flutter',
];

function TechMarquee() {
    // Double the array for seamless infinite loop
    const items = [...technologies, ...technologies];

    return (
        <section className="marquee-section">
            <div className="marquee-track">
                {items.map((tech, idx) => (
                    <span key={idx} className="marquee-item">
                        {tech}
                        <span className="marquee-separator">·</span>
                    </span>
                ))}
            </div>
        </section>
    );
}

export default TechMarquee;
