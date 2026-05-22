import { Calendar, MapPin, Clock } from "lucide-react";
import bg1 from "../../../assets/gal-1.png";
import bg2 from "../../../assets/gal-2.png";
import bg3 from "../../../assets/gal-3.png";

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
  return (
    <section className="py-16 bg-kh-dark">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
            UPCOMING EVENTS
          </h2>

          <a
            href="#"
            className="flex items-center gap-2 font-condensed font-bold tracking-widest text-sm text-kh-pink hover:text-white transition-colors uppercase"
          >
            VIEW CALENDAR
            <Calendar className="w-4 h-4" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_DATA.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-md overflow-hidden bg-kh-dark-2 border border-white/5 cursor-pointer hover:border-kh-pink/50 transition-colors duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={event.bg}
                  alt={event.opponent}
                  className="w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kh-dark-2 via-kh-dark-2/80 to-kh-dark-2/20"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Date Badge */}
                <div
                  className={`w-16 h-16 flex flex-col items-center justify-center rounded-sm mb-6
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

                <div className="mt-auto">
                  <p className="font-condensed font-bold tracking-widest text-xs text-gray-400 uppercase mb-1">
                    {event.event}
                  </p>
                  <h3 className="font-condensed font-bold text-3xl text-white uppercase tracking-wider mb-4">
                    {event.opponent}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-300 text-sm font-sans font-light">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 text-sm font-sans font-light">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
