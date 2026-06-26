import { selectCartSummary, useCartStore } from '../store/cart.store';

export function useCartSummary() {
  const items = useCartStore((state) => state.items);
  return selectCartSummary(items);
}
