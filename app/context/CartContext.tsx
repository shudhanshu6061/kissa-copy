import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  INITIAL_CART,
  type CartItem as LandingCartItem,
  type CurrencyCode,
  formatPrice,
} from "../lib/landing-data";
import { addProductToCart, type CartLineAttribute } from "../lib/cart";

export interface CartItem {
  id: string;
  perfumeId: string;
  title: string;
  subtitle: string;
  size: string;
  price: number;
  qty: number;
  img: string;
  merchandiseId?: string;
  attributes?: CartLineAttribute[];
}

export interface AddToCartInput {
  id?: string;
  perfumeId?: string;
  title: string;
  subtitle?: string;
  size?: string;
  price: number;
  qty?: number;
  img?: string;
  merchandiseId?: string;
  attributes?: CartLineAttribute[];
}

export interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  isOpen: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: AddToCartInput) => void;
  updateQuantity: (idOrIndex: string | number, delta: number) => void;
  removeFromCart: (idOrIndex: string | number) => void;
  clearCart: () => void;
  subtotal: number;
  couponCode: string;
  discountPercent: number;
  discountAmount: number;
  isCouponApplied: boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  finalTotal: number;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  isLoading: boolean;
  proceedToCheckout: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY_ITEMS = "kissa_cart";
const STORAGE_KEY_DATA = "kissa_cart_data";
const STORAGE_KEY_COUPON = "kissa_cart_coupon";

