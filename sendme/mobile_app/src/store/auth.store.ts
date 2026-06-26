import { create } from 'zustand';

import type { UserRole } from '../core/types/domain';

type AuthState = {
  userId: string | null;
  role: UserRole | null;
  setSession: (userId: string, role: UserRole) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  setSession: (userId, role) => set({ userId, role }),
  clearSession: () => set({ userId: null, role: null }),
}));
