import { useState } from "react";
import type { Route } from "./+types/gifting";
import { Layout } from "../components/Layout";
import { storefrontContext } from "../lib/context";
import { getShopProducts, type ShopProduct } from "../lib/products";
import type { GiftingOccasion } from "../lib/gifting";

// 12 Sections of the KISSA Gifting Page:
// Section 1: Hero
import { GiftingHero } from "../components/gifting/GiftingHero";
// Section 2: Quick Answer Block (At a Glance)
import { GiftingQuickAnswer } from "../components/gifting/GiftingQuickAnswer";
// Section 3: Why KISSA (Courage, Connection, Memory)
import { GiftingWhyKissa } from "../components/gifting/GiftingWhyKissa";
// Section 4: What's Inside (Hardcover Book, 5 Stories, 2 Writing Pages, Bottle)
import { GiftingWhatsInside } from "../components/gifting/GiftingWhatsInside";
// Section 5: How It Works (Read, Write, Wear)
import { GiftingHowItWorks } from "../components/gifting/GiftingHowItWorks";
// Section 6: Occasions (7 Moments for New Beginnings)
import { GiftingOccasions } from "../components/gifting/GiftingOccasions";
// Section 7: The Scent (NAYA PANNA Notes & Olfactory Pyramid)
import { GiftingTheScent } from "../components/gifting/GiftingTheScent";
// Section 8: Unisex (For him, her, anyone)
import { GiftingUnisex } from "../components/gifting/GiftingUnisex";
// Section 9: Message Ideas (6 Handpicked Messages)
import { GiftingMessageIdeas } from "../components/gifting/GiftingMessageIdeas";
// Section 10: Gifting Details & Interactive Customizer (Price, Delivery, Ritual)
import { GiftingBuilder } from "../components/gifting/GiftingBuilder";
// Corporate Concierge (Bulk Gifting)
import { CorporateGifting } from "../components/gifting/CorporateGifting";
// Section 11: FAQs (All 10 FAQs)
import { GiftingFAQ } from "../components/gifting/GiftingFAQ";
// Section 12: Closing CTA (Agla Panna Tumhara Hai)
import { GiftingClosingCTA } from "../components/gifting/GiftingClosingCTA";

// -------------------------------------------------------------
// Loader: Server-side Fetch with Fallback
// -------------------------------------------------------------
export async function loader({ context }: Route.LoaderArgs) {
    const storefront = context.get(storefrontContext);
    const result = await getShopProducts(storefront);

    return {
        products: result.products,
        isSingleProduct: result.isSingleProduct,
        source: result.source,
    };
}

// -------------------------------------------------------------
// SEO Meta Tags
// -------------------------------------------------------------
export const meta: Route.MetaFunction = () => {
    const title =
        "A Perfume Gift for Someone's Next Chapter · NAYA PANNA Unisex Perfume | KISSA";
    const description =
        "A real book, your handwritten words, and NAYA PANNA, a 50 ml unisex perfume for new beginnings. Five story pages, two personal writing pages, and the fragrance.";
    const keywords =
        "perfume gift, unisex perfume gift, perfume gift for him, perfume gift for her, new job gift, moving city gift, graduation gift, KISSA, NAYA PANNA, perfume gift box, fragrance gift set India";

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: "https://kissa-parfums.com/gifting" },
        {
            property: "og:image",
            content: "https://kissa-parfums.com/naya-panna-unisex-perfume-50ml-kissa.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
            name: "twitter:image",
            content: "https://kissa-parfums.com/naya-panna-unisex-perfume-50ml-kissa.png",
        },
    ];
};

