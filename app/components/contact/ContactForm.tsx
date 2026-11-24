import { useState, type FormEvent } from "react";

export type ContactTopic =
    | "Order and delivery"
    | "Gifting"
    | "Fragrance question"
    | "Collaboration"
    | "Other";

export const TOPIC_OPTIONS: ContactTopic[] = [
    "Order and delivery",
    "Gifting",
    "Fragrance question",
    "Collaboration",
    "Other",
];

export interface ContactFormProps {
    initialTopic?: ContactTopic;
    selectedTopic?: ContactTopic;
    onTopicSelect?: (topic: ContactTopic) => void;
}

export function ContactForm({
    initialTopic = "Order and delivery",
    selectedTopic: controlledTopic,
    onTopicSelect,
}: ContactFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [localTopic, setLocalTopic] = useState<ContactTopic>(initialTopic);
    const [message, setMessage] = useState("");

    const activeTopic = controlledTopic !== undefined ? controlledTopic : localTopic;

    const handleTopicChange = (topic: ContactTopic) => {
        setLocalTopic(topic);
        if (onTopicSelect) {
            onTopicSelect(topic);
        }
    };

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const nextErrors: typeof errors = {};

        if (!name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!email.trim()) {
            nextErrors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!message.trim()) {
            nextErrors.message = "Please write your message.";
        } else if (message.trim().length < 6) {
            nextErrors.message = "Message must be at least 6 characters long.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Emulate asynchronous submission with network resilience
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsSuccess(true);
        } catch (err) {
            console.error("Failed to deliver message:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setName("");
        setEmail("");
        setPhone("");
        setOrderNumber("");
        setMessage("");
        setLocalTopic("Order and delivery");
        setErrors({});
        setIsSuccess(false);
    };

    return (
        <section
            className="kissa-contact-section kissa-contact-section--form"
            id="contact-form"
            aria-labelledby="form-heading"
        >
            <div className="kissa-contact-card kissa-contact-form-container">
                <div className="kissa-contact-section__header" style={{ marginBottom: 28 }}>
                    <span className="kissa-contact-section__kicker">SEND US A NOTE</span>
                    <h2 id="form-heading" className="kissa-contact-section__title">
                        Send Us a Message
                    </h2>
                    <p className="kissa-contact-section__subtitle">
                        Tell us a little, and we&apos;ll get back to you soon.
                    </p>
                </div>

                {isSuccess ? (
                    <div className="kissa-contact-success-box" role="status" aria-live="polite">
                        <div className="kissa-contact-success-icon" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <h3 className="kissa-contact-success-title">Message Delivered</h3>
                        <p className="kissa-contact-success-message">
                            Thank you. Your message is on its way, and we&apos;ll reply within 24 hours.
                        </p>
                        <p className="kissa-contact-success-details">
                            A confirmation copy and thread ticket will be routed to <strong>{email}</strong>.
                        </p>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="kissa-contact-btn kissa-contact-btn--primary"
                            style={{ marginTop: 20 }}
                        >
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="kissa-contact-form">
                        {/* Name & Email Fields */}
                        <div className="kissa-contact-form__grid">
                            <div className="kissa-contact-field">
                                <label htmlFor="contact-name" className="kissa-contact-label">
                                    Name <span className="kissa-contact-req" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    className={`kissa-contact-input ${errors.name ? "is-invalid" : ""}`}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <span id="name-error" className="kissa-contact-error">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className="kissa-contact-field">
                                <label htmlFor="contact-email" className="kissa-contact-label">
                                    Email <span className="kissa-contact-req" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@domain.com"
                                    className={`kissa-contact-input ${errors.email ? "is-invalid" : ""}`}
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <span id="email-error" className="kissa-contact-error">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Phone & Order Number Fields */}
                        <div className="kissa-contact-form__grid">
                            <div className="kissa-contact-field">
                                <label htmlFor="contact-phone" className="kissa-contact-label">
                                    Phone <span className="kissa-contact-opt">(optional)</span>
                                </label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    name="phone"
                                    autoComplete="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="kissa-contact-input"
                                />
                            </div>

                            <div className="kissa-contact-field">
                                <label htmlFor="contact-order" className="kissa-contact-label">
                                    Order number <span className="kissa-contact-opt">(optional)</span>
                                </label>
                                <input
                                    id="contact-order"
                                    type="text"
                                    name="orderNumber"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder="#KISSA-1042"
                                    className="kissa-contact-input"
                                />
                            </div>
                        </div>

                        {/* Topic Selector */}
                        <fieldset className="kissa-contact-field kissa-contact-field--topics">
                            <legend className="kissa-contact-label">
                                Topic: <span className="kissa-contact-chosen-topic">{activeTopic}</span>
                            </legend>

                            <div className="kissa-contact-topics-pills" role="radiogroup" aria-label="Inquiry Topic">
                                {TOPIC_OPTIONS.map((topic) => {
                                    const isSelected = activeTopic === topic;
                                    return (
                                        <button
                                            type="button"
                                            key={topic}
                                            role="radio"
                                            aria-checked={isSelected}
                                            onClick={() => handleTopicChange(topic)}
                                            className={`kissa-contact-topic-pill ${isSelected ? "is-active" : ""}`}
                                        >
                                            <span className="kissa-contact-topic-radio" aria-hidden="true">
                                                {isSelected ? "●" : "○"}
                                            </span>
                                            {topic}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {/* Message Field */}
                        <div className="kissa-contact-field">
                            <label htmlFor="contact-message" className="kissa-contact-label">
                                Message <span className="kissa-contact-req" aria-hidden="true">*</span>
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={4}
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us about your inquiry, notes question, or order details..."
                                className={`kissa-contact-textarea ${errors.message ? "is-invalid" : ""}`}
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={errors.message ? "message-error" : undefined}
                            />
                            {errors.message && (
                                <span id="message-error" className="kissa-contact-error">
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="kissa-contact-submit-row">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="kissa-contact-btn kissa-contact-btn--submit"
                            >
                                {isSubmitting ? (
                                    <span>Sending Message...</span>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <span className="kissa-contact-btn__arrow" aria-hidden="true">→</span>
                                    </>
                                )}
                            </button>
                            <span className="kissa-contact-submit-hint">
                                Typical response time: within 24 hours on working days.
                            </span>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}

export default ContactForm;
