import z from "zod";
import type {
  forgotPasswordFormSchema,
  forgotPasswordVerificationFormSchema,
  loginFormSchema,
  signupFormSchema,
} from "./constants";

export type SignupFormData = z.infer<typeof signupFormSchema>;

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export type VerificationFormData = z.infer<
  typeof verificationFormSchema
>;
