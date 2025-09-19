import { getAllElectionTypesServices } from "@/services/election-geography/election-type-services";
import { useQuery } from "@tanstack/react-query";

const useElectionType = () => {
  const useGetAllElectionTypes = () => {
    return useQuery({
      queryKey: ["election-types"],
      queryFn: async () => await getAllElectionTypesServices(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  return { useGetAllElectionTypes };
};

export default useElectionType;
