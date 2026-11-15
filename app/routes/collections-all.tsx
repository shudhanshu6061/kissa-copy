import { useEffect, useMemo, useState } from "react";
import { gql } from "@shopify/hydrogen";
import type { ShouldRevalidateFunctionArgs } from "react-router";
import { Link, useFetcher, useSearchParams } from "react-router";
import type { Route } from "./+types/collections-all";
import { storefrontContext } from "../lib/context";
import {
    isValidCategory,
    isValidSort,
    matchesCategory,
    matchesSearch,
    sortProducts,
    type CategoryId,
    type CollectionProduct,
    type SortOption,
} from "../lib/collection-filters";
import { CollectionHero } from "../components/collection/CollectionHero";
import { ProductCard } from "../components/collection/ProductCard";
import { EmptyState } from "../components/collection/EmptyState";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const PRODUCTS_PER_PAGE = 50;

const PRODUCTS_QUERY = gql(`
    query AllProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
            nodes {
                id
                title
                handle
                description
                productType
                tags
                featuredImage {
                    url
                    altText
                    width
                    height
                }
                images(first: 2) {
                    nodes {
                        url
                        altText
                    }
                }
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

export async function loader({ context, request }: Route.LoaderArgs) {
    const storefront = context.get(storefrontContext);
    const after = new URL(request.url).searchParams.get("after");

    const { data } = await storefront.graphql(PRODUCTS_QUERY, {
        variables: { first: PRODUCTS_PER_PAGE, after },
    });

    return {
        products: data?.products.nodes ?? [],
        pageInfo:
            data?.products.pageInfo ?? { hasNextPage: false, endCursor: null },
    };
}

// Category/search/sort live in the URL for shareable filtered views, but they
// never require Shopify data we don't already have — only the `after` cursor
// (used by the "Load More" fetcher) should trigger a loader re-fetch.
export function shouldRevalidate({
    currentUrl,
    nextUrl,
    defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
    if (currentUrl.searchParams.get("after") !== nextUrl.searchParams.get("after")) {
        return true;
    }
    return defaultShouldRevalidate && currentUrl.pathname !== nextUrl.pathname;
}

export default function CollectionsAll({
    loaderData,
}: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const loadMoreFetcher = useFetcher<typeof loader>();

    const [products, setProducts] = useState<CollectionProduct[]>(
        loaderData.products
    );
    const [pageInfo, setPageInfo] = useState(loaderData.pageInfo);

    useEffect(() => {
        if (loadMoreFetcher.data) {
            setProducts((prev) => [...prev, ...loadMoreFetcher.data!.products]);
            setPageInfo(loadMoreFetcher.data.pageInfo);
        }
    }, [loadMoreFetcher.data]);

    const categoryParam = searchParams.get("category");
    const selectedCategory: CategoryId = isValidCategory(categoryParam)
        ? categoryParam
        : "ALL";
    const searchQuery = searchParams.get("q") ?? "";
    const sortParam = searchParams.get("sort");
    const sort: SortOption = isValidSort(sortParam) ? sortParam : "featured";

    function updateParams(patch: Record<string, string | null>) {
        const next = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(patch)) {
            if (value === null || value === "") {
                next.delete(key);
            } else {
                next.set(key, value);
            }
        }
        setSearchParams(next, { replace: true, preventScrollReset: true });
    }

    function handleReset() {
        setSearchParams({}, { replace: true, preventScrollReset: true });
    }

    function handleLoadMore() {
        if (!pageInfo.hasNextPage || loadMoreFetcher.state !== "idle") return;
        loadMoreFetcher.load(
            `/collections/all?after=${encodeURIComponent(pageInfo.endCursor ?? "")}`
        );
    }

    // Filter/sort over everything loaded so far (initial page + any "Load More" pages).
    const filteredProducts = useMemo(() => {
        const filtered = products.filter(
            (product) =>
                matchesSearch(product, searchQuery) &&
                matchesCategory(product, selectedCategory)
        );
        return sortProducts(filtered, sort);
    }, [products, selectedCategory, searchQuery, sort]);

    const isLoadingMore = loadMoreFetcher.state !== "idle";

    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            {/* Atmospheric painted wash background from homepage */}
            <div className="kissa-wash" />

            {/* Navigation Bar with Dropdown Mega Menu & Announcement Bar */}
            <Navbar cartCount={1} />

            <main style={{ paddingBottom: 60 }}>
                <CollectionHero
                    selectedCategory={selectedCategory}
                    onSelectCategory={(id: CategoryId) =>
                        updateParams({ category: id === "ALL" ? null : id })
                    }
                    searchQuery={searchQuery}
                    onSearchChange={(value) => updateParams({ q: value || null })}
                    sort={sort}
                    onSortChange={(value) =>
                        updateParams({ sort: value === "featured" ? null : value })
                    }
                    resultCount={filteredProducts.length}
                />

                {/* Fragrance Products Grid */}
                {filteredProducts.length === 0 ? (
                    <EmptyState onReset={handleReset} />
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
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                editionNumber={String(index + 1).padStart(2, "0")}
                            />
                        ))}
                    </section>
                )}

                {pageInfo.hasNextPage && (
                    <button
                        type="button"
                        className="kissa-load-more-btn"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? "Loading…" : "Load More Editions"}
                    </button>
                )}

                {/* Discovery Coffret Callout Feature */}
                <section
                    style={{
                        maxWidth: 1320,
                        margin: "80px auto 20px",
                        padding: "0 24px",
                    }}
                >
                    <div
                        style={{
                            background: "var(--paper-cream)",
                            border: "1px solid var(--hairline)",
                            borderRadius: 20,
                            padding: "clamp(30px, 4vw, 55px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 30,
                            boxShadow: "0 10px 30px rgba(78, 52, 46, 0.04)",
                        }}
                    >
                        <div style={{ maxWidth: 640 }}>
                            <span
                                style={{
                                    fontFamily: "var(--sans)",
                                    fontSize: 11,
                                    letterSpacing: "var(--track-caps)",
                                    textTransform: "uppercase",
                                    color: "var(--earth)",
                                    display: "block",
                                    marginBottom: 10,
                                }}
                            >
                                THE DISCOVERY WARDROBE
                            </span>
                            <h3
                                style={{
                                    fontFamily: "var(--display)",
                                    fontSize: "clamp(28px, 4vw, 42px)",
                                    fontWeight: 400,
                                    margin: "0 0 12px",
                                    color: "var(--ink)",
                                    lineHeight: 1.15,
                                }}
                            >
                                Can&apos;t decide on a single signature scent?
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font)",
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--ink-soft)",
                                    margin: 0,
                                }}
                            >
                                Experience the complete botanical collection with our numbered discovery coffret.
                                Includes miniature flacons hand-poured with sealing wax and a complimentary voucher towards your full-sized bottle.
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="kissa-add-btn"
                            style={{
                                padding: "14px 28px",
                                fontSize: 12,
                                display: "inline-block",
                                textAlign: "center",
                            }}
                        >
                            Explore Discovery Set →
                        </Link>
                    </div>
                </section>
            </main>

            {/* Grand Editorial Footer with Centered KISSA Logo */}
            <Footer />
        </div>
    );
}
