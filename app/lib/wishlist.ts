import { useState, useEffect, useCallback } from "react";

export interface WishlistItem {
  id: string;
  title: string;
  handle?: string;
  subtitle?: string;
  price: number | string;
  currencyCode?: string;
  image?: string;
  size?: string;
  merchandiseId?: string;
}

const STORAGE_KEY = "kissa_wishlist";
const WISHLIST_EVENT = "kissa:wishlist-updated";

export function getStoredWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(WISHLIST_EVENT, { detail: items }));
  } catch (err) {
    console.error("Failed to save wishlist:", err);
  }
}

export function addToWishlist(item: WishlistItem): void {
  const current = getStoredWishlist();
  if (current.some((i) => i.id === item.id || (item.handle && i.handle === item.handle))) {
    return;
  }
  saveWishlist([...current, item]);
}

export function removeFromWishlist(id: string): void {
  const current = getStoredWishlist();
  const filtered = current.filter((item) => item.id !== id && item.handle !== id);
  saveWishlist(filtered);
}

export function isInWishlist(id: string): boolean {
  const current = getStoredWishlist();
  return current.some((item) => item.id === id || item.handle === id);
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setWishlist(getStoredWishlist());
    setIsLoaded(true);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<WishlistItem[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setWishlist(customEvent.detail);
      } else {
        setWishlist(getStoredWishlist());
      }
    };

    window.addEventListener(WISHLIST_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const add = useCallback((item: WishlistItem) => {
    addToWishlist(item);
  }, []);

  const remove = useCallback((id: string) => {
    removeFromWishlist(id);
  }, []);

  const check = useCallback(
    (id: string) => wishlist.some((item) => item.id === id || item.handle === id),
    [wishlist]
  );

  return {
    wishlist,
    count: wishlist.length,
    isLoaded,
    addToWishlist: add,
    removeFromWishlist: remove,
    isInWishlist: check,
  };
}
