export interface TrustBadge {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export function TrustStrip({ badges }: { badges?: TrustBadge[] }) {
    const items = badges || [
        {
            id: "shipping",
            title: "Free Express Shipping",
            description: "2–4 business days across India via insured courier.",
            icon: "shipping",
        },
        {
            id: "cod",
            title: "Cash on Delivery",
            description: "Available across 19,000+ Indian postal codes.",
            icon: "cod",
        },
        {
            id: "sample",
            title: "14-Day Discovery Guarantee",
            description: "Sample the included 2ml vial before unwrapping the flacon.",
            icon: "sample",
        },
        {
            id: "secure",
            title: "100% Secure Checkout",
            description: "256-bit encryption via UPI, NetBanking, Cards & EMI.",
            icon: "secure",
        },
    ];

    const renderIcon = (type: string) => {
        switch (type) {
            case "shipping":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                );
            case "cod":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                        <path d="M6 15h2" />
                        <path d="M10 15h4" />
                    </svg>
                );
            case "sample":
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                );
            case "secure":
            default:
                return (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="16" r="1" />
                    </svg>
                );
        }
    };

    return (
        <section className="kissa-trust-section" aria-label="Customer Commitments & Guarantees">
            <div className="kissa-trust-grid">
                {items.map((item) => (
                    <div key={item.id} className="kissa-trust-card">
                        <div className="kissa-trust-icon-box" aria-hidden="true">
                            {renderIcon(item.icon)}
                        </div>
                        <div className="kissa-trust-content">
                            <h4 className="kissa-trust-title">{item.title}</h4>
                            <p className="kissa-trust-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

