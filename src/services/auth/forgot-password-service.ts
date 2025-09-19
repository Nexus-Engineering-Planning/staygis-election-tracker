import forgotPasswordApi from "@/apis/auth/forgot-password-api";
import { ForgotPasswordRequestDto } from "@/lib/types/auth-types";

const forgotPasswordService = async (values: ForgotPasswordRequestDto) => {
  const res = await forgotPasswordApi(values);
  return res;
};

export default forgotPasswordService;
