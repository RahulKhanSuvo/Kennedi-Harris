import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryApi } from "@/api/gallery";

export const useActiveGallery = () => {
  return useQuery({
    queryKey: ["gallery", "active"],
    queryFn: galleryApi.getActiveGallery,
  });
};

export const useAllGalleries = () => {
  return useQuery({
    queryKey: ["gallery", "all"],
    queryFn: galleryApi.getAllGalleries,
  });
};

export const useCreateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: galleryApi.createGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useUpdateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      galleryApi.updateGallery(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: galleryApi.deleteGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useUpdateSinglePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      galleryId,
      photoId,
      formData,
    }: {
      galleryId: string;
      photoId: string;
      formData: FormData;
    }) => galleryApi.updateSinglePhoto(galleryId, photoId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useDeleteSinglePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      galleryId,
      photoId,
    }: {
      galleryId: string;
      photoId: string;
    }) => galleryApi.deleteSinglePhoto(galleryId, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};
