import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import { GetAllPoliticalPartiesResponse } from "@/lib/types/election-geography-types";
import { AxiosResponse } from "axios";

const getAllPoliticalPartiesApi = async (
  search: string,
  page: number,
  limit: number = 20
): Promise<AxiosResponse<GetAllPoliticalPartiesResponse>> => {
  const url = `/political-parties?page=${page}&limit=${limit}&query=${encodeURIComponent(
    search
  )}`;
  return GATEWAY_ENDPOINT_PUBLIC.get<
    GetAllPoliticalPartiesResponse,
    AxiosResponse<GetAllPoliticalPartiesResponse>
  >(url);
};

export { getAllPoliticalPartiesApi };
