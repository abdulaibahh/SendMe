import { StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../core/constants/currency';
import { theme } from '../core/theme';
import type { CartLine } from '../core/types/domain';

type CartItemRowProps = {
  item: CartLine;
};

export function CartItemRow({ item }: CartItemRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.meta}>
          {item.quantity} x {formatCurrency(item.product.price)}
        </Text>
      </View>
      <Text style={styles.total}>{formatCurrency(item.quantity * item.product.price)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  name: {
    color: theme.colors.textDark,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  total: {
    color: theme.colors.textDark,
    fontSize: 15,
    fontWeight: '900',
  },
});
