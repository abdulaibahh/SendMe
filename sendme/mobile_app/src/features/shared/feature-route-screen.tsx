import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from '../../components/StatusBadge';
import { theme } from '../../core/theme';

export type FeatureRouteSection = {
  title: string;
  items: string[];
};

type FeatureRouteScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  sections: FeatureRouteSection[];
};

export function FeatureRouteScreen({
  eyebrow,
  title,
  description,
  status = 'Phase 2',
  sections,
}: FeatureRouteScreenProps) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.eyebrowRow}>
          <Text selectable style={styles.eyebrow}>
            {eyebrow}
          </Text>
          <StatusBadge label={status} tone="info" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text selectable style={styles.description}>
          {description}
        </Text>
      </View>

      {sections.map((section) => (
        <View key={section.title} style={styles.card}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.list}>
            {section.items.map((item) => (
              <View key={item} style={styles.listItem}>
                <View style={styles.dot} />
                <Text selectable style={styles.itemText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  header: {
    gap: theme.spacing.sm,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.deepGreen,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.textDark,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  description: {
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
  sectionTitle: {
    color: theme.colors.textDark,
    fontSize: 17,
    fontWeight: '800',
  },
  list: {
    gap: theme.spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    marginTop: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.orange,
  },
  itemText: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
