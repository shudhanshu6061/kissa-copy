import { useState, useEffect } from "react";
import { formatPrice, type CurrencyCode, type CartItem } from "../../lib/landing-data";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: CurrencyCode;
  onCheckoutSuccess: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  onCheckoutSuccess,
}: CheckoutModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [firstName, setFirstName] = useState("Eleanor");
  const [lastName, setLastName] = useState("Vane");
  const [email, setEmail] = useState("eleanor.vane@artisan.com");
  const [address, setAddress] = useState("72 Orchard Boulevard, Suite 14B");
  const [includeGiftCard, setIncludeGiftCard] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    onCheckoutSuccess();
  };

  const handleFinish = () => {
    onClose();
    const cat = document.getElementById("catalog");
    if (cat) {
      cat.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="checkout-backdrop open"
      id="checkoutBackdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="checkout-dialog">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close checkout"
        >
          &times;
        </button>

        {!isSuccess ? (
          <div id="checkoutFormView">
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "var(--track-caps, 0.22em)",
                textTransform: "uppercase",
                color: "var(--earth, #CC5500)",
                display: "block",
              }}
            >
              Private Order
            </span>
            <h2
              style={{
                fontFamily: "var(--display, serif)",
                fontSize: "28px",
                margin: "4px 0 16px",
                fontWeight: 400,
              }}
            >
              Bespoke Checkout
            </h2>

            <div
              style={{
                background: "var(--paper-card, #F0E9DA)",
                border: "1px solid var(--hairline, rgba(78,52,46,0.14))",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "6px",
                }}
              >
                <span>Total Order Value:</span>
                <strong id="coTotalDisplay">{formatPrice(total, currency)}</strong>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--ink-soft, rgba(78,52,46,0.65))",
                }}
              >
                Includes complimentary express insured delivery and 2 travel miniatures.
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <input
                  type="text"
                  className="fn-input"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="fn-input"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="email"
                className="fn-input"
                placeholder="Email Address for Certificate"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", marginBottom: "12px" }}
              />
              <input
                type="text"
                className="fn-input"
                placeholder="Delivery Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", marginBottom: "12px" }}
              />

              <div
                style={{
                  marginBottom: "16px",
                  fontSize: "12.5px",
                  color: "var(--ink-soft, rgba(78,52,46,0.65))",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeGiftCard}
                    onChange={(e) => setIncludeGiftCard(e.target.checked)}
                  />{" "}
                  Include handwritten calligraphy gift card with sealing wax
                </label>
              </div>

              <button type="submit" className="cart-checkout-btn">
                Confirm &amp; Place Bespoke Order
              </button>
            </form>
          </div>
        ) : (
          <div id="checkoutSuccessView" className="checkout-success-view">
            <div className="checkout-seal">✓</div>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "var(--track-caps, 0.22em)",
                textTransform: "uppercase",
                color: "var(--gold, #CC5500)",
                display: "block",
              }}
            >
              Order Placed &amp; Registered
            </span>
            <h2
              style={{
                fontFamily: "var(--display, serif)",
                fontSize: "32px",
                margin: "8px 0 10px",
                fontWeight: 400,
              }}
            >
              Thank You, Your Flacon Is In Preparation
            </h2>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: "var(--ink-soft, rgba(78,52,46,0.65))",
                maxWidth: "44ch",
                margin: "0 auto 20px",
              }}
            >
              Your order reference is <strong>#KISSA-2026-881</strong>. Hand-bottled, wax-sealed, and dispatched from our botanical atelier with your complimentary discovery vials.
            </p>
            <button
              type="button"
              className="cart-empty-explore"
              onClick={handleFinish}
            >
              Return to Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
