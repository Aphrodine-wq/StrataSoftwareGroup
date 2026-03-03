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
                            Custom software development, AI-powered tools,
                            game development, and web applications.
                            Dallas-Fort Worth, TX.
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
                            <li><Link to="/services">Custom Software</Link></li>
                            <li><Link to="/services">Mobile Apps</Link></li>
                            <li><Link to="/services">UI/UX Design</Link></li>
                            <li><Link to="/services">Cloud & DevOps</Link></li>
                            <li><Link to="/services">Technical Consulting</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-links-col">
                        <h4>Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="footer-contact-icon">✉</span>
                                hello@stratasoftware.com
                            </li>
                            <li>
                                <span className="footer-contact-icon">⌖</span>
                                Dallas–Fort Worth, TX
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
                        <Link to="/contact">Privacy</Link>
                        <span className="footer-dot">·</span>
                        <Link to="/contact">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
