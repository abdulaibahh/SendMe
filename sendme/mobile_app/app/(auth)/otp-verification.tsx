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
import {
  otpVerificationSchema,
  type OtpVerificationInput,
} from '../../src/core/validation/auth.schema';
import { getHomeForRole } from '../../src/features/auth/role-routing';
import { getAuthErrorMessage, verifySignupOtp } from '../../src/services/auth.service';
import { useAuthStore } from '../../src/store/auth.store';

type FieldErrors = Partial<Record<keyof OtpVerificationInput, string>>;

export default function OtpVerificationScreen() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [form, setForm] = useState<OtpVerificationInput>({ email: '', token: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitError(null);
    setSuccessMessage(null);
    const parsed = otpVerificationSchema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [
            issue.path[0] as keyof OtpVerificationInput,
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
      const result = await verifySignupOtp(parsed.data.email, parsed.data.token);
      if (result.session && result.profile) {
        setAuthenticated(result.session, result.profile);
        router.replace(getHomeForRole(result.profile.role));
        return;
      }

      setSuccessMessage('Verification accepted. You can now sign in.');
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>Enter the code sent by Supabase Auth.</Text>
      </View>

      {submitError ? <ErrorState title="Verification failed" message={submitError} /> : null}

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
          error={fieldErrors.token}
          keyboardType="number-pad"
          label="Verification code"
          onChangeText={(token) => setForm((current) => ({ ...current, token }))}
          value={form.token}
        />
        <AppButton label="Verify account" isLoading={isSubmitting} onPress={handleSubmit} />
        {successMessage ? (
          <Text selectable style={styles.success}>
            {successMessage}
          </Text>
        ) : null}
      </SurfaceCard>

      <Link href="/login" style={styles.link}>
        Back to sign in
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
