import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

function Contact() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ visible: false, message: '', isError: false });
  const [submitting, setSubmitting] = useState(false);

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast((t) => ({ ...t, visible: false, message: '' })), 4000);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your project';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const apiUrl = process.env.REACT_APP_CONTACT_API_URL || '/api/contact';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = res.ok ? null : await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || data?.error || `Request failed (${res.status})`);
      }
      setToast({ visible: true, message: "Thanks! We'll be in touch within 24 hours.", isError: false });
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    } catch (err) {
      setToast({
        visible: true,
        message: err.message || 'Something went wrong. Please try again or email us directly.',
        isError: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Toast Notification */}
      <div className={`toast ${toast.visible ? 'toast--visible' : ''} ${toast.isError ? 'toast--error' : ''}`} role="alert">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>{toast.message}</span>
      </div>

      <div className="page-header reveal">
        <h1>Get in Touch</h1>
        <p>Let's talk about your next project</p>
      </div>

      <div className="contact-content">
        {/* Contact Info */}
        <div className="contact-info reveal">
          <h2>Contact Information</h2>
          <p>Reach out through any of these channels and we'll respond within 24 hours.</p>

          <div className="contact-info-items">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="contact-info-label">Email</span>
                <a href="mailto:hello@stratasoftware.com">hello@stratasoftware.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="contact-info-label">Phone</span>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="contact-info-label">Location</span>
                <span>Dallas–Fort Worth, Texas</span>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="contact-map">
            <div className="contact-map-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Dallas–Fort Worth, TX</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form reveal reveal-delay-1" onSubmit={handleSubmit} noValidate>
          <h2>Send a Message</h2>

          <div className="form-row">
            <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget Range</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Select a range</option>
                <option value="5k-10k">$5,000 – $10,000</option>
                <option value="10k-25k">$10,000 – $25,000</option>
                <option value="25k-50k">$25,000 – $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>
          </div>

          <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
            <label htmlFor="message">Project Details *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project, timeline, and goals..."
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            {errors.message && <span id="message-error" className="form-error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-primary contact-submit-btn" disabled={submitting}>
            {submitting ? (
              <>Sending…</>
            ) : (
              <>
                Send Message
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
