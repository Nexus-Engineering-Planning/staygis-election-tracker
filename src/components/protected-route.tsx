"use client";

import { useRouter } from "next/navigation";
import { useAuth, useHasAuthHydrated } from "@/stores/auth-store";
import { ReactNode, useEffect } from "react";
import { UserRole } from "@/lib/types/user-types";
import { useUser } from "@/stores/user-store";

interface ProtectedRouteProps {
  children: ReactNode;
  allowed: UserRole;
}

const ProtectedRoute = ({ children, allowed }: ProtectedRouteProps) => {
  const hasAuthHydated = useHasAuthHydrated();
  const auth = useAuth();
  const user = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!hasAuthHydated) return;

    if (!auth) {
      if (allowed === UserRole.ADMIN) router.push("/login");
      else if (allowed === UserRole.SUBMITTER) router.push("/submitter/login");
      return;
    }

    if (!user || !user.roles.includes(allowed)) {
      router.push("/unauthorized");
      return;
    }
  }, [hasAuthHydated, auth, user, allowed, router]);

  if (!auth || !user || !user.roles.includes(allowed)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
