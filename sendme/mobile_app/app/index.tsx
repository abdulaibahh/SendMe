import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { MetricTile } from '../src/components/MetricTile';
import { ScreenContainer } from '../src/components/ScreenContainer';
import { SurfaceCard } from '../src/components/SurfaceCard';
import { env } from '../src/core/config/env';
import { CURRENCY_CODE } from '../src/core/constants/currency';
import { theme } from '../src/core/theme';
import { textStyle } from '../src/core/theme/styles';

const roles = [
  {
    label: 'Customer app',
    href: '/(customer)/home',
    description: 'Browse products, manage cart, checkout, and track orders.',
  },
  {
    label: 'Rider app',
    href: '/(rider)/dashboard',
    description: 'View assigned deliveries and update order movement.',
  },
  {
    label: 'Admin app',
    href: '/(admin)/dashboard',
    description: 'Manage products, orders, riders, customers, and reports.',
  },
] as const;

export default function IndexScreen() {
  const missingConfig = env.missingConfig.join(', ');

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.brand}>SendMe</Text>
        <Text style={styles.tagline}>Fresh Market Delivery to Your Doorstep</Text>
        <Text style={styles.context}>Built for market delivery operations in Sierra Leone.</Text>
      </View>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Phase 3 design system</Text>
        <Text style={styles.cardText}>
          The mobile app now has shared typography, spacing, cards, controls, and status surfaces
          ready for customer, rider, and admin workflows.
        </Text>

        <View style={styles.statusGrid}>
          <MetricTile label="Currency" value={CURRENCY_CODE} />
          <MetricTile
            label="Backend"
            value={env.isSupabaseConfigured ? 'Configured' : 'Pending'}
            tone={env.isSupabaseConfigured ? 'green' : 'orange'}
          />
        </View>

        {!env.isSupabaseConfigured ? (
          <Text selectable style={styles.warning}>
            Add {missingConfig || 'Supabase values'} to `.env` before testing backend features.
          </Text>
        ) : null}
      </SurfaceCard>

      <View style={styles.roleList}>
        {roles.map((role) => (
          <SurfaceCard key={role.label} compact style={styles.roleCard}>
            <View style={styles.roleCopy}>
              <Text style={styles.roleTitle}>{role.label}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <Link href={role.href} asChild>
              <AppButton label="Open" variant="secondary" />
            </Link>
          </SurfaceCard>
        ))}
      </View>

      <Link href="/login" asChild>
        <AppButton label="Sign in or create account" />
      </Link>
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
  statusGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  warning: {
    ...textStyle('caption', theme.colors.orange),
  },
  roleList: {
    gap: theme.spacing.sm,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  roleCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  roleTitle: {
    ...textStyle('bodyStrong'),
  },
  roleDescription: {
    ...textStyle('caption', theme.colors.textMuted),
  },
});
