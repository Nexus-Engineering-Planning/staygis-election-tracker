import { AxiosResponse } from "axios";
import { GATEWAY_ENDPOINT_PUBLIC } from "../base-setup";
import { GetAllElectionTypesResponse } from "@/lib/types/election-geography-types";

const getAllElectionTypesApi = async (): Promise<
  AxiosResponse<GetAllElectionTypesResponse>
> => {
  return GATEWAY_ENDPOINT_PUBLIC.get<
    GetAllElectionTypesResponse,
    AxiosResponse<GetAllElectionTypesResponse>
  >("/public/election-types");
};

export { getAllElectionTypesApi };
