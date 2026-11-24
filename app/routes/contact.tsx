import { useState } from "react";
import type { Route } from "./+types/contact";
import { Layout } from "../components/Layout";

// Contact Page Components
import { ContactHero } from "../components/contact/ContactHero";
import { ContactDetails } from "../components/contact/ContactDetails";
import { ContactForm, type ContactTopic } from "../components/contact/ContactForm";
import { HelpTopics } from "../components/contact/HelpTopics";
import { ContactFAQ } from "../components/contact/ContactFAQ";
import { ContactClosing } from "../components/contact/ContactClosing";

// -------------------------------------------------------------
// SEO Meta Tags
// -------------------------------------------------------------
export const meta: Route.MetaFunction = () => {
    const title = "Contact KISSA · Perfume Concierge & Client Services";
    const description =
        "Questions about an order, a gift or a fragrance? We're happy to help. Reach KISSA via hello@kissaperfume.in or WhatsApp +91 7607090101.";
    const pageUrl = "https://kissaperfume.in/contact";

    return [
        { title },
        { name: "description", content: description },
        {
            name: "keywords",
            content:
                "contact KISSA, perfume customer care, fragrance concierge, luxury perfume India, track order, corporate gifting perfume, KISSA WhatsApp support",
        },
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

// -------------------------------------------------------------
// Schema Markup (JSON-LD)
// -------------------------------------------------------------
const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact KISSA",
    url: "https://kissaperfume.in/contact",
    mainEntity: {
        "@type": "Organization",
        name: "KISSA",
        url: "https://kissaperfume.in",
        logo: "https://kissaperfume.in/kissa-logo-transparent.png",
        email: "hello@kissa.in",
        address: {
            "@type": "PostalAddress",
            streetAddress: "KISSA",
            addressLocality: "Mirzapur",
            addressRegion: "Uttar Pradesh",
            postalCode: "231001",
            addressCountry: "IN",
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+91-7607090101",
            email: "hello@kissa.in",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
            "https://www.instagram.com/kissaperfume",
        ],
    },
};

// -------------------------------------------------------------
// Contact Route Component
// -------------------------------------------------------------
export default function Contact() {
    const [selectedTopic, setSelectedTopic] = useState<ContactTopic>("Order and delivery");

    return (
        <Layout>
            {/* JSON-LD Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactPageSchema),
                }}
            />

            <div className="kissa-contact-page">
                {/* Section 1: Hero */}
                <ContactHero />

                {/* Section 2: Contact Details */}
                <ContactDetails />

                {/* Section 3: Contact Form */}
                <ContactForm
                    selectedTopic={selectedTopic}
                    onTopicSelect={setSelectedTopic}
                />

                {/* Section 4: Help Topics */}
                <HelpTopics onSelectTopic={setSelectedTopic} />

                {/* Section 5: FAQs */}
                <ContactFAQ />

                {/* Section 6: Closing */}
                <ContactClosing />
            </div>
        </Layout>
    );
}
