import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Container from "@/components/common/Container";

const SCHEDULE_DATA = [
  {
    id: 1,
    month: "MAY",
    days: "24-26",
    event: "AAU TOURNAMENT",
    opponent: "TEAM ELITE",
    location: "ATLANTA, GA",
    time: "TBD",
    type: "TOURNAMENT",
  },
  {
    id: 2,
    month: "JUN",
    days: "6",
    event: "SCHOOL GAME",
    opponent: "WESTFIELD HS",
    location: "WESTFIELD, GA",
    time: "6:00 PM",
    type: "HOME",
  },
  {
    id: 3,
    month: "JUN",
    days: "13-15",
    event: "AAU TOURNAMENT",
    opponent: "GEORGIA STARS",
    location: "SUWANEE, GA",
    time: "TBD",
    type: "TOURNAMENT",
  },
  {
    id: 4,
    month: "JUN",
    days: "20-22",
    event: "SCHOOL GAME",
    opponent: "NORTHVIEW HS",
    location: "JOHNS CREEK, GA",
    time: "6:30 PM",
    type: "AWAY",
  },
  {
    id: 5,
    month: "JUN",
    days: "27-29",
    event: "AAU TOURNAMENT",
    opponent: "TEAM TAKEOVER",
    location: "ATLANTA, GA",
    time: "TBD",
    type: "TOURNAMENT",
  },
  {
    id: 6,
    month: "JUL",
    days: "11",
    event: "SCHOOL GAME",
    opponent: "MILL CREEK HS",
    location: "HOSCHTON, GA",
    time: "6:00 PM",
    type: "HOME",
  },
  {
    id: 7,
    month: "JUL",
    days: "18-20",
    event: "AAU TOURNAMENT",
    opponent: "BRAD BEAL ELITE",
    location: "ATLANTA, GA",
    time: "TBD",
    type: "TOURNAMENT",
  },
  {
    id: 8,
    month: "JUL",
    days: "25",
    event: "SCHOOL GAME",
    opponent: "PEACHTREE RIDGE",
    location: "SUWANEE, GA",
    time: "6:30 PM",
    type: "AWAY",
  },
  {
    id: 9,
    month: "AUG",
    days: "1-3",
    event: "AAU TOURNAMENT",
    opponent: "EXODUS NYC",
    location: "NORCROSS, GA",
    time: "TBD",
    type: "TOURNAMENT",
  },
  {
    id: 10,
    month: "AUG",
    days: "8",
    event: "SCHOOL GAME",
    opponent: "ARCHER HS",
    location: "DACULA, GA",
    time: "6:00 PM",
    type: "HOME",
  },
];

export function SeasonSchedule() {
  const [filter, setFilter] = useState("ALL");

  const filteredData = SCHEDULE_DATA.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TOURNAMENTS") return item.type === "TOURNAMENT";
    if (filter === "HOME") return item.type === "HOME";
    if (filter === "AWAY") return item.type === "AWAY";
    return true;
  });

  // Framer motion list configurations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
  };

  return (
    <section
      id="all-dates"
      className="py-12 bg-kh-dark-2/40 border-t border-white/5"
    >
      <Container>
        {/* Header & Filters Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
            FULL SEASON SCHEDULE
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {["ALL", "TOURNAMENTS", "HOME", "AWAY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`font-condensed font-bold tracking-widest text-xs md:text-sm py-2 px-4 transition-all duration-300 rounded-sm uppercase relative overflow-hidden
                  ${
                    filter === tab
                      ? "bg-kh-pink text-white border border-kh-pink shadow-[0_0_15px_rgba(234,76,137,0.3)]"
                      : "text-gray-400 hover:text-white bg-transparent border border-white/10 hover:border-white/30"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Table Container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header Row */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-condensed font-bold tracking-widest uppercase text-gray-400 px-4">
              <div className="col-span-1 text-center">DATE</div>
              <div className="col-span-2">EVENT</div>
              <div className="col-span-3">OPPONENT</div>
              <div className="col-span-3">LOCATION</div>
              <div className="col-span-1">TIME</div>
              <div className="col-span-2 text-center">TYPE</div>
            </div>

            {/* Animating Rows Body Wrapper */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col border-b border-white/5 min-h-[400px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredData.map((item) => (
                  <motion.div
                    layout
                    variants={itemVariants}
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center border-t border-white/5 bg-transparent hover:bg-white/2 transition-colors duration-200 group px-0 will-change-transform"
                  >
                    {/* Date Block Section */}
                    <div
                      className={`col-span-1 flex flex-col items-center justify-center p-3 text-center transition-all duration-300
                        ${item.type === "TOURNAMENT" ? "bg-kh-pink" : "bg-kh-blue"}
                        group-hover:brightness-110 group-hover:scale-105
                      `}
                    >
                      <span className="font-condensed font-bold text-sm tracking-wider text-white uppercase">
                        {item.month}
                      </span>
                      <span className="font-condensed font-bold text-lg leading-none text-white">
                        {item.days}
                      </span>
                    </div>

                    {/* Event Column */}
                    <div className="col-span-2 px-2 font-condensed font-bold text-sm tracking-wider text-white uppercase transition-transform duration-300 group-hover:translate-x-1">
                      {item.event}
                    </div>

                    {/* Opponent Column */}
                    <div className="col-span-3 flex items-center gap-3 px-2">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        {item.opponent.charAt(0)}
                      </div>
                      <span className="font-sans font-semibold text-sm text-white uppercase">
                        {item.opponent}
                      </span>
                    </div>

                    {/* Location Column */}
                    <div className="col-span-3 flex items-center gap-2 px-2 text-gray-400 text-sm font-condensed tracking-wider uppercase transition-colors duration-200 group-hover:text-gray-300">
                      <MapPin className="w-4 h-4 shrink-0 text-gray-500 group-hover:text-kh-pink transition-colors duration-200" />
                      {item.location}
                    </div>

                    {/* Time Column */}
                    <div className="col-span-1 px-2 font-condensed font-bold tracking-wider text-sm text-white uppercase">
                      {item.time}
                    </div>

                    {/* Type Badge Module */}
                    <div className="col-span-2 flex justify-center px-4 py-3">
                      <div
                        className={`px-3 py-1 font-condensed font-bold text-xs tracking-widest uppercase rounded-sm border w-28 text-center transition-all duration-300
                          ${item.type === "TOURNAMENT" ? "border-kh-pink text-kh-pink group-hover:bg-kh-pink group-hover:text-white" : ""}
                          ${item.type === "HOME" ? "border-kh-blue-light text-kh-blue-light group-hover:bg-kh-blue-light group-hover:text-black" : ""}
                          ${item.type === "AWAY" ? "border-gray-400 text-gray-400 group-hover:border-white group-hover:text-white" : ""}
                        `}
                      >
                        {item.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
