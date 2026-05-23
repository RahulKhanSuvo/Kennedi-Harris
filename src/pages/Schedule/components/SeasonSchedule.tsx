import { useState } from "react";
import { MapPin } from "lucide-react";
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

  return (
    <section className="py-12 bg-kh-dark-2/40 border-t border-white/5">
      <Container>
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
            FULL SEASON SCHEDULE
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {["ALL", "TOURNAMENTS", "HOME", "AWAY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`font-condensed font-bold tracking-widest text-xs md:text-sm py-2 px-4 transition-all duration-300 rounded-sm uppercase
                                    ${
                                      filter === tab
                                        ? "bg-kh-pink text-white border border-kh-pink"
                                        : "text-gray-400 hover:text-white bg-transparent border border-white/10 hover:border-white/30"
                                    }
                                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-condensed font-bold tracking-widest uppercase text-gray-400 px-4">
              <div className="col-span-1 text-center">DATE</div>
              <div className="col-span-2">EVENT</div>
              <div className="col-span-3">OPPONENT</div>
              <div className="col-span-3">LOCATION</div>
              <div className="col-span-1">TIME</div>
              <div className="col-span-2 text-center">TYPE</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col border-b border-white/5">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 items-center schedule-row border-t border-white/5 group"
                >
                  {/* Date Block */}
                  <div
                    className={`col-span-1 flex flex-col items-center justify-center p-3 text-center transition-colors
                                        ${item.type === "TOURNAMENT" ? "bg-kh-pink" : "bg-kh-blue"}
                                        group-hover:brightness-110
                                    `}
                  >
                    <span className="font-condensed font-bold text-sm tracking-wider text-white uppercase">
                      {item.month}
                    </span>
                    <span className="font-condensed font-bold text-lg leading-none text-white">
                      {item.days}
                    </span>
                  </div>

                  {/* Event */}
                  <div className="col-span-2 px-2 font-condensed font-bold text-sm tracking-wider text-white uppercase">
                    {item.event}
                  </div>

                  {/* Opponent */}
                  <div className="col-span-3 flex items-center gap-3 px-2">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
                      {item.opponent.charAt(0)}
                    </div>
                    <span className="font-sans font-semibold text-sm text-white uppercase">
                      {item.opponent}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="col-span-3 flex items-center gap-2 px-2 text-gray-400 text-sm font-condensed tracking-wider uppercase">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {item.location}
                  </div>

                  {/* Time */}
                  <div className="col-span-1 px-2 font-condensed font-bold tracking-wider text-sm text-white uppercase">
                    {item.time}
                  </div>

                  {/* Type Badge */}
                  <div className="col-span-2 flex justify-center px-4 py-3">
                    <div
                      className={`px-3 py-1 font-condensed font-bold text-xs tracking-widest uppercase rounded-sm border w-28 text-center
                                            ${item.type === "TOURNAMENT" ? "border-kh-pink text-kh-pink" : ""}
                                            ${item.type === "HOME" ? "border-kh-blue-light text-kh-blue-light" : ""}
                                            ${item.type === "AWAY" ? "border-gray-400 text-gray-400" : ""}
                                        `}
                    >
                      {item.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
