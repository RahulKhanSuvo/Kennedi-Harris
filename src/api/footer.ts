import axiosInstance from "./axios";
import type { ApiResponse, FooterData } from "@/types";

export const footerApi = {
  getActiveFooter: async (): Promise<FooterData | null> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<FooterData>>("/footer/get/active");
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  createFooter: async (
    data: Omit<FooterData, "_id" | "isActive">,
  ): Promise<ApiResponse<FooterData>> => {
    const response = await axiosInstance.post<ApiResponse<FooterData>>(
      "/footer/create",
      data,
    );
    return response.data;
  },

  updateFooter: async (
    id: string,
    data: Partial<FooterData>,
  ): Promise<ApiResponse<FooterData>> => {
    const response = await axiosInstance.patch<ApiResponse<FooterData>>(
      `/footer/update/${id}`,
      data,
    );
    return response.data;
  },

  deleteFooter: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/footer/delete/${id}`,
    );
    return response.data;
  },
};
export default footerApi;
