import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aboutApi } from "@/api/about";

export const useActiveAbout = () => {
  return useQuery({
    queryKey: ["about", "active"],
    queryFn: aboutApi.getActiveAbout,
  });
};

export const useAllAbouts = () => {
  return useQuery({
    queryKey: ["about", "all"],
    queryFn: aboutApi.getAllAbouts,
  });
};

export const useCreateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aboutApi.createAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      aboutApi.updateAbout(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};

export const useDeleteAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aboutApi.deleteAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};
