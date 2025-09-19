import adminLoginService from "@/services/auth/admin-login-service";
import { useAuthActions } from "@/stores/auth-store";
import { useSessionActions } from "@/stores/session-store";
import { useUserStoreActions } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useAdminLogin = () => {
  const router = useRouter();
  const { setSession } = useSessionActions();
  const { setIsAuth } = useAuthActions();
  const { setUser } = useUserStoreActions();

  return useMutation({
    mutationFn: adminLoginService,
    onSuccess: (adminLoginResData) => {
      if (adminLoginResData) {
        const { accessToken, refreshToken, user } = adminLoginResData;
        setSession({ accessToken, refreshToken });
        setUser(user);
        setIsAuth(true);
      }

      toast.success("Login successful");
      router.push("/submitter");
    },
  });
};

export default useAdminLogin;
