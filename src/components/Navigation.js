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

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className={`nav-link ${isActive('/products')}`}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className={`nav-link ${isActive('/portfolio')}`}>
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/templates" className={`nav-link ${isActive('/templates')}`}>
              Templates
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
          </li>
          <li className="nav-item nav-item--cta">
            <Link to="/contact" className={`nav-link nav-contact-btn ${isActive('/contact')}`}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
