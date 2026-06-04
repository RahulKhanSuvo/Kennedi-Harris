import axiosInstance from "./axios";
import type { ApiResponse, GameScheduleData } from "@/types";

export const scheduleApi = {
  getActiveSchedule: async (): Promise<ApiResponse<GameScheduleData[]>> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<GameScheduleData[]>>(
          "/schedule/getAll",
        );
      return response.data;
    } catch {
      return {
        success: false,
        message: "Failed to fetch schedule",
        data: [],
      };
    }
  },
  createSchedule: async (
    formData: FormData,
  ): Promise<ApiResponse<GameScheduleData>> => {
    const response = await axiosInstance.post<ApiResponse<GameScheduleData>>(
      "/schedule/create",
      formData,
    );
    return response.data;
  },

  updateSchedule: async (
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<GameScheduleData>> => {
    const response = await axiosInstance.patch<ApiResponse<GameScheduleData>>(
      `/schedule/update/${id}`,
      formData,
    );
    return response.data;
  },

  deleteSchedule: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(`
    /schedule/delete/${id}`);
    return response.data;
  },
};