// -------------------------------------------------------------
// Structured Data (JSON-LD)
// -------------------------------------------------------------
const giftingSchemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Product",
            name: "KISSA NAYA PANNA 50 ml Unisex Perfume Gift Box",
            brand: { "@type": "Brand", name: "KISSA" },
            description:
                "A book-style perfume gift with five story pages, two writing pages and NAYA PANNA, a 50 ml unisex fragrance with cardamom, white tea and sandalwood.",
            image: "https://kissa-parfums.com/naya-panna-unisex-perfume-50ml-kissa.png",
            offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: "1800",
                availability: "https://schema.org/InStock",
                url: "https://kissa-parfums.com/gifting",
            },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://kissa-parfums.com",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Gifting",
                    item: "https://kissa-parfums.com/gifting",
                },
            ],
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What comes inside the KISSA gift box?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "A bound hardcover book with five short story pages, two writing pages and a 50 ml bottle of NAYA PANNA perfume in a fitted compartment.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Is NAYA PANNA a unisex perfume?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. NAYA PANNA is a unisex perfume with a fresh citrus, cardamom and white tea opening and a creamy sandalwood and musk base.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What does NAYA PANNA smell like?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Fresh, airy and softly warm: bergamot, green mandarin and cardamom, then white tea, neroli and light jasmine, settling into sandalwood, musk, soft amber and vetiver.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can I write a personal message in the KISSA gift?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. The book has a page for your handwritten message and a second page where the receiver writes their own next goal.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Is KISSA an Indian brand?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. KISSA is a contemporary Indian perfume brand that turns life chapters into fragrances. NAYA PANNA is Chapter 01.",
                    },
                },
            ],
        },
    ],
};

// -------------------------------------------------------------
// Main Gifting Page Component
// -------------------------------------------------------------
export default function GiftingPage({ loaderData }: Route.ComponentProps) {
    const { products } = loaderData;
    const product: ShopProduct | undefined = products?.[0];

    // State for interactive connection between sections
    const [selectedOccasion, setSelectedOccasion] =
        useState<GiftingOccasion | null>(null);
    const [prefilledMessage, setPrefilledMessage] = useState<string>("");

    const handleSelectOccasion = (occ: GiftingOccasion) => {
        setSelectedOccasion(occ);
    };

    const handleResetOccasion = () => {
        setSelectedOccasion(null);
    };

    const handleSelectMessage = (text: string) => {
        setPrefilledMessage(text);
    };

    const scrollToCustomizer = () => {
        const el = document.getElementById("build-your-gift");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const scrollToWhatsInside = () => {
        const el = document.getElementById("whats-inside");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Layout>
            {/* JSON-LD Structured Data Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(giftingSchemaJsonLd),
                }}
            />

            <div className="kissa-gifting-container">
                {/* Section 1: Hero */}
                <GiftingHero
                    onGiftClick={scrollToCustomizer}
                    onInsideClick={scrollToWhatsInside}
                />

                {/* Section 2: Quick Answer Block (At a Glance) */}
                <GiftingQuickAnswer />

                {/* Section 3: Why KISSA (Courage, Connection, Memory) */}
                <GiftingWhyKissa />

                {/* Section 4: What's Inside (Book, Stories, Writing Pages, Flacon) */}
                <GiftingWhatsInside />

                {/* Section 5: How It Works: Read, Write, Wear */}
                <GiftingHowItWorks />

                {/* Section 6: Occasions (7 Moments for New Beginnings) */}
                <GiftingOccasions
                    selectedOccasionId={selectedOccasion?.id}
                    onSelectOccasion={handleSelectOccasion}
                />

                {/* Section 7: The Scent (NAYA PANNA Notes & Olfactory Pyramid) */}
                <GiftingTheScent />

                {/* Section 8: Unisex (Him, Her, Anyone) */}
                <GiftingUnisex />

                {/* Section 9: Message Ideas */}
                <GiftingMessageIdeas onSelectMessage={handleSelectMessage} />

                {/* Section 10: Gifting Details & Interactive Customizer */}
                <GiftingBuilder
                    product={product}
                    selectedOccasion={selectedOccasion}
                    initialMessage={prefilledMessage}
                    onResetOccasion={handleResetOccasion}
                />

                {/* Corporate Concierge & Bulk Gifting */}
                <CorporateGifting />

                {/* Section 11: FAQs */}
                <GiftingFAQ />

                {/* Section 12: Closing CTA (Agla Panna Tumhara Hai) */}
                <GiftingClosingCTA onGiftClick={scrollToCustomizer} />
            </div>
        </Layout>
    );
}
