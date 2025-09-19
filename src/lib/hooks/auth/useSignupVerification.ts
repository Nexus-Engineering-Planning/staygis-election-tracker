import signupVerificationService from "@/services/auth/signup-verification-service";
import { useMutation } from "@tanstack/react-query";

const useSignupVerification = () => {
  return useMutation({
    mutationFn: signupVerificationService,
    onSuccess: (forgotPassVerRes) => {
      console.log(forgotPassVerRes);
    },
  });
};

export default useSignupVerification;
