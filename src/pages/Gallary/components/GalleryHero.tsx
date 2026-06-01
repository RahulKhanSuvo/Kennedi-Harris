"use client";

import { useRef } from "react";
import { Grid, Layers, ArrowDown } from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";
import Container from "@/components/common/Container";

import galleryHeroMain from "@/assets/gallery/dribling3.avif";
import galleryHeroSub from "@/assets/gallery/working.avif";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

// Stagger orchestrator for left column narrative items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: kineticSpring },
  },
};

// Custom kinetic reveal variants for the layered graphics panel
const graphicShellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -3,
    transition: { duration: 1.1, ease: kineticSpring, delay: 0.2 },
  },
};

const foregroundFrameVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 2,
    transition: { duration: 1.2, ease: kineticSpring, delay: 0.35 },
  },
};

const floatingMiniFrameVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.85, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: -6,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
      delay: 0.6,
    },
  },
};

export function GalleryHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Triggers once 15% of the hero layout is present in the viewport frame
  const isHeroInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#09090b] border-b border-white/5 overflow-hidden"
    >
      {/* Decorative Editorial Background Text Grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-kh-pink/5 blur-[150px] pointer-events-none" />

      {/* Kinetic reveal for the large background asset counter string */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isHeroInView ? { opacity: 0.02, x: 0 } : {}}
        transition={{ duration: 1.5, ease: kineticSpring }}
        className="absolute -left-12 top-1/3 text-[14vw] font-display font-black text-white uppercase select-none tracking-tighter leading-none pointer-events-none layout-will-change"
      >
        VISUALS // 11
      </motion.div>

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN (7 Columns) — Typography & Core Narrative */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Section Breadcrumb Badge */}
          <motion.div
            variants={itemVariants}
            className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-3 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-kh-pink inline-block" />
            Media Gallery
          </motion.div>

          {/* Giant Title Typography Stacks */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-6xl sm:text-7xl xl:text-8xl font-semibold text-white uppercase mb-8"
          >
            MOMENTS.
            <br />
            <span className="text-kh-pink">MEMORIES.</span>
          </motion.h1>

          {/* Body Content Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-sans font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            A collection of moments that define the journey, the grind, and the
            game I love. Each frame captures the sweat behind closed doors and
            the energy on the court.
          </motion.p>

          {/* Action Metrics Row / Quick Controls Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 sm:gap-10 border-t border-white/5 pt-8 max-w-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-kh-pink">
                <Layers size={18} />
              </div>
              <div>
                <div className="font-condensed font-bold text-white uppercase text-sm tracking-wider">
                  ALL MEDIA
                </div>
                <div className="text-xs text-gray-500 font-sans">
                  Photos & Highlights
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Grid size={18} />
              </div>
              <div>
                <div className="font-condensed font-bold text-white uppercase text-sm tracking-wider">
                  ARCHIVE
                </div>
                <div className="text-xs text-gray-500 font-sans">
                  Filtered by Seasons
                </div>
              </div>
            </div>

            {/* Micro-Scroll Down Anchor Button */}
            <a
              href="#gallery-grid"
              className="ml-auto h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-kh-pink hover:bg-kh-pink/10 transition-all duration-300 group"
            >
              <ArrowDown
                size={16}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (5 Columns) — Premium Layered Graphic Composition */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end pt-8 lg:pt-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none aspect-square">
            {/* Background Structural Accent Box */}
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={graphicShellVariants}
              whileHover={{ rotate: 0 }}
              className="absolute inset-0 bg-[#111115] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-0 group will-change-transform"
            >
              <div className="absolute inset-0 dot-grid opacity-[0.1]" />
              <div className="absolute bottom-6 left-6 font-display text-4xl text-white/5 font-black uppercase">
                THE GRIND
              </div>
            </motion.div>

            {/* Main Foreground Frame Canvas */}
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={foregroundFrameVariants}
              whileHover={{ rotate: 0, scale: 1.01 }}
              className="absolute inset-4 bg-[#16161c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 flex items-end will-change-transform"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent z-10" />

              {/* Main Image Replacement Layer */}
              <div className="w-full h-full bg-[#1c1c24] flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase">
                <img
                  src={galleryHeroMain}
                  alt="On Court Action"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Frame Badge Tag */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md">
                <span className="w-2 h-2 rounded-full bg-kh-pink animate-pulse" />
                <span className="font-condensed text-[10px] tracking-widest text-white uppercase">
                  IN-GAME CAPTURES
                </span>
              </div>
            </motion.div>

            {/* Asymmetrical Offset Floating Secondary Mini-Frame */}
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={floatingMiniFrameVariants}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -bottom-6 -left-6 sm:-left-10 w-1/2 aspect-square bg-[#1a1a22] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-20 hidden sm:block will-change-transform"
            >
              <div className="w-full h-full bg-[#22222a] flex items-center justify-center text-gray-600 font-condensed text-[9px] tracking-wider uppercase text-center">
                <img
                  src={galleryHeroSub}
                  alt="Training Session"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
