import { create } from 'zustand';

import type { CartLine, Product } from '../core/types/domain';
import { calculateCartSummary } from '../lib/fees';

type CartState = {
  items: CartLine[];
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addProduct: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      }

      return { items: [...state.items, { product, quantity }] };
    }),
  removeProduct: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
}));

export function selectCartSummary(items: CartLine[]) {
  return calculateCartSummary(items);
}
