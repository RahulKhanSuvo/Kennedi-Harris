import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowUpRight, Activity, ShieldCheck, Zap } from "lucide-react";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import heroBgImg from "@/assets/backgroud/Gemini_Generated_Image_6uclb26uclb26ucl.avif";
import heroPlayerImg from "@/assets/gallery/jump2.avif";
import { Link } from "react-router";

export function AboutHero({ dHeroImage }: { dHeroImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Background Parallax Scroll Engine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layer 1: Distant Sky Background
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Layer 2: Geometric Foreground / Court Line Overlays (Moves faster for 3D depth)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const shutterUpVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeScaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-36 pb-24 bg-[#0a0a0c] overflow-hidden flex items-center border-b border-white/5"
    >
      {/* ================= STACKED BACKGROUND PARALLAX LAYER SYSTEM ================= */}

      {/* 1. Base Layer: Deep Night Sky Background */}
      <motion.div
        style={{
          backgroundImage: `url(${heroBgImg})`,
          y: skyY,
          scale: skyScale,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 pointer-events-none will-change-transform z-0"
      />

      {/* 2. Blur Overlay (Sits right over base image before tints apply) */}
      <div className="absolute inset-0 backdrop-blur-[5px] z-0 pointer-events-none"></div>
      {/* DARK TO WHITE OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-l from-transparent to-black pointer-events-none z-10"></div>

      {/* ================= FOREGROUND CONTENT SYSTEM ================= */}
      <Container className="relative z-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: HERO MARKETING TEXT MATRIX */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 xl:space-y-10"
          >
            {/* Main Hardcore Display Typography */}
            <div className="space-y-3 xl:space-y-4">
              <div className="overflow-hidden py-1">
                <motion.h1
                  variants={shutterUpVariants}
                  className="font-display text-6xl md:text-8xl xl:text-9xl 2xl:text-[130px] font-semibold uppercase text-white leading-none"
                >
                  UNLEASHING
                  <br />
                  <span className="text-kh-pink">ELITE TALENT.</span>
                </motion.h1>
              </div>
            </div>

            {/* Narrative Subtitle Grid */}
            <div className="overflow-hidden max-w-2xl border-l-2 border-kh-pink pl-6 py-1">
              <motion.p
                variants={shutterUpVariants}
                className="text-zinc-400 font-sans font-light text-lg xl:text-2xl leading-relaxed"
              >
                Engineered with precise discipline and a legacy built on faith.
                Kennedi Harris combines explosive length, dynamic strategy, and
                clutch mechanics to redefine the game.
              </motion.p>
            </div>

            {/* Core Action Callouts */}
            <motion.div
              variants={shutterUpVariants}
              className="flex flex-wrap items-center gap-5 pt-4"
            >
              <Button asChild variant="khPrimary">
                <Link to="/schedule" className="group">
                  EXPLORE TIMELINE
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </Link>
              </Button>

              {/* <Button asChild variant="khOutline">
                <Link to="/about">PLAYER PROFILE</Link>
              </Button> */}
            </motion.div>

            {/* Quick Core Metric Matrix Widgets */}
            <motion.div
              variants={shutterUpVariants}
              className="pt-8 xl:pt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-white/5"
            >
              <div>
                <div className="font-display text-3xl xl:text-4xl font-black text-white">
                  CLASS
                </div>
                <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                  2030 Prospect
                </div>
              </div>
              <div>
                <div className="font-display text-3xl xl:text-4xl font-black text-kh-pink">
                  #11
                </div>
                <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                  Court Jersey
                </div>
              </div>
              <div>
                <div className="font-display text-3xl xl:text-4xl font-black text-white">
                  G / F
                </div>
                <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                  Position Profile
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: HIGH-VISIBILITY GRAPHIC CANVAS */}
          <motion.div
            variants={fadeScaleVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative flex justify-center items-center will-change-transform"
          >
            {/* Cyber HUD Accent Box */}
            <div className="w-full aspect-square xl:aspect-4/5 max-w-md xl:max-w-xl bg-neutral-950/40 border border-white/5 rounded-3xl relative overflow-hidden shadow-3xl backdrop-blur-md group">
              <div className="absolute inset-0 bg-linear-to-tr from-kh-pink/3 via-transparent to-cyan-500/2 pointer-events-none" />

              {/* Technical Blueprint Wireframe Layer */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 xl:p-10 opacity-30 select-none pointer-events-none">
                <div className="flex justify-between items-start font-mono text-[10px] xl:text-xs text-zinc-600">
                  <div>// HUD_GRID_FRAME_ALPHA</div>
                  <div className="flex items-center gap-1.5">
                    <Activity size={12} className="text-kh-pink" /> LOCK_ON
                  </div>
                </div>

                {/* Center Targeting Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/2 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-dashed border-white/5 rounded-full" />
                </div>

                <div className="flex justify-between items-end">
                  <div className="font-display text-6xl xl:text-7xl font-black text-zinc-800/20 tracking-tighter leading-none">
                    KH.11
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                    SYS_STATUS_ACTIVE
                  </div>
                </div>
              </div>

              {/* FLOATING TARGET INTERACTION GRAPHICS */}
              <div className="absolute top-8 right-8 z-20 bg-neutral-900/90 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-md shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-kh-pink/10 flex items-center justify-center text-kh-pink">
                  <Zap size={16} />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-zinc-500 font-bold uppercase leading-none">
                    EFFICIENCY
                  </div>
                  <div className="font-display text-sm font-black text-white mt-1">
                    HIGH RADIAL
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 z-20 bg-neutral-900/90 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-md shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-zinc-500 font-bold uppercase leading-none">
                    DEFENSIVE RANK
                  </div>
                  <div className="font-display text-sm font-black text-white mt-1">
                    ELITE LEVEL
                  </div>
                </div>
              </div>

              {/* PRIMARY PROSPECT PORTRAIT ANCHOR */}
              <div className="absolute inset-0 flex justify-center">
                <img
                  src={dHeroImage || heroPlayerImg}
                  alt="Kennedi Harris Main Presentation Profile"
                  className="w-full h-full object-fill md:object-contain object-bottom filter brightness-110 saturate-[0.9] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Cyber Highlight Trim Borders */}
              <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-kh-pink z-20" />
              <div className="absolute top-0 right-0 w-24 h-[2px] bg-cyan-500 z-20" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
