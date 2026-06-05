import { MapPin, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import useSchedule from "@/hooks/useSchedule";
import { ScheduleLoadingSkeleton } from "@/components/schedule";

export function SeasonSchedule() {
  const { data, isLoading } = useSchedule();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <section
      id="all-dates"
      className="py-24 bg-kh-dark border-t border-white/5 relative overflow-hidden"
    >
      {/* Subtle background glow tracker */}
      <div className="absolute right-[-10%] top-0 w-[500px] h-[500px] bg-kh-blue/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10 w-full flex flex-col gap-10">
        {/* Header Configuration */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-kh-pink" />
              <span className="font-condensed tracking-[0.2em] uppercase font-bold text-xs text-kh-pink">
                SCHEDULE LOGISTICS
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white uppercase tracking-tighter m-0">
              FULL SEASON <span className="text-kh-pink">SCHEDULE</span>
            </h2>
          </div>
        </div>

        {/* Tactical Row List Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-3 w-full"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <ScheduleLoadingSkeleton />
            ) : (
              data?.data?.map((item, idx) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={item._id}
                  className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center p-4 md:p-3 bg-white/1 border border-white/2 hover:bg-white/3 hover:border-white/5 transition-all duration-200 rounded-lg text-left overflow-hidden"
                >
                  {/* Restored Original Solid Color Date Side-Block */}
                  <div
                    className={`col-span-1 md:col-span-2 flex md:flex-col items-center justify-between md:justify-center p-3 md:py-4 md:px-4 text-center transition-all duration-300 shrink-0 rounded-md
                    ${idx % 2 === 0 ? "bg-kh-pink" : "bg-kh-blue"}
                    group-hover:brightness-110 group-hover:scale-105
                  `}
                  >
                    <span className="font-condensed font-bold text-xs tracking-wider text-white uppercase">
                      {item.date}
                    </span>
                  </div>

                  {/* Event & Opponent Label Specs */}
                  <div className="col-span-1 md:col-span-4 flex flex-col gap-1 md:pl-2">
                    {/* <span className="font-condensed font-bold text-xs tracking-wider text-kh-pink uppercase">
                    {item.event}
                  </span> */}
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                        {item.matchName.charAt(0)}
                      </div>
                      <span className="font-sans font-semibold text-sm text-white uppercase group-hover:text-kh-pink transition-colors">
                        {item.matchName}
                      </span>
                    </div>
                  </div>

                  {/* Location Map / Operational Clock */}
                  <div className="col-span-1 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/60 text-xs md:text-sm font-sans font-light tracking-wide uppercase">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/30 group-hover:text-kh-pink transition-colors" />
                      <span className="truncate">{item.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Desktop Status Badges */}
                  <div className="hidden md:flex col-span-1 md:col-span-2 justify-end pr-4">
                    <div
                      className={`px-3 py-1 font-condensed font-bold text-xs tracking-widest uppercase border w-full text-center transition-all duration-300 max-w-[120px] rounded-sm ${
                        item.address === "Tournament"
                          ? "border-kh-pink text-kh-pink group-hover:bg-kh-pink group-hover:text-white"
                          : item.address === "MVA High School"
                            ? "border-kh-blue-light text-kh-blue-light group-hover:bg-kh-blue-light group-hover:text-black"
                            : "border-gray-400 text-gray-400 group-hover:border-white group-hover:text-white"
                      }`}
                    >
                      {item.address}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
