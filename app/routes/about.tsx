import { useState, useId } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/about";
import { Layout } from "../components/Layout";

// -------------------------------------------------------------
// SEO Meta Tags
// -------------------------------------------------------------
export const meta: Route.MetaFunction = () => {
    const title = "About KISSA India’s Book-Style Fragrance Brand";
    const description =
        "KISSA turns life’s new beginnings into fragrances you read, wear, and write your own story into. Meet the brand and NAYA PANNA, our first chapter.";
    const keywords =
        "KISSA fragrance brand, book-style perfume, fragrance for new beginnings, unisex perfume India, perfume gift with a story";
    const canonicalUrl = "https://kissaperfume.in/about";

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        {
            property: "og:image",
            content: "/landing-pages/meng-to-sketchbook/naya-panna.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
            name: "twitter:image",
            content: "/landing-pages/meng-to-sketchbook/naya-panna.png",
        },
    ];
};

// -------------------------------------------------------------
// Schema: Organization + AboutPage + FAQPage (JSON-LD)
// -------------------------------------------------------------
const ABOUT_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://kissaperfume.in/#organization",
            name: "KISSA",
            alternateName: ["KISSA Parfums", "Maison KISSA", "KISSA Fragrance"],
            url: "https://kissaperfume.in",
            logo: "https://kissaperfume.in/kissa-logo-transparent.png",
            description:
                "An Indian fragrance house that turns life’s defining moments into book-style perfumes you read, wear, and write your own story into.",
            slogan: "Har khushboo, ek kissa.",
            foundingLocation: {
                "@type": "Place",
                name: "India",
            },
            knowsAbout: [
                "Contemporary Indian Perfumery",
                "Book-Style Perfume",
                "Unisex Perfume India",
                "Fragrance for New Beginnings",
                "Perfume Gift with a Story",
            ],
        },
        {
            "@type": "AboutPage",
            "@id": "https://kissaperfume.in/about#webpage",
            url: "https://kissaperfume.in/about",
            name: "About KISSA India’s Book-Style Fragrance Brand",
            description:
                "KISSA turns life’s new beginnings into fragrances you read, wear, and write your own story into. Meet the brand and NAYA PANNA, our first chapter.",
            isPartOf: {
                "@type": "WebSite",
                "@id": "https://kissaperfume.in/#website",
                url: "https://kissaperfume.in",
                name: "KISSA",
            },
            about: {
                "@id": "https://kissaperfume.in/#organization",
            },
            mainEntity: {
                "@id": "https://kissaperfume.in/#organization",
            },
        },
        {
            "@type": "FAQPage",
            "@id": "https://kissaperfume.in/about#faq",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What does KISSA mean?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Kissa is the Hindi word for a story. We’re a fragrance brand that turns life’s new beginnings into scents you read, wear, and write your own chapter into.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Is KISSA unisex?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes every KISSA fragrance, NAYA PANNA included, is made for both women and men.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What makes KISSA different from other perfume brands?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Each fragrance comes inside a real hardcover book: five pages to read, two to write on, and the bottle revealed at the end. It’s a perfume and a personal keepsake in one.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How much does a KISSA fragrance cost?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "KISSA is accessible premium an intended ₹1,500–2,000 for a 50 ml bottle.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Does KISSA make a good gift?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "That’s exactly what it’s built for. You can write a message and a wish on the two blank pages, which makes it a lovely gift for a new job, a move, a graduation, or any fresh start.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What does NAYA PANNA smell like?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "It opens with bergamot and green cardamom, softens into white tea and neroli, and settles on sandalwood, clean musk, and soft amber with cardamom, white tea, and sandalwood as its signature.",
                    },
                },
            ],
        },
    ],
};

