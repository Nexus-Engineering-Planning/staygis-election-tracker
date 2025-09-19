import { GATEWAY_ENDPOINT_AUTHENTICATED } from "../base-setup";
import { GetAllPollingUnitsResponse } from "@/lib/types/election-geography-types";
import {
  GetAllSubmissionsResponse,
  SubmissionRequestDto,
} from "@/lib/types/submission-types";
import { AxiosResponse } from "axios";

const createSubmitterSubmissionApi = async (
  data: SubmissionRequestDto
): Promise<AxiosResponse<GetAllPollingUnitsResponse>> => {
  const url = "/submissions";
  return GATEWAY_ENDPOINT_AUTHENTICATED.post<
    GetAllPollingUnitsResponse,
    AxiosResponse<GetAllPollingUnitsResponse>,
    SubmissionRequestDto
  >(url, data);
};

const getAllSubmitterSubmissionsApi = async (
  page: number,
  limit: number = 10
): Promise<AxiosResponse<GetAllSubmissionsResponse>> => {
  const url = `/submissions/my-submissions?page=${page}&limit=${limit}`;
  return GATEWAY_ENDPOINT_AUTHENTICATED.get<
    GetAllSubmissionsResponse,
    AxiosResponse<GetAllSubmissionsResponse>
  >(url);
};

export { createSubmitterSubmissionApi, getAllSubmitterSubmissionsApi };
