import { useRef } from "react";
import { motion, useScroll, type Variants } from "motion/react";
import {
  Award,
  Trophy,
  Target,
  Sparkles,
  Flame,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/common/Container";

import earlyLifeImg from "@/assets/about/pic1.avif";
import tournamentImg from "@/assets/about/pic2.avif";
import trainingImg from "@/assets/about/pic3.avif";
import recognitionImg from "@/assets/about/pic4.avif";
import meImg from "@/assets/modal/cd19294a-d030-4580-9dae-4de0473da04e.png";
import type { AboutData } from "@/types";

interface TimelineItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  stats: {
    value: string;
    label: string;
  };
  icon: LucideIcon;
  image: string;
}

interface TimelineBlockProps {
  item: TimelineItem;
  isEven: boolean;
  isLoading: boolean;
}

export function Timeline({
  data,
  isLoading,
}: {
  data: AboutData | null;
  isLoading: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineGridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineGridRef,
    offset: ["start 30%", "end center"],
  });

  const TIMELINE_DATA: TimelineItem[] = [
    {
      id: 1,
      tag: "ORIGIN STORY",
      title: "KENNEDI'S EARLY BEGINNINGS",
      subtitle: "TRAINED BY A PRO // AGE 6",
      description:
        "Kennedi Harris was born with a love for sports. At the tender age of 6, she discovered her passion for basketball from her Dad, Ken, who used to teach her the game. Growing up in an environment built on discipline, she quickly developed her foundational skills and began dominating local leagues.",
      stats: { value: "7", label: "Youth Leagues" },
      icon: Target,
      image: data?.earlyBeginningImgUrl || earlyLifeImg,
    },
    {
      id: 2,
      tag: "COMPETITIVE RISE",
      title: "FIRST TOURNAMENT VICTORY",
      subtitle: "THE BREAKOUT YEAR",
      description:
        "In her early years, Kennedi participated in various youth leagues, where she not only honed her skills but also learned the core components of elite teamwork. Her strategic gameplay, defensive length, and clutch scoring mechanics led her team to its first major championship series.",
      stats: { value: "37", label: "Tournaments Played" },
      icon: Trophy,
      image: data?.fristVictoryImgUrl || tournamentImg,
    },
    {
      id: 3,
      tag: "ELITE EVOLUTION",
      title: "COMMITMENT TO TRAINING",
      subtitle: "DAILY GRIND REQUISITES",
      description:
        "Kennedi’s dedication to high-performance development is evident in her daily training sessions. From morning ball-handling complexes to high-intensity vertical track routines, her commitment to elevating her skill ceiling serves as an inspiration to her peers.",
      stats: { value: "100+", label: "Elite Peers Faced" },
      icon: Flame,
      image: data?.tranningImgUrl || trainingImg,
    },
    {
      id: 4,
      tag: "CURRENT RECOGNITION",
      title: "ACCOLADES & MILESTONES",
      subtitle: "NATIONAL HARDWARE PROFILE",
      description:
        "Throughout her rising youth basketball trajectory, Kennedi has picked up numerous personal accolades, MVP honors, and defensive player recognition awards. This structural framework keeps her focused on long-term execution and high-profile team legacy.",
      stats: { value: "9", label: "Major Awards" },
      icon: Award,
      image: data?.accoladesMilestonesImgUrl || recognitionImg,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-14 bg-[#0a0a0c] relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="absolute top-0 right-0 w-[600px] xl:w-[900px] h-[600px] xl:h-[900px] bg-kh-blue/5 rounded-full filter blur-[180px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-1/4 left-0 w-[600px] xl:w-[900px] h-[600px] xl:h-[900px] bg-kh-pink/5 rounded-full filter blur-[180px] pointer-events-none animate-pulse duration-[10s]" />

      <Container className=" relative z-10">
        <div className=" flex  mb-20 items-center text-center flex-col">
          <div className="lg:col-span-8">
            <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-black text-xs xl:text-sm block mb-4">
              // CHRONOLOGICAL LEGACY
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-semibold uppercase  text-white">
              BUILT ON FAITH.
              <br />
              <span className="text-kh-pink">DRIVEN BY PURPOSE.</span>
            </h2>
          </div>
        </div>

        <div ref={timelineGridRef} className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-zinc-900 transform lg:-translate-x-1/2 pointer-events-none" />

          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b to-kh-pink from-white origin-top transform lg:-translate-x-1/2 pointer-events-none z-10"
          />

          <div className="space-y-40 xl:space-y-56">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <TimelineBlock
                  key={item.id}
                  item={item}
                  isEven={isEven}
                  isLoading={isLoading}
                />
              );
            })}
          </div>
        </div>

        {/* BOTTOM REFLECTIONS BLOCK */}
        <div className="mt-56 bg-neutral-950/40 border border-white/5 rounded p-8 md:p-12  relative overflow-hidden max-w-7xl 2xl:max-w-[1400px] mx-auto backdrop-blur-xl shadow-3xl">
          <div className="absolute inset-0 bg-linear-to-r from-kh-pink/3 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 xl:w-80 aspect-square rounded-full bg-linear-to-t from-kh-pink/20 to-transparent border border-white/10 overflow-hidden group">
                {isLoading ? (
                  <div className="w-full h-full bg-white/5 animate-pulse" />
                ) : (
                  <img
                    src={data?.playerReflectionImgUrl || meImg}
                    alt="Kennedi Harris Court Profile"
                    className="w-full h-[115%] object-contain object-bottom filter brightness-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 xl:space-y-8">
              <div className="flex items-center gap-2 text-kh-pink font-condensed tracking-widest text-xs xl:text-sm uppercase font-bold">
                <Sparkles size={14} /> PLAYER REFLECTIONS
              </div>
              <blockquote className="font-display text-2xl italic uppercase text-zinc-100 leading-snug tracking-wide">
                "Basketball is more than just a game for me; it’s a way of life.
                Every time I step onto the court, I feel a sense of freedom and
                excitement. My passion drives me to improve every single day."
              </blockquote>
              <div className="text-zinc-500 font-condensed text-xs xl:text-sm uppercase tracking-widest font-bold">
                — KENNEDI HARRIS // CLASS OF 2030
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineBlock({ item, isEven, isLoading }: TimelineBlockProps) {
  const Icon = item.icon;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const shutterUpVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const complexImageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 60,
      rotateZ: isEven ? 3 : -3,
      skewY: isEven ? 2 : -2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0,
      skewY: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center w-full min-h-[420px]">
      <div className="absolute left-4 lg:left-1/2 top-1/2 w-3.5 h-3.5 rounded-full bg-[#0a0a0c] border-2 border-kh-pink transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_15px_rgba(234,76,137,0.6)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        className={`pl-12 lg:pl-0 lg:col-span-6 space-y-5 xl:space-y-7 ${
          isEven
            ? "lg:order-1 lg:text-right lg:pr-16 xl:pr-24"
            : "lg:order-2 lg:pl-16 xl:pl-24"
        }`}
      >
        <div
          className={`overflow-hidden flex ${isEven ? "lg:justify-end" : "justify-start"}`}
        >
          <motion.div
            variants={shutterUpVariants}
            className="flex items-center gap-4"
          >
            <span className="font-condensed text-xs xl:text-sm font-black tracking-widest text-kh-pink bg-kh-pink/10 px-3 py-1.5 rounded-xs uppercase">
              {item.tag}
            </span>
            <span className="font-mono text-xs xl:text-sm text-zinc-500 font-bold">
              {item.subtitle}
            </span>
          </motion.div>
        </div>

        <div className="overflow-hidden py-1">
          <motion.h3
            variants={shutterUpVariants}
            className="font-display text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase text-white tracking-tight leading-none"
          >
            {item.title}
          </motion.h3>
        </div>

        <div className="overflow-hidden">
          <motion.p
            variants={shutterUpVariants}
            className={`text-zinc-400 font-sans font-light text-base xl:text-xl xl:leading-relaxed leading-relaxed max-w-2xl ${
              isEven ? "lg:ml-auto" : "lg:mr-auto"
            }`}
          >
            {item.description}
          </motion.p>
        </div>

        <div
          className={`pt-4 flex ${isEven ? "lg:justify-end" : "justify-start"}`}
        >
          <motion.div
            variants={shutterUpVariants}
            className="bg-neutral-950/50 border border-white/5 rounded-2xl p-5 xl:p-6 flex items-center gap-5 min-w-[240px] xl:min-w-[280px] shadow-2xl backdrop-blur-md hover:border-kh-pink/30 transition-colors duration-300"
          >
            <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-center text-kh-pink shrink-0">
              <Icon size={22} className="xl:w-6 xl:h-6" />
            </div>
            <div className="text-left">
              <div className="font-display text-2xl xl:text-4xl font-black text-white stroke-zinc-900 leading-none tracking-tight">
                {item.stats.value}
              </div>
              <div className="font-condensed text-[10px] xl:text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1.5">
                {item.stats.label}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* GRAPHIC BLOCKS SECTION */}
      <motion.div
        variants={complexImageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        className={`pl-12 lg:pl-0 lg:col-span-6 ${isEven ? "lg:order-2 lg:pl-16 xl:pr-0" : "lg:order-1 lg:pr-16 xl:pl-0"}`}
      >
        <div className="w-full aspect-16/10 xl:aspect-video bg-neutral-950/80 border border-white/5 rounded-2xl overflow-hidden relative group shadow-2xl backdrop-blur-xs">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />

          {isLoading ? (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-30 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
            />
          )}

          <div className="absolute inset-0 flex flex-col justify-between p-8 xl:p-12 opacity-30 group-hover:opacity-50 transition-opacity duration-500 select-none z-20">
            <div className="flex justify-between items-start">
              <div className="font-mono text-[11px] xl:text-xs text-white">
                // DATA_MATRIX_0{item.id}
              </div>
              <div className="font-mono text-[11px] xl:text-xs text-white">
                SYS_PROSPECT_PRO
              </div>
            </div>
            <div className="font-display text-7xl md:text-8xl xl:text-9xl font-black text-white/10 tracking-tighter leading-none">
              HARRIS 11
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-kh-pink group-hover:w-28 transition-all duration-300 z-20" />
          <div className="absolute top-0 right-0 w-16 h-[2px] bg-cyan-500 group-hover:w-28 transition-all duration-300 z-20" />
        </div>
      </motion.div>
    </div>
  );
}
