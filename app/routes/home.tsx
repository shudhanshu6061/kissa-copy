import { useState, useEffect, useCallback } from "react";
import { gql } from "@shopify/hydrogen";
import type { Route } from "./+types/home";
import { storefrontContext } from "../lib/context";
import { useCart } from "../context/CartContext";
import { MainLayout } from "../layouts/MainLayout";

// Styles
import "../styles/landing-page.css";

// Data
import {
  PERFUMES,
  type Perfume,
  type CurrencyCode,
} from "../lib/landing-data";

// Components
import { BrandHero } from "../components/landing/BrandHero";
import { OurStory } from "../components/home/OurStory";
import { TheExperience } from "../components/home/TheExperience";
import { CollectionCatalog } from "../components/landing/CollectionCatalog";
import { DiscoveryCoffret } from "../components/landing/DiscoveryCoffret";
import { FragranceQuiz } from "../components/landing/FragranceQuiz";
import { AtelierCraftsmanship } from "../components/landing/AtelierCraftsmanship";
import { PlatesIndex } from "../components/landing/PlatesIndex";
import { SketchbookViewer } from "../components/landing/SketchbookViewer";

// Modals & Overlays
import { ProductDetailModal } from "../components/landing/ProductDetailModal";
import { SearchModal } from "../components/landing/SearchModal";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "KISSA Parfums — The Botanical Fragrance Herbarium" },
    {
      name: "description",
      content:
        "Artisanal botanical perfumes born of wild equatorial extracts, temple resins, and living watercolors. Hand-bottled in small numbered editions.",
    },
    { property: "og:title", content: "KISSA Parfums — The Botanical Fragrance Herbarium" },
    {
      property: "og:description",
      content:
        "Artisanal botanical perfumes born of wild equatorial extracts, temple resins, and living watercolors. Hand-bottled in small numbered editions.",
    },
    { property: "og:image", content: "/landing-pages/meng-to-sketchbook/kissa-hero.jpg" },
  ];
};

const PRODUCTS_QUERY = gql(`
    query Products {
        products(first: 8) {
            nodes {
                id
                title
                handle
                featuredImage {
                    url
                    altText
                }
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
`);

export async function loader({ context }: Route.LoaderArgs) {
  try {
    const storefront = context.get(storefrontContext);
    if (!storefront) {
      return { products: [] };
    }
    const { data, errors } = await storefront.graphql(PRODUCTS_QUERY);
    if (errors) {
      console.warn("Storefront returned query warnings on home:", errors);
    }
    return {
      products: data?.products?.nodes ?? [],
    };
  } catch (err) {
    console.warn("Home loader Storefront query failed, proceeding without products:", err);
    return {
      products: [],
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { addToCart, currency, setCurrency } = useCart();
  const [currentHerbariumIndex, setCurrentHerbariumIndex] = useState<number>(0);

  // Modal open states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [detailPerfume, setDetailPerfume] = useState<Perfume | null>(null);

  // Sync Shopify products from loader if available
  useEffect(() => {
    if (loaderData?.products && loaderData.products.length > 0) {
      loaderData.products.forEach((sp: any) => {
        const match = PERFUMES.find(
          (p) =>
            p.handle === sp.handle ||
            (sp.title && sp.title.toLowerCase().includes(p.title.toLowerCase()))
        );
        if (match) {
          if (sp.priceRange?.minVariantPrice?.amount) {
            match.price = Math.round(Number(sp.priceRange.minVariantPrice.amount));
          }
          if (sp.featuredImage?.url) {
            match.productImg = sp.featuredImage.url;
          }
        }
      });
    }
  }, [loaderData?.products]);

  // Unified Cart action
  const handleAddToCart = useCallback(
    (perfumeId: string, size = "50ml") => {
      let perf = PERFUMES.find((p) => p.id === perfumeId);
      let title = perf ? perf.title : "NAYA PANNA";
      let img = perf ? perf.productImg || perf.url : "/landing-pages/meng-to-sketchbook/naya-panna.png";
      let basePrice = perf ? perf.price : 1599;

      if (perfumeId === "discovery-wardrobe") {
        title = "The Discovery Wardrobe";
        img = "/landing-pages/meng-to-sketchbook/kissa-discovery-set.jpg";
        basePrice = 999;
      } else if (size === "100ml") {
        basePrice = Math.round(basePrice * 1.45);
      } else if (size === "2ml") {
        basePrice = 299;
      }

      addToCart({
        id: `${perfumeId}-${size}`,
        perfumeId,
        title,
        subtitle: perfumeId === "discovery-wardrobe" ? "3 × 2ml Deluxe Sprays" : `Eau de Parfum · ${size}`,
        size,
        qty: 1,
        price: basePrice,
        img,
      });
    },
    [addToCart]
  );

  const handleInspect = useCallback((perfumeId: string) => {
    const p = PERFUMES.find((item) => item.id === perfumeId) || null;
    setDetailPerfume(p);
  }, []);

  return (
    <MainLayout
      currency={currency}
      onCurrencyChange={setCurrency}
      onOpenSearch={() => setIsSearchOpen(true)}
    >
      <div className="kissa-landing-sections">
        {/* 3. Luxury Editorial Brand Hero */}
        <BrandHero />

        {/* 4. Our Story Section */}
        <OurStory />

        {/* 5. Complete Collection Catalog Grid */}
        <CollectionCatalog
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspect={handleInspect}
        />

        {/* 6. The Experience Section (Read · Wear · Write) */}
        <TheExperience />

        {/* 7. The Discovery Wardrobe Coffret Feature */}
        <DiscoveryCoffret
          currency={currency}
          onAddToCart={handleAddToCart}
        />

        {/* 8. Scent Consultation Diagnosis Quiz */}
        <FragranceQuiz
          currency={currency}
          onAddToCart={handleAddToCart}
        />

        {/* 9. Atelier Craftsmanship Alchemy */}
        <AtelierCraftsmanship />

        {/* 10. Plates & Olfactive Botanical Index */}
        <PlatesIndex
          currency={currency}
          onSelectPlate={setCurrentHerbariumIndex}
        />

        {/* 11. Interactive Fragrance Herbarium 3D Sketchbook */}
        <SketchbookViewer
          currentIndex={currentHerbariumIndex}
          onSelectIndex={setCurrentHerbariumIndex}
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspect={handleInspect}
        />
      </div>

      {/* Overlays that are specific to homepage interactions */}
      <ProductDetailModal
        perfume={detailPerfume}
        isOpen={detailPerfume !== null}
        onClose={() => setDetailPerfume(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectPerfume={handleInspect}
      />
    </MainLayout>
  );
}