function normalizeInitialCart(): CartItem[] {
  return INITIAL_CART.map((item, idx) => ({
    id: `${item.perfumeId}-${item.size}-${idx}`,
    perfumeId: item.perfumeId,
    title: item.title,
    subtitle: item.subtitle,
    size: item.size,
    price: item.price,
    qty: item.qty,
    img: item.img,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(normalizeInitialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Toast auto-dismiss
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Read saved cart & coupon on client mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window === "undefined") return;

    try {
      const savedCart = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const items: CartItem[] = parsed.map((item: any, idx: number) => ({
            id: item.id || `${item.perfumeId || "item"}-${item.size || "std"}-${idx}`,
            perfumeId: item.perfumeId || "item",
            title: item.title || "Fragrance Flacon",
            subtitle: item.subtitle || (item.size ? `Extrait de Parfum · ${item.size}` : "Extrait de Parfum"),
            size: item.size || "50ml",
            price: Number(item.price) || 1599,
            qty: Number(item.qty) || 1,
            img: item.img || "/landing-pages/meng-to-sketchbook/naya-panna.png",
            merchandiseId: item.merchandiseId,
            attributes: item.attributes,
          }));
          setCart(items);
        }
      }

      const savedCoupon = localStorage.getItem(STORAGE_KEY_COUPON);
      if (savedCoupon) {
        const parsedCoupon = JSON.parse(savedCoupon);
        if (parsedCoupon.applied && parsedCoupon.code) {
          setCouponCode(parsedCoupon.code);
          setDiscountPercent(parsedCoupon.percent || 10);
          setIsCouponApplied(true);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Sync to localStorage and dispatch custom event whenever cart changes
  const persistCart = useCallback((updatedCart: CartItem[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updatedCart));
      const totalQuantity = updatedCart.reduce((sum, item) => sum + item.qty, 0);

      // Also maintain compatibility with kissa_cart_data
      const cartData = {
        id: "local_cart",
        checkoutUrl: "/shop#checkout",
        totalQuantity,
        lines: updatedCart.map((i) => ({
          id: i.id,
          quantity: i.qty,
          merchandiseId: i.merchandiseId,
          attributes: i.attributes,
        })),
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(cartData));

      // Global event notification
      window.dispatchEvent(
        new CustomEvent("kissa:cart-updated", {
          detail: { totalQuantity, cart: updatedCart },
        })
      );
    } catch (e) {
      console.warn("Cart persistence error:", e);
    }
  }, []);

  // Listen for cart update events dispatched from other components/tabs
  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ totalQuantity: number; cart?: CartItem[] }>;
      if (customEvent.detail?.cart && Array.isArray(customEvent.detail.cart)) {
        setCart(customEvent.detail.cart);
      }
    };
    window.addEventListener("kissa:cart-updated", handleCartUpdate);
    return () => window.removeEventListener("kissa:cart-updated", handleCartUpdate);
  }, []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // Prevent layout shift
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
  }, [isOpen]);

  // Keyboard navigation: Escape key closes the cart drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  // Add item to cart
  const addToCart = useCallback(
    (input: AddToCartInput) => {
      const perfumeId = input.perfumeId || "naya-panna";
      const size = input.size || "50ml";
      const title = input.title || "NAYA PANNA";
      const subtitle =
        input.subtitle || (size ? `A Fragrance for Your Next Chapter · ${size}` : "Artisanal Extrait de Parfum");
      const img = input.img || "/landing-pages/meng-to-sketchbook/naya-panna.png";
      const price = Number(input.price) || 1599;
      const addQty = input.qty || 1;
      const itemId = input.id || `${perfumeId}-${size}`;

      setCart((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.id === itemId || (item.perfumeId === perfumeId && item.size === size)
        );

        let next: CartItem[];
        if (existingIdx > -1) {
          next = [...prev];
          next[existingIdx] = {
            ...next[existingIdx],
            qty: next[existingIdx].qty + addQty,
          };
        } else {
          next = [
            ...prev,
            {
              id: itemId,
              perfumeId,
              title,
              subtitle,
              size,
              price,
              qty: addQty,
              img,
              merchandiseId: input.merchandiseId,
              attributes: input.attributes,
            },
          ];
        }

        persistCart(next);
        return next;
      });

      // Synchronize with Shopify cart API if merchandiseId is available
      if (input.merchandiseId) {
        addProductToCart({
          merchandiseId: input.merchandiseId,
          quantity: addQty,
          attributes: input.attributes,
        }).catch((err) => console.warn("Background Shopify sync:", err));
      }

      showToast(`${title} (${size}) added to your Cart`);
      setIsOpen(true);
    },
    [persistCart, showToast]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    (idOrIndex: string | number, delta: number) => {
      setCart((prev) => {
        let idx = typeof idOrIndex === "number" ? idOrIndex : prev.findIndex((i) => i.id === idOrIndex);
        if (idx === -1 || !prev[idx]) return prev;

        const current = prev[idx];
        const nextQty = current.qty + delta;

        let next: CartItem[];
        if (nextQty <= 0) {
          next = prev.filter((_, i) => i !== idx);
          showToast(`${current.title} removed from cart`);
        } else {
          next = [...prev];
          next[idx] = { ...current, qty: nextQty };
        }

        persistCart(next);
        return next;
      });
    },
    [persistCart, showToast]
  );

  // Remove item completely
  const removeFromCart = useCallback(
    (idOrIndex: string | number) => {
      setCart((prev) => {
        let idx = typeof idOrIndex === "number" ? idOrIndex : prev.findIndex((i) => i.id === idOrIndex);
        if (idx === -1 || !prev[idx]) return prev;

        const removed = prev[idx];
        const next = prev.filter((_, i) => i !== idx);
        persistCart(next);
        showToast(`${removed.title} removed from cart`);
        return next;
      });
    },
    [persistCart, showToast]
  );

  // Clear all items
  const clearCart = useCallback(() => {
    setCart([]);
    persistCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_COUPON);
    }
    setIsCouponApplied(false);
    setDiscountPercent(0);
    setCouponCode("");
  }, [persistCart]);

  // Coupon handling
  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();
      if (!cleanCode) {
        showToast("Please enter a coupon code.");
        return { success: false, message: "Please enter a coupon code." };
      }

      if (cleanCode === "WELCOME10" || cleanCode === "KISSA10" || cleanCode === "BESPOKE10") {
        setDiscountPercent(10);
        setIsCouponApplied(true);
        setCouponCode(cleanCode);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            STORAGE_KEY_COUPON,
            JSON.stringify({ code: cleanCode, percent: 10, applied: true })
          );
        }
        showToast(`Coupon "${cleanCode}" applied! (10% off)`);
        return { success: true, message: `Coupon "${cleanCode}" applied! (10% off)` };
      }

      showToast(`Invalid coupon "${cleanCode}". Try WELCOME10 for 10% off.`);
      return { success: false, message: `Invalid coupon "${cleanCode}". Try WELCOME10 for 10% off.` };
    },
    [showToast]
  );

  const removeCoupon = useCallback(() => {
    setIsCouponApplied(false);
    setDiscountPercent(0);
    setCouponCode("");
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_COUPON);
    }
    showToast("Coupon removed.");
  }, [showToast]);

  // Derived calculations
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const discountAmount = useMemo(
    () => (isCouponApplied ? Math.round(subtotal * (discountPercent / 100)) : 0),
    [subtotal, isCouponApplied, discountPercent]
  );
  const finalTotal = useMemo(() => Math.max(0, subtotal - discountAmount), [subtotal, discountAmount]);

  // Checkout action
  const proceedToCheckout = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_DATA);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (
            parsed.checkoutUrl &&
            typeof parsed.checkoutUrl === "string" &&
            parsed.checkoutUrl.startsWith("http")
          ) {
            window.location.href = parsed.checkoutUrl;
            return;
          }
        }
      } catch {
        // Fallback below
      }
    }

    // Default: Open Bespoke Checkout modal
    setIsOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartCount,
      isOpen,
      isCartOpen: isOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      couponCode,
      discountPercent,
      discountAmount,
      isCouponApplied,
      applyCoupon,
      removeCoupon,
      finalTotal,
      currency,
      setCurrency,
      isLoading,
      proceedToCheckout,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      toastMessage,
      showToast,
    }),
    [
      cart,
      cartCount,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      couponCode,
      discountPercent,
      discountAmount,
      isCouponApplied,
      applyCoupon,
      removeCoupon,
      finalTotal,
      currency,
      setCurrency,
      isLoading,
      proceedToCheckout,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      toastMessage,
      showToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
