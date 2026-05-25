import { api } from "../api-client";
import type { HighlightData } from "../types";

export const highlightsService = {
  getActiveHighlights: async (): Promise<HighlightData[]> => {
    const response = await api.get<HighlightData[]>("/highlights/active");
    return response.data;
  },

  getAllHighlights: async (): Promise<HighlightData[]> => {
    const response = await api.get<HighlightData[]>("/highlights/getAll");
    return response.data;
  },

  createHighlight: async (formData: FormData): Promise<HighlightData> => {
    const response = await api.post<HighlightData>(
      "/highlights/create",
      formData,
    );
    return response.data;
  },

  updateHighlight: async (
    id: string,
    formData: FormData,
  ): Promise<HighlightData> => {
    const response = await api.patch<HighlightData>(
      `/highlights/update/${id}`,
      formData,
    );
    return response.data;
  },

  deleteHighlight: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `/highlights/delete/${id}`,
    );
    return response.data;
  },
};
