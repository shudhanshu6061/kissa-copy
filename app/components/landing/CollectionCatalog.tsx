import { useState } from "react";
import { PERFUMES, formatPrice, type CurrencyCode, type Perfume } from "../../lib/landing-data";

interface CollectionCatalogProps {
  currency: CurrencyCode;
  onAddToCart: (perfumeId: string, size?: string) => void;
  onInspect: (perfumeId: string) => void;
}

export function CollectionCatalog({
  currency,
  onAddToCart,
  onInspect,
}: CollectionCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPerfumes =
    activeFilter === "all"
      ? PERFUMES
      : PERFUMES.filter((p) => p.category === activeFilter);

  return (
    <>
      <section id="catalog" className="catalog">
        <div className="section-header">
          <span className="section-label">The Complete Collection</span>
          <h2 className="section-title">The KISSA Fragrance Editions</h2>
          <p className="section-desc">
            Artisanal Eau de Parfum formulations crafted for the moments that matter. Available in full 50ml flacons and discovery editions.
          </p>
        </div>

        <div className="catalog-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Fragrances ({PERFUMES.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === "botanical" ? "active" : ""}`}
            onClick={() => setActiveFilter("botanical")}
          >
            Spiced &amp; Woody
          </button>
          <button
            className={`filter-btn ${activeFilter === "aquatic" ? "active" : ""}`}
            onClick={() => setActiveFilter("aquatic")}
          >
            Fresh &amp; Aquatic
          </button>
          <button
            className={`filter-btn ${activeFilter === "amber" ? "active" : ""}`}
            onClick={() => setActiveFilter("amber")}
          >
            Fruity &amp; Exotic
          </button>
        </div>

        <div className="perfume-grid" id="perfumeGrid">
          {filteredPerfumes.map((p: Perfume) => (
            <div key={p.id} className="perfume-card">
              <div className="card-media">
                <span className="card-badge">{p.badge}</span>
                <img
                  src={p.productImg || p.url}
                  alt={p.title}
                  className="card-img-art"
                  loading="lazy"
                />
                <img
                  src={p.productImg || p.url}
                  alt={`${p.title} Flacon`}
                  className="card-img-bottle"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="card-inspect-trigger"
                  onClick={() => onInspect(p.id)}
                >
                  Inspect Formula
                </button>
              </div>
              <div className="card-body">
                <span className="card-specimen-no">
                  EDITION {p.number} · {p.family}
                </span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-location">{p.place}</p>
                <div className="card-pyramid-pills">
                  <span className="note-pill">{p.topNotes[0]}</span>
                  <span className="note-pill">{p.heartNotes[0]}</span>
                  <span className="note-pill">{p.baseNotes[0]}</span>
                </div>
                <p className="card-description">{p.tagline}</p>
                <div className="card-footer">
                  <div className="card-price-wrap">
                    <span className="card-price">{formatPrice(p.price, currency)}</span>
                    <span className="card-volume">50ml Extrait de Parfum</span>
                  </div>
                  <button
                    type="button"
                    className="card-add-btn"
                    onClick={() => onAddToCart(p.id, "50ml")}
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule" aria-hidden="true" />
    </>
  );
}
