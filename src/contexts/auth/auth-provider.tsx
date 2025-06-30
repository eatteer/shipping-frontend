import {
  AuthContext,
  type AuthContextType,
  type User,
} from "@/contexts/auth/auth-context";
import { useEffect, useState, type PropsWithChildren } from "react";

export const LOCAL_STORAGE_USER_KEY = "user";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ token, email }: { token: string; email: string }) => {
    setUser({ token, email });

    setIsAuthenticated(true);

    localStorage.setItem(
      LOCAL_STORAGE_USER_KEY,
      JSON.stringify({ token, email })
    );
  };

  const logout = () => {
    setUser(null);

    setIsAuthenticated(false);

    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const rawUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

      if (rawUser) {
        try {
          const user = JSON.parse(rawUser);
          setUser(user);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const context: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
