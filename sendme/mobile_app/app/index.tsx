import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { env } from '../src/core/config/env';
import { CURRENCY_CODE } from '../src/core/constants/currency';
import { theme } from '../src/core/theme';

const phaseItems = [
  'Expo Router app shell',
  'TypeScript strict mode',
  'Secure env examples',
  'Android package com.sendme.sl',
  'Supabase and Firebase config placeholders',
];

export default function WelcomeScreen() {
  const missingConfig = env.missingConfig.join(', ');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.warning}>
            Add {missingConfig || 'Supabase values'} to `.env` before testing backend features.
          </Text>
        ) : null}
      </View>

      <View style={styles.checklist}>
        {phaseItems.map((item) => (
          <View key={item} style={styles.checklistRow}>
            <View style={styles.dot} />
            <Text style={styles.checklistText}>{item}</Text>
          </View>
        ))}
      </View>

      <AppButton label="Continue Setup" onPress={() => undefined} />
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
  checklist: {
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.xl,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
  },
  checklistText: {
    color: theme.colors.textDark,
    fontSize: 15,
  },
});
