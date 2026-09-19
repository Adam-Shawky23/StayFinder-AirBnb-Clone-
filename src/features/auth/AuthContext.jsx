import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from './authApi';

const STORAGE_KEY = 'stayfinder_auth';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  async function login(email, password) {
    const result = await authApi.login(email, password);
    setSession(result);
    return result;
  }

  async function signup(name, email, password) {
    const result = await authApi.signup(name, email, password);
    setSession(result);
    return result;
  }

  function logout() {
    setSession(null);
  }

  const value = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
