"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Film, Maximize, Minimize } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import type { HighlightData, HighlightVideo } from "@/types";

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

export default function MediaBroadcastCenter({
  highlights,
  isLoading,
}: {
  highlights: HighlightData | null;
  isLoading: boolean;
}) {
  const [selectedTrack, setSelectedTrack] = useState<HighlightVideo | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [desktopProgress, setDesktopProgress] = useState<number>(0);
  const [desktopCurrentTime, setDesktopCurrentTime] = useState<string>("0:00");
  const [desktopTotalDuration, setDesktopTotalDuration] =
    useState<string>("0:00");

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

  const currentTrack =
    selectedTrack ||
    (highlights?.videos && highlights.videos.length > 0
      ? highlights.videos[0]
      : null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024 && videoRef.current && currentTrack) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (window.innerWidth < 1024 || !highlights?.videos) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index) && highlights.videos[index]) {
            setDesktopCurrentTime("0:00");
            setDesktopProgress(0);
            setDesktopTotalDuration("0:00");

            setSelectedTrack(highlights.videos[index]);
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
  }, [highlights?.videos]);

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
      setMobileCurrentTimes((prev) => ({ ...prev, [id]: formatTime(current) }));
    }
  };

  const handleDesktopPlayToggle = () => {
    if (!videoRef.current) return;

    if (activeMobileId && mobileVideoRefs.current[activeMobileId]) {
      mobileVideoRefs.current[activeMobileId]?.pause();
      setActiveMobileId(null);
    }

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

    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

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

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative border-t border-white/5">
      {/* <div className="absolute left-[-10%] top-1/4 w-[100px] md:w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/5 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 w-[100px] md:w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-pink-500/5 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" /> */}

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
            {isLoading || !currentTrack ? (
              <div className="w-full aspect-video border border-white/5 bg-zinc-950/40 rounded overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="w-full h-full bg-white/5 animate-pulse" />
              </div>
            ) : (
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
                    preload="auto"
                    key={currentTrack.video_url}
                    playsInline
                  >
                    <source src={currentTrack.video_url} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-kh-pink group-hover:border-kh-pink group-hover:shadow-[0_0_50px_rgba(236,72,153,0.4)]">
                        <Play
                          fill="white"
                          className="w-8 h-8 ml-1 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* HUD Controls Overlay */}
                  <div
                    className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full flex items-center group/timeline px-1">
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
                          onClick={handleDesktopPlayToggle}
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
                      {currentTrack.video_type}
                    </span>
                    <h4 className="font-display text-xl lg:text-2xl tracking-tighter text-white uppercase mt-2 truncate">
                      {currentTrack.video_name}
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
            )}
          </div>

          {/* DESKTOP SIDEBAR TRACK LIST */}
          <div className="w-full lg:w-[42%] flex flex-col gap-8 pb-32">
            {isLoading || !highlights?.videos
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`desktop-skeleton-${index}`}
                    className="flex flex-col gap-4 p-6 md:p-8 rounded border border-white/5 bg-zinc-950/40 min-h-[220px] justify-center"
                  >
                    <div className="w-full h-full bg-white/5 animate-pulse min-h-[140px] rounded" />
                  </div>
                ))
              : highlights.videos.map((item, index) => {
                  const isSelected = currentTrack?._id === item._id;
                  return (
                    <div
                      key={item._id}
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
                          {item.video_name}
                        </h4>
                        <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest">
                          {item.video_type}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-4 border-t border-white/5 pt-4">
                        <span
                          className={`font-mono text-[10px] px-2 py-1 rounded-sm ${isSelected ? "bg-cyan-500/10 text-cyan-400" : "bg-zinc-900 text-zinc-500"}`}
                        >
                          {item.video_type}
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
        <div className="flex flex-col gap-6 lg:hidden w-full">
          {isLoading || !highlights?.videos
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`mobile-skeleton-${index}`}
                  className="flex flex-col bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-xl w-full aspect-video"
                >
                  <div className="w-full h-full bg-white/5 animate-pulse" />
                </div>
              ))
            : highlights.videos.map((item, index) => {
                const isSelfPlaying = activeMobileId === item._id;
                const currentMobileTime =
                  mobileCurrentTimes[item._id] || "0:00";
                const totalMobileDuration = mobileDurations[item._id] || "0:00";

                return (
                  <div
                    key={`mobile-${item._id}`}
                    ref={(el) => {
                      mobileContainerRefs.current[item._id] = el;
                    }}
                    className="flex flex-col bg-zinc-950 border border-white/5 rounded overflow-hidden shadow-xl w-full relative"
                  >
                    <div
                      onClick={() => handleMobilePlayToggle(item._id)}
                      className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <video
                        ref={(el) => {
                          mobileVideoRefs.current[item._id] = el;
                        }}
                        onLoadedMetadata={() =>
                          handleMobileMetadataLoaded(item._id)
                        }
                        onTimeUpdate={() => handleMobileTimeUpdate(item._id)}
                        className="w-full h-full object-cover"
                        preload="auto"
                        playsInline
                      >
                        <source src={item.video_url} type="video/mp4" />
                      </video>

                      {/* Ambient Gradient Base Coating */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

                      {/* 🎬 HUD PANEL OVERLAY (Slides out completely when playing) */}
                      <div
                        className={`absolute inset-0 p-4 flex flex-col justify-between z-20 backdrop-blur-[2px] bg-black/20 transition-all duration-500 ease-[0.16,1,0.3,1] ${
                          isSelfPlaying
                            ? "opacity-0 scale-98 pointer-events-none"
                            : "opacity-100 scale-100"
                        }`}
                      >
                        {/* Upper Track Badge Meta */}
                        <div className="flex justify-between items-center w-full">
                          <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 uppercase rounded">
                            {item.video_type}
                          </span>
                          <span className="font-mono text-[8px] text-zinc-400 tracking-wider bg-black/60 border border-white/5 px-2 py-1 rounded">
                            CH_{String(index + 1).padStart(2, "0")} // FILM
                          </span>
                        </div>

                        {/* Mid-Lower Title Layout Area */}
                        <div className="mb-12">
                          <h4 className="font-display text-lg sm:text-xl tracking-tight text-white uppercase drop-shadow-md">
                            {item.video_name}
                          </h4>
                          <span className="font-condensed text-[10px] text-zinc-400 tracking-widest uppercase block mt-0.5">
                            Broadcast Stream Module
                          </span>
                        </div>
                      </div>

                      {/* Central Play/Pause Indicator Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div
                          className={`w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
                            isSelfPlaying
                              ? "opacity-0 scale-75"
                              : "opacity-100 scale-100"
                          }`}
                        >
                          <Play
                            fill="white"
                            className="w-5 h-5 ml-0.5 text-white"
                          />
                        </div>
                      </div>

                      {/* 🎚️ CONTROL BUTTONS BAR (Only visible when paused) */}
                      <div
                        className={`absolute bottom-4 inset-x-0 px-4 flex justify-between items-center z-30 transition-all duration-500 ease-[0.16,1,0.3,1] ${
                          isSelfPlaying
                            ? "opacity-0 translate-y-2 pointer-events-none"
                            : "opacity-100 translate-y-0"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="font-mono text-[10px] bg-black/80 text-white px-2 py-1 rounded border border-white/10 tracking-wide">
                          {currentMobileTime} /{" "}
                          {totalMobileDuration === "0:00"
                            ? "..."
                            : totalMobileDuration}
                        </span>
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
