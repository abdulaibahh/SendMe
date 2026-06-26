import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { cardStyle, textStyle } from '../core/theme/styles';
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
    ...cardStyle,
    gap: theme.spacing.xs,
  },
  label: {
    ...textStyle('bodyStrong'),
  },
  line: {
    ...textStyle('caption', theme.colors.textMuted),
  },
  area: {
    ...textStyle('caption', theme.colors.deepGreen),
  },
});
