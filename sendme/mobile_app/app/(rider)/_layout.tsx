import Stack from 'expo-router/stack';

import { sendMeStackScreenOptions } from '../../src/core/theme/navigation';
import { RoleGate } from '../../src/features/auth/role-gate';

export default function RiderLayout() {
  return (
    <RoleGate allowedRole="rider">
      <Stack screenOptions={sendMeStackScreenOptions}>
        <Stack.Screen name="dashboard" options={{ title: 'Rider dashboard' }} />
        <Stack.Screen name="order-details" options={{ title: 'Delivery details' }} />
        <Stack.Screen name="profile" options={{ title: 'Rider profile' }} />
      </Stack>
    </RoleGate>
  );
}
