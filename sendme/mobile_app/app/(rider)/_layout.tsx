import Stack from 'expo-router/stack';

export default function RiderLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ title: 'Rider dashboard' }} />
      <Stack.Screen name="order-details" options={{ title: 'Delivery details' }} />
      <Stack.Screen name="profile" options={{ title: 'Rider profile' }} />
    </Stack>
  );
}
