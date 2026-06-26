import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { AppButton } from './AppButton';

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text selectable style={styles.message}>
        {message}
      </Text>
      {onRetry ? <AppButton label="Try again" onPress={onRetry} variant="secondary" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: theme.radius.lg,
    backgroundColor: '#FEF2F2',
  },
  title: {
    color: theme.colors.error,
    fontSize: 18,
    fontWeight: '900',
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
