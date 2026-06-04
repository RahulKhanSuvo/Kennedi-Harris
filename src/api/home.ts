import axiosInstance from "./axios";
import type { ApiResponse, HomeData } from "@/types";

export const homeApi = {
  getActiveHome: async (): Promise<HomeData | null> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<HomeData>>("/home/active");
      const record = response.data.data;
      if (!record) return null;

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
    } catch {
      return null;
    }
  },

  createHome: async (formData: FormData): Promise<ApiResponse<HomeData>> => {
    const response = await axiosInstance.post<ApiResponse<HomeData>>(
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
    const response = await axiosInstance.patch<ApiResponse<HomeData>>(
      `/home/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteHome: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/home/delete/${id}`,
    );
    return response.data;
  },
};
export default homeApi;
