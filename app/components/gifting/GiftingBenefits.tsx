import { GIFTING_BENEFITS } from "../../lib/gifting";

export function GiftingBenefits() {
    const renderBenefitIcon = (icon: string) => {
        switch (icon) {
            case "seal":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" />
                        <path d="M9 17l3-1 3 1" />
                    </svg>
                );
            case "drop":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                );
            case "shipping":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                );
            case "shield":
            default:
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                );
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="why-gift-kissa"
            aria-label="Why Gift KISSA Benefits"
        >
            <div className="section-header">
                <span className="section-label">THE MAISON PROMISE</span>
                <h2 className="section-title">Why Gift KISSA</h2>
                <p className="section-desc">
                    Every flacon is conceived as an intimate sensory memory — impeccably formulated, respectfully hand-numbered, and delivered with uncompromised discretion. [EDIT]
                </p>
            </div>

            <div className="kissa-benefits-grid">
                {GIFTING_BENEFITS.map((benefit) => (
                    <div key={benefit.id} className="kissa-benefit-card">
                        <div className="kissa-benefit-top">
                            <div className="kissa-benefit-icon-wrap">
                                {renderBenefitIcon(benefit.icon)}
                            </div>
                            <span className="kissa-benefit-num">{benefit.number}</span>
                        </div>

                        <h3 className="kissa-benefit-title">{benefit.title}</h3>
                        <p className="kissa-benefit-desc">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

