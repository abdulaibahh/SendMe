import { MARKET_CATEGORIES, MARKET_PRODUCTS } from '../core/constants/market';
import { requireSupabaseClient, supabase } from './supabase';

export async function listCategories() {
  if (!supabase) {
    return MARKET_CATEGORIES;
  }

  const client = requireSupabaseClient();
  const { data, error } = await client.from('categories').select('*').order('name');

  if (error) {
    throw error;
  }

  return data;
}

export async function listProducts() {
  if (!supabase) {
    return MARKET_PRODUCTS;
  }

  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('name');

  if (error) {
    throw error;
  }

  return data;
}
