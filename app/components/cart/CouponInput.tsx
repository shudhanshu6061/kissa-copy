import React, { useState, useEffect } from "react";

export interface CouponInputProps {
  couponCode?: string;
  isApplied?: boolean;
  onApply: (code: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
}

export function CouponInput({
  couponCode = "",
  isApplied = false,
  onApply,
  onRemove,
  disabled = false,
}: CouponInputProps) {
  const [inputVal, setInputVal] = useState(couponCode);

  useEffect(() => {
    setInputVal(couponCode);
  }, [couponCode]);

  const handleApply = () => {
    if (isApplied && onRemove) {
      onRemove();
    } else {
      onApply(inputVal);
    }
  };

  return (
    <div className="kissa-cart-coupon-wrap">
      <div className="kissa-cart-coupon-bar">
        {/* Price Tag Icon */}
        <svg
          className="kissa-coupon-tag-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>

        {/* Input */}
        <input
          type="text"
          className="kissa-coupon-input"
          placeholder="Have a coupon code? (Try WELCOME10)"
          aria-label="Coupon code"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleApply();
            }
          }}
          disabled={isApplied || disabled}
        />

        {/* Apply / Applied Button */}
        <button
          type="button"
          className={`kissa-coupon-apply-btn ${isApplied ? "applied" : ""}`}
          onClick={handleApply}
          disabled={disabled}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default CouponInput;
