import { createContext, useContext, useState } from "react";
import { saveSession } from "../script/session";

interface AuthContextType {
  token: string | null;
  user: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("sessionToken"));
  const [user, setUser] = useState(null);

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
  };

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      const token = localStorage.getItem("sessionToken");

      console.log("token from context", token);

      if (token) {
        setToken(token);
      } else {
        throw new Error("Токен не найден");
      }
    } else {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Помилка з використанням AuthContext");
  }
  return context;
};
