"use client";

import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { HighlightData } from "@/types";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function HighlightsSkeleton() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch animate-pulse">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="h-4 w-44 bg-zinc-800 rounded-sm" />
        <div className="relative w-full aspect-video bg-neutral-900 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-10 border-l-zinc-700 ml-1" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col justify-between gap-4 lg:pt-9">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={`vid-skel-${idx}`}
              className="flex gap-4 p-2 border border-transparent rounded-lg"
            >
              <div className="w-28 sm:w-32 aspect-video bg-neutral-900 border border-white/5 rounded-md shrink-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-zinc-800" />
              </div>
              <div className="flex flex-col justify-center gap-2 flex-1">
                <div className="h-3 w-full bg-zinc-800 rounded-xs" />
                <div className="h-3 w-2/3 bg-zinc-800 rounded-xs" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-10 w-full bg-neutral-900 border border-white/5 rounded-md" />
      </div>
    </div>
  );
}

export default function HighlightsSection({
  highlights,
  isLoading,
}: {
  highlights: HighlightData | null;
  isLoading?: boolean;
}) {
  const videosList = highlights?.videos?.slice(0, 3) || [];

  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const currentVideo = selectedVideo || videosList[0]?.video_url || "";

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sidebarVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Centralized play/pause helper synced securely with React's render cycles
  const syncPlaybackState = (shouldPlay: boolean) => {
    if (!videoRef.current) return;

    if (shouldPlay) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 💡 REMOVED: The global useEffect that forced autoplay on layout mounts has been deleted.

  if (isLoading || !highlights || videosList.length === 0) {
    return <HighlightsSkeleton />;
  }

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    const isPaused = videoRef.current.paused;
    syncPlaybackState(isPaused);
  };

  const handleSidebarClick = (videoSrc: string) => {
    if (currentVideo === videoSrc) {
      handlePlayPause();
      return;
    }

    // 💡 1. Update the state track target
    setSelectedVideo(videoSrc);

    // 💡 2. Explicitly play immediately because this was triggered by a real user interaction click event
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      syncPlaybackState(true);
    }
  };

  const handleSidebarHover = (index: number, isHovering: boolean) => {
    const video = sidebarVideoRefs.current[index];
    if (!video) return;

    if (isHovering) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch"
    >
      {/* Main Theatre Player Display Platform */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <h3 className="font-condensed font-semibold text-base xl:text-xl tracking-widest text-white uppercase">
          LATEST HIGHLIGHTS
        </h3>

        <div
          onClick={handlePlayPause}
          className="relative w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
        >
          <video
            ref={videoRef}
            src={currentVideo}
            key={currentVideo}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            loop
            playsInline
            preload="auto"
          />

          {/* Overlay Container */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isPlaying ? [1, 0.95, 1] : 1,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-xs hover:bg-kh-pink/20 hover:border-kh-pink text-white hover:text-kh-pink transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause size={28} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="ml-1.5"
                  >
                    <Play size={28} fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Playlist Strip Deck Controller */}
      <div className="w-full lg:w-1/3 flex flex-col justify-between gap-4 lg:pt-9">
        <div className="flex flex-col gap-3 max-h-[380px] overflow-hidden pr-1 custom-scrollbar">
          {videosList.map((item, index) => {
            const isActive = currentVideo === item.video_url;
            return (
              <motion.div
                layout
                variants={itemVariants}
                key={`${item.video_type}-${index}`}
                onClick={() => handleSidebarClick(item.video_url)}
                onMouseEnter={() => handleSidebarHover(index, true)}
                onMouseLeave={() => handleSidebarHover(index, false)}
                whileHover={{ x: 4 }}
                className={`flex gap-4 p-2 rounded-lg cursor-pointer transition-all duration-300 border group ${
                  isActive
                    ? "bg-white/5 border-kh-pink/40 shadow-lg shadow-kh-pink/2"
                    : "border-transparent bg-transparent hover:bg-white/3"
                }`}
              >
                {/* Micro Preview Node Window */}
                <div className="relative w-28 sm:w-32 aspect-video bg-neutral-900 rounded-md overflow-hidden shrink-0 border border-white/5">
                  <video
                    ref={(el) => {
                      sidebarVideoRefs.current[index] = el;
                    }}
                    src={item.video_url}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        backgroundColor: isActive
                          ? "rgba(234, 76, 137, 1)"
                          : "rgba(0, 0, 0, 0.6)",
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                        isActive
                          ? "border-kh-pink"
                          : "border-white/40 group-hover:border-kh-pink"
                      }`}
                    >
                      <Play
                        className="text-white ml-0.5"
                        size={10}
                        fill="currentColor"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Metadata Meta Strip Titles */}
                <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-sans font-semibold tracking-wide line-clamp-2 leading-snug transition-colors duration-300 ${
                      isActive
                        ? "text-kh-pink"
                        : "text-zinc-100 group-hover:text-kh-pink"
                    }`}
                  >
                    {item.video_name}
                  </p>
                  <span className="text-xs  tracking-wider text-zinc-500 uppercase">
                    {item.video_type}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Redirect Link */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button variant="khOutlineLight" asChild className="w-full">
            <Link to="/highlights">VIEW FULL HIGHLIGHTZ PROFILE</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
