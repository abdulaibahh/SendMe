import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { textStyle } from '../core/theme/styles';

type MetricTileProps = {
  label: string;
  value: string;
  tone?: 'green' | 'orange' | 'neutral';
};

export function MetricTile({ label, value, tone = 'green' }: MetricTileProps) {
  return (
    <View style={[styles.tile, styles[tone]]}>
      <Text style={styles.label}>{label}</Text>
      <Text selectable style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 128,
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  green: {
    backgroundColor: theme.colors.lightGreen,
  },
  orange: {
    backgroundColor: theme.colors.orangeSoft,
  },
  neutral: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  label: {
    ...textStyle('label', theme.colors.textMuted),
    textTransform: 'uppercase',
  },
  value: {
    ...textStyle('subtitle', theme.colors.darkGreen),
    fontVariant: ['tabular-nums'],
  },
});
