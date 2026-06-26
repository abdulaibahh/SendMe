import type { Session } from '@supabase/supabase-js';

import type { UserRole } from '../core/types/domain';
import type { LoginInput, RegisterInput } from '../core/validation/auth.schema';
import { requireSupabaseClient } from './supabase';

export type UserProfile = {
  id: string;
  role: UserRole;
  fullName: string;
  phone: string | null;
  email: string | null;
  avatarUrl: string | null;
  isActive: boolean;
};

type UserRow = {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  is_active: boolean;
};

export type AuthResult = {
  session: Session | null;
  profile: UserProfile | null;
  needsVerification: boolean;
};

function mapProfile(row: UserRow): UserProfile {
  return {
    id: row.id,
    role: row.role,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    avatarUrl: row.avatar_url,
    isActive: row.is_active,
  };
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Authentication failed. Please try again.';
}

export async function fetchUserProfile(userId: string) {
  const client = requireSupabaseClient();

  const { data, error } = await client
    .from('users')
    .select('id, role, full_name, phone, email, avatar_url, is_active')
    .eq('id', userId)
    .maybeSingle<UserRow>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No SendMe profile was found for this account.');
  }

  if (!data.is_active) {
    throw new Error('This SendMe account is suspended. Contact support for help.');
  }

  return mapProfile(data);
}

async function upsertCustomerProfile(userId: string, input: RegisterInput) {
  const client = requireSupabaseClient();

  const { error } = await client.from('users').upsert(
    {
      id: userId,
      role: 'customer' satisfies UserRole,
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      is_active: true,
    },
    { onConflict: 'id' },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user || !data.session) {
    throw new Error('Login did not return a valid session.');
  }

  const profile = await fetchUserProfile(data.user.id);

  return {
    session: data.session,
    profile,
    needsVerification: false,
  };
}

export async function registerCustomer(input: RegisterInput): Promise<AuthResult> {
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        phone: input.phone.trim(),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Signup did not return a user account.');
  }

  if (!data.session) {
    return {
      session: null,
      profile: null,
      needsVerification: true,
    };
  }

  await upsertCustomerProfile(data.user.id, input);
  const profile = await fetchUserProfile(data.user.id);

  return {
    session: data.session,
    profile,
    needsVerification: false,
  };
}

export async function getCurrentAuthResult(): Promise<AuthResult> {
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session?.user) {
    return {
      session: null,
      profile: null,
      needsVerification: false,
    };
  }

  const profile = await fetchUserProfile(data.session.user.id);

  return {
    session: data.session,
    profile,
    needsVerification: false,
  };
}

export function subscribeToAuthChanges(
  onChange: (session: Session | null) => Promise<void> | void,
) {
  const client = requireSupabaseClient();
  const {
    data: { subscription },
  } = client.auth.onAuthStateChange((_event, session) => {
    void onChange(session);
  });

  return () => subscription.unsubscribe();
}

export async function logout() {
  const client = requireSupabaseClient();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendPasswordResetEmail(email: string) {
  const client = requireSupabaseClient();
  const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase());

  if (error) {
    throw new Error(error.message);
  }
}

export async function verifySignupOtp(email: string, token: string): Promise<AuthResult> {
  const client = requireSupabaseClient();
  const { data, error } = await client.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: 'signup',
  });

  if (error) {
    throw new Error(error.message);
  }

  const profile = data.user ? await fetchUserProfile(data.user.id) : null;

  return {
    session: data.session,
    profile,
    needsVerification: false,
  };
}
