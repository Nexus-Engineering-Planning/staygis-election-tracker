import {
  signupService,
  submitterSignupService,
} from "@/services/auth/signup-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignup = () => {
  const router = useRouter();

  const useAdminSignup = () => {
    return useMutation({
      mutationFn: signupService,
      onSuccess: (signupRes) => {
        console.log(signupRes);
      },
    });
  };

  const useSubmitterSignup = () => {
    return useMutation({
      mutationFn: submitterSignupService,
      onSuccess: (signupRes) => {
        console.log(signupRes);
        toast.success("Account created successfully");
        router.push("/submitter/login");
      },
    });
  };

  return { useAdminSignup, useSubmitterSignup };
};

export default useSignup;
