"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Target, Activity, Users, Star } from "lucide-react";
import meImg from "../../../assets/me-removebg-preview.png";
import Container from "@/components/common/Container";

const TIMELINE_DATA = [
  {
    id: 1,
    title: "EARLY BEGINNINGS",
    description:
      "My Dad started teaching me basketball when I was 6 years old. I fell in love with the game and it became my passion",
    date: "2016 - 2018",
    icon: Target,
  },
  {
    id: 2,
    title: "DEVELOPING THE GAME",
    description:
      "Years of hard work, training, and learning the game inside and out helped me grow on and off the court.",
    date: "2019 - 2021",
    icon: Target,
  },
  {
    id: 3,
    title: "RISING COMPETITOR",
    description:
      "Competing at a high level and facing tough opponents pushed me to elevate my game and mindset.",
    date: "2022 - 2023",
    icon: Activity,
  },
  {
    id: 4,
    title: "FBC UNITED",
    description:
      "Proud to represent FBC United and continue building toward my future goals.",
    date: "2022 - PRESENT",
    icon: Users,
  },
  {
    id: 5,
    title: "THE FUTURE",
    description:
      "Focused on growth, impact, and leaving a legacy that inspires the next generation.",
    date: "2030 & BEYOND",
    icon: Star,
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-kh-dark to-neutral-950 relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-kh-blue/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-kh-pink/5 rounded-full filter blur-[120px] pointer-events-none" />

      <Container>
        {/* Intro Section */}
        <div className="flex flex-col items-center text-center mb-28 max-w-2xl mx-auto">
          <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-black text-xs sm:text-sm mb-3 bg-kh-pink/10 px-3 py-1 rounded-sm border border-kh-pink/10">
            CHRONOLOGICAL LEGACY
          </span>

          <h2 className="font-display text-5xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tight text-white mb-6">
            BUILT ON FAITH.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink to-pink-500">
              DRIVEN BY PURPOSE.
            </span>
          </h2>

          <p className="text-gray-400 font-sans font-light text-sm md:text-base leading-relaxed">
            From early mornings to late-night grind sessions, every single
            developmental block has engineered the performance capacity seen on
            the court today.
          </p>
        </div>

        {/* Outer Layout Frame — Expanded max-w to host the larger cards beautifully */}
        <div className="relative mt-12 max-w-6xl mx-auto px-4 sm:px-0">
          {/* Background Track Rail */}
          <div className="absolute left-8 lg:left-1/2 top-4 bottom-24 w-[2px] bg-neutral-900 transform lg:-translate-x-1/2 pointer-events-none" />

          {/* Active Liquid Laser Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-8 lg:left-1/2 top-4 bottom-24 w-[2px] bg-gradient-to-b from-kh-pink via-pink-500 to-kh-blue origin-top transform lg:-translate-x-1/2 pointer-events-none z-10"
          />

          <div className="space-y-20 lg:space-y-28 relative">
            {TIMELINE_DATA.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isEven={isEven}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </div>

        {/* Spotlight Athlete Cutout Footer */}
        <div className="mt-32 relative max-w-xs mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-square max-h-[260px] flex items-end justify-center rounded-full bg-gradient-to-t from-kh-pink/10 via-transparent to-transparent border border-white/5 p-4 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-15" />
            <img
              src={meImg}
              alt="Kennedi Harris Action Profile"
              className="w-auto h-[110%] object-contain object-bottom drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-[2px] w-1/2 bg-gradient-to-r from-transparent via-kh-pink/40 to-transparent mt-4" />
        </div>
      </Container>
    </section>
  );
}

interface TimelineItemProps {
  item: (typeof TIMELINE_DATA)[0];
  isEven: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}

function TimelineItem({ item, isEven, Icon }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "start 45%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 0.97, 1]); // Slightly adjusted base scale to keep it crisp
  const xOffset = useTransform(scrollYProgress, [0, 1], [isEven ? 40 : -40, 0]);

  const nodeBg = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["rgba(10,10,10,1)", "rgba(234,76,137,1)"],
  );
  const nodeScale = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85],
    [1, 0.9, 1.15],
  );
  const nodeBorder = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["rgba(234,76,137,0.3)", "rgba(255,255,255,1)"],
  );

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col lg:flex-row items-start ${isEven ? "lg:justify-start" : "lg:justify-end"} w-full`}
    >
      {/* Central Interactive Node */}
      <motion.div
        style={{
          backgroundColor: nodeBg,
          scale: nodeScale,
          borderColor: nodeBorder,
        }}
        className="absolute left-8 lg:left-1/2 top-8 w-11 h-11 rounded-xs border-2 transform -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(234,76,137,0.1)] flex items-center justify-center transition-all duration-150"
      >
        <Icon className="w-5 h-5 text-white stroke-[2.5]" />
      </motion.div>

      {/* Enlarged Card Frame Component */}
      <motion.div
        style={{
          opacity,
          scale,
          x: xOffset,
          skewX: -4,
        }}
        whileHover={{
          y: -5,
          borderColor: "rgba(234,76,137,0.5)",
          boxShadow: "0 30px 45px -15px rgba(0,0,0,0.85)",
        }}
        className="w-full lg:w-[47%] ml-16 lg:ml-0 border border-white/5 bg-linear-to-br from-neutral-900/90 via-neutral-950/95 to-black p-8 rounded-md relative group transition-all duration-300 select-none will-change-transform shadow-xl"
      >
        {/* Neon Bracket Corners */}
        <div className="absolute top-0 left-0 w-16 h-[2px] bg-kh-pink group-hover:w-24 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-kh-blue group-hover:w-24 transition-all duration-300" />

        {/* Card Headline Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4 skew-x-[4deg]">
          <h3 className="font-condensed font-black text-2xl tracking-wide text-white uppercase group-hover:text-kh-pink transition-colors">
            {item.title}
          </h3>

          <span className="font-mono text-xs font-black tracking-widest text-kh-blue-light bg-kh-blue/10 border border-kh-blue/20 px-3 py-1.5 rounded-xs uppercase shrink-0 w-max">
            {item.date}
          </span>
        </div>

        {/* Narrative Paragraph */}
        <p className="text-gray-400 font-sans font-light text-base leading-relaxed tracking-wide skew-x-[4deg]">
          {item.description}
        </p>

        {/* Asymmetrical Large Identifier Index */}
        <div className="absolute bottom-2 right-6 font-display text-8xl font-black text-white/1.5 select-none leading-none tracking-tighter group-hover:text-kh-pink/3 transition-colors duration-300">
          0{item.id}
        </div>
      </motion.div>
    </div>
  );
}
