import { Flame, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface SpotlightShowcaseProps {
  videoUrl: string;
}

export default function SpotlightShowcase({
  videoUrl,
}: SpotlightShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#0a0d10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group w-full"
    >
      {/* Visual lighting backdrop */}
      <div className="absolute inset-0 bg-linear-to-br from-kh-pink/3 to-transparent pointer-events-none" />

      {/* Header Accent */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-zinc-400 text-[10px] font-condensed font-black tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-kh-pink inline-block animate-ping"></span>
          Master Spotlight Showcase Core
        </h3>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-kh-pink/10 border border-kh-pink/20 text-kh-pink text-[9px] font-condensed font-black uppercase tracking-widest">
          <Flame size={10} className="fill-current animate-pulse" />
          Spotlight Active
        </div>
      </div>

      {/* Video Viewport Container */}
      <div className="relative aspect-video bg-neutral-950 rounded-2xl overflow-hidden border border-white/5 shadow-inner group/video">
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-cover relative z-10 cursor-pointer"
          poster=""
          preload="metadata"
        />

        {/* Ambient video shadow glow */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-40 z-0 pointer-events-none group-hover/video:opacity-20 transition-opacity" />
      </div>

      {/* Media Details Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 relative z-10 border-t border-white/5 pt-3">
        <span className="font-mono text-[9px] truncate max-w-[70%] text-zinc-600 bg-neutral-900/60 px-2 py-1 rounded border border-white/2">
          STREAM: {videoUrl.split("/").pop()}
        </span>
        <div className="flex items-center gap-1 text-[9px] font-condensed tracking-wider uppercase text-zinc-400">
          <Sparkles size={11} className="text-kh-pink" />
          Premium 1080p Stream
        </div>
      </div>
    </motion.div>
  );
}
