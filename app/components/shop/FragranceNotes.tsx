import type { FragrancePyramid } from "../../lib/products";

export function FragranceNotes({ pyramid }: { pyramid: FragrancePyramid }) {
    if (!pyramid) return null;

    const tiers = [
        {
            key: "top",
            level: "01 · THE OPENING",
            timeframe: "First 30 Minutes",
            title: "Top Notes",
            character: "Vibrant, green, invigorating petrichor sparkle",
            notes: pyramid.top,
        },
        {
            key: "heart",
            level: "02 · THE HEART",
            timeframe: "2 to 6 Hours",
            title: "Heart Accords",
            character: "Velvety botanical orchid & warm aromatic spices",
            notes: pyramid.heart,
        },
        {
            key: "base",
            level: "03 · THE DRYDOWN",
            timeframe: "6 to 14+ Hours",
            title: "Base Foundation",
            character: "Sacred Mysore sandalwood, smoked resins & earthy roots",
            notes: pyramid.base,
        },
    ];

    return (
        <section className="kissa-notes-section" id="notes" aria-label="Fragrance Notes Architecture">
            <div className="section-header">
                <span className="section-label">THE OLFACTORY ARCHITECTURE</span>
                <h2 className="section-title">Pyramid &amp; Botanical Notes</h2>
                <p className="section-desc">
                    Three harmonious movements of natural steam extraction that evolve continuously against your body heat. [EDIT]
                </p>
            </div>

            <div className="kissa-notes-grid">
                {tiers.map((tier) => (
                    <div key={tier.key} className="kissa-note-card">
                        <div className="kissa-note-card-header">
                            <span className="kissa-note-level">{tier.level}</span>
                            <span className="kissa-note-time">{tier.timeframe}</span>
                        </div>

                        <h3 className="kissa-note-tier-title">{tier.title}</h3>
                        <p className="kissa-note-tier-char">{tier.character}</p>

                        <div className="kissa-note-ingredients">
                            {tier.notes.map((note, noteIdx) => (
                                <div key={noteIdx} className="kissa-note-item">
                                    <div className="kissa-note-bullet">{note.icon || "✦"}</div>
                                    <div className="kissa-note-info">
                                        <h4 className="kissa-note-name">{note.name}</h4>
                                        <p className="kissa-note-desc">{note.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

