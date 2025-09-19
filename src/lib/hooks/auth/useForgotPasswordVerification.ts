import forgotPasswordVerificationService from "@/services/auth/forgot-password-verification-service";
import { useMutation } from "@tanstack/react-query";

const useForgotPasswordVerification = () => {
  return useMutation({
    mutationFn: forgotPasswordVerificationService,
    onSuccess: (forgotPassVerRes) => {
      console.log(forgotPassVerRes);
    },
  });
};

export default useForgotPasswordVerification;
