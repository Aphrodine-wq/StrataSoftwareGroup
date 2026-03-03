import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './ProcessTimeline.css';

const steps = [
    {
        number: '01',
        title: 'Discover',
        description: 'We learn your goals, constraints, and users through deep-dive workshops and research.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Design',
        description: 'We craft wireframes, prototypes, and visual designs that align with your brand vision.',
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
        number: '03',
        title: 'Develop',
        description: 'Our engineers build with modern stacks, CI/CD pipelines, and rigorous code review.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Deploy',
        description: 'We launch, monitor, and iterate — ensuring your product thrives in production.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
        ),
    },
];

function ProcessTimeline() {
    useScrollReveal();

    return (
        <section className="process-section">
            <div className="process-header reveal">
                <h2>Our Process</h2>
                <p>Four proven steps from idea to impact</p>
            </div>

            <div className="process-timeline">
                <div className="process-line" aria-hidden="true" />
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`process-step reveal reveal-delay-${index + 1}`}
                    >
                        <div className="process-step-number">{step.number}</div>
                        <div className="process-step-icon-container">
                            {step.icon}
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProcessTimeline;
