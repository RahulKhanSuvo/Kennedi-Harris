import { Handshake, Download, FileText, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

// Kinetic physics curves for premium fluid motion
const fluidSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: fluidSpring },
  },
};

const rightWidgetVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: fluidSpring, delay: 0.2 },
  },
};

const actionRowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: fluidSpring, delay: 0.3 },
  },
};

const metricsData = [
  { value: "150K+", label: "Total Audience Reach" },
  { value: "8.4%", label: "Engagement Ratio" },
  { value: "24.2", label: "PPG Elite Division" },
];

export default function BrandPartnerHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050607] pt-20">
      {/* Cinematic Media Layer Backing */}
      <div className="absolute inset-0 z-0 opacity-35 mix-blend-luminosity scale-105 animate-[pulse_8s_ease-in-out_infinite]">
        <img
          src={backgroundImage}
          alt="Kennedi Harris Action Showcase"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/80 to-[#050607]"></div>

      {/* Structural Minimal Grid Accents */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.03] hidden xl:block pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-white/[0.03] hidden xl:block pointer-events-none" />

      {/* Main Core Platform Interface */}
      <Container className="relative z-10 flex flex-col justify-center flex-grow pt-16 pb-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left - Narrative Title Statement */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div
              variants={textRevealVariants}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/[0.03] border border-white/10 rounded-full font-condensed font-black tracking-widest text-kh-pink text-[11px] uppercase"
            >
              <span className="h-2 w-2 rounded-full bg-kh-pink shadow-[0_0_10px_#f1136a] animate-ping" />
              Now accepting NIL Collaborations
            </motion.div>

            <motion.h1
              variants={textRevealVariants}
              className="font-display text-5xl sm:text-7xl xl:text-[95px] leading-[0.85] text-white tracking-tight uppercase"
            >
              Elevate Your Story With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink via-rose-400 to-white">
                Kennedi Harris
              </span>
            </motion.h1>
          </div>

          {/* Right - Premium Performance Metrics Data Deck */}
          <motion.div
            variants={rightWidgetVariants}
            className="lg:col-span-5 w-full bg-neutral-900/20 border border-white/5 p-6 lg:p-8 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />

            <p className="font-condensed text-zinc-400 tracking-wider text-sm uppercase leading-relaxed mb-6 border-b border-white/5 pb-4">
              Align your global identity with elite athletic precision,
              high-conversion audience engagement, and an authentic legacy
              crafted daily.
            </p>

            {/* Performance Node Layout Grid */}
            <div className="grid grid-cols-3 gap-2">
              {metricsData.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col border-l border-white/10 pl-3 first:border-0 first:pl-0"
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-kh-pink transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="font-condensed text-[10px] tracking-wider text-zinc-500 uppercase mt-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Action Hub - Staggered Row Matrix Triggers */}
        <motion.div
          variants={actionRowVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
        >
          <button className="flex items-center justify-between p-5 bg-white text-black font-condensed font-black tracking-widest text-sm uppercase group hover:bg-kh-pink hover:text-white transition-all duration-300 rounded-lg cursor-pointer shadow-xl shadow-black/40">
            <span className="flex items-center gap-3">
              <Handshake size={18} />
              Pitch a Partnership
            </span>
            <ArrowUpRight
              size={16}
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>

          <button className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 text-white font-condensed font-black tracking-widest text-sm uppercase group hover:bg-neutral-900/80 hover:border-white/20 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="flex items-center gap-3">
              <Download
                size={18}
                className="text-kh-pink group-hover:scale-110 transition-transform duration-300"
              />
              Download NIL Deck
            </span>
            <span className="text-[10px] text-zinc-500 font-mono border border-white/10 px-1.5 py-0.5 rounded bg-black/40">
              PDF
            </span>
          </button>

          <button className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 text-white font-condensed font-black tracking-widest text-sm uppercase group hover:bg-neutral-900/80 hover:border-white/20 transition-all duration-300 rounded-lg cursor-pointer">
            <span className="flex items-center gap-3">
              <FileText
                size={18}
                className="text-kh-pink group-hover:scale-110 transition-transform duration-300"
              />
              Media & Press Kit
            </span>
            <span className="text-[10px] text-zinc-500 font-mono border border-white/10 px-1.5 py-0.5 rounded bg-black/40">
              ZIP
            </span>
          </button>
        </motion.div>
      </Container>

      {/* Infinite/Clean Static Ticker Row Anchor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 w-full bg-neutral-950/40 border-t border-white/5 py-6 mt-auto backdrop-blur-xs"
      >
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="font-condensed text-[10px] tracking-[0.25em] text-zinc-500 font-bold uppercase whitespace-nowrap">
              Featured Partnerships & Press
            </div>

            <div className="flex flex-wrap items-center gap-8 md:gap-14 opacity-30 grayscale hover:opacity-50 transition-opacity duration-300">
              <span className="font-display text-base tracking-widest text-white uppercase font-black italic">
                NIKE / EYBL
              </span>
              <span className="font-display text-base tracking-widest text-white uppercase font-black">
                GATORADE
              </span>
              <span className="font-display text-base tracking-widest text-white uppercase font-medium tracking-loose">
                Wilson
              </span>
              <span className="font-display text-base tracking-widest text-white uppercase font-black italic">
                SLAM MAG
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
