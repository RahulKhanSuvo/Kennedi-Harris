"use client";

import { motion } from "motion/react";
import Container from "@/components/common/Container";
import { Star, LineChart, LayoutGrid, Trophy } from "lucide-react";
import { BsDribbble } from "react-icons/bs";

const STATS = [
  {
    id: 1,
    value: "20+",
    label: "PPG",
    sublabel: "Points Per Game",
    icon: Star,
    highlight: false,
  },
  {
    id: 2,
    value: "16+",
    label: "RPG",
    sublabel: "Rebounds Per Game",
    icon: BsDribbble,
    highlight: false,
  },
  {
    id: 3,
    value: "3+",
    label: "BPG",
    sublabel: "Blocks Per Game",
    icon: LineChart,
    highlight: false,
  },
  {
    id: 4,
    value: "24+",
    label: "DOUBLE-DOUBLES",
    sublabel: "This Season",
    icon: LayoutGrid,
    highlight: true,
  },
  {
    id: 5,
    value: "31",
    label: "GAME HIGH REBOUNDS",
    sublabel: "Season Record",
    icon: Trophy,
    highlight: true,
  },
];
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
} as const;

// Stagger arrangement configurations
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // Snappy fast sports presentation stagger
    },
  },
} as const;

// Snappy athletic entry pop
const sportsCardVariants = {
  hidden: { opacity: 0, x: -15, scale: 0.93, skewX: -4 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    skewX: -4, // Keeps cards skewed uniformly on entry
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 14,
    },
  },
} as const;

export function SeasonStats() {
  return (
    <section className="py-16 relative overflow-hidden bg-black/20">
      {/* Decorative Sport Tech Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

      <Container>
        {/* Section Header with Aggressive Sports Styling */}
        {/* <div className="flex items-center gap-4 mb-8 border-l-4 border-kh-pink pl-4">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-kh-pink">

          </span>
          <div className="h-[2px] bg-white/5 flex-grow hidden sm:block"></div>
        </div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          {/* <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-kh-pink rotate-45 animate-pulse" />
                    <h3 className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase font-black">
                      BROADCAST CONFIG // SCROLL DECK
                    </h3>
                  </div> */}
          <span className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none">
            SEASON LEADERSHIP <span className="text-kh-pink ">METRICS</span>
          </span>
        </motion.div>

        {/* Dynamic Grid Container triggering at 30% viewport intersection */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }} // Triggers precisely when 30% visible
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-2"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={sportsCardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  borderColor: stat.highlight
                    ? "rgba(234, 76, 137, 0.6)"
                    : "rgba(255, 255, 255, 0.3)",
                }}
                className={`relative border p-6 flex flex-col justify-between items-start text-left group skew-x-[-4deg] transition-all duration-300 will-change-transform rounded-sm select-none ${
                  stat.highlight
                    ? "bg-linear-to-br from-kh-pink/10 via-black/60 to-black border-kh-pink/30 shadow-[0_10px_30px_-15px_rgba(234,76,137,0.3)]"
                    : "bg-linear-to-br from-neutral-900/60 to-black border-white/5 shadow-xl"
                }`}
              >
                {/* Asymmetric Tech Corner Tag */}
                <div
                  className={`absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-b border-l transition-colors duration-300 ${
                    stat.highlight
                      ? "border-kh-pink/20 bg-kh-pink/10 text-kh-pink"
                      : "border-white/5 bg-white/2 text-gray-500 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 skew-x-[4deg]" />
                </div>

                {/* Scoreboard Number Counter Interface */}
                <div className="mt-4 mb-2 skew-x-[4deg]">
                  <span className="font-display text-5xl md:text-6xl text-white font-black leading-none tracking-tighter block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    {stat.value}
                  </span>
                </div>

                {/* Info and labels group */}
                <div className="w-full skew-x-[4deg] border-t border-white/5 pt-3 mt-2">
                  <span
                    className={`font-condensed font-black text-lg tracking-wide uppercase block leading-tight ${
                      stat.highlight
                        ? "text-kh-pink drop-shadow-[0_0_10px_rgba(234,76,137,0.2)]"
                        : "text-gray-200"
                    }`}
                  >
                    {stat.label}
                  </span>

                  <span className="text-gray-400 text-[11px] font-mono tracking-wider uppercase block mt-1">
                    {stat.sublabel}
                  </span>
                </div>

                {/* Subtle bottom highlights on hover */}
                <div
                  className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300 ${
                    stat.highlight ? "bg-kh-pink" : "bg-cyan-400"
                  }`}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
