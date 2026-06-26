import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import type { Address } from '../core/types/domain';

type AddressCardProps = {
  address: Address;
};

export function AddressCard({ address }: AddressCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{address.label}</Text>
      <Text selectable style={styles.line}>
        {address.street}
      </Text>
      <Text selectable style={styles.area}>
        {address.area}
        {address.landmark ? `, near ${address.landmark}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
  label: {
    color: theme.colors.textDark,
    fontSize: 16,
    fontWeight: '900',
  },
  line: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  area: {
    color: theme.colors.deepGreen,
    fontSize: 14,
    fontWeight: '800',
  },
});
