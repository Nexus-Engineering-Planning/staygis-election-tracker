import {
  getAllPollingUnitsService,
  getSinglePollingUnitService,
} from "@/services/election-geography/polling-unit-services";
import { useQuery } from "@tanstack/react-query";

const usePollingUnit = () => {
  const useGetAllPollingUnits = (
    search: string,
    page: number,
    limit?: number
  ) => {
    return useQuery({
      queryKey: ["polling-units", search],
      queryFn: async () => await getAllPollingUnitsService(search, page, limit),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useGetSinglePollingUnit = (id: string) => {
    return useQuery({
      queryKey: ["polling-unit", id],
      queryFn: async () => await getSinglePollingUnitService(id),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return { useGetAllPollingUnits, useGetSinglePollingUnit };
};
export default usePollingUnit;
