import { useState } from "react";
import { GIFTING_FAQS } from "../../lib/gifting";

export function GiftingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section
            className="kissa-gifting-section"
            id="gifting-faq"
            aria-label="Frequently Asked Questions on Gifting"
        >
            <div className="section-header">
                <span className="section-label">CURATED INQUIRIES &amp; ADVISORY</span>
                <h2 className="section-title">Gifting Advisory &amp; FAQ</h2>
                <p className="section-desc">
                    Important details regarding discrete shipping, handwritten message cards, transit timelines, and corporate rates. [EDIT]
                </p>
            </div>

            <div className="kissa-faq-container">
                {GIFTING_FAQS.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    const contentId = `gifting-faq-answer-${faq.id}`;
                    const buttonId = `gifting-faq-btn-${faq.id}`;

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

