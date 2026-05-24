import { Calendar, MapPin, Clock } from "lucide-react";
import { motion, type Variants } from "motion/react";
import bg1 from "../../../assets/gal-1.png";
import bg2 from "../../../assets/gal-2.png";
import bg3 from "../../../assets/gal-3.png";
import Container from "@/components/common/Container";

const UPCOMING_DATA = [
  {
    id: 1,
    month: "MAY",
    days: "24-26",
    event: "AAU TOURNAMENT",
    opponent: "TEAM ELITE",
    location: "Atlanta, GA",
    time: "TBD",
    bg: bg1,
    isTournament: true,
  },
  {
    id: 2,
    month: "JUN",
    days: "6",
    event: "SCHOOL GAME",
    opponent: "WESTFIELD HS",
    location: "Westfield, GA",
    time: "6:00 PM",
    bg: bg2,
    isTournament: false,
  },
  {
    id: 3,
    month: "JUN",
    days: "13-15",
    event: "AAU TOURNAMENT",
    opponent: "GEORGIA STARS",
    location: "Suwanee, GA",
    time: "TBD",
    bg: bg3,
    isTournament: true,
  },
];

export function UpcomingEvents() {
  // Container orchestrator variant for staggering the grid children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // time difference between each card entry
      },
    },
  };

  // Card slide up and fade in values
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
      },
    },
  };

  return (
    <section className="py-16 bg-kh-dark overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
            UPCOMING EVENTS
          </h2>

          <a
            href="#all-dates"
            className="flex items-center gap-2 font-condensed font-bold tracking-widest text-sm text-kh-pink hover:text-white transition-colors uppercase group/btn"
          >
            VIEW CALENDAR
            <Calendar className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>

        {/* Cards Grid Container wrapped in motion.div */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {UPCOMING_DATA.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -6 }} // Smooth uplifting interaction on hover
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-md overflow-hidden bg-kh-dark-2 border border-white/5 cursor-pointer hover:border-kh-pink/40 transition-colors duration-300 min-h-[340px] flex flex-col will-change-transform"
            >
              {/* Background Asset Image container */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={event.bg}
                  alt={event.opponent}
                  className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-t from-kh-dark-2 via-kh-dark-2/80 to-kh-dark-2/10 transition-colors duration-300 group-hover:via-kh-dark-2/70"></div>
              </div>

              {/* Card Main Body Content */}
              <div className="relative z-10 p-6 flex flex-col h-full grow">
                {/* Dynamic Date Badge */}
                <div
                  className={`w-16 h-16 flex flex-col items-center justify-center rounded-sm mb-6 shadow-md transition-transform duration-300 group-hover:scale-105
                    ${event.isTournament ? "bg-kh-pink" : "bg-kh-blue"}
                  `}
                >
                  <span className="font-condensed font-bold text-sm tracking-wider text-white uppercase">
                    {event.month}
                  </span>
                  <span className="font-condensed font-bold text-lg leading-none text-white">
                    {event.days}
                  </span>
                </div>

                {/* Info Text Stack */}
                <div className="mt-auto">
                  <p className="font-condensed font-bold tracking-widest text-xs text-gray-400 uppercase mb-1 transition-colors group-hover:text-kh-pink">
                    {event.event}
                  </p>
                  <h3 className="font-condensed font-bold text-3xl text-white uppercase tracking-wider mb-4 group-hover:text-white transition-colors">
                    {event.opponent}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-300 text-sm font-sans font-light transition-transform duration-300 group-hover:translate-x-1">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-kh-pink transition-colors" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 text-sm font-sans font-light transition-transform duration-300 group-hover:translate-x-1 delay-75">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-kh-pink transition-colors" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
