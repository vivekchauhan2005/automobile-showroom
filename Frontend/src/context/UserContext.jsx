import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Verify token with backend
          try {
            const response = await axios.get(`${API_URL}/api/auth/profile`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.success) {
              setUser(response.data.user);
              setIsAuthenticated(true);
              localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
              throw new Error('Invalid token');
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      
      if (response.data.success) {
        const userData = response.data.user;
        const token = response.data.token;
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return response.data;
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      
      if (response.data.success) {
        const newUser = response.data.user;
        const token = response.data.token;
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        return response.data;
      }
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${API_URL}/api/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const updateUser = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/auth/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error(response.data.message || 'Update failed');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Update failed';
      throw new Error(message);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/auth/change-password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Password change failed';
      throw new Error(message);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        changePassword,
        isAdmin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};