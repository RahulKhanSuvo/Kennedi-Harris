import { api } from "@/api/api-client";
import type { ApiResponse, HomeData } from "@/api/types";

export const homeService = {
  getActiveHome: async (): Promise<HomeData> => {
    const response = await api.get<ApiResponse<HomeData>>("/home/active");
    const record = response.data.data;

    const numbers = record.NUMBERS ?? {
      PPG: "",
      RPG: "",
      BPG: "",
      DOUBLE_DOUBLES: "",
      REBOUNDS: "",
    };

    return {
      ...record,
      PPG: numbers.PPG,
      RPG: numbers.RPG,
      BPG: numbers.BPG,
      DOUBLE_DOUBLES: numbers.DOUBLE_DOUBLES,
      REBOUNDS: numbers.REBOUNDS,
    };
  },

  createHome: async (formData: FormData): Promise<ApiResponse<HomeData>> => {
    const response = await api.post<ApiResponse<HomeData>>(
      "/home/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  updateHome: async (
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<HomeData>> => {
    const response = await api.patch<ApiResponse<HomeData>>(
      `/home/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteHome: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `/home/delete/${id}`,
    );
    return response.data;
  },
};
