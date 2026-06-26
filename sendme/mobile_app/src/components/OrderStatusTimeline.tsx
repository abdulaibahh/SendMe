import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import type { TimelineStep } from '../core/types/domain';

type OrderStatusTimelineProps = {
  steps: TimelineStep[];
};

export function OrderStatusTimeline({ steps }: OrderStatusTimelineProps) {
  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View key={step.status} style={styles.row}>
          <View style={[styles.marker, step.completed ? styles.markerDone : null]} />
          <View style={styles.copy}>
            <Text style={styles.label}>{step.label}</Text>
            <Text selectable style={styles.description}>
              {step.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  marker: {
    width: 14,
    height: 14,
    marginTop: 3,
    borderRadius: 7,
    backgroundColor: theme.colors.border,
  },
  markerDone: {
    backgroundColor: theme.colors.success,
  },
  copy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.textDark,
    fontSize: 15,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
