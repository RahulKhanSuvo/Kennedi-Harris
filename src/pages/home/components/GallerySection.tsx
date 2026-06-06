"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useActiveGallery } from "@/hooks/useGallery";
import { ArrowUpRight, Crosshair, Image as ImageIcon } from "lucide-react";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: kineticSpring },
  },
};

const COURT_ZONES = [
  {
    id: "top-key",
    name: "Top of the Key",
    rate: "38%",
    desc: "Primary pick-and-roll pull-up & high reset efficiency",
    x: "50%",
    y: "22%",
    color: "border-kh-blue",
    accent: "bg-kh-blue",
  },
  {
    id: "left-wing",
    name: "Left Wing Arc",
    rate: "43%",
    desc: "High-volume isolation & stepback perimeter execution",
    x: "22%",
    y: "45%",
    color: "border-kh-pink",
    accent: "bg-kh-pink",
  },
  {
    id: "right-wing",
    name: "Right Wing Arc",
    rate: "41%",
    desc: "Off-screen catch & shoot / transition wing threat",
    x: "78%",
    y: "45%",
    color: "border-kh-pink",
    accent: "bg-kh-pink",
  },
  {
    id: "paint",
    name: "Paint & Restricted",
    rate: "58%",
    desc: "Explosive downhill slashing & transition finishing",
    x: "50%",
    y: "78%",
    color: "border-kh-blue",
    accent: "bg-kh-blue",
  },
];

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full min-h-[480px]">
      <div className="bg-neutral-900/50 rounded-xl border border-white/5 animate-pulse" />
      <div className="grid grid-rows-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-900/30 rounded-xl border border-white/5 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
  const { data, isLoading } = useActiveGallery();
  const [activeZone, setActiveZone] = useState(COURT_ZONES[3]);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setBrokenImages((prev) => ({ ...prev, [index]: true }));
  };

  const photos = data?.photos?.slice(0, 4) || [];

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-black border-t border-white/10 relative overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />

      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 items-stretch">
          {/* Left Side: Cinematic Balanced Photo Gallery Deck */}
          <div className="w-full xl:w-[46%] flex flex-col justify-between">
            <div className="flex justify-between items-end mb-8 shrink-0">
              <div className="flex items-center gap-4">
                <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                  PHOTO GALLERY
                </h3>
                <div className="h-px w-8 bg-kh-pink"></div>
              </div>
              <Link
                to="/gallery"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-white transition-colors uppercase border-b border-kh-blue/30 pb-0.5"
              >
                VIEW GALLERY
              </Link>
            </div>

            <div className="w-full my-auto flex-1 flex flex-col justify-center">
              {isLoading ? (
                <GallerySkeleton />
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 h-full min-h-[460px] xl:min-h-[500px]"
                >
                  {/* Image 1: Main Tall Feature Card (Left Column) */}
                  <motion.div
                    variants={fadeUpVariants}
                    className="sm:col-span-7 rounded-xl border border-white/5 overflow-hidden group relative bg-neutral-900/20 flex items-center justify-center min-h-[300px] sm:min-h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none transition-opacity group-hover:opacity-40" />
                    {photos[0] && !brokenImages[0] ? (
                      <img
                        src={photos[0].url}
                        alt={photos[0].name}
                        className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                        onError={() => handleImageError(0)}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                        <ImageIcon className="w-5 h-5 text-zinc-700" />
                      </div>
                    )}
                    <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                      <span className="font-mono text-[9px] text-kh-pink tracking-widest uppercase block mb-1">
                        FEATURE / ACTION
                      </span>
                      <h4 className="font-condensed font-black text-xl text-white tracking-wide uppercase">
                        IN-GAME CAPTURE
                      </h4>
                    </div>
                  </motion.div>

                  {/* Remaining Images stacked vertically (Right Column) */}
                  <div className="sm:col-span-5 grid grid-rows-3 gap-4 h-full">
                    {[1, 2, 3].map((idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeUpVariants}
                        className="rounded-xl border border-white/5 overflow-hidden group relative bg-neutral-900/20 flex items-center justify-center min-h-[100px]"
                      >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-300 z-10" />
                        {photos[idx] && !brokenImages[idx] ? (
                          <img
                            src={photos[idx].url}
                            alt={photos[idx].name}
                            className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 will-change-transform"
                            onError={() => handleImageError(idx)}
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 text-zinc-600 font-mono text-[9px] uppercase tracking-widest">
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-700" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Structural Vertical Line Divider */}
          <div className="hidden xl:block w-px bg-white/10 self-stretch my-2"></div>
          <div className="block xl:hidden h-px w-full bg-white/10"></div>

          {/* Right Side: Interactive Shot Matrix Court Canvas */}
          <div className="w-full xl:w-[54%] flex flex-col justify-between xl:pl-4 text-left">
            {/* Header Area */}
            <div className="flex justify-between items-end mb-8 shrink-0">
              <div className="flex items-center gap-4">
                <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                  SHOT MATRIX MAP
                </h3>
                <div className="h-px w-8 bg-kh-blue"></div>
              </div>
            </div>

            {/* Main Interactive Matrix Layout Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto w-full">
              {/* Tactical Blueprint Court Drawing (Left 7 Columns) */}
              <div className="md:col-span-7 aspect-[4/3] bg-[#09090b] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-4 shadow-2xl">
                <svg
                  className="absolute inset-0 w-full h-full stroke-white/5 fill-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    className="stroke-white/10"
                    strokeWidth="1"
                  />
                  <path
                    d="M 35 0 A 15 15 0 0 0 65 0"
                    className="stroke-white/5"
                    strokeWidth="0.75"
                  />
                  <path
                    d="M0,0 L0,100 L100,100 L100,0"
                    className="stroke-white/5"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 10 100 L 10 65 A 40 40 0 0 1 90 65 L 90 100"
                    className="stroke-white/10"
                    strokeWidth="0.85"
                  />
                  <path
                    d="M 34 100 L 34 60 L 66 60 L 66 100"
                    className="stroke-white/10"
                    strokeWidth="0.85"
                  />
                  <path
                    d="M 34 60 A 16 16 0 0 1 66 60"
                    className="stroke-white/5 stroke-dasharray-[2,2]"
                    strokeWidth="0.75"
                  />
                  <line
                    x1="42"
                    y1="92"
                    x2="58"
                    y2="92"
                    className="stroke-white/20"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="50"
                    y1="92"
                    x2="50"
                    y2="88"
                    className="stroke-white/20"
                    strokeWidth="1"
                  />
                  <circle
                    cx="50"
                    cy="86"
                    r="2.5"
                    className="stroke-white/30"
                    strokeWidth="1"
                  />
                </svg>

                {/* Hotspot Target Triggers */}
                {COURT_ZONES.map((zone) => {
                  const isActive = activeZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone)}
                      onMouseEnter={() => setActiveZone(zone)}
                      style={{ left: zone.x, top: zone.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/node p-4 cursor-pointer outline-hidden z-20"
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`w-10 h-10 rounded-full border ${zone.color} opacity-0 scale-50 group-hover/node:opacity-30 group-hover/node:scale-100 transition-all duration-300 ${isActive ? "opacity-40 scale-100" : ""}`}
                        />
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border bg-black flex items-center justify-center transition-all duration-300 ${isActive ? "border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.2)]" : "border-zinc-700 group-hover/node:border-zinc-400"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${zone.accent} transition-transform ${isActive ? "scale-110" : "scale-100"}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Data Panel Response Blueprint (Right 5 Columns) */}
              <div className="md:col-span-5 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
                      <Crosshair className="w-3 h-3 text-kh-blue" /> SELECTED
                      SECTOR
                    </span>
                    <h4 className="font-condensed font-black text-2xl text-white tracking-wide uppercase">
                      {activeZone.name}
                    </h4>
                  </div>

                  <div className="border border-white/5 bg-neutral-900/20 p-5 rounded-xl space-y-3 relative overflow-hidden backdrop-blur-xs min-h-[140px] flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-linear-to-b from-white/10 to-transparent" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeZone.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-2"
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-black text-5xl text-white tracking-tight">
                            {activeZone.rate}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase ml-1.5 border-l border-white/10 pl-2">
                            ZONE EFFICIENCY
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-zinc-400 uppercase leading-relaxed tracking-wider">
                          {activeZone.desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Micro Metrics Mini Index */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <div>
                    <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                      WING USAGE RATE
                    </span>
                    <span className="font-condensed font-bold text-sm text-zinc-300 uppercase tracking-wide">
                      PERIMETER HEAVY
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                      POSITION PROFILE
                    </span>
                    <span className="font-mono text-[10px] text-kh-pink font-bold uppercase tracking-wider">
                      GUARD / FORWARD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full shrink-0">
              <div className="flex items-center gap-2"></div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-condensed font-bold text-xs tracking-widest text-white hover:text-kh-blue transition-colors uppercase group self-start sm:self-auto"
              >
                <span>VIEW COMPLETE BLUEPRINT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-kh-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
