import { useAuth } from "@/contexts/auth/use-auth";
import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router";

export const LoggedInRedirection = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
