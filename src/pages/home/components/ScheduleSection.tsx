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
    <div className="w-[40%]">
      <div className="flex justify-between items-end mb-8">
        <h3 className="font-condensed font-bold text-sm md:text-md lg:text-xl tracking-widest text-white uppercase">
          UPCOMING SCHEDULE
        </h3>
        <a
          href="#"
          className="font-condensed font-bold text-base underline tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
        >
          VIEW ALL SCHEDULE
        </a>
      </div>

      <div className="flex flex-col border border-white/5 rounded">
        {scheduleData.map((item, i) => (
          <div key={i} className="flex items-center justify-between border">
            {/* Date Box */}
            <div
              className={`w-[16%] h-14 ${i % 2 === 0 ? "bg-kh-pink" : "bg-kh-blue"} flex flex-col items-center justify-center shrink-0`}
            >
              <span className="font-condensed font-bold text-white leading-none mb-1">
                {item.month}
              </span>
              <span className="font-condensed font-bold text-white text-lg leading-none">
                {item.days}
              </span>
            </div>

            <div className="flex-1 px-4 flex h-full  items-center">
              {" "}
              {/* Type */}
              <div className="flex-1">
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
          </div>
        ))}
      </div>
    </div>
  );
}
