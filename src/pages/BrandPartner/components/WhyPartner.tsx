import { useState } from "react";
import { Users, Heart, Eye, HandHeart } from "lucide-react";
import Container from "@/components/common/Container";

const BENEFITS = [
  {
    id: "01",
    title: "ENGAGED AUDIENCE",
    tag: "COMMUNITY GROWER",
    description:
      "A rapidly scaling network of dedicated fans, rising athletes, and sports families nationwide.",
    icon: Users,
    glow: "rgba(6, 182, 212, 0.12)", // Cyan aura
  },
  {
    id: "02",
    title: "AUTHENTIC IMPACT",
    tag: "CHARACTER & DRIVE",
    description:
      "True cultural equity forged through relentless daily execution, high character, and deep purpose.",
    icon: Heart,
    glow: "rgba(236, 72, 153, 0.12)", // Pink aura
  },
  {
    id: "03",
    title: "BRAND VISIBILITY",
    tag: "HIGH-EXPOSURE RETAIL",
    description:
      "Uncompromised presence spanning primetime tournament games, social channels, and media toolkits.",
    icon: Eye,
    glow: "rgba(168, 85, 247, 0.12)", // Purple aura
  },
  {
    id: "04",
    title: "COMMUNITY FOCUS",
    tag: "NIL SOCIAL RESP.",
    description:
      "Strategic partnerships structured to scale regional opportunities and engineered to give back.",
    icon: HandHeart,
    glow: "rgba(255, 255, 255, 0.08)", // White aura
  },
];

export default function WhyPartner() {
  const [activeCardGlow, setActiveCardGlow] = useState<string | null>(null);

  return (
    <section className="relative bg-black py-28 lg:py-40 border-t border-white/5 overflow-hidden">
      {/* Interactive Global Lighting Rig */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[500px] w-[500px] rounded-full transition-all duration-700 ease-out blur-[150px]"
        style={{
          backgroundColor: activeCardGlow || "rgba(236, 72, 153, 0.03)",
          opacity: activeCardGlow ? 1 : 0.5,
        }}
      ></div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-20 lg:gap-8 w-full">
        {/* Left Editorial Anchor Block */}
        <div className="w-full lg:w-[35%] flex flex-col justify-between lg:sticky lg:top-32 h-auto lg:h-[380px]">
          <div className="flex flex-col gap-4">
            <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs sm:text-sm">
              Value Proposition
            </span>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[0.85] uppercase text-white">
              THE VALUE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-white">
                OF IMP@CT
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 mt-8 lg:mt-0 border-l border-white/10 pl-6">
            <p className="font-condensed text-zinc-400 text-sm tracking-widest leading-relaxed uppercase max-w-xs">
              Your corporation becomes an anchor infrastructure asset in a
              powerful story of determination, leadership, and market influence.
            </p>
          </div>
        </div>

        {/* Right Structural Showcase: Asymmetrical Column Grid */}
        <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 backdrop-blur-sm">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="group relative bg-zinc-950 p-8 sm:p-10 h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-500"
                onMouseEnter={() => setActiveCardGlow(benefit.glow)}
                onMouseLeave={() => setActiveCardGlow(null)}
              >
                {/* Background Tech Mesh Graphic */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-white/[0.02] to-transparent group-hover:from-white/[0.05] transition-all duration-500"></div>

                {/* Top Section: Index and Styled Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-600 group-hover:text-cyan-400 transition-colors duration-300">
                    // ACC_0{benefit.id}
                  </span>

                  <div className="w-10 h-10 border border-white/5 bg-zinc-900/40 flex items-center justify-center transition-all duration-500 group-hover:border-kh-pink/30 group-hover:bg-kh-pink/5">
                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-kh-pink transition-colors duration-300" />
                  </div>
                </div>

                {/* Mid Section: Headlining & Accent Labels */}
                <div className="mt-auto">
                  <span className="block font-mono text-[9px] tracking-[0.2em] text-kh-pink font-semibold uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {benefit.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl tracking-tighter text-white group-hover:tracking-normal transition-all duration-500 uppercase">
                    {benefit.title}
                  </h3>
                </div>

                {/* Bottom Section: Premium Left-Aligned Text */}
                <p className="text-zinc-400 text-xs font-condensed tracking-wider leading-relaxed uppercase mt-4 border-t border-white/5 pt-4 group-hover:text-zinc-200 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Animated Edge Neon Light Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 via-kh-pink to-transparent group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
