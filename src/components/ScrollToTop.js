import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(scrollPercent);
            setVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // SVG circle parameters
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;

    return (
        <button
            className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <svg className="scroll-to-top-progress" viewBox="0 0 48 48">
                <circle
                    className="scroll-to-top-track"
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    strokeWidth="2"
                />
                <circle
                    className="scroll-to-top-indicator"
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <svg className="scroll-to-top-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
}

export default ScrollToTop;
