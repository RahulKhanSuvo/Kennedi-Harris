import axiosInstance from "./axios";
import type { ApiResponse, ContactData } from "@/types";

export const contactApi = {
  getActiveContact: async (): Promise<ContactData | null> => {
    try {
      const response = await axiosInstance.get<ApiResponse<ContactData>>(
        "/contact/get/active",
      );
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  createContact: async (
    data: Omit<ContactData, "_id" | "isActive">,
  ): Promise<ApiResponse<ContactData>> => {
    const response = await axiosInstance.post<ApiResponse<ContactData>>(
      "/contact/create",
      data,
    );
    return response.data;
  },

  updateContact: async (
    id: string,
    data: Partial<ContactData>,
  ): Promise<ApiResponse<ContactData>> => {
    const response = await axiosInstance.patch<ApiResponse<ContactData>>(
      `/contact/update/${id}`,
      data,
    );
    return response.data;
  },

  deleteContact: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/contact/delete/${id}`,
    );
    return response.data;
  },
};
export default contactApi;
