import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTemplateById } from '../data/websiteTemplates';
import useScrollReveal from '../hooks/useScrollReveal';
import './CheckoutResult.css';

function CheckoutSuccess() {
    useScrollReveal();
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template');
    const template = templateId ? getTemplateById(templateId) : null;

    return (
        <div className="checkout-result">
            <div className="checkout-result-card reveal">
                <div className="checkout-result-icon checkout-result-icon--success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1>Payment Successful!</h1>
                <p className="checkout-result-subtitle">
                    Thank you for your purchase
                    {template ? ` of the ${template.name} template` : ''}.
                </p>

                <div className="checkout-result-details">
                    <p>
                        A confirmation email with download instructions will be sent to your email shortly.
                        If you don't receive it within a few minutes, please check your spam folder or
                        contact us.
                    </p>
                </div>

                <div className="checkout-result-actions">
                    <Link to="/templates" className="btn-secondary">
                        Browse More Templates
                    </Link>
                    <Link to="/contact" className="btn-primary">
                        Contact Support <span className="btn-arrow">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
