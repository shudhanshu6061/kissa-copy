import React, { useState, useEffect } from "react";

export const CURRENCY_OPTIONS = [
  { code: "INR", label: "INR (₹)", symbol: "₹" },
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "SGD", label: "SGD (S$)", symbol: "S$" },
  { code: "GBP", label: "GBP (£)", symbol: "£" },
];

const STORAGE_KEY = "kissa_currency";

export function CurrencySelector({
  value,
  onChange,
  className = "",
  id = "currencySelect",
}) {
  const [internalCurrency, setInternalCurrency] = useState("INR");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && CURRENCY_OPTIONS.some((opt) => opt.code === saved)) {
          setInternalCurrency(saved);
        }
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  useEffect(() => {
    const handleCurrencyEvent = (e) => {
      if (
        e.detail?.currency &&
        CURRENCY_OPTIONS.some((opt) => opt.code === e.detail.currency)
      ) {
        setInternalCurrency(e.detail.currency);
      }
    };

    window.addEventListener("kissa:currency-changed", handleCurrencyEvent);
    return () => {
      window.removeEventListener("kissa:currency-changed", handleCurrencyEvent);
    };
  }, []);

  const activeCurrency = value || internalCurrency;

  const handleChange = (newCurrency) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, newCurrency);
        window.dispatchEvent(
          new CustomEvent("kissa:currency-changed", {
            detail: { currency: newCurrency },
          })
        );
      } catch {
        // ignore write error
      }
    }

    setInternalCurrency(newCurrency);
    if (onChange) {
      onChange(newCurrency);
    }
  };

  return (
    <div className={`kissa-currency-selector-wrap ${className}`}>
      <select
        id={id}
        className="kissa-currency-select"
        value={activeCurrency}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Select Currency"
      >
        {CURRENCY_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
