import type { OrderStatus, RiderStatus } from '../core/types/domain';
import { requireSupabaseClient } from './supabase';

export function isRiderAvailable(status: RiderStatus) {
  return status === 'available';
}

export function nextRiderOrderStatus(status: OrderStatus): OrderStatus {
  if (status === 'assigned') {
    return 'out_for_delivery';
  }

  if (status === 'out_for_delivery') {
    return 'delivered';
  }

  return status;
}

export async function listAssignedOrders(riderId: string) {
  const client = requireSupabaseClient();
  const { data, error } = await client.from('deliveries').select('*, orders(*)').eq('rider_id', riderId);

  if (error) {
    throw error;
  }

  return data;
}
