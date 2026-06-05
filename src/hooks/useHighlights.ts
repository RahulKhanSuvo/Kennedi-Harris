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
// add new video
export const useAddNewVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: highlightsApi.addSingleVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
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

export const useUpdateSingleVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      highlightId,
      videoId,
      formData,
    }: {
      highlightId: string;
      videoId: string;
      formData: FormData;
    }) => highlightsApi.updateSingleVideo(highlightId, videoId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useDeleteSingleVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      highlightId,
      videoId,
    }: {
      highlightId: string;
      videoId: string;
    }) => highlightsApi.deleteSingleVideo(highlightId, videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useUpdateSingleFeedVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      highlightId,
      feedVideoId,
      formData,
    }: {
      highlightId: string;
      feedVideoId: string;
      formData: FormData;
    }) =>
      highlightsApi.updateSingleFeedVideo(highlightId, feedVideoId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useDeleteSingleFeedVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      highlightId,
      feedVideoId,
    }: {
      highlightId: string;
      feedVideoId: string;
    }) => highlightsApi.deleteSingleFeedVideo(highlightId, feedVideoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};
