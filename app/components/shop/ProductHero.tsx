import { useState, useRef, type MouseEvent, type TouchEvent } from "react";
import type { ShopProduct, ProductVariant } from "../../lib/products";

export interface ProductHeroProps {
    product: ShopProduct;
    selectedVariant: ProductVariant;
    onSelectVariant: (variant: ProductVariant) => void;
    quantity: number;
    onQuantityChange: (qty: number) => void;
    onAddToCart: () => void;
    onBuyNow: () => void;
    isAddingToCart: boolean;
    heroRef?: React.RefObject<HTMLDivElement | null>;
}

export function ProductHero({
    product,
    selectedVariant,
    onSelectVariant,
    quantity,
    onQuantityChange,
    onAddToCart,
    onBuyNow,
    isAddingToCart,
    heroRef,
}: ProductHeroProps) {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const touchStartX = useRef<number | null>(null);

    const images = product.images.length ? product.images : [product.featuredImage];
    const activeImage = images[activeImageIdx] || images[0];

    // Format currency in Indian Rupees
    const formatPrice = (amount: string, currencyCode: string) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currencyCode,
            maximumFractionDigits: 0,
        }).format(Number(amount));
    };

    const currentPrice = formatPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
    );

    const hasDiscount =
        selectedVariant.compareAtPrice &&
        Number(selectedVariant.compareAtPrice.amount) >
            Number(selectedVariant.price.amount);

    const comparePrice = hasDiscount
        ? formatPrice(
              selectedVariant.compareAtPrice!.amount,
              selectedVariant.compareAtPrice!.currencyCode
          )
        : null;

    const discountSavings = hasDiscount
        ? Number(selectedVariant.compareAtPrice!.amount) -
          Number(selectedVariant.price.amount)
        : 0;

    // Desktop Image Zoom on Mouse Move
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    // Mobile Swipe Handling
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (diff > 50) {
            // Swipe Left -> Next
            setActiveImageIdx((prev) => (prev + 1) % images.length);
        } else if (diff < -50) {
            // Swipe Right -> Prev
            setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
        }
        touchStartX.current = null;
    };

    return (
        <section
            ref={heroRef}
            className="kissa-product-hero-section"
            aria-label={`${product.title} product details`}
        >
            <div className="kissa-hero-container">
                {/* Left Column: Image Gallery (Thumbnails + Main View + Zoom + Mobile Swipe) */}
                <div className="kissa-gallery-wrapper">
                    {/* Thumbnails row / column */}
                    <div
                        className="kissa-thumbnails-strip"
                        role="tablist"
                        aria-label="Product image thumbnails"
                    >
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                role="tab"
                                aria-selected={activeImageIdx === idx}
                                aria-label={`View image ${idx + 1}`}
                                className={`kissa-thumb-btn ${
                                    activeImageIdx === idx ? "is-active" : ""
                                }`}
                                onClick={() => setActiveImageIdx(idx)}
                                onMouseEnter={() => setActiveImageIdx(idx)}
                            >
                                <img
                                    src={img.url}
                                    alt={img.altText || `${product.title} thumbnail ${idx + 1}`}
                                    className="kissa-thumb-img"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main Stage Image with Zoom & Swipe */}
                    <div
                        className="kissa-main-image-stage"
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <span className="kissa-card-badge">
                            {product.editionBadge}
                        </span>

                        <div className="kissa-main-img-viewport">
                            <img
                                src={activeImage.url}
                                alt={activeImage.altText || product.title}
                                className={`kissa-main-img ${isZooming ? "is-zoomed" : ""}`}
                                style={
                                    isZooming
                                        ? {
                                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                          }
                                        : undefined
                                }
                            />
                        </div>

                        {/* Mobile Swipe Pagination Dots */}
                        <div className="kissa-mobile-dots" aria-hidden="true">
                            {images.map((_, dotIdx) => (
                                <span
                                    key={dotIdx}
                                    className={`kissa-dot ${
                                        activeImageIdx === dotIdx ? "is-active" : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative, Variants, Quantity & Purchase Actions */}
                <div className="kissa-details-col">
                    {/* Concentration & Specimen Kicker */}
                    <span className="kissa-details-kicker">
                        {product.concentration}
                    </span>

                    {/* Title */}
                    <h1 className="kissa-details-title">{product.title}</h1>

                    {/* Star Rating Summary with Jump Link */}
                    <div className="kissa-rating-row">
                        <a href="#reviews" className="kissa-rating-link">
                            <span className="kissa-rating-stars-inline">★★★★★</span>
                            <span className="kissa-rating-score">
                                {product.reviews.averageRating.toFixed(1)}
                            </span>
                            <span className="kissa-rating-count">
                                ({product.reviews.reviewCount} Reviews)
                            </span>
                        </a>
                        <span className="kissa-rating-sep">·</span>
                        <span className="kissa-sillage-badge">{product.sillage}</span>
                    </div>

                    {/* Short Story Tagline */}
                    <p className="kissa-details-tagline">{product.shortTagline}</p>

                    {/* Pricing Display */}
                    <div className="kissa-price-box">
                        <div className="kissa-price-row">
                            <span className="kissa-current-price">{currentPrice}</span>
                            {hasDiscount && (
                                <>
                                    <span className="kissa-compare-price">
                                        {comparePrice}
                                    </span>
                                    <span className="kissa-savings-badge">
                                        Save ₹{discountSavings}
                                    </span>
                                </>
                            )}
                        </div>
                        <p className="kissa-tax-note">
                            Inclusive of all taxes · Complimentary express domestic shipping
                        </p>
                    </div>

                    {/* Size Selector (Variants) */}
                    <div className="kissa-variants-group">
                        <div className="kissa-variants-label-row">
                            <span className="kissa-variants-label">SELECT FLACON SIZE</span>
                            <span className="kissa-variants-active-name">
                                {selectedVariant.title}
                            </span>
                        </div>

                        <div className="kissa-variants-pills" role="radiogroup" aria-label="Flacon size options">
                            {product.variants.map((v) => {
                                const isSelected = selectedVariant.id === v.id;
                                const vPrice = formatPrice(v.price.amount, v.price.currencyCode);
                                return (
                                    <button
                                        key={v.id}
                                        type="button"
                                        role="radio"
                                        aria-checked={isSelected}
                                        className={`kissa-variant-pill ${
                                            isSelected ? "is-selected" : ""
                                        }`}
                                        onClick={() => onSelectVariant(v)}
                                    >
                                        <div className="kissa-variant-pill-top">
                                            <span className="kissa-variant-title">{v.title}</span>
                                            {isSelected && (
                                                <span className="kissa-variant-check">✓</span>
                                            )}
                                        </div>
                                        <span className="kissa-variant-price">{vPrice}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="kissa-qty-row">
                        <span className="kissa-qty-label">QUANTITY</span>
                        <div className="kissa-qty-picker" role="group" aria-label="Select quantity">
                            <button
                                type="button"
                                className="kissa-qty-btn"
                                aria-label="Decrease quantity"
                                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <span className="kissa-qty-count" aria-live="polite">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                className="kissa-qty-btn"
                                aria-label="Increase quantity"
                                onClick={() => onQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* CTA Actions: Add to Cart and Buy Now */}
                    <div className="kissa-actions-cluster">
                        <button
                            type="button"
                            className="kissa-add-to-cart-cta"
                            onClick={onAddToCart}
                            disabled={isAddingToCart || !selectedVariant.availableForSale}
                        >
                            {isAddingToCart ? (
                                <span>Adding to Bag…</span>
                            ) : (
                                <span>+ Add to Bag · {currentPrice}</span>
                            )}
                        </button>

                        <button
                            type="button"
                            className="kissa-buy-now-cta"
                            onClick={onBuyNow}
                            disabled={isAddingToCart || !selectedVariant.availableForSale}
                        >
                            Instant Buy Now →
                        </button>
                    </div>

                    {/* Discovery Guarantee Assurance Note */}
                    <div className="kissa-hero-assurance">
                        <span className="kissa-assurance-icon">✦</span>
                        <p className="kissa-assurance-text">
                            <strong>The Discovery Guarantee:</strong> Each flacon includes a complimentary 2ml sample vial.
                            Wear the sample first — if you are not enchanted, return the unopened full flacon within 14 days for a 100% refund.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

