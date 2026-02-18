import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './FAQAccordion.css';

const faqs = [
    {
        question: 'How does the AI Receptionist handle legal client calls?',
        answer:
            'Our AI receptionist is trained to handle law firm calls with confidentiality and professionalism. It greets callers, asks screening questions, captures case details, runs basic conflict checks against your criteria, schedules consultations on your calendar, and sends you a detailed transcript and summary — all while maintaining attorney-client confidentiality standards.',
    },
    {
        question: 'Can the AI Receptionist integrate with my insurance CRM?',
        answer:
            'Yes! Our AI receptionist integrates with popular insurance CRMs like Salesforce, HubSpot, Applied Epic, and AMS360. It can log caller details, create new leads, update policy notes, and trigger follow-up workflows automatically. We also support custom integrations via API.',
    },
    {
        question: 'What\'s the difference between After Hours and Full Time AI Receptionist?',
        answer:
            'The After Hours AI Receptionist activates outside your business hours (evenings, weekends, holidays) to capture leads you\'d otherwise miss. The Full Time AI Receptionist handles all inbound calls 24/7 — acting as your complete front desk with intelligent call routing, CRM sync, bilingual support, and overflow handling during busy periods.',
    },
    {
        question: 'How long does setup take?',
        answer:
            'Most AI receptionist setups go live within 3–5 business days. We handle the configuration, script customization, CRM integration, and testing. You provide your preferences, greetings, and scheduling rules, and we take care of the rest.',
    },
    {
        question: 'How long does a typical software project take?',
        answer:
            'Timelines vary based on scope and complexity. A simple web application typically takes 4–8 weeks, while a full-featured platform can take 3–6 months. We provide detailed timelines during our discovery phase.',
    },
    {
        question: 'What technologies do you work with?',
        answer:
            'We specialize in modern stacks including React, Node.js, TypeScript, Python, and cloud services (AWS, GCP). We choose the best tools for each project rather than forcing a one-size-fits-all approach.',
    },
    {
        question: 'Do you provide ongoing support after launch?',
        answer:
            'Absolutely. We offer flexible maintenance and support plans that include bug fixes, feature updates, performance monitoring, and 24/7 emergency support. Your product doesn\'t stop at launch — neither do we.',
    },
    {
        question: 'How does your pricing work?',
        answer:
            'We offer both fixed-price and time-and-materials models. After our discovery workshop, we provide a detailed proposal with transparent pricing. No hidden fees, no surprises. AI receptionist plans are billed monthly with no long-term contracts required.',
    },
];

function FAQAccordion() {
    useScrollReveal();
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-header reveal">
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about our AI receptionists and services</p>
            </div>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item reveal reveal-delay-${Math.min(index + 1, 4)} ${openIndex === index ? 'faq-item--open' : ''
                            }`}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggle(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span>{faq.question}</span>
                            <span className="faq-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" className="faq-icon-vertical" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </span>
                        </button>
                        <div className="faq-answer-wrapper">
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FAQAccordion;
