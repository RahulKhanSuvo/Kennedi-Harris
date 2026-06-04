/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api-client";
import type { HighlightData, ApiResponse } from "../types";

export const highlightsService = {
  getActiveHighlights: async (): Promise<HighlightData | null> => {
    try {
      const response =
        await api.get<ApiResponse<HighlightData>>("/highlights/active");
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching active highlights:", error);
      return null;
    }
  },

  getAllHighlights: async (): Promise<HighlightData[]> => {
    try {
      const response = await api.get<any>("/highlights/getAll");
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
    } catch (error) {
      console.error("Error fetching all highlights:", error);
      return [];
    }
  },

  createHighlight: async (formData: FormData): Promise<HighlightData> => {
    try {
      const response = await api.post<HighlightData>(
        "/highlights/create",
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating highlight:", error);
      throw error;
    }
  },

  updateHighlight: async (
    id: string,
    formData: FormData,
  ): Promise<HighlightData> => {
    try {
      const response = await api.patch<HighlightData>(
        `/highlights/update/${id}`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating highlight:", error);
      throw error;
    }
  },

  deleteHighlight: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(
        `/highlights/delete/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting highlight:", error);
      throw error;
    }
  },
};
