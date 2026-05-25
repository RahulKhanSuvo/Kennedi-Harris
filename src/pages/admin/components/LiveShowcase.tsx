import { User, Edit3 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import type { HomeData } from "@/api/types";

interface LiveShowcaseProps {
  homeData: HomeData;
  existingId: string;
  stats: Pick<HomeData, "PPG" | "RPG" | "BPG" | "DOUBLE_DOUBLES" | "REBOUNDS">;
  setIsEditing: (val: boolean) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function LiveShowcase({
  homeData,
  existingId,
  stats,
  setIsEditing,
}: LiveShowcaseProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Live Status Badge */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between flex-wrap gap-2 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-400 text-[10px] font-condensed font-black tracking-widest uppercase">
            Public Live Showcase Online
          </span>
        </div>
        <span className="font-mono text-[9px] text-emerald-500/70 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/10 uppercase tracking-widest">
          ENTRY REF ID: {existingId}
        </span>
      </motion.div>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Media Showcase Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 space-y-4 bg-[#0a0d10] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent pointer-events-none" />

          <h3 className="text-zinc-500 text-[10px] font-condensed font-black tracking-widest uppercase mb-4 relative z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-kh-pink inline-block"></span>
            Showcase Media Assets
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="relative aspect-4/5 bg-neutral-900/50 rounded-xl overflow-hidden border border-white/5 flex flex-col items-center justify-center group/img">
              {homeData.frist_img ? (
                <>
                  <img
                    src={homeData.frist_img}
                    alt="Primary Artwork View"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />
                </>
              ) : (
                <div className="text-center p-4 text-zinc-600">
                  <User size={32} className="mx-auto mb-2 opacity-40" />
                  <span className="text-[10px] font-condensed tracking-widest uppercase">
                    No Primary Asset
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[9px] text-white px-2.5 py-1.5 rounded-md font-condensed font-black uppercase tracking-widest border border-white/10 shadow-lg">
                Primary Spotlight
              </div>
            </div>

            <div className="relative aspect-16/10 bg-neutral-900/50 rounded-xl overflow-hidden border border-white/5 flex flex-col items-center justify-center group/img">
              {homeData.second_img ? (
                <>
                  <img
                    src={homeData.second_img}
                    alt="Secondary Viewport Action"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />
                </>
              ) : (
                <div className="text-center p-4 text-zinc-600 text-[10px] font-condensed tracking-widest uppercase">
                  No Secondary Asset
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[9px] text-white px-2.5 py-1.5 rounded-md font-condensed font-black uppercase tracking-widest border border-white/10 shadow-lg">
                Alternate Action Panel
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Stats Metrics Visualizer */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-[#0a0d10] border border-white/5 rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-kh-pink/5 to-transparent pointer-events-none opacity-50" />

            <div className="relative z-10">
              <h3 className="text-zinc-500 text-[10px] font-condensed font-black tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                Active Production Stats Vector
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {Object.entries(stats).map(([key, val], idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    key={key}
                    className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 p-5 rounded-xl flex flex-col justify-between min-h-[120px] hover:bg-neutral-800/50 hover:border-white/10 transition-all duration-300 group/stat"
                  >
                    <span className="text-zinc-500 text-[9px] font-condensed font-black tracking-widest uppercase group-hover/stat:text-zinc-400 transition-colors">
                      {key.replace("_", " ")}
                    </span>
                    <span className="text-3xl md:text-4xl font-black tracking-tight mt-2 font-display bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent group-hover/stat:from-white group-hover/stat:to-zinc-300 transition-all">
                      {val || "—"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/5 flex justify-end relative z-10">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-[10px] font-condensed font-black uppercase tracking-widest text-kh-pink hover:text-white transition-colors cursor-pointer"
              >
                <Edit3 size={14} /> Open Edit Workflow Block
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
