export interface FAQQuestion {
    id: string;
    question: string;
    answer: string;
    keywords?: string[];
}

export interface FAQSection {
    id: string;
    title: string; // Exact H2
    kicker: string;
    description?: string;
    items: FAQQuestion[];
}

export const FAQ_SECTIONS: FAQSection[] = [
    // -------------------------------------------------------------
    // Section 2: About KISSA
    // -------------------------------------------------------------
    {
        id: "about-kissa",
        title: "About the KISSA Brand",
        kicker: "HERITAGE & VISION",
        description: "Our origins, literary book packaging, and philosophy of turning chapters of life into scent.",
        items: [
            {
                id: "what-is-kissa",
                question: "What is KISSA?",
                answer:
                    "KISSA is a contemporary Indian perfume brand that turns life chapters into fragrances. Each scent is inspired by a real moment, like a new job, a new city or a fresh start, and comes inside a hardcover book with a short story and pages to write your own.",
                keywords: ["about", "brand", "story", "book", "chapters of life"],
            },
            {
                id: "kissa-name-meaning",
                question: "What does the name KISSA mean?",
                answer:
                    "Kissa means \"story\" in Hindi and Urdu. Our belief is simple: Har khushboo, ek kissa. Every fragrance carries a story.",
                keywords: ["meaning", "hindi", "urdu", "har khushboo ek kissa"],
            },
            {
                id: "is-kissa-indian",
                question: "Is KISSA an Indian brand?",
                answer:
                    "Yes. KISSA is an Indian brand with a modern, literary feel. Our lines mix English and Hindi, the way many of us actually talk.",
                keywords: ["indian perfume brand", "india", "homegrown", "bilingual"],
            },
            {
                id: "agla-panna-meaning",
                question: "What does \"Agla panna tumhara hai\" mean?",
                answer:
                    "It means \"the next page is yours\". It's the line that closes every KISSA book: the story ends, and your own chapter begins.",
                keywords: ["agla panna tumhara hai", "next page is yours", "tagline", "motto"],
            },
            {
                id: "chapters-of-life-collection",
                question: "What is the Chapters of Life collection?",
                answer:
                    "Chapters of Life is KISSA's collection of fragrances, each one tied to a life moment. Chapter 01 is NAYA PANNA, made for new beginnings. More chapters are on the way.",
                keywords: ["chapters of life", "naya panna", "collection", "new beginnings"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 3: Why KISSA
    // -------------------------------------------------------------
    {
        id: "why-kissa",
        title: "Why Choose KISSA?",
        kicker: "PHILOSOPHY & CRAFT",
        description: "The keepsake experience, honest premium formulation, and memory-making value.",
        items: [
            {
                id: "what-makes-kissa-different",
                question: "What makes KISSA different from other perfume brands?",
                answer:
                    "KISSA is a perfume you read before you wear. Every bottle sits inside a real hardcover book with five story pages and two writing pages. The scent, the story and your own words all belong to one moment, so the fragrance becomes a memory, not just a bottle.",
                keywords: ["different", "unique", "hardcover book", "memory", "story pages"],
            },
            {
                id: "why-kissa-good-choice",
                question: "Why is KISSA a good choice?",
                answer:
                    "Because it gives you more than a scent. You get a thoughtfully made unisex fragrance, a keepsake book you'll want to hold on to, and space to make it personal, at an accessible premium price. It's built around three ideas: courage to begin, connection through your words, and memory you can return to.",
                keywords: ["good choice", "unisex", "keepsake", "courage", "connection", "memory"],
            },
            {
                id: "is-kissa-worth-the-price",
                question: "Is KISSA worth the price?",
                answer:
                    "KISSA is priced at ₹4,950 for 50 ml with the complete book. You're paying for the fragrance and the experience together: a story to read, pages to write on and packaging that stays on your shelf long after the bottle is empty.",
                keywords: ["price", "worth", "cost", "value", "50ml", "hardcover book"],
            },
            {
                id: "who-is-kissa-for",
                question: "Who is KISSA for?",
                answer:
                    "KISSA is for anyone who values fragrance, design and meaningful gifting, especially people stepping into something new. Our scents are unisex, so they're made for everyone.",
                keywords: ["who is kissa for", "audience", "unisex", "gifting"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 4: Fragrance Notes
    // -------------------------------------------------------------
    {
        id: "fragrance-notes",
        title: "NAYA PANNA Fragrance Notes",
        kicker: "OLFACTORY ARCHITECTURE",
        description: "Fresh spice, airy tea, and creamy woods crafted in harmonious tripartite progression.",
        items: [
            {
                id: "what-does-naya-panna-smell-like",
                question: "What does NAYA PANNA smell like?",
                answer:
                    "NAYA PANNA smells fresh, airy and softly warm. Think fresh spice, airy tea and creamy woods. Its three signature notes are cardamom, white tea and sandalwood.",
                keywords: ["smell like", "cardamom", "white tea", "sandalwood", "scent profile"],
            },
            {
                id: "top-notes-naya-panna",
                question: "What are the top notes of NAYA PANNA?",
                answer:
                    "Bergamot, green mandarin and green cardamom. They give a bright, green opening with a gentle spice, the feeling of anticipation.",
                keywords: ["top notes", "bergamot", "green mandarin", "green cardamom", "opening"],
            },
            {
                id: "heart-notes-naya-panna",
                question: "What are the heart notes of NAYA PANNA?",
                answer:
                    "White tea, neroli and a light, transparent jasmine. This is where the scent turns calm, open and quietly warm.",
                keywords: ["heart notes", "middle notes", "white tea", "neroli", "jasmine"],
            },
            {
                id: "base-notes-naya-panna",
                question: "What are the base notes of NAYA PANNA?",
                answer:
                    "Sandalwood, clean musk, soft amber and a touch of vetiver. They leave a smooth, creamy and grounded finish.",
                keywords: ["base notes", "sandalwood", "musk", "amber", "vetiver", "finish"],
            },
            {
                id: "is-naya-panna-sweet",
                question: "Is NAYA PANNA sweet?",
                answer:
                    "Not very. NAYA PANNA has low to medium sweetness. It leans fresh and woody, not sugary or gourmand.",
                keywords: ["sweetness", "sweet", "gourmand", "woody", "fresh"],
            },
            {
                id: "what-are-top-heart-base-notes",
                question: "What are top, heart and base notes?",
                answer:
                    "They're the three stages of a perfume. Top notes are what you smell first and fade fastest. Heart notes appear as the perfume settles. Base notes are the last and longest-lasting part, staying close to the skin.",
                keywords: ["fragrance stages", "top notes", "heart notes", "base notes", "olfactory pyramid"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 5: Moods and Occasions
    // -------------------------------------------------------------
    {
        id: "moods-occasions",
        title: "Moods and When to Wear KISSA",
        kicker: "RITUALS & DAILY WEAR",
        description: "Emotional resonance, workwear suitability, daytime rituals, and Indian climates.",
        items: [
            {
                id: "what-mood-naya-panna-creates",
                question: "What mood does NAYA PANNA create?",
                answer:
                    "Hopeful, calm and warm. It's made to feel like the first step of something new: a little excited, a little nervous and quietly confident.",
                keywords: ["mood", "feel", "hopeful", "calm", "confident", "first step"],
            },
            {
                id: "when-to-wear-naya-panna",
                question: "When should I wear NAYA PANNA?",
                answer:
                    "Wear it on first days and fresh starts: a new job, a new college, a move to a new city. It also works as a daily morning ritual. Aaj se ek naya kissa.",
                keywords: ["when to wear", "fresh starts", "new job", "morning ritual", "new city"],
            },
            {
                id: "wear-naya-panna-to-office",
                question: "Can I wear NAYA PANNA to the office?",
                answer:
                    "Yes. Its clean, fresh character and soft finish make it easy to wear at work without feeling loud.",
                keywords: ["office", "workwear", "professional", "subtle", "clean"],
            },
            {
                id: "day-or-night-perfume",
                question: "Is NAYA PANNA a day or night perfume?",
                answer:
                    "It's mostly a day perfume. The fresh citrus and tea notes suit mornings and daytime best, while the creamy sandalwood base keeps it pleasant into the evening.",
                keywords: ["day or night", "daytime", "morning", "evening", "versatile"],
            },
            {
                id: "which-season-best-for",
                question: "Which season is NAYA PANNA best for?",
                answer:
                    "Its fresh, airy profile suits Indian summers and spring well, and the warm woody base makes it comfortable year-round.",
                keywords: ["season", "summer", "spring", "all-weather", "indian climate"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 6: EDP vs EDT
    // -------------------------------------------------------------
    {
        id: "edp-vs-edt",
        title: "EDP vs EDT: Perfume Types Explained",
        kicker: "FRAGRANCE EDUCATION",
        description: "Concentration benchmarks, longevity expectations, and understanding perfume grades.",
        items: [
            {
                id: "what-is-edp",
                question: "What is EDP?",
                answer:
                    "EDP stands for Eau de Parfum. It usually contains about 15–20% fragrance oil, so it's richer and generally lasts longer on the skin than lighter types.",
                keywords: ["what is edp", "eau de parfum", "concentration", "oil percentage"],
            },
            {
                id: "what-is-edt",
                question: "What is EDT?",
                answer:
                    "EDT stands for Eau de Toilette. It usually contains about 5–15% fragrance oil, which makes it lighter and fresher, but it tends to fade sooner.",
                keywords: ["what is edt", "eau de toilette", "lighter", "fresh"],
            },
            {
                id: "difference-between-edp-and-edt",
                question: "What is the difference between EDP and EDT?",
                answer:
                    "The main difference is concentration. EDP has more fragrance oil than EDT, so it usually smells fuller and stays on longer. EDT is lighter and brighter. How long either lasts also depends on your skin, the weather and where you spray it.",
                keywords: ["difference between edp and edt", "comparison", "longevity", "concentration"],
            },
            {
                id: "is-naya-panna-edp-or-edt",
                question: "Is NAYA PANNA an EDP or an EDT?",
                answer:
                    "NAYA PANNA is an Eau de Parfum (EDP). It is composed with a rich concentration of fragrance oils for a nuanced, enduring scent journey throughout the day.",
                keywords: ["is naya panna edp or edt", "eau de parfum", "formulation"],
            },
            {
                id: "which-is-better-edp-or-edt",
                question: "Which is better, EDP or EDT?",
                answer:
                    "Neither is better for everyone. Choose an EDP if you want a fuller scent that stays with you through the day. Choose an EDT if you like something lighter for hot weather or quick freshness.",
                keywords: ["which is better", "edp vs edt", "recommendation"],
            },
            {
                id: "parfum-and-eau-de-cologne",
                question: "What are Parfum and Eau de Cologne?",
                answer:
                    "Parfum (also called Extrait) has the highest oil concentration, usually 20% or more. Eau de Cologne is the lightest, usually around 2–4%, and fades quickly.",
                keywords: ["parfum", "extrait", "eau de cologne", "edc", "concentrations"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 7: Packaging
    // -------------------------------------------------------------
    {
        id: "packaging",
        title: "The KISSA Book and Packaging",
        kicker: "PACKAGING & DESIGN",
        description: "Hardcover literary binding, story leaves, inscription pages, and fitted flacon alcove.",
        items: [
            {
                id: "why-kissa-in-a-book",
                question: "Why does KISSA come in a book?",
                answer:
                    "Because every KISSA fragrance is a story. You open the book, read five short pages and find the bottle at the end, so the scent arrives with a feeling attached.",
                keywords: ["why book", "story", "book packaging", "unboxing"],
            },
            {
                id: "what-is-inside-the-box",
                question: "What is inside the box?",
                answer:
                    "A hardcover book with a bound spine, five short story pages, two writing pages and a 50 ml bottle in a secure fitted compartment.",
                keywords: ["inside the box", "contents", "hardcover", "50ml", "compartment"],
            },
            {
                id: "two-writing-pages",
                question: "What are the two writing pages for?",
                answer:
                    "\"To your next chapter...\" is for a personal message to the person receiving it. \"My next KISSA\" is where you write your own hope, goal or promise.",
                keywords: ["two writing pages", "to your next chapter", "my next kissa", "inscription"],
            },
            {
                id: "what-does-bottle-look-like",
                question: "What does the bottle look like?",
                answer:
                    "NAYA PANNA comes in an oval glass bottle with a rose-coloured fragrance and a matte-black cap.",
                keywords: ["bottle design", "oval glass", "rose-coloured", "matte-black cap"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 8: Gifting
    // -------------------------------------------------------------
    {
        id: "gifting",
        title: "Gifting with KISSA",
        kicker: "CURATED GIFTING",
        description: "Milestone gifting, personal inscription pages, genderless formulations, and corporate requests.",
        items: [
            {
                id: "is-kissa-a-good-gift",
                question: "Is KISSA a good gift?",
                answer:
                    "Yes. KISSA is made for gifting. The story and your handwritten message make it feel personal before the bottle is even found.",
                keywords: ["good gift", "gift idea", "handwritten", "personal gift"],
            },
            {
                id: "which-occasions-best-for",
                question: "Which occasions is KISSA best for?",
                answer:
                    "New jobs, moves to a new city, graduations, new businesses, new relationships and fresh starts. It's also a lovely gift to yourself.",
                keywords: ["occasions", "graduation", "new job", "relocation", "fresh start", "self-gift"],
            },
            {
                id: "gift-for-him-or-her",
                question: "Is KISSA a good gift for him or her?",
                answer:
                    "Yes, for both. All KISSA fragrances are unisex, so you never need to guess.",
                keywords: ["for him", "for her", "unisex gift", "gender neutral"],
            },
            {
                id: "corporate-bulk-gifting",
                question: "Do you take corporate or bulk gifting orders?",
                answer:
                    "Yes. Write to contact@kissaperfume.com with the quantity and timeline.",
                keywords: ["corporate gifting", "bulk orders", "client gifts", "timeline"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 9: How to Wear and Care
    // -------------------------------------------------------------
    {
        id: "how-to-wear",
        title: "How to Wear and Store Your Perfume",
        kicker: "APPLICATION & STORAGE",
        description: "Pulse points, friction prevention, fragrance longevity tips, storage ritual, and skin safety.",
        items: [
            {
                id: "how-to-apply-naya-panna",
                question: "How do I apply NAYA PANNA?",
                answer:
                    "Spray 2 to 3 times on pulse points like the wrists, neck and behind the ears, from about 15 cm away. Let it dry naturally.",
                keywords: ["how to apply", "pulse points", "wrists", "neck", "spray distance"],
            },
            {
                id: "should-i-rub-perfume",
                question: "Should I rub perfume on my wrists?",
                answer:
                    "No. Rubbing breaks down the top notes faster. Spray and let it settle on its own.",
                keywords: ["rub wrists", "friction", "top notes", "application mistake"],
            },
            {
                id: "make-perfume-last-longer",
                question: "How do I make perfume last longer?",
                answer:
                    "Apply it on moisturised skin, spray pulse points and a little on clothes if the fabric allows. Store the bottle away from heat and sunlight.",
                keywords: ["last longer", "longevity", "moisturised skin", "clothes", "tips"],
            },
            {
                id: "how-to-store-kissa-perfume",
                question: "How should I store my KISSA perfume?",
                answer:
                    "Keep it in its book, away from direct sunlight, heat and humidity, with the cap closed.",
                keywords: ["storage", "store perfume", "sunlight", "humidity", "book case"],
            },
            {
                id: "shelf-life-kissa-perfume",
                question: "What is the shelf life of KISSA perfume?",
                answer:
                    "36 months from the date of manufacture (as printed on the pack) when stored in a cool, dry place away from direct heat and sunlight.",
                keywords: ["shelf life", "expiry", "longevity in bottle", "manufacture date"],
            },
            {
                id: "safe-for-sensitive-skin",
                question: "Is KISSA safe for sensitive skin?",
                answer:
                    "Do a patch test before first use, avoid broken or irritated skin, and keep it away from your eyes.",
                keywords: ["sensitive skin", "patch test", "allergy", "skin safety"],
            },
        ],
    },

    // -------------------------------------------------------------
    // Section 10: Orders and Delivery
    // -------------------------------------------------------------
    {
        id: "orders-delivery",
        title: "Orders, Price and Delivery",
        kicker: "SHIPPING & COMMERCE",
        description: "Official price point, delivery turnarounds, shipment tracking, returns, and payment options.",
        items: [
            {
                id: "how-much-does-naya-panna-cost",
                question: "How much does NAYA PANNA cost?",
                answer:
                    "NAYA PANNA 50 ml with the complete book costs ₹4,950.",
                keywords: ["cost", "price", "50ml", "inr", "book cost"],
            },
            {
                id: "how-long-delivery-takes",
                question: "How long does delivery take?",
                answer:
                    "Standard delivery takes 3 to 5 business days across major Indian metros and 5 to 7 business days pan-India across all serviceable pincodes.",
                keywords: ["delivery time", "shipping duration", "transit", "timeline", "india shipping"],
            },
            {
                id: "how-to-track-order",
                question: "How can I track my order?",
                answer:
                    "Use the tracking link in your shipping email or message, or contact us with your order number.",
                keywords: ["track order", "tracking link", "awb", "order status"],
            },
            {
                id: "return-and-exchange-policy",
                question: "What is your return and exchange policy?",
                answer:
                    "We offer replacements for items damaged in transit or defective bottles reported within 48 hours of delivery. Due to personal care hygiene standards, opened perfume bottles cannot be returned. Please visit our contact page for return and exchange assistance.",
                keywords: ["return policy", "exchange", "damaged", "refund", "opened bottle"],
            },
            {
                id: "accepted-payment-methods",
                question: "Which payment methods do you accept?",
                answer:
                    "We accept UPI (Google Pay, PhonePe, Paytm), cards (Visa, Mastercard, RuPay, Amex), net banking across major banks, and Cash on Delivery (COD) in eligible areas.",
                keywords: ["payment methods", "upi", "cards", "cod", "net banking", "google pay", "phonepe"],
            },
        ],
    },
];

/**
 * Generates complete FAQPage JSON-LD Schema covering all 45 questions.
 */
export function generateFaqSchema() {
    const mainEntity = FAQ_SECTIONS.flatMap((section) =>
        section.items.map((item) => ({
            "@type": "Question" as const,
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer" as const,
                text: item.answer,
            },
        }))
    );

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity,
    };
}
