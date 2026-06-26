import { createClient } from '@supabase/supabase-js';

import { env } from '../core/config/env';

export const supabase = env.isSupabaseConfigured
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : null;

export function requireSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add public Supabase values to mobile_app/.env.');
  }

  return supabase;
}
