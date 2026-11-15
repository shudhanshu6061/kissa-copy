// Shape of a product as returned by the collection page's PRODUCTS_QUERY.
export type CollectionProduct = {
    id: string;
    title: string;
    handle: string;
    description?: string | null;
    productType?: string | null;
    tags?: string[] | null;
    featuredImage?: {
        url: string;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
    } | null;
    priceRange: {
        minVariantPrice: { amount: string; currencyCode: string };
        maxVariantPrice: { amount: string; currencyCode: string };
    };
};

export type CategoryId = "ALL" | "BOTANICAL" | "WOODY" | "AMBER" | "FLORAL";

export const CATEGORIES: {
    id: CategoryId;
    label: string;
    keywords: string[];
}[] = [
    { id: "ALL", label: "All Editions", keywords: [] },
    {
        id: "BOTANICAL",
        label: "Botanical & Verdant",
        keywords: ["botanical", "green", "verdant", "leaf", "orchid", "moss"],
    },
    {
        id: "WOODY",
        label: "Smoky & Teakwood",
        keywords: ["woody", "teak", "wood", "smoke", "oud", "incense", "cedar"],
    },
    {
        id: "AMBER",
        label: "Warm Ambers",
        keywords: ["amber", "saffron", "resin", "warm", "resins"],
    },
    {
        id: "FLORAL",
        label: "Rare Florals",
        keywords: ["floral", "rose", "lotus", "bloom", "flower", "blossom"],
    },
];

/** True when the product matches the given category's keywords (tags, productType, or title/description text). */
export function matchesCategory(
    product: CollectionProduct,
    categoryId: CategoryId
): boolean {
    if (categoryId === "ALL") return true;

    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return true;

    const tags = (product.tags || []).map((t) => t.toLowerCase());
    const productType = (product.productType || "").toLowerCase();
    const text = `${product.title} ${product.description || ""}`.toLowerCase();

    return category.keywords.some(
        (keyword) =>
            tags.some((tag) => tag.includes(keyword)) ||
            productType.includes(keyword) ||
            text.includes(keyword)
    );
}

/** True when the product's title or description contains the search query (case-insensitive). */
export function matchesSearch(product: CollectionProduct, query: string): boolean {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return true;

    return (
        product.title.toLowerCase().includes(trimmed) ||
        (product.description || "").toLowerCase().includes(trimmed)
    );
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "title-asc";

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
    { id: "featured", label: "Featured" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "title-asc", label: "Name: A to Z" },
];

export function sortProducts<T extends CollectionProduct>(
    products: T[],
    sort: SortOption
): T[] {
    if (sort === "featured") return products;

    const sorted = [...products];

    if (sort === "price-asc") {
        sorted.sort(
            (a, b) =>
                Number(a.priceRange.minVariantPrice.amount) -
                Number(b.priceRange.minVariantPrice.amount)
        );
    } else if (sort === "price-desc") {
        sorted.sort(
            (a, b) =>
                Number(b.priceRange.minVariantPrice.amount) -
                Number(a.priceRange.minVariantPrice.amount)
        );
    } else if (sort === "title-asc") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
}

export function isValidCategory(value: string | null): value is CategoryId {
    return !!value && CATEGORIES.some((c) => c.id === value);
}

export function isValidSort(value: string | null): value is SortOption {
    return !!value && SORT_OPTIONS.some((s) => s.id === value);
}
