"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type Variants,
} from "motion/react";
import Container from "@/components/common/Container";
import { Star, LineChart, LayoutGrid, Trophy } from "lucide-react";
import { FaBasketballBall } from "react-icons/fa";
import type { HomeNumbers } from "@/types";

interface SeasonStatsProps {
  stats: HomeNumbers | undefined;
  isLoading: boolean;
}

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: kineticSpring,
    },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const sportsCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

/**
 * ⚡ Direct DOM-mutation DigitCounter
 * Safely handles strings or integers from your live database.
 */
function DigitCounter({ value, trigger }: { value: string; trigger: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  // Extract number and trailing symbols safely (e.g. "16+" -> 16 and "+")
  const numericTarget = parseFloat(value) || 0;
  const suffix = value.replace(/[0-9.]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!trigger) return;

    const controls = animate(count, numericTarget, {
      duration: 1.5,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [numericTarget, count, trigger]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${latest}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return (
    <span ref={nodeRef} className="will-change-transform">
      0{suffix}
    </span>
  );
}

export function SeasonStats({ stats, isLoading }: SeasonStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Triggers precisely when 30% of the statistical frame layer is captured by viewport
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  // Map dynamic live stats directly into your custom design matrix structure
  const dynamicStatsList = [
    {
      id: 1,
      value: stats?.PPG || "0",
      label: "PPG",
      sublabel: "Points Per Game",
      icon: Star,
      highlight: false,
    },
    {
      id: 2,
      value: stats?.RPG || "0",
      label: "RPG",
      sublabel: "Rebounds Per Game",
      icon: FaBasketballBall,
      highlight: false,
    },
    {
      id: 3,
      value: stats?.BPG || "0",
      label: "BPG",
      sublabel: "Blocks Per Game",
      icon: LineChart,
      highlight: false,
    },
    {
      id: 4,
      value: stats?.DOUBLE_DOUBLES || "0",
      label: "DOUBLE-DOUBLES",
      sublabel: "This Season",
      icon: LayoutGrid,
      highlight: true,
    },
    {
      id: 5,
      value: stats?.REBOUNDS || "0", // Fallback parameter matching your API structure
      label: "GAME HIGH REBOUNDS",
      sublabel: "Season Record",
      icon: Trophy,
      highlight: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-10 relative overflow-hidden bg-black/40 border-t border-white/5"
    >
      {/* Decorative Sport Tech Line Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px max-w-7xl bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6 text-left"
        >
          <div className="space-y-1">
            <h2 className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none m-0">
              SEASON LEADERSHIP <span className="text-kh-pink">METRICS</span>
            </h2>
          </div>
        </motion.div>

        {/* Dynamic Sports Grid Container */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView={isSectionInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-8"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="relative p-6 flex flex-col justify-between items-start min-h-[220px] w-full"
                >
                  {/* Matching skewed background skeleton container */}
                  <div className="absolute inset-0 transform -skew-x-3 bg-zinc-900/40 border border-white/5 rounded-sm animate-pulse" />
                  <div className="relative z-10 w-full h-full flex flex-col justify-between" />
                </div>
              ))
            : dynamicStatsList.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    variants={sportsCardVariants}
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    className="group relative p-6 flex flex-col justify-between items-start text-left min-h-[220px] select-none transition-all duration-300"
                  >
                    {/* Visual Fix: The Skewed Background Shell Plate */}
                    <div
                      className={`absolute inset-0 transform -skew-x-3 transition-all duration-300 rounded-sm border ${
                        stat.highlight
                          ? "bg-linear-to-br from-kh-pink/8 via-zinc-950 to-black border-kh-pink/30 shadow-[0_12px_35px_-12px_rgba(234,76,137,0.25)] group-hover:border-kh-pink/60"
                          : "bg-linear-to-br from-zinc-900/50 to-zinc-950 border-white/5 group-hover:border-white/20 group-hover:bg-zinc-900/80"
                      }`}
                    />

                    {/* Asymmetric Tech Corner Icon Plate */}
                    <div
                      className={`absolute top-0 right-0 w-9 h-9 flex items-center justify-center border-b border-l transition-colors duration-300 transform -skew-x-3 rounded-bl-sm ${
                        stat.highlight
                          ? "border-kh-pink/20 bg-kh-pink/10 text-kh-pink"
                          : "border-white/5 bg-white/2 text-zinc-500 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 transform skew-x-3" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-6">
                      {/* Scoreboard Metric Number Display with Live Dynamic Payload Counters */}
                      <div className="mt-2">
                        <span className="font-display text-5xl md:text-6xl text-white font-black leading-none tracking-tighter block drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                          <DigitCounter
                            value={stat.value}
                            trigger={isSectionInView}
                          />
                        </span>
                      </div>

                      {/* Info Labels Bracket */}
                      <div className="w-full border-t border-white/5 pt-3">
                        <span
                          className={`font-condensed font-black text-lg tracking-wide uppercase block leading-tight transition-colors duration-300 ${
                            stat.highlight
                              ? "text-kh-pink drop-shadow-[0_0_12px_rgba(234,76,137,0.2)]"
                              : "text-zinc-200 group-hover:text-white"
                          }`}
                        >
                          {stat.label}
                        </span>

                        <span className="text-zinc-400 text-[11px] font-mono tracking-wider uppercase block mt-1.5">
                          {stat.sublabel}
                        </span>
                      </div>
                    </div>

                    {/* Speed-Glow Underline Accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-300 transform -skew-x-3 rounded-b-sm ${
                        stat.highlight ? "bg-kh-pink" : "bg-cyan-400"
                      }`}
                    />
                  </motion.div>
                );
              })}
        </motion.div>
      </Container>
    </section>
  );
}
