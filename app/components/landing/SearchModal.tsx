import { useState, useEffect, useRef } from "react";
import { PERFUMES, formatPrice, type CurrencyCode, type Perfume } from "../../lib/landing-data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onSelectPerfume: (perfumeId: string) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  currency,
  onSelectPerfume,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
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

  const q = query.toLowerCase().trim();
  const filtered = PERFUMES.filter((p: Perfume) => {
    if (!q) return true;
    const matchTitle = p.title.toLowerCase().includes(q);
    const matchFamily = p.family.toLowerCase().includes(q);
    const allNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes];
    const matchNotes = allNotes.some((n) => n.toLowerCase().includes(q));
    return matchTitle || matchFamily || matchNotes;
  });

  return (
    <div
      className="search-backdrop open"
      id="searchBackdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-dialog">
        <div className="search-input-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ width: "20px", height: "20px", flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            id="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by note (orchid, sandalwood, tea, smoke, amber)..."
            aria-label="Search fragrances"
          />
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            &times;
          </button>
        </div>

        <ul className="search-results-list" id="searchResultsList">
          {filtered.length === 0 ? (
            <li
              style={{
                padding: "16px",
                textAlign: "center",
                color: "var(--ink-faint, rgba(78,52,46,0.40))",
                fontSize: "14px",
              }}
            >
              No botanicals matched your search query.
            </li>
          ) : (
            filtered.map((p) => (
              <li
                key={p.id}
                className="search-res-item"
                onClick={() => {
                  onSelectPerfume(p.id);
                  onClose();
                }}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <h4 className="search-res-title">
                    {p.title} ({p.number})
                  </h4>
                  <p className="search-res-notes">
                    {p.family} · {p.topNotes[0]}, {p.baseNotes[0]}
                  </p>
                </div>
                <span className="search-res-price">
                  {formatPrice(p.price, currency)}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
