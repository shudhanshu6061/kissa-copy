import { GIFTING_OCCASIONS, type GiftingOccasion } from "../../lib/gifting";

export interface GiftingOccasionsProps {
    selectedOccasionId?: string;
    onSelectOccasion: (occasion: GiftingOccasion) => void;
}

export function GiftingOccasions({
    selectedOccasionId,
    onSelectOccasion,
}: GiftingOccasionsProps) {
    const handleCardClick = (occ: GiftingOccasion) => {
        onSelectOccasion(occ);
        const el = document.getElementById("build-your-gift");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="occasions"
            aria-label="Gift by Occasion"
        >
            <div className="section-header">
                <span className="section-label">CURATED SENSORY MEMORIES</span>
                <h2 className="section-title">Gift by Occasion</h2>
                <p className="section-desc">
                    From celebratory milestones to quiet spontaneous gestures, select an occasion to begin crafting an unforgettable fragrant gift. [EDIT]
                </p>
            </div>

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
                            aria-label={`Select ${occ.title} gifting`}
                        >
                            <div className="kissa-occasion-header">
                                <span className="kissa-occasion-badge">{occ.badge}</span>
                                <span className="kissa-occasion-icon">{occ.icon}</span>
                            </div>

                            <h3 className="kissa-occasion-title">{occ.title}</h3>
                            <p className="kissa-occasion-blurb">{occ.blurb}</p>

                            <div className="kissa-occasion-footer">
                                <span className="kissa-occasion-scent-tag">
                                    ✦ {occ.scentHighlight}
                                </span>
                                <span className="kissa-occasion-action-btn">
                                    {isSelected ? "Selected ✓" : "Curate Gift →"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

