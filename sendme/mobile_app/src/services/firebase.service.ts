import { env } from '../core/config/env';

export function getFirebaseSetupStatus() {
  return {
    hasApiKey: Boolean(env.firebaseApiKey),
    hasProjectId: Boolean(env.firebaseProjectId),
    hasAppId: Boolean(env.firebaseAppId),
  };
}
