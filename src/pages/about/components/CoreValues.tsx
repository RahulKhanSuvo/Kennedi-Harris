import { Star, User, GraduationCap, Users, Heart } from "lucide-react";

const VALUES = [
  {
    id: 1,
    title: "COMPETITIVE",
    description: "Relentless on both ends of the floor.",
    icon: Star,
  },
  {
    id: 2,
    title: "LEADER",
    description: "Leads by example in everything I do.",
    icon: User,
  },
  {
    id: 3,
    title: "STUDENT",
    description: "Academically driven with a strong work ethic.",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "TEAM FIRST",
    description: "Success comes from unity and trust in the team.",
    icon: Users,
  },
  {
    id: 5,
    title: "FAITH & FAMILY",
    description: "Grounded in faith and supported by my family always.",
    icon: Heart,
  },
];

export function CoreValues() {
  return (
    <section className=" p-8 border-b">
      <div className="">
        <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-lg block mb-2">
          Core Values
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y sm:border-y-0 border-white/10">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.id}
                className="flex flex-col items-center text-center p-6 lg:p-4 group"
              >
                <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center text-kh-pink mb-6 group-hover:bg-kh-pink  transition-colors duration-300">
                  <Icon className="w-6 h-6 group-hover:text-white" />
                </div>
                <h4 className="font-condensed font-bold text-xl text-white tracking-wider uppercase mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-400 text-sm font-sans font-light leading-relaxed max-w-[200px]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
