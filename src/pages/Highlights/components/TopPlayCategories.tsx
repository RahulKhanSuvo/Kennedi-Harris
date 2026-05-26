import { useState } from "react";
import { Play, Disc } from "lucide-react";
import Container from "@/components/common/Container";

import img1 from "@/assets/gallery/jumping5.avif";
import img2 from "@/assets/gallery/jumping4.avif";
import img3 from "@/assets/gallery/working.avif";

const TAPE_LOGS = [
  {
    id: "01",
    title: "SCORING",
    count: "28 REELS",
    img: img1,
    metric: "24.5 PPG",
    tagline: "Perimeter conversion & isolation drive tape.",
  },
  {
    id: "02",
    title: "DEFENSE",
    count: "24 REELS",
    img: img2,
    metric: "3.2 BPG",
    tagline: "Paint dominance, rim protection & switches.",
  },
  {
    id: "03",
    title: "PLAYMAKING",
    count: "18 REELS",
    img: img3,
    metric: "8.1 APG",
    tagline: "Transition anchors & open court distribution.",
  },
];

export default function TopPlayCategories() {
  const [activePanel, setActivePanel] = useState<string | null>("01");

  return (
    <section className="relative bg-black py-24 lg:py-36 border-t border-white/5 overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02] pointer-events-none" />

      <Container className="relative z-10 w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase font-bold">
                BROADCAST LOGS
              </span>
            </div>
            <h3 className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none m-0">
              TOP <span className="text-kh-pink">PLAY CATEGORIES</span>
            </h3>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest max-w-xs md:text-right">
            Select interactive telemetry tracks to stream archived court
            footage.
          </p>
        </div>

        {/* Dynamic Multi-Panel Accordion Track */}
        <div className="flex flex-col lg:flex-row items-stretch w-full h-[700px] lg:h-[480px] bg-zinc-950 border border-white/10 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {TAPE_LOGS.map((tape) => {
            const isActive = activePanel === tape.id;

            return (
              <div
                key={tape.id}
                onMouseEnter={() => setActivePanel(tape.id)}
                className={`relative cursor-pointer transition-all duration-700 ease-out flex flex-col justify-between p-6 sm:p-8 overflow-hidden group ${
                  isActive
                    ? "lg:flex-[2.2] bg-zinc-900"
                    : "lg:flex-[1] bg-black"
                }`}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                  <img
                    src={tape.img}
                    alt={tape.title}
                    className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                      isActive
                        ? "scale-105 grayscale-0 contrast-100 opacity-30"
                        : "scale-100 grayscale contrast-125 opacity-15 group-hover:opacity-25"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Top Core Status Layout */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Disc
                      className={`w-3 h-3 text-cyan-400 ${isActive ? "animate-spin" : "opacity-40"}`}
                      style={{ animationDuration: "3s" }}
                    />
                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                      CH_{tape.id}
                    </span>
                  </div>

                  {/* Performance Metric Box */}
                  <div
                    className={`font-mono text-xs border transition-all duration-500 px-3 py-1 bg-black/60 font-bold tracking-wide ${
                      isActive
                        ? "border-kh-pink text-kh-pink"
                        : "border-white/10 text-gray-400"
                    }`}
                  >
                    {tape.metric}
                  </div>
                </div>

                {/* Middle Action Ring Reveal (Only pops explicitly when layout shifts) */}
                <div
                  className={`absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none transition-all duration-500 z-10 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full border border-kh-pink/40 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-kh-pink/10">
                    <div className="w-11 h-11 rounded-full bg-kh-pink flex items-center justify-center text-white">
                      <Play fill="white" className="w-4 h-4 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Details Typography Block */}
                <div className="relative z-10 text-left flex flex-col items-start w-full">
                  {/* Count String */}
                  <span
                    className={`font-mono text-[9px] tracking-[0.25em] text-cyan-400 font-bold uppercase transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "lg:opacity-0 lg:translate-y-4"
                    }`}
                  >
                    {tape.count} AVAILABLE
                  </span>

                  {/* Category Giant Title */}
                  <h4 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none uppercase mt-1 mb-3">
                    {tape.title}
                  </h4>

                  {/* Summary string showing only when expanded */}
                  <div
                    className={`w-full overflow-hidden transition-all duration-500 ease-out flex items-center justify-between gap-4 ${
                      isActive
                        ? "max-h-16 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 lg:translate-y-4"
                    }`}
                  >
                    <p className="text-gray-400 font-sans font-light text-xs sm:text-sm max-w-sm leading-relaxed">
                      {tape.tagline}
                    </p>
                    <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 shrink-0 lg:hidden">
                      <Play
                        fill="white"
                        className="w-2.5 h-2.5 ml-0.5 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Edge Running Scan Gradient Border Highlight */}
                <div
                  className={`absolute bottom-0 left-0 h-[3px] transition-all duration-700 bg-gradient-to-r from-cyan-400 via-kh-pink to-white ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
