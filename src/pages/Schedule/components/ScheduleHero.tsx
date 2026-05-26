"use client";

import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import { Calendar, MapPin, ArrowDown, Clock } from "lucide-react";
import scheduleBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

// Animation configs mapping directly to your elite broadcast specifications
const canvasVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 0.2,
    scale: 1.1,
    transition: { duration: 1.4, ease: "easeOut" },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom cubic-bezier
  },
};

const ticketPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

export default function ScheduleHeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black pt-28 pb-20">
      {/* 1. Deep-Space Canvas with Smooth Entry Fade/Scale Reveal */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={canvasVariants}
        className="absolute inset-0 z-0 mix-blend-screen pointer-events-none"
      >
        <img
          src={scheduleBg}
          alt="Space Canvas"
          className="w-full h-full object-cover filter brightness-50"
        />
      </motion.div>

      {/* Elegant Linear Gradient Shadow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-zinc-950/40 to-black" />
      <div className="absolute bottom-0 right-0 pointer-events-none h-[300px] w-[500px] bg-cyan-500/10 blur-[120px]" />

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
        {/* Left Side: Editorial Typography with Staggered Slide-Up Reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="flex flex-col gap-4 max-w-xl text-left"
        >
          <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs sm:text-sm">
            On-Court Calendar
          </span>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.85] uppercase text-white m-0">
            2026
            <br />
            <span className="text-kh-pink">SEASON</span>
            <br />
            SCHEDULE
          </h1>

          <p className="text-gray-400 mt-4 max-w-md text-sm sm:text-base leading-relaxed font-light">
            An overview of upcoming appearances, seasonal games, and
            tournaments. Find out where and when Kennedi Harris is playing next.
          </p>
        </motion.div>

        {/* Right Side: Next Match Ticket Box with Crisp Pop-In Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ticketPopVariants}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end"
        >
          <div className="relative border border-white/10 bg-zinc-900/20 backdrop-blur-md p-6 w-full max-w-[380px] min-h-[440px] flex flex-col justify-between overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group rounded-sm">
            {/* Tech Design Lines */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-kh-pink/10 to-transparent" />
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-white/[0.02] font-display text-9xl font-black tracking-tighter select-none pointer-events-none transform -rotate-90">
              NEXT
            </div>

            {/* Top Row: Ticket Header Spec */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-kh-pink rounded-none transform rotate-45 animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">
                  UPCOMING UP-NEXT
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-white/5">
                PASS // 01
              </span>
            </div>

            {/* Middle Row: Massive Feature Game Alert */}
            <div className="my-auto py-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-3.5 h-3.5 text-kh-pink" />
                <span className="font-condensed font-bold text-xs tracking-widest text-zinc-400 uppercase">
                  MAY 24-26, 2026
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tight m-0">
                AAU TOURNAMENT
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-sm bg-[#ff0055] flex items-center justify-center text-xs font-black text-white transform -skew-x-6">
                  T
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider leading-none">
                    OPPONENT MATCHUP
                  </span>
                  <span className="font-sans font-bold text-sm sm:text-base text-zinc-200 uppercase tracking-wide">
                    vs TEAM ELITE
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Logistic Details Layout */}
            <div className="border-t border-white/5 pt-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="flex items-center gap-2 text-zinc-400 font-sans text-xs">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span className="truncate uppercase tracking-wide">
                    Atlanta, GA
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-sans text-xs justify-end">
                  <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span className="uppercase tracking-wide">Time: TBD</span>
                </div>
              </div>

              {/* Functional Bottom Anchor Link CTA */}
              <a
                href="#all-dates"
                className="w-full py-3 px-4 bg-zinc-950 border border-white/10 hover:border-kh-pink flex items-center justify-between text-white transition-all duration-300 font-condensed font-bold tracking-wider text-xs uppercase hover:bg-zinc-900 group"
              >
                <span>VIEW FULL CALENDAR</span>
                <ArrowDown className="w-4 h-4 text-kh-pink transform group-hover:translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
