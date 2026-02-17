import React, { useState, useEffect, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
    {
        quote:
            "Strata Software Group transformed our vision into a polished product in record time. Their attention to detail and technical excellence is unmatched.",
        name: 'Sarah Mitchell',
        title: 'CTO',
        company: 'Nexus Innovations',
    },
    {
        quote:
            "Working with Strata felt like having an elite in-house engineering team. They didn't just write code — they solved our core business problems.",
        name: 'David Chen',
        title: 'Founder & CEO',
        company: 'BrightPath Analytics',
    },
    {
        quote:
            "From the initial workshop to deployment, every step was transparent and professionally managed. The final product exceeded our expectations by miles.",
        name: 'Jessica Romero',
        title: 'VP of Product',
        company: 'VeloHealth',
    },
];

function Testimonials() {
    useScrollReveal();
    const [active, setActive] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback(
        (index) => {
            if (index === active || isTransitioning) return;
            setIsTransitioning(true);
            setTimeout(() => {
                setActive(index);
                setIsTransitioning(false);
            }, 300);
        },
        [active, isTransitioning]
    );

    // Auto-rotate every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            goTo((active + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [active, goTo]);

    return (
        <section className="testimonials-section">
            <div className="testimonials-header reveal">
                <h2>What Clients Say</h2>
                <p>Trusted by innovative teams worldwide</p>
            </div>

            <div className="testimonial-carousel reveal reveal-delay-1">
                <div className="testimonial-glow" aria-hidden="true" />

                {/* Quote icon */}
                <div className="testimonial-quote-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                </div>

                <div className={`testimonial-content ${isTransitioning ? 'fading' : ''}`}>
                    <blockquote className="testimonial-text">
                        "{testimonials[active].quote}"
                    </blockquote>
                    <div className="testimonial-author">
                        <div className="testimonial-avatar">
                            {testimonials[active].name.charAt(0)}
                        </div>
                        <div>
                            <div className="testimonial-name">{testimonials[active].name}</div>
                            <div className="testimonial-role">
                                {testimonials[active].title}, {testimonials[active].company}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="testimonial-dots">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            className={`testimonial-dot ${idx === active ? 'active' : ''}`}
                            onClick={() => goTo(idx)}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
