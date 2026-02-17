import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on every route change + triggers a page-enter animation
 * by toggling a class on the main content element.
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
            });
        });
    }, [location.pathname]);

    return null;
}

export default PageTransition;
