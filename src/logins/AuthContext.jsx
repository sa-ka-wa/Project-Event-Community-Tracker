// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("eventEaseUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = { id: 1, name: "Demo User", email };
    localStorage.setItem("eventEaseUser", JSON.stringify(user));
    setCurrentUser(user);
    return { success: true };
  };

  const register = async (name, email, password) => {
    const user = { id: Date.now(), name, email };
    localStorage.setItem("eventEaseUser", JSON.stringify(user));
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("eventEaseUser");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
