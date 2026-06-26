import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '../core/theme';
import { compactCardStyle, textStyle } from '../core/theme/styles';
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
    ...compactCardStyle,
    minHeight: 96,
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  name: {
    ...textStyle('bodyStrong', theme.colors.deepGreen),
  },
  description: {
    ...textStyle('caption', theme.colors.textMuted),
  },
});
