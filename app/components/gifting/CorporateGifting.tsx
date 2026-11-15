import { useState, type FormEvent } from "react";
import {
    submitCorporateEnquiry,
    type CorporateEnquiryInput,
} from "../../lib/gifting";

export function CorporateGifting() {
    const [formData, setFormData] = useState<CorporateEnquiryInput>({
        name: "",
        company: "",
        email: "",
        phone: "",
        quantity: "25-50",
        occasion: "festive",
        message: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CorporateEnquiryInput, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverMessage, setServerMessage] = useState("");

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CorporateEnquiryInput, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter your full name.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your corporate or personal email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Please enter your phone / WhatsApp number.";
        } else if (formData.phone.replace(/\D/g, "").length < 8) {
            newErrors.phone = "Please enter a valid phone number with country code.";
        }

        if (!formData.quantity) {
            newErrors.quantity = "Please choose an estimated quantity range.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setServerMessage("");

        try {
            const res = await submitCorporateEnquiry(formData);
            if (res.success) {
                setIsSuccess(true);
                setServerMessage(res.message);
            } else {
                setServerMessage(res.message || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error("Submission failed:", err);
            setServerMessage("Unable to send inquiry at this moment. Please email concierge@kissa-parfums.com");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setIsSuccess(false);
        setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            quantity: "25-50",
            occasion: "festive",
            message: "",
        });
        setErrors({});
    };

    return (
        <section
            className="kissa-gifting-section"
            id="corporate-gifting"
            aria-label="Corporate and Bulk Gifting"
        >
            <div className="kissa-corporate-card">
                <div className="kissa-corporate-split">
                    {/* Left: Pitch & Value Pillars */}
                    <div className="kissa-corporate-pitch">
                        <span className="kissa-corporate-kicker">
                            ✦ BESPOKE CURATION &amp; CORPORATE SUITES
                        </span>

                        <h2 className="kissa-corporate-title">
                            Corporate &amp; Milestone Bulk Gifting [EDIT]
                        </h2>

                        <p className="kissa-corporate-desc">
                            Honor leadership retreats, festive client appreciation, and cherished wedding guests with custom-numbered botanical flacons, bespoke monograms, and direct multi-address dispatch across India. [EDIT]
                        </p>

                        <div className="kissa-corporate-pills">
                            <div className="kissa-corporate-pill-item">
                                <span className="kissa-corporate-pill-check">✓</span>
                                <span>Custom Wax Seal &amp; Atelier Monogramming</span>
                            </div>
                            <div className="kissa-corporate-pill-item">
                                <span className="kissa-corporate-pill-check">✓</span>
                                <span>Multi-Address Pan-India &amp; Global Courier Dispatch</span>
                            </div>
                            <div className="kissa-corporate-pill-item">
                                <span className="kissa-corporate-pill-check">✓</span>
                                <span>Tiered Volume Pricing Starting From 10 Units</span>
                            </div>
                            <div className="kissa-corporate-pill-item">
                                <span className="kissa-corporate-pill-check">✓</span>
                                <span>Dedicated Gifting Concierge Consultation</span>
                            </div>
                        </div>

                        <div className="kissa-corporate-contact-strip">
                            Need immediate concierge assistance? Email{" "}
                            <strong>concierge@kissa-parfums.com</strong> or WhatsApp our atelier concierge directly.
                        </div>
                    </div>

                    {/* Right: Enquiry Form or Success Card */}
                    <div className="kissa-corporate-form">
                        {isSuccess ? (
                            <div className="kissa-corporate-success-card">
                                <div className="kissa-success-icon-badge">✓</div>
                                <h3 className="kissa-success-title">
                                    Inquiry Received [EDIT]
                                </h3>
                                <p className="kissa-success-desc">
                                    Thank you, <strong>{formData.name}</strong>. Your bespoke gifting request for {formData.quantity} flacons has been logged with our concierge desk. We will review your requirements and reach out to <strong>{formData.email}</strong> within 24 business hours with bespoke pricing. [EDIT]
                                </p>
                                <button
                                    type="button"
                                    className="kissa-reset-enquiry-btn"
                                    onClick={handleReset}
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <h3 className="kissa-corporate-form-title">
                                    Request a Curation Quote
                                </h3>
                                <p className="kissa-corporate-form-sub">
                                    Our concierge will prepare tailored pricing and presentation mockups within 24 hours.
                                </p>

                                <div className="kissa-form-grid-2">
                                    {/* Full Name */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-name" className="kissa-form-label">
                                            Full Name <span className="req">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="corp-name"
                                            className={`kissa-input-element ${errors.name ? "has-error" : ""}`}
                                            placeholder="Aarav Mehta"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            aria-required="true"
                                        />
                                        {errors.name && <span className="kissa-field-error">{errors.name}</span>}
                                    </div>

                                    {/* Company Name */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-company" className="kissa-form-label">
                                            Company / Organization
                                        </label>
                                        <input
                                            type="text"
                                            id="corp-company"
                                            className="kissa-input-element"
                                            placeholder="Mehta Capital / Private"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="kissa-form-grid-2">
                                    {/* Work Email */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-email" className="kissa-form-label">
                                            Email Address <span className="req">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="corp-email"
                                            className={`kissa-input-element ${errors.email ? "has-error" : ""}`}
                                            placeholder="aarav@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            aria-required="true"
                                        />
                                        {errors.email && <span className="kissa-field-error">{errors.email}</span>}
                                    </div>

                                    {/* Phone */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-phone" className="kissa-form-label">
                                            Phone / WhatsApp <span className="req">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="corp-phone"
                                            className={`kissa-input-element ${errors.phone ? "has-error" : ""}`}
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            aria-required="true"
                                        />
                                        {errors.phone && <span className="kissa-field-error">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="kissa-form-grid-2">
                                    {/* Estimated Quantity */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-quantity" className="kissa-form-label">
                                            Estimated Quantity <span className="req">*</span>
                                        </label>
                                        <select
                                            id="corp-quantity"
                                            className="kissa-select-element"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        >
                                            <option value="10-25">10 – 25 flacons</option>
                                            <option value="25-50">25 – 50 flacons</option>
                                            <option value="50-100">50 – 100 flacons</option>
                                            <option value="100+">100+ flacons (Custom Edition)</option>
                                        </select>
                                    </div>

                                    {/* Occasion */}
                                    <div className="kissa-form-field">
                                        <label htmlFor="corp-occasion" className="kissa-form-label">
                                            Gifting Occasion
                                        </label>
                                        <select
                                            id="corp-occasion"
                                            className="kissa-select-element"
                                            value={formData.occasion}
                                            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                                        >
                                            <option value="festive">Festive / Diwali / New Year</option>
                                            <option value="summit">Board Retreat / Corporate Summit</option>
                                            <option value="wedding">Wedding Favors &amp; Celebrations</option>
                                            <option value="client">VIP Client Appreciation</option>
                                            <option value="other">Other Bespoke Requirement</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="kissa-form-field">
                                    <label htmlFor="corp-message" className="kissa-form-label">
                                        Bespoke Requirements / Delivery Timeline
                                    </label>
                                    <textarea
                                        id="corp-message"
                                        className="kissa-textarea-element"
                                        placeholder="Tell us about your preferred delivery timeline, custom monogramming requests, or multi-city distribution… [EDIT]"
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                {serverMessage && !isSuccess && (
                                    <div style={{ color: "#B83B26", fontSize: 12, marginBottom: 10 }}>
                                        {serverMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="kissa-corporate-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Submitting Concierge Inquiry…"
                                        : "Submit Corporate Inquiry →"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

