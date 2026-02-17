import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouch(true);
            return;
        }

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        // Smooth ring follow
        function animate() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            requestAnimationFrame(animate);
        }

        // Scale ring on interactive elements
        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, textarea, select, .tilt-3d');
            if (target) {
                ring.classList.add('cursor-ring--hover');
                dot.classList.add('cursor-dot--hover');
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, textarea, select, .tilt-3d');
            if (target) {
                ring.classList.remove('cursor-ring--hover');
                dot.classList.remove('cursor-dot--hover');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        const raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(raf);
        };
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}

export default CustomCursor;
