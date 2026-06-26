import Stack from 'expo-router/stack';

import { sendMeStackScreenOptions } from '../../src/core/theme/navigation';

export default function AuthLayout() {
  return (
    <Stack screenOptions={sendMeStackScreenOptions}>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Password reset' }} />
      <Stack.Screen name="otp-verification" options={{ title: 'OTP verification' }} />
    </Stack>
  );
}
