import React, { useState, useEffect, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
    {
        quote:
            "Our after-hours AI receptionist from Strata has captured leads we were completely missing. We've seen a 40% increase in new client consultations since going live.",
        name: 'Jennifer Caldwell',
        title: 'Managing Partner',
        company: 'Caldwell & Associates Law Firm',
    },
    {
        quote:
            "We used to lose quote requests every evening and weekend. Now our AI receptionist handles everything — scheduling, intake, even basic policy questions. It's like having a full-time employee that never sleeps.",
        name: 'Marcus Rivera',
        title: 'Agency Owner',
        company: 'Rivera Insurance Group',
    },
    {
        quote:
            "The AI receptionist integrates perfectly with our case management system. It handles conflict checks, schedules consultations, and sends us detailed transcripts. Our attorneys love it.",
        name: 'Patricia Nguyen',
        title: 'Office Administrator',
        company: 'Nguyen Legal Partners',
    },
    {
        quote:
            "Strata's law firm website template paired with their AI receptionist transformed our online presence overnight. We went from zero web leads to booking 15+ consultations a month.",
        name: 'Thomas Whitfield',
        title: 'Solo Practitioner',
        company: 'Whitfield Law PLLC',
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
                <h2>What Our Clients Say</h2>
                <p>Trusted by law firms and insurance agencies nationwide</p>
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
