import type { CartLine } from '../core/types/domain';
import { calculateCartSummary } from '../lib/fees';

export function getCartSummary(items: CartLine[]) {
  return calculateCartSummary(items);
}

export function getCartItemCount(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
