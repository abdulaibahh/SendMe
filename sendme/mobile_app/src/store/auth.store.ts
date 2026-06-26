import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

import type { UserRole } from '../core/types/domain';
import type { UserProfile } from '../services/auth.service';

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'unconfigured'
  | 'error';

type AuthState = {
  status: AuthStatus;
  session: Session | null;
  profile: UserProfile | null;
  userId: string | null;
  role: UserRole | null;
  error: string | null;
  setLoading: () => void;
  setAuthenticated: (session: Session, profile: UserProfile) => void;
  setUnauthenticated: () => void;
  setUnconfigured: () => void;
  setError: (message: string) => void;
  clearSession: () => void;
};

const signedOutState = {
  session: null,
  profile: null,
  userId: null,
  role: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  ...signedOutState,
  error: null,
  setLoading: () => set({ status: 'loading', error: null }),
  setAuthenticated: (session, profile) =>
    set({
      status: 'authenticated',
      session,
      profile,
      userId: profile.id,
      role: profile.role,
      error: null,
    }),
  setUnauthenticated: () => set({ status: 'unauthenticated', ...signedOutState, error: null }),
  setUnconfigured: () => set({ status: 'unconfigured', ...signedOutState, error: null }),
  setError: (message) => set({ status: 'error', ...signedOutState, error: message }),
  clearSession: () => set({ status: 'unauthenticated', ...signedOutState, error: null }),
}));
