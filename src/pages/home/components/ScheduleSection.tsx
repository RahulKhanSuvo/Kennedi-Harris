import { motion, type Variants } from "motion/react";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

// Combined Viewport Strategy for Mid-Page Sections
const responsiveViewport = {
  once: true,
  // "amount: 0.1" triggers as soon as 10% of the element enters the screen.
  // This ensures it never gets stuck or missed in the middle of the page.
  amount: 0.1,
  margin: "0px 0px -50px 0px", // Slight bottom margin buffer for smoother entry
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

const scheduleData = [
  {
    month: "MAY",
    days: "24-26",
    type: "AAU TOURNAMENT",
    team: "FBC UNITED",
    location: "TBD",
  },
  {
    month: "JUN",
    days: "6",
    type: "SCHOOL GAME",
    team: "WESTFIELD",
    location: "TBD",
  },
  {
    month: "JUN",
    days: "13-15",
    type: "AAU TOURNAMENT",
    team: "FBC UNITED",
    location: "TBD",
  },
  {
    month: "JUN",
    days: "20-22",
    type: "SCHOOL GAME",
    team: "WESTFIELD",
    location: "TBD",
  },
];

export default function ScheduleSection() {
  return (
    <div className="w-full max-w-2xl mx-auto xl:mx-0 xl:max-w-none bg-neutral-950/20  lg:p-8 rounded border-l border-white/5 backdrop-blur-xs">
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

      {/* Rows wrapper using the fluid visibility intersection handler */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={responsiveViewport}
        className="flex flex-col border border-white/5 bg-neutral-950/40 rounded-lg overflow-hidden divide-y divide-white/5"
      >
        {scheduleData.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex items-center justify-between group hover:bg-white/[0.02] transition-colors duration-200"
          >
            <div
              className={`w-20 h-16 ${i % 2 === 0 ? "bg-gradient-to-br from-kh-pink to-kh-pink/90" : "bg-gradient-to-br from-kh-blue to-kh-blue/90"} flex flex-col items-center justify-center shrink-0 shadow-md select-none`}
            >
              <span className="font-condensed font-bold text-white text-[10px] tracking-widest leading-none mb-1 opacity-90">
                {item.month}
              </span>
              <span className="font-condensed font-black text-white text-lg leading-none tracking-tight">
                {item.days}
              </span>
            </div>

            <div className="flex-1 min-w-0 px-5 sm:px-6 flex items-center justify-between gap-4 h-16">
              <div className="flex-1 min-w-0">
                <span className="font-condensed font-bold text-sm tracking-wider text-white uppercase block truncate group-hover:text-kh-pink transition-colors duration-200">
                  {item.type}
                </span>
              </div>

              <div className="flex-1 hidden sm:block truncate">
                <span className="font-condensed font-medium text-xs tracking-widest text-zinc-400 uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                  {item.team}
                </span>
              </div>

              <div className="flex items-center gap-1.5 justify-end min-w-[70px] shrink-0 text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
                <MapPin
                  size={13}
                  className="text-zinc-600 group-hover:text-kh-blue transition-colors duration-200"
                />
                <span className="font-condensed font-bold text-xs tracking-widest uppercase">
                  {item.location}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
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
