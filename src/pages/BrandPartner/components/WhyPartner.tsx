import { Users, Heart, Eye, HandHeart } from "lucide-react";

const BENEFITS = [
  {
    id: 1,
    title: "ENGAGED AUDIENCE",
    description:
      "A growing community of fans, athletes, and families across the country.",
    icon: Users,
  },
  {
    id: 2,
    title: "AUTHENTIC IMPACT",
    description: "Real influence through hard work, character, and purpose.",
    icon: Heart,
  },
  {
    id: 3,
    title: "BRAND VISIBILITY",
    description: "Exposure across games, events, social media, and more.",
    icon: Eye,
  },
  {
    id: 4,
    title: "COMMUNITY FOCUS",
    description: "Partnering to create opportunities and give back together.",
    icon: HandHeart,
  },
];

export function WhyPartner() {
  return (
    <section className="py-16 bg-kh-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="border border-white/10 rounded-md bg-kh-dark-2/50 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-4">
              <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider mb-4">
                WHY PARTNER WITH KENNEDI?
              </h2>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                Your brand becomes part of a powerful story of determination,
                leadership, and community impact. Together, we can inspire the
                next generation and make a lasting difference.
              </p>
            </div>

            {/* Right Content - Benefits Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className="group flex flex-col items-center text-center gap-4"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/30 group-hover:border-kh-pink/50 group-hover:bg-kh-pink/10 transition-all duration-300">
                      <Icon className="w-6 h-6 text-kh-pink" />
                    </div>
                    <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-sans font-light leading-relaxed max-w-[220px]">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
