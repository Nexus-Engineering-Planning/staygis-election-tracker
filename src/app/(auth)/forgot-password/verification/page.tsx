"use client";

import ForgotPasswordVerificationForm from "@/components/verification-form";
import { VerificationRequestDto } from "@/lib/types/auth-types";
import useForgotPasswordVerification from "@/lib/hooks/auth/useForgotPasswordVerification";

const ForgotPasswordVerificationPage = () => {
  const { mutate: forgotPasswordVerificationMutation, isPending } =
    useForgotPasswordVerification();

  const handleForgotPasswordVerification = async (
    values: VerificationRequestDto
  ) => {
    forgotPasswordVerificationMutation(values);
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
