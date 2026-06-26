import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { AppButton } from '../src/components/AppButton';
import { ScreenContainer } from '../src/components/ScreenContainer';
import { theme } from '../src/core/theme';
import { textStyle } from '../src/core/theme/styles';

export default function NotFoundScreen() {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Screen not found</Text>
      <Text selectable style={styles.copy}>
        The SendMe route you opened is not available. Return home to continue setup.
      </Text>
      <Link href="/" asChild>
        <AppButton label="Go home" />
      </Link>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...textStyle('title'),
  },
  copy: {
    ...textStyle('body', theme.colors.textMuted),
  },
});
