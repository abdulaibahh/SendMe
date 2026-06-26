import Stack from 'expo-router/stack';

import { sendMeStackScreenOptions } from '../../src/core/theme/navigation';

export default function AdminLayout() {
  return (
    <Stack screenOptions={sendMeStackScreenOptions}>
      <Stack.Screen name="dashboard" options={{ title: 'Admin dashboard' }} />
      <Stack.Screen name="orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="order-details" options={{ title: 'Order details' }} />
      <Stack.Screen name="products" options={{ title: 'Products' }} />
      <Stack.Screen name="product-form" options={{ title: 'Product form' }} />
      <Stack.Screen name="categories" options={{ title: 'Categories' }} />
      <Stack.Screen name="customers" options={{ title: 'Customers' }} />
      <Stack.Screen name="riders" options={{ title: 'Riders' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
      <Stack.Screen name="audit-logs" options={{ title: 'Audit logs' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
