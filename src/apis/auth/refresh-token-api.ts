import {
  RefreshTokenRequestDto,
  RefreshTokenResponse,
} from "@/lib/types/auth-types";
import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import { AxiosResponse } from "axios";

const refreshTokenApi = async (
  data: RefreshTokenRequestDto
): Promise<AxiosResponse<RefreshTokenResponse>> => {
  const url = "/auth/refresh-token";
  return GATEWAY_ENDPOINT_PUBLIC.post<
    RefreshTokenResponse,
    AxiosResponse<RefreshTokenResponse>,
    RefreshTokenRequestDto
  >(url, data);
};

export default refreshTokenApi;
