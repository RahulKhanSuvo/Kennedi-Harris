import axiosInstance from "./axios";
import type { ApiResponse, AboutData } from "@/types";

export const aboutApi = {
  getActiveAbout: async (): Promise<AboutData | null> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<AboutData>>("/about/get/active");
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  getAllAbouts: async (): Promise<AboutData[]> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<AboutData[]>>("/about/getAll");
      return response.data.data || [];
    } catch {
      return [];
    }
  },

  createAbout: async (formData: FormData): Promise<ApiResponse<AboutData>> => {
    const response = await axiosInstance.post<ApiResponse<AboutData>>(
      "/about/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  updateAbout: async (
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<AboutData>> => {
    const response = await axiosInstance.patch<ApiResponse<AboutData>>(
      `/about/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteAbout: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/about/delete/${id}`,
    );
    return response.data;
  },
};
export default aboutApi;
