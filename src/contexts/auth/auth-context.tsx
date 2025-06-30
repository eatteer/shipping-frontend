import { createContext } from "react";

export type User = {
  token: string;
  email: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { token: string; email: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);
