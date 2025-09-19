import { create } from "zustand";
import { persist } from "zustand/middleware";

type Session = {
  accessToken: string;
  refreshToken: string;
};

type SessionActions = {
  setSession: (session: Session) => void;
  updateSession: (session: Session) => void;
  clearSession: () => void;
};

type SessionState = {
  session: Session | null;
  actions: SessionActions;
};

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      actions: {
        setSession: (session) => set({ session }),
        updateSession: (session) => set({ session }),
        clearSession: () => set({ session: null }),
      },
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        session: state.session,
      }),
    }
  )
);

const useSession = () => useSessionStore((state) => state.session);
const useSessionActions = () => useSessionStore((state) => state.actions);

export { useSession, useSessionActions };
