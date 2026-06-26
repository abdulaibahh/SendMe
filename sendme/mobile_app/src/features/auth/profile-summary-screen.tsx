import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../components/AppButton';
import { ErrorState } from '../../components/ErrorState';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SurfaceCard } from '../../components/SurfaceCard';
import { theme } from '../../core/theme';
import { textStyle } from '../../core/theme/styles';
import { getAuthErrorMessage, logout } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';

type ProfileSummaryScreenProps = {
  title: string;
  subtitle: string;
};

export function ProfileSummaryScreen({ title, subtitle }: ProfileSummaryScreenProps) {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const profile = useAuthStore((state) => state.profile);
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setError(null);
    setIsSigningOut(true);

    try {
      await logout();
      clearSession();
      router.replace('/login');
    } catch (logoutError) {
      setError(getAuthErrorMessage(logoutError));
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {error ? <ErrorState title="Sign out failed" message={error} /> : null}

      <SurfaceCard>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text selectable style={styles.value}>
            {profile?.fullName ?? 'Unknown'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Role</Text>
          <Text selectable style={styles.value}>
            {profile?.role ?? 'Unknown'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text selectable style={styles.value}>
            {profile?.email ?? 'Not set'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text selectable style={styles.value}>
            {profile?.phone ?? 'Not set'}
          </Text>
        </View>
      </SurfaceCard>

      <AppButton
        label="Sign out"
        isLoading={isSigningOut}
        onPress={handleLogout}
        variant="secondary"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.sm,
  },
  title: {
    ...textStyle('title', theme.colors.deepGreen),
  },
  subtitle: {
    ...textStyle('body', theme.colors.textMuted),
  },
  row: {
    gap: theme.spacing.xs,
  },
  label: {
    ...textStyle('caption', theme.colors.textMuted),
  },
  value: {
    ...textStyle('bodyStrong', theme.colors.textDark),
  },
});
