import { useState } from "react";

export interface FAQItem {
    id: string;
    question: string;
    answer: React.ReactNode;
}

const FAQS_LIST: FAQItem[] = [
    {
        id: "faq-contact-care",
        question: "How do I contact KISSA customer care?",
        answer: (
            <>
                Email{" "}
                <a href="mailto:hello@kissa.in" className="kissa-faq-link">
                    hello@kissa.in
                </a>{" "}
                or WhatsApp{" "}
                <a
                    href="https://wa.me/917607090101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kissa-faq-link"
                >
                    +91 7607090101
                </a>
                , Monday to Saturday, 10 am to 6 pm IST.
            </>
        ),
    },
    {
        id: "faq-reply-time",
        question: "How quickly will KISSA reply?",
        answer: "We usually reply within 24 hours on working days.",
    },
    {
        id: "faq-track-order",
        question: "How can I track my order?",
        answer: "Use the tracking link in your shipping email or message, or contact us with your order number.",
    },
    {
        id: "faq-corporate-gifting",
        question: "Does KISSA take corporate gifting orders?",
        answer: (
            <>
                Yes. Write to{" "}
                <a href="mailto:partners@kissa.in" className="kissa-faq-link">
                    partners@kissa.in
                </a>{" "}
                with the quantity and your timeline.
            </>
        ),
    },
];

export function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="kissa-contact-section" id="faq" aria-labelledby="faq-heading">
            <div className="kissa-contact-section__header">
                <span className="kissa-contact-section__kicker">HELP &amp; RESOLUTIONS</span>
                <h2 id="faq-heading" className="kissa-contact-section__title">
                    Quick Answers
                </h2>
                <p className="kissa-contact-section__subtitle">
                    Frequently requested information about communication, shipping, and bespoke orders.
                </p>
            </div>

            <div className="kissa-faq-container kissa-contact-faq-container">
                {FAQS_LIST.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    const contentId = `contact-faq-answer-${faq.id}`;
                    const buttonId = `contact-faq-btn-${faq.id}`;

                    return (
                        <div
                            key={faq.id}
                            className={`kissa-faq-item ${isOpen ? "is-open" : ""}`}
                        >
                            <h3 className="kissa-faq-h3">
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

export default ContactFAQ;
