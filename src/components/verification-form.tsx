// "use client";

import { cn, displayFormErrors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { verificationFormSchema } from "@/lib/constants";
import type { VerificationFormData } from "@/lib/types";
import { useEffect } from "react";

interface VerificationFormProps extends React.ComponentProps<"div"> {
  onVerify: (values: VerificationFormData) => void;
  isLoading?: boolean;
}

const VerificationForm = ({
  className,
  onVerify,
  isLoading,
  ...props
}: VerificationFormProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      email: "victorotbabs@gmail.com",
      otp: "",
    },
  });

  const email = getValues("email");

  const onSubmitHandler: SubmitHandler<VerificationFormData> = (
    values: VerificationFormData
  ) => {
    onVerify(values);
  };

  useEffect(() => {
    displayFormErrors(errors);
  }, [errors]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Verify email address</CardTitle>

          <CardDescription>
            We’ve sent 6-digit to <span className="font-semibold">{email}</span>
            . Enter the code below to proceed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col gap-6">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="otp">OTP</Label>
                    <InputOTP id="otp" maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}
              />

              {/* <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </div>
                )}
              /> */}

              <div className="flex flex-col gap-3">
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    "Submit"
                  )}
                </Button>

                {/* <Button
                  disabled
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  Signup with Google
                </Button> */}
              </div>
            </div>

            {/* <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Sign in
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationForm;
