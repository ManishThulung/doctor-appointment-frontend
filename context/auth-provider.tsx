"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface AuthType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthType>({
  isAuth: false,
  setIsAuth: () => {
    return;
  },
});

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    const isAuthenticated = storedAuth ? JSON.parse(storedAuth) : false;
    setIsAuth(isAuthenticated);
  }, []);

  // Update local storage whenever the user state changes.
  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error(`useAuthContext must be used within a AuthContextProvider`);
};

export { AuthContextProvider, useAuthContext };
