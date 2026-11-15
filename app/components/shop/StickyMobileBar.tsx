import type { ProductVariant } from "../../lib/products";

export function StickyMobileBar({
    title,
    thumbnailUrl,
    selectedVariant,
    onAddToCart,
    isAdding,
    visible,
}: {
    title: string;
    thumbnailUrl: string;
    selectedVariant: ProductVariant;
    onAddToCart: () => void;
    isAdding: boolean;
    visible: boolean;
}) {
    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: selectedVariant.price.currencyCode,
        maximumFractionDigits: 0,
    }).format(Number(selectedVariant.price.amount));

    return (
        <aside
            className={`kissa-sticky-mobile-bar ${visible ? "is-visible" : ""}`}
            aria-label="Quick Add to Bag"
        >
            <div className="kissa-sticky-bar-inner">
                {/* Product Thumbnail & Details */}
                <div className="kissa-sticky-product-meta">
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="kissa-sticky-thumb"
                    />
                    <div className="kissa-sticky-text">
                        <span className="kissa-sticky-title">{title}</span>
                        <div className="kissa-sticky-price-row">
                            <span className="kissa-sticky-size">{selectedVariant.title}</span>
                            <span className="kissa-sticky-dot">·</span>
                            <span className="kissa-sticky-price">{formattedPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Add to Bag CTA */}
                <button
                    type="button"
                    className="kissa-sticky-add-btn"
                    onClick={onAddToCart}
                    disabled={isAdding || !selectedVariant.availableForSale}
                >
                    {isAdding ? "Adding…" : "+ Add to Bag"}
                </button>
            </div>
        </aside>
    );
}

