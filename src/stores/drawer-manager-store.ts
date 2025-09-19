import { create } from "zustand";

export enum DrawerId {
  SUBMISSION_FORM_DRAWER = "submission-form-drawer",
}

type DrawerActions = {
  registerDrawer: (id: DrawerId, drawer: React.ReactNode) => void;
  unregisterDrawer: (id: DrawerId) => void;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: () => void;
};

type DrawerState = {
  drawers: Record<DrawerId, React.ReactNode> | null;
  openedDrawer: DrawerId | null;
  actions: DrawerActions;
};

const useDrawerStore = create<DrawerState>((set) => ({
  drawers: null,
  openedDrawer: null,
  actions: {
    registerDrawer: (id, drawer) =>
      set((state) => ({
        drawers: { ...state.drawers, [id]: drawer },
      })),
    unregisterDrawer: (id) =>
      set((state) => {
        if (!state.drawers || !state.drawers[id]) return state;

        const previousDrawers = { ...state.drawers };

        const newDrawers = Object.keys(previousDrawers).reduce((acc, key) => {
          if (key !== id) {
            acc[key as DrawerId] = previousDrawers[key as DrawerId];
          }
          return acc;
        }, {} as Record<DrawerId, React.ReactNode>);

        if (!Object.keys(newDrawers).length) return { drawers: null };

        return { drawers: newDrawers };
      }),
    openDrawer: (id) => set({ openedDrawer: id }),
    closeDrawer: () => set({ openedDrawer: null }),
  },
}));

const useRegisteredDrawers = () => useDrawerStore((state) => state.drawers);
const useOpenedDrawer = () => useDrawerStore((state) => state.openedDrawer);
const useDrawerActions = () => useDrawerStore((state) => state.actions);

export { useRegisteredDrawers, useOpenedDrawer, useDrawerActions };
