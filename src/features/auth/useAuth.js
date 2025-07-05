import { useState, useEffect } from "react";
import {
  clearAuthData,
  getAuthToken,
  setAuthToken,
} from "../../utils/authStorage";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const updateToken = (newToken) => {
    setAuthToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
  };

  const isAuthenticated = !!token;

  return {
    token,
    updateToken,
    logout,
    isAuthenticated,
    loading,
  };
};
