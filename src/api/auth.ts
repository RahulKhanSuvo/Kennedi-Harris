import axiosInstance from "./axios";
import type { LoginResponse } from "@/types";

export const authApi = {
  login: async (
    credentials: Record<string, string>,
  ): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },
};
