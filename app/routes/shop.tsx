import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/shop";
import { Layout } from "../components/Layout";
import { storefrontContext } from "../lib/context";
import { getShopProducts, type ShopProduct, type ProductVariant } from "../lib/products";
import { useCart } from "../context/CartContext";

// Sections
import { ProductHero } from "../components/shop/ProductHero";
import { TrustStrip } from "../components/shop/TrustStrip";
import { FragranceStory } from "../components/shop/FragranceStory";
import { FragranceNotes } from "../components/shop/FragranceNotes";
import { HowToWear } from "../components/shop/HowToWear";
import { ProductReviews } from "../components/shop/ProductReviews";
import { ProductFAQ } from "../components/shop/ProductFAQ";
import { StickyMobileBar } from "../components/shop/StickyMobileBar";
import { AddedToast } from "../components/shop/AddedToast";
import { ProductGridFallback } from "../components/shop/ProductGridFallback";

// -------------------------------------------------------------
// Loader: Server-side Fetch with Fallback
// -------------------------------------------------------------
export async function loader({ context }: Route.LoaderArgs) {
    const storefront = context.get(storefrontContext);
    const result = await getShopProducts(storefront);

    return {
        products: result.products,
        isSingleProduct: result.isSingleProduct,
        source: result.source,
    };
}

