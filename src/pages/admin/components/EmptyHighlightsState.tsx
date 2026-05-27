import { Link } from "react-router";
import { Layers, Video } from "lucide-react";
import { motion } from "motion/react";

export default function EmptyHighlightsState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto text-center"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a0d10] p-12 md:p-16 shadow-2xl backdrop-blur-md">
        {/* Ambient background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-kh-pink/4 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
          {/* Glowing icon container */}
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-kh-pink/10 border border-kh-pink/20 text-kh-pink shadow-[0_0_30px_rgba(236,72,153,0.1)]">
            <Video size={24} className="relative z-10" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kh-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-kh-pink"></span>
            </span>
          </div>

          {/* Typography */}
          <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-3">
            No Active Media Showcase Core
          </h3>
          <p className="text-zinc-400 text-xs font-light leading-relaxed mb-8">
            The database highlights cluster is currently offline or empty.
            Initialize the client-side viewer pipeline by deploying your first
            spotlight asset block.
          </p>

          {/* Action Button */}
          <Link
            to="/admin/highlights/create"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-kh-pink hover:text-white text-black font-condensed font-black tracking-widest text-xs uppercase rounded-xl transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-kh-pink/20 hover:scale-[1.02] cursor-pointer group"
          >
            <Layers
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
            Deploy Highlights Cluster
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
