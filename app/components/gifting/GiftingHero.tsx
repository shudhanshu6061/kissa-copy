import { Link } from "react-router";

export interface GiftingHeroProps {
    onShopGiftsClick?: () => void;
    onCorporateClick?: () => void;
}

export function GiftingHero({
    onShopGiftsClick,
    onCorporateClick,
}: GiftingHeroProps) {
    const handleScrollTo = (targetId: string, e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="kissa-gifting-section kissa-gifting-hero" aria-label="Gifting Hero">
            <div className="kissa-gifting-hero-grid">
                {/* Left: Text & CTAs */}
                <div className="kissa-gifting-hero-content">
                    <span className="kissa-gifting-hero-kicker">
                        <span>✦</span> BESPOKE OFFERINGS · THE ART OF GIFTING MEMORIES
                    </span>

                    <h1 className="kissa-gifting-hero-title">
                        Some memories fade; those remembered in scent endure forever. [EDIT]
                    </h1>

                    <p className="kissa-gifting-hero-desc">
                        A bespoke fragrance is an intimate token of remembrance — hand-bottled in numbered flacons, sealed with hand-poured botanical wax, and accompanied by a complimentary handwritten calligraphy card. [EDIT]
                    </p>

                    <div className="kissa-gifting-hero-actions">
                        <a
                            href="#build-your-gift"
                            className="hero-btn-primary"
                            onClick={(e) => {
                                if (onShopGiftsClick) {
                                    e.preventDefault();
                                    onShopGiftsClick();
                                } else {
                                    handleScrollTo("build-your-gift", e);
                                }
                            }}
                        >
                            Shop Gifts ↓
                        </a>

                        <a
                            href="#corporate-gifting"
                            className="hero-btn-secondary"
                            onClick={(e) => {
                                if (onCorporateClick) {
                                    e.preventDefault();
                                    onCorporateClick();
                                } else {
                                    handleScrollTo("corporate-gifting", e);
                                }
                            }}
                        >
                            Corporate &amp; Bulk Enquiries →
                        </a>
                    </div>

                    <div className="kissa-gifting-hero-pills">
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">✦</span>
                            <span>Complimentary Calligraphy</span>
                        </div>
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">❦</span>
                            <span>Discreet Gifting Guarantee</span>
                        </div>
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">✈</span>
                            <span>Express Pan-India Transit</span>
                        </div>
                    </div>
                </div>

                {/* Right: Masterpiece Lifestyle Image Stage */}
                <div className="kissa-gifting-hero-media">
                    <img
                        src="/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg"
                        alt="KISSA perfume flacon wrapped in linen gift box with wax seal"
                        width="640"
                        height="760"
                        loading="eager"
                    />

                    <div className="kissa-gifting-hero-floating-card">
                        <div>
                            <div className="kissa-floating-card-tag">THE ARTISANAL PROMISE</div>
                            <p className="kissa-floating-card-text">
                                Wax-sealed parchment &amp; raw silk cord on every gift flacon. [EDIT]
                            </p>
                        </div>
                        <span style={{ fontSize: 22, color: "var(--earth)" }}>✦</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

