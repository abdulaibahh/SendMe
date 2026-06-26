import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { textStyle } from '../core/theme/styles';

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text selectable style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.xl,
  },
  title: {
    ...textStyle('subtitle'),
    textAlign: 'center',
  },
  message: {
    ...textStyle('body', theme.colors.textMuted),
    textAlign: 'center',
  },
});
