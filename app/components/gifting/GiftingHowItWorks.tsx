import { HOW_IT_WORKS_STEPS } from "../../lib/gifting";

export function GiftingHowItWorks() {
    const renderStepIcon = (icon: string) => {
        switch (icon) {
            case "book":
                return (
                    <svg className="kissa-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                );
            case "pen":
                return (
                    <svg className="kissa-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z" />
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                        <path d="M2 2l7.586 7.586" />
                        <circle cx="11" cy="11" r="2" />
                    </svg>
                );
            case "scent":
            default:
                return (
                    <svg className="kissa-step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                );
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="how-it-works"
            aria-label="How the KISSA Gift Works: Read, Write, Wear"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">THE THREE RITUALS</span>
                <h2 className="section-title">
                    How the KISSA Gift Works: Read, Write, Wear
                </h2>
                <p className="section-desc" style={{ maxWidth: 660, margin: "0 auto" }}>
                    A three-part sensory journey that turns an unboxing into an unforgettable personal memory.
                </p>
            </div>

            <div className="kissa-steps-grid">
                {HOW_IT_WORKS_STEPS.map((item) => (
                    <div key={item.step} className="kissa-step-card">
                        <div className="kissa-step-top">
                            <span className="kissa-step-number">{item.step}</span>
                            <div className="kissa-step-icon-wrap">
                                {renderStepIcon(item.icon)}
                            </div>
                        </div>

                        <span className="kissa-step-lead">{item.lead}</span>
                        <h3 className="kissa-step-title">{item.title}</h3>
                        <p className="kissa-step-desc">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
