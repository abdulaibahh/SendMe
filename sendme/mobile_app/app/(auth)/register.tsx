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
import { registerSchema, type RegisterInput } from '../../src/core/validation/auth.schema';
import { getHomeForRole } from '../../src/features/auth/role-routing';
import { getAuthErrorMessage, registerCustomer } from '../../src/services/auth.service';
import { useAuthStore } from '../../src/store/auth.store';

type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

export default function RegisterScreen() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [form, setForm] = useState<RegisterInput>({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitError(null);
    setSuccessMessage(null);
    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [
            issue.path[0] as keyof RegisterInput,
            issue.message,
          ]),
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
      const result = await registerCustomer(parsed.data);

      if (result.needsVerification) {
        setSuccessMessage('Check your email for the verification code, then return to sign in.');
        return;
      }

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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Customer signup creates a customer account only.</Text>
      </View>

      {submitError ? <ErrorState title="Signup failed" message={submitError} /> : null}
      {successMessage ? (
        <SurfaceCard>
          <Text selectable style={styles.success}>
            {successMessage}
          </Text>
          <Link href="/otp-verification" asChild>
            <AppButton label="Enter verification code" variant="secondary" />
          </Link>
        </SurfaceCard>
      ) : null}

      <SurfaceCard>
        <AppInput
          autoComplete="name"
          error={fieldErrors.fullName}
          label="Full name"
          onChangeText={(fullName) => setForm((current) => ({ ...current, fullName }))}
          value={form.fullName}
        />
        <AppInput
          autoComplete="tel"
          error={fieldErrors.phone}
          keyboardType="phone-pad"
          label="Phone"
          onChangeText={(phone) => setForm((current) => ({ ...current, phone }))}
          value={form.phone}
        />
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
          autoComplete="new-password"
          error={fieldErrors.password}
          label="Password"
          onChangeText={(password) => setForm((current) => ({ ...current, password }))}
          secureTextEntry
          value={form.password}
        />
        <AppButton label="Create customer account" isLoading={isSubmitting} onPress={handleSubmit} />
      </SurfaceCard>

      <Link href="/login" style={styles.link}>
        Already have an account?
      </Link>
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
  success: {
    ...textStyle('body', theme.colors.success),
  },
  link: {
    ...textStyle('bodyStrong', theme.colors.deepGreen),
    textAlign: 'center',
  },
});
