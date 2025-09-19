import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import {
  AdminLoginRequestDto,
  AdminLoginResponse,
} from "@/lib/types/auth-types";
import { AxiosResponse } from "axios";

const adminLoginApi = async (
  data: AdminLoginRequestDto
): Promise<AxiosResponse<AdminLoginResponse>> => {
  const url = "/auth/login/admin";
  return GATEWAY_ENDPOINT_PUBLIC.post<
    AdminLoginResponse,
    AxiosResponse<AdminLoginResponse>,
    AdminLoginRequestDto
  >(url, data);
};
export default adminLoginApi;
