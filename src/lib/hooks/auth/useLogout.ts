import { useSessionActions } from "@/stores/session-store";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const { clearSession } = useSessionActions();

  const logout = () => {
    clearSession();
    router.push("/login");
  };

  return {
    logout,
  };
};

export default useLogout;
