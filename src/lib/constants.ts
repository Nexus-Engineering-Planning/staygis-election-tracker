import { QueryClient } from "@tanstack/react-query";
import z from "zod";

export const emailPattern =
  /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com|protonmail\.com|zoho\.com|mail\.com|gmx\.com|tutanota\.com|fastmail\.com|startmail\.com|posteo\.de|hey\.com|secureemail\.com|tiscali\.com|rediffmail\.com|cox\.net|excite\.com|bluemail\.me)$/;

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-])[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;
export const passwordText =
  "Password must be 8-64 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character";

export const otpPattern = /^\d{6}$/;

export const loginFormSchema = z.object({
  email: z.string("Email is required.").regex(emailPattern, {
    message: "Email must be a valid email address.",
  }),
  password: z.string("Password is required.").regex(passwordPattern, {
    message: passwordText,
  }),
});

export const signupFormSchema = loginFormSchema;

export const forgotPasswordFormSchema = loginFormSchema.pick({
  email: true,
});

export const verificationFormSchema = forgotPasswordFormSchema.extend({
  otp: z.string("OTP is required").regex(otpPattern, {
    message: "OTP must be a length of 6",
  }),
});

export const queryClient = new QueryClient();
