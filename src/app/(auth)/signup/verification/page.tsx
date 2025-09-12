"use client";

// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { VerificationFormData } from "@/lib/types";
import { toast } from "sonner";
import { signupVerification } from "@/services/auth/signup";
import VerificationForm from "@/components/verification-form";

const SignupVerificationPage = () => {
  //   const navigate = useNavigate();

  const { mutate: signupVerificationMutation, isPending } = useMutation(
    signupVerification()
  );

  const handleSignupVerification = async (values: VerificationFormData) => {
    signupVerificationMutation(values, {
      onSuccess: () => {
        // navigate("/login");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerificationForm
          isLoading={isPending}
          onVerify={handleSignupVerification}
        />
      </div>
    </div>
  );
};

export default SignupVerificationPage;
