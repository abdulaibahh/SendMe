import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../core/constants/currency';
import { theme } from '../core/theme';
import { cardStyle, textStyle } from '../core/theme/styles';
import type { Product } from '../core/types/domain';
import { StatusBadge } from './StatusBadge';

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.mediaPlaceholder}>
        <Text style={styles.mediaText}>{product.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{product.name}</Text>
          <StatusBadge label={product.isAvailable ? 'In stock' : 'Unavailable'} tone="success" />
        </View>
        <Text selectable style={styles.description}>
          {product.description}
        </Text>
        <Text style={styles.price}>
          {formatCurrency(product.price)} / {product.unit}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...cardStyle,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  mediaPlaceholder: {
    width: theme.layout.iconTile,
    height: theme.layout.iconTile,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightGreen,
  },
  mediaText: {
    ...textStyle('title', theme.colors.deepGreen),
  },
  copy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  name: {
    flex: 1,
    ...textStyle('bodyStrong'),
  },
  description: {
    ...textStyle('caption', theme.colors.textMuted),
  },
  price: {
    ...textStyle('bodyStrong', theme.colors.orange),
  },
});
