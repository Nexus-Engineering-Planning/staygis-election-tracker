const signupUser = () => {
  return {
    // mutationFn: async function (values: SignupFormData) {
    //   const { data, error } = await supabase.auth.signUp(values);
    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   return data;
    // },
  };
};

const signupVerification = () => {
  return {};
};

export { signupUser, signupVerification };
