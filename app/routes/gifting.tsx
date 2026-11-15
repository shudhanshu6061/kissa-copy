import { useState } from "react";
import type { Route } from "./+types/gifting";
import { Layout } from "../components/Layout";
import { storefrontContext } from "../lib/context";
import { getShopProducts, type ShopProduct } from "../lib/products";
import type { GiftingOccasion } from "../lib/gifting";

// Gifting Page Sections in Required Order:
// 1. Hero
// 2. Gift by Occasion
// 3. Build Your Gift
// 4. Why Gift KISSA
// 5. Corporate and Bulk Gifting
// 6. Gifting FAQ accordion
import { GiftingHero } from "../components/gifting/GiftingHero";
import { GiftingOccasions } from "../components/gifting/GiftingOccasions";
import { GiftingBuilder } from "../components/gifting/GiftingBuilder";
import { GiftingBenefits } from "../components/gifting/GiftingBenefits";
import { CorporateGifting } from "../components/gifting/CorporateGifting";
import { GiftingFAQ } from "../components/gifting/GiftingFAQ";

// -------------------------------------------------------------
// Loader: Server-side Fetch with Fallback (Reusing Shop Service)
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
// SEO Meta Tags with Gifting Keywords
// -------------------------------------------------------------
export const meta: Route.MetaFunction = () => {
    const title =
        "The Art of Gifting Fragrance · Bespoke Perfume Gifts & Calligraphy | KISSA";
    const description =
        "Give the gift of an unforgettable scent memory. Artisanal 28% Extrait de Parfum in numbered flacons with complimentary wax-sealed calligraphy message, luxury gift wrap, and discreet pan-India delivery.";
    const keywords =
        "luxury perfume gifting, fragrance gift set, bespoke perfume gifts, wedding perfume favors, Diwali corporate gifting India, anniversary fragrance gift, personalized perfume calligraphy, discreet gift shipping, bespoke fragrance memories";

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://kissa-parfums.com/gifting" },
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

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export default function GiftingPage({ loaderData }: Route.ComponentProps) {
    const { products } = loaderData;
    const product: ShopProduct = products?.[0];

    const [selectedOccasion, setSelectedOccasion] =
        useState<GiftingOccasion | null>(null);

    const handleSelectOccasion = (occ: GiftingOccasion) => {
        setSelectedOccasion(occ);
    };

    const handleResetOccasion = () => {
        setSelectedOccasion(null);
    };

    return (
        <Layout>
            <div className="kissa-gifting-container">
                {/* 1. Hero: emotional headline about gifting a fragrance, lifestyle image, CTA */}
                <GiftingHero />

                {/* 2. Gift by Occasion: Birthday, Anniversary, Wedding, Festive, Thank You, Just Because */}
                <GiftingOccasions
                    selectedOccasionId={selectedOccasion?.id}
                    onSelectOccasion={handleSelectOccasion}
                />

                {/* 3. Build Your Gift: perfume flacon, gift wrap toggle, message card with counter, sender name, attributes */}
                <GiftingBuilder
                    product={product}
                    selectedOccasion={selectedOccasion}
                    onResetOccasion={handleResetOccasion}
                />

                {/* 4. Why Gift KISSA: 4 benefit cards */}
                <GiftingBenefits />

                {/* 5. Corporate and Bulk Gifting: short pitch plus enquiry form with validation & success state */}
                <CorporateGifting />

                {/* 6. Gifting FAQ accordion */}
                <GiftingFAQ />
            </div>
        </Layout>
    );
}
