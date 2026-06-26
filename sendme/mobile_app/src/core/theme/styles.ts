import type { TextStyle, ViewStyle } from 'react-native';

import { theme } from './index';

type TextToken = keyof typeof theme.typography;

export function textStyle(token: TextToken, color: string = theme.colors.textDark): TextStyle {
  return {
    ...theme.typography[token],
    color,
  } as TextStyle;
}

export const cardStyle: ViewStyle = {
  gap: theme.spacing.md,
  padding: theme.spacing.lg,
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.lg,
  backgroundColor: theme.colors.surface,
};

export const compactCardStyle: ViewStyle = {
  gap: theme.spacing.sm,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.surface,
};
