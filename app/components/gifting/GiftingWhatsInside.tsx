import { STORY_PAGES } from "../../lib/gifting";

export function GiftingWhatsInside() {
    return (
        <section
            className="kissa-gifting-section"
            id="whats-inside"
            aria-label="What's Inside the KISSA Perfume Gift Box"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
                <span className="section-label">UNBOXING THE BOOK</span>
                <h2 className="section-title">
                    What's Inside the KISSA Perfume Gift Box
                </h2>
                <p className="section-desc" style={{ maxWidth: 700, margin: "0 auto" }}>
                    This isn't a box with a bottle and some tissue paper. It's a real book
                    first, and the bottle comes after.
                </p>
            </div>

            <div className="kissa-inside-grid">
                {/* 1. A Real Hardcover Book */}
                <div className="kissa-inside-card">
                    <span className="kissa-inside-badge">COMPONENT 01 · HARDCOVER BINDING</span>
                    <h3 className="kissa-inside-title">A Real Hardcover Book</h3>
                    <p className="kissa-inside-desc">
                        A hardcover with a bound spine and pages you turn one by one, just like a
                        book you'd keep on your shelf. Because that's exactly where it ends up.
                    </p>

                    <div className="kissa-book-spine-mockup" aria-hidden="true">
                        <div>
                            <span className="spine-title">KISSA · CHAPTER 01</span>
                            <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", marginTop: 4 }}>
                                NAYA PANNA · 50 ML
                            </div>
                        </div>
                        <span className="spine-mark">✦</span>
                    </div>
                </div>

                {/* 2. Five Short Story Pages */}
                <div className="kissa-inside-card">
                    <span className="kissa-inside-badge">COMPONENT 02 · FIVE SHORT STORIES</span>
                    <h3 className="kissa-inside-title">Five Short Story Pages</h3>
                    <p className="kissa-inside-desc">
                        A short, warm story about beginnings, told in five chapters:
                    </p>

                    <div className="kissa-story-chapters-list">
                        {STORY_PAGES.map((sp) => (
                            <div key={sp.title} className="kissa-story-chapter-item">
                                <span className="kissa-story-chap-num">{sp.chapter}:</span>
                                <div>
                                    <strong className="kissa-story-chap-title">{sp.title}</strong>
                                    {" — "}
                                    <span className="kissa-story-chap-text">{sp.summary}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="kissa-inside-img-wrap">
                        <img
                            src="/landing-pages/meng-to-sketchbook/kissa-discovery-set.jpg"
                            alt="KISSA gift book showing short story pages about new beginnings"
                            className="kissa-inside-thumb"
                            loading="lazy"
                            width="500"
                            height="240"
                        />
                    </div>
                </div>

                {/* 3. Two Pages for Your Own Words */}
                <div className="kissa-inside-card">
                    <span className="kissa-inside-badge">COMPONENT 03 · HANDWRITTEN PAGES</span>
                    <h3 className="kissa-inside-title">Two Pages for Your Own Words</h3>
                    <p className="kissa-inside-desc">
                        Every story needs real voices. Two dedicated pages turn an object into an heirloom:
                    </p>

                    <div className="kissa-writing-page-box">
                        <div className="kissa-page-mockup">
                            <span className="kissa-page-badge">PAGE 01 · SENDER'S DEDICATION</span>
                            <h4 className="kissa-page-title">"To your next chapter..."</h4>
                            <p className="kissa-page-desc">
                                A page for your personal message to the person receiving the gift.
                            </p>
                        </div>

                        <div className="kissa-page-mockup">
                            <span className="kissa-page-badge">PAGE 02 · RECIPIENT'S PROMISE</span>
                            <h4 className="kissa-page-title">"My next KISSA"</h4>
                            <p className="kissa-page-desc">
                                A page where they write their own hope, goal or promise, in their own words.
                            </p>
                        </div>
                    </div>

                    <div className="kissa-inside-img-wrap" style={{ marginTop: 14 }}>
                        <img
                            src="/landing-pages/meng-to-sketchbook/bg-wash.jpg"
                            alt="Handwritten message on the To your next chapter page of the KISSA perfume gift"
                            className="kissa-inside-thumb"
                            style={{ maxHeight: 110 }}
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* 4. NAYA PANNA, 50 ml Unisex Perfume */}
                <div className="kissa-inside-card">
                    <span className="kissa-inside-badge">COMPONENT 04 · THE FRAGRANCE</span>
                    <h3 className="kissa-inside-title">NAYA PANNA, 50 ml Unisex Perfume</h3>
                    <p className="kissa-inside-desc">
                        After the last page, the bottle sits in its own fitted compartment:
                        an oval glass bottle, rose-coloured fragrance and a matte-black cap.
                    </p>

                    <div className="kissa-inside-flacon-media">
                        <img
                            src="/naya-panna-unisex-perfume-50ml-kissa.png"
                            alt="NAYA PANNA 50 ml unisex perfume by KISSA in an oval glass bottle with a black cap"
                            className="kissa-flacon-img"
                            loading="lazy"
                            width="160"
                            height="240"
                        />
                        <div className="kissa-flacon-meta">
                            <span>NAYA PANNA</span>
                            <span className="flacon-meta-dot">·</span>
                            <span>50 ML EAU DE PARFUM</span>
                            <span className="flacon-meta-dot">·</span>
                            <span>UNISEX</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
