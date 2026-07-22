import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
      }
      throw new Error(data.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      const data = await authService.updateProfile(userData);
      if (data.success) {
        setUser(data.user);
        return data;
      }
      throw new Error(data.message || 'Update failed');
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const data = await authService.changePassword(passwordData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getUserActivities = async () => {
    try {
      const data = await authService.getUserActivities();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getDashboardStats = async () => {
    try {
      const data = await authService.getDashboardStats();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateUser,
        changePassword,
        getUserActivities,
        getDashboardStats,
        isAdmin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};