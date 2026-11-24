import type { ContactTopic } from "./ContactForm";

export interface HelpTopicsProps {
    onSelectTopic?: (topic: ContactTopic) => void;
}

export function HelpTopics({ onSelectTopic }: HelpTopicsProps) {
    const handleTopicClick = (topic: ContactTopic) => {
        if (onSelectTopic) {
            onSelectTopic(topic);
        }
        const formEl = document.getElementById("contact-form");
        if (formEl) {
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="kissa-contact-section" id="help-topics" aria-labelledby="help-heading">
            <div className="kissa-contact-section__header">
                <span className="kissa-contact-section__kicker">SPECIALIZED ASSISTANCE</span>
                <h2 id="help-heading" className="kissa-contact-section__title">
                    How Can We Help?
                </h2>
                <p className="kissa-contact-section__subtitle">
                    Select your area of inquiry for dedicated concierge guidance.
                </p>
            </div>

            <div className="kissa-contact-topics-grid">
                {/* 1. Orders and Delivery */}
                <div className="kissa-topic-card">
                    <div className="kissa-topic-card__icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="m3 9 9 6 9-6" />
                            <path d="M12 15v6" />
                        </svg>
                    </div>

                    <h3 className="kissa-topic-card__title">Orders and Delivery</h3>

                    <p className="kissa-topic-card__desc">
                        Tracking, delays or a damaged book? Share your order number and we&apos;ll sort it out.
                    </p>

                    <button
                        type="button"
                        onClick={() => handleTopicClick("Order and delivery")}
                        className="kissa-topic-card__action"
                    >
                        <span>Inquire About Order</span>
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* 2. Gifting Help */}
                <div className="kissa-topic-card">
                    <div className="kissa-topic-card__icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="8" width="18" height="13" rx="2" />
                            <path d="M12 8v13" />
                            <path d="M19 12H5" />
                            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                        </svg>
                    </div>

                    <h3 className="kissa-topic-card__title">Gifting Help</h3>

                    <p className="kissa-topic-card__desc">
                        Not sure if NAYA PANNA is right for someone? Tell us about the occasion and we&apos;ll help you decide.
                    </p>

                    <button
                        type="button"
                        onClick={() => handleTopicClick("Gifting")}
                        className="kissa-topic-card__action"
                    >
                        <span>Ask Gifting Concierge</span>
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* 3. Fragrance Questions */}
                <div className="kissa-topic-card">
                    <div className="kissa-topic-card__icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 2.5 4.5 9.5 4.5 9.5s4.5-7 4.5-9.5A4.5 4.5 0 0 0 12 2Z" />
                            <path d="M12 16v6" />
                            <path d="M8 22h8" />
                        </svg>
                    </div>

                    <h3 className="kissa-topic-card__title">Fragrance Questions</h3>

                    <p className="kissa-topic-card__desc">
                        Ask us anything about the notes, how it wears or how to use it.
                    </p>

                    <button
                        type="button"
                        onClick={() => handleTopicClick("Fragrance question")}
                        className="kissa-topic-card__action"
                    >
                        <span>Explore Olfactory Advice</span>
                        <span aria-hidden="true">→</span>
                    </button>
                </div>

                {/* 4. Collaborations and Bulk Orders */}
                <div className="kissa-topic-card">
                    <div className="kissa-topic-card__icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>

                    <h3 className="kissa-topic-card__title">Collaborations and Bulk Orders</h3>

                    <p className="kissa-topic-card__desc">
                        For corporate gifting, creators and partnerships, write to{" "}
                        <a
                            href="mailto:partners@kissa.in"
                            className="kissa-topic-card__inline-link"
                        >
                            partners@kissa.in
                        </a>
                        .
                    </p>

                    <a
                        href="mailto:partners@kissa.in?subject=Partnership%20/%20Bulk%20Order%20Inquiry"
                        className="kissa-topic-card__action"
                    >
                        <span>Write to partners@kissa.in</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HelpTopics;
