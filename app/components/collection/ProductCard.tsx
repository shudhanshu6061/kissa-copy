import type { CollectionProduct } from "../../lib/collection-filters";

function formatPrice(amount: string, currencyCode: string): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 0,
    }).format(Number(amount));
}

export function ProductCard({
    product,
    editionNumber,
}: {
    product: CollectionProduct;
    editionNumber: string;
}) {
    const { minVariantPrice, maxVariantPrice } = product.priceRange;
    const hasPriceRange = minVariantPrice.amount !== maxVariantPrice.amount;
    const notes =
        product.tags && product.tags.length > 0
            ? product.tags.slice(0, 3)
            : ["Botanical Extract", "Artisanal", "Extrait"];

    return (
        <article className="kissa-perfume-card">
            <div className="kissa-card-media">
                <span className="kissa-card-badge">Edition N°{editionNumber}</span>

                {product.featuredImage ? (
                    <img
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        loading="lazy"
                        className="kissa-card-img"
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(135deg, #EFE8D8 0%, #E3D9C3 100%)",
                        }}
                    >
                        <img
                            src="/kissa-logo-transparent.png"
                            alt="KISSA"
                            style={{ height: 28, opacity: 0.6 }}
                        />
                    </div>
                )}
            </div>

            <div className="kissa-card-body">
                <span className="kissa-card-specimen">
                    EXTRAIT DE PARFUM · BOTANICAL FORMULATION
                </span>

                <h2 className="kissa-card-title">{product.title}</h2>

                <div className="kissa-note-pills">
                    {notes.map((note, noteIdx) => (
                        <span key={noteIdx} className="kissa-note-pill">
                            {note}
                        </span>
                    ))}
                </div>

                {product.description && (
                    <p className="kissa-card-description">{product.description}</p>
                )}

                <div className="kissa-card-footer">
                    <div className="kissa-card-price-wrap">
                        <span className="kissa-card-price">
                            {hasPriceRange ? "From " : ""}
                            {formatPrice(
                                minVariantPrice.amount,
                                minVariantPrice.currencyCode
                            )}
                        </span>
                        <span className="kissa-card-volume">50ml Extrait Flacon</span>
                    </div>

                    <button
                        type="button"
                        className="kissa-add-btn"
                        title={`Add ${product.title} to bag`}
                    >
                        + Add to Bag
                    </button>
                </div>
            </div>
        </article>
    );
}
