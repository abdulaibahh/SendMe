import type { PaymentMethod, PaymentStatus } from '../core/types/domain';

export function getInitialPaymentStatus(method: PaymentMethod): PaymentStatus {
  if (method === 'cash_on_delivery') {
    return 'cash_on_delivery_pending';
  }

  return 'awaiting_verification';
}

export function requiresPaymentReference(method: PaymentMethod) {
  return method === 'orange_money' || method === 'afrimoney';
}
