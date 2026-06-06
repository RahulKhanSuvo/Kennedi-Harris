import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import highlightBg from "@/assets/backgroud/c69918f4f554463198439ed55b120532.avif";

export default function HighlightsHeroSection({
  mainUrl,
}: {
  mainUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Functional Interface States
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  // Background Parallax Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]);

  // Video State Handler
  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Dynamically Capture Video Duration Metatags
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const totalSeconds = videoRef.current.duration;

    if (isNaN(totalSeconds)) return;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    setDuration(`${minutes}:${formattedSeconds}`);
  };

  // Sync state correctly if video ends naturally or user exits fullscreen controls
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleVideoEnded = () => setIsPlaying(false);
    const handlePauseState = () => setIsPlaying(false);
    const handlePlayState = () => setIsPlaying(true);

    videoEl.addEventListener("ended", handleVideoEnded);
    videoEl.addEventListener("pause", handlePauseState);
    videoEl.addEventListener("play", handlePlayState);

    return () => {
      videoEl.removeEventListener("ended", handleVideoEnded);
      videoEl.removeEventListener("pause", handlePauseState);
      videoEl.removeEventListener("play", handlePlayState);
    };
  }, []);

  // Content Stagger Variants
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 },
    },
  };

  const videoPlayerVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 55,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-24 pb-16"
    >
      {/* 1. Starfield / Nebula Background (Parallax-Enhanced) */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen will-change-transform pointer-events-none"
      >
        <img
          src={highlightBg}
          alt="Space Background"
          className="w-full h-full object-cover "
        />
      </motion.div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/20 via-black/70 to-black pointer-events-none"></div>

      {/* Ambient Neon Flares */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 pointer-events-none h-[300px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px]"></div>

      <Container className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Animated Text & Badges Context Wrapper */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col items-center will-change-transform"
        >
          {/* Top Badge */}
          <motion.div
            variants={textItemVariants}
            className="inline-flex items-center gap-3 px-4 py-1.5 border border-kh-pink/30 bg-kh-pink/10 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-kh-pink animate-ping"></span>
            <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs sm:text-sm">
              Media & Mixtapes
            </span>
          </motion.div>

          {/* Big Impact Headline */}
          <motion.h1
            variants={textItemVariants}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-4 uppercase"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-gray-400">
              THE <span className="text-kh-pink">REEL</span> DEPT.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={textItemVariants}
            className="text-gray-400 font-condensed tracking-widest text-lg sm:text-xl uppercase max-w-2xl font-semibold mb-8"
          >
            Kennedi Harris <span className="text-kh-pink">#11</span> // Complete
            On-Court Performance Tape
          </motion.p>
        </motion.div>

        {/* 2. THE HIGHLIGHT SCREEN */}
        <motion.div
          variants={videoPlayerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative w-full max-w-4xl aspect-video bg-gray-900/40 border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group backdrop-blur-md will-change-transform"
        >
          {/* Active Live Native Video Element Tag */}
          <video
            ref={videoRef}
            src={mainUrl}
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            onClick={handleTogglePlay}
            controls={isPlaying} // Shows native player controls only while actively running
            className="w-full h-full object-cover relative z-0"
          />

          {/* HUD Overlay Interface Frame (Hides smoothly when playing) */}
          <div
            className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
          >
            {/* Cyber Video Frame Corner UI Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>

            {/* Video Metadata overlay */}
            <div className="absolute top-4 left-10 font-mono text-[10px] text-cyan-400 tracking-wider hidden sm:block">
              REC [•] 4K HDR // 60FPS // CAM_A
            </div>

            {/* Simulated Dark Video Thumbnail backdrop */}
            <div className="absolute inset-0 bg-linear-to-tr from-black via-transparent to-pink-500/10 mix-blend-color-dodge"></div>
          </div>

          {/* Playback Control Trigger Module Cover (Blocks clicks and overrides overlay HUD actions) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 group-hover:bg-black/30 transition-all duration-300 z-20">
              {/* Pulsing Glowing Play Button Trigger */}
              <button
                onClick={handleTogglePlay}
                className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-black transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] group-hover:bg-kh-pink group-hover:text-white cursor-pointer z-30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <span className="mt-4 font-condensed text-white tracking-widest font-bold uppercase text-sm group-hover:text-cyan-300 transition-colors duration-300">
                Play 2026 Season Mixtape
              </span>
              <span className="text-xs text-gray-500 font-mono mt-1">
                Duration: {duration}
              </span>
            </div>
          )}

          {/* Subtle scanning line effect across video */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/5 via-transparent to-transparent h-[10%] w-full animate-scan opacity-20 z-10"></div>
        </motion.div>

        {/* Quick Filter Navigation */}
      </Container>
    </section>
  );
}
