import { getAllPoliticalPartiesService } from "@/services/election-geography/political-party-services";
import { useQuery } from "@tanstack/react-query";

const usePoliticalParty = () => {
  const useGetAllPoliticalParties = (
    search: string,
    page: number,
    limit?: number
  ) => {
    return useQuery({
      queryKey: ["pollitical-parties", search, page],
      queryFn: async () =>
        await getAllPoliticalPartiesService(search, page, limit),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return { useGetAllPoliticalParties };
};
export default usePoliticalParty;
