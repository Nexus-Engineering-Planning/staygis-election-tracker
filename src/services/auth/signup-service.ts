import { signupApi, submitterSignupApi } from "@/apis/auth/signup-apis";
import {
  SignupRequestDto,
  SubmitterSignupRequestDto,
} from "@/lib/types/auth-types";

const signupService = async (values: SignupRequestDto) => {
  const res = await signupApi(values);
  return res;
};

const submitterSignupService = async (values: SubmitterSignupRequestDto) => {
  const res = await submitterSignupApi(values);
  return res.data.data;
};

export { signupService, submitterSignupService };
