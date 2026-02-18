import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { getTemplateById } from '../data/websiteTemplates';
import './TemplateCheckout.css';

const baseUrl = process.env.PUBLIC_URL || '';

function TemplateCheckout() {
    useScrollReveal();
    const { id } = useParams();
    const template = id ? getTemplateById(id) : null;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!template) {
        return (
            <div className="checkout checkout--not-found">
                <div className="checkout-message">
                    <h1>Template not found</h1>
                    <p>The template you requested could not be found.</p>
                    <Link to="/templates" className="btn-primary">
                        Back to Templates
                    </Link>
                </div>
            </div>
        );
    }

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId: template.id,
                    templateName: template.name,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            /* Redirect to Stripe's hosted checkout */
            window.location.href = data.url;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const iframeSrc = baseUrl + template.previewUrl;

    return (
        <div className="checkout">
            <div className="page-header reveal">
                <h1>Checkout</h1>
                <p>Complete your purchase</p>
            </div>

            <div className="checkout-content">
                {/* Left: Template Preview */}
                <div className="checkout-preview reveal">
                    <div
                        className="checkout-preview-header"
                        style={{ background: template.gradient }}
                    >
                        <span className="checkout-preview-tag">{template.previewTag}</span>
                        {template.badge && (
                            <span className="checkout-preview-badge">{template.badge}</span>
                        )}
                    </div>
                    <div className="checkout-iframe-wrap">
                        <iframe
                            title={`Preview of ${template.name}`}
                            src={iframeSrc}
                            className="checkout-iframe"
                        />
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="checkout-summary reveal reveal-delay-1">
                    <div className="checkout-summary-card">
                        <h2 className="checkout-summary-title">Order Summary</h2>

                        <div className="checkout-item">
                            <div className="checkout-item-info">
                                <h3>{template.name} Template</h3>
                                <span className="checkout-item-category">{template.category}</span>
                            </div>
                            <span className="checkout-item-price">
                                ${template.price}
                            </span>
                        </div>

                        <p className="checkout-item-description">{template.description}</p>

                        <ul className="checkout-features">
                            {template.features.map((feat, i) => (
                                <li key={i}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div className="checkout-divider" />

                        <div className="checkout-total">
                            <span>Total</span>
                            <span className="checkout-total-price">${template.price}</span>
                        </div>

                        {error && (
                            <div className="checkout-error">
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            className="btn-primary checkout-pay-btn"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="checkout-spinner" />
                                    Processing…
                                </>
                            ) : (
                                <>
                                    Pay with Stripe <span className="btn-arrow">→</span>
                                </>
                            )}
                        </button>

                        <div className="checkout-trust">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>Secure checkout powered by Stripe. Your payment info never touches our servers.</span>
                        </div>

                        <div className="checkout-includes">
                            <h4>What's included</h4>
                            <ul>
                                <li>Full source code (HTML, CSS, JS)</li>
                                <li>Commercial license — use on any project</li>
                                <li>Free updates for 1 year</li>
                                <li>Email support</li>
                            </ul>
                        </div>
                    </div>

                    <Link to="/templates" className="checkout-back">
                        ← Back to Templates
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TemplateCheckout;
