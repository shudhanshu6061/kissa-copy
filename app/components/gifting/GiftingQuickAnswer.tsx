import { QUICK_ANSWER_SPECS } from "../../lib/gifting";

export function GiftingQuickAnswer() {
    return (
        <section
            className="kissa-gifting-section"
            id="quick-answer"
            aria-label="What Is the KISSA Perfume Gift"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
                <span className="section-label">QUICK ANSWER</span>
                <h2 className="section-title">What Is the KISSA Perfume Gift?</h2>
                <p className="section-desc" style={{ maxWidth: 720, margin: "0 auto 32px" }}>
                    The KISSA perfume gift is a book-style gift box from KISSA, a contemporary
                    Indian unisex perfume brand. Inside a bound hardcover book, you'll find five
                    short story pages, two writing pages for a personal message and a future goal,
                    and a 50 ml bottle of NAYA PANNA, a fragrance made for new beginnings. It's
                    made for anyone starting something new: a job, a city, a business, a
                    relationship or a fresh start.
                </p>
            </div>

            <div className="kissa-at-a-glance-wrap">
                <div className="kissa-at-a-glance-header">
                    <span className="kissa-at-a-glance-tag">SPECIFICATIONS &amp; DETAILS</span>
                    <h3 className="kissa-at-a-glance-title">At a glance</h3>
                </div>

                <div className="kissa-spec-table-container">
                    <table className="kissa-spec-table">
                        <tbody>
                            {QUICK_ANSWER_SPECS.map((spec) => (
                                <tr key={spec.label} className="kissa-spec-row">
                                    <th scope="row" className="kissa-spec-label">
                                        {spec.label}
                                    </th>
                                    <td className="kissa-spec-value">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
