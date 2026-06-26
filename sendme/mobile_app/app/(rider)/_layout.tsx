import Stack from 'expo-router/stack';

import { sendMeStackScreenOptions } from '../../src/core/theme/navigation';

export default function RiderLayout() {
  return (
    <Stack screenOptions={sendMeStackScreenOptions}>
      <Stack.Screen name="dashboard" options={{ title: 'Rider dashboard' }} />
      <Stack.Screen name="order-details" options={{ title: 'Delivery details' }} />
      <Stack.Screen name="profile" options={{ title: 'Rider profile' }} />
    </Stack>
  );
}
