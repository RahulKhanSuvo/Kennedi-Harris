import { Play, ArrowRight, Pause } from "lucide-react";
import { useState, useRef } from "react";
import mainVideo from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video1 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.14.13-PM.mp4";
import video2 from "@/assets/videos/WhatsApp-Video-2025-11-19-at-10.15.05-PM.mp4";

const highlights = [
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
  const [currentVideo, setCurrentVideo] = useState(mainVideo);
  const [isPlaying, setIsPlaying] = useState(false); // starts paused
  const videoRef = useRef<HTMLVideoElement>(null);

  const sidebarVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.paused) {
      // User clicks play: ensure it's unmuted and play with sound
      video.muted = false;
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSidebarClick = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setTimeout(() => {
      if (videoRef.current) {
        // New video starts paused (no autoplay)
        videoRef.current.muted = false; // will be ready for user to play with sound
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, 100);
  };

  const handleSidebarHover = (index: number, isHovering: boolean) => {
    const video = sidebarVideoRefs.current[index];
    if (!video) return;
    if (isHovering) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div className="flex flex-col w-[60%] lg:flex-row gap-10">
      {/* Main Video Area */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <h3 className="font-condensed font-semibold text-sm xl:text-xl tracking-widest text-white uppercase">
          LATEST HIGHLIGHTS
        </h3>

        <div className="relative max-h-[300px] lg:h-auto w-full aspect-square md:aspect-video bg-kh-dark-2 rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
          <video
            ref={videoRef}
            src={currentVideo}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            // No autoPlay, no muted (will be unmuted when user clicks)
            loop
            playsInline
          />

          {/* Play/Pause Button Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePlayPause}
          >
            <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/20 hover:bg-kh-pink/20 hover:border-kh-pink transition-colors cursor-pointer">
              {isPlaying ? (
                <Pause
                  className="text-white hover:text-kh-pink"
                  size={32}
                  fill="currentColor"
                />
              ) : (
                <Play
                  className="text-white hover:text-kh-pink ml-2"
                  size={32}
                  fill="currentColor"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Playlist */}
      <div className="w-full lg:w-1/3 flex flex-col pt-10">
        <div className="flex flex-col gap-2">
          {highlights.map((item, index) => (
            <div
              key={item.alt}
              onClick={() => handleSidebarClick(item.video)}
              onMouseEnter={() => handleSidebarHover(index, true)}
              onMouseLeave={() => handleSidebarHover(index, false)}
              className="flex gap-4 group cursor-pointer rounded hover:bg-white/5 transition-colors"
            >
              <div className="relative w-32 aspect-video bg-kh-dark-2 rounded overflow-hidden shrink-0 border border-white/10">
                <video
                  ref={(el) => (sidebarVideoRefs.current[index] = el)}
                  src={item.video}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center border border-white/50 group-hover:border-kh-pink group-hover:bg-kh-pink/20">
                    <Play
                      className="text-white ml-1"
                      size={12}
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm text-white font-sans font-medium line-clamp-2 leading-snug group-hover:text-kh-pink transition-colors">
                  {item.title}
                  {item.subtitle && (
                    <>
                      <br />
                      {item.subtitle}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 border border-kh-pink/30 hover:border-kh-pink rounded overflow-hidden group cursor-pointer transition-colors bg-kh-pink/5">
          <a
            href="#"
            className="flex items-center justify-between p-4 font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase"
          >
            VIEW FULL HIGHLIGHTZ PROFILE
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
