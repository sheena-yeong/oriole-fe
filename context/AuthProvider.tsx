import type { ReactNode } from 'react';
import { useState } from 'react';
import type { AuthContextType, User } from './AuthContext';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<{ access: string | null }>({
    access: null,
  });

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
