import type { CartLine, CartSummary } from '../core/types/domain';

const SERVICE_FEE_RATE = 0.05;
const DEFAULT_DELIVERY_FEE = 25;

export function calculateSubtotal(items: CartLine[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateServiceFee(subtotal: number) {
  return Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
}

export function calculateDeliveryFee(subtotal: number) {
  return subtotal >= 300 ? 0 : DEFAULT_DELIVERY_FEE;
}

export function calculateCartSummary(items: CartLine[]): CartSummary {
  const subtotal = calculateSubtotal(items);
  const serviceFee = calculateServiceFee(subtotal);
  const deliveryFee = calculateDeliveryFee(subtotal);

  return {
    subtotal,
    serviceFee,
    deliveryFee,
    total: subtotal + serviceFee + deliveryFee,
  };
}
