'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setToken(tokenFromCookie || null);
  }, []);

  const logout = () => {
    toast.error("Success Logout")
    setToken(null);
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
