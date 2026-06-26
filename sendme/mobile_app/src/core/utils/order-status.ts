import type { OrderStatus, TimelineStep } from '../types/domain';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  assigned: 'Assigned',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const ORDER_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'assigned',
  'out_for_delivery',
  'delivered',
];

export function canTransitionOrder(from: OrderStatus, to: OrderStatus) {
  if (from === 'cancelled' || from === 'delivered') {
    return false;
  }

  if (to === 'cancelled') {
    return true;
  }

  return ORDER_FLOW.indexOf(to) === ORDER_FLOW.indexOf(from) + 1;
}

export function buildOrderTimeline(currentStatus: OrderStatus): TimelineStep[] {
  const currentIndex = ORDER_FLOW.indexOf(currentStatus);

  return ORDER_FLOW.map((status, index) => ({
    status,
    label: ORDER_STATUS_LABELS[status],
    description: `Order is ${ORDER_STATUS_LABELS[status].toLowerCase()}.`,
    completed: currentStatus === 'cancelled' ? false : index <= currentIndex,
  }));
}
