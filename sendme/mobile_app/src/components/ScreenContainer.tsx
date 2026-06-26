import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { theme } from '../core/theme';

type ScreenContainerProps = {
  children: ReactNode;
  centered?: boolean;
};

export function ScreenContainer({ children, centered = false }: ScreenContainerProps) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scroll}>
      <View style={[styles.content, centered ? styles.centered : null]}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    width: '100%',
    maxWidth: theme.layout.maxContentWidth,
    gap: theme.spacing.lg,
    padding: theme.layout.screenPadding,
    alignSelf: 'center',
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
