import React from "react";
import type { CartItem as CartItemType } from "../../context/CartContext";
import { formatPrice, type CurrencyCode } from "../../lib/landing-data";

export interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (delta: number) => void;
  onRemove: () => void;
  currency?: CurrencyCode;
}

export function CartItem({
  item,
  onUpdateQty,
  onRemove,
  currency = "INR",
}: CartItemProps) {
  return (
    <div className="kissa-cart-item">
      {/* Thumbnail Wrap */}
      <div className="kissa-cart-item-img-wrap">
        <img
          src={item.img || "/landing-pages/meng-to-sketchbook/naya-panna.png"}
          alt={item.title}
          className="kissa-cart-item-bottle-img"
          loading="lazy"
        />
      </div>

      {/* Details (Name, Type/Volume, Price) */}
      <div className="kissa-cart-item-details">
        <h4 className="kissa-cart-item-title" title={item.title}>
          {item.title}
        </h4>
        <span className="kissa-cart-item-size" title={item.subtitle}>
          {item.subtitle}
        </span>
        <span className="kissa-cart-item-price">
          {formatPrice(item.price, currency)}
        </span>
      </div>

      {/* Actions (Quantity Pill & Trash Button) */}
      <div className="kissa-cart-item-actions">
        <button
          type="button"
          className="kissa-cart-item-trash-btn"
          onClick={onRemove}
          aria-label={`Remove ${item.title} from cart`}
          title="Remove from bag"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>

        <div className="kissa-cart-qty-pill">
          <button
            type="button"
            className="kissa-qty-btn"
            onClick={() => onUpdateQty(-1)}
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            -
          </button>
          <span className="kissa-qty-val" aria-live="polite">
            {item.qty}
          </span>
          <button
            type="button"
            className="kissa-qty-btn"
            onClick={() => onUpdateQty(1)}
            aria-label="Increase quantity"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
