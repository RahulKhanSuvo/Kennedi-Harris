import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Film } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";

// Core Broadcast Media Assets
import mainHighlightImg from "@/assets/gallery/looking2.avif";
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MediaBroadcastCenter() {
  const [currentTrack, setCurrentTrack] = useState<PlaylistItem>(
    BROADCAST_PLAYLIST[0],
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Hot-swap stream sources securely on state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // Intersection Observer config for handling track auto-swaps via scroll heights (Desktop Only)
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index) && BROADCAST_PLAYLIST[index]) {
            setCurrentTrack(BROADCAST_PLAYLIST[index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

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
    <section className="py-16 lg:py-32 bg-black relative border-t border-white/5">
      <div className="absolute left-[-10%] top-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 w-[600px] h-[600px] bg-kh-pink/5 blur-[180px] rounded-full pointer-events-none" />

      <Container className="w-full flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <span className="font-display text-3xl lg:text-5xl text-white tracking-tighter uppercase leading-none">
            FILM ROOM <span className="text-kh-pink ">SYNC DECK</span>
          </span>
        </motion.div>

        {/* Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-8 lg:gap-12 items-start relative w-full">
          {/* STICKY CINEMA VIEWPORT MATRIX */}
          <div className="w-full lg:sticky lg:top-28 z-30 transition-all duration-300">
            <div className="flex flex-col justify-between group relative border border-white/10 bg-zinc-950 rounded overflow-hidden shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Play Circle Trigger - Hidden Completely when Playing */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-kh-pink group-hover:border-kh-pink group-hover:shadow-[0_0_50px_rgba(236,72,153,0.4)]">
                      <Play
                        fill="white"
                        className="w-6 h-6 sm:w-8 sm:h-8 ml-1 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* HUD Overlay Panel - Hidden Completely when Playing */}
                <div
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 flex items-center justify-between transition-all duration-300 z-20 ${
                    isPlaying
                      ? "opacity-0 pointer-events-none translate-y-2"
                      : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handlePlayToggle();
                      }}
                      className="text-white hover:text-kh-pink transition-colors cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white" />
                    </button>
                    <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 tracking-widest uppercase">
                      // FEED_READY_STANDBY
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/5">
                    {currentTrack.duration}
                  </span>
                </div>
              </div>

              {/* Viewport Info Control Panel Bar - Hidden Completely when Playing */}
              <div
                className={`transition-all duration-500 ease-in-out bg-zinc-950 flex items-center justify-between gap-4 overflow-hidden ${
                  isPlaying
                    ? "max-h-0 p-0 border-t-0 opacity-0"
                    : "max-h-32 p-4 sm:p-5 border-t border-white/5 opacity-100"
                }`}
              >
                <div className="min-w-0">
                  <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 uppercase">
                    {currentTrack.tag}
                  </span>
                  <h4 className="font-display text-lg sm:text-2xl tracking-tighter text-white uppercase mt-1.5 sm:mt-2 truncate">
                    {currentTrack.title}
                  </h4>
                </div>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      if (!isPlaying) handlePlayToggle();
                    }
                  }}
                  className="p-2.5 sm:p-3 rounded-xl bg-zinc-900 border border-white/5 hover:border-kh-pink/30 text-zinc-400 hover:text-kh-pink transition-all duration-300 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP PLAYLIST DISPLAY SYSTEM (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col gap-8 pb-32">
            {BROADCAST_PLAYLIST.map((item, index) => {
              const isSelected = currentTrack.id === item.id;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  onClick={() => {
                    setCurrentTrack(item);
                    setIsPlaying(false);
                  }}
                  className={`flex flex-col gap-4 p-8 rounded border transition-all duration-500 justify-center min-h-[220px] cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-br from-zinc-900/80 to-zinc-950 border-kh-pink/40 shadow-[0_10px_40px_rgba(236,72,153,0.06)] opacity-100"
                      : "bg-zinc-950/20 border-white/5 opacity-50 hover:opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-xs tracking-widest font-black ${isSelected ? "text-kh-pink" : "text-zinc-600"}`}
                    >
                      [{String(index + 1).padStart(2, "0")}] //{" "}
                      {item.id.toUpperCase()}
                    </span>
                    <div
                      className={`p-2 rounded-lg border transition-colors ${isSelected ? "border-kh-pink/20 bg-kh-pink/5 text-kh-pink" : "border-white/5 bg-zinc-900 text-zinc-500"}`}
                    >
                      <Film className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <h4
                      className={`font-display text-2xl uppercase tracking-tight transition-colors duration-300 truncate ${isSelected ? "text-white" : "text-zinc-400"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-4 border-t border-white/5 pt-4">
                    <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-1 rounded-sm">
                      {item.duration}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-1 rounded-sm ${isSelected ? "bg-cyan-500/10 text-cyan-400" : "bg-zinc-900 text-zinc-500"}`}
                    >
                      {item.tag.split(" ")[0]} TAPE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE VIDEO THUMBNAIL TRACKS (Hidden on Desktop) */}
          <div
            className={`block lg:hidden transition-all duration-500 transform w-full ${
              isPlaying
                ? "opacity-0 pointer-events-none translate-y-6 max-h-0 overflow-hidden"
                : "opacity-100 max-h-[350px] mt-2"
            }`}
          >
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-black pl-1 block mb-3">
              SELECT ARCHIVE TRACK FEED:
            </span>

            <div className="flex flex-row gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar w-full">
              {BROADCAST_PLAYLIST.map((item, index) => {
                const isSelected = currentTrack.id === item.id;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentTrack(item);
                      setIsPlaying(false);
                    }}
                    className={`snap-center shrink-0 w-[260px] bg-zinc-950 border rounded overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-kh-pink scale-[0.98] shadow-[0_0_25px_rgba(236,72,153,0.15)]"
                        : "border-white/10 opacity-50"
                    }`}
                  >
                    {/* Thumbnail Video Engine */}
                    <div className="w-full h-[130px] bg-black relative overflow-hidden group">
                      <video
                        className="w-full h-full object-cover opacity-60"
                        preload="metadata"
                        muted
                        playsInline
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`p-2 rounded-full backdrop-blur-sm border ${isSelected ? "bg-kh-pink border-kh-pink text-white" : "bg-black/40 border-white/20 text-white"}`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 font-mono text-[9px] bg-black/70 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded">
                        {item.duration}
                      </span>
                    </div>

                    {/* Micro Info Text Bar */}
                    <div className="p-3 bg-zinc-950 border-t border-white/5">
                      <h5
                        className={`font-display text-sm tracking-tight truncate uppercase ${isSelected ? "text-white font-bold" : "text-zinc-400"}`}
                      >
                        {item.title}
                      </h5>
                      <span className="font-mono text-[9px] text-cyan-400 font-bold block mt-0.5">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
