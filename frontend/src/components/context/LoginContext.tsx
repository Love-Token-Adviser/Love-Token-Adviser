import { useState, createContext, ReactNode } from "react";

const tokenKey = localStorage.getItem("accessToken");

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginContext = createContext<LoginContextType | null>(null);

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!tokenKey);
  const value = { isLoggedIn, setIsLoggedIn };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
