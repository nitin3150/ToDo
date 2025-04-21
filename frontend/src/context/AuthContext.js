import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setCurrentUser(userData);
        } catch (err) {
          console.error('Failed to get user data:', err);
          localStorage.removeItem('token');
          setToken('');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    // console.log("Sending credentials to FastAPI:", credentials);
    setLoading(true);
    setError('');
    try {
      const { user, token } = await loginUser(credentials);
      setCurrentUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const { user, token } = await registerUser(userData);
      setCurrentUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      return true;
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};