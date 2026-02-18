import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Strata Software Group" className="nav-logo-img" />
        </Link>

        <button
          className={`nav-toggle ${isOpen ? 'nav-toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isOpen && (
          <div
            className="nav-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className={`nav-menu ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
          {/* Drawer header — logo + close button */}
          <div className="nav-menu-header">
            <Link to="/" className="nav-menu-logo" onClick={() => setIsOpen(false)}>
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Strata Software Group" className="nav-logo-img" />
            </Link>
            <button
              className="nav-menu-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={`nav-link ${isActive('/products')}`}>Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/portfolio" className={`nav-link ${isActive('/portfolio')}`}>Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link to="/templates" className={`nav-link ${isActive('/templates')}`}>Templates</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
            </li>
            <li className="nav-item nav-item--cta">
              <Link to="/contact" className={`nav-link nav-contact-btn ${isActive('/contact')}`}>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Drawer footer */}
          <div className="nav-menu-footer">
            <span className="nav-menu-tagline">Crafting Digital Excellence</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
