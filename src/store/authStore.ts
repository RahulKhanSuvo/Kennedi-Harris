import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

const AUTH_TOKEN_KEY = "angela_auth_token";
const AUTH_USER_KEY = "angela_auth_user";

const getInitialToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const getInitialUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  setAuth: (token, user) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    set({ token: null, user: null });
  },
}));
