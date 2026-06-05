"use client";

import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Activity,
  Disc,
  ChevronRight,
} from "lucide-react";
import scheduleBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.avif";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const currentYear = new Date().getFullYear();

// Raw schedule tracks data structure directly mapped to your active parameters
const upcomingTracks = [
  {
    id: "01",
    status: "LIVE MATCHUP",
    date: "MAY 24-26, 2026",
    title: "AAU TOURNAMENT",
    opponent: "TEAM ELITE",
    location: "ATLANTA, GA",
    time: "TBD",
    tag: "T",
    active: true,
  },
  {
    id: "02",
    status: "SCHEDULED",
    date: "JUN 12-14, 2026",
    title: "NIKE EYBL SESSION",
    opponent: "CALI REBELS",
    location: "MEMPHIS, TN",
    time: "04:30 PM EST",
    tag: "E",
    active: false,
  },
  {
    id: "03",
    status: "SCHEDULED",
    date: "JUL 08-11, 2026",
    title: "NATIONAL SHOWCASE",
    opponent: "PRO LOOK CAMP",
    location: "ORLANDO, FL",
    time: "11:00 AM EST",
    tag: "N",
    active: false,
  },
];

export default function ScheduleHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-black pt-24 pb-12 overflow-hidden border-b border-white/5">
      {/* Editorial Tech Matrix Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <img
          src={scheduleBg}
          alt="Space Canvas"
          className="w-full h-full object-cover mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
      </div>

      {/* Cybernetic Accent Lighting Layout */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-linear-to-b from-white/10 via-transparent to-transparent hidden lg:block" />
      <div className="absolute bottom-[-10%] left-[-10%] pointer-events-none h-[450px] w-[450px] bg-kh-pink/5 blur-[150px] rounded-full" />
      <div className="absolute top-[20%] right-[-5%] pointer-events-none h-[500px] w-[500px] bg-cyan-500/5 blur-[150px] rounded-full" />

      <Container className="relative z-10 w-full flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
        {/* LEFT COLUMN: Rigid Editorial Identity Block */}
        <div className="flex flex-col justify-between lg:w-1/3 shrink-0 text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-kh-pink animate-pulse" />
              <span className="text-cyan-400 font-mono tracking-[0.3em] uppercase font-bold text-xs">
                BROADCAST TELEMETRY
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white m-0 mt-2">
              {currentYear}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                ROSTER
              </span>
              <span className="text-kh-pink">TRACKS.</span>
            </h1>
          </div>

          <div className="mt-8 lg:mt-24">
            <p className="text-zinc-400 font-sans font-light text-sm leading-relaxed max-w-sm">
              Live updates of upcoming court appearances, seasonal brackets, and
              elite circuits mapped across global destinations for Kennedi
              Harris.
            </p>
            <div className="mt-6 flex items-center gap-4 text-zinc-600 font-mono text-[10px] tracking-wider uppercase">
              <span>REF_ID // INDEX_2026</span>
              <span>•</span>
              <span>SEC_COURT_01</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Grid Horizontal Card Engine */}
        <div className="flex flex-col justify-center flex-1 w-full overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
              SCROLL RADIAL EVENTS ({upcomingTracks.length})
            </span>
            <div className="flex gap-1 h-px w-24 bg-white/10 relative">
              <div className="absolute top-1/2 left-0 w-8 h-1 bg-kh-pink -translate-y-1/2" />
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch w-full"
          >
            {upcomingTracks.map((track) => (
              <motion.div
                key={track.id}
                variants={panelVariants}
                whileHover={{ y: -5, borderColor: "rgba(255, 0, 85, 0.3)" }}
                className={`relative flex flex-col justify-between p-6 bg-zinc-950/40 backdrop-blur-md border transition-all duration-300 overflow-hidden text-left min-h-[360px] group
                  ${
                    track.active
                      ? "border-kh-pink/30 shadow-[0_20px_40px_-15px_rgba(255,0,85,0.15)]"
                      : "border-white/5 hover:bg-zinc-900/20"
                  }`}
              >
                {/* Visual Status Ribbon Layer */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2">
                    <Disc
                      className={`w-3 h-3 ${track.active ? "text-kh-pink animate-spin" : "text-zinc-600"}`}
                      style={{ animationDuration: "4s" }}
                    />
                    <span
                      className={`font-mono text-[9px] tracking-widest font-bold uppercase ${track.active ? "text-kh-pink" : "text-zinc-400"}`}
                    >
                      {track.status}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-zinc-600 bg-black/60 px-2 py-0.5 border border-white/5">
                    #{track.id}
                  </span>
                </div>

                {/* Core Match Content Typography */}
                <div className="my-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-condensed font-bold text-xs tracking-wider text-zinc-400 uppercase">
                      {track.date}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-none uppercase tracking-tight mb-4 group-hover:text-kh-pink transition-colors duration-300">
                    {track.title}
                  </h3>

                  {/* Opponent Identity Strip */}
                  <div className="flex items-center gap-3 bg-black/40 p-2.5 border border-white/5 rounded-xs">
                    <div className="w-7 h-7 rounded-xs bg-zinc-800 flex items-center justify-center text-xs font-black text-white transform -skew-x-6 border border-white/10 group-hover:bg-kh-pink group-hover:border-transparent transition-colors duration-500">
                      {track.tag}
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-wider leading-none">
                        VS MATCHUP
                      </span>
                      <span className="font-sans font-bold text-sm text-zinc-200 uppercase tracking-wide">
                        {track.opponent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footprint Specifications Layout */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 text-zinc-400 font-sans text-xs">
                      <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="truncate uppercase tracking-wide font-medium">
                        {track.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 font-sans text-xs">
                      <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="uppercase tracking-wide font-medium">
                        {track.time}
                      </span>
                    </div>
                  </div>

                  {/* Contextual Action Trigger */}
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300">
                    <span>ACQUIRE SEAT REGISTRATION</span>
                    <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:translate-x-1 group-hover:text-kh-pink transition-all duration-300" />
                  </div>
                </div>

                {/* Absolute Card Underline Tech Indicator */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 bg-gradient-to-r from-kh-pink to-cyan-400 ${track.active ? "w-full" : "w-0 group-hover:w-1/3"}`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Anchor Multi-Track Bottom Bar Link */}
          <div className="mt-8 flex justify-start">
            <a
              href="#all-dates"
              className="py-3 px-6 bg-zinc-950 border border-white/10 hover:border-kh-pink flex items-center gap-4 text-white transition-all duration-300 font-condensed font-bold tracking-wider text-xs uppercase hover:bg-zinc-900 group"
            >
              <span>ACCESS PERPENDICULAR HISTORICAL DATES</span>
              <ArrowRight className="w-4 h-4 text-kh-pink transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
