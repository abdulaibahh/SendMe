import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../../components/ScreenContainer';
import { StatusBadge } from '../../components/StatusBadge';
import { SurfaceCard } from '../../components/SurfaceCard';
import { theme } from '../../core/theme';
import { textStyle } from '../../core/theme/styles';

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
    <ScreenContainer>
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
        <SurfaceCard key={section.title}>
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
        </SurfaceCard>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
    ...textStyle('label', theme.colors.deepGreen),
    textTransform: 'uppercase',
  },
  title: {
    ...textStyle('title'),
  },
  description: {
    ...textStyle('body', theme.colors.textMuted),
  },
  sectionTitle: {
    ...textStyle('bodyStrong'),
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
    ...textStyle('caption', theme.colors.textMuted),
  },
});
