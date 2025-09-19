import { getAllElectionTypesApi } from "@/apis/election-geography/election-type-apis";

const getAllElectionTypesServices = async () => {
  const res = await getAllElectionTypesApi();
  return res.data.data;
};

export { getAllElectionTypesServices };
