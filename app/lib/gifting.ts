/**
 * KISSA Gifting — Data & Services
 * "Har nayi shuruaat, ek naya kissa."
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
 */
export async function submitCorporateEnquiry(
    data: CorporateEnquiryInput
): Promise<CorporateEnquiryResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

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

    console.info("[KISSA Gifting Concierge] Received corporate enquiry:", {
        ...data,
        receivedAt: new Date().toISOString(),
    });

    return {
        success: true,
        message:
            "Your bespoke gifting inquiry has been received. Our concierge will contact you within 24 hours.",
    };
}

// -------------------------------------------------------------
// Section 2: Quick Answer Block (At a Glance)
// -------------------------------------------------------------
export interface QuickAnswerSpec {
    label: string;
    value: string;
}

export const QUICK_ANSWER_SPECS: QuickAnswerSpec[] = [
    { label: "Brand", value: "KISSA" },
    { label: "Fragrance", value: "NAYA PANNA (Chapter 01)" },
    { label: "Size", value: "50 ml" },
    { label: "For", value: "Unisex: him, her, anyone" },
    { label: "Scent family", value: "Fresh spice, airy tea, creamy woods" },
    {
        label: "Inside the box",
        value: "Hardcover book, 5 story pages, 2 writing pages, perfume bottle",
    },
    {
        label: "Best for",
        value: "New job, new city, new venture, graduation, fresh start",
    },
];

// -------------------------------------------------------------
// Section 3: Why KISSA (Courage, Connection, Memory)
// -------------------------------------------------------------
export interface WhyKissaPillar {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: string;
}

export type GiftingBenefit = WhyKissaPillar;

export const WHY_KISSA_PILLARS: WhyKissaPillar[] = [
    {
        id: "courage",
        number: "01",
        title: "Courage",
        description:
            "KISSA celebrates the decision to begin, even when nobody knows how things will turn out. That first step deserves to be noticed.",
        icon: "courage",
    },
    {
        id: "connection",
        number: "02",
        title: "Connection",
        description:
            "A story plus a handwritten message turns a bottle of perfume into a gift that could only have come from you.",
        icon: "connection",
    },
    {
        id: "memory",
        number: "03",
        title: "Memory",
        description:
            "Scent is one of the strongest ways we remember. Years later, one spray of NAYA PANNA can bring back the season when everything was new.",
        icon: "memory",
    },
];

export const GIFTING_BENEFITS: GiftingBenefit[] = WHY_KISSA_PILLARS;

// -------------------------------------------------------------
// Section 4: What's Inside
// -------------------------------------------------------------
export interface StoryPage {
    chapter: string;
    title: string;
    summary: string;
}

export const STORY_PAGES: StoryPage[] = [
    {
        chapter: "Chapter I",
        title: "The Moment",
        summary: "A new page begins quietly.",
    },
    {
        chapter: "Chapter II",
        title: "The Courage",
        summary: "You don't need every answer before you take the first step.",
    },
    {
        chapter: "Chapter III",
        title: "The Wish",
        summary: "A hope for the people, work and small joys ahead.",
    },
    {
        chapter: "Chapter IV",
        title: "The Memory",
        summary: "A reminder to look back one day and remember how this felt.",
    },
    {
        chapter: "Chapter V",
        title: "The Reveal",
        summary: "The story ends, and the fragrance appears.",
    },
];

// -------------------------------------------------------------
// Section 5: How It Works (Read, Write, Wear)
// -------------------------------------------------------------
export interface HowItWorksStep {
    step: string;
    lead: string;
    title: string;
    description: string;
    icon: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    {
        step: "01",
        lead: "Step 1",
        title: "Read the Story",
        description:
            "They open the book and turn through five short pages about new beginnings, the nervous, exciting, hopeful kind.",
        icon: "book",
    },
    {
        step: "02",
        lead: "Step 2",
        title: "Write the Next Chapter",
        description:
            "You write a message before you hand it over. Later, they write their own goal on the second page. Both stay in the book.",
        icon: "pen",
    },
    {
        step: "03",
        lead: "Step 3",
        title: "Discover and Wear the Scent",
        description:
            "The last page reveals NAYA PANNA. One spray, and the new chapter has a fragrance of its own.",
        icon: "scent",
    },
];

