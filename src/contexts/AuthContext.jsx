import { createContext, useMemo, useState, useCallback } from "react";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("tp_chat_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSetUser = useCallback((newUser) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem("tp_chat_user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("tp_chat_user");
      }
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    handleSetUser(null);
  }, [handleSetUser]);

  const value = useMemo(
    () => ({ user, setUser: handleSetUser, logout }),
    [user, handleSetUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
