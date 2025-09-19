"use client";

import { cn, displayFormErrors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { forgotPasswordFormSchema } from "@/lib/constants";
import { useEffect } from "react";
import { ForgotPasswordRequestDto } from "@/lib/types/auth-types";

interface ForgotPasswordFormProps extends React.ComponentProps<"div"> {
  onRequestForgotPassword: (values: ForgotPasswordRequestDto) => void;
  isLoading?: boolean;
}

const ForgotPasswordForm = ({
  className,
  onRequestForgotPassword,
  isLoading,
  ...props
}: ForgotPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequestDto>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler: SubmitHandler<ForgotPasswordRequestDto> = (
    values: ForgotPasswordRequestDto
  ) => {
    onRequestForgotPassword(values);
  };

  useEffect(() => {
    displayFormErrors(errors);
  }, [errors]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>

          <CardDescription>
            Enter your email address below to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col gap-6">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </div>
                )}
              />

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

export default ForgotPasswordForm;
