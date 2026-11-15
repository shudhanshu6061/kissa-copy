import { Link } from "react-router";
import { Layout } from "../components/Layout";

export default function About() {
    return (
        <Layout>
            <section className="kissa-page-hero">
                <span className="kissa-page-kicker">THE BOTANICAL HERBARIUM · OUR HERITAGE</span>
                <h1 className="kissa-page-title">About Maison KISSA</h1>
                <p className="kissa-page-desc">
                    Born of wild equatorial extracts, sacred temple resins, and living watercolors.
                    Hand-bottled in small numbered editions with reverence.
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
                        THE ATELIER PHILOSOPHY
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
                        Pure Botanical Extraction
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
                        From the misty hills of Mysore to ancient resin forests, each formulation is a sensory memory preserved in high concentration extraits de parfum.
                    </p>
                    <Link
                        to="/shop"
                        className="kissa-add-btn"
                        style={{
                            padding: "14px 32px",
                            fontSize: 12,
                            display: "inline-block",
                        }}
                    >
                        Discover Our Editions →
                    </Link>
                </div>
            </section>
        </Layout>
    );
}

