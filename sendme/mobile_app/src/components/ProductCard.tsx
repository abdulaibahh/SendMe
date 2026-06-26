import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../core/constants/currency';
import { theme } from '../core/theme';
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
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  mediaPlaceholder: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightGreen,
  },
  mediaText: {
    color: theme.colors.deepGreen,
    fontSize: 24,
    fontWeight: '900',
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
    color: theme.colors.textDark,
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  price: {
    color: theme.colors.orange,
    fontSize: 15,
    fontWeight: '900',
  },
});
