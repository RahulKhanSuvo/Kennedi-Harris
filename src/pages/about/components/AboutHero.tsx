import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Activity, ShieldCheck, Zap } from "lucide-react";
import Container from "@/components/common/Container";

import heroPlayerImg from "@/assets/gallery/934a20cc-5406-4916-8cf6-5bc1b61c7eb9.jpeg";

export function AboutHero() {
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
    <section className="relative min-h-screen pt-36 pb-24 bg-[#0a0a0c] overflow-hidden flex items-center border-b border-white/5">
      {/* ================= BACKGROUND SYSTEM SHIFT ================= */}
      {/* 1. High-Density Tactical Dot Matrix Pattern instead of a line grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e24_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* 2. Abstract Court Vector Lines (Creates unique layout angles behind content) */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none select-none">
        <svg
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="-10%"
            y1="20%"
            x2="110%"
            y2="50%"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="30%"
            y1="-10%"
            x2="80%"
            y2="110%"
            stroke="white"
            strokeWidth="1.5"
          />
          <circle
            cx="75%"
            cy="40%"
            r="300"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* 3. Deep Vignette Radial Mask to isolate glow fields */}
      <div className="absolute inset-0 bg-radial-[at_70%_30%] from-kh-pink/[0.04] via-kh-blue/[0.02] to-transparent pointer-events-none" />

      {/* 4. Layered Kinetic Ambient Lighting Nodes */}
      <div className="absolute -top-40 -left-40 w-[600px] xl:w-[900px] h-[600px] xl:h-[900px] bg-cyan-500/[0.03] rounded-full filter blur-[150px] pointer-events-none animate-pulse duration-[14s]" />
      <div className="absolute top-1/2 right-[-10%] w-[700px] xl:w-[1100px] h-[700px] xl:h-[1100px] bg-kh-pink/[0.06] rounded-full filter blur-[180px] pointer-events-none animate-pulse duration-[8s]" />
      {/* ========================================================== */}

      <Container className=" relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: HERO MARKETING TEXT MATRIX */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 xl:space-y-10"
          >
            {/* Live Status Badge
            <div className="overflow-hidden inline-block">
              <motion.div
                variants={shutterUpVariants}
                className="flex items-center gap-2.5 bg-neutral-950/80 border border-white/10 rounded-full pl-2 pr-4 py-1.5 backdrop-blur-md"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kh-pink opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-kh-pink"></span>
                </span>
                <span className="font-mono text-[10px] xl:text-xs text-zinc-400 uppercase tracking-widest font-bold">
                  PROJECT // HARRIS_EVOLUTION_2030
                </span>
              </motion.div>
            </div> */}

            {/* Main Hardcore Display Typography */}
            <div className="space-y-3 xl:space-y-4">
              <div className="overflow-hidden py-1">
                <motion.h1
                  variants={shutterUpVariants}
                  className="font-display text-6xl md:text-8xl xl:text-9xl 2xl:text-[130px] font-semibold  uppercase text-white"
                >
                  UNLEASHING
                  <br />
                  <span className=" text-kh-pink">ELITE TALENT.</span>
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
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 bg-white text-black font-condensed uppercase font-black text-sm xl:text-base px-8 py-4 rounded-xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                EXPLORE TIMELINE
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-white/10 bg-neutral-950/40 hover:bg-neutral-950/80 hover:border-kh-pink/40 text-zinc-300 hover:text-white font-condensed uppercase font-bold text-sm xl:text-base px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300"
              >
                PLAYER PROFILE
              </a>
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
            className="lg:col-span-5 relative flex justify-center items-center"
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
                {/* UNCOMMENT & MOUNT IMAGE WHEN ASSET IS READY */}

                <img
                  src={heroPlayerImg}
                  alt="Kennedi Harris Main Presentation Profile"
                  className="w-full h-full object-contain object-bottom filter brightness-110 saturate-[0.9] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Fallback Display Graphic Place-Card */}
                {/* <div className="mb-24 text-center space-y-2 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                  <Sparkles size={24} className="mx-auto text-kh-pink animate-spin duration-[6s]" />
                  <div className="font-condensed text-xs text-zinc-500 uppercase tracking-widest font-black">
                    [ MOUNT PORTRAIT ASSET HERE ]
                  </div>
                </div> */}
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
