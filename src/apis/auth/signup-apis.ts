import {
  SignupRequestDto,
  SubmitterSignupRequestDto,
  SubmitterSignupResponse,
} from "@/lib/types/auth-types";
import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import { AxiosResponse } from "axios";

const signupApi = async (data: SignupRequestDto) => {
  return data;
};

const submitterSignupApi = async (
  data: SubmitterSignupRequestDto
): Promise<AxiosResponse<SubmitterSignupResponse>> => {
  return GATEWAY_ENDPOINT_PUBLIC.post<
    SubmitterSignupResponse,
    AxiosResponse<SubmitterSignupResponse>,
    SubmitterSignupRequestDto
  >("/auth/signup", data);
};

export { signupApi, submitterSignupApi };
