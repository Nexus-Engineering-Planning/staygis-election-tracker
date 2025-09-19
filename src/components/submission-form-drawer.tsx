"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  useOpenedDrawer,
  useDrawerActions,
  DrawerId,
} from "@/stores/drawer-manager-store";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submissionFormSchema } from "@/lib/constants";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import Autocomplete from "./ui/autocomplete";
import usePollingUnit from "@/lib/hooks/election-geography/use-polling-unit";
import { Textarea } from "./ui/textarea";
import FileUploader from "./file-uploader";
import useElectionType from "@/lib/hooks/election-geography/use-election-type";
import usePoliticalParty from "@/lib/hooks/election-geography/use-political-party";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { displayFormErrors } from "@/lib/utils";
import useSubmitterSubmission from "@/lib/hooks/submissions/use-submitter-submission";
import { SubmissionRequestDto } from "@/lib/types/submission-types";

// type Party = {
//   id: string;
//   name: string;
//   logo: string; // image URL
// };

const SubmissionFormDrawer = () => {
  const id = DrawerId.SUBMISSION_FORM_DRAWER;
  const openedDrawer = useOpenedDrawer();
  const { openDrawer, closeDrawer } = useDrawerActions();

  const { useGetAllElectionTypes } = useElectionType();
  const { useGetAllPollingUnits } = usePollingUnit();
  const { useGetAllPoliticalParties } = usePoliticalParty();
  const { useCreateSubmitterSubmission } = useSubmitterSubmission();

  const isOpened = useMemo(() => openedDrawer === id, [openedDrawer, id]);
  const [pollingUnitQueryParamValue, setPollingUnitQueryParamValue] =
    useState("");

  const { data: electionTypes } = useGetAllElectionTypes();
  const mappedElectionTypesOptions = useMemo(() => {
    return (
      electionTypes?.map((et) => ({
        value: et.id,
        label: et.name,
      })) ?? []
    );
  }, [electionTypes]);

  const { data: pollingUnits, isLoading: isLoadingPollingUnits } =
    useGetAllPollingUnits(pollingUnitQueryParamValue, 1);

  const handleAutoCompleteSearch = (value: string) => {
    setPollingUnitQueryParamValue(value);
  };

  const mappedAutocompletePollingUnitOptions = useMemo(() => {
    return (
      pollingUnits?.map((pu) => ({
        value: pu.id,
        label: pu.name,
      })) ?? []
    );
  }, [pollingUnits]);

  const { data: politicalParties } = useGetAllPoliticalParties("", 1);
  const mappedPoliticalPartyOptions = useMemo(() => {
    return (
      politicalParties?.map((pp) => ({
        id: pp.id,
        name: pp.acronym,
        logo: pp.partyLogo || "/logos/placeholder.png",
      })) ?? []
    );
  }, [politicalParties]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmissionRequestDto>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      electionTypeId: "",
      pollingUnitId: "",
      electionResults: [],
      envidence: {
        public_id: "",
        public_url: "",
      },
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: "electionResults",
  });

  const { mutateAsync: createSubmitterSubmission, isPending: isSubmissionLoading } =
    useCreateSubmitterSubmission();

  // Reset electionResults when parties are fetched
  useEffect(() => {
    if (mappedPoliticalPartyOptions.length > 0) {
      reset((prev) => ({
        ...prev,
        electionResults: mappedPoliticalPartyOptions.map((pp) => ({
          politcalPartyId: pp.id,
          totalvotes: 0,
        })),
      }));
    }
  }, [mappedPoliticalPartyOptions, reset]);

  const handleOnOpenChange = (open: boolean) => {
    if (!open) closeDrawer();
    else openDrawer(id);
  };

  const onSubmitHandler: SubmitHandler<SubmissionRequestDto> = async (values) => {
    console.log(values);
    await createSubmitterSubmission(values, {
      onSuccess: () => {
        reset((prev) => ({
          ...prev,
          electionResults: mappedPoliticalPartyOptions.map((pp) => ({
            politcalPartyId: pp.id,
            totalvotes: 0,
          })),
        }));
      },
    });
  };

  useEffect(() => {
    displayFormErrors(errors);
  }, [errors]);

  return (
    <Drawer open={isOpened} onOpenChange={handleOnOpenChange} direction="right">
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerPortal container={document.body}>
        <DrawerContent className="w-full !max-w-lg ">
          <div className="mx-auto w-full overflow-y-auto max-h-full">
            <DrawerHeader>
              <DrawerTitle>Election Result Submission</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col gap-6">
                  {/* Election Type */}
                  <Controller
                    name="electionTypeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="grid gap-3">
                        <Label className="text-xs font-semibold">
                          Select Election Type
                        </Label>
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select election type" />
                          </SelectTrigger>
                          <SelectContent>
                            {mappedElectionTypesOptions.map(
                              ({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />

                  {/* Polling Unit */}
                  <Controller
                    name="pollingUnitId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="grid gap-3">
                        <Label className="text-xs font-semibold">
                          Select Polling Unit
                        </Label>
                        <Autocomplete
                          options={mappedAutocompletePollingUnitOptions}
                          isLoading={isLoadingPollingUnits}
                          value={value}
                          onSelect={onChange}
                          onSearch={handleAutoCompleteSearch}
                        />
                      </div>
                    )}
                  />

                  {/* Votes per party */}
                  <div className="grid grid-cols-2 gap-4">
                    {fields.map((field, index) => {
                      const party = mappedPoliticalPartyOptions[index];
                      return (
                        <div
                          key={field.id}
                          className="flex items-center justify-between border px-3 py-0.5 rounded-md"
                        >
                          <span className="text-xs font-medium">
                            {party?.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() =>
                                update(index, {
                                  ...field,
                                  totalvotes: Math.max(0, field.totalvotes - 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <Controller
                              name={`electionResults.${index}.totalvotes`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="number"
                                  className="h-7.5 w-12 text-xs text-center"
                                  value={field.value ?? 0}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() =>
                                update(index, {
                                  ...field,
                                  totalvotes: field.totalvotes + 1,
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Evidence */}
                  <Controller
                    name="envidence"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <Label className="text-xs font-semibold">
                          Upload photo evidence
                        </Label>
                        <FileUploader
                          onUploadSuccess={(data) => field.onChange(data)}
                        />
                        <small className="text-xs">
                          Upload a clear photo of the official tally sheet (Form
                          EC8A) or other evidence.
                        </small>
                      </div>
                    )}
                  />

                  {/* Report */}
                  <Controller
                    name="report"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-3">
                        <Label className="text-xs font-semibold">
                          Report other election conditions
                        </Label>
                        <Textarea
                          placeholder="E.g. vandalism, disruptions..."
                          className="resize-none"
                          {...field}
                        />
                      </div>
                    )}
                  />

                  <Button
                    disabled={isSubmissionLoading}
                    type="submit"
                    className="w-full"
                  >
                    {isSubmissionLoading ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default SubmissionFormDrawer;
