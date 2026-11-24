import { Link } from "react-router";
import type { Route } from "./+types/wishlist";
import { useWishlist } from "../../lib/wishlist";
import { useCart } from "../../context/CartContext";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Wishlist | KISSA" },
    { name: "description", content: "All your favourite products in one place." },
  ];
};

export default function AccountWishlist() {
  const { wishlist, isLoaded, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price: number | string) => {
    const num = typeof price === "number" ? price : parseFloat(price);
    if (isNaN(num)) return price;
    return `₹${num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddToCart = (item: any) => {
    const priceNum = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
    addToCart({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || "",
      size: item.size || "50ml",
      price: priceNum,
      img: item.image || "",
    });
  };

  return (
    <div>
      {/* SECTION HEADING */}
      <div className="kissa-section-header">
        <h2 className="kissa-section-title">My Wishlist</h2>
        <p className="kissa-section-desc">
          All your favourite products in one place.
        </p>
      </div>

      {!isLoaded ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--kissa-primary-light)" }}>
          Loading your wishlist...
        </div>
      ) : wishlist.length === 0 ? (
        /* EMPTY STATE: EMPTY WISHLIST */
        <div className="kissa-empty-state">
          <svg
            className="kissa-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h3 className="kissa-empty-title">Empty Wishlist</h3>
          <p className="kissa-empty-desc">
            You haven&apos;t saved any products yet. Browse our collection and save products you&apos;d like to purchase later.
          </p>
          <Link to="/shop" className="kissa-btn-primary">
            EXPLORE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="kissa-wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="kissa-wishlist-card">
              <div className="kissa-wishlist-img-wrap">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="kissa-wishlist-img"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--kissa-primary-light)",
                    }}
                  >
                    KISSA
                  </div>
                )}
              </div>

              <div className="kissa-wishlist-content">
                <h3 className="kissa-wishlist-title">{item.title}</h3>
                {item.subtitle && (
                  <p
                    style={{
                      fontFamily: "Newsreader, Georgia, serif",
                      fontSize: "0.9rem",
                      color: "var(--kissa-primary-light)",
                      margin: "0 0 8px",
                    }}
                  >
                    {item.subtitle}
                  </p>
                )}
                <div className="kissa-wishlist-price">
                  {formatPrice(item.price)}
                </div>

                <div className="kissa-wishlist-actions">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="kissa-btn-primary"
                    style={{ width: "100%" }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="kissa-btn-secondary kissa-btn-sm"
                    style={{ width: "100%" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
