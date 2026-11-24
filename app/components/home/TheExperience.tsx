export function TheExperience() {
    return (
        <section id="experience" className="experience-section" aria-label="The Experience">
            <div className="section-header experience-header">
                <span className="section-label experience-eyebrow">READ · WEAR · WRITE</span>
                <h2 className="section-title experience-headline">A real book before the bottle.</h2>
                <p className="section-desc experience-intro">
                    A KISSA perfume isn’t something you unbox. It’s something you move through.
                </p>
            </div>

            <div className="experience-grid">
                {/* 01: Read */}
                <div className="experience-card">
                    <div className="experience-card-top">
                        <span className="experience-step-num">01</span>
                        <div className="experience-icon-wrap" aria-hidden="true">
                            <svg
                                className="experience-icon"
                                viewBox="0 0 32 32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.35"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 7 C8 6 12 7 16 9 C20 7 24 6 28 7 V25 C24 24 20 25 16 27 C12 25 8 24 4 25 Z" />
                                <line x1="16" y1="9" x2="16" y2="27" />
                                <path d="M7 11.5 C9.5 11 12 11.5 14 12.5" strokeOpacity="0.5" />
                                <path d="M7 15.5 C9.5 15 12 15.5 14 16.5" strokeOpacity="0.5" />
                                <path d="M7 19.5 C9.5 19 12 19.5 14 20.5" strokeOpacity="0.5" />
                                <path d="M18 12.5 C20 11.5 22.5 11 25 11.5" strokeOpacity="0.5" />
                                <path d="M18 16.5 C20 15.5 22.5 15 25 15.5" strokeOpacity="0.5" />
                                <path d="M18 20.5 C20 19.5 22.5 19 25 19.5" strokeOpacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="experience-card-body">
                        <div className="experience-card-meta">
                            <span className="experience-action-tag">The Story</span>
                            <span className="experience-detail-tag">5 Story Pages</span>
                        </div>
                        <h3 className="experience-step-title">Read</h3>
                        <p className="experience-step-desc">
                            Open the hardcover book and turn through five short story pages, written for someone standing at the start of something new.
                        </p>
                    </div>
                </div>

                {/* 02: Write */}
                <div className="experience-card">
                    <div className="experience-card-top">
                        <span className="experience-step-num">02</span>
                        <div className="experience-icon-wrap" aria-hidden="true">
                            <svg
                                className="experience-icon"
                                viewBox="0 0 32 32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.35"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 26 L11 25 L24 12 C25.5 10.5 25.5 8 24 6.5 C22.5 5 20 5 18.5 6.5 L5.5 19.5 L4.5 24.5 L9.5 23.5" />
                                <path d="M17 8 L22 13" />
                                <circle cx="10" cy="20" r="0.8" fill="currentColor" />
                                <path d="M7 28 C12 26.5 17 27.5 22 27 C24.5 26.8 26.5 27.2 28 27.5" strokeDasharray="2 2" strokeOpacity="0.45" />
                            </svg>
                        </div>
                    </div>
                    <div className="experience-card-body">
                        <div className="experience-card-meta">
                            <span className="experience-action-tag">The Memory</span>
                            <span className="experience-detail-tag">2 Blank Pages</span>
                        </div>
                        <h3 className="experience-step-title">Write</h3>
                        <p className="experience-step-desc">
                            Two blank pages wait for you: one for a message, one for the hope or goal you’re carrying into what’s next.
                        </p>
                    </div>
                </div>

                {/* 03: Wear */}
                <div className="experience-card">
                    <div className="experience-card-top">
                        <span className="experience-step-num">03</span>
                        <div className="experience-icon-wrap" aria-hidden="true">
                            <svg
                                className="experience-icon"
                                viewBox="0 0 32 32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.35"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="12" y="3" width="8" height="5" rx="1.5" />
                                <path d="M14 8 V11 H18 V8" />
                                <path d="M8 12 C8 11.5 8.5 11 9 11 H23 C23.5 11 24 11.5 24 12 L25 27 C25 28 24 29 23 29 H9 C8 29 7 28 7 27 Z" />
                                <circle cx="16" cy="20" r="3" strokeDasharray="2 1.5" strokeOpacity="0.6" />
                                <line x1="16" y1="14" x2="16" y2="15.5" strokeOpacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="experience-card-body">
                        <div className="experience-card-meta">
                            <span className="experience-action-tag">The Fragrance</span>
                            <span className="experience-detail-tag">Fitted Flacon</span>
                        </div>
                        <h3 className="experience-step-title">Wear</h3>
                        <p className="experience-step-desc">
                            Lift the fragrance from its fitted compartment, and wear the scent of your own beginning.
                        </p>
                    </div>
                </div>
            </div>

            {/* Micro-line: Paanch panne. Phir ek khushboo. */}
            <div className="experience-microline-banner">
                <span className="experience-microline-star" aria-hidden="true">✦</span>
                <p className="experience-microline-text">Paanch panne. Phir ek khushboo.</p>
                <span className="experience-microline-star" aria-hidden="true">✦</span>
            </div>
        </section>
    );
}

export default TheExperience;

