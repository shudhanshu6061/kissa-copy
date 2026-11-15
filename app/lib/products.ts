import { gql, type StorefrontClient } from "@shopify/hydrogen";

export interface ProductVariant {
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
        amount: string;
        currencyCode: string;
    };
    compareAtPrice?: {
        amount: string;
        currencyCode: string;
    } | null;
    selectedOptions: Array<{
        name: string;
        value: string;
    }>;
    sku?: string | null;
}

export interface ProductImage {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
}

export interface NoteDetail {
    name: string;
    description: string;
    icon: string;
}

export interface FragrancePyramid {
    top: NoteDetail[];
    heart: NoteDetail[];
    base: NoteDetail[];
}

export interface StoryChapter {
    chapterNumber: string;
    title: string;
    quote?: string;
    text: string[];
    imageUrl: string;
    imageAlt: string;
}

export interface ReviewItem {
    id: string;
    author: string;
    location: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    verified: boolean;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: "longevity" | "sillage" | "safety" | "shipping" | "returns" | "authenticity";
}

export interface HowToWearStep {
    step: number;
    title: string;
    instruction: string;
    tip: string;
    icon: string;
}

export interface ShopProduct {
    id: string;
    title: string;
    handle: string;
    editionBadge: string;
    concentration: string;
    sillage: string;
    shortTagline: string;
    description: string;
    featuredImage: ProductImage;
    images: ProductImage[];
    priceRange: {
        minVariantPrice: { amount: string; currencyCode: string };
        maxVariantPrice: { amount: string; currencyCode: string };
    };
    variants: ProductVariant[];
    // Editorial Story & Sales Enhancements
    story: StoryChapter[];
    notes: FragrancePyramid;
    howToWear: HowToWearStep[];
    reviews: {
        averageRating: number;
        reviewCount: number;
        breakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
        items: ReviewItem[];
    };
    faqs: FAQItem[];
    trustBadges: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
    }>;
}

// -------------------------------------------------------------
// GraphQL Query for Products
// -------------------------------------------------------------
export const SINGLE_PRODUCT_QUERY = gql(`
    query ShopProducts($first: Int!) {
        products(first: $first) {
            nodes {
                id
                title
                handle
                description
                productType
                tags
                featuredImage {
                    url
                    altText
                    width
                    height
                }
                images(first: 10) {
                    nodes {
                        url
                        altText
                        width
                        height
                    }
                }
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                }
                variants(first: 10) {
                    nodes {
                        id
                        title
                        availableForSale
                        sku
                        price {
                            amount
                            currencyCode
                        }
                        compareAtPrice {
                            amount
                            currencyCode
                        }
                        selectedOptions {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`);

