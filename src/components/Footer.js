import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-glow" aria-hidden="true"></div>
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Strata Software Group" className="footer-logo-img" />
                        </Link>
                        <p className="footer-tagline">
                            Building tomorrow's solutions today. We craft innovative software
                            that empowers businesses to thrive in the digital age.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-links-col">
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/services">Custom Development</Link></li>
                            <li><Link to="/services">Web Applications</Link></li>
                            <li><Link to="/services">Mobile Apps</Link></li>
                            <li><Link to="/services">UI/UX Design</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-links-col">
                        <h4>Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="footer-contact-icon">✉</span>
                                info@stratasoftwaregroup.com
                            </li>
                            <li>
                                <span className="footer-contact-icon">☎</span>
                                +1 (555) 123-4567
                            </li>
                            <li>
                                <span className="footer-contact-icon">⌖</span>
                                San Francisco, CA
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Strata Software Group. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <Link to="/contact">Contact</Link>
                        <span className="footer-dot">·</span>
                        <a href="#privacy">Privacy</a>
                        <span className="footer-dot">·</span>
                        <a href="#terms">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
