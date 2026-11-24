import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { CurrencySelector } from "./CurrencySelector";
import { NavigationMenu } from "./NavigationMenu";
import type { CurrencyCode } from "../../lib/landing-data";
import { useCart } from "../../context/CartContext";

export interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
  onOpenAccount?: () => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (c: CurrencyCode) => void;
  className?: string;
}

export function Navbar({
  cartCount = 1,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  currency,
  onCurrencyChange,
  className = "",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liveCartCount, setLiveCartCount] = useState(cartCount);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  let cartCtx: ReturnType<typeof useCart> | null = null;
  try {
    cartCtx = useCart();
  } catch {
    // optional fallback if rendered outside provider
  }

  const handleOpenCart = onOpenCart || cartCtx?.openCart;
  const effectiveCartCount =
    cartCtx?.cartCount !== undefined
      ? cartCtx.cartCount
      : (typeof cartCount === "number" ? cartCount : liveCartCount);

  // Initialize and synchronize cart count with localStorage & events
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("kissa_cart_data");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (typeof parsed.totalQuantity === "number") {
            setLiveCartCount(parsed.totalQuantity);
          }
        }
      } catch {
        // ignore JSON parse error
      }
    }
  }, []);

  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ totalQuantity: number }>;
      if (
        customEvent.detail &&
        typeof customEvent.detail.totalQuantity === "number"
      ) {
        setLiveCartCount(customEvent.detail.totalQuantity);
      }
    };

    window.addEventListener("kissa:cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("kissa:cart-updated", handleCartUpdate);
    };
  }, []);

  // Update liveCartCount when prop changes
  useEffect(() => {
    setLiveCartCount(cartCount);
  }, [cartCount]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Automatically close dropdown whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`kissa-nav-container ${className}`} id="siteTop">
      <div className="kissa-glass-navbar">
        {/* Left Cluster: Menu Toggle & Dropdown */}
        <div className="kissa-nav-left">
          <div
            className={`kissa-nav-dropdown-wrapper ${isMenuOpen ? "is-active" : ""}`}
            id="siteMenuNavWrapper"
            ref={menuWrapperRef}
          >
            <button
              type="button"
              className={`kissa-nav-icon-btn kissa-menu-toggle-btn ${isMenuOpen ? "is-active" : ""}`}
              id="glassMenuBtn"
              aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              title="Menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="kissa-menu-icon-wrap" aria-hidden="true">
                {isMenuOpen ? (
                  <svg
                    className="kissa-icon-close"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    style={{ pointerEvents: "none" }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    className="kissa-icon-bars"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    style={{ pointerEvents: "none" }}
                  >
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="15" y2="12" />
                    <line x1="4" y1="17" x2="10" y2="17" />
                  </svg>
                )}
              </span>
            </button>

            {/* Dropdown Navigation Menu */}
            <NavigationMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>

        {/* Center: Perfectly Centered KISSA Brand Logo */}
        <Link
          to="/"
          className="kissa-nav-logo"
          aria-label="Return to KISSA Homepage"
        >
          <img
            src="/kissa-logo.png"
            alt="KISSA"
            className="kissa-logo-img"
          />
        </Link>

        {/* Right Cluster: Currency Selector, Search, Account, Bag */}
        <div className="kissa-nav-right">
          <div className="kissa-nav-actions">
            {/* Currency Selector */}
            <CurrencySelector
              value={currency}
              onChange={onCurrencyChange}
            />

            {/* Search Fragrances */}
            {onOpenSearch ? (
              <button
                type="button"
                className="kissa-nav-icon-btn"
                id="searchTriggerBtn"
                aria-label="Search Fragrances"
                title="Search Notes (/)"
                onClick={onOpenSearch}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            ) : (
              <Link
                to="/shop"
                className="kissa-nav-icon-btn"
                id="searchTriggerBtn"
                aria-label="Search Fragrances"
                title="Search Notes (/)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Link>
            )}

            {/* Atelier VIP Account Profile */}
            {onOpenAccount ? (
              <button
                type="button"
                className="kissa-nav-icon-btn"
                id="glassAccountBtn"
                aria-label="Account Profile"
                title="Atelier VIP Account"
                onClick={onOpenAccount}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            ) : (
              <Link
                to="/account"
                className="kissa-nav-icon-btn"
                id="glassAccountBtn"
                aria-label="Account Profile"
                title="Atelier VIP Account"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* Shopping Bag with Quantity Badge */}
            {handleOpenCart ? (
              <button
                type="button"
                className="kissa-nav-icon-btn"
                id="openCartBtn"
                aria-label="Shopping Bag"
                title="View Bag"
                onClick={handleOpenCart}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {effectiveCartCount > 0 && (
                  <span className="kissa-cart-badge" id="cartCountBadge">
                    {effectiveCartCount}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to="/shop"
                className="kissa-nav-icon-btn"
                id="openCartBtn"
                aria-label="Shopping Bag"
                title="View Bag"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="kissa-cart-badge" id="cartCountBadge">
                  {liveCartCount}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
