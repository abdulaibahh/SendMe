import { Link, Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { LoadingState } from '../src/components/LoadingState';
import { ScreenContainer } from '../src/components/ScreenContainer';
import { SurfaceCard } from '../src/components/SurfaceCard';
import { env } from '../src/core/config/env';
import { CURRENCY_CODE } from '../src/core/constants/currency';
import { theme } from '../src/core/theme';
import { textStyle } from '../src/core/theme/styles';
import { getHomeForRole } from '../src/features/auth/role-routing';
import { useAuthStore } from '../src/store/auth.store';

export default function IndexScreen() {
  const missingConfig = env.missingConfig.join(', ');
  const profile = useAuthStore((state) => state.profile);
  const status = useAuthStore((state) => state.status);

  if (status === 'idle' || status === 'loading') {
    return <LoadingState message="Opening SendMe..." />;
  }

  if (status === 'authenticated' && profile) {
    return <Redirect href={getHomeForRole(profile.role)} />;
  }

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.brand}>SendMe</Text>
        <Text style={styles.tagline}>Fresh Market Delivery to Your Doorstep</Text>
        <Text style={styles.context}>Fresh market food and groceries delivered in Sierra Leone.</Text>
      </View>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Welcome</Text>
        <Text style={styles.cardText}>
          Sign in to browse market products, track orders, or open your assigned operations area.
        </Text>

        <View style={styles.statusRow}>
          <Text style={styles.statusText}>Currency: {CURRENCY_CODE}</Text>
          <Text style={styles.statusText}>
            Backend: {env.isSupabaseConfigured ? 'Configured' : 'Pending'}
          </Text>
        </View>

        {!env.isSupabaseConfigured ? (
          <Text selectable style={styles.warning}>
            Add {missingConfig || 'Supabase values'} to `.env` before testing backend auth.
          </Text>
        ) : null}
      </SurfaceCard>

      <View style={styles.actions}>
        <Link href="/login" asChild>
          <AppButton label="Sign in" />
        </Link>
        <Link href="/register" asChild>
          <AppButton label="Create customer account" variant="secondary" />
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.sm,
  },
  brand: {
    ...textStyle('hero', theme.colors.deepGreen),
  },
  tagline: {
    ...textStyle('subtitle'),
  },
  context: {
    ...textStyle('body', theme.colors.textMuted),
  },
  cardTitle: {
    ...textStyle('subtitle'),
  },
  cardText: {
    ...textStyle('body', theme.colors.textMuted),
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statusText: {
    ...textStyle('caption', theme.colors.textMuted),
  },
  warning: {
    ...textStyle('caption', theme.colors.orange),
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
