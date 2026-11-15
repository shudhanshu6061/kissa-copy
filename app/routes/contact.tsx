import { Layout } from "../components/Layout";

export default function Contact() {
    return (
        <Layout>
            <section className="kissa-page-hero">
                <span className="kissa-page-kicker">CONCIERGE &amp; SALONS · PRIVATE INQUIRIES</span>
                <h1 className="kissa-page-title">Contact Us</h1>
                <p className="kissa-page-desc">
                    Our fragrance concierges and atelier guides are at your service for private consultations,
                    bespoke gifting, and formulation inquiries.
                </p>

                <div className="kissa-page-card">
                    <p
                        style={{
                            fontFamily: "var(--sans)",
                            fontSize: 11,
                            letterSpacing: "var(--track-caps)",
                            textTransform: "uppercase",
                            color: "var(--earth)",
                            marginBottom: 12,
                        }}
                    >
                        DIRECT CORRESPONDENCE
                    </p>
                    <h2
                        style={{
                            fontFamily: "var(--display)",
                            fontSize: "clamp(26px, 3.5vw, 36px)",
                            fontWeight: 400,
                            margin: "0 0 16px",
                            color: "var(--ink)",
                        }}
                    >
                        concierge@kissa-parfums.com
                    </h2>
                    <p
                        style={{
                            fontFamily: "var(--font)",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "var(--ink-soft)",
                            maxWidth: 580,
                            margin: "0 auto 28px",
                        }}
                    >
                        For private salon appointments, bridal fragrance consultations, or orders assistance, our atelier team responds within 24 hours.
                    </p>
                    <a
                        href="mailto:concierge@kissa-parfums.com"
                        className="kissa-add-btn"
                        style={{
                            padding: "14px 32px",
                            fontSize: 12,
                            display: "inline-block",
                            textDecoration: "none",
                        }}
                    >
                        Write to Concierge →
                    </a>
                </div>
            </section>
        </Layout>
    );
}

