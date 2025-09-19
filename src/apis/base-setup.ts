import { onResponse, onResponseError } from "@/lib/utils/http.utils";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/$/, "");
const API_PREFIX = "/api/v1";
const $GATEWAY_ENDPOINT = BASE_URL ? `${BASE_URL}${API_PREFIX}` : "";

const CLOUDINARY_URL = (process.env.NEXT_PUBLIC_CLOUDINARY_URL || "").replace(
  /\/$/,
  ""
);
const CLOUDINARY_API_PREFIX = "/v1_1";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
const $CLOUDINARY_GATEWAY_ENDPOINT =
  CLOUDINARY_URL && CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET
    ? `${CLOUDINARY_URL}${CLOUDINARY_API_PREFIX}/${CLOUDINARY_CLOUD_NAME}`
    : "";

if (!BASE_URL && typeof window !== "undefined") {
  console.warn("NEXT_PUBLIC_BASE_URL is not set. Requests will likely fail.");
}

if (
  !CLOUDINARY_URL &&
  !CLOUDINARY_CLOUD_NAME &&
  typeof window !== "undefined"
) {
  console.warn(
    "NEXT_PUBLIC_CLOUDINARY_URL is not set. Image upload requests will likely fail."
  );
}

const defaultConfig: AxiosRequestConfig = {
  baseURL: $GATEWAY_ENDPOINT,
  //   withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const defaultCloundinaryConfig: AxiosRequestConfig = {
  baseURL: $CLOUDINARY_GATEWAY_ENDPOINT,
  //   withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

export const GATEWAY_ENDPOINT_PUBLIC = axios.create({ ...defaultConfig });

export const GATEWAY_ENDPOINT_AUTHENTICATED = axios.create({
  ...defaultConfig,
});

export const CLOUDINARY_GATEWAY_ENDPOINT = axios.create({
  ...defaultCloundinaryConfig,
});

const axiosInstances = [
  {
    instance: GATEWAY_ENDPOINT_PUBLIC,
    isAuth: false,
  },
  {
    instance: GATEWAY_ENDPOINT_AUTHENTICATED,
    isAuth: true,
  },
  {
    instance: CLOUDINARY_GATEWAY_ENDPOINT,
    isAuth: false,
  },
];

GATEWAY_ENDPOINT_AUTHENTICATED.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem("session-storage")
        : null;
    let session: { accessToken?: string } | null = null;
    if (raw) {
      try {
        session = JSON.parse(raw).state?.session || null;
      } catch {
        session = null;
      }
    }

    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  }
);

axiosInstances.forEach(({ instance, isAuth }) => {
  instance.interceptors.response.use(onResponse, onResponseError(isAuth));
});

// GATEWAY_ENDPOINT_AUTHENTICATED.interceptors.response.use(onResponse);
