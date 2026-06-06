"use client";

import { motion } from "motion/react";
import { Star, User, GraduationCap, Users, ArrowRight } from "lucide-react";
// import aboutImg from "@/assets/me-removebg-preview.png";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Link } from "react-router";

const features = [
  {
    icon: Star,
    title: "COMPETITIVE",
    desc: "Relentless on both ends",
  },
  {
    icon: User,
    title: "LEADER",
    desc: "Leads by example",
  },
  {
    icon: GraduationCap,
    title: "STUDENT",
    desc: "Academic driven",
  },
  {
    icon: Users,
    title: "TEAM FIRST",
    desc: "Success together",
  },
];

// Left Side: Image Slide-In
const imageContainerVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
} as const;

// Middle Side: Text Blocks Fade-Up
const contentContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 14, delay: 0.15 },
  },
} as const;

// Right Side: Staggered Traits List
const traitsListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
} as const;

const traitItemVariants = {
  hidden: { opacity: 0, x: 30, skewX: -4 },
  show: {
    opacity: 1,
    x: 0,
    skewX: -4,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
} as const;

export default function AboutSection({ second_img }: { second_img?: string }) {
  return (
    <section className="bg-kh-dark relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-5">
          {/* Left - Image Column */}
          <motion.div
            variants={imageContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center will-change-transform "
          >
            <div className="dot-grid absolute w-32 h-[60%] -left-10 top-[10%] opacity-30"></div>
            <div className="absolute left-0 bottom-0 w-2 h-full transform -skew-x-24 -translate-x-4 hidden lg:block bg-[linear-gradient(to_top,#0046c0_0%,#0046c0_50%,#f1136a_50%,#f1136a_100%)]" />
            <div className="absolute left-0 bottom-0 w-2 h-2/5 bg-linear-to-t from-kh-blue to-transparent transform -skew-x-24 translate-x-10 hidden lg:block" />

            <div className="relative z-10 w-full max-w-[380px] aspect-3/4 rounded overflow-hidden bg-linear-to-b  shadow-2xl">
              <img
                src={second_img}
                alt="About Kennedi"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-kh-gray font-condensed tracking-wider text-xs">IMAGE PLACEHOLDER</div>';
                }}
              />
              <div className="absolute bottom-6 right-8 font-display text-[110px] leading-none outline-text opacity-25 select-none font-black tracking-tighter">
                11
              </div>
            </div>
          </motion.div>

          {/* Middle - Narrative Biography Block */}
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-full lg:flex-1 flex flex-col justify-center gap-2 will-change-transform text-center lg:text-left items-center lg:items-start"
          >
            <div className="font-condensed font-black tracking-[0.2em] text-kh-pink text-xs sm:text-sm uppercase">
              ABOUT KENNEDI
            </div>

            <h2 className="font-condensed font-semibold text-4xl sm:text-6xl xl:text-7xl text-white uppercase leading-[0.92] tracking-tight italic">
              PURPOSE DRIVES.
              <br />
              <span className="text-kh-pink">PASSION DEFINES.</span>
            </h2>

            <div className="text-gray-400 text-sm md:text-base leading-relaxed space-y-4 font-sans font-light max-w-xl">
              <p>
                Kennedi Harris is a Class of 2030 basketball prospect known for
                her rare combination of size, versatility, rebounding, shot
                blocking, and guard-level skill. At 6'4, she impacts the game on
                both ends of the floor with the ability to score, defend,
                rebound, push the ball, and create opportunities for her team.
              </p>
              <p>
                Her journey is rooted in purpose, discipline, family, and
                legacy. Kennedi plays with a competitive edge and continues to
                develop into one of the most exciting young prospects in girls
                basketball.
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 mt-2 w-full flex justify-center lg:justify-start">
              <Button variant="khOutlineLight" className="group" asChild>
                <Link to="/about">
                  LEARN MORE ABOUT KENNEDI
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right - Traits Performance Column */}
          <motion.div
            variants={traitsListVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[35%] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-10 gap-4 will-change-transform"
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={traitItemVariants}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 bg-white/1 hover:bg-white/3 border border-white/0 hover:border-white/5 p-3.5 rounded transition-all duration-300 group skew-x-[-4deg]"
                >
                  {/* Icon Circle Shield */}
                  <div className="rounded-full border-2 border-kh-pink p-3.5 text-kh-pink group-hover:bg-kh-pink group-hover:text-white group-hover:shadow-[0_0_15px_rgba(234,76,137,0.4)] transition-all duration-300 shrink-0 skew-x-[4deg]">
                    <Icon
                      strokeWidth={2.5}
                      className="w-5 h-5 group-hover:text-white"
                    />
                  </div>

                  {/* Text Descriptors */}
                  <div className="skew-x-[4deg]">
                    <div className="font-condensed font-black tracking-wider text-white text-base uppercase leading-tight">
                      {item.title}
                    </div>
                    <div className="text-gray-400 text-xs font-mono uppercase tracking-wider mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
