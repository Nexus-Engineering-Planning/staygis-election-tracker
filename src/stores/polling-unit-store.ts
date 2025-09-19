import { PollingUnitResponseDto } from "@/lib/types/election-geography-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PollingUnitStoreActions = {
  setPollingUnits: (pollingUnits: PollingUnitResponseDto[]) => void;
  setPollingUnitDetails: (pollingUnitDetails: PollingUnitResponseDto) => void;
  clearPollingUnits: () => void;
  clearPollingUnitDetails: () => void;
};

type PollingUnitStoreState = {
  pollingUnits: PollingUnitResponseDto[] | null;
  pollingUnitDetails: PollingUnitResponseDto | null;
  actions: PollingUnitStoreActions;
};

const usePollingUnitStore = create<PollingUnitStoreState>()(
  persist(
    (set) => ({
      pollingUnits: null,
      pollingUnitDetails: null,
      actions: {
        setPollingUnits: (pollingUnits) => set({ pollingUnits }),
        setPollingUnitDetails: (pollingUnitDetails) =>
          set({ pollingUnitDetails }),
        clearPollingUnits: () => set({ pollingUnits: null }),
        clearPollingUnitDetails: () => set({ pollingUnitDetails: null }),
      },
    }),
    {
      name: "polling-unit-storage",
      partialize: (state) => ({
        pollingUnits: state.pollingUnits,
        pollingUnitDetails: state.pollingUnitDetails,
      }),
    }
  )
);

const usePollingUnits = () =>
  usePollingUnitStore((state) => state.pollingUnits);
const usePollingUnitDetails = () =>
  usePollingUnitStore((state) => state.pollingUnits);
const usePollingUnitActions = () =>
  usePollingUnitStore((state) => state.actions);

export { usePollingUnits, usePollingUnitDetails, usePollingUnitActions };
