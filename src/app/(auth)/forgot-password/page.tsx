"use client";

// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { ForgotPasswordFormData } from "@/lib/types";
import { toast } from "sonner";
import { forgotPasswordInitialization } from "@/services/auth/forgot-password";
import ForgotPasswordForm from "@/components/forgot-password-form";

const ForgotPasswordInitializationPage = () => {
  //   const navigate = useNavigate();

  const { mutate: forgotPasswordInitializationMutation, isPending } =
    useMutation(forgotPasswordInitialization());

  const handleForgotPasswordInitialization = async (
    values: ForgotPasswordFormData
  ) => {
    forgotPasswordInitializationMutation(values, {
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
        <ForgotPasswordForm
          isLoading={isPending}
          onRequestForgotPassword={handleForgotPasswordInitialization}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordInitializationPage;
