import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { highlightsApi } from "@/api/highlights";

export const useActiveHighlight = () => {
  return useQuery({
    queryKey: ["highlights", "active"],
    queryFn: highlightsApi.getActiveHighlight,
  });
};

export const useAllHighlights = () => {
  return useQuery({
    queryKey: ["highlights", "all"],
    queryFn: highlightsApi.getAllHighlights,
  });
};

export const useCreateHighlight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: highlightsApi.createHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useUpdateHighlight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      highlightsApi.updateHighlight(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: highlightsApi.deleteHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};
