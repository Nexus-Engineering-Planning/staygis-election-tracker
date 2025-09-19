"use client";

import ForgotPasswordForm from "@/components/forgot-password-form";
import { ForgotPasswordRequestDto } from "@/lib/types/auth-types";
import useForgotPassword from "@/lib/hooks/auth/useForgotPassword";

const ForgotPasswordInitializationPage = () => {
  const { mutate: forgotPasswordInitializationMutation, isPending } =
    useForgotPassword();

  const handleForgotPasswordInitialization = async (
    values: ForgotPasswordRequestDto
  ) => {
    forgotPasswordInitializationMutation(values);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm
          isLoading={isPending}
          onRequestForgotPassword={handleForgotPasswordInitialization}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordInitializationPage;
