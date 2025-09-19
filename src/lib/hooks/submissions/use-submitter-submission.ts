import {
  createSubmitterSubmissionService,
  getAllSubmitterSubmissionsService,
} from "@/services/submissions/submitter-submission-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useSubmitterSubmission = () => {
  const useCreateSubmitterSubmission = () => {
    return useMutation({
      mutationFn: createSubmitterSubmissionService,
      onSuccess: () => {
        toast.success("Submission created successfully");
      },
    });
  };

  const useGetAllSubmitterSubmissions = (page: number, limit?: number) => {
    return useQuery({
      queryKey: ["submitter-submissions", page],
      queryFn: async () => await getAllSubmitterSubmissionsService(page, limit),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return {
    useCreateSubmitterSubmission,
    useGetAllSubmitterSubmissions,
  };
};
export default useSubmitterSubmission;