// -------------------------------------------------------------
// Section 6: Occasions (7 Moments for New Beginnings)
// -------------------------------------------------------------
export interface GiftingOccasion {
    id: string;
    badge: string;
    title: string;
    description: string;
    icon: string;
}

export const GIFTING_OCCASIONS: GiftingOccasion[] = [
    {
        id: "new-job",
        badge: "MOMENT 01",
        title: "A Gift for a New Job or First Job",
        description:
            "An offer letter is a big deal, especially the first one. Give them something to wear on day one, and a page that reminds them someone is proud of them.",
        icon: "✦",
    },
    {
        id: "new-city",
        badge: "MOMENT 02",
        title: "A Gift for Someone Moving to a New City",
        description:
            "New streets, new flat, new people. A familiar fragrance and a few kind words can make an unfamiliar place feel a little more like home.",
        icon: "❦",
    },
    {
        id: "new-venture",
        badge: "MOMENT 03",
        title: "A Gift for a New Business or Venture",
        description:
            "The first customer. The first launch. For the friend who finally started the thing they kept talking about, KISSA says: we believe in this.",
        icon: "⚜",
    },
    {
        id: "graduation",
        badge: "MOMENT 04",
        title: "A Gift for Graduation",
        description:
            "College ends, and real life begins. It's a thoughtful gift for the step between who they were and who they're becoming.",
        icon: "🎓",
    },
    {
        id: "starting-over",
        badge: "MOMENT 05",
        title: "A Gift for Someone Starting Over",
        description:
            "Sometimes a new chapter isn't a celebration. It's a quiet decision to try again. KISSA is a gentle way to say: you can begin from here.",
        icon: "❂",
    },
    {
        id: "new-relationship",
        badge: "MOMENT 06",
        title: "A Gift for a New Relationship",
        description:
            "For a new love, a new marriage or a new home together. Write the first line of your shared story on the message page.",
        icon: "✿",
    },
    {
        id: "for-yourself",
        badge: "MOMENT 07",
        title: "A Gift for Yourself",
        description:
            "You don't need anyone's permission to mark your own beginning. Buy it, read it, write your goal, and wear it on the day you start.",
        icon: "✧",
    },
];

// -------------------------------------------------------------
// Section 7: Scent Notes
// -------------------------------------------------------------
export interface NoteTier {
    name: string;
    subtitle: string;
    summary: string;
    notes: string[];
}

export const SCENT_TIERS: NoteTier[] = [
    {
        name: "Top Notes",
        subtitle: "Fresh and Full of Anticipation",
        summary:
            "Bergamot, green mandarin and green cardamom. The first spray feels like the morning of something new.",
        notes: ["Bergamot", "Green Mandarin", "Green Cardamom"],
    },
    {
        name: "Heart Notes",
        subtitle: "Open and Quietly Warm",
        summary:
            "White tea, neroli and a soft, transparent jasmine. Calm, clean and easy to live in.",
        notes: ["White Tea", "Neroli", "Transparent Jasmine"],
    },
    {
        name: "Base Notes",
        subtitle: "Smooth and Grounded",
        summary:
            "Sandalwood, clean musk, soft amber and a touch of vetiver, for a creamy, steady finish that stays close to the skin.",
        notes: ["Sandalwood", "Clean Musk", "Soft Amber", "Vetiver"],
    },
];

// -------------------------------------------------------------
// Section 9: Message Ideas
// -------------------------------------------------------------
export interface MessageIdea {
    id: string;
    context: string;
    text: string;
}

