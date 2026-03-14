import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTemplateById } from '../data/websiteTemplates';
import useScrollReveal from '../hooks/useScrollReveal';
import './CheckoutResult.css';

function CheckoutSuccess() {
    useScrollReveal();
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template');
    const sessionId = searchParams.get('session_id');
    const template = templateId ? getTemplateById(templateId) : null;
    const [verified, setVerified] = useState(null); // null = loading, true/false = result

    useEffect(() => {
        if (!sessionId) {
            /* No session ID in URL — still show success but skip verification */
            setVerified(true);
            return;
        }

        let cancelled = false;

        async function verifySession() {
            try {
                const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
                const data = await res.json();
                if (!cancelled) {
                    setVerified(data.paid === true);
                }
            } catch {
                /* If verification fails, still show success — Stripe already redirected here */
                if (!cancelled) setVerified(true);
            }
        }

        verifySession();
        return () => { cancelled = true; };
    }, [sessionId]);

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

                {template && (
                    <div className="checkout-result-order">
                        <div className="checkout-result-order-item">
                            <span>{template.name} Template</span>
                            <span>${template.price}</span>
                        </div>
                    </div>
                )}

                <div className="checkout-result-details">
                    <p>
                        A confirmation email with download instructions will be sent to your email shortly.
                        If you don't receive it within a few minutes, please check your spam folder or
                        contact us at{' '}
                        <a href="mailto:support@stratasoftwaregroup.com">support@stratasoftwaregroup.com</a>.
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
