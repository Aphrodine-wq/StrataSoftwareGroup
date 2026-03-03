import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTemplateById } from '../data/websiteTemplates';
import useScrollReveal from '../hooks/useScrollReveal';
import './CheckoutResult.css';

function CheckoutCancel() {
    useScrollReveal();
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template');
    const template = templateId ? getTemplateById(templateId) : null;

    return (
        <div className="checkout-result">
            <div className="checkout-result-card reveal">
                <div className="checkout-result-icon checkout-result-icon--cancel">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>

                <h1>Payment Cancelled</h1>
                <p className="checkout-result-subtitle">
                    No worries — your payment was not processed.
                </p>

                <div className="checkout-result-details">
                    <p>
                        You can return to the checkout page to complete your purchase, or browse
                        other templates.
                    </p>
                </div>

                <div className="checkout-result-actions">
                    {template && (
                        <Link to={`/templates/checkout/${template.id}`} className="btn-primary">
                            Try Again <span className="btn-arrow">→</span>
                        </Link>
                    )}
                    <Link to="/templates" className="btn-secondary">
                        Browse Templates
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CheckoutCancel;
