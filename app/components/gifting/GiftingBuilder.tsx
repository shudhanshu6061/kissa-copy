import { useState } from "react";
import type { ShopProduct, ProductVariant } from "../../lib/products";
import { addProductToCart, type CartLineAttribute } from "../../lib/cart";
import { type GiftingOccasion } from "../../lib/gifting";
import { AddedToast } from "../shop/AddedToast";

export interface GiftingBuilderProps {
    product: ShopProduct;
    selectedOccasion: GiftingOccasion | null;
    onResetOccasion?: () => void;
}

export function GiftingBuilder({
    product,
    selectedOccasion,
    onResetOccasion,
}: GiftingBuilderProps) {
    // Default to the primary full flacon variant
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        product?.variants?.[0] || {
            id: "gid://shopify/ProductVariant/np-50ml",
            title: "50ml Extrait Flacon",
            availableForSale: true,
            price: { amount: "4950", currencyCode: "INR" },
            selectedOptions: [{ name: "Size", value: "50ml" }],
        }
    );

    // Gifting configuration states
    const [hasGiftWrap, setHasGiftWrap] = useState(true);
    const [giftMessage, setGiftMessage] = useState("");
    const [senderName, setSenderName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: "", size: "" });

    const GIFT_WRAP_PRICE = 250; // INR
    const MESSAGE_MAX_LENGTH = 200;

    // Currency Formatter
    const formatPrice = (amount: number, currencyCode: string = "INR") => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currencyCode,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const variantPrice = Number(selectedVariant?.price?.amount || 4950);
    const totalPrice = variantPrice + (hasGiftWrap ? GIFT_WRAP_PRICE : 0);
    const formattedTotal = formatPrice(
        totalPrice,
        selectedVariant?.price?.currencyCode || "INR"
    );

    const charCount = giftMessage.length;
    const isNearLimit = charCount >= MESSAGE_MAX_LENGTH - 20;

    // Add to cart with Shopify Line Item Attributes
    const handleAddGiftToCart = async () => {
        if (!selectedVariant) return;
        setIsAdding(true);

        const attributes: CartLineAttribute[] = [
            {
                key: "Gift Wrap",
                value: hasGiftWrap
                    ? `Yes (+${formatPrice(GIFT_WRAP_PRICE)} - Wax-sealed Botanical Wrap)`
                    : "Standard Luxury Box",
            },
            {
                key: "Personalised Message",
                value:
                    giftMessage.trim() ||
                    "None (Complimentary Blank Calligraphy Card enclosed)",
            },
            {
                key: "Sender Name",
                value: senderName.trim() || "Anonymous Gifter",
            },
            {
                key: "Occasion",
                value: selectedOccasion?.title || "Bespoke Gifting",
            },
        ];

        try {
            await addProductToCart({
                merchandiseId: selectedVariant.id,
                quantity: 1,
                attributes,
            });

            setToastMessage({
                title: product.title,
                size: `${selectedVariant.title} (Gift Edition)`,
            });
            setShowToast(true);

            // Auto-dismiss toast after 5 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        } catch (err) {
            console.error("Failed to add gift to cart:", err);
        } finally {
            setIsAdding(false);
        }
    };

    const flaconImage =
        product?.featuredImage?.url ||
        "/landing-pages/meng-to-sketchbook/naya-panna.png";

    return (
        <section
            className="kissa-gifting-section"
            id="build-your-gift"
            aria-label="Build Your Gift Configurator"
        >
            <div className="section-header">
                <span className="section-label">ATELIER CUSTOMIZATION</span>
                <h2 className="section-title">Build Your Gift</h2>
                <p className="section-desc">
                    Select your flacon, include bespoke wax-sealed botanical wrap, and compose a personalized message card handwritten by our atelier scribe. [EDIT]
                </p>
            </div>

            <div className="kissa-builder-wrap">
                <div className="kissa-builder-grid">
                    {/* Left: Product Stage & Live Calligraphy Preview */}
                    <div className="kissa-builder-stage">
                        <div className="kissa-builder-media-box">
                            <span className="kissa-builder-stage-badge">
                                {product?.editionBadge || "EDITION 01 · BATCH NO. 248"}
                            </span>
                            <img
                                src={flaconImage}
                                alt={product?.title || "KISSA artisanal perfume flacon"}
                                width="520"
                                height="620"
                            />
                        </div>

                        <div className="kissa-builder-stage-info">
                            <h3 className="kissa-builder-stage-title">
                                {product?.title || "NAYA PANNA"}
                            </h3>
                            <p className="kissa-builder-stage-tagline">
                                {product?.shortTagline ||
                                    "Artisanal 28% Extrait de Parfum · Indian Botanical Herbarium [EDIT]"}
                            </p>
                        </div>

                        {/* Live Calligraphy Card Preview */}
                        <div className="kissa-calligraphy-preview-container">
                            <div className="kissa-calligraphy-card">
                                <div className="kissa-calligraphy-header">
                                    <span className="kissa-calligraphy-header-label">
                                        ✦ ATELIER HANDWRITTEN CORRESPONDENCE
                                    </span>
                                    <div
                                        className="kissa-calligraphy-wax-seal"
                                        title="Hand-poured KISSA botanical wax seal"
                                    >
                                        K
                                    </div>
                                </div>

                                <div
                                    className={`kissa-calligraphy-body ${
                                        !giftMessage.trim() ? "is-placeholder" : ""
                                    }`}
                                >
                                    {giftMessage.trim()
                                        ? `“${giftMessage}”`
                                        : "“Your personalized message will be inscribed by hand here on textured 300 GSM Italian cotton paper…” [EDIT]"}
                                </div>

                                <div className="kissa-calligraphy-footer">
                                    {senderName.trim()
                                        ? `— With warmest regards, ${senderName}`
                                        : "— With love, [Sender Name]"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Customization Controls */}
                    <div className="kissa-builder-controls">
                        {/* Occasion Indicator */}
                        {selectedOccasion && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    background: "var(--gold-soft)",
                                    border: "1px solid rgba(204, 85, 0, 0.2)",
                                    padding: "10px 16px",
                                    borderRadius: "12px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ color: "var(--earth)" }}>✦</span>
                                    <span
                                        style={{
                                            fontFamily: "var(--sans)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "var(--earth-dark)",
                                        }}
                                    >
                                        Curated For: {selectedOccasion.title}
                                    </span>
                                </div>
                                {onResetOccasion && (
                                    <button
                                        type="button"
                                        onClick={onResetOccasion}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "var(--ink-soft)",
                                            fontSize: 11,
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            fontFamily: "var(--sans)",
                                        }}
                                    >
                                        Change
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Step 1: Flacon Size / Variant */}
                        <div className="kissa-customizer-block">
                            <div className="kissa-customizer-label-row">
                                <label className="kissa-customizer-label">
                                    1. Choose Flacon Size
                                </label>
                                <span className="kissa-customizer-subtext">
                                    28% Extrait Concentration
                                </span>
                            </div>

                            <div className="kissa-builder-variants-grid">
                                {product?.variants?.map((v) => {
                                    const isSelected = selectedVariant.id === v.id;
                                    return (
                                        <div
                                            key={v.id}
                                            className={`kissa-builder-variant-pill ${
                                                isSelected ? "is-active" : ""
                                            }`}
                                            onClick={() => setSelectedVariant(v)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    setSelectedVariant(v);
                                                }
                                            }}
                                            aria-pressed={isSelected}
                                        >
                                            <span className="kissa-builder-variant-name">
                                                {v.title}
                                            </span>
                                            <span className="kissa-builder-variant-price">
                                                {formatPrice(
                                                    Number(v.price.amount),
                                                    v.price.currencyCode
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Premium Gift Wrap Toggle */}
                        <div className="kissa-customizer-block">
                            <div className="kissa-customizer-label-row">
                                <label className="kissa-customizer-label">
                                    2. Premium Botanical Gift Wrap
                                </label>
                                <span className="kissa-customizer-subtext">
                                    Archival Paper &amp; Wax
                                </span>
                            </div>

                            <div
                                className={`kissa-wrap-toggle-card ${
                                    hasGiftWrap ? "is-active" : ""
                                }`}
                                onClick={() => setHasGiftWrap(!hasGiftWrap)}
                                role="switch"
                                aria-checked={hasGiftWrap}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setHasGiftWrap(!hasGiftWrap);
                                    }
                                }}
                            >
                                <div className="kissa-wrap-info">
                                    <div className="kissa-wrap-title-row">
                                        <span className="kissa-wrap-title">
                                            Signature Wax-Sealed Wrap
                                        </span>
                                        <span className="kissa-wrap-price-badge">
                                            +{formatPrice(GIFT_WRAP_PRICE)} [EDIT]
                                        </span>
                                    </div>
                                    <p className="kissa-wrap-desc">
                                        Hand-wrapped in archival textured parchment, tied with raw hand-spun silk twine, and stamped with our botanical wax insignia. [EDIT]
                                    </p>
                                </div>

                                <div
                                    className={`kissa-toggle-switch ${
                                        hasGiftWrap ? "is-on" : ""
                                    }`}
                                    aria-hidden="true"
                                >
                                    <div className="kissa-toggle-thumb" />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Personalised Message Card */}
                        <div className="kissa-customizer-block">
                            <div className="kissa-customizer-label-row">
                                <label
                                    htmlFor="gifting-message"
                                    className="kissa-customizer-label"
                                >
                                    3. Personalised Calligraphy Card
                                </label>
                                <span
                                    className={`kissa-char-counter ${
                                        isNearLimit ? "is-near-limit" : ""
                                    }`}
                                >
                                    {charCount} / {MESSAGE_MAX_LENGTH} characters
                                </span>
                            </div>

                            <div className="kissa-message-box-wrap">
                                <textarea
                                    id="gifting-message"
                                    className="kissa-message-textarea"
                                    placeholder="Write your heartfelt note here… (e.g. Wishing you a year as enchanting as this fragrance. Happy Birthday!) [EDIT]"
                                    maxLength={MESSAGE_MAX_LENGTH}
                                    value={giftMessage}
                                    onChange={(e) => setGiftMessage(e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <span
                                style={{
                                    fontFamily: "var(--font)",
                                    fontSize: 12,
                                    color: "var(--ink-faint)",
                                    marginTop: 6,
                                    display: "block",
                                    fontStyle: "italic",
                                }}
                            >
                                Complimentary · Handwritten by our atelier scribe on 300 GSM cotton paper.
                            </span>
                        </div>

                        {/* Step 4: Sender Name */}
                        <div className="kissa-customizer-block">
                            <div className="kissa-customizer-label-row">
                                <label
                                    htmlFor="gifting-sender"
                                    className="kissa-customizer-label"
                                >
                                    4. From / Sender Name
                                </label>
                                <span className="kissa-customizer-subtext">Optional</span>
                            </div>

                            <input
                                type="text"
                                id="gifting-sender"
                                className="kissa-text-input"
                                placeholder="Your name (e.g. Kabir, The Sharmas) [EDIT]"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                maxLength={60}
                            />
                        </div>

                        {/* Summary & Add to Cart */}
                        <div className="kissa-builder-summary-row">
                            <div className="kissa-builder-price-group">
                                <span className="kissa-builder-price-label">
                                    Total Gift Edition Price
                                </span>
                                <span className="kissa-builder-total-price">
                                    {formattedTotal}
                                </span>
                                <span className="kissa-builder-price-note">
                                    Includes complimentary calligraphy card &amp; taxes
                                </span>
                            </div>

                            <button
                                type="button"
                                className="kissa-builder-add-btn"
                                onClick={handleAddGiftToCart}
                                disabled={isAdding}
                            >
                                {isAdding ? (
                                    <>
                                        <span>Encapsulating Gift…</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Add Gift to Bag · {formattedTotal}</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Added Toast Notification */}
            <AddedToast
                visible={showToast}
                onClose={() => setShowToast(false)}
                title={toastMessage.title}
                size={toastMessage.size}
            />
        </section>
    );
}

