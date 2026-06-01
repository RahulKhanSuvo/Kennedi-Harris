"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Film, Maximize, Minimize } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";

import mainHighlightImg from "@/assets/gallery/looking2.avif";
import video1 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video2 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";
import video3 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video4 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";

interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  tag: string;
}

const BROADCAST_PLAYLIST: PlaylistItem[] = [
  {
    id: "reel-01",
    title: "vs. Team Elite",
    subtitle: "Atlanta, GA // Live Feed",
    videoUrl: video1,
    tag: "SCORING TAPE",
  },
  {
    id: "reel-02",
    title: "AAU Championship Highlights",
    subtitle: "Tournament Run // Finals",
    videoUrl: video2,
    tag: "CHAMPIONSHIP",
  },
  {
    id: "reel-03",
    title: "Shot Blocking Highlights",
    subtitle: "Defense Showcase // Rim Protection",
    videoUrl: video3,
    tag: "DEFENSIVE TAPE",
  },
  {
    id: "reel-04",
    title: "Full Game vs. Georgia Stars",
    subtitle: "Regular Season // Broadcast Reel",
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

const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function MediaBroadcastCenter() {
  const [currentTrack, setCurrentTrack] = useState<PlaylistItem>(
    BROADCAST_PLAYLIST[0],
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [desktopProgress, setDesktopProgress] = useState<number>(0);
  const [desktopCurrentTime, setDesktopCurrentTime] = useState<string>("0:00");
  const [desktopTotalDuration, setDesktopTotalDuration] =
    useState<string>("0:00");

  const [mobileProgress, setMobileProgress] = useState<{
    [key: string]: number;
  }>({});
  const [mobileCurrentTimes, setMobileCurrentTimes] = useState<{
    [key: string]: string;
  }>({});
  const [mobileDurations, setMobileDurations] = useState<{
    [key: string]: string;
  }>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const mobileVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>(
    {},
  );
  const mobileContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>(
    {},
  );

  // Sync state if user exits fullscreen using native ESC key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // ⚡ FIX: Sync the video stream playback play/pause state safely without running state mutations inside the render loop
  useEffect(() => {
    if (window.innerWidth >= 1024 && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  // Desktop Intersection Observer
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
            // Reset local variables during interaction transition instead of secondary side effects
            setDesktopCurrentTime("0:00");
            setDesktopProgress(0);
            setDesktopTotalDuration("0:00");

            setCurrentTrack(BROADCAST_PLAYLIST[index]);
            if (videoRef.current) {
              videoRef.current.load();
            }
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

  const handleDesktopMetadataLoaded = () => {
    if (videoRef.current) {
      setDesktopTotalDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleDesktopTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setDesktopCurrentTime(formatTime(current));
      setDesktopProgress((current / duration) * 100);
    }
  };

  const handleDesktopScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const newTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setDesktopProgress(Number(e.target.value));
    }
  };

  const handleMobileMetadataLoaded = (id: string) => {
    const targetVid = mobileVideoRefs.current[id];
    if (targetVid) {
      setMobileDurations((prev) => ({
        ...prev,
        [id]: formatTime(targetVid.duration),
      }));
    }
  };

  const handleMobileTimeUpdate = (id: string) => {
    const targetVid = mobileVideoRefs.current[id];
    if (targetVid && targetVid.duration) {
      const current = targetVid.currentTime;
      const duration = targetVid.duration;

      setMobileCurrentTimes((prev) => ({ ...prev, [id]: formatTime(current) }));
      setMobileProgress((prev) => ({
        ...prev,
        [id]: (current / duration) * 100,
      }));
    }
  };

  const handleMobileScrub = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const targetVid = mobileVideoRefs.current[id];
    if (targetVid && targetVid.duration) {
      const newTime = (Number(e.target.value) / 100) * targetVid.duration;
      targetVid.currentTime = newTime;
      setMobileProgress((prev) => ({ ...prev, [id]: Number(e.target.value) }));
    }
  };

  const handleDesktopPlayToggle = () => {
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

  const toggleDesktopFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!desktopContainerRef.current) return;

    if (!document.fullscreenElement) {
      desktopContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleMobilePlayToggle = (id: string) => {
    const targetVideo = mobileVideoRefs.current[id];
    if (!targetVideo) return;

    if (activeMobileId === id) {
      targetVideo.pause();
      setActiveMobileId(null);
    } else {
      if (activeMobileId && mobileVideoRefs.current[activeMobileId]) {
        mobileVideoRefs.current[activeMobileId]?.pause();
      }
      targetVideo
        .play()
        .then(() => setActiveMobileId(id))
        .catch(() => setActiveMobileId(null));
    }
  };

  const toggleMobileFullscreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const targetContainer = mobileContainerRefs.current[id];
    if (!targetContainer) return;

    if (!document.fullscreenElement) {
      targetContainer.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative border-t border-white/5">
      <div className="absolute left-[-10%] top-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/5 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-kh-pink/5 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />

      <Container className="w-full flex flex-col gap-8 md:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-row items-end justify-between border-b border-white/10 pb-6"
        >
          <span className="font-display text-2xl sm:text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none">
            FILM ROOM <span className="text-kh-pink">SYNC DECK</span>
          </span>
        </motion.div>

        {/* ========================================== */}
        {/* 💻 DESKTOP LAYOUT */}
        {/* ========================================== */}
        <div className="hidden lg:flex flex-row gap-12 items-start relative w-full">
          <div className="w-full lg:w-[58%] lg:sticky lg:top-28 z-30 transition-all duration-300">
            <div
              ref={desktopContainerRef}
              className="flex flex-col justify-between group relative border border-white/10 bg-zinc-950 rounded overflow-hidden shadow-2xl w-full"
            >
              <div
                onClick={handleDesktopPlayToggle}
                className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center cursor-pointer"
              >
                <video
                  ref={videoRef}
                  onLoadedMetadata={handleDesktopMetadataLoaded}
                  onTimeUpdate={handleDesktopTimeUpdate}
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

                {/* HUD Overlay Panel */}
                <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div
                    className="w-full flex items-center group/timeline px-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={desktopProgress}
                      onChange={handleDesktopScrub}
                      className="w-full h-1 bg-white/20 accent-kh-pink rounded-lg appearance-none cursor-pointer outline-none transition-all group-hover/timeline:h-1.5"
                      style={{
                        background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${desktopProgress}%, rgba(255,255,255,0.2) ${desktopProgress}%, rgba(255,255,255,0.2) 100%)`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleDesktopPlayToggle();
                        }}
                        className="text-white hover:text-kh-pink transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white" />
                        )}
                      </button>
                      <span className="font-mono text-[11px] text-zinc-400 tracking-widest animate-pulse">
                        {isPlaying
                          ? "// STREAM_SYNC_ACTIVE"
                          : "// FEED_READY_STANDBY"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 rounded-sm border border-white/5 tracking-wider">
                        {desktopCurrentTime} / {desktopTotalDuration}
                      </span>
                      <button
                        onClick={toggleDesktopFullscreen}
                        className="text-white hover:text-kh-pink transition-colors cursor-pointer"
                      >
                        {isFullscreen ? (
                          <Minimize className="w-4 h-4" />
                        ) : (
                          <Maximize className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-zinc-950 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 uppercase">
                    {currentTrack.tag}
                  </span>
                  <h4 className="font-display text-xl lg:text-2xl tracking-tighter text-white uppercase mt-2 truncate">
                    {currentTrack.title}
                  </h4>
                </div>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      if (!isPlaying) handleDesktopPlayToggle();
                    }
                  }}
                  className="p-3 rounded-xl bg-zinc-900 border border-white/5 hover:border-kh-pink/30 text-zinc-400 hover:text-kh-pink transition-all duration-300 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COMPONENT */}
          <div className="w-full lg:w-[42%] flex flex-col gap-8 pb-32">
            {BROADCAST_PLAYLIST.map((item, index) => {
              const isSelected = currentTrack.id === item.id;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className={`flex flex-col gap-4 p-6 md:p-8 rounded border transition-all duration-500 min-h-[220px] justify-center ${
                    isSelected
                      ? "bg-linear-to-br from-zinc-900/80 to-zinc-950 border-kh-pink/40 shadow-[0_10px_40px_rgba(236,72,153,0.06)]"
                      : "bg-zinc-950/20 border-white/5 opacity-40 lg:hover:opacity-70"
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

                  <div className="flex flex-col gap-1.5 mt-2">
                    <h4
                      className={`font-display text-2xl uppercase tracking-tight transition-colors duration-300 ${isSelected ? "text-white" : "text-zinc-400"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-4 border-t border-white/5 pt-4">
                    <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-1 rounded-sm">
                      TRACK ID: {item.id}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-1 rounded-sm ${isSelected ? "bg-cyan-500/10 text-cyan-400" : "bg-zinc-900 text-zinc-500"}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* 📱 MOBILE LAYOUT */}
        {/* ========================================== */}
        <div className="flex flex-col gap-8 lg:hidden w-full">
          {BROADCAST_PLAYLIST.map((item, index) => {
            const isSelfPlaying = activeMobileId === item.id;
            const currentMobileTime = mobileCurrentTimes[item.id] || "0:00";
            const totalMobileDuration = mobileDurations[item.id] || "0:00";
            const currentMobilePercent = mobileProgress[item.id] || 0;

            return (
              <div
                key={`mobile-${item.id}`}
                ref={(el) => {
                  mobileContainerRefs.current[item.id] = el;
                }}
                className="flex flex-col bg-zinc-950 border border-white/5 rounded overflow-hidden shadow-xl w-full"
              >
                <div
                  onClick={() => handleMobilePlayToggle(item.id)}
                  className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center cursor-pointer"
                >
                  <video
                    ref={(el) => {
                      mobileVideoRefs.current[item.id] = el;
                    }}
                    onLoadedMetadata={() => handleMobileMetadataLoaded(item.id)}
                    onTimeUpdate={() => handleMobileTimeUpdate(item.id)}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    poster={mainHighlightImg}
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                  {!isSelfPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <Play
                          fill="white"
                          className="w-5 h-5 ml-0.5 text-white"
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute bottom-10 inset-x-0 px-3 z-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentMobilePercent}
                      onChange={(e) => handleMobileScrub(item.id, e)}
                      className="w-full h-1 bg-white/25 accent-kh-pink rounded-lg appearance-none cursor-pointer outline-none"
                      style={{
                        background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${currentMobilePercent}%, rgba(255,255,255,0.2) ${currentMobilePercent}%, rgba(255,255,255,0.2) 100%)`,
                      }}
                    />
                  </div>

                  <span className="absolute bottom-3 right-3 font-mono text-[10px] bg-black/80 text-white px-2 py-0.5 rounded border border-white/10 tracking-wide">
                    {currentMobileTime} /{" "}
                    {totalMobileDuration === "0:00"
                      ? "..."
                      : totalMobileDuration}
                  </span>

                  <button
                    onClick={(e) => toggleMobileFullscreen(item.id, e)}
                    className="absolute bottom-3 left-3 p-2 rounded bg-black/70 border border-white/10 text-white cursor-pointer z-20"
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>

                  <span className="absolute top-3 right-3 font-mono text-[8px] text-zinc-400 tracking-wider bg-black/60 border border-white/5 px-2 py-1 rounded">
                    CH_{String(index + 1).padStart(2, "0")} // FILM
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold bg-cyan-400/5 border border-cyan-400/20 px-2 py-0.5 uppercase rounded">
                        {item.tag}
                      </span>
                      <h4 className="font-display text-xl tracking-tight text-white uppercase mt-2">
                        {item.title}
                      </h4>
                      <p className="text-zinc-500 font-sans text-xs mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const targetVid = mobileVideoRefs.current[item.id];
                        if (targetVid) {
                          targetVid.currentTime = 0;
                          if (!isSelfPlaying) handleMobilePlayToggle(item.id);
                        }
                      }}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 active:text-kh-pink"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
