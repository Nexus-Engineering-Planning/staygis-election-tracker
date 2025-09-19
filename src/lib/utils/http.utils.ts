import axios, { AxiosError, AxiosResponse } from "axios";
import {
  AXIOS_ERROR_CODES,
  ERROR_STATUS_CODES,
} from "../constants/http-constants";
import { toast } from "sonner";
import { ApiResponseData, AxiosRequestConfigWithRetry } from "../types";
import { GATEWAY_ENDPOINT_AUTHENTICATED } from "@/apis/base-setup";
import refreshTokenService from "@/services/auth/refresh-token-service";

const handleUnAuthenticatedError = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfigWithRetry;

  if (originalRequest._retry) {
    localStorage.clear();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  const raw =
    typeof window !== "undefined"
      ? localStorage.getItem("session-storage")
      : null;
  let session: { refreshToken?: string } | null = null;
  if (raw) {
    try {
      session = JSON.parse(raw).state?.session || null;
    } catch {
      session = null;
    }
  }

  if (!session || !session.refreshToken) {
    localStorage.clear();
    return Promise.reject(error);
  }

  try {
    // Call your refresh token endpoint directly
    const refreshRes = await refreshTokenService({
      token: session.refreshToken,
    });

    if (!refreshRes) {
      localStorage.clear();
      return Promise.reject(error);
    }

    const { accessToken, refreshToken } = refreshRes;

    // Update session in localStorage
    const newSession = { accessToken, refreshToken };
    const prev = JSON.parse(localStorage.getItem("session-storage") || "{}");
    localStorage.setItem(
      "session-storage",
      JSON.stringify({
        ...prev,
        state: { ...prev.state, session: newSession },
      })
    );

    // Retry original request with new access token
    originalRequest.headers = {
      ...originalRequest.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return GATEWAY_ENDPOINT_AUTHENTICATED(originalRequest);
  } catch (refreshError) {
    localStorage.clear();
    return Promise.reject(refreshError);
  }
};

const onResponse = (response: AxiosResponse) => response;

const onResponseError =
  (isAuth: boolean) =>
  async (error: AxiosError<ApiResponseData<undefined>>) => {
    if (axios.isAxiosError(error)) {
      const response = error.response?.data;

      if (error.code === AXIOS_ERROR_CODES.ERR_NETWORK) {
        console.error("connection problems..");
      } else if (error.code === AXIOS_ERROR_CODES.ERR_CANCELED) {
        console.error("connection canceled..");
      } else if (error.code === AXIOS_ERROR_CODES.ERR_BAD_REQUEST) {
        if (error.status === ERROR_STATUS_CODES["401"]) {
          if (isAuth) {
            toast.error(response?.message);
            return await handleUnAuthenticatedError(error);
          }
        }
      }
    }

    return Promise.reject(error);
  };

export { onResponse, onResponseError };
