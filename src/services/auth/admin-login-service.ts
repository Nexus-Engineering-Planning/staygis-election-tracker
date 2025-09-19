import adminLoginApi from "@/apis/auth/admin-login-api";
import { AdminLoginRequestDto } from "@/lib/types/auth-types";

const adminLoginService = async (values: AdminLoginRequestDto) => {
  const res = await adminLoginApi(values);
  return res.data.data;
};

export default adminLoginService;
