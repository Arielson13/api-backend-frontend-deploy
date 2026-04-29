import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loginRequest, registerRequest } from "../services/auth";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginRequest(email, password);
    localStorage.setItem("auth_token", result.token);
    setToken(result.token);
  };

  const register = async (email: string, password: string) => {
    await registerRequest(email, password);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, register, logout }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
