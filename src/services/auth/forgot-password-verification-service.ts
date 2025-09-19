import forgotPasswordVerificationApi from "@/apis/auth/forgot-password-verification-api";
import { VerificationRequestDto } from "@/lib/types/auth-types";

const forgotPasswordVerificationService = async (
  values: VerificationRequestDto
) => {
  const res = await forgotPasswordVerificationApi(values);
  return res;
};

export default forgotPasswordVerificationService;
