import * as Notifications from 'expo-notifications';

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();

  if (current.granted) {
    return current;
  }

  return Notifications.requestPermissionsAsync();
}

export async function getExpoPushToken() {
  const permissions = await requestNotificationPermission();

  if (!permissions.granted) {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}
