import { z } from 'zod';

const optionalUrl = z.union([z.string().url(), z.literal('')]);

const publicEnvSchema = z.object({
  EXPO_PUBLIC_SUPABASE_URL: optionalUrl,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  EXPO_PUBLIC_FIREBASE_API_KEY: z.string(),
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  EXPO_PUBLIC_FIREBASE_APP_ID: z.string(),
  EXPO_PUBLIC_APP_ENV: z.enum(['development', 'preview', 'production']).default('development'),
});

const rawEnv = {
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
  EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
};

const parsedEnv = publicEnvSchema.safeParse(rawEnv);

const missingConfig = Object.entries({
  EXPO_PUBLIC_SUPABASE_URL: rawEnv.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: rawEnv.EXPO_PUBLIC_SUPABASE_ANON_KEY,
}).flatMap(([key, value]) => (value ? [] : [key]));

export const env = {
  appEnv: parsedEnv.success ? parsedEnv.data.EXPO_PUBLIC_APP_ENV : 'development',
  supabaseUrl: rawEnv.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: rawEnv.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  firebaseApiKey: rawEnv.EXPO_PUBLIC_FIREBASE_API_KEY,
  firebaseProjectId: rawEnv.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  firebaseAppId: rawEnv.EXPO_PUBLIC_FIREBASE_APP_ID,
  isSupabaseConfigured:
    Boolean(rawEnv.EXPO_PUBLIC_SUPABASE_URL) && Boolean(rawEnv.EXPO_PUBLIC_SUPABASE_ANON_KEY),
  missingConfig,
  validationIssues: parsedEnv.success
    ? []
    : parsedEnv.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
} as const;
