import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { env } from '../src/core/config/env';
import { CURRENCY_CODE } from '../src/core/constants/currency';
import { theme } from '../src/core/theme';

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
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>SendMe</Text>
        <Text style={styles.tagline}>Fresh Market Delivery to Your Doorstep</Text>
        <Text style={styles.context}>Built for market delivery operations in Sierra Leone.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phase 1 foundation</Text>
        <Text style={styles.cardText}>
          The app shell is ready for the customer, rider, and admin workflows that will connect to
          Supabase and Firebase in the next phases.
        </Text>

        <View style={styles.statusGrid}>
          <View style={styles.statusPill}>
            <Text style={styles.statusLabel}>Currency</Text>
            <Text style={styles.statusValue}>{CURRENCY_CODE}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusLabel}>Backend</Text>
            <Text style={styles.statusValue}>
              {env.isSupabaseConfigured ? 'Configured' : 'Pending'}
            </Text>
          </View>
        </View>

        {!env.isSupabaseConfigured ? (
          <Text selectable style={styles.warning}>
            Add {missingConfig || 'Supabase values'} to `.env` before testing backend features.
          </Text>
        ) : null}
      </View>

      <View style={styles.roleList}>
        {roles.map((role) => (
          <View key={role.label} style={styles.roleCard}>
            <View style={styles.roleCopy}>
              <Text style={styles.roleTitle}>{role.label}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <Link href={role.href} asChild>
              <AppButton label="Open" variant="secondary" />
            </Link>
          </View>
        ))}
      </View>

      <Link href="/login" asChild>
        <AppButton label="Sign in or create account" />
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  header: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  brand: {
    color: theme.colors.deepGreen,
    fontSize: 42,
    fontWeight: '800',
  },
  tagline: {
    color: theme.colors.textDark,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  context: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  cardTitle: {
    color: theme.colors.textDark,
    fontSize: 20,
    fontWeight: '700',
  },
  cardText: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statusPill: {
    flex: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightGreen,
  },
  statusLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusValue: {
    color: theme.colors.darkGreen,
    fontSize: 16,
    fontWeight: '800',
  },
  warning: {
    color: theme.colors.orange,
    fontSize: 14,
    lineHeight: 20,
  },
  roleList: {
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.xl,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  roleCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  roleTitle: {
    color: theme.colors.textDark,
    fontSize: 16,
    fontWeight: '800',
  },
  roleDescription: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
