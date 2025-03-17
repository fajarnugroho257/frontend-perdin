import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";


interface AuthContextType {
  token: string | null;
  login: (token: string, userRole:string, user_nama:string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  // const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.log("Token expired, logging out...");
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string, userRole:string, user_nama:string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    localStorage.setItem("role", userRole);
    localStorage.setItem("user_nama", user_nama);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_nama");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
