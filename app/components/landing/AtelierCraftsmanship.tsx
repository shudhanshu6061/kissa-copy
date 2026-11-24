export function AtelierCraftsmanship() {
  return (
    <>
      <section id="atelier" className="atelier-section">
        <div className="section-header">
          <span className="section-label">Craftsmanship &amp; Alchemy</span>
          <h2 className="section-title">The Botanical Atelier</h2>
          <p className="section-desc">
            Born between the ancient spice routes of Singapore and the copper stills of Grasse.
          </p>
        </div>

        <div className="atelier-split">
          <div className="atelier-media">
            <img
              src="/landing-pages/meng-to-sketchbook/kissa-perfume-atelier.jpg"
              alt="Artisan Perfumer at Work in Atelier"
              loading="lazy"
            />
          </div>
          <div className="atelier-content">
            <p>
              Every KISSA formulation begins with a living watercolor sketch and a specimen plate. We collect rare botanical absolutes—wild Vanda orchids, Java vetiver aged for eight seasons, and incense resin distilled at dawn.
            </p>
            <p>
              Our perfumes are deliberately composed at <em>Extrait de Parfum</em> concentration (26% to 32% aromatic oils), allowing the oils to meld with the natural heat of human skin rather than evaporating rapidly on alcohol.
            </p>
            <p>
              The flacon is a tribute to tactile permanence: heavy French fluted glass topped with an unlacquered, turned solid brass cap that develops a warm natural patina over time.
            </p>

            <div className="atelier-pillars">
              <div className="pillar-card">
                <div className="pillar-num">01</div>
                <h4 className="pillar-title">Cold Maceration</h4>
                <p className="pillar-desc">
                  Each batch rests in dark glass demijohns for 90 days before filtration.
                </p>
              </div>
              <div className="pillar-card">
                <div className="pillar-num">02</div>
                <h4 className="pillar-title">Solid Brass Hardware</h4>
                <p className="pillar-desc">
                  Turned magnetic brass cap weighted at 140 grams with hand-stamped monogram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule short" aria-hidden="true" />
    </>
  );
}
