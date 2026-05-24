import { useState, useRef, useEffect, type MouseEvent } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";

// Core Broadcast Media Assets
import mainHighlightImg from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import video1 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video2 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";
import video3 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video4 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";

interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  tag: string;
}

const BROADCAST_PLAYLIST: PlaylistItem[] = [
  {
    id: "reel-01",
    title: "vs. Team Elite",
    subtitle: "Atlanta, GA // Live Feed",
    duration: "3:45",
    videoUrl: video1,
    tag: "SCORING TAPE",
  },
  {
    id: "reel-02",
    title: "AAU Championship Highlights",
    subtitle: "Tournament Run // Finals",
    duration: "4:12",
    videoUrl: video2,
    tag: "CHAMPIONSHIP",
  },
  {
    id: "reel-03",
    title: "Shot Blocking Highlights",
    subtitle: "Defense Showcase // Rim Protection",
    duration: "2:58",
    videoUrl: video3,
    tag: "DEFENSIVE TAPE",
  },
  {
    id: "reel-04",
    title: "Full Game vs. Georgia Stars",
    subtitle: "Regular Season // Broadcast Reel",
    duration: "16:24",
    videoUrl: video4,
    tag: "FULL GAME TAPE",
  },
];

// Motion Animation Profiles with Explicit Variants Typing to fix cubic-bezier inference errors
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const playlistContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const playlistItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MediaBroadcastCenter() {
  const [currentTrack, setCurrentTrack] = useState<PlaylistItem>(
    BROADCAST_PLAYLIST[0],
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack]);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 w-[500px] h-[500px] bg-kh-pink/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="w-full flex flex-col gap-12">
        {/* Animated Header Matrix */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-kh-pink rotate-45 animate-pulse" />
            <h3 className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase font-black">
              BROADCAST LOG // FILM ANALYTICS
            </h3>
          </div>
          <span className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none">
            GAME TAPE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink to-cyan-400">
              FILM ROOM
            </span>
          </span>
        </motion.div>

        {/* Layout Grid container with coordinated entry states */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {/* Main Cinema Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-between group relative border border-white/10 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
          >
            <div
              onClick={handlePlayToggle}
              className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center cursor-pointer"
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                preload="metadata"
                playsInline
                poster={mainHighlightImg}
              >
                <source src={currentTrack.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-kh-pink group-hover:border-kh-pink group-hover:shadow-[0_0_50px_rgba(236,72,153,0.4)]">
                    <Play fill="white" className="w-8 h-8 ml-1 text-white" />
                  </div>
                </div>
              )}

              {/* HUD Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handlePlayToggle();
                    }}
                    className="text-white hover:text-kh-pink transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white" />
                    )}
                  </button>
                  <span className="font-mono text-[11px] text-zinc-400 tracking-widest">
                    {isPlaying ? "// LIVE TRANSMISSION" : "// BROADCAST PAUSED"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/5">
                    {currentTrack.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Viewport Metadata Card */}
            <div className="p-6 bg-zinc-950 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[9px] tracking-widest text-kh-pink font-bold border border-kh-pink/20 bg-kh-pink/5 px-2 py-0.5 uppercase">
                    {currentTrack.tag}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 font-semibold tracking-wider">
                    // SYSTEM_FEED_ACTIVE
                  </span>
                </div>
                <h4 className="font-display text-2xl lg:text-3xl tracking-tighter text-white uppercase leading-none">
                  {currentTrack.title}
                </h4>
                <p className="text-zinc-400 font-condensed text-xs uppercase tracking-widest mt-2">
                  {currentTrack.subtitle}
                </p>
              </div>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    if (!isPlaying) handlePlayToggle();
                  }
                }}
                className="p-3 rounded-xl bg-zinc-900 border border-white/5 hover:border-cyan-400/30 text-zinc-400 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Sidebar Area with Cascading List Items */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={playlistContainer}
            className="lg:col-span-4 flex flex-col bg-zinc-950 border border-white/10 rounded-2xl p-5 justify-between gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3.5 flex-grow justify-start">
              <span className="font-mono text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">
                // SELECT ARCHIVE SOURCE:
              </span>

              {BROADCAST_PLAYLIST.map((item) => {
                const isSelected = currentTrack.id === item.id;
                return (
                  <motion.div
                    variants={playlistItem}
                    key={item.id}
                    onClick={() => {
                      setCurrentTrack(item);
                      setIsPlaying(true);
                    }}
                    className={`group/item flex items-center gap-4 p-3 rounded-xl border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? "bg-kh-pink/5 border-kh-pink/30 shadow-[0_0_25px_rgba(236,72,153,0.05)]"
                        : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-80 group-hover/item:opacity-100 transition-opacity">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-xs transition-all duration-300 ${
                            isSelected
                              ? "bg-kh-pink border-kh-pink text-white"
                              : "border-white/20 bg-black/50 group-hover/item:bg-cyan-400 group-hover/item:border-cyan-400"
                          }`}
                        >
                          <Play
                            fill="white"
                            className="w-3 h-3 ml-0.5 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                      <span
                        className={`font-mono text-[8px] tracking-widest font-black ${isSelected ? "text-kh-pink" : "text-zinc-500"}`}
                      >
                        {item.id.toUpperCase()}
                      </span>
                      <h5
                        className={`font-condensed font-black text-sm uppercase tracking-wide truncate transition-colors duration-300 ${
                          isSelected
                            ? "text-white"
                            : "text-zinc-300 group-hover/item:text-cyan-400"
                        }`}
                      >
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-zinc-500 font-medium font-condensed tracking-wider uppercase truncate">
                        {item.tag}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 group-hover/item:text-white transition-colors shrink-0 self-center pl-2">
                      {item.duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="w-full bg-zinc-900/60 border border-white/5 p-4 rounded-xl font-mono text-[10px] text-zinc-500 tracking-wide uppercase leading-relaxed">
              <span className="text-cyan-400 font-bold">
                // ANALYTICS UNIT READY
              </span>{" "}
              <br />
              Tap any tactical source file from the archive array to hot-swap
              live frame synchronization instantly.
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
