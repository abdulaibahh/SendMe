import { StyleSheet, Text } from 'react-native';

import { theme } from '../core/theme';

type StatusBadgeProps = {
  label: string;
  tone?: 'success' | 'warning' | 'error' | 'info';
};

export function StatusBadge({ label, tone = 'info' }: StatusBadgeProps) {
  return <Text style={[styles.badge, styles[tone]]}>{label}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    fontSize: 12,
    fontWeight: '900',
  },
  success: {
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.success,
  },
  warning: {
    backgroundColor: '#FFF4E8',
    color: theme.colors.orange,
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: theme.colors.error,
  },
  info: {
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.deepGreen,
  },
});
