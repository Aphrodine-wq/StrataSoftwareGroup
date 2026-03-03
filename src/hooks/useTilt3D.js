import { useRef, useCallback } from 'react';

/**
 * Hook that adds 3D tilt perspective effect to a card on mouse move.
 * Returns a ref and mouse handlers to attach to the element.
 *
 * Usage:
 *   const { ref, handlers } = useTilt3D();
 *   <div ref={ref} {...handlers}> ... </div>
 */
export default function useTilt3D({ maxTilt = 8, scale = 1.02, speed = 400 } = {}) {
    const ref = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        // Highlight position for the glare
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.transition = `transform ${speed * 0.1}ms ease`;
        el.style.setProperty('--glare-x', `${percentX}%`);
        el.style.setProperty('--glare-y', `${percentY}%`);
    }, [maxTilt, scale, speed]);

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = `transform ${speed}ms ease`;
        el.style.setProperty('--glare-x', '50%');
        el.style.setProperty('--glare-y', '50%');
    }, [speed]);

    return {
        ref,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
        },
    };
}
