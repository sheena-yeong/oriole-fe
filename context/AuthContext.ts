import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  tokens: { access: string | null };
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);