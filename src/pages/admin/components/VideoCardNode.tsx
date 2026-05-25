import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Flame, Film, Star } from "lucide-react";
import { motion } from "motion/react";

interface VideoCardNodeProps {
  url: string;
  title: string;
  category: "MASTER" | "PRIMARY" | "SOCIAL FEED";
  metadata?: string;
}

export default function VideoCardNode({
  url,
  title,
  category,
  metadata,
}: VideoCardNodeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted to allow safe concurrent grid playback

  const handlePlaybackToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current
        .play()
        .catch((err) => console.warn("Stream playback interrupted:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="group relative w-full aspect-video rounded-2xl bg-neutral-900/20 border border-white/5 overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
      {/* Underlying Video Stream */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          loop
          playsInline
          muted={isMuted}
        />
        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050607] via-transparent to-black/40 z-10 pointer-events-none" />
      </div>

      {/* Top Interface Bar */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-condensed font-black tracking-widest text-[9px] uppercase border ${
            category === "MASTER"
              ? "bg-kh-pink/10 border-kh-pink/30 text-kh-pink"
              : category === "PRIMARY"
                ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}
        >
          {category === "MASTER" && <Star size={10} className="fill-current" />}
          {category === "PRIMARY" && <Film size={10} />}
          {category === "SOCIAL FEED" && <Flame size={10} />}
          {category}
        </span>

        {/* Mute Control - Visible when stream is active */}
        {isPlaying && (
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer backdrop-blur-xs"
          >
            {isMuted ? (
              <VolumeX size={13} />
            ) : (
              <Volume2 size={13} className="text-kh-pink animate-pulse" />
            )}
          </button>
        )}
      </div>

      {/* Center Micro-Interaction Trigger Layer */}
      <div
        onClick={handlePlaybackToggle}
        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isPlaying
              ? "opacity-0 group-hover:opacity-100 bg-black/40 text-white backdrop-blur-md border border-white/10"
              : "opacity-100 bg-white text-black group-hover:bg-kh-pink group-hover:text-white"
          }`}
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </motion.div>
      </div>

      {/* Metadata Lower Text Deck */}
      <div className="relative z-20 p-4 mt-auto bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <h4 className="font-display text-sm text-white uppercase tracking-wide truncate group-hover:text-kh-pink transition-colors duration-300">
          {title || "Untitled Sequence"}
        </h4>
        {metadata && (
          <span className="font-condensed text-[10px] text-zinc-500 tracking-wider uppercase block mt-0.5">
            {metadata}
          </span>
        )}
      </div>
    </div>
  );
}
