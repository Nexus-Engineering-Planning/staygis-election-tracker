// import { unauthorized } from "next/navigation";

import { AxiosRequestConfig } from "axios";

export type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
  _retry?: boolean;
};

enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}
export type ApiMeta = {
  page: number;
  total: number;
  pages: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ApiResponseData<T> = {
  message: string;
  data?: T;
  meta?: ApiMeta;
  statusCode?: StatusCodes;
  path?: string;
  timestamp?: string;
};

export type UploadApiResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image" | "video" | "raw" | "auto";
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
};
