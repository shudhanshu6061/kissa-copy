import { useState, useEffect } from "react";
import type { CurrencyCode } from "../../lib/landing-data";

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  symbol: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "INR", label: "INR (₹)", symbol: "₹" },
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "SGD", label: "SGD (S$)", symbol: "S$" },
  { code: "GBP", label: "GBP (£)", symbol: "£" },
];

export interface CurrencySelectorProps {
  value?: CurrencyCode;
  onChange?: (currency: CurrencyCode) => void;
  className?: string;
  id?: string;
}

const STORAGE_KEY = "kissa_currency";

export function CurrencySelector({
  value,
  onChange,
  className = "",
  id = "currencySelect",
}: CurrencySelectorProps) {
  const [internalCurrency, setInternalCurrency] = useState<CurrencyCode>("INR");

  // Read saved currency from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
        if (saved && CURRENCY_OPTIONS.some((opt) => opt.code === saved)) {
          setInternalCurrency(saved);
        }
      } catch {
        // ignore storage read errors
      }
    }
  }, []);

  // Listen for cross-component currency change events
  useEffect(() => {
    const handleCurrencyEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ currency: CurrencyCode }>;
      if (
        customEvent.detail?.currency &&
        CURRENCY_OPTIONS.some((opt) => opt.code === customEvent.detail.currency)
      ) {
        setInternalCurrency(customEvent.detail.currency);
      }
    };

    window.addEventListener("kissa:currency-changed", handleCurrencyEvent);
    return () => {
      window.removeEventListener("kissa:currency-changed", handleCurrencyEvent);
    };
  }, []);

  // Selected currency defaults to external prop if passed, otherwise internal state
  const activeCurrency = value || internalCurrency;

  const handleChange = (newCurrency: CurrencyCode) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, newCurrency);
        window.dispatchEvent(
          new CustomEvent("kissa:currency-changed", {
            detail: { currency: newCurrency },
          })
        );
      } catch {
        // ignore storage write errors
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
        onChange={(e) => handleChange(e.target.value as CurrencyCode)}
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
