import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { theme } from '../core/theme';
import { textStyle } from '../core/theme/styles';

type AppInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AppInput({ label, error, style, ...textInputProps }: AppInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...textInputProps}
      />
      {error ? (
        <Text selectable style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
  label: {
    ...textStyle('caption', theme.colors.textDark),
  },
  input: {
    minHeight: theme.layout.controlHeight,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textDark,
    ...textStyle('body'),
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    ...textStyle('caption', theme.colors.error),
  },
});
