"use client";

import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import { Calendar, MapPin, ArrowDown, Clock } from "lucide-react";
import scheduleBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.avif";
import type { GameScheduleData } from "@/types";

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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

// 🍱 Layout-Exact Skeleton Component to prevent layout shifting
function TicketSkeleton() {
  return (
    <div className="w-full flex flex-col justify-between h-full min-h-[386px] animate-pulse">
      {/* Mid Area Blocks */}
      <div className="space-y-4 my-auto">
        <div className="h-4 w-28 bg-zinc-800 rounded-sm" />
        <div className="space-y-2">
          <div className="h-8 w-3/4 bg-zinc-800 rounded-sm" />
          <div className="h-8 w-1/2 bg-zinc-800 rounded-sm" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg shrink-0" />
          <div className="space-y-1.5 w-full">
            <div className="h-2 w-24 bg-zinc-800 rounded-xs" />
            <div className="h-4 w-1/3 bg-zinc-800 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Bottom Area Blocks */}
      <div className="border-t border-white/10 border-dashed pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-3 w-20 bg-zinc-800 rounded-xs" />
          <div className="h-3 w-16 bg-zinc-800 rounded-xs justify-self-end" />
        </div>
        <div className="h-11 w-full bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}

const currentYear = new Date().getFullYear();

export default function ScheduleHeroSection({
  data,
  isLoading,
}: {
  data?: GameScheduleData[];
  isLoading: boolean;
}) {
  const data1 = data?.[0];

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
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black via-zinc-950/40 to-black" />
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
            {currentYear}
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

        {/* Right Side: Tactile Physical Stadium Pass Card Layout */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ticketPopVariants}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end"
        >
          <div className="relative border border-white/10 bg-neutral-900/30 backdrop-blur-md p-6 w-full max-w-[370px] min-h-[450px] flex flex-col justify-between overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group rounded-2xl">
            {/* Left & Right Physical Ticket Punch Notches */}
            <div className="absolute left-0 top-[72%] -translate-x-1/2 w-4 h-8 bg-black rounded-r-full border-r border-t border-b border-white/10 z-20" />
            <div className="absolute right-0 top-[72%] translate-x-1/2 w-4 h-8 bg-black rounded-l-full border-l border-t border-b border-white/10 z-20" />

            {/* Top Row: Pass Specifications */}
            <div className="flex justify-between items-center border-b border-white/10 border-dashed pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-kh-pink rounded-full" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase">
                  COURTSIDE ACCESS
                </span>
              </div>
              <span className="font-mono text-[10px] font-black text-kh-pink bg-kh-pink/10 px-2.5 py-0.5 rounded border border-kh-pink/20">
                VIP PASS // 01
              </span>
            </div>

            {/* Switch Layout Viewports Depending On Dynamic Core Loader State */}
            {isLoading || !data1 ? (
              <TicketSkeleton />
            ) : (
              <>
                {/* Middle Row: Big Typography Game Schedule Metadata */}
                <div className="my-auto py-6 text-left space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-kh-pink" />
                    <span className="font-condensed font-black text-sm tracking-widest text-white uppercase">
                      {data1.date}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-[0.25em] uppercase block">
                      EVENT BRACKET
                    </span>
                    <h3 className="font-display text-4xl font-black text-white leading-none uppercase tracking-tighter m-0 truncate">
                      {data1.matchName}
                    </h3>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-kh-pink shrink-0">
                      VS
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-wider leading-none mb-0.5">
                        CONFIRMED COMPETITION
                      </span>
                      <span className="font-condensed font-bold text-base text-zinc-100 uppercase tracking-wide block truncate">
                        TEAM ELITE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Logistic Details Layout connected via Custom Dashed Divider line */}
                <div className="border-t border-white/10 border-dashed pt-6 flex flex-col gap-4 shrink-0">
                  <div className="grid grid-cols-2 gap-2 text-left items-center">
                    <div className="flex items-center gap-2 text-zinc-400 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="font-condensed font-bold text-xs tracking-wider uppercase text-zinc-300 truncate">
                        {data1.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 justify-end">
                      <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="font-condensed font-bold text-xs tracking-wider uppercase text-zinc-300">
                        TIME: TBD
                      </span>
                    </div>
                  </div>

                  {/* Functional Bottom Anchor Link CTA */}
                  <a
                    href="#all-dates"
                    className="w-full py-3 px-4 bg-white hover:bg-zinc-900 border border-white text-black hover:text-white flex items-center justify-between transition-all duration-300 font-condensed font-bold tracking-wider text-xs uppercase rounded-xl group"
                  >
                    <span>VIEW FULL CALENDAR</span>
                    <ArrowDown className="w-4 h-4 text-black group-hover:text-kh-pink transform group-hover:translate-y-0.5 transition-transform duration-300" />
                  </a>

                  {/* Decorative Aesthetic Barcode Element */}
                  <div className="w-full h-5 flex gap-[2px] opacity-20 group-hover:opacity-35 transition-opacity mt-1 select-none pointer-events-none">
                    {[
                      1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2,
                      1, 4, 1, 2, 3,
                    ].map((w, i) => (
                      <div
                        key={i}
                        className="bg-white h-full"
                        style={{ flexGrow: w }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
