import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Full name is required.'),
  phone: z.string().min(8, 'Phone number is required.'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
});

export const otpVerificationSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  token: z.string().min(6, 'Enter the verification code.'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type OtpVerificationInput = z.infer<typeof otpVerificationSchema>;
