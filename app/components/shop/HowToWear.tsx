import type { HowToWearStep } from "../../lib/products";

export function HowToWear({ steps }: { steps: HowToWearStep[] }) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="kissa-wear-section" id="how-to-wear" aria-label="How to Wear Ritual">
            <div className="section-header">
                <span className="section-label">THE APPLICATION CEREMONY</span>
                <h2 className="section-title">The Art of Botanical Wearing</h2>
                <p className="section-desc">
                    Formulated in a 28% Extrait de Parfum concentration. Follow these three mindful steps to unlock 14+ hours of radiant sillage. [EDIT]
                </p>
            </div>

            <div className="kissa-wear-grid">
                {steps.map((step) => (
                    <div key={step.step} className="kissa-wear-card">
                        <div className="kissa-wear-step-badge">
                            <span>{String(step.step).padStart(2, "0")}</span>
                        </div>

                        <h3 className="kissa-wear-title">{step.title}</h3>
                        <p className="kissa-wear-instruction">{step.instruction}</p>

                        <div className="kissa-wear-tip-box">
                            <span className="kissa-wear-tip-label">ATELIER SECRET:</span>
                            <p className="kissa-wear-tip">{step.tip}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

