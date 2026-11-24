import { Link } from "react-router";

export interface GiftingHeroProps {
    onGiftClick?: () => void;
    onInsideClick?: () => void;
}

export function GiftingHero({
    onGiftClick,
    onInsideClick,
}: GiftingHeroProps) {
    const handleScrollTo = (targetId: string, e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            className="kissa-gifting-section kissa-gifting-hero"
            aria-label="A Perfume Gift for Someone's Next Chapter"
            id="gifting-hero"
        >
            <div className="kissa-gifting-hero-grid">
                {/* Left: Text & CTAs */}
                <div className="kissa-gifting-hero-content">
                    <span className="kissa-gifting-hero-kicker">
                        <span>✦</span> CHAPTER 01 · THE BOOK-STYLE PERFUME GIFT
                    </span>

                    <h1 className="kissa-gifting-hero-title">
                        A Perfume Gift for Someone's Next Chapter
                    </h1>

                    <p className="kissa-gifting-hero-desc">
                        A real book, your handwritten words, and{" "}
                        <Link
                            to="/shop"
                            className="kissa-inline-link"
                            title="Discover NAYA PANNA unisex perfume"
                        >
                            NAYA PANNA
                        </Link>
                        , a 50 ml unisex perfume for new beginnings.
                    </p>

                    <div className="kissa-gifting-hero-actions">
                        <a
                            href="#build-your-gift"
                            className="hero-btn-primary"
                            onClick={(e) => {
                                if (onGiftClick) {
                                    e.preventDefault();
                                    onGiftClick();
                                } else {
                                    handleScrollTo("build-your-gift", e);
                                }
                            }}
                        >
                            Gift NAYA PANNA · ₹1,800
                        </a>

                        <a
                            href="#whats-inside"
                            className="hero-btn-secondary"
                            onClick={(e) => {
                                if (onInsideClick) {
                                    e.preventDefault();
                                    onInsideClick();
                                } else {
                                    handleScrollTo("whats-inside", e);
                                }
                            }}
                        >
                            See What's Inside ↓
                        </a>
                    </div>

                    <div className="kissa-hero-tagline-wrap">
                        <span className="kissa-hero-tagline-star">✦</span>
                        <p className="kissa-hero-poetic-sub">
                            Har nayi shuruaat, ek naya kissa.
                        </p>
                    </div>

                    <div className="kissa-gifting-hero-pills">
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">📖</span>
                            <span>Bound Hardcover Book Box</span>
                        </div>
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">✍️</span>
                            <span>Handwritten Message Page</span>
                        </div>
                        <div className="kissa-hero-pill-item">
                            <span className="kissa-hero-pill-icon">✨</span>
                            <span>50 ml Unisex Eau de Parfum</span>
                        </div>
                    </div>
                </div>

                {/* Right: Hero Image */}
                <div className="kissa-gifting-hero-media">
                    <img
                        src="/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg"
                        alt="KISSA perfume gift box: open hardcover book with NAYA PANNA perfume bottle inside"
                        width="640"
                        height="760"
                        loading="eager"
                    />

                    <div className="kissa-gifting-hero-floating-card">
                        <div>
                            <div className="kissa-floating-card-tag">NAYA PANNA · CHAPTER 01</div>
                            <p className="kissa-floating-card-text">
                                The story ends, and the fragrance appears.
                            </p>
                        </div>
                        <span className="kissa-floating-card-star">✦</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
