import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { theme } from '../core/theme';

type AppButtonProps = PressableProps & {
  label: string;
  icon?: ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  icon,
  isLoading = false,
  variant = 'primary',
  disabled,
  style,
  ...pressableProps
}: AppButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' ? styles.secondary : styles.primary,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
      {...pressableProps}
    >
      {isLoading ? <ActivityIndicator color={theme.colors.white} /> : icon}
      <Text style={[styles.label, variant === 'secondary' ? styles.secondaryLabel : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
  },
  primary: {
    backgroundColor: theme.colors.deepGreen,
  },
  secondary: {
    borderWidth: 1,
    borderColor: theme.colors.deepGreen,
    backgroundColor: theme.colors.white,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryLabel: {
    color: theme.colors.deepGreen,
  },
});
