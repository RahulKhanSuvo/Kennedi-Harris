import { Play, ArrowRight, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import mainVideo from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video1 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video2 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";

interface HighlightItem {
  video: string;
  alt: string;
  title: string;
  subtitle?: string;
}

const highlights: HighlightItem[] = [
  {
    video: video1,
    alt: "Highlight 1",
    title: "vs. Team Elite",
    subtitle: "Atlanta, GA",
  },
  {
    video: video2,
    alt: "Highlight 2",
    title: "AAU Championship Highlights",
  },
  {
    video: video2,
    alt: "Highlight 3",
    title: "Shot Blocking Highlights",
  },
];

export default function HighlightsSection() {
  const [currentVideo, setCurrentVideo] = useState<string>(mainVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sidebarVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Synchronized Engine playback hook handles dynamic context changing safely
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentVideo]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (video.paused) {
      video.muted = false;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSidebarClick = (videoSrc: string) => {
    if (currentVideo === videoSrc) {
      handlePlayPause();
      return;
    }
    setIsPlaying(true);
    setCurrentVideo(videoSrc);
  };

  const handleSidebarHover = (index: number, isHovering: boolean) => {
    const video = sidebarVideoRefs.current[index];
    if (!video) return;

    if (isHovering) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0; // Rewinds clip matrix back to home frame cleanly
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
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
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            loop
            playsInline
          />

          {/* Action Trigger Interface Overlay Layer */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/20 md:opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 backdrop-blur-xs hover:bg-kh-pink/20 hover:border-kh-pink">
              {isPlaying ? (
                <Pause
                  className="text-white group-hover:text-kh-pink"
                  size={28}
                  fill="currentColor"
                />
              ) : (
                <Play
                  className="text-white group-hover:text-kh-pink ml-1.5"
                  size={28}
                  fill="currentColor"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Strip Deck Controller */}
      <div className="w-full lg:w-1/3 flex flex-col justify-between gap-4 lg:pt-9">
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {highlights.map((item, index) => {
            const isActive = currentVideo === item.video;
            return (
              <div
                key={`${item.alt}-${index}`}
                onClick={() => handleSidebarClick(item.video)}
                onMouseEnter={() => handleSidebarHover(index, true)}
                onMouseLeave={() => handleSidebarHover(index, false)}
                className={`flex gap-4 p-2 rounded-lg cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-white/5 border-kh-pink/30 shadow-md"
                    : "border-transparent bg-transparent hover:bg-white/[0.03]"
                }`}
              >
                {/* Micro Preview Node Window */}
                <div className="relative w-28 sm:w-32 aspect-video bg-neutral-900 rounded-md overflow-hidden shrink-0 border border-white/5">
                  <video
                    ref={(el) => {
                      sidebarVideoRefs.current[index] = el;
                    }}
                    src={item.video}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                        isActive
                          ? "bg-kh-pink border-kh-pink"
                          : "bg-black/60 border-white/40 group-hover:border-kh-pink group-hover:bg-kh-pink/20"
                      }`}
                    >
                      <Play
                        className="text-white ml-0.5"
                        size={10}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>

                {/* Metadata Meta Strip Titles */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-sans font-semibold tracking-wide line-clamp-2 leading-snug transition-colors duration-200 ${
                      isActive
                        ? "text-kh-pink"
                        : "text-zinc-100 group-hover:text-kh-pink"
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <span className="text-[11px] font-condensed tracking-wider text-zinc-400 font-medium uppercase mt-0.5">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Redirect Core Call-To-Action Link Button */}
        <div className="border border-kh-pink/20 hover:border-kh-pink/60 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 bg-kh-pink/[0.02] hover:bg-kh-pink/[0.04]">
          <a
            href="#"
            className="flex items-center justify-between p-4 font-condensed font-bold text-xs sm:text-sm tracking-widest text-kh-pink uppercase select-none"
          >
            VIEW FULL HIGHLIGHTZ PROFILE
            <ArrowRight
              size={14}
              className="transform group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
