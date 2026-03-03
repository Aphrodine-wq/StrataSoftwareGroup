import { useEffect, useRef } from 'react';

/**
 * CursorGlow – renders a subtle, trailing radial glow that follows
 * the cursor across the entire viewport. Adds an ambient, premium feel.
 * Automatically disabled on touch-only devices.
 */
function CursorGlow() {
    const glowRef = useRef(null);
    const pos = useRef({ x: -200, y: -200 });
    const rendered = useRef({ x: -200, y: -200 });
    const raf = useRef(null);
    const visible = useRef(false);

    useEffect(() => {
        /* Skip on touch-only devices */
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const glow = glowRef.current;
        if (!glow) return;

        const tick = () => {
            raf.current = requestAnimationFrame(tick);
            if (document.visibilityState === 'hidden') return;
            rendered.current.x += (pos.current.x - rendered.current.x) * 0.15;
            rendered.current.y += (pos.current.y - rendered.current.y) * 0.15;
            glow.style.transform = `translate(${rendered.current.x}px, ${rendered.current.y}px)`;
        };

        const onMove = (e) => {
            pos.current.x = e.clientX - 200;
            pos.current.y = e.clientY - 200;
            if (!visible.current) {
                visible.current = true;
                glow.style.opacity = '1';
            }
        };

        const onLeave = () => {
            visible.current = false;
            glow.style.opacity = '0';
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        raf.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(180,138,74,0.06) 0%, rgba(180,138,74,0.02) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: 0,
                willChange: 'transform',
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'screen',
            }}
        />
    );
}

export default CursorGlow;
