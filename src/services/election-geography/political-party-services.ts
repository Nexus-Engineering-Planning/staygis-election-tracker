import { getAllPoliticalPartiesApi } from "@/apis/election-geography/political-party-apis";

const getAllPoliticalPartiesService = async (
  search: string,
  page: number,
  limit?: number
) => {
  const res = await getAllPoliticalPartiesApi(search, page, limit);
  return res.data.data;
};

export { getAllPoliticalPartiesService };
