// import type { LoginFormData, SignupFormData } from "@/lib/types";

const forgotPasswordInitialization = () => {
  return {
    //     mutationFn: async function (
    //         values: LoginFormData,
    //     ) {
    //         const { data, error } = await supabase.auth.signInWithPassword(
    //             values,
    //         );
    //         if (error) {
    //             throw new Error(error.message);
    //         }
    //         return data;
    //     },
  };
};

const forgotPasswordVerification = () => {
  return {};
};

export { forgotPasswordInitialization, forgotPasswordVerification };
