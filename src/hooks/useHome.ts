import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { homeApi } from "@/api/home";

export const useHome = () => {
  return useQuery({
    queryKey: ["home", "active"],
    queryFn: homeApi.getActiveHome,
    staleTime: Infinity,
  });
};

export const useCreateHome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: homeApi.createHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useUpdateHome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      homeApi.updateHome(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};

export const useDeleteHome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: homeApi.deleteHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
