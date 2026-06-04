/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axios";
import type { ApiResponse, HighlightData } from "@/types";

export const highlightsApi = {
  getActiveHighlight: async (): Promise<HighlightData | null> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<HighlightData>>(
          "/highlights/active",
        );
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  getAllHighlights: async (): Promise<HighlightData[]> => {
    try {
      const response = await axiosInstance.get<any>("/highlights/getAll");
      const resData = response.data;
      if (Array.isArray(resData)) {
        return resData;
      }
      if (resData && typeof resData === "object") {
        const nestedData = resData.data;
        if (Array.isArray(nestedData)) {
          return nestedData;
        }
        if (nestedData && typeof nestedData === "object") {
          return [nestedData];
        }
      }
      return [];
    } catch {
      return [];
    }
  },

  createHighlight: async (
    formData: FormData,
  ): Promise<ApiResponse<HighlightData>> => {
    const response = await axiosInstance.post<ApiResponse<HighlightData>>(
      "/highlights/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  updateHighlight: async (
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<HighlightData>> => {
    const response = await axiosInstance.patch<ApiResponse<HighlightData>>(
      `/highlights/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteHighlight: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/highlights/delete/${id}`,
    );
    return response.data;
  },
};
export default highlightsApi;
