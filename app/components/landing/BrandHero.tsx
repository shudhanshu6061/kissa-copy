import { Link } from "react-router";

export function BrandHero() {
  return (
    <section id="hero" className="brand-hero-section" aria-label="Maison KISSA Campaign">
      {/* Masterpiece Campaign Visual Stage */}
      <div className="hero-stage-card">
        <div className="hero-image-wrap">
          <img
            src="/landing-pages/meng-to-sketchbook/kissa-hero.jpg"
            alt="KISSA Parfums Botanical Fragrance Herbarium Campaign with Wooden Cap Flacon and Flowers"
            className="hero-main-img"
            loading="eager"
          />
        </div>

        {/* Discover More Pill Button (Centered in Hero Section) */}
        <Link
          to="/shop"
          className="hero-discover-pill"
          id="heroDiscoverBtn"
          aria-label="Discover more fragrances"
        >
          <span className="hero-discover-pill-text">DISCOVER MORE</span>
          <span className="hero-discover-pill-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
