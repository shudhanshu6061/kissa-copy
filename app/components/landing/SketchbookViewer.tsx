import { useState, useRef, useEffect, useCallback } from "react";
import {
  PERFUMES,
  formatPrice,
  type CurrencyCode,
} from "../../lib/landing-data";

interface SketchbookViewerProps {
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  currency: CurrencyCode;
  onAddToCart: (perfumeId: string, size?: string) => void;
  onInspect: (perfumeId: string) => void;
}

export function SketchbookViewer({
  currentIndex,
  onSelectIndex,
  currency,
  onAddToCart,
  onInspect,
}: SketchbookViewerProps) {
  const [selectedSize, setSelectedSize] = useState<string>("50ml");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(true);
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");

  const bookRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const loupeMagRef = useRef<HTMLSpanElement>(null);

  const currentPerfume = PERFUMES[currentIndex] || PERFUMES[0];

  const prices = {
    "50ml": currentPerfume.price,
    "100ml": Math.round(currentPerfume.price * 1.45),
    "2ml": 299,
  };

  const handleNext = useCallback(() => {
    if (isTurning) return;
    setTurnDirection("next");
    setIsTurning(true);
    setTimeout(() => {
      onSelectIndex((currentIndex + 1) % PERFUMES.length);
      setIsTurning(false);
    }, 380);
  }, [currentIndex, isTurning, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (isTurning) return;
    setTurnDirection("prev");
    setIsTurning(true);
    setTimeout(() => {
      onSelectIndex((currentIndex - 1 + PERFUMES.length) % PERFUMES.length);
      setIsTurning(false);
    }, 380);
  }, [currentIndex, isTurning, onSelectIndex]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 75));
  };

  // Loupe pointer tracking
  useEffect(() => {
    const book = bookRef.current;
    const loupe = loupeRef.current;
    const mag = loupeMagRef.current;
    if (!book || !loupe || !mag || !isLoupeActive) return;

    let isHovering = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = book.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        if (isHovering) {
          loupe.style.opacity = "0.7";
          isHovering = false;
        }
        return;
      }

      isHovering = true;
      loupe.style.opacity = "1";
      loupe.style.transform = `translate(${x - 80}px, ${y - 80}px)`;

      // Magnify reflection
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      mag.style.backgroundImage = `url(${currentPerfume.url})`;
      mag.style.backgroundPosition = `${bgX}% ${bgY}%`;
      mag.style.backgroundSize = `${rect.width * 2.2}px ${rect.height * 2.2}px`;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [currentPerfume.url, isLoupeActive]);

  return (
    <>
      <section
        id="sketchbook"
        className="sketchbook-section"
        aria-label="Herbarium Sketchbook"
      >
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <span className="section-label">Interactive Herbarium</span>
          <h2 className="section-title">The Botanical Specimen Plates</h2>
          <p className="section-desc">
            Explore original hand-painted watercolor botanical plates for each edition. Turn pages or inspect fine watercolor brushstrokes.
          </p>
        </div>

        <div className="sketchbook-wrap" id="sbWrap">
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <filter id="sb-mblur-1">
              <feGaussianBlur stdDeviation="5 0" />
            </filter>
            <filter id="sb-mblur-2">
              <feGaussianBlur stdDeviation="14 0" />
            </filter>
          </svg>

          <div className="sb-stage" id="sbStage">
            <button
              type="button"
              className="sb-arrow left"
              id="sbLeft"
              aria-label="previous perfume page"
              onClick={handlePrev}
            >
              <svg
                viewBox="0 0 14 44"
                width="14"
                height="44"
                fill="none"
                aria-hidden="true"
              >
                <polyline
                  points="11,3 3,22 11,41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`sb-3d ${isTurning ? `turning turn-${turnDirection}` : ""}`}
              id="sb3d"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transition: "transform 0.25s ease",
              }}
            >
              <div className="sb-tilt" id="sbTilt">
                <div className="sb-cast ambient" aria-hidden="true" />
                <div className="sb-cast contact" aria-hidden="true" />
                <div className="sb-cast hair" aria-hidden="true" />
                <div
                  className="sb-book"
                  id="sbBook"
                  ref={bookRef}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "grab",
                  }}
                >
                  <div className="sb-full">
                    <img
                      src={currentPerfume.url}
                      alt={currentPerfume.title}
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        userSelect: "none",
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="sb-zone sb-prev"
                    aria-label="previous fragrance plate"
                    onClick={handlePrev}
                  />
                  <button
                    type="button"
                    className="sb-zone sb-next"
                    aria-label="next fragrance plate"
                    onClick={handleNext}
                  />
                </div>
              </div>

              {isLoupeActive && (
                <div
                  className="loupe"
                  id="loupe"
                  ref={loupeRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    willChange: "transform",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <span className="grip" />
                  <span className="ring">
                    <span className="lens" id="loupeLens">
                      <span className="mag" id="loupeMag" ref={magRef => {
                        if (magRef) loupeMagRef.current = magRef;
                      }} />
                    </span>
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="sb-arrow right"
              id="sbRight"
              aria-label="next perfume page"
              onClick={handleNext}
            >
              <svg
                viewBox="0 0 14 44"
                width="14"
                height="44"
                fill="none"
                aria-hidden="true"
              >
                <polyline
                  points="3,3 11,22 3,41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Live Perfume Details Strip synced with current turn page */}
          <div className="hero-perfume-panel" id="heroPerfumePanel">
            <span className="hp-badge" id="hpSpecimenNum">
              EDITION {currentPerfume.number} · {currentPerfume.place.toUpperCase()}
            </span>
            <h2 className="hp-title" id="hpTitle">
              {currentPerfume.title}
            </h2>
            <p className="hp-family" id="hpFamily">
              {currentPerfume.family.toUpperCase()}
            </p>
            <p className="hp-notes" id="hpNotes">
              Notes: {currentPerfume.topNotes[0]} · {currentPerfume.heartNotes[0]} ·{" "}
              {currentPerfume.baseNotes[0]} · {currentPerfume.baseNotes[1] || currentPerfume.topNotes[1]}
            </p>

            <div className="hp-actions">
              <div className="size-selector-pills" id="heroSizePills">
                <button
                  type="button"
                  className={`size-pill ${selectedSize === "50ml" ? "active" : ""}`}
                  onClick={() => setSelectedSize("50ml")}
                >
                  50ml Extrait ·{" "}
                  <span className="hero-size-price">
                    {formatPrice(prices["50ml"], currency)}
                  </span>
                </button>
                <button
                  type="button"
                  className={`size-pill ${selectedSize === "100ml" ? "active" : ""}`}
                  onClick={() => setSelectedSize("100ml")}
                >
                  100ml Extrait ·{" "}
                  <span className="hero-size-price">
                    {formatPrice(prices["100ml"], currency)}
                  </span>
                </button>
                <button
                  type="button"
                  className={`size-pill ${selectedSize === "2ml" ? "active" : ""}`}
                  onClick={() => setSelectedSize("2ml")}
                >
                  2ml Sample ·{" "}
                  <span className="hero-size-price">
                    {formatPrice(prices["2ml"], currency)}
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="hp-add-btn"
                id="heroAddBtn"
                onClick={() => onAddToCart(currentPerfume.id, selectedSize)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Add Edition to Bag</span>
              </button>
              <button
                type="button"
                className="hp-detail-btn"
                id="heroExploreBtn"
                onClick={() => onInspect(currentPerfume.id)}
              >
                Explore Formula Details
              </button>
            </div>
          </div>

          {/* Controls & Quick Jump */}
          <div className="sb-controls-row">
            <div className="sb-tools" role="group" aria-label="view controls">
              <button
                type="button"
                className="tool"
                id="zOut"
                aria-label="zoom out"
                onClick={handleZoomOut}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="8.6" cy="8.6" r="5.6" />
                  <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
                </svg>
              </button>
              <span className="zoom-read" id="zRead">
                {zoomLevel}%
              </span>
              <button
                type="button"
                className="tool"
                id="zIn"
                aria-label="zoom in"
                onClick={handleZoomIn}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="8.6" cy="8.6" r="5.6" />
                  <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
                </svg>
              </button>
              <span className="tool-sep" aria-hidden="true" />
              <button
                type="button"
                className={`tool ${isLoupeActive ? "active" : ""}`}
                id="loupeBtn"
                aria-label="magnifier"
                aria-pressed={isLoupeActive}
                onClick={() => setIsLoupeActive((prev) => !prev)}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="8.8" cy="8.8" r="5.8" />
                  <path d="M13 13l4.4 4.4" />
                  <path d="M6.4 7.2a3.2 3.2 0 0 1 2.4-1.4" opacity=".55" />
                </svg>
              </button>
            </div>

            <div className="plate-jumper-pills" id="plateJumper">
              {PERFUMES.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`plate-num-pill ${i === currentIndex ? "active" : ""}`}
                  aria-label={`Turn to ${p.title}`}
                  onClick={() => onSelectIndex(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <p className="sb-hint" id="sbHint">
            Click arrows or plate numbers to turn pages · Move cursor across watercolor to inspect fine pigments
          </p>
        </div>
      </section>

      <div className="rule short" aria-hidden="true" />
    </>
  );
}
