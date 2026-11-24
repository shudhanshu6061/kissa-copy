import { useState, useEffect } from "react";
import { formatPrice, type CurrencyCode, type Perfume } from "../../lib/landing-data";

interface ProductDetailModalProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onAddToCart: (perfumeId: string, size?: string) => void;
}

export function ProductDetailModal({
  perfume,
  isOpen,
  onClose,
  currency,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("50ml");

  useEffect(() => {
    if (isOpen) {
      setSelectedSize("50ml");
    }
  }, [isOpen, perfume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !perfume) return null;

  const p50 = perfume.price;
  const p100 = Math.round(perfume.price * 1.45);
  const p2 = 299;

  const currentPrice =
    selectedSize === "50ml" ? p50 : selectedSize === "100ml" ? p100 : p2;

  return (
    <div
      className="detail-modal-backdrop open"
      id="detailModalBackdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="detail-modal">
        <button
          type="button"
          className="modal-close-btn"
          id="detailModalCloseBtn"
          onClick={onClose}
          aria-label="Close formula details"
        >
          &times;
        </button>

        <div className="modal-art-col">
          <img
            id="modalArtImg"
            src={perfume.productImg || perfume.url}
            alt={perfume.title}
          />
        </div>

        <div className="modal-info-col">
          <span className="modal-specimen" id="modalSpecimen">
            EDITION {perfume.number} · {perfume.place}
          </span>
          <h2 className="modal-title" id="modalTitle">
            {perfume.title}
          </h2>
          <p className="modal-family" id="modalFamily">
            {perfume.family.toUpperCase()}
          </p>

          <div className="pyramid-block">
            <div className="pyramid-tier">
              <span>Top Notes</span>
              <strong id="modalTopNotes">{perfume.topNotes.join(", ")}</strong>
            </div>
            <div className="pyramid-tier">
              <span>Heart Accords</span>
              <strong id="modalHeartNotes">{perfume.heartNotes.join(", ")}</strong>
            </div>
            <div className="pyramid-tier">
              <span>Base Foundations</span>
              <strong id="modalBaseNotes">{perfume.baseNotes.join(", ")}</strong>
            </div>
          </div>

          <p className="modal-journal" id="modalJournal">
            {perfume.description}
          </p>

          <div className="modal-meta-row">
            <div className="meta-block">
              <span>Concentration</span>
              <strong id="modalConcentration">{perfume.concentration}</strong>
            </div>
            <div className="meta-block">
              <span>Longevity &amp; Sillage</span>
              <strong id="modalSillage">
                {perfume.longevity} · {perfume.sillage}
              </strong>
            </div>
          </div>

          <div
            className="size-selector-pills"
            id="modalSizePills"
            style={{ marginBottom: "16px" }}
          >
            <button
              type="button"
              className={`size-pill ${selectedSize === "50ml" ? "active" : ""}`}
              onClick={() => setSelectedSize("50ml")}
            >
              50ml Extrait · <span id="mPrice50">{formatPrice(p50, currency)}</span>
            </button>
            <button
              type="button"
              className={`size-pill ${selectedSize === "100ml" ? "active" : ""}`}
              onClick={() => setSelectedSize("100ml")}
            >
              100ml Extrait · <span id="mPrice100">{formatPrice(p100, currency)}</span>
            </button>
            <button
              type="button"
              className={`size-pill ${selectedSize === "2ml" ? "active" : ""}`}
              onClick={() => setSelectedSize("2ml")}
            >
              2ml Sample · <span id="mPrice2">{formatPrice(p2, currency)}</span>
            </button>
          </div>

          <div className="modal-buy-row">
            <span className="modal-price" id="modalPrice">
              {formatPrice(currentPrice, currency)}
            </span>
            <button
              type="button"
              className="modal-add-btn"
              id="modalAddBtn"
              onClick={() => {
                onAddToCart(perfume.id, selectedSize);
                onClose();
              }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
