"use client";

import { useState, useRef } from "react";
import { Play, Disc, X, Maximize2 } from "lucide-react";
import Container from "@/components/common/Container";
import type { FeedVideo } from "@/types";

export default function TopPlayCategories({
  FeedVideoData,
  isLoading,
}: {
  FeedVideoData: FeedVideo[];
  isLoading: boolean;
}) {
  const [activePanel, setActivePanel] = useState<string | null>(
    FeedVideoData?.[0]?._id || null,
  );

  // State for the interactive lightbox video player modal
  const [modalVideo, setModalVideo] = useState<FeedVideo | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePanelActivation = (id: string) => {
    setActivePanel(id);
    // Auto-play the background preview track smoothly
    Object.keys(videoRefs.current).forEach((key) => {
      if (key === id) {
        videoRefs.current[key]?.play().catch(() => {});
      } else {
        videoRefs.current[key]?.pause();
      }
    });
  };

  const handlePlayVideo = (e: React.MouseEvent, tape: FeedVideo) => {
    e.stopPropagation(); // Stop accordion click handling trigger
    setModalVideo(tape);
  };

  return (
    <section className="relative bg-black py-16 md:py-24 lg:py-36 border-t border-white/5 overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-white/2 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/2 pointer-events-none" />

      <Container className="relative z-10 w-full flex flex-col gap-8 md:gap-12">
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none m-0">
              TOP <span className="text-kh-pink">REELS</span>
            </h3>
          </div>
          <p className="text-gray-500 hidden md:block font-mono text-[10px] uppercase tracking-widest max-w-xs md:text-right">
            Select interactive telemetry tracks to stream archived court
            footage.
          </p>
        </div>

        {/* Dynamic Multi-Panel Accordion Track */}
        <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[550px] lg:h-[480px] bg-zinc-950 border border-white/10 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {isLoading || !FeedVideoData || FeedVideoData.length === 0
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-panel-${index}`}
                  className="flex-1 bg-zinc-950 min-h-[90px] lg:min-h-0 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                </div>
              ))
            : FeedVideoData.map((tape, index) => {
                const isActive = activePanel === tape._id;

                const displayId = String(index + 1).padStart(2, "0");
                const metricsMock = [
                  "24.5 PPG",
                  "3.2 BPG",
                  "8.1 APG",
                  "1.8 SPG",
                ];
                const countsMock = [
                  "28 REELS",
                  "24 REELS",
                  "18 REELS",
                  "12 REELS",
                ];
                const taglinesMock = [
                  "Perimeter conversion & isolation drive tape.",
                  "Paint dominance, rim protection & switches.",
                  "Transition anchors & open court distribution.",
                  "Defensive deflections & transition handles.",
                ];

                const currentMetric = metricsMock[index % metricsMock.length];
                const currentCount = countsMock[index % countsMock.length];
                const currentTagline =
                  taglinesMock[index % taglinesMock.length];

                return (
                  <div
                    key={tape._id}
                    onMouseEnter={() => handlePanelActivation(tape._id)}
                    onClick={() => {
                      if (isActive) {
                        setModalVideo(tape); // If already active, clicking anywhere plays it
                      } else {
                        handlePanelActivation(tape._id);
                      }
                    }}
                    className={`relative cursor-pointer transition-all duration-700 ease-out flex flex-col justify-between p-6 sm:p-8 overflow-hidden group ${
                      isActive
                        ? "flex-[2.5] lg:flex-[2.2] bg-zinc-900 min-h-[220px] lg:min-h-0"
                        : "flex-1 bg-black min-h-[90px] lg:min-h-0"
                    }`}
                  >
                    {/* Background Video Layer */}
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                      <video
                        ref={(el) => {
                          videoRefs.current[tape._id] = el;
                        }}
                        src={tape.video_url}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                          isActive
                            ? "scale-105 grayscale-0 contrast-100 opacity-40"
                            : "scale-100 grayscale contrast-125 opacity-10 group-hover:opacity-20"
                        }`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
                    </div>

                    {/* Top Core Status Layout */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Disc
                          className={`w-3 h-3 text-cyan-400 ${isActive ? "animate-spin" : "opacity-40"}`}
                          style={{ animationDuration: "3s" }}
                        />
                        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                          CH_{displayId}
                        </span>
                      </div>

                      {/* Performance Metric Box */}
                      <div
                        className={`font-mono text-[10px] sm:text-xs border transition-all duration-500 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/60 font-bold tracking-wide ${
                          isActive
                            ? "border-kh-pink text-kh-pink"
                            : "border-white/10 text-gray-400"
                        }`}
                      >
                        {currentMetric}
                      </div>
                    </div>

                    {/* Middle Action Ring Reveal (Desktop Only) - Now explicitly clickable to stream */}
                    <div
                      onClick={(e) => handlePlayVideo(e, tape)}
                      className={`absolute inset-0 hidden lg:flex items-center justify-center transition-all duration-500 z-20 ${
                        isActive
                          ? "opacity-100 scale-100 cursor-pointer"
                          : "opacity-0 scale-75 pointer-events-none"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full border border-kh-pink/40 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-kh-pink/10 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-11 h-11 rounded-full bg-kh-pink flex items-center justify-center text-white">
                          <Play fill="white" className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Details Typography Block */}
                    <div className="relative z-10 text-left flex flex-col items-start w-full mt-4 lg:mt-0">
                      <span
                        className={`font-mono text-[9px] tracking-[0.25em] text-cyan-400 font-bold uppercase transition-all duration-500 ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 lg:translate-y-4"
                        }`}
                      >
                        {currentCount} AVAILABLE
                      </span>

                      <h4 className="font-display text-2xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-white leading-none uppercase mt-1 mb-2 lg:mb-3">
                        {tape.title}
                      </h4>

                      <div
                        className={`w-full overflow-hidden transition-all duration-500 ease-out flex items-center justify-between gap-4 ${
                          isActive
                            ? "max-h-20 opacity-100 translate-y-0 mt-1"
                            : "max-h-0 opacity-0 translate-y-4"
                        }`}
                      >
                        <p className="text-gray-400 font-sans font-light text-xs sm:text-sm max-w-sm leading-relaxed">
                          {currentTagline}
                        </p>
                        {/* Mobile Play Button Action Trigger */}
                        <div
                          onClick={(e) => handlePlayVideo(e, tape)}
                          className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shrink-0 lg:hidden cursor-pointer"
                        >
                          <Play
                            fill="white"
                            className="w-2.5 h-2.5 ml-0.5 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 h-[3px] transition-all duration-700 bg-linear-to-r from-cyan-400 via-kh-pink to-white ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                );
              })}
        </div>
      </Container>

      {/* ========================================== */}
      {/* FULLSCREEN LIGHTBOX VIDEO PLAYER MODAL     */}
      {/* ========================================== */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-9999 flex items-center justify-center p-4 transition-opacity duration-300">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setModalVideo(null)}
          />

          <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10">
            {/* Top Bar Header controls */}
            <div className="flex items-center justify-between p-4 bg-zinc-900/60 border-b border-white/5 text-white">
              <div className="flex items-center gap-2">
                <Maximize2 size={14} className="text-kh-pink" />
                <span className="font-display text-sm tracking-wide uppercase font-bold">
                  Streaming Category Track // {modalVideo.title}
                </span>
              </div>
              <button
                onClick={() => setModalVideo(null)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Main Interactive High-Res Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={modalVideo.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
