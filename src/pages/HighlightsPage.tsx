/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { Video, PlusCircle, VideoOff, X } from "lucide-react";
import {
  useAllHighlights,
  useCreateHighlight,
  useUpdateHighlight,
  useUpdateSingleVideo,
  useDeleteSingleVideo,
  useUpdateSingleFeedVideo,
  useDeleteSingleFeedVideo,
} from "@/hooks/useHighlights";
import { Button } from "@/components/ui/button";

// Modular sub-components
import { HighlightCreateForm } from "@/components/highlights/HighlightCreateForm";
import { HighlightEditForm } from "@/components/highlights/HighlightEditForm";
import { ActiveHighlightCard } from "@/components/highlights/ActiveHighlightCard";
import { EditSingleVideoModal } from "@/components/highlights/EditSingleVideoModal";
import { EditSingleFeedVideoModal } from "@/components/highlights/EditSingleFeedVideoModal";
import type { HighlightFormValues } from "@/components/highlights/HighlightCreateForm";

export default function HighlightsPage() {
  const { data: highlights = [], isLoading, isError } = useAllHighlights();
  const createMutation = useCreateHighlight();
  const updateMutation = useUpdateHighlight();

  // Granular Item mutations
  const updateSingleVideoMutation = useUpdateSingleVideo();
  const deleteSingleVideoMutation = useDeleteSingleVideo();
  const updateSingleFeedVideoMutation = useUpdateSingleFeedVideo();
  const deleteSingleFeedVideoMutation = useDeleteSingleFeedVideo();

  // Inline states — no modal for whole package creation/editing
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Single Item Modals states
  const [isEditVideoOpen, setIsEditVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  const [isEditFeedOpen, setIsEditFeedOpen] = useState(false);
  const [selectedFeedVideo, setSelectedFeedVideo] = useState<any | null>(null);

  const activeHighlight =
    highlights.find((h: any) => h.isActive) || highlights[0];
  const hasExistingData = !!activeHighlight;

  const isSubmittingItem =
    updateSingleVideoMutation.isPending ||
    deleteSingleVideoMutation.isPending ||
    updateSingleFeedVideoMutation.isPending ||
    deleteSingleFeedVideoMutation.isPending;

  // ── Build FormData from form values ──
  const buildFormData = (values: HighlightFormValues): FormData => {
    const formData = new FormData();

    if (values.MainVideo_url instanceof File) {
      formData.append("MainVideo_url", values.MainVideo_url);
    } else if (typeof values.MainVideo_url === "string") {
      formData.append("MainVideo_url", values.MainVideo_url);
    }

    (values.videos || []).forEach((v: any) => {
      formData.append("video_name", v.video_name);
      formData.append("video_type", v.video_type);
      formData.append("video_url", v.video_url || "");
      if (v.videos instanceof File) {
        formData.append("videos", v.videos);
      }
    });

    (values.feedVideos || []).forEach((fv: any) => {
      formData.append("title", fv.title);
      formData.append("video_url", fv.video_url || "");
      if (fv.feedVideos instanceof File) {
        formData.append("feedVideos", fv.feedVideos);
      }
    });

    return formData;
  };

  const handleCreate = (values: HighlightFormValues) => {
    const formData = buildFormData(values);
    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Highlight package initialized successfully!");
        setIsCreating(false);
      },
      onError: (err: any) => {
        toast.error(
          err.response?.data?.message || "Failed to create highlight",
        );
      },
    });
  };

  const handleEdit = (values: HighlightFormValues) => {
    if (!activeHighlight) return;
    const formData = buildFormData(values);
    updateMutation.mutate(
      { id: activeHighlight._id, formData },
      {
        onSuccess: () => {
          toast.success("Highlight package updated successfully!");
          setIsEditing(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to update highlight",
          );
        },
      },
    );
  };

  const handleOpenEditVideo = (video: any) => {
    setSelectedVideo(video);
    setIsEditVideoOpen(true);
  };

  const handleEditVideoSubmit = (data: {
    video_name: string;
    video_type: string;
    file: File | null;
  }) => {
    if (!activeHighlight || !selectedVideo) return;

    const formData = new FormData();
    formData.append("video_name", data.video_name);
    formData.append("video_type", data.video_type);
    if (data.file) {
      formData.append("video", data.file);
      formData.append("videos", data.file);
    }

    updateSingleVideoMutation.mutate(
      {
        highlightId: activeHighlight._id,
        videoId: selectedVideo._id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Video clip updated successfully!");
          setIsEditVideoOpen(false);
          setSelectedVideo(null);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to update video clip",
          );
        },
      },
    );
  };

  const handleDeleteVideo = (videoId: string) => {
    if (!activeHighlight) return;

    deleteSingleVideoMutation.mutate(
      {
        highlightId: activeHighlight._id,
        videoId,
      },
      {
        onSuccess: () => {
          toast.success("Video clip deleted successfully!");
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to delete video clip",
          );
        },
      },
    );
  };

  const handleOpenEditFeed = (feedVideo: any) => {
    setSelectedFeedVideo(feedVideo);
    setIsEditFeedOpen(true);
  };

  const handleEditFeedSubmit = (data: { title: string; file: File | null }) => {
    if (!activeHighlight || !selectedFeedVideo) return;

    const formData = new FormData();
    formData.append("title", data.title);
    if (data.file) {
      formData.append("feedVideo", data.file);
      formData.append("feedVideos", data.file);
    }

    updateSingleFeedVideoMutation.mutate(
      {
        highlightId: activeHighlight._id,
        feedVideoId: selectedFeedVideo._id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Feed clip updated successfully!");
          setIsEditFeedOpen(false);
          setSelectedFeedVideo(null);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to update feed clip",
          );
        },
      },
    );
  };

  const handleDeleteFeedVideo = (feedVideoId: string) => {
    if (!activeHighlight) return;

    deleteSingleFeedVideoMutation.mutate(
      {
        highlightId: activeHighlight._id,
        feedVideoId,
      },
      {
        onSuccess: () => {
          toast.success("Feed clip deleted successfully!");
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to delete feed clip",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2.5">
            <Video className="text-kh-pink" size={32} />
            Highlights Section
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-0.5">
            Manage main stream video reels and feed snippets
          </p>
        </div>

        {!isLoading && !isError && !hasExistingData && (
          <div className="flex gap-2">
            {isCreating ? (
              <Button
                onClick={() => setIsCreating(false)}
                variant="outline"
                className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={14} />
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
              >
                <PlusCircle size={14} />
                Initialize Package
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ── Main Content Area ── */}
      {isLoading ? (
        /* Immersive Split-Pane Workspace Skeleton Layout (Full Height matched to active view) */
        <div className="grid grid-cols-12 gap-8 items-stretch min-h-[750px] w-full animate-pulse">
          {/* Left Column Command Box Skeleton */}
          <div className="col-span-12 lg:col-span-5 bg-zinc-950/20 border border-white/5 rounded-2xl p-6 xl:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header block lines */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-3 w-2/3">
                  <div className="w-11 h-11 bg-zinc-900 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-zinc-900 rounded w-3/4" />
                    <div className="h-2.5 bg-zinc-900 rounded w-1/2" />
                  </div>
                </div>
                <div className="w-24 h-9 bg-zinc-900 rounded-xl" />
              </div>

              {/* Pseudo Channel Tracks */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-900/60 rounded w-1/4" />
                  <div className="h-14 bg-zinc-900/40 rounded-xl border border-white/5" />
                </div>

                <div className="space-y-2">
                  <div className="h-3 bg-zinc-900/60 rounded w-1/3" />
                  <div className="h-11 bg-zinc-900/30 rounded-xl border border-white/5" />
                  <div className="h-11 bg-zinc-900/30 rounded-xl border border-white/5" />
                  <div className="h-11 bg-zinc-900/30 rounded-xl border border-white/5" />
                </div>

                <div className="space-y-2">
                  <div className="h-3 bg-zinc-900/60 rounded w-1/4" />
                  <div className="h-11 bg-zinc-900/30 rounded-xl border border-white/5" />
                  <div className="h-11 bg-zinc-900/30 rounded-xl border border-white/5" />
                </div>
              </div>
            </div>

            <div className="h-3 bg-zinc-900/40 rounded w-1/2 pt-2" />
          </div>

          {/* Right Column Monitor Stage Theater Box Skeleton */}
          <div className="col-span-12 lg:col-span-7 bg-zinc-950/40 p-6 xl:p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="h-3 bg-zinc-900 rounded w-1/4" />
                <div className="h-5 bg-zinc-900 rounded-md w-20" />
              </div>

              <div className="h-6 bg-zinc-900 rounded w-1/3" />

              {/* Aspect Ratio Video Stage Filler Box */}
              <div className="w-full flex-1 min-h-[300px] lg:min-h-0 aspect-video rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center">
                <Video
                  size={36}
                  className="text-zinc-900 animate-spin animation-duration-[3s]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="h-2.5 bg-zinc-900 rounded w-1/3" />
              <div className="h-2.5 bg-zinc-900 rounded w-1/5" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
            Failed to retrieve highlight data nodes.
          </p>
        </div>
      ) : isCreating ? (
        <HighlightCreateForm
          isPending={createMutation.isPending}
          onCancel={() => setIsCreating(false)}
          onSubmit={handleCreate}
        />
      ) : isEditing && activeHighlight ? (
        <HighlightEditForm
          highlight={activeHighlight}
          isPending={updateMutation.isPending}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleEdit}
        />
      ) : hasExistingData ? (
        <ActiveHighlightCard
          highlight={activeHighlight}
          onEditClick={() => setIsEditing(true)}
          onEditVideoClick={handleOpenEditVideo}
          onDeleteVideoClick={handleDeleteVideo}
          onEditFeedVideoClick={handleOpenEditFeed}
          onDeleteFeedVideoClick={handleDeleteFeedVideo}
          isSubmittingItem={isSubmittingItem}
        />
      ) : (
        <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-neutral-950/10 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
          <VideoOff size={48} className="text-zinc-800 mb-3 animate-pulse" />
          <p className="font-display text-lg font-bold text-zinc-400 tracking-wide uppercase">
            No Active Highlight Package
          </p>
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-1.5 max-w-[280px] leading-relaxed">
            Initialize your highlights grid structure to publish video reels.
          </p>
          <Button
            onClick={() => setIsCreating(true)}
            className="mt-6 bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-6 py-2.5 rounded-xl border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer"
          >
            Initialize Package
          </Button>
        </div>
      )}

      {/* ── Single Video Edit Modal ── */}
      {isEditVideoOpen && (
        <EditSingleVideoModal
          isOpen={isEditVideoOpen}
          onOpenChange={setIsEditVideoOpen}
          video={selectedVideo}
          isPending={updateSingleVideoMutation.isPending}
          onSubmit={handleEditVideoSubmit}
        />
      )}

      {/* ── Single Feed Edit Modal ── */}
      {isEditFeedOpen && (
        <EditSingleFeedVideoModal
          isOpen={isEditFeedOpen}
          onOpenChange={setIsEditFeedOpen}
          feedVideo={selectedFeedVideo}
          isPending={updateSingleFeedVideoMutation.isPending}
          onSubmit={handleEditFeedSubmit}
        />
      )}
    </div>
  );
}