// -------------------------------------------------------------
// High-Fidelity Local Mock Data Fallback
// -------------------------------------------------------------
export const MOCK_LAUNCH_PRODUCT: ShopProduct = {
    id: "gid://shopify/Product/kissa-naya-panna-01",
    title: "NAYA PANNA",
    handle: "naya-panna",
    editionBadge: "EDITION N° 01 · MONSOON BOTANICA",
    concentration: "Extrait de Parfum · 28% Precious Botanical Concentration",
    sillage: "12+ Hours Wear · Radiant Intimate Sillage",
    shortTagline: "A new chapter written in emerald petrichor, wild-harvested green cardamom, and sacred aged Mysore sandalwood. [EDIT]",
    description: "Born of wild equatorial extracts, ancient temple resins, and living watercolors. NAYA PANNA opens with a crisp burst of dew-drenched emerald leaves and crushed cardamom, unfolding into white floral heart accords before resting upon a warm, smoked sandalwood and amber foundation.",
    featuredImage: {
        url: "/landing-pages/meng-to-sketchbook/naya-panna.png",
        altText: "KISSA NAYA PANNA Extrait de Parfum flacon bottle",
        width: 800,
        height: 1000,
    },
    images: [
        {
            url: "/landing-pages/meng-to-sketchbook/naya-panna.png",
            altText: "NAYA PANNA Extrait Flacon Front View",
            width: 800,
            height: 1000,
        },
        {
            url: "/landing-pages/meng-to-sketchbook/bloom.png",
            altText: "Botanical Floral & Green Accord Pigment Study",
            width: 800,
            height: 1000,
        },
        {
            url: "/landing-pages/meng-to-sketchbook/kissa-perfume-flacon.jpg",
            altText: "KISSA Numbered Glass Flacon with Brass Stopper",
            width: 800,
            height: 1000,
        },
        {
            url: "/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg",
            altText: "The Botanical Distillation Atelier in Grasse & Mysore",
            width: 800,
            height: 1000,
        },
        {
            url: "/landing-pages/meng-to-sketchbook/kissa-discovery-set.jpg",
            altText: "Discovery Miniature Wardrobe in Wax-Sealed Linen Coffret",
            width: 800,
            height: 1000,
        },
    ],
    priceRange: {
        minVariantPrice: { amount: "4950", currencyCode: "INR" },
        maxVariantPrice: { amount: "7450", currencyCode: "INR" },
    },
    variants: [
        {
            id: "gid://shopify/ProductVariant/np-50ml",
            title: "50ml Extrait Flacon",
            availableForSale: true,
            sku: "KISSA-NP-50ML",
            price: { amount: "4950", currencyCode: "INR" },
            compareAtPrice: { amount: "5500", currencyCode: "INR" },
            selectedOptions: [{ name: "Size", value: "50ml" }],
        },
        {
            id: "gid://shopify/ProductVariant/np-100ml",
            title: "100ml Grand Flacon",
            availableForSale: true,
            sku: "KISSA-NP-100ML",
            price: { amount: "7450", currencyCode: "INR" },
            compareAtPrice: { amount: "8200", currencyCode: "INR" },
            selectedOptions: [{ name: "Size", value: "100ml" }],
        },
        {
            id: "gid://shopify/ProductVariant/np-2ml",
            title: "2ml Travel Atomiser",
            availableForSale: true,
            sku: "KISSA-NP-2ML",
            price: { amount: "450", currencyCode: "INR" },
            compareAtPrice: null,
            selectedOptions: [{ name: "Size", value: "2ml Sample" }],
        },
    ],
    trustBadges: [
        {
            id: "shipping",
            title: "Free Express Shipping",
            description: "Delivered in 2–4 business days via carbon-neutral courier across India.",
            icon: "shipping",
        },
        {
            id: "cod",
            title: "Cash on Delivery",
            description: "Pay securely at your doorstep across 19,000+ Indian postal codes.",
            icon: "cod",
        },
        {
            id: "sample",
            title: "Complimentary Sample",
            description: "Test the 2ml vial included before unwrapping your full flacon.",
            icon: "sample",
        },
        {
            id: "authentic",
            title: "Hand-Numbered Editions",
            description: "Small-batch steam distilled, individually numbered with wax seal.",
            icon: "seal",
        },
    ],
    story: [
        {
            chapterNumber: "CHAPTER 01",
            title: "The Petrichor of a New Chapter [EDIT]",
            quote: "“The scent of rain upon sunbaked red earth before the temple bells ring.”",
            text: [
                "NAYA PANNA is a homage to renewal — the first drop of precipitation that awakens dormant forest canopies. Conceived during dawn walks across Nilgiri spice terraces, it captures the breathless stillness that precedes an equatorial downpour.",
                "Unlike conventional commercial perfumes built upon alcohol diluents, NAYA PANNA is composed in an artisanal 28% Extrait de Parfum strength, utilizing natural steam distillations that bloom uniquely against your skin temperature.",
            ],
            imageUrl: "/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg",
            imageAlt: "KISSA botanical perfume distillation copper alembics",
        },
        {
            chapterNumber: "CHAPTER 02",
            title: "Sacred Woods & Rare Spices [EDIT]",
            quote: "“Sustainably sourced Mysore sandalwood aged eighteen months in dark glass.”",
            text: [
                "At the foundation of this formulation rests ethically cultivated sandalwood from Karnataka heartwood trees, slowly cold-extracted and aged in darkened glass carboys for eighteen months to soften sharp edges into buttered creaminess.",
                "Bright green cardamom pods, crushed by hand within hours of picking, impart an intoxicating spicy luminescence that balances velvety base resins throughout the day and evening.",
            ],
            imageUrl: "/landing-pages/meng-to-sketchbook/naya-panna.png",
            imageAlt: "Handcrafted glass flacon with wax sealing cord",
        },
    ],
    notes: {
        top: [
            {
                name: "Crushed Green Cardamom",
                description: "Spicy, invigorating, and citrusy morning freshness harvested from shaded plantation slopes.",
                icon: "✦",
            },
            {
                name: "Airy White Tea & Calamondin",
                description: "Dew-drenched white tea buds with a gentle sparkle of sunlit bitter citrus zest.",
                icon: "✦",
            },
            {
                name: "Monsoon Petrichor",
                description: "The evocative mineral accord of cool water striking baked clay stones.",
                icon: "✦",
            },
        ],
        heart: [
            {
                name: "Vanda Orchid Blossoms",
                description: "Velvety botanical petals with delicate nectar undertones that float above the skin.",
                icon: "◈",
            },
            {
                name: "Nutmeg Leaf & Fresh Ginger",
                description: "Warm, culinary aromatics that bridge botanical freshness into earthy sensuality.",
                icon: "◈",
            },
            {
                name: "Steamed Jasmine Sambac",
                description: "Night-blooming Indian jasmine distilled at midnight for an ethereal floral aura.",
                icon: "◈",
            },
        ],
        base: [
            {
                name: "Aged Mysore Sandalwood",
                description: "Creamy, serene, and deeply grounding heartwood aged 18 months for peerless smoothness.",
                icon: "◆",
            },
            {
                name: "Java Vetiver Roots",
                description: "Smoky, earthy green root fibers that provide tenacity and anchoring longevity.",
                icon: "◆",
            },
            {
                name: "Temple Resin Amber",
                description: "Warm golden benzoin tears and frankincense smoke that linger for over 12 hours.",
                icon: "◆",
            },
        ],
    },
    howToWear: [
        {
            step: 1,
            title: "Pulse Point Awakening [EDIT]",
            instruction: "Hold the flacon 3–5 inches away and spray directly onto pulse zones: inner wrists, base of the throat, and behind earlobes.",
            tip: "Do not rub your wrists together — allowing the oils to air-dry preserves the delicate top cardamom notes.",
            icon: "01",
        },
        {
            step: 2,
            title: "Textile Sillage Halo [EDIT]",
            instruction: "Mist once or twice into the air and step through, or mist the collar of your natural silk, linen, or wool garments.",
            tip: "Because of our high 28% concentration, natural fabrics will softly project the sandalwood heart for up to 48 hours.",
            icon: "02",
        },
        {
            step: 3,
            title: "Evening Reawakening [EDIT]",
            instruction: "Reapply a single touch to the nape of your neck at dusk to re-ignite the warm resinous base notes as evening temperature cools.",
            tip: "Pairs exquisitely with our discovery miniature atomiser for effortless pocket carry.",
            icon: "03",
        },
    ],
    reviews: {
        averageRating: 4.9,
        reviewCount: 148,
        breakdown: { 5: 136, 4: 10, 3: 2, 2: 0, 1: 0 },
        items: [
            {
                id: "rev-1",
                author: "Ananya S. [EDIT]",
                location: "Mumbai, India",
                rating: 5,
                date: "November 2, 2026",
                title: "The sandalwood and cardamom drydown is unmatched",
                content: "I have worn niche French and Middle Eastern extraits for years, but NAYA PANNA is in a league of its own. It smells exactly like morning rain breaking over ancient wood. I sprayed it at 8 AM and could still vividly smell the warm sandalwood at dinner.",
                verified: true,
            },
            {
                id: "rev-2",
                author: "Vikramaditya R. [EDIT]",
                location: "Bengaluru, India",
                rating: 5,
                date: "October 24, 2026",
                title: "Pure elegance — exquisite packaging & longevity",
                content: "The unboxing was breathtaking. Wax-sealed certificate, handwritten calligraphy note, and a weighty glass bottle with real presence. Easily lasts 12+ hours on linen shirts. Ordered the 100ml immediately.",
                verified: true,
            },
            {
                id: "rev-3",
                author: "Devika M. [EDIT]",
                location: "New Delhi, India",
                rating: 5,
                date: "October 15, 2026",
                title: "Compliments from strangers every single time",
                content: "Not loud or synthetic like designer perfumes. It has this intoxicating, clean spicy petrichor aura that makes people ask what I'm wearing. The 2ml sample inclusion was also very thoughtful.",
                verified: true,
            },
        ],
    },
    faqs: [
        {
            id: "faq-longevity",
            category: "longevity",
            question: "How long does NAYA PANNA last on skin and clothing? [EDIT]",
            answer: "Because NAYA PANNA is blended as an Extrait de Parfum with an ultra-high 28% concentration of pure botanical oils, it typically delivers 12 to 14 hours of persistent longevity on skin, and up to 48 hours on natural fabrics like wool, linen, and cashmere.",
        },
        {
            id: "faq-sillage",
            category: "sillage",
            question: "What is the projection and sillage profile? [EDIT]",
            answer: "NAYA PANNA is designed for radiant elegance rather than room-choking projection. It projects distinctly within arm's length (6–8 feet) for the first 4 hours, and dries down into a magnetic, intimate scented aura that lingers closely throughout the day.",
        },
        {
            id: "faq-safety",
            category: "safety",
            question: "Is this formulation safe for sensitive skin? [EDIT]",
            answer: "Yes. All KISSA fragrances are formulated strictly cruelty-free, IFRA compliant, and free from synthetic phthalates, nitro-musks, and harsh artificial dyes. If you have extreme dermal sensitivities, we recommend patch-testing with the included 2ml sample vial first.",
        },
        {
            id: "faq-shipping",
            category: "shipping",
            question: "What are your shipping timelines and COD availability? [EDIT]",
            answer: "We offer complimentary express shipping across all major Indian cities (2–3 business days) and Tier 2/3 locations (3–5 business days). Cash on Delivery (COD) is supported across 19,000+ pin codes nationwide.",
        },
        {
            id: "faq-returns",
            category: "returns",
            question: "What is your 'Discovery Guarantee' and return policy? [EDIT]",
            answer: "Every full-sized flacon order arrives with a complimentary sealed 2ml sample vial of NAYA PANNA. You may test the vial first on your skin. If you feel the scent does not suit your personal body chemistry, you may return the unopened, sealed full-sized flacon within 14 days for a 100% full refund.",
        },
        {
            id: "faq-authenticity",
            category: "authenticity",
            question: "How can I verify the authenticity and batch number of my bottle? [EDIT]",
            answer: "Each KISSA flacon is individually numbered and accompanied by an atelier certificate hand-stamped with the harvest year and distillation lot. You can cross-reference your edition number via our concierge desk at concierge@kissa-parfums.com.",
        },
    ],
};

