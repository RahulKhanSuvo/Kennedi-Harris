import { highlightsService } from "@/api/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { Loader2, AlertCircle, Plus, Trash2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Modular UI Sub-components
import EmptyHighlightsState from "./EmptyHighlightsState";
import SpotlightShowcase from "./SpotlightShowcase";
import MediaClusterGrid from "./MediaClusterGrid";
import SocialFeedCuts from "./SocialFeedCuts";
import { toast } from "sonner";

export default function HighlightsPanel() {
  const queryClient = useQueryClient();

  // 1. Fetch Active Highlights configuration
  const {
    data: activeHighlight,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["highlights", "active"],
    queryFn: highlightsService.getActiveHighlights,
    retry: 1,
  });

  // 2. Delete Highlights mutation pipeline
  const deleteMutation = useMutation({
    mutationFn: highlightsService.deleteHighlight,
    onSuccess: () => {
      // Invalidate both lists & active highlights caches
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      toast.success("Highlights ecosystem record cleared successfully!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete active highlights configuration.");
    },
  });

  const handleDelete = () => {
    if (!activeHighlight) return;
    if (
      window.confirm(
        "Are you absolutely sure you want to permanently erase the active highlights configuration cluster? This will delete all media nodes associated with this record.",
      )
    ) {
      deleteMutation.mutate(activeHighlight._id);
    }
  };

  // Render Loader if remote query is active
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-zinc-400">
        <Loader2 size={32} className="animate-spin text-kh-pink" />
        <span className="font-condensed text-[10px] font-black tracking-widest uppercase">
          Querying highlights cluster...
        </span>
      </div>
    );
  }

  // Render error banner if pipeline failure occurs
  if (isError) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-kh-pink/10 border border-kh-pink/20 text-kh-pink text-xs uppercase tracking-wider max-w-xl mx-auto shadow-inner">
        <AlertCircle size={16} className="shrink-0" />
        Failed to fetch database highlights cluster. Verify network
        connectivity.
      </div>
    );
  }

  const hasActiveHighlight = !!activeHighlight;

  return (
    <div className="space-y-8 w-full max-w-[1400px] mx-auto">
      {/* 1. Dashboard Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-tight text-white flex items-center gap-2">
            Highlights Ecosystem
          </h2>
          <span className="font-condensed text-[10px] tracking-wider text-zinc-500 uppercase block mt-1">
            Orchestrate player spotlight videos, clips, and social feed raw cuts
          </span>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-3 flex-wrap">
          {hasActiveHighlight && (
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 font-condensed font-black tracking-widest text-[10px] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 size={13} />
              {deleteMutation.isPending ? "Clearing..." : "Delete Cluster"}
            </button>
          )}

          <Link
            to="/admin/highlights/create"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-kh-pink hover:text-white text-black font-condensed font-black tracking-widest text-[10px] uppercase transition-all duration-300 shadow-md shadow-black/30 hover:scale-[1.01] cursor-pointer"
          >
            <Plus size={13} />
            Deploy Asset Node
          </Link>
        </div>
      </div>

      {/* 2. Active Highlights State Content */}
      <AnimatePresence mode="wait">
        {!hasActiveHighlight ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <EmptyHighlightsState />
          </motion.div>
        ) : (
          <motion.div
            key="active-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Live Ecosystem Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.03)] backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </div>
                <span className="text-emerald-400 text-[10px] font-condensed font-black tracking-widest uppercase">
                  Highlights Live Showcase Online
                </span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono text-emerald-500/60 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  SYNCED:{" "}
                  {new Date(activeHighlight.updatedAt).toLocaleDateString()}
                </span>
                <span className="bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-wider text-[8px]">
                  REF ID: {activeHighlight._id}
                </span>
              </div>
            </div>

            {/* Layout Grid: Spotlight & Sub-sections */}
            <div className="grid grid-cols-1 gap-8">
              {/* Feature Spotlight Master Player */}
              <SpotlightShowcase videoUrl={activeHighlight.MainVideo_url} />

              {/* Primary Media Video Clusters */}
              <MediaClusterGrid videos={activeHighlight.videos} />

              {/* Social Feed reels */}
              <SocialFeedCuts feedVideos={activeHighlight.feedVideos} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
