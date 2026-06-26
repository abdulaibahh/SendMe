import { Redirect } from 'expo-router';
import type { PropsWithChildren } from 'react';

import type { UserRole } from '../../core/types/domain';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useAuthStore } from '../../store/auth.store';
import { getHomeForRole } from './role-routing';

type RoleGateProps = PropsWithChildren<{
  allowedRole: UserRole;
}>;

export function RoleGate({ allowedRole, children }: RoleGateProps) {
  const error = useAuthStore((state) => state.error);
  const profile = useAuthStore((state) => state.profile);
  const status = useAuthStore((state) => state.status);

  if (status === 'idle' || status === 'loading') {
    return <LoadingState message="Checking your SendMe session..." />;
  }

  if (status === 'unconfigured') {
    return (
      <ErrorState
        title="Backend not configured"
        message="Add Supabase URL and anon key values to mobile_app/.env before opening protected SendMe screens."
      />
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        title="Session error"
        message={error ?? 'SendMe could not restore your session.'}
      />
    );
  }

  if (status === 'unauthenticated' || !profile) {
    return <Redirect href="/login" />;
  }

  if (profile.role !== allowedRole) {
    return <Redirect href={getHomeForRole(profile.role)} />;
  }

  return children;
}
