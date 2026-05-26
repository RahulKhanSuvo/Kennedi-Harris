"use client";

import { Link } from "react-router";
import { motion, type Variants } from "motion/react";
import {
  Download,
  ArrowRight,
  Activity,
  ShieldCheck,
  Cpu,
  Camera,
  Film,
  FileUser,
  BarChart3,
} from "lucide-react";
import Container from "@/components/common/Container";

// Top entry tracking reveals
const telemetryHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Interface scale-pop reveal specs
const instrumentCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

export default function AboutAndAssets() {
  const assets = [
    {
      id: 1,
      title: "PHOTOS // PRIMARY",
      count: "120+ CAPTURES AVAILABLE",
      format: "RAW_DATA // .JPG",
      resolution: "8240 x 5632 PX",
      bgGradient: "from-zinc-950 via-zinc-900/80 to-cyan-500/10",
      gridClass: "md:col-span-2 lg:col-span-7 h-[260px] lg:h-[300px]",
      Icon: Camera,
      metaType: "IMAGE_CAPS",
    },
    {
      id: 2,
      title: "VIDEO // STREAM",
      count: "15+ BROADCAST CUTS",
      format: "4K_PRORES // .MP4",
      resolution: "2160P // 60 FPS",
      bgGradient: "from-zinc-950 via-zinc-900/80 to-kh-pink/10",
      gridClass: "md:col-span-1 lg:col-span-5 h-[260px] lg:h-[300px]",
      Icon: Film,
      metaType: "VIDEO_REELS",
    },
    {
      id: 3,
      title: "BIOGRAPHY // TEXT",
      count: "DOSSIER VERIFIED",
      format: "PRINT_READY // .PDF",
      resolution: "8.5 x 11 INCHES",
      bgGradient: "from-zinc-950 via-zinc-900/80 to-zinc-800/30",
      gridClass: "md:col-span-1 lg:col-span-4 h-[240px]",
      Icon: FileUser,
      metaType: "DOC_DOSSIER",
    },
    {
      id: 4,
      title: "STATS // METRICS",
      count: "OFFICIAL BOX TRACKING",
      format: "SECURE_LOG // .PDF",
      resolution: "COMPREHENSIVE LEVEL",
      bgGradient: "from-zinc-950 via-zinc-900/80 to-cyan-500/5",
      gridClass: "md:col-span-2 lg:col-span-8 h-[240px]",
      Icon: BarChart3,
      metaType: "ANALYTICS",
    },
  ];

  const handleDownloadAll = () => {
    alert("Downloading all media assets bundle...");
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Structural Graphic HUD Details: Grid framework lines cutting edge-to-edge */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
      <div className="absolute inset-x-0 top-[35%] h-px bg-white/10 pointer-events-none opacity-40" />
      <div className="absolute left-[30%] inset-y-0 w-px bg-white/5 pointer-events-none hidden lg:block" />

      <Container className="relative z-10 flex flex-col gap-12">
        {/* Top Graphical Row: Telemetry Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={telemetryHeaderVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-8"
        >
          {/* Header left */}
          <div className="lg:col-span-7 text-left relative">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-kh-pink font-mono text-[9px] tracking-[0.3em] uppercase font-bold block">
                // SECURE ATHLETE CORE STORAGE
              </span>
              <div className="h-px bg-kh-pink/30 flex-1 max-w-[120px]" />
              <Activity className="w-3.5 h-3.5 text-kh-pink animate-pulse" />
            </div>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tighter uppercase m-0 text-white">
              ASSET <span className="text-kh-pink">DATABASE.</span>
            </h2>
          </div>

          {/* Header Right: Fills empty space with tech readouts */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:pb-1">
            <div className="flex items-center gap-6 text-left font-mono text-[10px] text-zinc-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>SSL_ENCRYPTED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                <span>NODE_v1.0.2</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-xs font-condensed font-black tracking-widest text-white hover:text-kh-pink transition-colors uppercase"
              >
                <span>BIO PROFILE</span>
                <ArrowRight className="w-3.5 h-3.5 text-kh-pink transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-zinc-700 font-mono text-[10px] select-none">
                //
              </span>
              <button
                onClick={handleDownloadAll}
                className="group inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase"
              >
                <span>ZIP BUNDLE</span>
                <Download className="w-3.5 h-3.5 text-zinc-600 group-hover:text-kh-pink transition-colors" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Graphical Row: Highly Detailed Interface Grid Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={gridContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 items-stretch"
        >
          {assets.map((asset) => {
            const AssetIcon = asset.Icon;
            return (
              <motion.div
                key={asset.id}
                variants={instrumentCardVariants}
                className={`group relative border border-white/10 overflow-hidden bg-zinc-950 rounded-none flex flex-col justify-between p-5 lg:p-6 cursor-pointer hover:border-kh-pink/40 transition-colors duration-300 ${asset.gridClass}`}
              >
                {/* Visual HUD Crosshair Details in corners to cut empty space */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-kh-pink/50 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-kh-pink/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-kh-pink/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-kh-pink/50 transition-colors" />

                {/* Card Base Digital Gradient Layer */}
                <div
                  className={`absolute inset-0 z-0 bg-gradient-to-br ${asset.bgGradient} opacity-30 transition-opacity duration-500 group-hover:opacity-50`}
                />

                {/* Top Card Metrics Readout Row */}
                <div className="relative z-10 w-full flex items-center justify-between border-b border-white/5 pb-2 font-mono text-[9px] text-zinc-500 tracking-wider">
                  <span className="group-hover:text-cyan-400 transition-colors">
                    [ {asset.metaType} // 0{asset.id} ]
                  </span>
                  <span className="text-zinc-600 group-hover:text-white transition-colors">
                    {asset.resolution}
                  </span>
                </div>

                {/* Central Typography Core Area + Asset Type Icon */}
                <div className="relative z-10 w-full text-left my-auto py-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl lg:text-2xl font-black tracking-tight text-white m-0 group-hover:text-kh-pink transition-colors uppercase">
                      {asset.title}
                    </h3>
                    <span className="block font-mono text-[9px] tracking-widest text-zinc-400 uppercase mt-1.5 leading-none">
                      {asset.count}
                    </span>
                  </div>

                  {/* Icon Indicator Container to instantly declare what data type is inside */}
                  <div className="w-12 h-12 shrink-0 border border-white/5 bg-white/[0.01] rounded flex items-center justify-center text-zinc-500 group-hover:text-kh-pink group-hover:border-kh-pink/20 group-hover:bg-kh-pink/[0.02] transition-all duration-300 transform group-hover:rotate-3">
                    <AssetIcon className="w-5 h-5 stroke-[1.25]" />
                  </div>
                </div>

                {/* Bottom Trigger Action Row */}
                <div className="relative z-10 w-full flex items-end justify-between pt-2 border-t border-white/5 font-mono text-[9px]">
                  <span className="text-kh-pink font-bold uppercase tracking-widest">
                    {asset.format}
                  </span>

                  {/* Digital download action node indicator */}
                  <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300 uppercase tracking-widest font-bold">
                      EXECUTE
                    </span>
                    <Download className="w-3 h-3 text-zinc-600 group-hover:text-kh-pink transition-colors" />
                  </div>
                </div>

                {/* Left Edge Structural Laser Line Highlight */}
                <div className="absolute left-0 inset-y-0 w-[1px] bg-white/10 scale-y-0 group-hover:scale-y-100 group-hover:bg-kh-pink transition-all duration-300 origin-top" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
