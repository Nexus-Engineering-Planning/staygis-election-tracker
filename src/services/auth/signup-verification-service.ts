import signupVerificationApi from "@/apis/auth/signup-verification-api";
import { VerificationRequestDto } from "@/lib/types/auth-types";

const signupVerificationService = async (values: VerificationRequestDto) => {
  const res = await signupVerificationApi(values);
  return res;
};

export default signupVerificationService;
