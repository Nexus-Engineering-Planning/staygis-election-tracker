import { AxiosResponse } from "axios";
import { CLOUDINARY_GATEWAY_ENDPOINT } from "./base-setup";
import { UploadApiResponse } from "@/lib/types";

const fileUploadApi = async (
  data: FormData
): Promise<AxiosResponse<UploadApiResponse>> => {
  return await CLOUDINARY_GATEWAY_ENDPOINT.post<
    UploadApiResponse,
    AxiosResponse<UploadApiResponse>,
    FormData
  >("/image/upload", data);
};

export default fileUploadApi;
