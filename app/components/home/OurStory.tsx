import { Link } from "react-router";

export function OurStory() {
    return (
        <section id="our-story" className="our-story-section" aria-label="Our Story">
            {/* Framing botanical watercolor illustrations */}
            <img
                src="/landing-pages/meng-to-sketchbook/botany-left.png"
                alt=""
                className="story-botany story-botany-left"
                aria-hidden="true"
            />
            <img
                src="/landing-pages/meng-to-sketchbook/botany-right.png"
                alt=""
                className="story-botany story-botany-right"
                aria-hidden="true"
            />

            <div className="story-content-wrap">
                {/* Brush stroke accent at top */}
                <div className="story-brush-accent" aria-hidden="true" />

                {/* Kicker */}
                <span className="story-kicker">OUR STORY</span>

                {/* Main Headline */}
                <h2 className="story-headline">Some beginnings happen quietly.</h2>

                {/* Main Story Paragraph */}
                <p className="story-body-text">
                    An offer letter. A key to a new city. A first customer. A morning when you simply decide to try again. These moments rarely arrive with the right words you only know that something has started to move. KISSA was made for exactly these moments. In Hindi, <em>kissa*</em> means a story. That is what we create: a story inspired perfume you can hold, read, and wear. Every KISSA begins as a real hardcover book pages you turn one by one, a short story that leads somewhere, and the fragrance revealed only at the end.
                </p>

                {/* Chapter Callout Line */}
                <p className="story-chapter-callout">
                    Our first chapter, <strong className="story-chapter-tag">NAYA PANNA,</strong> celebrates the moment when the whole road isn't clear yet but you're ready to take the first step.
                </p>

                {/* Three Pillars Grid */}
                <div className="story-pillars-grid">
                    {/* Pillar 1: Courage */}
                    <div className="story-pillar-item">
                        <div className="story-pillar-icon-box" aria-hidden="true">
                            <svg className="story-pillar-icon-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 25 L10 18 L14 22 L20 10 L28 25" />
                                <path d="M20 10 V5 L25 7.5 L20 10" fill="currentColor" fillOpacity="0.2" />
                            </svg>
                        </div>
                        <div className="story-pillar-content">
                            <h3 className="story-pillar-title">Courage</h3>
                            <p className="story-pillar-desc">Celebrate the decision to begin, even when the ending is unknown.</p>
                        </div>
                    </div>

                    <div className="story-pillar-divider" aria-hidden="true" />

                    {/* Pillar 2: Connection */}
                    <div className="story-pillar-item">
                        <div className="story-pillar-icon-box" aria-hidden="true">
                            <svg className="story-pillar-icon-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11.5" cy="11.5" r="3.5" />
                                <circle cx="20.5" cy="11.5" r="3.5" />
                                <path d="M6 24.5 C6 20.5 9 18 13 18 C15 18 16.5 19 17.5 20.5 C18.5 19 20 18 22 18 C26 18 29 20.5 29 24.5" />
                            </svg>
                        </div>
                        <div className="story-pillar-content">
                            <h3 className="story-pillar-title">Connection</h3>
                            <p className="story-pillar-desc">Make a gift feel personal, through a story and a handwritten message.</p>
                        </div>
                    </div>

                    <div className="story-pillar-divider" aria-hidden="true" />

                    {/* Pillar 3: Memory */}
                    <div className="story-pillar-item">
                        <div className="story-pillar-icon-box" aria-hidden="true">
                            <svg className="story-pillar-icon-svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 9 C13 7 9 7 5 9 V24 C9 22 13 22 16 24 C19 22 23 22 27 24 V9 C23 7 19 7 16 9 Z" />
                                <line x1="16" y1="9" x2="16" y2="24" />
                            </svg>
                        </div>
                        <div className="story-pillar-content">
                            <h3 className="story-pillar-title">Memory</h3>
                            <p className="story-pillar-desc">Give a meaningful moment a fragrance you can always return to.</p>
                        </div>
                    </div>
                </div>

                {/* Watercolor Ribbon Banner */}
                <div className="story-ribbon-banner">
                    <p className="story-ribbon-text">Read a story. Wear its scent. Write your own.</p>
                </div>

                {/* Full Story CTA Button */}
                <div className="story-cta-wrap">
                    <Link to="/about" className="story-cta-btn">
                        <span>The full KISSA story</span>
                        <span className="story-cta-arrow" aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default OurStory;

