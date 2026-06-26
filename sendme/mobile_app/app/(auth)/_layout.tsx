import Stack from 'expo-router/stack';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Password reset' }} />
      <Stack.Screen name="otp-verification" options={{ title: 'OTP verification' }} />
    </Stack>
  );
}
