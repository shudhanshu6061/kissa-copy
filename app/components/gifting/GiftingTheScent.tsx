import { Link } from "react-router";
import { SCENT_TIERS } from "../../lib/gifting";

export function GiftingTheScent() {
    return (
        <section
            className="kissa-gifting-section"
            id="the-scent"
            aria-label="NAYA PANNA: What a New Beginning Smells Like"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">THE OLFACTORY PROFILE</span>
                <h2 className="section-title">
                    <Link to="/shop" className="kissa-title-link">
                        NAYA PANNA
                    </Link>
                    : What a New Beginning Smells Like
                </h2>
                <p className="section-desc" style={{ maxWidth: 740, margin: "0 auto 32px" }}>
                    A bright opening. A softer heart. A warm feeling that stays close.{" "}
                    <Link to="/shop" className="kissa-inline-link">
                        NAYA PANNA
                    </Link>{" "}
                    is built around three signature notes: cardamom, white tea and sandalwood.
                    It's fresh without being sharp, and warm without being heavy.
                </p>
            </div>

            {/* Notes Visual Banner with Required Alt Text */}
            <div className="kissa-scent-hero-strip">
                <div className="kissa-scent-visual-wrap">
                    <img
                        src="/landing-pages/meng-to-sketchbook/bloom.png"
                        alt="NAYA PANNA fragrance notes: cardamom, white tea and sandalwood"
                        className="kissa-scent-banner-img"
                        loading="lazy"
                        width="1100"
                        height="300"
                    />
                    <div className="kissa-scent-overlay-card">
                        <div>
                            <span className="kissa-scent-overlay-tag">THREE SIGNATURE ACCORDS</span>
                            <div className="kissa-signature-pills">
                                <span>Cardamom</span>
                                <span className="kissa-sig-sep">·</span>
                                <span>White Tea</span>
                                <span className="kissa-sig-sep">·</span>
                                <span>Sandalwood</span>
                            </div>
                        </div>
                        <Link to="/shop" className="hero-btn-secondary" style={{ padding: "8px 18px", fontSize: "11px" }}>
                            Explore Scent Details →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Fragrance Pyramid Tiers */}
            <div className="kissa-scent-pyramid-grid">
                {SCENT_TIERS.map((tier) => (
                    <div key={tier.name} className="kissa-scent-tier-card">
                        <div className="kissa-tier-header">
                            <span className="kissa-tier-badge">{tier.name}</span>
                            <span className="kissa-tier-icon">✦</span>
                        </div>

                        <h3 className="kissa-tier-title">
                            {tier.name}: {tier.subtitle}
                        </h3>

                        <p className="kissa-tier-desc">{tier.summary}</p>

                        <div className="kissa-note-chips">
                            {tier.notes.map((note) => (
                                <span key={note} className="kissa-note-chip">
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Who Will Love NAYA PANNA? */}
            <div className="kissa-who-loves-card">
                <span className="kissa-who-badge">FOR INTENTIONAL NOSES</span>
                <h3 className="kissa-who-title">Who Will Love NAYA PANNA?</h3>
                <p className="kissa-who-desc">
                    Anyone who likes clean, fresh fragrances with a little warmth underneath,
                    and anyone who prefers a scent that feels personal rather than loud.
                </p>
            </div>
        </section>
    );
}
