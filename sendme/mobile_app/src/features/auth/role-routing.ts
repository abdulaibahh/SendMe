import type { Href } from 'expo-router';

import type { UserRole } from '../../core/types/domain';

export function getHomeForRole(role: UserRole): Href {
  if (role === 'admin') {
    return '/(admin)/dashboard';
  }

  if (role === 'rider') {
    return '/(rider)/dashboard';
  }

  return '/(customer)/home';
}