// -------------------------------------------------------------
// FAQ Items Data
// -------------------------------------------------------------
interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const ABOUT_FAQS: FaqItem[] = [
    {
        id: "faq-meaning",
        question: "What does KISSA mean?",
        answer:
            "Kissa is the Hindi word for a story. We’re a fragrance brand that turns life’s new beginnings into scents you read, wear, and write your own chapter into.",
    },
    {
        id: "faq-unisex",
        question: "Is KISSA unisex?",
        answer:
            "Yes every KISSA fragrance, NAYA PANNA included, is made for both women and men.",
    },
    {
        id: "faq-different",
        question: "What makes KISSA different from other perfume brands?",
        answer:
            "Each fragrance comes inside a real hardcover book: five pages to read, two to write on, and the bottle revealed at the end. It’s a perfume and a personal keepsake in one.",
    },
    {
        id: "faq-cost",
        question: "How much does a KISSA fragrance cost?",
        answer:
            "KISSA is accessible premium an intended ₹1,500–2,000 for a 50 ml bottle.",
    },
    {
        id: "faq-gift",
        question: "Does KISSA make a good gift?",
        answer:
            "That’s exactly what it’s built for. You can write a message and a wish on the two blank pages, which makes it a lovely gift for a new job, a move, a graduation, or any fresh start.",
    },
    {
        id: "faq-scent",
        question: "What does NAYA PANNA smell like?",
        answer:
            "It opens with bergamot and green cardamom, softens into white tea and neroli, and settles on sandalwood, clean musk, and soft amber with cardamom, white tea, and sandalwood as its signature.",
    },
];

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------
export default function AboutPage() {
    // Open first FAQ by default
    const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(
        () => new Set(["faq-meaning"])
    );
    const faqBaseId = useId();

    const toggleFaq = (id: string) => {
        setOpenFaqIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <Layout>
            {/* JSON-LD Structured Data: Organization + AboutPage + FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ABOUT_SCHEMA),
                }}
            />

            <div className="kissa-about-page">
                {/* Breadcrumbs */}
                <nav className="kissa-about-breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="kissa-about-breadcrumbs-sep">/</span>
                    <span aria-current="page">About KISSA</span>
                </nav>

                {/* -------------------------------------------------------------
                    1. Hero Section (H1)
                    ------------------------------------------------------------- */}
                <section className="kissa-about-hero" aria-labelledby="about-hero-h1">
                    <img
                        src="/landing-pages/meng-to-sketchbook/botany-left.png"
                        alt=""
                        className="kissa-about-botany-left"
                        aria-hidden="true"
                    />
                    <img
                        src="/landing-pages/meng-to-sketchbook/botany-right.png"
                        alt=""
                        className="kissa-about-botany-right"
                        aria-hidden="true"
                    />

                    <span className="kissa-about-kicker">
                        ABOUT KISSA · CONTEMPORARY INDIAN PERFUMERY
                    </span>

                    <h1 id="about-hero-h1" className="kissa-about-h1">
                        We make fragrances you can read.
                    </h1>

                    <p className="kissa-about-hero-sub">
                        Har khushboo, ek kissa.
                    </p>
                </section>

                {/* -------------------------------------------------------------
                    2. What is KISSA?
                    ------------------------------------------------------------- */}
                <section
                    id="what-is-kissa"
                    className="kissa-about-section"
                    aria-labelledby="what-is-kissa-title"
                >
                    <div className="kissa-about-lead-card">
                        <span className="kissa-about-lead-kicker">
                            OUR IDENTITY & BELIEF
                        </span>
                        <h2 id="what-is-kissa-title" className="kissa-about-lead-title">
                            What is KISSA?
                        </h2>
                        <p className="kissa-about-lead-text">
                            KISSA is an Indian fragrance house founded on a simple conviction:
                            life’s defining moments a new role, a new city, a first venture,
                            a fresh start deserve a scent worth remembering them by. That belief
                            shapes everything we make. A KISSA is never just a bottle. Each
                            fragrance is presented inside a hardcover book: five short pages to
                            read, two left blank for your own words, and the scent revealed
                            only at the end. The result is a fragrance and a keepsake in one
                            unisex, made in India, and crafted to be given or kept with equal
                            meaning. In Hindi, <em>kissa</em> means a story. That is what every
                            KISSA is designed to be a scent that marks a moment and lives on
                            as a memory.
                        </p>

                        <div className="kissa-about-badge-strip">
                            <span className="kissa-about-badge">
                                <span className="kissa-about-badge-icon">📖</span>
                                Hardcover Book Presentation
                            </span>
                            <span className="kissa-about-badge">
                                <span className="kissa-about-badge-icon">🇮🇳</span>
                                Crafted in India
                            </span>
                            <span className="kissa-about-badge">
                                <span className="kissa-about-badge-icon">✨</span>
                                Unisex Eau de Parfum
                            </span>
                            <span className="kissa-about-badge">
                                <span className="kissa-about-badge-icon">✍️</span>
                                Personal Keepsake
                            </span>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    3. The Story Behind the Name
                    ------------------------------------------------------------- */}
                <section
                    id="the-story-behind-the-name"
                    className="kissa-about-section"
                    aria-labelledby="story-behind-name-title"
                >
                    <div className="kissa-about-split">
                        <div className="kissa-about-split-content">
                            <span className="kissa-about-header-kicker">
                                THE ORIGIN STORY
                            </span>
                            <h2
                                id="story-behind-name-title"
                                className="kissa-about-header-title"
                                style={{ margin: "0 0 8px" }}
                            >
                                The Story Behind the Name
                            </h2>
                            <p className="kissa-about-split-p">
                                Some beginnings arrive loudly. Most don’t. Usually it’s quieter
                                than that an offer letter you read twice to be sure, a key to
                                a city you don’t know yet, your first ever customer, or a plain
                                morning when you decide to try again. You don’t always have the
                                words for what’s happening. You just know something has started
                                to move.
                            </p>
                            <div className="kissa-about-quote-box">
                                <p>
                                    “That feeling is where KISSA began. We kept coming back to
                                    one question: what if a perfume could hold a memory the way a
                                    book holds a story? Everything else grew from there a
                                    fragrance house where every scent is a chapter, and every
                                    chapter leaves a little room for yours.”
                                </p>
                            </div>
                        </div>

                        <div className="kissa-about-media-box">
                            <img
                                src="/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg"
                                alt="KISSA hardcover perfume book and atelier fragrance flacon"
                                loading="lazy"
                            />
                            <span className="kissa-about-media-tag">
                                Chapter & Memory
                            </span>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    4. Why KISSA Exists
                    ------------------------------------------------------------- */}
                <section
                    id="why-kissa-exists"
                    className="kissa-about-section"
                    aria-labelledby="why-kissa-exists-title"
                >
                    <div className="kissa-about-header">
                        <span className="kissa-about-header-kicker">
                            OUR CORE PILLARS
                        </span>
                        <h2
                            id="why-kissa-exists-title"
                            className="kissa-about-header-title"
                        >
                            Why KISSA Exists
                        </h2>
                        <p className="kissa-about-header-desc">
                            Three things sit at the heart of everything we make:
                        </p>
                    </div>

                    <div className="kissa-about-pillars-grid">
                        {/* Courage */}
                        <div className="kissa-about-pillar-card">
                            <div className="kissa-about-pillar-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 25 L10 18 L14 22 L20 10 L28 25" />
                                    <path d="M20 10 V5 L25 7.5 L20 10" fill="currentColor" fillOpacity="0.25" />
                                </svg>
                            </div>
                            <h3 className="kissa-about-pillar-title">Courage</h3>
                            <p className="kissa-about-pillar-desc">
                                Because deciding to begin, before you know how it ends, is worth
                                celebrating.
                            </p>
                        </div>

                        {/* Connection */}
                        <div className="kissa-about-pillar-card">
                            <div className="kissa-about-pillar-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11.5" cy="11.5" r="3.5" />
                                    <circle cx="20.5" cy="11.5" r="3.5" />
                                    <path d="M6 24.5 C6 20.5 9 18 13 18 C15 18 16.5 19 17.5 20.5 C18.5 19 20 18 22 18 C26 18 29 20.5 29 24.5" />
                                </svg>
                            </div>
                            <h3 className="kissa-about-pillar-title">Connection</h3>
                            <p className="kissa-about-pillar-desc">
                                Because a gift means more when it carries your own words.
                            </p>
                        </div>

                        {/* Memory */}
                        <div className="kissa-about-pillar-card">
                            <div className="kissa-about-pillar-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 9 C13 7 9 7 5 9 V24 C9 22 13 22 16 24 C19 22 23 22 27 24 V9 C23 7 19 7 16 9 Z" />
                                    <line x1="16" y1="9" x2="16" y2="24" />
                                </svg>
                            </div>
                            <h3 className="kissa-about-pillar-title">Memory</h3>
                            <p className="kissa-about-pillar-desc">
                                Because some moments deserve a scent you can come back to.
                            </p>
                        </div>
                    </div>

                    <div className="kissa-about-pillars-summary">
                        Buy it for yourself, or for someone whose next chapter you believe in.
                        Either way, it’s made to mark the moment and to stay with you long after.
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    5. How KISSA Works — Read, Wear, Write
                    ------------------------------------------------------------- */}
                <section
                    id="how-kissa-works"
                    className="kissa-about-section"
                    aria-labelledby="how-it-works-title"
                >
                    <div className="kissa-about-header">
                        <span className="kissa-about-header-kicker">
                            THE THREE-STEP RITUAL
                        </span>
                        <h2 id="how-it-works-title" className="kissa-about-header-title">
                            How KISSA Works — Read, Wear, Write
                        </h2>
                        <p className="kissa-about-header-desc">
                            A KISSA isn’t a bottle you unbox. It’s something you move through:
                        </p>
                    </div>

                    <div className="kissa-about-ritual-grid">
                        {/* 01: Read */}
                        <div className="kissa-about-ritual-card">
                            <div className="kissa-about-ritual-top">
                                <span className="kissa-about-ritual-step">STEP 01</span>
                                <span className="kissa-about-ritual-meta">5 Short Pages</span>
                            </div>
                            <h3 className="kissa-about-ritual-title">Read</h3>
                            <p className="kissa-about-ritual-desc">
                                Open the book and turn through five short pages, written for
                                someone standing right at the start of something new.
                            </p>
                        </div>

                        {/* 02: Write */}
                        <div className="kissa-about-ritual-card">
                            <div className="kissa-about-ritual-top">
                                <span className="kissa-about-ritual-step">STEP 02</span>
                                <span className="kissa-about-ritual-meta">2 Blank Pages</span>
                            </div>
                            <h3 className="kissa-about-ritual-title">Write</h3>
                            <p className="kissa-about-ritual-desc">
                                Two pages are left blank on purpose. One for a message, one for
                                the hope or goal you’re carrying into what’s next.
                            </p>
                        </div>

                        {/* 03: Wear */}
                        <div className="kissa-about-ritual-card">
                            <div className="kissa-about-ritual-top">
                                <span className="kissa-about-ritual-step">STEP 03</span>
                                <span className="kissa-about-ritual-meta">Fitted Compartment</span>
                            </div>
                            <h3 className="kissa-about-ritual-title">Wear</h3>
                            <p className="kissa-about-ritual-desc">
                                Lift the fragrance from its compartment, and wear the scent of
                                your own beginning.
                            </p>
                        </div>
                    </div>

                    <div className="kissa-about-microline-banner">
                        <span className="kissa-about-microline-star" aria-hidden="true">✦</span>
                        <p className="kissa-about-microline-text">
                            Read a story. Wear its scent. Write your own.
                        </p>
                        <span className="kissa-about-microline-star" aria-hidden="true">✦</span>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    6. Our First Chapter: NAYA PANNA
                    ------------------------------------------------------------- */}
                <section
                    id="our-first-chapter-naya-panna"
                    className="kissa-about-section"
                    aria-labelledby="naya-panna-title"
                >
                    <div className="kissa-about-chapter-card">
                        <div className="kissa-about-chapter-media">
                            <span className="kissa-about-chapter-badge">Chapter 01</span>
                            <img
                                src="/landing-pages/meng-to-sketchbook/naya-panna.png"
                                alt="NAYA PANNA Eau de Parfum by KISSA"
                                loading="lazy"
                            />
                        </div>

                        <div className="kissa-about-chapter-content">
                            <span className="kissa-about-chapter-kicker">
                                DEBUT CHAPTER 01
                            </span>
                            <h2 id="naya-panna-title" className="kissa-about-chapter-title">
                                Our First Chapter: NAYA PANNA
                            </h2>
                            <p className="kissa-about-chapter-desc">
                                Our debut fragrance, NAYA PANNA (Chapter 01), is made for new
                                beginnings bright at first, soft in the middle, and warm in a
                                way that lingers.
                            </p>

                            <div className="kissa-about-signature-strip">
                                <span className="kissa-about-signature-label">
                                    Signature Accord
                                </span>
                                <span className="kissa-about-signature-val">
                                    Green cardamom · White tea · Sandalwood
                                </span>
                            </div>

                            <div className="kissa-about-pyramid-grid">
                                <div className="kissa-about-pyramid-row">
                                    <span className="kissa-about-pyramid-tier">Opening</span>
                                    <span className="kissa-about-pyramid-notes">
                                        Bergamot, green mandarin, green cardamom
                                    </span>
                                </div>
                                <div className="kissa-about-pyramid-row">
                                    <span className="kissa-about-pyramid-tier">Heart</span>
                                    <span className="kissa-about-pyramid-notes">
                                        White tea, neroli, a transparent jasmine
                                    </span>
                                </div>
                                <div className="kissa-about-pyramid-row">
                                    <span className="kissa-about-pyramid-tier">Base</span>
                                    <span className="kissa-about-pyramid-notes">
                                        Sandalwood, clean musk, soft amber
                                    </span>
                                </div>
                            </div>

                            <div className="kissa-about-details-strip">
                                <span className="kissa-about-detail-pill">50 ml</span>
                                <span className="kissa-about-detail-pill">Unisex</span>
                                <span className="kissa-about-detail-pill">Eau de Parfum</span>
                                <span className="kissa-about-detail-pill">₹1,500–2,000</span>
                            </div>

                            <div className="kissa-about-chapter-actions">
                                <Link to="/shop" className="kissa-about-btn-primary">
                                    Discover NAYA PANNA →
                                </Link>
                                <Link to="/gifting" className="kissa-about-btn-secondary">
                                    Gift a KISSA →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    7. What We Stand For
                    ------------------------------------------------------------- */}
                <section
                    id="what-we-stand-for"
                    className="kissa-about-section"
                    aria-labelledby="what-we-stand-for-title"
                >
                    <div className="kissa-about-header">
                        <span className="kissa-about-header-kicker">
                            OUR ETHOS & COMMITMENT
                        </span>
                        <h2
                            id="what-we-stand-for-title"
                            className="kissa-about-header-title"
                        >
                            What We Stand For
                        </h2>
                        <p className="kissa-about-header-desc">
                            KISSA is contemporary Indian perfumery modern and rooted at the same
                            time, and personal by design.
                        </p>
                    </div>

                    <div className="kissa-about-manifesto-grid">
                        <div className="kissa-about-manifesto-card">
                            <span className="kissa-about-manifesto-num">01</span>
                            <h3 className="kissa-about-manifesto-title">Special, Not Disposable</h3>
                            <p className="kissa-about-manifesto-desc">
                                We think a good fragrance should feel special without feeling
                                precious or disposable.
                            </p>
                        </div>

                        <div className="kissa-about-manifesto-card">
                            <span className="kissa-about-manifesto-num">02</span>
                            <h3 className="kissa-about-manifesto-title">Personal by Design</h3>
                            <p className="kissa-about-manifesto-desc">
                                We think a gift is better when it carries something of you.
                            </p>
                        </div>

                        <div className="kissa-about-manifesto-card">
                            <span className="kissa-about-manifesto-num">03</span>
                            <h3 className="kissa-about-manifesto-title">Remembered Scents</h3>
                            <p className="kissa-about-manifesto-desc">
                                And we think the finest scents aren’t just worn they’re remembered.
                            </p>
                        </div>

                        <div className="kissa-about-manifesto-card">
                            <span className="kissa-about-manifesto-num">04</span>
                            <h3 className="kissa-about-manifesto-title">Modern & Rooted</h3>
                            <p className="kissa-about-manifesto-desc">
                                Contemporary Indian sensibilities crafted with heritage botanical
                                ingredients and evocative storytelling.
                            </p>
                        </div>
                    </div>

                    <div className="kissa-about-manifesto-promise">
                        <p>
                            So we keep every KISSA honest: a real fragrance, a real book, a real
                            moment you can return to.
                        </p>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    8. Who KISSA Is For
                    ------------------------------------------------------------- */}
                <section
                    id="who-kissa-is-for"
                    className="kissa-about-section"
                    aria-labelledby="who-kissa-is-for-title"
                >
                    <div className="kissa-about-audience-card">
                        <div className="kissa-about-header">
                            <span className="kissa-about-header-kicker">
                                INTENDED FOR DEFINING MOMENTS
                            </span>
                            <h2
                                id="who-kissa-is-for-title"
                                className="kissa-about-header-title"
                            >
                                Who KISSA Is For
                            </h2>
                            <p className="kissa-about-header-desc">
                                KISSA is for anyone women and men alike with a beginning worth
                                marking, and a soft spot for scent, design, and gifts that
                                actually mean something.
                            </p>
                        </div>

                        <div className="kissa-about-audience-grid">
                            <div className="kissa-about-audience-block">
                                <span className="kissa-about-audience-label">
                                    FOR YOURSELF
                                </span>
                                <h4>Your Own Turning Point</h4>
                                <p>
                                    Maybe that’s you, stepping into a new role, a new place, or
                                    a newer version of yourself.
                                </p>
                            </div>

                            <div className="kissa-about-audience-block">
                                <span className="kissa-about-audience-label">
                                    FOR SOMEONE YOU LOVE
                                </span>
                                <h4>Believing in Their Chapter</h4>
                                <p>
                                    Or maybe it’s someone you love a friend moving away, a sibling
                                    off to college, a partner finally building their own thing.
                                    Wherever there’s a next chapter to celebrate, there’s a KISSA
                                    for it.
                                </p>
                            </div>
                        </div>

                        <div className="kissa-about-audience-dedication">
                            <span>Unke agle chapter ke naam.</span>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    9. The Road Ahead — Chapters of Life
                    ------------------------------------------------------------- */}
                <section
                    id="the-road-ahead"
                    className="kissa-about-section"
                    aria-labelledby="road-ahead-title"
                >
                    <div className="kissa-about-roadmap-card">
                        <div className="kissa-about-header">
                            <span className="kissa-about-header-kicker">
                                AN EXPANDING LIBRARY
                            </span>
                            <h2 id="road-ahead-title" className="kissa-about-header-title">
                                The Road Ahead — Chapters of Life
                            </h2>
                            <p className="kissa-about-header-desc">
                                NAYA PANNA is only Chapter 01. KISSA is built to grow into a
                                collection Chapters of Life a slowly expanding library of
                                fragrances, each tied to a different beginning or turning point.
                                As the collection grows, so does the story. Because the book
                                was never really about the beginning on its pages. It’s about
                                yours.
                            </p>
                        </div>

                        <div className="kissa-about-roadmap-shelf">
                            <div className="kissa-about-book-spine is-active">
                                <span className="kissa-about-book-num">CHAPTER 01</span>
                                <h3 className="kissa-about-book-title">NAYA PANNA</h3>
                                <span className="kissa-about-book-status">Available Now</span>
                            </div>

                            <div className="kissa-about-book-spine">
                                <span className="kissa-about-book-num">CHAPTER 02</span>
                                <h3 className="kissa-about-book-title">In Creation</h3>
                                <span className="kissa-about-book-status">Turning Point</span>
                            </div>

                            <div className="kissa-about-book-spine">
                                <span className="kissa-about-book-num">CHAPTER 03</span>
                                <h3 className="kissa-about-book-title">In Creation</h3>
                                <span className="kissa-about-book-status">The Journey</span>
                            </div>

                            <div className="kissa-about-book-spine">
                                <span className="kissa-about-book-num">YOUR CHAPTER</span>
                                <h3 className="kissa-about-book-title">Blank Page</h3>
                                <span className="kissa-about-book-status">Yours to Write</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    10. Frequently Asked Questions
                    ------------------------------------------------------------- */}
                <section
                    id="faqs"
                    className="kissa-about-section"
                    aria-labelledby="about-faqs-title"
                >
                    <div className="kissa-about-header">
                        <span className="kissa-about-header-kicker">
                            COMMON QUERIES
                        </span>
                        <h2 id="about-faqs-title" className="kissa-about-header-title">
                            Frequently Asked Questions
                        </h2>
                        <p className="kissa-about-header-desc">
                            Clear answers about the house of KISSA, our book presentation, and
                            NAYA PANNA.
                        </p>
                    </div>

                    <div className="kissa-about-faq-container">
                        {ABOUT_FAQS.map((item) => {
                            const isOpen = openFaqIds.has(item.id);
                            const headingId = `${faqBaseId}-${item.id}-heading`;
                            const panelId = `${faqBaseId}-${item.id}-panel`;

                            return (
                                <div
                                    key={item.id}
                                    className={`kissa-about-faq-item ${isOpen ? "is-open" : ""}`}
                                >
                                    <button
                                        type="button"
                                        id={headingId}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="kissa-about-faq-trigger"
                                        onClick={() => toggleFaq(item.id)}
                                    >
                                        <h3 className="kissa-about-faq-question">
                                            {item.question}
                                        </h3>
                                        <span className="kissa-about-faq-icon" aria-hidden="true">
                                            +
                                        </span>
                                    </button>

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={headingId}
                                        className="kissa-about-faq-answer"
                                    >
                                        <div className="kissa-about-faq-answer-inner">
                                            <p className="kissa-about-faq-answer-text">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    11. CTA
                    ------------------------------------------------------------- */}
                <section
                    className="kissa-about-cta-card"
                    aria-labelledby="about-cta-heading"
                >
                    <h2 id="about-cta-heading" className="kissa-about-cta-hindi">
                        Agla panna tumhara hai.
                    </h2>
                    <p className="kissa-about-cta-sub">
                        The next page is yours to write.
                    </p>
                    <p className="kissa-about-cta-desc">
                        Start your own chapter or hand one to someone just beginning theirs.
                    </p>

                    <div className="kissa-about-cta-actions">
                        <Link to="/shop" className="kissa-about-btn-primary">
                            Discover NAYA PANNA
                        </Link>
                        <Link to="/gifting" className="kissa-about-btn-secondary">
                            Gift a KISSA
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
