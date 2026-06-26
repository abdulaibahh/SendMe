import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { theme } from '../src/core/theme';

export default function NotFoundScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text style={styles.title}>Screen not found</Text>
      <Text selectable style={styles.copy}>
        The SendMe route you opened is not available. Return home to continue setup.
      </Text>
      <Link href="/" asChild>
        <AppButton label="Go home" />
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.textDark,
    fontSize: 28,
    fontWeight: '800',
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
});
