import Stack from 'expo-router/stack';

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="products" options={{ title: 'Products' }} />
      <Stack.Screen name="product-details" options={{ title: 'Product details' }} />
      <Stack.Screen name="cart" options={{ title: 'Cart' }} />
      <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
      <Stack.Screen name="payment-instructions" options={{ title: 'Payment instructions' }} />
      <Stack.Screen name="orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="order-tracking" options={{ title: 'Order tracking' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="addresses" options={{ title: 'Addresses' }} />
    </Stack>
  );
}
