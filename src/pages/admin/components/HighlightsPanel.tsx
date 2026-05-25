import { useState } from "react";
import { highlightsService } from "@/api/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Trash2,
  RefreshCw,
  Star,
  Film,
  Edit3,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import VideoCardNode from "./VideoCardNode";
import UpgradeAssetModal from "./UpgradeAssetModal";
import type { VideoItem, FeedVideoItem } from "@/api/types";

interface VideoNode {
  id: string;
  url: string;
  title: string;
  category: "PRIMARY" | "SOCIAL FEED";
  metadata?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HighlightsPanel() {
  const { deleteHighlight, getActiveHighlights } = highlightsService;
  const queryClient = useQueryClient();

  // Modal Context Matrix Configuration
  const [modalType, setModalType] = useState<
    "MASTER" | "PRIMARY" | "FEED" | null
  >(null);

  const { data: rawResponse, isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: getActiveHighlights,
  });

  const { mutate: deleteHighlightMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4 bg-[#050607]">
        <RefreshCw size={24} className="text-kh-pink animate-spin" />
        <span className="font-condensed text-xs tracking-widest text-zinc-500 uppercase font-black">
          Synchronizing Asset Ecosystem...
        </span>
      </div>
    );
  }

  // Safe Parsing (Falls back to empty object/arrays if data is missing or invalid)
  const targetNode = Array.isArray(rawResponse) ? rawResponse[0] : undefined;
  const parentId = targetNode?._id;
  const mainVideoUrl = targetNode?.MainVideo_url;

  const primaryVideos: VideoNode[] = (targetNode?.videos || []).map(
    (vid: VideoItem, idx: number) => ({
      id: `${parentId || "empty"}-primary-${idx}`,
      url: vid.video_url,
      title: vid.video_name || `Primary Vault Clip ${idx + 1}`,
      category: "PRIMARY",
      metadata: vid.video_type || "RAW COMPILATION",
    }),
  );

  const feedVideos: VideoNode[] = (targetNode?.feedVideos || []).map(
    (feed: FeedVideoItem, idx: number) => ({
      id: `${parentId || "empty"}-feed-${idx}`,
      url: feed.video_url,
      title: feed.title || `Social Reel Capture ${idx + 1}`,
      category: "SOCIAL FEED",
      metadata: "Dynamic Stream Feed",
    }),
  );

