import type { ShopProduct } from "../../lib/products";

export function ProductReviews({ reviews }: { reviews: ShopProduct["reviews"] }) {
    if (!reviews) return null;

    return (
        <section className="kissa-reviews-section" id="reviews" aria-label="Collector Reviews">
            <div className="section-header">
                <span className="section-label">VERIFIED BOTANICAL TESTIMONIALS</span>
                <h2 className="section-title">Collector Impressions</h2>
                <p className="section-desc">
                    Unvarnished reflections from fragrance connoisseurs and collectors across the subcontinent. [EDIT]
                </p>
            </div>

            {/* Rating Summary Bar */}
            <div className="kissa-reviews-summary-card">
                <div className="kissa-rating-big-box">
                    <span className="kissa-rating-number">{reviews.averageRating.toFixed(1)}</span>
                    <div className="kissa-rating-stars" aria-label="5 out of 5 stars">
                        {"★★★★★"}
                    </div>
                    <span className="kissa-rating-caption">
                        Based on {reviews.reviewCount} verified collector evaluations
                    </span>
                </div>

                <div className="kissa-rating-breakdown">
                    <div className="kissa-breakdown-row">
                        <span className="kissa-breakdown-label">5 Stars</span>
                        <div className="kissa-breakdown-bar">
                            <div className="kissa-breakdown-fill" style={{ width: "92%" }} />
                        </div>
                        <span className="kissa-breakdown-pct">92%</span>
                    </div>
                    <div className="kissa-breakdown-row">
                        <span className="kissa-breakdown-label">4 Stars</span>
                        <div className="kissa-breakdown-bar">
                            <div className="kissa-breakdown-fill" style={{ width: "7%" }} />
                        </div>
                        <span className="kissa-breakdown-pct">7%</span>
                    </div>
                    <div className="kissa-breakdown-row">
                        <span className="kissa-breakdown-label">3 Stars</span>
                        <div className="kissa-breakdown-bar">
                            <div className="kissa-breakdown-fill" style={{ width: "1%" }} />
                        </div>
                        <span className="kissa-breakdown-pct">1%</span>
                    </div>
                </div>

                <div className="kissa-rating-badge-box">
                    <div className="kissa-verified-pill">
                        <span>✦</span> 98% of collectors would purchase again
                    </div>
                    <span className="kissa-rating-sub">
                        100% genuine reviews verified with order verification
                    </span>
                </div>
            </div>

            {/* Individual Review Cards Grid */}
            <div className="kissa-reviews-grid">
                {reviews.items.map((review) => (
                    <article key={review.id} className="kissa-review-card">
                        <div className="kissa-review-card-top">
                            <div className="kissa-review-stars">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <span className="kissa-review-date">{review.date}</span>
                        </div>

                        <h3 className="kissa-review-title">&ldquo;{review.title}&rdquo;</h3>
                        <p className="kissa-review-body">{review.content}</p>

                        <div className="kissa-review-footer">
                            <div className="kissa-review-author-info">
                                <span className="kissa-review-author">{review.author}</span>
                                <span className="kissa-review-location">{review.location}</span>
                            </div>
                            {review.verified && (
                                <span className="kissa-verified-tag">
                                    ✓ Verified Purchase
                                </span>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

