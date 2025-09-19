import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthActions = {
  setIsAuth: (isAuth: boolean) => void;
  clearIsAuth: () => void;
  setHasAuthHydrated: (state: boolean) => void;
};

type AuthState = {
  isAuth: boolean;
  hasAuthHydrated: boolean;
  actions: AuthActions;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      hasAuthHydrated: false,
      actions: {
        setIsAuth: (isAuth) => set({ isAuth }),
        clearIsAuth: () => set({ isAuth: false }),
        setHasAuthHydrated: (hasAuthHydrated) => set({ hasAuthHydrated }),
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuth: state.isAuth,
      }),
      onRehydrateStorage: (state) => {
        const { setHasAuthHydrated } = state.actions;

        Promise.resolve().then(() => {
          setHasAuthHydrated(true);
        });
      },
    }
  )
);

const useAuth = () => useAuthStore((state) => state.isAuth);
const useHasAuthHydrated = () => useAuthStore((state) => state.hasAuthHydrated);
const useAuthActions = () => useAuthStore((state) => state.actions);

export { useAuth, useHasAuthHydrated, useAuthActions };
