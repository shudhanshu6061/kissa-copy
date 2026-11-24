import React from "react";
import { Link } from "react-router";
import { useCart, type CartItem as CartItemType } from "../../context/CartContext";
import { CartItem } from "./CartItem";
import { CouponInput } from "./CouponInput";
import { CartSummary } from "./CartSummary";
import type { CurrencyCode } from "../../lib/landing-data";
import "./cart.css";

export interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  cart?: CartItemType[];
  onUpdateQty?: (idOrIndex: string | number, delta: number) => void;
  onRemoveItem?: (idOrIndex: string | number) => void;
  currency?: CurrencyCode;
  onProceedToCheckout?: () => void;
  onShowToast?: (msg: string) => void;
}

export function CartDrawer(props: CartDrawerProps) {
  const context = useCart();

  // Support context with props fallback
  const isOpen = props.isOpen !== undefined ? props.isOpen : context.isOpen;
  const onClose = props.onClose || context.closeCart;
  const cart = props.cart || context.cart;
  const currency = props.currency || context.currency;
  const onUpdateQty = props.onUpdateQty || context.updateQuantity;
  const onRemoveItem = props.onRemoveItem || context.removeFromCart;
  const onProceedToCheckout = props.onProceedToCheckout || context.proceedToCheckout;

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* Background Overlay Backdrop */}
      <div
        className={`kissa-cart-backdrop ${isOpen ? "open" : ""}`}
        id="cartBackdrop"
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Floating Glassmorphism Drawer Container */}
      <aside
        className={`kissa-cart-drawer ${isOpen ? "open" : ""}`}
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Cart Header */}
        <div className="kissa-cart-head">
          <div className="kissa-cart-head-left">
            <svg
              className="kissa-cart-bag-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2>
              Your Cart (<span id="cartHeaderCount">{totalCount}</span>)
            </h2>
          </div>

          <button
            type="button"
            className="kissa-cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
            title="Close cart (Esc)"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="kissa-cart-items" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="kissa-cart-empty">
              <svg
                className="kissa-cart-empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your shopping bag is presently empty.</p>
              <Link
                to="/shop"
                className="kissa-cart-empty-explore"
                onClick={onClose}
              >
                Explore Fragrances
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <CartItem
                key={item.id || `${item.perfumeId}-${item.size}-${idx}`}
                item={item}
                currency={currency}
                onUpdateQty={(delta) => onUpdateQty(item.id || idx, delta)}
                onRemove={() => onRemoveItem(item.id || idx)}
              />
            ))
          )}
        </div>

        {/* Coupon Input Section */}
        {cart.length > 0 && (
          <CouponInput
            couponCode={context.couponCode}
            isApplied={context.isCouponApplied}
            onApply={(code) => context.applyCoupon(code)}
            onRemove={() => context.removeCoupon()}
          />
        )}

        {/* Order Summary & Checkout Section */}
        {cart.length > 0 && (
          <CartSummary
            subtotal={context.subtotal}
            discountAmount={context.discountAmount}
            isCouponApplied={context.isCouponApplied}
            discountPercent={context.discountPercent}
            finalTotal={context.finalTotal}
            currency={currency}
            onCheckout={onProceedToCheckout}
            isLoading={context.isLoading}
          />
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
