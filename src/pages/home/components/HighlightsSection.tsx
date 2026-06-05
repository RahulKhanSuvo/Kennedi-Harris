"use client";

import { Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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

export default function HighlightsSection({
  highlights,
}: {
  highlights: HighlightData | null;
}) {
  const videosList = highlights?.videos?.slice(0, 3) || [];

  // 💡 Compute the active source fallback directly to avoid mounting cascades
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

  // Play immediately whenever the active source changes via sidebar selection
  useEffect(() => {
    if (currentVideo && videoRef.current) {
      syncPlaybackState(true);
    }
  }, [currentVideo]);

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
    setSelectedVideo(videoSrc);
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
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-sans font-semibold tracking-wide line-clamp-2 leading-snug transition-colors duration-300 ${
                      isActive
                        ? "text-kh-pink"
                        : "text-zinc-100 group-hover:text-kh-pink"
                    }`}
                  >
                    {item.video_name}
                  </p>
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
