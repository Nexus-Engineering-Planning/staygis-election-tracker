import z from "zod";
import { ApiResponseData } from ".";
import {
  forgotPasswordFormSchema,
  adminLoginFormSchema,
  signupFormSchema,
  verificationFormSchema,
  submitterSignupFormSchema,
} from "../constants";
import { UserResponseDto } from "./user-types";

// Signup types
export type SignupRequestDto = z.infer<typeof signupFormSchema>;

export type SubmitterSignupRequestDto = z.infer<
  typeof submitterSignupFormSchema
>;

export type SubmitterSignupResponseDto = UserResponseDto;

export type SubmitterSignupResponse =
  ApiResponseData<SubmitterSignupResponseDto>;

// Login types
export type AdminLoginRequestDto = z.infer<typeof adminLoginFormSchema>;

export type AdminLoginResponseDto = {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
};

export type AdminLoginResponse = ApiResponseData<AdminLoginResponseDto>;

// Refresh token types
export type RefreshTokenRequestDto = {
  token: string;
};

export type RefreshTokenResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = ApiResponseData<RefreshTokenResponseDto>;

// Forgot password types
export type ForgotPasswordRequestDto = z.infer<typeof forgotPasswordFormSchema>;

export type VerificationRequestDto = z.infer<typeof verificationFormSchema>;
