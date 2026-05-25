import { api, AUTH_TOKEN_KEY } from "@/api/api-client";
import type { LoginResponse } from "@/api/types";

export const authService = {
  login: async (
    credentials: Record<string, string>,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },
};
