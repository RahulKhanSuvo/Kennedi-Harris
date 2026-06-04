import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactApi } from "@/api/contact";
import type { ContactData } from "@/types";

export const useContact = () => {
  return useQuery({
    queryKey: ["contact", "active"],
    queryFn: contactApi.getActiveContact,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactApi.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactData> }) =>
      contactApi.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};
