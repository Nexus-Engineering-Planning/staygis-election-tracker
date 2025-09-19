import { ApiResponseData } from ".";

export enum ElectionGeographyStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type StateResponseDto = {
  id: string;
  s_name: string;
  createdAt: string;
  updatedAt: string;
};

export type LGAResponseDto = {
  id: string;
  name: string;
  abbreviation: string;
  state_id: string;
  createdAt: string;
  updatedAt: string;
};

export type WardResponseDto = {
  id: string;
  name: string;
  lga_id: string;
  ward_status: ElectionGeographyStatus;
  createdAt: string;
  updatedAt: string;
};

export type PollingUnitResponseDto = {
  id: string;
  name: string;
  ward_id: string;
  state_id: string;
  lga_id: string;
  registration_area_id: string;
  abbreviation: string;
  delimitation: string;
  unit: string;
  remark: string;
  status: ElectionGeographyStatus;
  createdAt: string;
  updatedAt: string;
  ward?: WardResponseDto;
  lga?: LGAResponseDto;
  state?: StateResponseDto;
};

export type GetAllPollingUnitsResponse = ApiResponseData<
  PollingUnitResponseDto[]
>;
export type GetSinglePollingUnitResponse =
  ApiResponseData<PollingUnitResponseDto>;

export type PoliticalPartyResponseDto = {
  id: string;
  name: string;
  acronym: string;
  slug: string;
  url: string;
  partyLogo: string;
  nationalChairman: string;
  nationalSecretary: string;
  nationalTreasurer: string;
  nationalFinancialSecretary: string;
  nationalLegalAdviser: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllPoliticalPartiesResponse = ApiResponseData<
  PoliticalPartyResponseDto[]
>;

export enum ElectionCategory {
  FEDERAL = "FEDERAL",
  STATE = "STATE",
  LOCAL = "LOCAL",
  FEDERAL_OR_STATE = "FEDERAL_OR_STATE",
}

export type ElectionTypeResponseDto = {
  id: string;
  name: string;
  code: string;
  electionTypeId: string | null;
  electionCategory: ElectionCategory;
  isGeneralElection: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetAllElectionTypesResponse = ApiResponseData<
  ElectionTypeResponseDto[]
>;
