import {
  createSubmitterSubmissionApi,
  getAllSubmitterSubmissionsApi,
} from "@/apis/submissions/submitter-submission-apis";
import { SubmissionRequestDto } from "@/lib/types/submission-types";

const createSubmitterSubmissionService = async (
  values: SubmissionRequestDto
) => {
  const res = await createSubmitterSubmissionApi(values);
  return res.data.data;
};

const getAllSubmitterSubmissionsService = async (
  page: number,
  limit?: number
) => {
  const res = await getAllSubmitterSubmissionsApi(page, limit);
  return res.data.data;
};

export { createSubmitterSubmissionService, getAllSubmitterSubmissionsService };
