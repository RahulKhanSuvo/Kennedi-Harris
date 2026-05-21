import { MapPin } from "lucide-react";

export default function ScheduleSection() {
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

  return (
    <section
      id="schedule"
      className="bg-kh-dark-2 py-16 border-y border-white/5"
    >
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-8">
          <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
            UPCOMING SCHEDULE
          </h3>
          <a
            href="#"
            className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
          >
            VIEW ALL SCHEDULE
          </a>
        </div>

        <div className="flex flex-col border-t border-white/5">
          {scheduleData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-white/5 schedule-row px-4 -mx-4 rounded"
            >
              {/* Date Box */}
              <div className="w-16 h-16 bg-kh-pink flex flex-col items-center justify-center rounded shrink-0">
                <span className="font-condensed font-bold text-white text-xs leading-none mb-1">
                  {item.month}
                </span>
                <span className="font-condensed font-bold text-white text-lg leading-none">
                  {item.days}
                </span>
              </div>

              {/* Type */}
              <div className="flex-1 px-4 lg:px-12">
                <span className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
                  {item.type}
                </span>
              </div>

              {/* Team */}
              <div className="flex-1 hidden md:block">
                <span className="font-condensed font-bold text-sm tracking-widest text-kh-gray uppercase">
                  {item.team}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 justify-end min-w-[80px]">
                <MapPin size={14} className="text-kh-gray" />
                <span className="font-condensed font-bold text-sm tracking-widest text-kh-gray uppercase">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
