import { QueryClient } from "@tanstack/react-query";
import z from "zod";

export const emailPattern =
  /^[a-zA-Z0-9._%+-]+@(staygis\.com|gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com|protonmail\.com|zoho\.com|mail\.com|gmx\.com|tutanota\.com|fastmail\.com|startmail\.com|posteo\.de|hey\.com|secureemail\.com|tiscali\.com|rediffmail\.com|cox\.net|excite\.com|bluemail\.me)$/;

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-])[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;
export const passwordText =
  "Password must be 8-64 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character";

export const otpPattern = /^\d{6}$/;

export const adminLoginFormSchema = z.object({
  email: z.string("Email is required.").regex(emailPattern, {
    message: "Email must be a valid email address.",
  }),
  password: z.string("Password is required.").regex(passwordPattern, {
    message: passwordText,
  }),
});

export const signupFormSchema = adminLoginFormSchema;

export const submitterSignupFormSchema = adminLoginFormSchema.extend({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),
});

export const forgotPasswordFormSchema = adminLoginFormSchema.pick({
  email: true,
});

export const verificationFormSchema = forgotPasswordFormSchema.extend({
  otp: z.string("OTP is required").regex(otpPattern, {
    message: "OTP must be a length of 6",
  }),
});

export const submissionFormSchema = z.object({
  electionTypeId: z.uuid("Invalid electionTypeId"),
  pollingUnitId: z.string("pollingUnitId is required"),
  electionResults: z
    .array(
      z.object({
        politcalPartyId: z.uuid("Invalid politicalPartyId"),
        totalvotes: z
          .number("Total votes are required")
          .int("Votes must be an integer")
          .nonnegative("Votes cannot be negative"),
      })
    )
    .min(19, "At least one election result must be provided"),
  envidence: z.object({
    public_id: z.string("public_id is required"),
    public_url: z.url("public_url must be a valid URL"),
  }),
  report: z.string().optional(),
});

export const queryClient = new QueryClient();
