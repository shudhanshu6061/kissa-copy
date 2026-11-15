import { useState } from "react";
import type { FAQItem } from "../../lib/products";

export function ProductFAQ({ faqs }: { faqs: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="kissa-faq-section" id="faq" aria-label="Frequently Asked Questions">
            <div className="section-header">
                <span className="section-label">CURATED INQUIRIES &amp; ADVISORY</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-desc">
                    Clarity on our botanical formulations, olfactory performance, shipping logistics, and discovery guarantees. [EDIT]
                </p>
            </div>

            <div className="kissa-faq-container">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    const contentId = `faq-answer-${faq.id}`;
                    const buttonId = `faq-btn-${faq.id}`;

                    return (
                        <div
                            key={faq.id}
                            className={`kissa-faq-item ${isOpen ? "is-open" : ""}`}
                        >
                            <button
                                type="button"
                                id={buttonId}
                                className="kissa-faq-trigger"
                                aria-expanded={isOpen}
                                aria-controls={contentId}
                                onClick={() => toggle(idx)}
                            >
                                <span className="kissa-faq-question">{faq.question}</span>
                                <span className="kissa-faq-icon" aria-hidden="true">
                                    {isOpen ? "−" : "+"}
                                </span>
                            </button>

                            <div
                                id={contentId}
                                role="region"
                                aria-labelledby={buttonId}
                                className={`kissa-faq-content ${isOpen ? "is-open" : ""}`}
                            >
                                <div className="kissa-faq-answer-inner">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

