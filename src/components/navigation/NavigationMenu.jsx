import React from "react";
import { Link, useLocation } from "react-router";

export const NAVIGATION_ITEMS = [
  { index: "01", label: "Home", to: "/" },
  { index: "02", label: "Shop", to: "/shop" },
  { index: "03", label: "Gifting", to: "/gifting" },
  { index: "04", label: "About Us", to: "/about" },
  { index: "05", label: "Contact Us", to: "/contact" },
  { index: "06", label: "FAQs", to: "/faqs" },
];

export function isRouteActive(to, pathname) {
  if (to === "/") {
    return pathname === "/";
  }
  if (to === "/shop") {
    return (
      pathname === "/shop" ||
      pathname.startsWith("/collections") ||
      pathname.startsWith("/shop/")
    );
  }
  if (to === "/about") {
    return (
      pathname === "/about" ||
      pathname === "/about-us" ||
      pathname.startsWith("/about/")
    );
  }
  if (to === "/contact") {
    return (
      pathname === "/contact" ||
      pathname === "/contact-us" ||
      pathname.startsWith("/contact/")
    );
  }
  if (to === "/faqs") {
    return (
      pathname === "/faqs" ||
      pathname === "/faq" ||
      pathname.startsWith("/faqs/")
    );
  }
  if (to === "/gifting") {
    return pathname === "/gifting" || pathname.startsWith("/gifting/");
  }
  return pathname === to || pathname.startsWith(to + "/");
}

export function NavigationMenu({
  isOpen,
  onClose,
  className = "",
  id = "siteMenuDropdown",
}) {
  const location = useLocation();
  const pathname = location?.pathname || "/";

  return (
    <div
      id={id}
      className={`kissa-navigation-menu ${isOpen ? "is-open" : ""} ${className}`}
      role="menu"
      aria-label="Navigation Menu"
    >
      <nav className="kissa-nav-dropdown-list" role="navigation">
        {NAVIGATION_ITEMS.map((item) => {
          const active = isRouteActive(item.to, pathname);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`kissa-nav-dropdown-item ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              role="menuitem"
              onClick={onClose}
            >
              <span className="kissa-nav-item-idx">{item.index}</span>
              <span className="kissa-nav-item-label">{item.label}</span>
              <span className="kissa-nav-item-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default NavigationMenu;
