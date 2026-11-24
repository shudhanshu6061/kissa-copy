import React from "react";
import { formatPrice, type CurrencyCode } from "../../lib/landing-data";

export interface CartSummaryProps {
  subtotal: number;
  discountAmount?: number;
  isCouponApplied?: boolean;
  discountPercent?: number;
  finalTotal: number;
  currency?: CurrencyCode;
  onCheckout: () => void;
  isLoading?: boolean;
}

export function CartSummary({
  subtotal,
  discountAmount = 0,
  isCouponApplied = false,
  discountPercent = 10,
  finalTotal,
  currency = "INR",
  onCheckout,
  isLoading = false,
}: CartSummaryProps) {
  return (
    <div className="kissa-cart-footer">
      {/* Subtotal Row */}
      <div className="kissa-cart-summary-row">
        <span className="kissa-summary-label">Subtotal</span>
        <span className="kissa-summary-val" id="cartSubtotalDisplay">
          {formatPrice(subtotal, currency)}
        </span>
      </div>

      {/* Privilege Discount Row (When coupon applied) */}
      {isCouponApplied && discountAmount > 0 && (
        <div className="kissa-cart-summary-row" style={{ color: "#2E7D32" }}>
          <span className="kissa-summary-label">
            Privilege Discount ({discountPercent}%)
          </span>
          <span className="kissa-summary-val">
            -{formatPrice(discountAmount, currency)}
          </span>
        </div>
      )}

      {/* Complimentary Insured Delivery Row */}
      <div className="kissa-cart-summary-row">
        <span className="kissa-summary-label">
          Complimentary Insured Delivery
        </span>
        <span className="kissa-summary-val kissa-summary-free-badge">
          FREE
        </span>
      </div>

      {/* Order Total Row */}
      <div className="kissa-cart-summary-row kissa-cart-total-row">
        <span className="kissa-total-label">Order Total</span>
        <span className="kissa-total-val" id="cartTotalDisplay">
          {formatPrice(finalTotal, currency)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        className="kissa-cart-checkout-btn"
        onClick={onCheckout}
        disabled={isLoading}
      >
        {isLoading ? (
          <span>Preparing Checkout...</span>
        ) : (
          <span>Proceed to Bespoke Checkout</span>
        )}
      </button>

      {/* Trust & Guarantee Strip */}
      <div className="kissa-cart-trust-footer">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Encrypted Bespoke Checkout · 100% Insured Delivery</span>
      </div>
    </div>
  );
}

export default CartSummary;
