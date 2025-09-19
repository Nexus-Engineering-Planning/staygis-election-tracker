import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import {
  GetAllPollingUnitsResponse,
  GetSinglePollingUnitResponse,
} from "@/lib/types/election-geography-types";
import { AxiosResponse } from "axios";

const getAllPollingUnitsApi = async (
  search: string,
  page: number,
  limit: number = 10
): Promise<AxiosResponse<GetAllPollingUnitsResponse>> => {
  const url = `/polling-units?page=${page}&limit=${limit}&query=${encodeURIComponent(
    search
  )}`;
  return GATEWAY_ENDPOINT_PUBLIC.get<
    GetAllPollingUnitsResponse,
    AxiosResponse<GetAllPollingUnitsResponse>
  >(url);
};

const getSinglePollingUnitApi = async (
  id: string
): Promise<AxiosResponse<GetSinglePollingUnitResponse>> => {
  const url = `/polling-units?id=${id}`;
  return GATEWAY_ENDPOINT_PUBLIC.get<
    GetSinglePollingUnitResponse,
    AxiosResponse<GetSinglePollingUnitResponse>
  >(url);
};

export { getAllPollingUnitsApi, getSinglePollingUnitApi };
