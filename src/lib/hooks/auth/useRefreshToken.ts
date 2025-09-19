import refreshTokenService from "@/services/auth/refresh-token-service";
import { useMutation } from "@tanstack/react-query";

const useRefreshToken = () =>
  useMutation({
    mutationFn: refreshTokenService,
  });

export default useRefreshToken;