  return (
    <div className="w-full bg-[#050607] space-y-12 text-white p-6">
      {/* MANAGEMENT HEADER TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-neutral-900/20 border border-white/5 rounded-2xl backdrop-blur-md">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide">
            Studio Engine
          </h3>
          <span className="font-condensed text-[10px] tracking-wider text-zinc-500 uppercase block mt-0.5">
            Database ID:{" "}
            {parentId
              ? parentId.slice(-8).toUpperCase()
              : "NO COLLECTION INITIALIZED"}
          </span>
        </div>

        {parentId && (
          <button
            disabled={isDeleting}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to purge this highlight collection?",
                )
              ) {
                deleteHighlightMutate(parentId);
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/20 border border-rose-500/10 hover:border-rose-500/30 text-rose-400 font-condensed text-xs font-black tracking-widest uppercase rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <Trash2 size={14} />
            {isDeleting ? "Purging..." : "Purge Collection"}
          </button>
        )}
      </div>

      {/* SECTION 1: MASTER SPOTLIGHT SHOWCASE */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        className="space-y-4"
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-kh-pink fill-kh-pink" />
            <h4 className="font-condensed text-xs font-black tracking-widest text-zinc-400 uppercase">
              Master Spotlight Showcase
            </h4>
          </div>
          <button
            onClick={() => setModalType("MASTER")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-white/10 hover:border-kh-pink text-xs uppercase font-condensed font-bold text-zinc-300 hover:text-white transition-all rounded-md cursor-pointer"
          >
            {mainVideoUrl ? (
              <Edit3 size={12} className="text-kh-pink" />
            ) : (
              <PlusCircle size={12} className="text-kh-pink" />
            )}
            {mainVideoUrl ? "Modify Master Core" : "Initialize Master Video"}
          </button>
        </div>

        {mainVideoUrl ? (
          <div className="max-w-5xl mx-auto w-full">
            <VideoCardNode
              url={mainVideoUrl}
              title="Main Hero Production Reel"
              category="MASTER"
              metadata="Primary Identity Stream Showcase"
            />
          </div>
        ) : (
          <div className="w-full py-12 rounded-xl bg-neutral-900/10 border border-white/3 flex flex-col items-center justify-center text-center">
            <AlertCircle size={20} className="text-zinc-600 mb-2" />
            <p className="text-xs font-condensed tracking-wider text-zinc-500 uppercase">
              No Master Spotlight File Configured
            </p>
          </div>
        )}
      </motion.div>

      {/* SECTION 2: PRIMARY CLUSTERS CATALOG */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-sky-400" />
            <h4 className="font-condensed text-xs font-black tracking-widest text-zinc-400 uppercase">
              Primary Media Clusters ({primaryVideos.length})
            </h4>
          </div>
          <button
            onClick={() => setModalType("PRIMARY")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-white/10 hover:border-sky-400 text-xs uppercase font-condensed font-bold text-zinc-300 hover:text-white transition-all rounded-md cursor-pointer"
          >
            {primaryVideos.length > 0 ? (
              <Edit3 size={12} className="text-sky-400" />
            ) : (
              <PlusCircle size={12} className="text-sky-400" />
            )}
            {primaryVideos.length > 0
              ? "Update Primary Media"
              : "Add Primary Media"}
          </button>
        </div>

        {primaryVideos.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {primaryVideos.map((video) => (
              <motion.div key={video.id} variants={fadeUpVariants}>
                <VideoCardNode
                  url={video.url}
                  title={video.title}
                  category={video.category}
                  metadata={video.metadata}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="w-full py-12 rounded-xl bg-neutral-900/10 border border-white/3 flex flex-col items-center justify-center text-center">
            <AlertCircle size={20} className="text-zinc-600 mb-2" />
            <p className="text-xs font-condensed tracking-wider text-zinc-500 uppercase">
              No Primary Video Bundles Registered
            </p>
          </div>
        )}
      </div>

      {/* SECTION 3: SOCIAL FEED MATRIX */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-amber-400" />
            <h4 className="font-condensed text-xs font-black tracking-widest text-zinc-400 uppercase">
              Social Feed Streams ({feedVideos.length})
            </h4>
          </div>
          <button
            onClick={() => setModalType("FEED")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-white/10 hover:border-amber-400 text-xs uppercase font-condensed font-bold text-zinc-300 hover:text-white transition-all rounded-md cursor-pointer"
          >
            {feedVideos.length > 0 ? (
              <Edit3 size={12} className="text-amber-400" />
            ) : (
              <PlusCircle size={12} className="text-amber-400" />
            )}
            {feedVideos.length > 0 ? "Update Feed Stream" : "Add Feed Stream"}
          </button>
        </div>

        {feedVideos.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {feedVideos.map((video) => (
              <motion.div key={video.id} variants={fadeUpVariants}>
                <VideoCardNode
                  url={video.url}
                  title={video.title}
                  category={video.category}
                  metadata={video.metadata}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="w-full py-12 rounded-xl bg-neutral-900/10 border border-white/[0.03] flex flex-col items-center justify-center text-center">
            <AlertCircle size={20} className="text-zinc-600 mb-2" />
            <p className="text-xs font-condensed tracking-wider text-zinc-500 uppercase">
              No Active Social Feed Streams
            </p>
          </div>
        )}
      </div>

      {/* OVERLAY MODAL FOR SPECIFIC SUBSECTION */}
      {modalType && (
        <UpgradeAssetModal
          type={modalType}
          existingData={targetNode}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
