import {
  getAllPollingUnitsApi,
  getSinglePollingUnitApi,
} from "@/apis/election-geography/polling-unit-apis";

const getAllPollingUnitsService = async (
  search: string,
  page: number,
  limit?: number
) => {
  const res = await getAllPollingUnitsApi(search, page, limit);
  return res.data.data;
};

const getSinglePollingUnitService = async (id: string) => {
  const res = await getSinglePollingUnitApi(id);
  return res.data.data;
};

export { getAllPollingUnitsService, getSinglePollingUnitService };
