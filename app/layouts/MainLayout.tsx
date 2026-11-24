import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/navigation/Navbar";
import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/cart/CartDrawer";
import { CheckoutModal } from "../components/landing/CheckoutModal";
import { ToastFeedback } from "../components/landing/ToastFeedback";
import { useCart } from "../context/CartContext";
import type { CurrencyCode } from "../lib/landing-data";

export interface MainLayoutProps {
  children?: ReactNode;
  cartCount?: number;
  showAnnouncement?: boolean;
  currency?: CurrencyCode;
  onCurrencyChange?: (c: CurrencyCode) => void;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
  onOpenAccount?: () => void;
}

export function MainLayout({
  children,
  cartCount,
  showAnnouncement = true,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
}: MainLayoutProps) {
  let cartCtx: ReturnType<typeof useCart> | null = null;
  try {
    cartCtx = useCart();
  } catch {
    // If rendered outside provider
  }

  const effectiveCurrency = currency || cartCtx?.currency || "INR";
  const effectiveCurrencyChange = onCurrencyChange || cartCtx?.setCurrency;
  const effectiveOpenCart = onOpenCart || cartCtx?.openCart;
  const effectiveCartCount =
    cartCount !== undefined ? cartCount : (cartCtx?.cartCount ?? 1);

  return (
    <div
      className="kissa-page-wrapper"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Atmospheric painted wash background */}
      <div className="kissa-wash" />

      {/* Shared Announcement Bar */}
      {showAnnouncement && <AnnouncementBar />}

      {/* Unified Global Floating Frosted Glass Navbar */}
      <Navbar
        cartCount={effectiveCartCount}
        currency={effectiveCurrency}
        onCurrencyChange={effectiveCurrencyChange}
        onOpenCart={effectiveOpenCart}
        onOpenSearch={onOpenSearch}
        onOpenAccount={onOpenAccount}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: 60 }}>
        {children || <Outlet />}
      </main>

      {/* Shared Luxury Footer */}
      <Footer />

      {/* Globally Shared Unified Cart Drawer */}
      <CartDrawer />

      {/* Global Bespoke Checkout Modal */}
      {cartCtx && (
        <CheckoutModal
          isOpen={cartCtx.isCheckoutOpen}
          onClose={cartCtx.closeCheckout}
          cart={cartCtx.cart}
          currency={effectiveCurrency}
          onCheckoutSuccess={() => {
            cartCtx?.clearCart();
            cartCtx?.showToast("Thank you for your bespoke order. Your journey begins.");
          }}
        />
      )}

      {/* Global Toast Feedback */}
      {cartCtx?.toastMessage && (
        <ToastFeedback message={cartCtx.toastMessage} />
      )}
    </div>
  );
}

export default MainLayout;
