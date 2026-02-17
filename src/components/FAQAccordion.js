import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './FAQAccordion.css';

const faqs = [
    {
        question: 'How long does a typical project take?',
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
            'We offer both fixed-price and time-and-materials models. After our discovery workshop, we provide a detailed proposal with transparent pricing. No hidden fees, no surprises.',
    },
    {
        question: 'Can you work with our existing team?',
        answer:
            'Yes! We frequently embed with client engineering teams for augmentation, mentoring, and collaborative development. We adapt to your workflows, tools, and processes.',
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
                <p>Everything you need to know before getting started</p>
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
