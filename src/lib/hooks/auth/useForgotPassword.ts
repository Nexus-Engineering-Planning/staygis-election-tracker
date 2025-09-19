import forgotPasswordService from "@/services/auth/forgot-password-service";
import { useMutation } from "@tanstack/react-query";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordService,
    onSuccess: (forgotPassRes) => {
      console.log(forgotPassRes);
    },
  });
};

export default useForgotPassword;
