import { motion, type Variants } from "motion/react";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import useSchedule from "@/hooks/useSchedule";

// Mirroring your system's signature spring physics engine
const kineticSpring = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 0.8,
} as const;

const responsiveViewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -40px 0px",
} as const;

// Orchestrated layout variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: kineticSpring,
  },
};

// Clean HUD Skeleton Component matching row constraints perfectly
function ScheduleSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`schedule-skeleton-${index}`}
          className="flex items-center justify-between animate-pulse bg-kh-dark-2/20 h-16 border-b border-white/5 last:border-0"
        >
          {/* Mock Date Node */}
          <div className="w-24 h-full bg-neutral-900/40 shrink-0 border-r border-white/5" />

          {/* Core Info Elements */}
          <div className="flex-1 min-w-0 px-6 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="h-3 w-36 bg-zinc-800/60 rounded-xs" />
            </div>
            <div className="flex items-center gap-2 justify-end min-w-[80px] shrink-0">
              <div className="h-3 w-3 bg-zinc-800 rounded-full" />
              <div className="h-2.5 w-14 bg-zinc-800/60 rounded-xs" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function ScheduleSection() {
  const { data, isLoading } = useSchedule();
  const scheduleItems = data?.data?.slice(0, 5) || [];

  return (
    <div className="w-full p-6 md:p-8 md:border-l border-white/5 backdrop-blur-md h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group/panel">
      {/* Structural Corner Highlights */}
      <div className="absolute top-0 right-0 w-16 h-px bg-linear-to-l from-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-16 h-px bg-linear-to-r from-kh-blue/20 to-transparent" />

      <div>
        {/* Header Management Module */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 shrink-0">
          <div className="flex flex-col gap-2">
            <h3 className="font-condensed font-semibold text-base xl:text-xl tracking-widest text-white uppercase">
              UPCOMING SCHEDULE
            </h3>
          </div>

          <Link
            to="/schedule"
            className="font-condensed font-bold text-xs tracking-widest text-zinc-400 hover:text-white transition-colors uppercase border-b border-white/10 hover:border-white pb-0.5 self-start sm:self-auto flex items-center gap-1 group/link"
          >
            <span>VIEW FULL SCHEDULE</span>
            <ArrowUpRight
              size={13}
              className="text-zinc-500 group-hover/link:text-kh-blue transition-colors group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Schedule Grid Matrix Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={responsiveViewport}
          className="flex flex-col border border-white/5 bg-black/40 rounded-xl overflow-hidden divide-y divide-white/5 shadow-xl shadow-black/40"
        >
          {isLoading || scheduleItems.length === 0 ? (
            <ScheduleSkeleton />
          ) : (
            scheduleItems.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item._id || i}
                  variants={itemVariants}
                  className="flex items-center justify-between group/row hover:bg-white/2 transition-colors duration-200 will-change-transform"
                >
                  {/* Neon Ribbon-Accent Date Flag */}
                  <div
                    className={`w-24 h-full bg-neutral-950/60 flex flex-col items-center justify-center text-center shrink-0 border-r border-white/5 relative`}
                  >
                    <div
                      className={`px-2 py-1  ${
                        isEven
                          ? "bg-kh-pink shadow-[0_0_8px_rgba(232,23,106,0.5)]"
                          : "bg-kh-blue shadow-[0_0_8px_rgba(38,85,245,0.5)]"
                      }`}
                    >
                      <span className="font-mono font-black text-white text-xs tracking-widest uppercase">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Core Content Layout Split */}
                  <div className="flex-1 min-w-0 px-5 sm:px-6 flex items-center justify-between gap-4 h-16">
                    <div className="flex-1 min-w-0">
                      <span className="font-condensed font-black text-sm tracking-wider text-zinc-200 uppercase block truncate group-hover/row:text-white transition-colors duration-200">
                        {item.matchName}
                      </span>
                    </div>

                    {/* Geolocation Tagging */}
                    <div className="flex items-center gap-1.5 justify-end min-w-[80px] shrink-0 text-zinc-500 group-hover/row:text-zinc-400 transition-colors duration-200">
                      <MapPin
                        size={13}
                        className={`transition-colors duration-200 ${
                          isEven
                            ? "group-hover/row:text-kh-pink"
                            : "group-hover/row:text-kh-blue"
                        }`}
                      />
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase truncate max-w-[100px] sm:max-w-none">
                        {item.address}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>

      {/* Interactive Micro Meta Diagnostics Footer Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2.5 text-zinc-500 font-mono tracking-wide text-[9px] uppercase px-1 select-none">
        <Calendar size={12} className="text-zinc-600 shrink-0 mt-0.5" />
        <span className="leading-normal">
          CRITICAL INDEX // Game configurations and arena nodes are subject to
          localized structural adjustments.
        </span>
      </div>
    </div>
  );
}
