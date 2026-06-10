import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  variantId: string | null;
  name: string;
  price: number;
  image: string;
  size: string | null;
  qty: number;
  slug: string;
}

interface CartState {
  items: CartLine[];
  add: (line: CartLine) => void;
  remove: (productId: string, variantId: string | null) => void;
  setQty: (productId: string, variantId: string | null, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (line) =>
        set((s) => {
          const idx = s.items.findIndex(
            (i) => i.productId === line.productId && i.variantId === line.variantId,
          );
          if (idx >= 0) {
            const items = [...s.items];
            items[idx] = { ...items[idx], qty: items[idx].qty + line.qty };
            return { items };
          }
          return { items: [...s.items, line] };
        }),
      remove: (pid, vid) =>
        set((s) => ({ items: s.items.filter((i) => !(i.productId === pid && i.variantId === vid)) })),
      setQty: (pid, vid, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === pid && i.variantId === vid ? { ...i, qty: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: "shoefify-cart" },
  ),
);
