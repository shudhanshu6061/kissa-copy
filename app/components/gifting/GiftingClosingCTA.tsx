export interface GiftingClosingCTAProps {
    onGiftClick?: () => void;
}

export function GiftingClosingCTA({ onGiftClick }: GiftingClosingCTAProps) {
    const handleScrollToBuilder = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onGiftClick) {
            onGiftClick();
        } else {
            const el = document.getElementById("build-your-gift");
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <section
            className="kissa-gifting-section kissa-closing-cta-section"
            id="closing-cta"
            aria-label="Agla Panna Tumhara Hai"
        >
            <div className="kissa-closing-cta-card">
                <div className="kissa-closing-card-inner" style={{ textAlign: "center" }}>
                    <span className="section-label">THE NEXT CHAPTER AWAITS</span>

                    <h2 className="kissa-closing-title">Agla Panna Tumhara Hai</h2>

                    <p className="kissa-closing-subtitle">
                        For yourself. For someone you believe in. For whatever begins from here.
                    </p>

                    <div className="kissa-closing-action">
                        <a
                            href="#build-your-gift"
                            className="hero-btn-primary kissa-closing-btn"
                            onClick={handleScrollToBuilder}
                        >
                            Gift NAYA PANNA · ₹1,800
                        </a>
                    </div>

                    <div className="kissa-closing-poetic-wrap">
                        <span className="kissa-closing-star">✦</span>
                        <p className="kissa-closing-poetic-text">
                            Har khushboo, ek kissa.
                        </p>
                        <span className="kissa-closing-star">✦</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
