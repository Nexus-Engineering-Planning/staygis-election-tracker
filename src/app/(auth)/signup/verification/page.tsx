"use client";

import VerificationForm from "@/components/verification-form";
import { VerificationRequestDto } from "@/lib/types/auth-types";
import useSignupVerification from "@/lib/hooks/auth/useSignupVerification";

const SignupVerificationPage = () => {
  const { mutate: signupVerificationMutate, isPending } =
    useSignupVerification();

  const handleSignupVerification = async (values: VerificationRequestDto) => {
    signupVerificationMutate(values);
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
