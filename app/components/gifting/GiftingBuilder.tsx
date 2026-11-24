import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { ShopProduct, ProductVariant } from "../../lib/products";
import { addProductToCart, type CartLineAttribute } from "../../lib/cart";
import { type GiftingOccasion } from "../../lib/gifting";
import { AddedToast } from "../shop/AddedToast";
import { useCart } from "../../context/CartContext";

export interface GiftingBuilderProps {
    product?: ShopProduct;
    selectedOccasion: GiftingOccasion | null;
    initialMessage?: string;
    onResetOccasion?: () => void;
}

export function GiftingBuilder({
    product,
    selectedOccasion,
    initialMessage = "",
    onResetOccasion,
}: GiftingBuilderProps) {
    // 50 ml NAYA PANNA default variant
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        product?.variants?.[0] || {
            id: "gid://shopify/ProductVariant/np-50ml",
            title: "50ml Unisex Perfume with Complete Book",
            availableForSale: true,
            price: { amount: "1800", currencyCode: "INR" },
            selectedOptions: [{ name: "Size", value: "50ml" }],
        }
    );

    const [giftMessage, setGiftMessage] = useState(initialMessage);
    const [recipientName, setRecipientName] = useState("");
    const [senderName, setSenderName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: "", size: "" });

    // Sync external message selection from Section 9
    useEffect(() => {
        if (initialMessage) {
            setGiftMessage(initialMessage);
        }
    }, [initialMessage]);

    const PRICE_INR = 1800;
    const MESSAGE_MAX_LENGTH = 200;

    const formatPrice = (amount: number, currencyCode: string = "INR") => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currencyCode,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formattedTotal = formatPrice(PRICE_INR);
    const charCount = giftMessage.length;
    const isNearLimit = charCount >= MESSAGE_MAX_LENGTH - 20;

    const todayDate = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());

    let cartCtx: ReturnType<typeof useCart> | null = null;
    try {
        cartCtx = useCart();
    } catch {
        // fallback
    }

    const handleAddGiftToCart = async () => {
        if (!selectedVariant) return;
        setIsAdding(true);

        const attributes: CartLineAttribute[] = [
            {
                key: "Edition",
                value: "NAYA PANNA (Chapter 01) Hardcover Book Edition",
            },
            {
                key: "Recipient Name",
                value: recipientName.trim() || "Someone Special",
            },
            {
                key: "To your next chapter message",
                value: giftMessage.trim() || "Blank (to be handwritten by sender)",
            },
            {
                key: "Sender Name",
                value: senderName.trim() || "Anonymous Gifter",
            },
            {
                key: "Occasion",
                value: selectedOccasion?.title || "New Beginnings",
            },
        ];

        try {
            if (cartCtx) {
                cartCtx.addToCart({
                    id: `gifting-${selectedVariant.id}-${Date.now()}`,
                    perfumeId: product?.handle || "naya-panna",
                    title: "NAYA PANNA Gift Edition",
                    subtitle: `${recipientName.trim() ? `For ${recipientName.trim()} · ` : ""}Hardcover Book Edition`,
                    size: "50ml",
                    price: 1800,
                    qty: 1,
                    img: product?.featuredImage?.url || "/landing-pages/meng-to-sketchbook/naya-panna.png",
                    merchandiseId: selectedVariant.id,
                    attributes,
                });
            } else {
                await addProductToCart({
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    attributes,
                });
            }

            setToastMessage({
                title: product?.title || "NAYA PANNA",
                size: "50 ml Unisex Perfume Gift Edition",
            });
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 4500);
        } catch (err) {
            console.error("Failed to add gift to cart:", err);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="build-your-gift"
            aria-label="Price, Delivery and Gifting Details"
        >
            {/* Header: Section 10 */}
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 36px" }}>
                <span className="section-label">SECTION 10 · DETAILS &amp; ORDERING</span>
                <h2 className="section-title">Price, Delivery and Gifting Details</h2>
                <p className="section-desc" style={{ maxWidth: 700, margin: "0 auto" }}>
                    Everything you need to know before handing over your next chapter.
                </p>
            </div>

            {/* Three Info Cards: Price, Delivery, Gifting Tip */}
            <div className="kissa-details-cards-grid" style={{ marginBottom: 40 }}>
                {/* Price */}
                <div className="kissa-detail-info-card">
                    <div className="kissa-info-card-top">
                        <span className="kissa-info-badge">PRICE</span>
                        <span className="kissa-info-icon">🏷️</span>
                    </div>
                    <h3 className="kissa-info-title">Complete Gift Set</h3>
                    <div className="kissa-info-price">₹1,800</div>
                    <p className="kissa-info-desc">
                        NAYA PANNA, 50 ml, with the complete hardcover book, 5 story pages,
                        and 2 writing pages.
                    </p>
                </div>

                {/* Delivery */}
                <div className="kissa-detail-info-card">
                    <div className="kissa-info-card-top">
                        <span className="kissa-info-badge">DELIVERY</span>
                        <span className="kissa-info-icon">✈️</span>
                    </div>
                    <h3 className="kissa-info-title">Express Pan-India</h3>
                    <p className="kissa-info-desc">
                        Express delivery in 2–4 business days across major metros, and 3–5 days across 19,000+ PIN codes.
                        Complimentary shipping on all gift orders. You'll get an order confirmation and shipping updates
                        once your gift is on its way.{" "}
                        <Link to="/contact" className="kissa-inline-link">
                            View Delivery FAQs &amp; Support
                        </Link>
                        .
                    </p>
                </div>

                {/* Gifting Tip */}
                <div className="kissa-detail-info-card kissa-tip-highlight-card">
                    <div className="kissa-info-card-top">
                        <span className="kissa-info-badge" style={{ color: "var(--earth)" }}>A SMALL GIFTING TIP</span>
                        <span className="kissa-info-icon">💡</span>
                    </div>
                    <h3 className="kissa-info-title">The Two-Page Ritual</h3>
                    <p className="kissa-info-desc">
                        Write your message on the "To your next chapter..." page before you hand
                        the book over. Leave the "My next KISSA" page blank. That one is theirs.
                    </p>
                </div>
            </div>

            {/* Interactive Book Customizer */}
            <div className="kissa-builder-wrap">
                <div className="kissa-builder-title-bar">
                    <div>
                        <span className="kissa-builder-kicker">INTERACTIVE BOOK PREVIEW</span>
                        <h3 className="kissa-builder-heading">
                            Personalise Your Gift Book
                        </h3>
                    </div>

                    {selectedOccasion && (
                        <div className="kissa-selected-occ-pill">
                            <span>Occasion: <strong>{selectedOccasion.title}</strong></span>
                            {onResetOccasion && (
                                <button
                                    type="button"
                                    onClick={onResetOccasion}
                                    className="kissa-occ-clear-btn"
                                    title="Clear occasion selection"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="kissa-builder-grid">
                    {/* Left Column: Live Book Spread Mockup */}
                    <div>
                        <div className="kissa-book-spread">
                            {/* Page 1 (Left): "To your next chapter..." */}
                            <div className="kissa-spread-page kissa-page-left">
                                <div className="kissa-page-header-mark">
                                    <span className="kissa-page-num">PAGE 06</span>
                                    <span className="kissa-page-title-label">
                                        To your next chapter...
                                    </span>
                                </div>

                                <div className="kissa-handwritten-message-preview">
                                    <p className="kissa-script-font">
                                        {giftMessage ||
                                            "Write a warm message for their new chapter, or leave blank to write by hand with pen..."}
                                    </p>
                                </div>

                                <div className="kissa-page-footer-signoff">
                                    {recipientName && (
                                        <div className="kissa-script-to">
                                            For: <em>{recipientName}</em>
                                        </div>
                                    )}
                                    {senderName && (
                                        <div className="kissa-script-from">
                                            With belief: <em>{senderName}</em>
                                        </div>
                                    )}
                                    <div className="kissa-script-date">{todayDate}</div>
                                </div>
                            </div>

                            {/* Page 2 (Right): "My next KISSA" + fitted flacon */}
                            <div className="kissa-spread-page kissa-page-right">
                                <div className="kissa-page-header-mark">
                                    <span className="kissa-page-num">PAGE 07</span>
                                    <span className="kissa-page-title-label">
                                        My next KISSA
                                    </span>
                                </div>

                                <div className="kissa-blank-page-notice">
                                    <div className="kissa-blank-icon">✎</div>
                                    <p className="kissa-blank-text">
                                        <em>"A blank page kept for their own hope, goal or promise, in their own words."</em>
                                    </p>
                                </div>

                                <div className="kissa-flacon-fitted-box">
                                    <img
                                        src="/naya-panna-unisex-perfume-50ml-kissa.png"
                                        alt="NAYA PANNA 50 ml unisex perfume bottle resting inside fitted hardcover book compartment"
                                        className="kissa-fitted-flacon-img"
                                    />
                                    <span className="kissa-fitted-label">
                                        NAYA PANNA · 50 ML
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="kissa-stage-caption">
                            <span>Open Hardcover Book Spread · Fitted Compartment</span>
                        </div>
                    </div>

                    {/* Right Column: Customizer Controls & Order Box */}
                    <div className="kissa-builder-controls">
                        {/* Message field */}
                        <div className="kissa-control-group">
                            <div className="kissa-control-label-row">
                                <label
                                    htmlFor="gift-message-input"
                                    className="kissa-control-label"
                                >
                                    Page 1 Message ("To your next chapter...")
                                </label>
                                <span
                                    className={`kissa-char-counter ${
                                        isNearLimit ? "is-warning" : ""
                                    }`}
                                >
                                    {charCount}/{MESSAGE_MAX_LENGTH}
                                </span>
                            </div>

                            <textarea
                                id="gift-message-input"
                                rows={4}
                                maxLength={MESSAGE_MAX_LENGTH}
                                value={giftMessage}
                                onChange={(e) => setGiftMessage(e.target.value)}
                                placeholder="Type a message or select one from the Message Ideas above..."
                                className="kissa-control-textarea"
                            />
                            <p className="kissa-control-hint">
                                Leave blank if you prefer writing your words with your own pen before handing it over.
                            </p>
                        </div>

                        {/* Names */}
                        <div className="kissa-names-row">
                            <div className="kissa-control-group">
                                <label
                                    htmlFor="recipient-name-input"
                                    className="kissa-control-label"
                                >
                                    Recipient's Name
                                </label>
                                <input
                                    id="recipient-name-input"
                                    type="text"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    placeholder="e.g. Aryan, Priya"
                                    className="kissa-control-input"
                                />
                            </div>

                            <div className="kissa-control-group">
                                <label
                                    htmlFor="sender-name-input"
                                    className="kissa-control-label"
                                >
                                    Your Name (Sender)
                                </label>
                                <input
                                    id="sender-name-input"
                                    type="text"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    placeholder="e.g. Kabir"
                                    className="kissa-control-input"
                                />
                            </div>
                        </div>

                        {/* Price breakdown & CTA */}
                        <div className="kissa-builder-cta-box">
                            <div className="kissa-price-breakdown">
                                <div className="kissa-price-row">
                                    <span>NAYA PANNA 50 ml Unisex Perfume</span>
                                    <span>Included</span>
                                </div>
                                <div className="kissa-price-row">
                                    <span>Bound Hardcover Book with 5 Story Pages</span>
                                    <span>Included</span>
                                </div>
                                <div className="kissa-price-row">
                                    <span>2 Writing Pages for Personal Words &amp; Goal</span>
                                    <span>Included</span>
                                </div>
                                <div className="kissa-price-row">
                                    <span>Express Pan-India Transit</span>
                                    <span style={{ color: "var(--earth)" }}>Complimentary</span>
                                </div>
                                <div className="kissa-price-row kissa-price-total">
                                    <span>Total Amount</span>
                                    <span className="kissa-total-amount">
                                        {formattedTotal}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="kissa-add-to-cart-btn"
                                onClick={handleAddGiftToCart}
                                disabled={isAdding}
                            >
                                {isAdding ? "Adding to Cart..." : "Gift NAYA PANNA · ₹1,800"}
                            </button>

                            <div className="kissa-builder-perks">
                                <span>✦ Real Hardcover Book</span>
                                <span>·</span>
                                <span>Discreet Invoicing</span>
                                <span>·</span>
                                <span>Tracked Pan-India Transit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Added to cart toast */}
            <AddedToast
                visible={showToast}
                title={toastMessage.title}
                size={toastMessage.size}
                onClose={() => setShowToast(false)}
            />
        </section>
    );
}
