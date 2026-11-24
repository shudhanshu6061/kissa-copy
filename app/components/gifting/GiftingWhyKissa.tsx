import { Link } from "react-router";
import { WHY_KISSA_PILLARS } from "../../lib/gifting";

export function GiftingWhyKissa() {
    const renderPillarIcon = (id: string) => {
        switch (id) {
            case "courage":
                return (
                    <svg className="kissa-pillar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                );
            case "connection":
                return (
                    <svg className="kissa-pillar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                );
            case "memory":
            default:
                return (
                    <svg className="kissa-pillar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="why-kissa"
            aria-label="Why KISSA Is Not Just Another Perfume Gift"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">THE KISSA PHILOSOPHY</span>
                <h2 className="section-title">
                    Why KISSA Is Not Just Another Perfume Gift
                </h2>
                <p className="section-desc" style={{ maxWidth: 740, margin: "0 auto" }}>
                    Most perfume gifts get unwrapped in five seconds, and the moment is over.
                    We wanted the opening to mean something. With KISSA, the person you love
                    reads a little story first, finds your words in your own handwriting, and only
                    then discovers the bottle. By the time they spray it, the scent is already tied
                    to a feeling.
                </p>
            </div>

            <div className="kissa-pillars-grid">
                {WHY_KISSA_PILLARS.map((pillar) => (
                    <div key={pillar.id} className="kissa-pillar-card">
                        <div className="kissa-pillar-header">
                            <span className="kissa-pillar-num">{pillar.number}</span>
                            <div className="kissa-pillar-icon-wrap">
                                {renderPillarIcon(pillar.id)}
                            </div>
                        </div>

                        <h3 className="kissa-pillar-title">{pillar.title}</h3>
                        <p className="kissa-pillar-desc">{pillar.description}</p>
                    </div>
                ))}
            </div>

            <div className="kissa-why-footer-link">
                <Link to="/about" className="kissa-editorial-link">
                    <span>Read Our Story &amp; Why KISSA Exists</span>
                    <span className="kissa-link-arrow">→</span>
                </Link>
            </div>
        </section>
    );
}
