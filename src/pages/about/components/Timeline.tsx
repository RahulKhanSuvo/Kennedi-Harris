import { Target, Activity, Users, Star } from "lucide-react";
import meImg from "../../../assets/me-removebg-preview.png";
import Container from "@/components/common/Container";

const TIMELINE_DATA = [
  {
    id: 1,
    title: "EARLY BEGINNINGS",
    description:
      "My Dad started teaching me basketball when I was 6 years old. I fell in love with the game and it became my passion",
    date: "2016 - 2018",
    icon: Target,
  },
  {
    id: 2,
    title: "DEVELOPING THE GAME",
    description:
      "Years of hard work, training, and learning the game inside and out helped me grow on and off the court.",
    date: "2019 - 2021",
    icon: Target,
  },
  {
    id: 3,
    title: "RISING COMPETITOR",
    description:
      "Competing at a high level and facing tough opponents pushed me to elevate my game and mindset.",
    date: "2022 - 2023",
    icon: Activity,
  },
  {
    id: 4,
    title: "FBC UNITED",
    description:
      "Proud to represent FBC United and continue building toward my future goals.",
    date: "2022 - PRESENT",
    icon: Users,
  },
  {
    id: 5,
    title: "THE FUTURE",
    description:
      "Focused on growth, impact, and leaving a legacy that inspires the next generation.",
    date: "2030 & BEYOND",
    icon: Star,
  },
];

export function Timeline() {
  return (
    <section className="py-20 relative bg-kh-dark-2/40 border-t border-white/5">
      <Container className=" grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left Content */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm mb-4">
            My Journey
          </span>

          <h2 className="font-display text-5xl md:text-6xl leading-[0.85] tracking-tight mb-6">
            <span className="block text-white">BUILT ON FAITH.</span>
            <span className="block text-kh-pink mt-1">DRIVEN BY PURPOSE.</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base max-w-md font-sans font-light leading-relaxed mb-12">
            From early mornings to late-night grind sessions, every step has
            shaped me into the player and person I am today.
          </p>

          <div className="relative grow min-h-[300px] rounded-lg overflow-hidden flex items-end">
            <div className="absolute inset-0 dot-grid opacity-20"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-linear-to-t from-kh-dark-2 to-transparent z-10"></div>
            <img
              src={meImg}
              alt="Kennedi Harris Journey"
              className="relative z-0 w-full object-contain object-bottom max-h-[400px] drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Content - Timeline */}
        <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-center">
          <div className="relative border-l border-dashed border-kh-pink/50 ml-6 lg:ml-0 space-y-12 pb-8">
            {TIMELINE_DATA.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative pl-10 md:pl-16 group">
                  {/* Icon Circle */}
                  <div className="absolute -left-6 top-0 w-12 h-12 rounded-full border-2 border-kh-pink bg-kh-dark flex items-center justify-center group-hover:bg-kh-pink transition-colors duration-300">
                    <Icon className="w-5 h-5 text-kh-pink group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                    <div className="flex-1">
                      <h3 className="font-condensed font-bold text-xl tracking-wider text-white uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-sans font-light leading-relaxed max-w-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="font-condensed font-bold text-kh-blue-light tracking-widest uppercase md:text-right shrink-0 mt-2 md:mt-0">
                      {item.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
