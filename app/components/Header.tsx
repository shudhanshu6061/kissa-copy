import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

export interface HeaderProps {
    cartCount?: number;
}

export const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Gifting", to: "/gifting" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
];

export function Header({ cartCount = 1 }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [liveCartCount, setLiveCartCount] = useState(cartCount);
    const menuDropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const pathname = location.pathname;

    // Listen for real-time cart update events
    useEffect(() => {
        const handleCartUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<{ totalQuantity: number }>;
            if (customEvent.detail && typeof customEvent.detail.totalQuantity === "number") {
                setLiveCartCount(customEvent.detail.totalQuantity);
            }
        };

        window.addEventListener("kissa:cart-updated", handleCartUpdate);
        return () => window.removeEventListener("kissa:cart-updated", handleCartUpdate);
    }, []);

    const isActive = (to: string) => {
        if (to === "/") return pathname === "/";
        if (to === "/shop") return pathname === "/shop" || pathname.startsWith("/collections");
        return pathname === to || pathname.startsWith(to + "/");
    };

    // Close menu dropdown on click outside or Escape
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuDropdownRef.current &&
                !menuDropdownRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
                setIsDrawerOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    // Close drawer on Escape key or outside interaction
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsDrawerOpen(false);
            }
        };

        if (isDrawerOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isDrawerOpen]);

    // Close menu and drawer whenever the route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsDrawerOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Top Announcement Bar with Infinite Marquee */}
            <aside className="kissa-announcement-bar" role="region" aria-label="Announcements">
                <div className="kissa-marquee-track">
                    <div className="kissa-marquee-set">
                        <span className="kissa-marquee-msg">A FRAGRANCE. A MEMORY. A STORY.</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">DISCOVER YOUR SIGNATURE SCENT</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">CRAFTED FOR THE MOMENTS THAT MATTER</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">EXPLORE THE KISSA COLLECTION</span>
                        <span className="kissa-marquee-sep">✦</span>
                    </div>
                    <div className="kissa-marquee-set" aria-hidden="true">
                        <span className="kissa-marquee-msg">A FRAGRANCE. A MEMORY. A STORY.</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">DISCOVER YOUR SIGNATURE SCENT</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">CRAFTED FOR THE MOMENTS THAT MATTER</span>
                        <span className="kissa-marquee-sep">✦</span>
                        <span className="kissa-marquee-msg">EXPLORE THE KISSA COLLECTION</span>
                        <span className="kissa-marquee-sep">✦</span>
                    </div>
                </div>
            </aside>

            {/* Persistent Luxury Floating Frosted Glass Navbar */}
            <header className="kissa-nav-container">
                <nav className="kissa-glass-navbar" aria-label="Main Navigation">
                    {/* Left cluster: Single circular menu toggle button with luxury floating dropdown */}
                    <div className="kissa-nav-left">
                        <div
                            className={`kissa-nav-dropdown-wrapper ${isMenuOpen ? "is-active" : ""}`}
                            ref={menuDropdownRef}
                        >
                            <button
                                type="button"
                                className="kissa-nav-icon-btn kissa-hamburger-btn"
                                aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                                aria-expanded={isMenuOpen}
                                aria-haspopup="true"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                            >
                                {isMenuOpen ? (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="6" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.3"
                                        strokeLinecap="round"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="4" y1="12" x2="15" y2="12" />
                                        <line x1="4" y1="17" x2="10" y2="17" />
                                    </svg>
                                )}
                            </button>

                            {/* Dropdown Menu Card (identical to landing page) */}
                            <div className={`kissa-menu-nav-dropdown ${isMenuOpen ? "is-open" : ""}`} role="menu">
                                <nav className="menu-dropdown-nav">
                                    {NAV_LINKS.map((link, idx) => {
                                        const active = isActive(link.to);
                                        return (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                className={`menu-dropdown-link ${active ? "is-active" : ""}`}
                                                aria-current={active ? "page" : undefined}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="link-idx">0{idx + 1}</span>
                                                <span className="link-label">{link.label}</span>
                                                <span className="link-arrow">→</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Centered KISSA Calligraphy Logo */}
                    <Link to="/" className="kissa-nav-logo" aria-label="Return to Maison Homepage">
                        <img
                            src="/kissa-logo.png"
                            alt="KISSA"
                            className="kissa-logo-img"
                        />
                    </Link>

                    {/* Right cluster: Search, Account, Bag icons */}
                    <div className="kissa-nav-right">
                        <div className="kissa-nav-actions">
                            <Link
                                to="/shop"
                                className="kissa-nav-icon-btn"
                                aria-label="Search Fragrances"
                                title="Search Notes (/)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </Link>

                            <Link
                                to="/contact"
                                className="kissa-nav-icon-btn"
                                aria-label="Atelier VIP Account"
                                title="Atelier VIP Account"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>

                            <Link
                                to="/shop"
                                className="kissa-nav-icon-btn"
                                aria-label="Shopping Bag"
                                title="View Bag"
                            >
                                <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                <span className="kissa-cart-badge">{liveCartCount}</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Slide-in Drawer Backdrop (closes on click) */}
            <div
                className={`kissa-drawer-backdrop ${isDrawerOpen ? "is-open" : ""}`}
                onClick={() => setIsDrawerOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Slide-in Drawer */}
            <aside
                id="kissa-mobile-drawer"
                className={`kissa-mobile-drawer ${isDrawerOpen ? "is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
            >
                {/* Drawer Header */}
                <div className="kissa-drawer-header">
                    <Link
                        to="/"
                        className="kissa-drawer-brand"
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label="Return to Maison Homepage"
                    >
                        <img src="/kissa-logo-transparent.png" alt="KISSA" />
                        <span>BOTANICAL HERBARIUM</span>
                    </Link>
                    <button
                        type="button"
                        className="kissa-drawer-close"
                        onClick={() => setIsDrawerOpen(false)}
                        aria-label="Close navigation menu"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="6" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Navigation Links */}
                <nav className="kissa-drawer-nav">
                    {NAV_LINKS.map((link, idx) => {
                        const active = isActive(link.to);
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`kissa-drawer-link ${active ? "is-active" : ""}`}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                <span className="link-idx">0{idx + 1}</span>
                                <span className="link-label">{link.label}</span>
                                <span className="link-arrow">→</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Drawer Footer Information */}
                <div className="kissa-drawer-footer">
                    <p className="kissa-drawer-footer-text">
                        Artisanal botanical extraits born of wild equatorial extracts &amp; living watercolors.
                    </p>
                    <Link
                        to="/contact"
                        className="kissa-drawer-footer-action"
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        <span>Concierge &amp; Salons</span>
                        <span>✦</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Header;

