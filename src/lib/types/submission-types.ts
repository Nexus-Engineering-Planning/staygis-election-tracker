import z from "zod";
import { submissionFormSchema } from "../constants";
import {
  LGAResponseDto,
  PoliticalPartyResponseDto,
  PollingUnitResponseDto,
  StateResponseDto,
  WardResponseDto,
} from "./election-geography-types";
import { ApiResponseData } from ".";

export type SubmissionRequestDto = z.infer<typeof submissionFormSchema>;

export type SubmissionEvidenceResponseDto = {
  id: string;
  public_id: string;
  public_url: string;
  submissionId: string;
  createdAt: string;
  updatedAt: string;
};

export type SubmissionPartyResultResponseDto = {
  id: string;
  electionSubmissionId: string;
  politicalPartyId: string;
  totalvotes: number;
  createdAt: string;
  updatedAt: string;
  politicalParty: PoliticalPartyResponseDto;
};

export type SubmissionResponseDto = {
  id: string;
  atproto_uri: string | null;
  submitterId: string;
  pollingUnitId: string;
  wardId: string;
  lgaId: string;
  stateId: string;
  electionTypeId: string;
  createdAt: string;
  updatedAt: string;
  state: StateResponseDto;
  lga: LGAResponseDto;
  ward: WardResponseDto;
  pollingUnit: PollingUnitResponseDto;
  envidence: SubmissionEvidenceResponseDto;
  partyResults: SubmissionPartyResultResponseDto[];
};

export type GetAllSubmissionsResponse = ApiResponseData<
  SubmissionResponseDto[]
>;
