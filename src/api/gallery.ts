import axiosInstance from "./axios";
import type { ApiResponse, GalleryData } from "@/types";

export const galleryApi = {
  getActiveGallery: async (): Promise<GalleryData | null> => {
    try {
      const response = await axiosInstance.get<ApiResponse<GalleryData>>(
        "/gallery/get/active",
      );
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  getAllGalleries: async (): Promise<GalleryData[]> => {
    try {
      const response =
        await axiosInstance.get<ApiResponse<GalleryData[]>>("/gallery/getAll");
      return response.data.data || [];
    } catch {
      return [];
    }
  },

  createGallery: async (
    formData: FormData,
  ): Promise<ApiResponse<GalleryData>> => {
    const response = await axiosInstance.post<ApiResponse<GalleryData>>(
      "/gallery/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  updateGallery: async (
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<GalleryData>> => {
    const response = await axiosInstance.patch<ApiResponse<GalleryData>>(
      `/gallery/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteGallery: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/gallery/delete/${id}`,
    );
    return response.data;
  },

  updateSinglePhoto: async (
    galleryId: string,
    photoId: string,
    formData: FormData,
  ): Promise<ApiResponse<GalleryData>> => {
    const response = await axiosInstance.patch<ApiResponse<GalleryData>>(
      `/gallery/${galleryId}/photos/${photoId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  deleteSinglePhoto: async (
    galleryId: string,
    photoId: string,
  ): Promise<ApiResponse<GalleryData>> => {
    const response = await axiosInstance.delete<ApiResponse<GalleryData>>(
      `/gallery/${galleryId}/photos/${photoId}`,
    );
    return response.data;
  },
};
export default galleryApi;
