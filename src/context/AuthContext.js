import React, { useState, useEffect } from "react";
import { useMe } from "../custom-hooks/useMe";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { me } = useMe(token);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    setToken(token);
  }, [shouldUpdate]);

  function updateAuthStatus() {
    setShouldUpdate(!shouldUpdate);
  }

  function logout() {
    localStorage.setItem("token", "");
    updateAuthStatus();
  }

  const store = {
    isLoggedIn: !token,
    token,
    me,
    updateAuthStatus,
    logout,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
