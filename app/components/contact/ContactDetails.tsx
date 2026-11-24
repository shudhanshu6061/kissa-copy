import { useState } from "react";

export function ContactDetails() {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("hello@kissaperfume.in");
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2200);
        } catch {
            // Fallback if clipboard API is restricted
        }
    };

    return (
        <section className="kissa-contact-section" id="contact-details" aria-labelledby="details-heading">
            <div className="kissa-contact-section__header">
                <span className="kissa-contact-section__kicker">DIRECT CORRESPONDENCE</span>
                <h2 id="details-heading" className="kissa-contact-section__title">
                    Get in Touch with KISSA
                </h2>
                <p className="kissa-contact-section__subtitle">
                    Reach our perfume atelier via email, phone, or direct WhatsApp message.
                </p>
            </div>

            <div className="kissa-contact-cards-grid">
                {/* Email Card */}
                <div className="kissa-contact-card">
                    <div className="kissa-contact-card__icon-wrapper" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    <h3 className="kissa-contact-card__heading">Email</h3>

                    <p className="kissa-contact-card__detail">
                        <a
                            href="mailto:hello@kissaperfume.in"
                            className="kissa-contact-card__link"
                            title="Send email to hello@kissaperfume.in"
                        >
                            hello@kissaperfume.in
                        </a>
                        <span className="kissa-contact-card__dot">·</span>
                        <span className="kissa-contact-card__sla">We reply within 24 hours.</span>
                    </p>

                    <div className="kissa-contact-card__actions">
                        <a
                            href="mailto:hello@kissaperfume.in"
                            className="kissa-contact-btn kissa-contact-btn--primary"
                        >
                            Write to Us
                        </a>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="kissa-contact-btn kissa-contact-btn--ghost"
                            aria-label="Copy email address"
                        >
                            {copiedEmail ? "Copied ✓" : "Copy Email"}
                        </button>
                    </div>
                </div>

                {/* WhatsApp & Phone Card */}
                <div className="kissa-contact-card">
                    <div className="kissa-contact-card__icon-wrapper" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>

                    <h3 className="kissa-contact-card__heading">WhatsApp and Phone</h3>

                    <p className="kissa-contact-card__detail">
                        <a
                            href="tel:+917607090101"
                            className="kissa-contact-card__link"
                            title="Call KISSA customer care"
                        >
                            +91 7607090101
                        </a>
                        <span className="kissa-contact-card__dot">·</span>
                        <span className="kissa-contact-card__sla">Mon – Sat, 10 am – 6 pm IST</span>
                    </p>

                    <div className="kissa-contact-card__actions">
                        <a
                            href="https://wa.me/917607090101?text=Hello%20KISSA%2C%20I%20have%20an%20inquiry%20regarding%20fragrance%20or%20an%20order."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kissa-contact-btn kissa-contact-btn--whatsapp"
                        >
                            WhatsApp Chat
                        </a>
                        <a
                            href="tel:+917607090101"
                            className="kissa-contact-btn kissa-contact-btn--ghost"
                        >
                            Call Us
                        </a>
                    </div>
                </div>

                {/* Registered Address Card */}
                <div className="kissa-contact-card">
                    <div className="kissa-contact-card__icon-wrapper" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>

                    <h3 className="kissa-contact-card__heading">Registered Address</h3>

                    <p className="kissa-contact-card__detail kissa-contact-card__detail--address">
                        <span>KISSA, Mirzapur, Uttar Pardesh, 231001</span>
                    </p>

                    <div className="kissa-contact-card__badge-note">
                        <span className="kissa-contact-card__badge">Flagship Atelier &amp; Dispatch</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactDetails;
