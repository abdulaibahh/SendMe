import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { cardStyle, compactCardStyle } from '../core/theme/styles';

type SurfaceCardProps = {
  children: ReactNode;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function SurfaceCard({ children, compact = false, style }: SurfaceCardProps) {
  return <View style={[compact ? styles.compact : styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: cardStyle,
  compact: compactCardStyle,
});
