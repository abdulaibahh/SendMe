import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = 'Loading SendMe...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.deepGreen} size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
});
