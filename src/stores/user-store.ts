import { UserResponseDto } from "@/lib/types/user-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserActions = {
  setUser: (user: UserResponseDto) => void;
  clearUser: () => void;
};

type UserState = {
  user: UserResponseDto | null;
  actions: UserActions;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      actions: {
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

const useUser = () => useUserStore((state) => state.user);
const useUserStoreActions = () => useUserStore((state) => state.actions);

export { useUser, useUserStoreActions };
