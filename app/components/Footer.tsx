import { Link } from "react-router";

/**
 * KISSA Editorial Footer
 * 
 * Calm, warm, minimal, atmospheric editorial footer built upon
 * full-width rolling hills landscape background with oversized translucent KISSA wordmark.
 */
export function Footer() {
    return (
        <footer className="kissa-footer" id="contact" role="contentinfo" aria-label="Site Footer">
            <div className="kissa-footer__content">
                {/* Brand Information Column */}
                <section className="kissa-footer__brand" aria-label="About KISSA">
                    <Link to="/" className="kissa-footer__logo-link" aria-label="KISSA Homepage">
                        <img
                            src="/kissa-logo-transparent.png"
                            alt="KISSA"
                            className="kissa-footer__logo"
                            width={175}
                            height={72}
                            loading="lazy"
                        />
                    </Link>
                    <h2 className="kissa-footer__headline">A fragrance for your story.</h2>
                    <p className="kissa-footer__description">
                        KISSA creates long-lasting, premium perfumes that capture everyday
                        moments, emotions, and memories — crafted in India for modern storytellers.
                    </p>
                    <small className="kissa-footer__copyright">© 2026 KISSA – All rights reserved</small>
                </section>

                {/* Navigation Columns */}
                <nav className="kissa-footer__links" aria-label="Footer navigation">
                    {/* Menu Group */}
                    <div className="kissa-footer__group">
                        <h3 className="kissa-footer__heading">Menu</h3>
                        <ul className="kissa-footer__list">
                            <li className="kissa-footer__item">
                                <Link to="/" className="kissa-footer__link">Home</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/shop" className="kissa-footer__link">Products</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/collections/all" className="kissa-footer__link">Collections</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/about" className="kissa-footer__link">About</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/about" className="kissa-footer__link">Updates</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Group */}
                    <div className="kissa-footer__group">
                        <h3 className="kissa-footer__heading">Navigation</h3>
                        <ul className="kissa-footer__list">
                            <li className="kissa-footer__item">
                                <Link to="/contact" className="kissa-footer__link">Contact</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/faqs" className="kissa-footer__link">FAQs</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/about" className="kissa-footer__link">Roadmap</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <a href="#privacy" className="kissa-footer__link">Privacy policy</a>
                            </li>
                            <li className="kissa-footer__item">
                                <a href="#terms" className="kissa-footer__link">Terms of service</a>
                            </li>
                            <li className="kissa-footer__item">
                                <a href="#customer-portal" className="kissa-footer__link">Customer portal</a>
                            </li>
                        </ul>
                    </div>

                    {/* More Products Group */}
                    <div className="kissa-footer__group">
                        <h3 className="kissa-footer__heading">More products</h3>
                        <ul className="kissa-footer__list">
                            <li className="kissa-footer__item">
                                <Link to="/shop?category=WOODY" className="kissa-footer__link">Velvet Oud</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/shop?category=BOTANICAL" className="kissa-footer__link">Love Drunk</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/shop?category=WOODY" className="kissa-footer__link">Noir Wood</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/shop?category=AMBER" className="kissa-footer__link">Citrus Affair</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/shop?category=BOTANICAL" className="kissa-footer__link">Intense Bloom</Link>
                            </li>
                            <li className="kissa-footer__item">
                                <Link to="/collections/all" className="kissa-footer__link">Signature Collection</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Oversized Translucent KISSA Wordmark anchored to bottom center */}
            <div className="kissa-footer__wordmark" aria-hidden="true">
                <img
                    src="/kissa-watermark-white.png"
                    alt=""
                    className="kissa-footer__wordmark-img"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </footer>
    );
}

export default Footer;
