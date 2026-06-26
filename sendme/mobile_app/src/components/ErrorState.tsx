import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { cardStyle, textStyle } from '../core/theme/styles';
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
    ...cardStyle,
    gap: theme.spacing.md,
    borderColor: theme.colors.errorSoft,
    backgroundColor: theme.colors.errorSoft,
  },
  title: {
    ...textStyle('subtitle', theme.colors.error),
  },
  message: {
    ...textStyle('body', theme.colors.textMuted),
  },
});
