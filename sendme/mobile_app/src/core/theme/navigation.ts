import { theme } from './index';

export const sendMeStackScreenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.surface,
  },
  headerTintColor: theme.colors.darkGreen,
  headerTitleStyle: {
    color: theme.colors.textDark,
    fontWeight: '800',
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: theme.colors.background,
  },
} as const;
