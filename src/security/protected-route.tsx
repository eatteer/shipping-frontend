import { useAuth } from "@/contexts/auth/use-auth";
import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
