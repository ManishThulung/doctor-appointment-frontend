"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface AuthType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthType>({
  isAuth: false,
  setIsAuth: () => {
    return;
  },
  role: "",
  setRole: () => {
    return;
  },
});

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  // Initialize state with localStorage values or defaults
  // directly read from localStorage when the component mounts to ensures that the values are read before the first render.
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuth");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [role, setRole] = useState<string>(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? JSON.parse(storedRole) : "";
  });

  // Update local storage whenever the user state changes.
  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(role));
  }, [role]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        role,
        setRole,
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
