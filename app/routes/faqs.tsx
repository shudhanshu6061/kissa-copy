import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { FAQ_SECTIONS, generateFaqSchema } from "../lib/faqs-data";

// -------------------------------------------------------------
// SEO Meta Tags
// -------------------------------------------------------------
export const meta = () => {
    const title = "KISSA FAQs | Perfume Notes, EDP vs EDT & Gifting";
    const description =
        "Answers about KISSA and NAYA PANNA: fragrance notes, moods, EDP vs EDT, the book packaging, gifting, how to wear it, orders and delivery.";
    const keywords =
        "KISSA perfume FAQs, NAYA PANNA notes, EDP vs EDT, difference between EDP and EDT, unisex perfume India, perfume gift box, how to apply perfume, Indian perfume brand";
    const pageUrl = "https://kissaperfume.in/faqs";

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        {
            property: "og:image",
            content: "/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
            name: "twitter:image",
            content: "/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg",
        },
    ];
};

const JUMP_LINKS = [
    { label: "About KISSA", href: "#about-kissa" },
    { label: "Why KISSA", href: "#why-kissa" },
    { label: "Notes", href: "#fragrance-notes" },
    { label: "Moods", href: "#moods-occasions" },
    { label: "EDP vs EDT", href: "#edp-vs-edt" },
    { label: "Packaging", href: "#packaging" },
    { label: "Gifting", href: "#gifting" },
    { label: "How to Wear", href: "#how-to-wear" },
    { label: "Orders", href: "#orders-delivery" },
];

/**
 * Renders answer text with rich interactive links to relevant pages
 * (Product, Collection, Gifting, Contact, and email) without altering text accuracy.
 */
function FormattedAnswer({ text, itemId }: { text: string; itemId: string }) {
    if (itemId === "corporate-bulk-gifting") {
        return (
            <>
                Yes. Write to{" "}
                <a href="mailto:contact@kissaperfume.com" className="kissa-faqs-inline-link">
                    contact@kissaperfume.com
                </a>{" "}
                with the quantity and timeline, or visit our{" "}
                <Link to="/gifting" className="kissa-faqs-inline-link">
                    Gifting Concierge
                </Link>
                .
            </>
        );
    }

    if (itemId === "how-to-track-order") {
        return (
            <>
                Use the tracking link in your shipping email or message, or{" "}
                <Link to="/contact" className="kissa-faqs-inline-link">
                    contact us
                </Link>{" "}
                with your order number.
            </>
        );
    }

    if (itemId === "return-and-exchange-policy") {
        return (
            <>
                We offer replacements for items damaged in transit or defective bottles reported within 48 hours of delivery. Due to personal care hygiene standards, opened perfume bottles cannot be returned. Please visit our{" "}
                <Link to="/contact" className="kissa-faqs-inline-link">
                    contact page
                </Link>{" "}
                for return and exchange assistance.
            </>
        );
    }

    if (itemId === "chapters-of-life-collection") {
        return (
            <>
                Chapters of Life is KISSA&apos;s collection of fragrances, each one tied to a life moment. Chapter 01 is{" "}
                <Link to="/shop" className="kissa-faqs-inline-link">
                    NAYA PANNA
                </Link>
                , made for new beginnings. Explore our{" "}
                <Link to="/collections/all" className="kissa-faqs-inline-link">
                    fragrance collection
                </Link>
                . More chapters are on the way.
            </>
        );
    }

    if (itemId === "is-kissa-worth-the-price" || itemId === "how-much-does-naya-panna-cost") {
        return (
            <>
                {text.split("₹4,950")[0]}
                <Link to="/shop" className="kissa-faqs-inline-link">
                    ₹4,950
                </Link>
                {text.split("₹4,950")[1]}
            </>
        );
    }

    if (itemId === "is-kissa-a-good-gift" || itemId === "which-occasions-best-for") {
        return (
            <>
                {text}{" "}
                <Link to="/gifting" className="kissa-faqs-inline-link">
                    Explore KISSA Gifting →
                </Link>
            </>
        );
    }

    return <>{text}</>;
}

