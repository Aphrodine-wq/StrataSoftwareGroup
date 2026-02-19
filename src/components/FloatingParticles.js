import React, { useState, useEffect } from 'react';
import './FloatingParticles.css';

/**
 * CSS-only ambient floating particles for premium depth.
 * ~18 randomized glowing dots with staggered drift animations.
 * Respects prefers-reduced-motion (disabled or minimal count).
 */
function FloatingParticles({ count = 18, className = '' }) {
    const [effectiveCount, setEffectiveCount] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : count
    );
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setEffectiveCount(mq.matches ? 0 : count);
        const handler = () => setEffectiveCount(mq.matches ? 0 : count);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [count]);

    const particles = Array.from({ length: effectiveCount }, (_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 12 + Math.random() * 18;
        const opacity = 0.15 + Math.random() * 0.4;
        const drift = -30 + Math.random() * 60;

        return (
            <span
                key={i}
                className="floating-particle"
                aria-hidden="true"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    bottom: `-${size}px`,
                    opacity: 0,
                    '--p-delay': `${delay}s`,
                    '--p-duration': `${duration}s`,
                    '--p-opacity': opacity,
                    '--p-drift': `${drift}px`,
                }}
            />
        );
    });

    return (
        <div className={`floating-particles ${className}`} aria-hidden="true">
            {particles}
        </div>
    );
}

export default FloatingParticles;
