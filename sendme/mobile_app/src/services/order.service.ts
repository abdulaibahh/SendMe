import type { OrderStatus } from '../core/types/domain';
import { canTransitionOrder } from '../core/utils/order-status';
import { requireSupabaseClient } from './supabase';

export function validateOrderTransition(from: OrderStatus, to: OrderStatus) {
  return canTransitionOrder(from, to);
}

export async function listMyOrders(userId: string) {
  const client = requireSupabaseClient();
  const { data, error } = await client.from('orders').select('*').eq('customer_id', userId);

  if (error) {
    throw error;
  }

  return data;
}
