import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  tokens: { access: string | null };
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  isAuthenticated: boolean;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<{ success: boolean; error?: string; message?: string }>;
  initializing: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