// -------------------------------------------------------------
// SEO Meta Tags
// -------------------------------------------------------------
export const meta: Route.MetaFunction = ({ data }) => {
    const product = data?.products?.[0];
    const title = product
        ? `${product.title} Extrait de Parfum · Botanical Herbarium | KISSA`
        : "Shop Fragrance Editions | KISSA Parfums";
    const description = product
        ? `${product.shortTagline} Artisanal 28% Extrait de Parfum hand-bottled in small numbered editions with complimentary wax-sealed sample guarantee.`
        : "Discover artisanal botanical perfumes born of wild equatorial extracts and living watercolors.";

    return [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product?.featuredImage?.url || "/kissa-logo-transparent.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
    ];
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export default function Shop({ loaderData }: Route.ComponentProps) {
    const { products, isSingleProduct } = loaderData;
    const product: ShopProduct = products[0];

    // Local state for single product interactive sales flow
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        product?.variants?.[0] || {
            id: "default",
            title: "50ml Extrait Flacon",
            availableForSale: true,
            price: { amount: "4950", currencyCode: "INR" },
            selectedOptions: [{ name: "Size", value: "50ml" }],
        }
    );
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: "", size: "" });
    const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);

    const heroRef = useRef<HTMLDivElement | null>(null);

    // Track when user scrolls past Hero section to reveal sticky mobile bar
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const heroBottom = heroRef.current.getBoundingClientRect().bottom;
            // Reveal sticky bar when bottom of hero reaches 100px from top
            setIsStickyBarVisible(heroBottom < 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { addToCart, proceedToCheckout } = useCart();

    // Handle adding to cart
    const handleAddToCart = async () => {
        if (!selectedVariant) return;
        setIsAdding(true);

        try {
            addToCart({
                id: selectedVariant.id,
                perfumeId: product?.handle || "naya-panna",
                title: product?.title || "NAYA PANNA",
                subtitle: `${product?.concentration || "Extrait de Parfum"} · ${selectedVariant.title}`,
                size: selectedVariant.selectedOptions?.[0]?.value || selectedVariant.title || "50ml",
                price: Number(selectedVariant.price?.amount) || 4950,
                qty: quantity,
                img: product?.featuredImage?.url || "/landing-pages/meng-to-sketchbook/naya-panna.png",
                merchandiseId: selectedVariant.id,
            });

            setToastMessage({
                title: product?.title || "NAYA PANNA",
                size: selectedVariant.title,
            });
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 4500);
        } catch (err) {
            console.error("Failed to add to cart:", err);
        } finally {
            setIsAdding(false);
        }
    };

    // Handle instant Buy Now
    const handleBuyNow = async () => {
        if (!selectedVariant) return;
        setIsAdding(true);

        try {
            addToCart({
                id: selectedVariant.id,
                perfumeId: product?.handle || "naya-panna",
                title: product?.title || "NAYA PANNA",
                subtitle: `${product?.concentration || "Extrait de Parfum"} · ${selectedVariant.title}`,
                size: selectedVariant.selectedOptions?.[0]?.value || selectedVariant.title || "50ml",
                price: Number(selectedVariant.price?.amount) || 4950,
                qty: quantity,
                img: product?.featuredImage?.url || "/landing-pages/meng-to-sketchbook/naya-panna.png",
                merchandiseId: selectedVariant.id,
            });
            proceedToCheckout();
        } catch (err) {
            console.error("Buy now failed:", err);
        } finally {
            setIsAdding(false);
        }
    };

    // JSON-LD Product Schema for SEO
    const productSchema = product
        ? {
              "@context": "https://schema.org/",
              "@type": "Product",
              name: `${product.title} Extrait de Parfum`,
              image: product.images.map((img) => img.url),
              description: product.description,
              brand: {
                  "@type": "Brand",
                  name: "KISSA Parfums",
              },
              offers: {
                  "@type": "Offer",
                  url: "https://kissa-parfums.com/shop",
                  priceCurrency: selectedVariant.price.currencyCode,
                  price: selectedVariant.price.amount,
                  availability: selectedVariant.availableForSale
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                  itemCondition: "https://schema.org/NewCondition",
                  seller: {
                      "@type": "Organization",
                      name: "KISSA Parfums",
                  },
              },
              aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: product.reviews.averageRating.toString(),
                  reviewCount: product.reviews.reviewCount.toString(),
                  bestRating: "5",
                  worstRating: "1",
              },
          }
        : null;

    return (
        <Layout>
            {/* Inject JSON-LD Schema */}
            {productSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(productSchema),
                    }}
                />
            )}

            {/* Added to Bag Toast Notification */}
            <AddedToast
                visible={showToast}
                onClose={() => setShowToast(false)}
                title={toastMessage.title}
                size={toastMessage.size}
            />

            {/* Automatic Grid Switcher:
                If more than 1 product exists in the catalog, switch to the full catalog grid.
                If 1 launch product exists, render the story-led sales page. */}
            {!isSingleProduct && products.length > 1 ? (
                <ProductGridFallback products={products} />
            ) : (
                <div className="kissa-single-product-page">
                    {/* SECTION 1: HERO (Image Gallery, Title, Tagline, Price, Variants, Qty, Add to Cart & Buy Now) */}
                    <ProductHero
                        heroRef={heroRef}
                        product={product}
                        selectedVariant={selectedVariant}
                        onSelectVariant={setSelectedVariant}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        isAddingToCart={isAdding}
                    />

                    {/* SECTION 2: TRUST STRIP (Free shipping, COD, Easy returns, Secure payments) */}
                    <TrustStrip badges={product.trustBadges} />

                    {/* SECTION 3: THE STORY (Emotional narrative section with alternating image and text) */}
                    <FragranceStory chapters={product.story} />

                    {/* SECTION 4: FRAGRANCE NOTES (Top, heart, base notes shown as visual cards) */}
                    <FragranceNotes pyramid={product.notes} />

                    {/* SECTION 5: HOW TO WEAR (3 short steps with icons & atelier secrets) */}
                    <HowToWear steps={product.howToWear} />

                    {/* SECTION 6: REVIEWS (Star rating summary + verified review cards) */}
                    <ProductReviews reviews={product.reviews} />

                    {/* SECTION 7: FAQ (Accordion with 6 common perfume questions) */}
                    <ProductFAQ faqs={product.faqs} />

                    {/* SECTION 8: STICKY ADD TO CART BAR ON MOBILE (Appears after scrolling past hero) */}
                    <StickyMobileBar
                        title={product.title}
                        thumbnailUrl={product.featuredImage.url}
                        selectedVariant={selectedVariant}
                        onAddToCart={handleAddToCart}
                        isAdding={isAdding}
                        visible={isStickyBarVisible}
                    />
                </div>
            )}
        </Layout>
    );
}
