"use client";

// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { VerificationFormData } from "@/lib/types";
import { toast } from "sonner";
import { forgotPasswordVerification } from "@/services/auth/forgot-password";
import ForgotPasswordVerificationForm from "@/components/verification-form";

const ForgotPasswordVerificationPage = () => {
  //   const navigate = useNavigate();

  const { mutate: forgotPasswordVerificationMutation, isPending } = useMutation(
    forgotPasswordVerification()
  );

  const handleForgotPasswordVerification = async (
    values: VerificationFormData
  ) => {
    forgotPasswordVerificationMutation(values, {
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
        <ForgotPasswordVerificationForm
          isLoading={isPending}
          onVerify={handleForgotPasswordVerification}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordVerificationPage;
