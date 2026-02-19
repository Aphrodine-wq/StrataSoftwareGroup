import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on every route change, triggers a page-enter animation,
 * and moves focus to main content for accessibility.
 */
function PageTransition() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        const main = document.querySelector('.main-content');
        if (!main) return;

        main.classList.remove('page-entered');
        main.classList.add('page-entering');

        // Use rAF to ensure the browser painted the 'entering' state
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                main.classList.remove('page-entering');
                main.classList.add('page-entered');
                // Focus main for screen readers on route change
                if (typeof main.focus === 'function') main.focus({ preventScroll: true });
            });
        });
    }, [location.pathname]);

    return null;
}

export default PageTransition;
