import { motion, type Variants } from "motion/react";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router";
import useSchedule from "@/hooks/useSchedule";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const responsiveViewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -50px 0px",
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: kineticSpring },
  },
};

// 💡 Clean Skeleton Component matching the row typography & constraints
function ScheduleSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`schedule-skeleton-${index}`}
          className="flex items-center justify-between animate-pulse bg-neutral-950/10"
        >
          {/* Mock Date Block */}
          <div className="w-20 h-16 bg-neutral-900 shrink-0 border-r border-white/5" />

          {/* Core Info Elements */}
          <div className="flex-1 min-w-0 px-5 sm:px-6 flex items-center justify-between gap-4 h-16">
            {/* Title Line */}
            <div className="flex-1 min-w-0">
              <div className="h-3 w-32 bg-zinc-800 rounded-xs" />
            </div>

            {/* Badge Indicator Line */}
            <div className="flex-1 hidden sm:block">
              <div className="h-5 w-24 bg-zinc-900 border border-white/5 rounded-xs" />
            </div>

            {/* Location Line */}
            <div className="flex items-center gap-1.5 justify-end min-w-[70px] shrink-0">
              <div className="h-3 w-3 bg-zinc-800 rounded-full" />
              <div className="h-2 w-12 bg-zinc-800 rounded-xs" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function ScheduleSection() {
  const { data, isLoading } = useSchedule();

  return (
    <div className="w-full bg-neutral-950/20 p-5 md:border-l border-white/5 backdrop-blur-xs h-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h3 className="font-condensed font-semibold text-lg lg:text-xl tracking-widest text-white uppercase">
            UPCOMING SCHEDULE
          </h3>
        </div>
        <Link
          to={"/schedule"}
          className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-white transition-colors uppercase border-b border-kh-blue/30 pb-0.5 self-start sm:self-auto"
        >
          VIEW FULL SCHEDULE
        </Link>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={responsiveViewport}
        className="flex flex-col border border-white/5 bg-neutral-950/40 rounded-lg overflow-hidden divide-y divide-white/5"
      >
        {isLoading || !data?.data ? (
          <ScheduleSkeleton />
        ) : (
          data?.data?.slice(0, 5).map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center justify-between group hover:bg-white/2 transition-colors duration-200"
            >
              <div
                className={`w-20 h-16 ${
                  i % 2 === 0
                    ? "bg-linear-to-br from-kh-pink to-kh-pink/90"
                    : "bg-linear-to-br from-kh-blue to-kh-blue/90"
                } flex flex-col items-center justify-center text-center shrink-0 shadow-md px-2`}
              >
                <span className=" font-bold text-white  tracking-widest leading-none mb-1">
                  {item.date}
                </span>
              </div>

              <div className="flex-1 min-w-0 px-5 sm:px-6 flex items-center justify-between gap-4 h-16">
                <div className="flex-1 min-w-0">
                  <span className="font-condensed font-bold text-sm tracking-wider text-white uppercase block truncate group-hover:text-kh-pink transition-colors duration-200">
                    {item.matchName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 justify-end min-w-[70px] shrink-0 text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
                  <MapPin
                    size={13}
                    className="text-zinc-600 group-hover:text-kh-blue transition-colors duration-200"
                  />
                  <span className="font-condensed font-bold text-xs tracking-widest uppercase">
                    {item.address}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <div className="mt-5 flex items-center gap-2.5 text-zinc-600 font-condensed tracking-wider text-[11px] uppercase px-2">
        <Calendar size={12} className="text-zinc-700" />
        <span>
          Dates and game configurations are subject to localized bracket changes
        </span>
      </div>
    </div>
  );
}