export const MESSAGE_IDEAS: MessageIdea[] = [
    {
        id: "next-chapter",
        context: "Next Chapter",
        text: "To your next chapter. I can't wait to see what you write.",
    },
    {
        id: "new-city",
        context: "New City",
        text: "New city, same you. Proud of you, always.",
    },
    {
        id: "new-job",
        context: "New Job",
        text: "For the first day at the new job. Wear this and walk in like you belong there, because you do.",
    },
    {
        id: "small-step",
        context: "Encouragement",
        text: "You don't need all the answers. One small step is enough.",
    },
    {
        id: "agla-panna",
        context: "Hindi Poetic",
        text: "Agla panna tumhara hai. Likh do kuch khoobsurat.",
    },
    {
        id: "new-venture",
        context: "New Business",
        text: "For the business you finally started. This is only page one.",
    },
];

// -------------------------------------------------------------
// Section 11: FAQs (All 10 FAQs)
// -------------------------------------------------------------
export interface GiftingFAQItem {
    id: string;
    question: string;
    answer: string;
    linkInfo?: { text: string; url: string };
}

export const GIFTING_FAQS: GiftingFAQItem[] = [
    {
        id: "new-job-gift",
        question: "What is a good perfume gift for someone starting a new job?",
        answer:
            "A good perfume gift for a new job is a fresh, easy-to-wear scent with a personal touch. KISSA's NAYA PANNA comes inside a book with a story about new beginnings and a page for your message, so it celebrates the job, not just the person's taste in perfume.",
    },
    {
        id: "inside-box",
        question: "What comes inside the KISSA gift box?",
        answer:
            "The KISSA gift box holds a bound hardcover book with five short story pages, two writing pages (one for your message, one for the receiver's goal) and a 50 ml bottle of NAYA PANNA perfume in a fitted compartment.",
    },
    {
        id: "is-unisex",
        question: "Is NAYA PANNA a unisex perfume?",
        answer:
            "Yes. NAYA PANNA is a unisex perfume made for anyone. Its fresh citrus, cardamom and white tea opening, softened by a creamy sandalwood and musk base, suits men and women alike.",
    },
    {
        id: "scent-profile",
        question: "What does NAYA PANNA smell like?",
        answer:
            "NAYA PANNA smells fresh, airy and softly warm. It opens with bergamot, green mandarin and cardamom, moves into white tea, neroli and light jasmine, and settles into sandalwood, clean musk, soft amber and vetiver.",
    },
    {
        id: "personal-message",
        question: "Can I write a personal message in the KISSA gift?",
        answer:
            'Yes. The book has a dedicated page called "To your next chapter..." for your handwritten message, with space for your name and the date. There\'s also a second page where the receiver can write their own next goal.',
    },
    {
        id: "price-inquiry",
        question: "How much does the KISSA perfume gift cost?",
        answer:
            "The KISSA perfume gift, NAYA PANNA 50 ml with the complete book, is priced at ₹1,800.",
    },
    {
        id: "for-him-or-her",
        question: "Is KISSA a good gift for him or for her?",
        answer:
            "KISSA works as a perfume gift for him, for her or for anyone, because NAYA PANNA is unisex. It's especially meaningful for someone starting a new job, moving cities, launching a business or beginning again.",
    },
    {
        id: "buy-for-myself",
        question: "Can I buy KISSA for myself?",
        answer:
            'Absolutely. Many beginnings are personal. Read the story, write your own goal on the "My next KISSA" page, and wear the scent as a reminder of the day you started.',
    },
    {
        id: "indian-brand",
        question: "Is KISSA an Indian brand?",
        answer:
            "Yes. KISSA is a contemporary Indian perfume brand that turns life chapters into fragrances. NAYA PANNA is Chapter 01, the first fragrance in its Chapters of Life collection.",
        linkInfo: { text: "Chapters of Life collection", url: "/shop" },
    },
    {
        id: "delivery-timeline",
        question: "How long does delivery take?",
        answer:
            "Express delivery takes 2–4 business days across major metros (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata) and 3–5 days across 19,000+ PIN codes in India. All orders receive tracking updates.",
    },
];
