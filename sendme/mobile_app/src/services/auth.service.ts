import type { LoginInput, RegisterInput } from '../core/validation/auth.schema';
import { requireSupabaseClient } from './supabase';

export async function login(input: LoginInput) {
  const client = requireSupabaseClient();
  return client.auth.signInWithPassword(input);
}

export async function registerCustomer(input: RegisterInput) {
  const client = requireSupabaseClient();

  return client.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        phone: input.phone,
        role: 'customer',
      },
    },
  });
}

export async function logout() {
  const client = requireSupabaseClient();
  return client.auth.signOut();
}
