import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken } from '../utils/common';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  // Load user data from localStorage or fallback to getAuthToken
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem('_USER_AUTH_');
    return storedUser ? JSON.parse(storedUser).user : getAuthToken();
  });

  // Keep localStorage in sync when userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('_USER_AUTH_', JSON.stringify({ user: userInfo }));
    } else {
      localStorage.removeItem('_USER_AUTH_');
    }
  }, [userInfo]);

  // Login function
  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem('_USER_AUTH_', JSON.stringify({ user: userData }));
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('_USER_AUTH_');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
