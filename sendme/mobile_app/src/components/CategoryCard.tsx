import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '../core/theme';
import type { Category } from '../core/types/domain';

type CategoryCardProps = {
  category: Category;
  onPress?: () => void;
};

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{category.name}</Text>
      <Text selectable style={styles.description}>
        {category.description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 96,
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  name: {
    color: theme.colors.deepGreen,
    fontSize: 16,
    fontWeight: '900',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
