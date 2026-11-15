import {
    CATEGORIES,
    SORT_OPTIONS,
    type CategoryId,
    type SortOption,
} from "../../lib/collection-filters";

export function CollectionHero({
    selectedCategory,
    onSelectCategory,
    searchQuery,
    onSearchChange,
    sort,
    onSortChange,
    resultCount,
}: {
    selectedCategory: CategoryId;
    onSelectCategory: (id: CategoryId) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    sort: SortOption;
    onSortChange: (value: SortOption) => void;
    resultCount: number;
}) {
    return (
        <section
            style={{
                textAlign: "center",
                padding: "clamp(30px, 5vw, 60px) clamp(20px, 4vw, 40px) 10px",
                maxWidth: 960,
                margin: "0 auto",
            }}
        >
            <p
                style={{
                    fontFamily: "var(--sans)",
                    color: "var(--earth)",
                    letterSpacing: "var(--track-caps)",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 14,
                }}
            >
                THE WORLD OF KISSA · BOTANICAL HERBARIUM
            </p>

            <h1
                style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(42px, 6vw, 76px)",
                    fontWeight: 400,
                    lineHeight: 1.08,
                    margin: "0 0 16px",
                    color: "var(--ink)",
                }}
            >
                Our Fragrance Editions
            </h1>

            <p
                style={{
                    fontFamily: "var(--font)",
                    fontSize: "clamp(16px, 2vw, 20px)",
                    lineHeight: 1.55,
                    color: "var(--ink-soft)",
                    maxWidth: 640,
                    margin: "0 auto 30px",
                    fontStyle: "italic",
                }}
            >
                Discover artisanal perfumes crafted for moments that matter.
                Born of wild equatorial extracts, temple resins, and living
                watercolors.
            </p>

            {/* Search */}
            <div className="kissa-search-wrap" style={{ marginBottom: 20 }}>
                <label htmlFor="kissa-collection-search" className="sr-only">
                    Search fragrances
                </label>
                <input
                    id="kissa-collection-search"
                    type="search"
                    className="kissa-search-input"
                    placeholder="Search by name or note…"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Category Filter Pills */}
            <div className="kissa-filter-container" role="group" aria-label="Filter by category">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        className={`kissa-filter-btn ${
                            selectedCategory === cat.id ? "active" : ""
                        }`}
                        aria-pressed={selectedCategory === cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Sort */}
            <div className="kissa-controls-row">
                <label htmlFor="kissa-collection-sort" className="sr-only">
                    Sort fragrances
                </label>
                <select
                    id="kissa-collection-sort"
                    className="kissa-sort-select"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                            Sort: {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Specimen count & search status */}
            <p
                aria-live="polite"
                style={{
                    fontFamily: "var(--sans)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    margin: "0 0 40px",
                }}
            >
                {resultCount} {resultCount === 1 ? "FRAGRANCE PLATE" : "FRAGRANCE PLATES"}{" "}
                AVAILABLE
            </p>
        </section>
    );
}
