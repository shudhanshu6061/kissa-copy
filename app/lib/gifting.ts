/**
 * KISSA Parfums — Gifting Services & Corporate Concierge Handlers
 */

export interface CorporateEnquiryInput {
    name: string;
    company?: string;
    email: string;
    phone: string;
    quantity: string;
    occasion: string;
    message: string;
}

export interface CorporateEnquiryResult {
    success: boolean;
    message: string;
    error?: string;
}

/**
 * Single typed submission handler for corporate and bulk gifting enquiries.
 * Can be connected to email dispatch (e.g. Resend / SendGrid), CRM (HubSpot/Salesforce),
 * or an internal Shopify Customer/DraftOrder API.
 */
export async function submitCorporateEnquiry(
    data: CorporateEnquiryInput
): Promise<CorporateEnquiryResult> {
    // Simulate brief network latency for smooth UI transition
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validate essential inputs
    if (!data.name || !data.name.trim()) {
        return {
            success: false,
            message: "Please provide your full name.",
            error: "MISSING_NAME",
        };
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return {
            success: false,
            message: "Please provide a valid email address.",
            error: "INVALID_EMAIL",
        };
    }

    if (!data.phone || data.phone.trim().length < 8) {
        return {
            success: false,
            message: "Please provide a valid phone or WhatsApp number.",
            error: "INVALID_PHONE",
        };
    }

    if (!data.quantity) {
        return {
            success: false,
            message: "Please select an estimated quantity.",
            error: "MISSING_QUANTITY",
        };
    }

    // Server-side or dev mock logging
    console.info("[KISSA Gifting Concierge] Received corporate enquiry:", {
        ...data,
        receivedAt: new Date().toISOString(),
    });

    return {
        success: true,
        message:
            "Your bespoke gifting inquiry has been received. Our concierge will contact you within 24 hours. [EDIT]",
    };
}

export interface GiftingOccasion {
    id: string;
    badge: string;
    title: string;
    blurb: string;
    scentHighlight: string;
    icon: string;
}

export const GIFTING_OCCASIONS: GiftingOccasion[] = [
    {
        id: "birthday",
        badge: "CELEBRATION 01",
        title: "Birthday",
        blurb: "A spirited sensory tribute for another trip around the sun. Layered with bright equatorial citrus, crushed green spices, and comforting amber resins. [EDIT]",
        scentHighlight: "Bright Cardamom & Sunlit Citrus",
        icon: "✦",
    },
    {
        id: "anniversary",
        badge: "DEVOTION 02",
        title: "Anniversary",
        blurb: "Marking milestones of quiet devotion with rich, warm Mysore sandalwood, velvety rose petals, and aged bourbon vanilla. [EDIT]",
        scentHighlight: "Aged Sandalwood & Wild Rose",
        icon: "❦",
    },
    {
        id: "wedding",
        badge: "ROYAL FAVORS 03",
        title: "Wedding",
        blurb: "Imperial wedding favors and couple flacons sealed with auspicious red wax, presented with custom couple monograms. [EDIT]",
        scentHighlight: "Imperial Saffron & White Oud",
        icon: "⚜",
    },
    {
        id: "festive",
        badge: "UTSAV 04",
        title: "Festive (Diwali / Rakhi)",
        blurb: "Luminous festive celebrations infused with royal saffron, crushed cardamom, and smoky sacred incense from temple courtyards. [EDIT]",
        scentHighlight: "Monsoon Amber & Royal Cardamom",
        icon: "❂",
    },
    {
        id: "thankyou",
        badge: "GRATITUDE 05",
        title: "Thank You",
        blurb: "A gesture of profound gratitude. Discreet, deeply thoughtful, and presented with a handwritten wax-sealed thank you note. [EDIT]",
        scentHighlight: "Airy White Tea & Green Vetiver",
        icon: "✿",
    },
    {
        id: "justbecause",
        badge: "SPONTANEOUS 06",
        title: "Just Because",
        blurb: "Spontaneous tokens of affection that turn an ordinary weekday into an unforgettable sensory romance. [EDIT]",
        scentHighlight: "Midnight Guava & Petrichor Rain",
        icon: "✧",
    },
];

export interface GiftingBenefit {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: string;
}

export const GIFTING_BENEFITS: GiftingBenefit[] = [
    {
        id: "packaging",
        number: "01",
        title: "Artisanal Wax-Sealed Packaging",
        description:
            "Every flacon is cocooned in a debossed textured linen box, wrapped with raw silk twine and stamped with hand-poured botanical sealing wax. [EDIT]",
        icon: "seal",
    },
    {
        id: "extrait",
        number: "02",
        title: "28% Extrait de Parfum Strength",
        description:
            "Formulated at intense pure perfume concentration, our natural distillations linger on pulse points for 12+ hours with radiant sillage. [EDIT]",
        icon: "drop",
    },
    {
        id: "delivery",
        number: "03",
        title: "Pan-India Insured Express Courier",
        description:
            "Complimentary express transit across 19,000+ Indian postal codes in discreet outer protection so the surprise arrives uncompromised. [EDIT]",
        icon: "shipping",
    },
    {
        id: "discreet",
        number: "04",
        title: "Strictly Discreet Invoicing",
        description:
            "No prices, receipts, or fiscal invoices are ever enclosed inside the gift box. Digital invoices are emailed exclusively to the buyer. [EDIT]",
        icon: "shield",
    },
];

export interface GiftingFAQ {
    id: string;
    question: string;
    answer: string;
}

export const GIFTING_FAQS: GiftingFAQ[] = [
    {
        id: "delivery-timelines",
        question: "What are the delivery timelines for gift parcels across India? [EDIT]",
        answer:
            "Express air courier delivery takes 2–4 business days across major Indian metros (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata) and 3–5 days for tier-2 and tier-3 cities. We dispatch all gifting orders received before 1:00 PM IST on the same business day.",
    },
    {
        id: "hide-price",
        question: "Will the recipient see the price or invoice in the box? [EDIT]",
        answer:
            "Never. All gifting orders are marked for Discreet Gifting Transit. We strictly exclude price tags, invoices, and billing paperwork from inside the packaging. The tax invoice is sent exclusively to the sender's email address.",
    },
    {
        id: "calligraphy-messages",
        question: "How are personalized message cards prepared? [EDIT]",
        answer:
            "Each gift message is handwritten by our in-house atelier calligrapher on heavy 300 GSM textured Italian cotton paper using archival black ink. The card is sealed with natural botanical wax bearing the KISSA emblem and tucked alongside the flacon.",
    },
    {
        id: "bulk-discounts",
        question: "Do you offer preferential rates for corporate, wedding, or bulk gifting? [EDIT]",
        answer:
            "Yes. We offer tiered volume pricing starting at 10 units for corporate gifting, wedding guest favors, and VIP curations. We also support bespoke wax stamp branding, custom sleeves, and multi-destination dispatch. Please fill out our Corporate & Bulk Gifting form above for a tailored quote.",
    },
    {
        id: "custom-schedule",
        question: "Can I schedule delivery for a specific future date? [EDIT]",
        answer:
            "Yes. You can specify a desired delivery date in the order notes during checkout or contact our concierge via WhatsApp immediately after placing your order. We will time dispatch so your gift arrives right on their special day.",
    },
];

