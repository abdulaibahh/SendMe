import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { env } from '../../core/config/env';
import {
  fetchUserProfile,
  getAuthErrorMessage,
  getCurrentAuthResult,
  subscribeToAuthChanges,
} from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setError = useAuthStore((state) => state.setError);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const setUnconfigured = useAuthStore((state) => state.setUnconfigured);

  useEffect(() => {
    let isMounted = true;

    if (!env.isSupabaseConfigured) {
      setUnconfigured();
      return undefined;
    }

    setLoading();

    getCurrentAuthResult()
      .then((result) => {
        if (!isMounted) {
          return;
        }

        if (result.session && result.profile) {
          setAuthenticated(result.session, result.profile);
          return;
        }

        setUnauthenticated();
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setError(getAuthErrorMessage(error));
        }
      });

    const unsubscribe = subscribeToAuthChanges(async (session) => {
      if (!isMounted) {
        return;
      }

      if (!session?.user) {
        setUnauthenticated();
        return;
      }

      try {
        const profile = await fetchUserProfile(session.user.id);
        if (isMounted) {
          setAuthenticated(session, profile);
        }
      } catch (error) {
        if (isMounted) {
          setError(getAuthErrorMessage(error));
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setAuthenticated, setError, setLoading, setUnauthenticated, setUnconfigured]);

  return children;
}
