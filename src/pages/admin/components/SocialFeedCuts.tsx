import { Radio } from "lucide-react";
import { motion } from "motion/react";
import type { FeedVideoItem } from "@/api/types";

interface SocialFeedCutsProps {
  feedVideos: FeedVideoItem[];
}

export default function SocialFeedCuts({ feedVideos }: SocialFeedCutsProps) {
  if (!feedVideos || feedVideos.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Section Header Accent */}
      <div className="flex items-center gap-2 text-amber-400">
        <Radio size={14} className="animate-pulse" />
        <h4 className="font-condensed text-xs font-black tracking-widest uppercase">
          Social Feed Raw Cuts ({feedVideos.length})
        </h4>
      </div>

      {/* Vertical Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {feedVideos.map((feed, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.05 + 0.15, duration: 0.3 }}
            key={idx}
            className="bg-[#0a0d10] border border-white/5 rounded-2xl p-4 relative overflow-hidden group shadow-xl hover:border-white/10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Ambient amber backdrop glow */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/1 to-transparent pointer-events-none" />

            <div>
              {/* Header: Title and Reel Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-display text-xs uppercase tracking-wide text-white font-bold truncate">
                  {feed.title || "Social Reel Cut"}
                </span>
                <span className="shrink-0 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/20 text-amber-400 font-condensed text-[7px] font-black uppercase tracking-widest">
                  SOCIAL CUT
                </span>
              </div>

              {/* Vertical Video aspect ratio (9:16) */}
              <div className="relative aspect-9/16 bg-neutral-950 rounded-xl overflow-hidden border border-white/5 group/reel shadow-inner">
                <video
                  src={feed.video_url}
                  controls
                  loop
                  className="w-full h-full object-cover relative z-10 cursor-pointer"
                  preload="metadata"
                />
                {/* Visual shade overlays */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/55 to-transparent pointer-events-none z-0" />
              </div>
            </div>

            {/* Video Footer Metadata */}
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[7px] font-mono text-zinc-600">
              <span className="truncate max-w-[75%]">
                STREAM: {feed.video_url.split("/").pop()}
              </span>
              <span className="text-amber-500/80 font-condensed font-black tracking-widest uppercase">
                cut_{idx + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
