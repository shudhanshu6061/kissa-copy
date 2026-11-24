import { formatPrice, type CurrencyCode } from "../../lib/landing-data";

interface DiscoveryCoffretProps {
  currency: CurrencyCode;
  onAddToCart: (perfumeId: string, size?: string) => void;
}

export function DiscoveryCoffret({
  currency,
  onAddToCart,
}: DiscoveryCoffretProps) {
  const price = 999;

  return (
    <>
      <section id="coffret" className="coffret-feature">
        <div className="coffret-card">
          <div className="coffret-media">
            <img
              src="/landing-pages/meng-to-sketchbook/kissa-discovery-set.jpg"
              alt="KISSA Discovery Wardrobe Set"
              loading="lazy"
            />
          </div>
          <div className="coffret-body">
            <span className="coffret-tag">The Sensory Journey</span>
            <h2 className="coffret-title">The Discovery Wardrobe</h2>
            <p className="coffret-text">
              Experience the complete olfactory architecture before choosing your full flacon. Five 2ml spray miniatures of our most iconic extraits, nestled in handcrafted Japanese oatmeal linen with pure cotton blotters.
            </p>

            <ul className="coffret-includes-list">
              <li>3 × Deluxe Miniature Sprays</li>
              <li>N° 01 Naya Panna, N° 02 Blue Amber, N° 03 Midnight Guava</li>
              <li>Handmade deckled paper blotters &amp; formulation guide</li>
            </ul>

            <div className="coffret-voucher-box">
              <strong>✦ Bespoke Flacon Credit:</strong> The entire {formatPrice(price, currency)} purchase value is credited as a private voucher code toward your subsequent 50ml flacon.
            </div>

            <div className="coffret-buy-row">
              <span className="coffret-price" id="coffretPriceDisplay">
                {formatPrice(price, currency)}
              </span>
              <button
                type="button"
                className="coffret-btn"
                id="buyDiscoverySetBtn"
                onClick={() => onAddToCart("discovery-wardrobe", "3 x 2ml")}
              >
                Acquire Discovery Wardrobe
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" aria-hidden="true" />
    </>
  );
}
