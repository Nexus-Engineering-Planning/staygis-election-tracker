import refreshTokenApi from "@/apis/auth/refresh-token-api";
import { RefreshTokenRequestDto } from "@/lib/types/auth-types";

const refreshTokenService = async (values: RefreshTokenRequestDto) => {
  const res = await refreshTokenApi(values);
  return res.data.data;
};

export default refreshTokenService;
