import { StyleSheet, Text } from 'react-native';

import { theme } from '../core/theme';
import { textStyle } from '../core/theme/styles';

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
    ...textStyle('label'),
  },
  success: {
    backgroundColor: theme.colors.successSoft,
    color: theme.colors.success,
  },
  warning: {
    backgroundColor: theme.colors.orangeSoft,
    color: theme.colors.orange,
  },
  error: {
    backgroundColor: theme.colors.errorSoft,
    color: theme.colors.error,
  },
  info: {
    backgroundColor: theme.colors.infoSoft,
    color: theme.colors.info,
  },
});