export default function FaqsPage() {
    // Initial state: first question of key sections open by default
    const [openIds, setOpenIds] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        initial.add("what-is-kissa");
        initial.add("what-makes-kissa-different");
        initial.add("what-does-naya-panna-smell-like");
        return initial;
    });

    const [searchQuery, setSearchQuery] = useState("");

    const toggleQuestion = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const expandAll = () => {
        const allIds = new Set<string>();
        FAQ_SECTIONS.forEach((section) => {
            section.items.forEach((item) => allIds.add(item.id));
        });
        setOpenIds(allIds);
    };

    const collapseAll = () => {
        setOpenIds(new Set());
    };

    // Filter questions if user types in search
    const filteredResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return null;

        const results: Array<{
            sectionTitle: string;
            sectionId: string;
            id: string;
            question: string;
            answer: string;
        }> = [];

        FAQ_SECTIONS.forEach((section) => {
            section.items.forEach((item) => {
                const matchQ = item.question.toLowerCase().includes(q);
                const matchA = item.answer.toLowerCase().includes(q);
                const matchKw = item.keywords?.some((k) => k.toLowerCase().includes(q));
                if (matchQ || matchA || matchKw) {
                    results.push({
                        sectionTitle: section.title,
                        sectionId: section.id,
                        ...item,
                    });
                }
            });
        });

        return results;
    }, [searchQuery]);

    const faqSchema = useMemo(() => generateFaqSchema(), []);

    return (
        <Layout>
            {/* JSON-LD Schema Markup (Complete 45 Q&As) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="kissa-faqs-page">
                {/* -------------------------------------------------------------
                    Section 1: Hero
                    ------------------------------------------------------------- */}
                <header className="kissa-faqs-hero" aria-label="FAQs Hero">
                    <div className="kissa-faqs-hero__badge">
                        <span className="kissa-faqs-hero__sparkle">✦</span>
                        <span className="kissa-faqs-hero__kicker">
                            KNOWLEDGE BASE &amp; FRAGRANCE ADVISORY
                        </span>
                    </div>

                    <h1 className="kissa-faqs-hero__title">
                        KISSA FAQs: Everything You Want to Know
                    </h1>

                    <p className="kissa-faqs-hero__desc">
                        About our story, our scents and your order. Can&apos;t find your answer?{" "}
                        <Link to="/contact" className="kissa-faqs-hero__link">
                            Contact us
                        </Link>
                        .
                    </p>

                    {/* Jump Links Strip */}
                    <nav className="kissa-faqs-jump-nav" aria-label="FAQ Section Jump Links">
                        <span className="kissa-faqs-jump-label">Jump to:</span>
                        <div className="kissa-faqs-jump-pills">
                            {JUMP_LINKS.map((link, idx) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="kissa-faqs-jump-pill"
                                >
                                    {link.label}
                                    {idx < JUMP_LINKS.length - 1 && (
                                        <span className="kissa-faqs-jump-dot" aria-hidden="true">
                                            ·
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Interactive Filter & Expand Toolbar */}
                    <div className="kissa-faqs-toolbar">
                        <div className="kissa-faqs-search-box">
                            <span className="kissa-faqs-search-icon" aria-hidden="true">
                                🔍
                            </span>
                            <input
                                type="text"
                                className="kissa-faqs-search-input"
                                placeholder="Search questions, notes, ingredients, delivery..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search frequently asked questions"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="kissa-faqs-search-clear"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="kissa-faqs-controls">
                            <button
                                type="button"
                                className="kissa-faqs-control-btn"
                                onClick={expandAll}
                            >
                                Expand all
                            </button>
                            <span className="kissa-faqs-control-sep">|</span>
                            <button
                                type="button"
                                className="kissa-faqs-control-btn"
                                onClick={collapseAll}
                            >
                                Collapse all
                            </button>
                        </div>
                    </div>
                </header>

                {/* -------------------------------------------------------------
                    Active Search View (if user typed a query)
                    ------------------------------------------------------------- */}
                {filteredResults !== null ? (
                    <section className="kissa-faqs-search-results" aria-label="Search Results">
                        <div className="kissa-faqs-search-header">
                            <h2 className="kissa-faqs-search-title">
                                Search Results ({filteredResults.length})
                            </h2>
                            <p className="kissa-faqs-search-subtitle">
                                Showing answers matching &ldquo;{searchQuery}&rdquo;
                            </p>
                        </div>

                        {filteredResults.length === 0 ? (
                            <div className="kissa-faqs-empty-search">
                                <p>No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
                                <button
                                    type="button"
                                    className="kissa-faqs-cta-btn"
                                    onClick={() => setSearchQuery("")}
                                    style={{ marginTop: 16 }}
                                >
                                    View All FAQs
                                </button>
                            </div>
                        ) : (
                            <div className="kissa-faqs-accordion-container">
                                {filteredResults.map((item) => {
                                    const isOpen = openIds.has(item.id) || true; // Keep open in search for quick reading
                                    const contentId = `faq-ans-${item.id}`;
                                    const buttonId = `faq-btn-${item.id}`;

                                    return (
                                        <div
                                            key={item.id}
                                            className={`kissa-faqs-item ${isOpen ? "is-open" : ""}`}
                                        >
                                            <div className="kissa-faqs-item-source-badge">
                                                {item.sectionTitle}
                                            </div>
                                            <h3 className="kissa-faqs-item__heading">
                                                <button
                                                    type="button"
                                                    id={buttonId}
                                                    className="kissa-faqs-trigger"
                                                    aria-expanded={isOpen}
                                                    aria-controls={contentId}
                                                    onClick={() => toggleQuestion(item.id)}
                                                >
                                                    <span className="kissa-faqs-question">
                                                        {item.question}
                                                    </span>
                                                    <span
                                                        className="kissa-faqs-icon"
                                                        aria-hidden="true"
                                                    >
                                                        {isOpen ? "−" : "+"}
                                                    </span>
                                                </button>
                                            </h3>

                                            <div
                                                id={contentId}
                                                role="region"
                                                aria-labelledby={buttonId}
                                                className={`kissa-faqs-answer-region ${isOpen ? "is-open" : ""}`}
                                            >
                                                <div className="kissa-faqs-answer-body">
                                                    <p>
                                                        <FormattedAnswer text={item.answer} itemId={item.id} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                ) : (
                    /* -------------------------------------------------------------
                       Standard Categorized View (Sections 2 to 10)
                       ------------------------------------------------------------- */
                    <main className="kissa-faqs-content-flow">
                        {FAQ_SECTIONS.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="kissa-faqs-group"
                                aria-labelledby={`heading-${section.id}`}
                            >
                                <div className="kissa-faqs-group__header">
                                    <span className="kissa-faqs-group__kicker">
                                        {section.kicker}
                                    </span>
                                    <h2
                                        id={`heading-${section.id}`}
                                        className="kissa-faqs-group__title"
                                    >
                                        {section.title}
                                    </h2>
                                    {section.description && (
                                        <p className="kissa-faqs-group__desc">
                                            {section.description}
                                        </p>
                                    )}
                                </div>

                                <div className="kissa-faqs-accordion-container">
                                    {section.items.map((item) => {
                                        const isOpen = openIds.has(item.id);
                                        const contentId = `faq-ans-${item.id}`;
                                        const buttonId = `faq-btn-${item.id}`;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`kissa-faqs-item ${isOpen ? "is-open" : ""}`}
                                            >
                                                <h3 className="kissa-faqs-item__heading">
                                                    <button
                                                        type="button"
                                                        id={buttonId}
                                                        className="kissa-faqs-trigger"
                                                        aria-expanded={isOpen}
                                                        aria-controls={contentId}
                                                        onClick={() => toggleQuestion(item.id)}
                                                    >
                                                        <span className="kissa-faqs-question">
                                                            {item.question}
                                                        </span>
                                                        <span
                                                            className="kissa-faqs-icon"
                                                            aria-hidden="true"
                                                        >
                                                            {isOpen ? "−" : "+"}
                                                        </span>
                                                    </button>
                                                </h3>

                                                <div
                                                    id={contentId}
                                                    role="region"
                                                    aria-labelledby={buttonId}
                                                    className={`kissa-faqs-answer-region ${isOpen ? "is-open" : ""}`}
                                                >
                                                    <div className="kissa-faqs-answer-body">
                                                        <p>
                                                            <FormattedAnswer text={item.answer} itemId={item.id} />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </main>
                )}

                {/* -------------------------------------------------------------
                    Section 11: Closing
                    ------------------------------------------------------------- */}
                <section className="kissa-faqs-closing" aria-labelledby="closing-heading">
                    <div className="kissa-faqs-closing__badge">
                        <span className="kissa-faqs-hero__sparkle">✦</span>
                        <span className="kissa-faqs-hero__kicker">ATELIER ASSISTANCE</span>
                    </div>

                    <h2 id="closing-heading" className="kissa-faqs-closing__title">
                        Still Have a Question?
                    </h2>

                    <p className="kissa-faqs-closing__desc">
                        We&apos;re happy to help. Write to us, and we&apos;ll get back to you within 24 hours.
                    </p>

                    <div className="kissa-faqs-closing__actions">
                        <Link to="/contact" className="kissa-faqs-cta-btn">
                            Contact KISSA
                        </Link>
                    </div>

                    {/* Quick Contact Strip */}
                    <div className="kissa-faqs-concierge-grid">
                        <div className="kissa-faqs-concierge-card">
                            <span className="kissa-faqs-concierge-icon">💬</span>
                            <span className="kissa-faqs-concierge-title">WhatsApp Concierge</span>
                            <span className="kissa-faqs-concierge-detail">+91 7607090101</span>
                            <a
                                href="https://wa.me/917607090101"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="kissa-faqs-concierge-link"
                            >
                                Start Chat →
                            </a>
                        </div>

                        <div className="kissa-faqs-concierge-card">
                            <span className="kissa-faqs-concierge-icon">✉️</span>
                            <span className="kissa-faqs-concierge-title">Direct Client Care</span>
                            <span className="kissa-faqs-concierge-detail">hello@kissa.in</span>
                            <a
                                href="mailto:hello@kissa.in"
                                className="kissa-faqs-concierge-link"
                            >
                                Email Us →
                            </a>
                        </div>

                        <div className="kissa-faqs-concierge-card">
                            <span className="kissa-faqs-concierge-icon">⏱️</span>
                            <span className="kissa-faqs-concierge-title">Hours of Service</span>
                            <span className="kissa-faqs-concierge-detail">Mon – Sat: 10 am – 6 pm IST</span>
                            <span className="kissa-faqs-concierge-sub">Prompt 24hr response</span>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
