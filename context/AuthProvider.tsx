import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import type { AuthContextType, User } from './AuthContextType';
import { AuthContext } from './AuthContextType';
import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<{ access: string | null }>({
    access: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem('access_token');
    if (stored) {
      setTokens({ access: stored });

      try {
        const payload = JSON.parse(atob(stored.split('.')[1]));
        setUser({
          id: payload._id,
          email: payload.email,
          role: payload.role,
        });
      } catch {
        localStorage.removeItem('access_token');
      }
    }
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/sign-in`, {
        email,
        password,
      });

      setTokens({ access: data.access });

      localStorage.setItem('access_token', data.access);

      const payload = JSON.parse(atob(data.access.split('.')[1]));
      setUser({ id: payload._id, email: payload.email, role: payload.role });

      return { success: true };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return { success: false, error: 'Username or password is incorrect.' };
        }
        return { success: false, error: error.message };
      }
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  function signOut() {
    localStorage.removeItem('access_token');
    setTokens({ access: null });
    setUser(null);
  }

  async function signUp(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: boolean; error?: string; message?: string }> {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, userData);
      return { success: true, message: data.message };
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return { success: false, error: errorMessage };
    }
  }

  const value: AuthContextType = {
    user,
    tokens,
    signIn,
    signOut,
    signUp,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