// -------------------------------------------------------------
// Service Function: Fetch Products with Mock Fallback
// -------------------------------------------------------------
export async function getShopProducts(
    storefrontClient?: StorefrontClient | null
): Promise<{
    products: ShopProduct[];
    isSingleProduct: boolean;
    source: "shopify" | "mock";
}> {
    if (!storefrontClient) {
        return {
            products: [MOCK_LAUNCH_PRODUCT],
            isSingleProduct: true,
            source: "mock",
        };
    }

    try {
        const { data, errors } = await storefrontClient.graphql(
            SINGLE_PRODUCT_QUERY,
            { variables: { first: 8 } }
        );

        if (errors || !data?.products?.nodes || data.products.nodes.length === 0) {
            console.warn(
                "Storefront API returned no products or errors, using local mock fallback:",
                errors
            );
            return {
                products: [MOCK_LAUNCH_PRODUCT],
                isSingleProduct: true,
                source: "mock",
            };
        }

        const nodes = data.products.nodes;

        // If Shopify returns multiple products, map each into our ShopProduct shape
        const mappedProducts: ShopProduct[] = nodes.map((node: any, idx: number) => {
            const rawImages = node.images?.nodes?.length
                ? node.images.nodes
                : node.featuredImage
                ? [node.featuredImage]
                : MOCK_LAUNCH_PRODUCT.images;

            const variants: ProductVariant[] = (node.variants?.nodes || []).map(
                (v: any) => ({
                    id: v.id,
                    title: v.title,
                    availableForSale: Boolean(v.availableForSale),
                    sku: v.sku,
                    price: v.price || { amount: "4950", currencyCode: "INR" },
                    compareAtPrice: v.compareAtPrice,
                    selectedOptions: v.selectedOptions || [],
                })
            );

            return {
                id: node.id,
                title: node.title,
                handle: node.handle,
                editionBadge: `EDITION N° 0${idx + 1} · MAISON ARCHIVE`,
                concentration: MOCK_LAUNCH_PRODUCT.concentration,
                sillage: MOCK_LAUNCH_PRODUCT.sillage,
                shortTagline: node.description
                    ? node.description.slice(0, 110) + "..."
                    : MOCK_LAUNCH_PRODUCT.shortTagline,
                description: node.description || MOCK_LAUNCH_PRODUCT.description,
                featuredImage: node.featuredImage || MOCK_LAUNCH_PRODUCT.featuredImage,
                images: rawImages,
                priceRange: node.priceRange || MOCK_LAUNCH_PRODUCT.priceRange,
                variants: variants.length ? variants : MOCK_LAUNCH_PRODUCT.variants,
                story: MOCK_LAUNCH_PRODUCT.story,
                notes: MOCK_LAUNCH_PRODUCT.notes,
                howToWear: MOCK_LAUNCH_PRODUCT.howToWear,
                reviews: MOCK_LAUNCH_PRODUCT.reviews,
                faqs: MOCK_LAUNCH_PRODUCT.faqs,
                trustBadges: MOCK_LAUNCH_PRODUCT.trustBadges,
            };
        });

        return {
            products: mappedProducts,
            isSingleProduct: mappedProducts.length === 1,
            source: "shopify",
        };
    } catch (err) {
        console.warn("Storefront client query threw error, falling back to mock:", err);
        return {
            products: [MOCK_LAUNCH_PRODUCT],
            isSingleProduct: true,
            source: "mock",
        };
    }
}

