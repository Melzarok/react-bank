import { createContext, useContext, useState } from "react";
import { saveSession } from "../script/session";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  token: string | null;
  user: any;
  isConfirm: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: null,
  user: null,
  isConfirm: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("sessionToken"));
  const [user, setUser] = useState<any>(null);

  const isConfirm = JSON.parse(localStorage.getItem("sessionAuth") || "{}")
    ?.user?.isConfirm;

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      if (data.session) {
        localStorage.setItem("sessionToken", data.session.token);
        setToken(data.session.token);
        setUser(data.session.user);
        setIsAuthenticated(true);
        return data;
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  };

  const logout = () => {
    saveSession(null);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        user,
        login,
        logout,
        isConfirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Ошибка при использовании AuthContext");
  }
  return context;
};
