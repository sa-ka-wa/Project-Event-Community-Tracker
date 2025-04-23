import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('eventEaseUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simplified login for demo
    // In a real app, you'd verify against your json-server
    try {
      const user = { id: 1, name: "Demo User", email: email }; 
      localStorage.setItem('eventEaseUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed. Please try again.'
      };
    }
  };

  const register = async (name, email, password) => {
    // Simplified registration for demo
    try {
      const user = { id: Date.now(), name, email };
      localStorage.setItem('eventEaseUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('eventEaseUser');
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