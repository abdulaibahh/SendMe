import { Link } from 'expo-router';
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
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '../../src/core/validation/auth.schema';
import { getAuthErrorMessage, sendPasswordResetEmail } from '../../src/services/auth.service';

export default function ForgotPasswordScreen() {
  const [form, setForm] = useState<ForgotPasswordInput>({ email: '' });
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitError(null);
    setSuccessMessage(null);
    const parsed = forgotPasswordSchema.safeParse(form);

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message);
      return;
    }

    if (!env.isSupabaseConfigured) {
      setSubmitError('Supabase is not configured. Add the public URL and anon key first.');
      return;
    }

    setFieldError(undefined);
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(parsed.data.email);
      setSuccessMessage('Password reset email sent.');
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer centered>
      <View style={styles.header}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>Enter the email linked to your SendMe account.</Text>
      </View>

      {submitError ? <ErrorState title="Reset failed" message={submitError} /> : null}

      <SurfaceCard>
        <AppInput
          autoCapitalize="none"
          autoComplete="email"
          error={fieldError}
          keyboardType="email-address"
          label="Email"
          onChangeText={(email) => setForm({ email })}
          value={form.email}
        />
        <AppButton label="Send reset email" isLoading={isSubmitting} onPress={handleSubmit} />
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
