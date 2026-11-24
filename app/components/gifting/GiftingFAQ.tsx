import { useState } from "react";
import { Link } from "react-router";
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
            aria-label="Frequently Asked Questions About KISSA Perfume Gifts"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">ANSWERS &amp; ADVISORY</span>
                <h2 className="section-title">
                    Frequently Asked Questions About KISSA Perfume Gifts
                </h2>
                <p className="section-desc" style={{ maxWidth: 660, margin: "0 auto" }}>
                    Clear details on what's inside, unisex notes, delivery timelines, and writing your message.
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
                            <h3 style={{ margin: 0 }}>
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
                            </h3>

                            <div
                                id={contentId}
                                role="region"
                                aria-labelledby={buttonId}
                                className={`kissa-faq-content ${isOpen ? "is-open" : ""}`}
                            >
                                <div className="kissa-faq-answer-inner">
                                    <p>
                                        {faq.id === "indian-brand" ? (
                                            <>
                                                Yes. KISSA is a contemporary Indian perfume brand that turns life
                                                chapters into fragrances. NAYA PANNA is Chapter 01, the first fragrance
                                                in its{" "}
                                                <Link to="/shop" className="kissa-inline-link">
                                                    Chapters of Life collection
                                                </Link>
                                                .
                                            </>
                                        ) : (
                                            faq.answer
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
