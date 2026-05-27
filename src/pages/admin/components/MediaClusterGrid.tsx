import { Film } from "lucide-react";
import { motion } from "motion/react";
import type { VideoItem } from "@/api/types";

interface MediaClusterGridProps {
  videos: VideoItem[];
}

export default function MediaClusterGrid({ videos }: MediaClusterGridProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Section Header Accent */}
      <div className="flex items-center gap-2 text-sky-400">
        <Film size={14} className="animate-pulse" />
        <h4 className="font-condensed text-xs font-black tracking-widest uppercase">
          Primary Media Clusters ({videos.length})
        </h4>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
            key={idx}
            className="bg-[#0a0d10] border border-white/5 rounded-2xl p-5 relative overflow-hidden group shadow-xl hover:border-white/10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual shine overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/1 to-transparent pointer-events-none" />

            <div>
              {/* Header: Name and Type Tag */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="font-display text-sm uppercase tracking-wide text-white font-bold truncate pr-2">
                  {vid.video_name || "Untitled Cluster"}
                </span>
                <span className="shrink-0 px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/20 text-sky-400 font-condensed text-[8px] font-black uppercase tracking-widest">
                  {vid.video_type || "RAW STREAM"}
                </span>
              </div>

              {/* HTML5 video element container */}
              <div className="relative aspect-video bg-neutral-950 rounded-xl overflow-hidden border border-white/5 group/player shadow-inner">
                <video
                  src={vid.video_url}
                  controls
                  className="w-full h-full object-cover relative z-10 cursor-pointer"
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none z-0" />
              </div>
            </div>

            {/* Video Footer Metadata */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-zinc-600">
              <span className="truncate max-w-[80%]">
                SRC: {vid.video_url.split("/").pop()}
              </span>
              <span className="text-sky-500/80 uppercase font-condensed font-black tracking-widest">
                node_{idx + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
