import React, { useRef, useCallback } from 'react';

/**
 * Wrapper component that adds 3D tilt perspective to its children.
 * Renders a div with mouse-tracked 3D transform. Throttled to rAF for smooth 60fps.
 */
function Tilt3DCard({ children, className = '', maxTilt = 8, scale = 1.02, speed = 400, ...props }) {
    const cardRef = useRef(null);
    const rafRef = useRef(null);
    const pendingRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        pendingRef.current = e;
        if (rafRef.current != null) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            const ev = pendingRef.current;
            if (!ev) return;
            const el = cardRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
            el.style.transition = 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.setProperty('--glare-x', `${percentX}%`);
            el.style.setProperty('--glare-y', `${percentY}%`);
        });
    }, [maxTilt, scale]);

    const handleMouseLeave = useCallback(() => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = `transform ${speed}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        el.style.setProperty('--glare-x', '50%');
        el.style.setProperty('--glare-y', '50%');
    }, [speed]);

    return (
        <div
            ref={cardRef}
            className={`tilt-3d ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
            {/* Light glare overlay */}
            <div className="tilt-3d-glare" aria-hidden="true" />
        </div>
    );
}

export default Tilt3DCard;
