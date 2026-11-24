import { GIFTING_OCCASIONS, type GiftingOccasion } from "../../lib/gifting";

export interface GiftingOccasionsProps {
    selectedOccasionId?: string;
    onSelectOccasion?: (occasion: GiftingOccasion) => void;
}

export function GiftingOccasions({
    selectedOccasionId,
    onSelectOccasion,
}: GiftingOccasionsProps) {
    const handleCardClick = (occ: GiftingOccasion) => {
        if (onSelectOccasion) {
            onSelectOccasion(occ);
        }
        const el = document.getElementById("build-your-gift");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="occasions"
            aria-label="Perfume Gift Ideas for Every New Beginning"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">THE MILESTONES THAT MATTER</span>
                <h2 className="section-title">
                    Perfume Gift Ideas for Every New Beginning
                </h2>
                <p className="section-desc" style={{ maxWidth: 700, margin: "0 auto 32px" }}>
                    KISSA was made for the moments that change the direction of a life.
                    Here's when it fits best.
                </p>
            </div>

            {/* Featured Gifting Moment Visual Banner */}
            <div className="kissa-occasion-featured-strip">
                <div className="kissa-occasion-banner-card">
                    <div>
                        <span className="kissa-banner-tag">FEATURED MOMENT · THE FIRST DAY</span>
                        <h3 className="kissa-banner-heading">
                            Celebrate the Leap Before the Landing
                        </h3>
                        <p className="kissa-banner-p">
                            An offer letter, a ticket to a new city, or a quiet decision to begin again.
                            A perfume gift that holds your words becomes a lifelong talisman.
                        </p>
                    </div>

                    <div className="kissa-banner-media">
                        <img
                            src="/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg"
                            alt="Person handing a KISSA perfume gift to a friend starting a new job"
                            className="kissa-banner-img"
                            loading="lazy"
                            width="520"
                            height="340"
                        />
                    </div>
                </div>
            </div>

            {/* 7 Occasions Grid */}
            <div className="kissa-occasions-grid">
                {GIFTING_OCCASIONS.map((occ) => {
                    const isSelected = selectedOccasionId === occ.id;

                    return (
                        <div
                            key={occ.id}
                            className={`kissa-occasion-card ${isSelected ? "is-selected" : ""}`}
                            onClick={() => handleCardClick(occ)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleCardClick(occ);
                                }
                            }}
                            aria-pressed={isSelected}
                            aria-label={`Select ${occ.title}`}
                        >
                            <div className="kissa-occasion-header">
                                <span className="kissa-occasion-badge">{occ.badge}</span>
                                <span className="kissa-occasion-icon">{occ.icon}</span>
                            </div>

                            <h3 className="kissa-occasion-title">{occ.title}</h3>
                            <p className="kissa-occasion-desc">{occ.description}</p>

                            <span className="kissa-occasion-cta-hint">
                                {isSelected ? "Selected for Book ✓" : "Dedicate for This Moment →"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
