import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import type { FieldErrors } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayFormErrors(errors: FieldErrors) {
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];

    if (typeof firstError === "string") {
      toast.error("Validation Error", {
        description: firstError,
      });
    } else if (typeof firstError?.message === "string") {
      toast.error("Validation Error", {
        description: firstError.message,
      });
    } else {
      toast.error("Please correct the errors in the form.");
    }
  }
}
