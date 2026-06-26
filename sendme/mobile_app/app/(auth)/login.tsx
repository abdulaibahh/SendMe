import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../src/components/AppButton';
import { AppInput } from '../../src/components/AppInput';
import { ErrorState } from '../../src/components/ErrorState';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { SurfaceCard } from '../../src/components/SurfaceCard';
import { env } from '../../src/core/config/env';
import { theme } from '../../src/core/theme';
import { textStyle } from '../../src/core/theme/styles';
import { loginSchema, type LoginInput } from '../../src/core/validation/auth.schema';
import { getHomeForRole } from '../../src/features/auth/role-routing';
import { getAuthErrorMessage, login } from '../../src/services/auth.service';
import { useAuthStore } from '../../src/store/auth.store';

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

export default function LoginScreen() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [form, setForm] = useState<LoginInput>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitError(null);
    const parsed = loginSchema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [issue.path[0] as keyof LoginInput, issue.message]),
        ),
      );
      return;
    }

    if (!env.isSupabaseConfigured) {
      setSubmitError('Supabase is not configured. Add the public URL and anon key first.');
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await login(parsed.data);
      if (result.session && result.profile) {
        setAuthenticated(result.session, result.profile);
        router.replace(getHomeForRole(result.profile.role));
      }
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Use your SendMe customer, rider, or admin account.</Text>
      </View>

      {submitError ? <ErrorState title="Login failed" message={submitError} /> : null}

      <SurfaceCard>
        <AppInput
          autoCapitalize="none"
          autoComplete="email"
          error={fieldErrors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={(email) => setForm((current) => ({ ...current, email }))}
          value={form.email}
        />
        <AppInput
          autoCapitalize="none"
          autoComplete="password"
          error={fieldErrors.password}
          label="Password"
          onChangeText={(password) => setForm((current) => ({ ...current, password }))}
          secureTextEntry
          value={form.password}
        />
        <AppButton label="Sign in" isLoading={isSubmitting} onPress={handleSubmit} />
      </SurfaceCard>

      <View style={styles.links}>
        <Link href="/forgot-password" style={styles.link}>
          Forgot password?
        </Link>
        <Link href="/register" style={styles.link}>
          Create customer account
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.sm,
  },
  title: {
    ...textStyle('title', theme.colors.deepGreen),
  },
  subtitle: {
    ...textStyle('body', theme.colors.textMuted),
  },
  links: {
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  link: {
    ...textStyle('bodyStrong', theme.colors.deepGreen),
  },
});
