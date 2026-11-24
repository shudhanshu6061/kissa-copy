import { PERFUMES, formatPrice, type CurrencyCode } from "../../lib/landing-data";

interface PlatesIndexProps {
  currency: CurrencyCode;
  onSelectPlate: (idx: number) => void;
}

export function PlatesIndex({ currency, onSelectPlate }: PlatesIndexProps) {
  const handleClick = (idx: number) => {
    onSelectPlate(idx);
    const sb = document.getElementById("sketchbook");
    if (sb) {
      sb.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <section id="plates" className="plates">
        <div className="section-header">
          <span className="section-label">The Compendium</span>
          <h2 className="section-title">Index of Editions</h2>
          <p className="section-desc">
            Click any plate to turn the sketchbook directly to that fragrance.
          </p>
        </div>
        <ol className="plate-list" id="plateList">
          {PERFUMES.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                className="plate"
                onClick={() => handleClick(i)}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{p.title}</span>
                <span className="accord">
                  {p.topNotes[0]} · {p.heartNotes[0]} · {p.baseNotes[0]}
                </span>
                <span className="p">{formatPrice(p.price, currency)}</span>
                <span className="action">Inspect in Herbarium →</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <div className="rule short" aria-hidden="true" />
    </>
  );
}
