import { useState, useMemo } from "react";
import type { ShopProduct } from "../../lib/products";
import { ProductCard } from "../collection/ProductCard";
import { EmptyState } from "../collection/EmptyState";
import {
    CATEGORIES,
    SORT_OPTIONS,
    matchesCategory,
    matchesSearch,
    sortProducts,
    type CategoryId,
    type SortOption,
} from "../../lib/collection-filters";

export function ProductGridFallback({ products }: { products: ShopProduct[] }) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState<SortOption>("featured");

    // Convert ShopProduct to CollectionProduct shape
    const collectionProducts = useMemo(() => {
        return products.map((p) => ({
            id: p.id,
            title: p.title,
            handle: p.handle,
            description: p.description,
            productType: "Extrait de Parfum",
            tags: ["Botanical", "Artisanal", "Extrait"],
            featuredImage: p.featuredImage,
            images: p.images,
            priceRange: p.priceRange,
        }));
    }, [products]);

    const filtered = useMemo(() => {
        const matching = collectionProducts.filter(
            (p) =>
                matchesSearch(p, searchQuery) &&
                matchesCategory(p, selectedCategory)
        );
        return sortProducts(matching, sort);
    }, [collectionProducts, selectedCategory, searchQuery, sort]);

    return (
        <div className="kissa-catalog-fallback">
            <section className="kissa-page-hero">
                <span className="kissa-page-kicker">THE COMPLETE CATALOG</span>
                <h1 className="kissa-page-title">Fragrance Editions</h1>
                <p className="kissa-page-desc">
                    Discover artisanal perfumes crafted for moments that matter.
                    Born of wild equatorial extracts, temple resins, and living watercolors.
                </p>

                {/* Search */}
                <div className="kissa-search-wrap" style={{ marginBottom: 20 }}>
                    <input
                        type="search"
                        className="kissa-search-input"
                        placeholder="Search by name or accord note..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Pills */}
                <div className="kissa-filter-container" role="group" aria-label="Filter by category">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`kissa-filter-btn ${
                                selectedCategory === cat.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="kissa-controls-row">
                    <select
                        className="kissa-sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.id} value={o.id}>
                                Sort: {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            {filtered.length === 0 ? (
                <EmptyState
                    onReset={() => {
                        setSelectedCategory("ALL");
                        setSearchQuery("");
                        setSort("featured");
                    }}
                />
            ) : (
                <section
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                        gap: 40,
                        width: "100%",
                        maxWidth: 1320,
                        margin: "0 auto",
                        boxSizing: "border-box",
                        padding: "0 24px",
                    }}
                >
                    {filtered.map((product, idx) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            editionNumber={String(idx + 1).padStart(2, "0")}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}

