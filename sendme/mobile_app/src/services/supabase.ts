import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';

import { env } from '../core/config/env';

type SupabaseStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

async function canUseSecureStore() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

const sessionStorage: SupabaseStorage = {
  async getItem(key) {
    if (await canUseSecureStore()) {
      return SecureStore.getItemAsync(key);
    }

    return AsyncStorage.getItem(key);
  },
  async setItem(key, value) {
    if (await canUseSecureStore()) {
      await SecureStore.setItemAsync(key, value);
      return;
    }

    await AsyncStorage.setItem(key, value);
  },
  async removeItem(key) {
    if (await canUseSecureStore()) {
      await SecureStore.deleteItemAsync(key);
      return;
    }

    await AsyncStorage.removeItem(key);
  },
};

export const supabase = env.isSupabaseConfigured
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
        persistSession: true,
        storage: sessionStorage,
      },
    })
  : null;

if (supabase) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      void supabase.auth.startAutoRefresh();
    } else {
      void supabase.auth.stopAutoRefresh();
    }
  });
}

export function requireSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add public Supabase values to mobile_app/.env.');
  }

  return supabase;
}
