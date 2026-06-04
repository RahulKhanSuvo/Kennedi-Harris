import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { footerApi } from "@/api/footer";
import type { FooterData } from "@/types";

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer", "active"],
    queryFn: footerApi.getActiveFooter,
  });
};

export const useCreateFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: footerApi.createFooter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};

export const useUpdateFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FooterData> }) =>
      footerApi.updateFooter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};

export const useDeleteFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: footerApi.deleteFooter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};
