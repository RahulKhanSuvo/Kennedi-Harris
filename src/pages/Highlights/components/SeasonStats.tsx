import Container from "@/components/common/Container";
import { Star, LineChart, Grid, Trophy } from "lucide-react";
import { BsDribbble } from "react-icons/bs";

const STATS = [
  {
    id: 1,
    value: "20+",
    label: "PPG",
    sublabel: "Points Per Game",
    icon: Star,
    highlight: false,
  },
  {
    id: 2,
    value: "16+",
    label: "RPG",
    sublabel: "Rebounds Per Game",
    icon: BsDribbble,
    highlight: false,
  },
  {
    id: 3,
    value: "3+",
    label: "BPG",
    sublabel: "Blocks Per Game",
    icon: LineChart,
    highlight: false,
  },
  {
    id: 4,
    value: "24+",
    label: "DOUBLE-DOUBLES",
    sublabel: "This Season",
    icon: Grid,
    highlight: true,
  },
  {
    id: 5,
    value: "31",
    label: "REBOUNDS IN A SINGLE GAME",
    sublabel: "Season High",
    icon: Trophy,
    highlight: true,
  },
];

export function SeasonStats() {
  return (
    <section className="py-12 mt-8">
      <Container className="">
        <h3 className="font-condensed text-xl font-bold text-white uppercase tracking-wider mb-6">
          SEASON HIGHLIGHT STATS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-black/40 border border-white/5 rounded-lg p-5 flex flex-col justify-center items-center text-center hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full border-2 border-kh-pink flex items-center justify-center text-kh-pink mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="font-display text-4xl text-white leading-none">
                    {stat.value}
                  </span>
                </div>

                <span
                  className={`font-condensed font-bold text-lg tracking-wider uppercase ${stat.highlight ? "text-kh-pink" : "text-gray-300"}`}
                >
                  {stat.label}
                </span>

                <span className="text-gray-400 text-xs mt-2">
                  {stat.sublabel}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
