import Container from "@/components/common/Container";
import { User, Ruler, MapPin, Users } from "lucide-react";

export default function QuickInfo() {
  const infoItems = [
    {
      id: 1,
      label: "CLASS",
      value: "2030",
      Icon: User,
    },
    {
      id: 2,
      label: "HEIGHT",
      value: "6'4\"",
      Icon: Ruler,
    },
    {
      id: 3,
      label: "POSITION",
      value: "GUARD / FORWARD",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M6 12A6 6 0 0 1 18 12" />
          <path d="M12 6A6 6 0 0 1 12 18" />
          <path d="M6.5 6.5c2.5 2.5 8.5 2.5 11 0" />
          <path d="M6.5 17.5c2.5-2.5 8.5-2.5 11 0" />
        </svg>
      ),
    },
    {
      id: 4,
      label: "HOMETOWN",
      value: "JACKSONVILLE, FLORIDA",
      Icon: MapPin,
    },
    {
      id: 5,
      label: "JERSEY",
      value: "#11",
      Icon: ({ className }: { className?: string }) => (
        <div
          className={`relative flex items-center justify-center ${className}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M6 3h12l4 6-3 3-1 9H6l-1-9-3-3z" />
          </svg>
          <span className="absolute text-[8px] font-sans font-black mt-1 text-kh-pink">
            11
          </span>
        </div>
      ),
    },
    {
      id: 6,
      label: "TEAM",
      value: "FBC UNITED",
      Icon: Users,
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-kh-dark via-black/20 to-kh-dark border-y border-white/5 overflow-hidden">
      {/* Subtle futuristic background grid line detail */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
          {infoItems.map((item) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col items-center justify-between p-6 md:p-8 bg-black/40 text-center transition-all duration-300 hover:bg-white/[0.02]"
              >
                {/* Subtle Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-kh-pink/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Corner Technical Accent Line */}
                <div className="absolute top-0 left-0 w-3 h-[1px] bg-white/20 group-hover:bg-kh-pink/60 transition-colors" />
                <div className="absolute top-0 left-0 w-[1px] h-3 bg-white/20 group-hover:bg-kh-pink/60 transition-colors" />

                <div className="flex flex-col items-center gap-5 w-full z-10">
                  {/* Hexagon/Angled Box Icon Container */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="w-11 h-11 border border-white/10 rounded-lg flex items-center justify-center bg-white/[0.02] text-white/50 group-hover:text-kh-pink group-hover:border-kh-pink/40 group-hover:bg-kh-pink/[0.03] shadow-inner transform group-hover:rotate-6 transition-all duration-300">
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Text labels container */}
                  <div className="flex flex-col gap-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="font-condensed font-bold text-[10px] tracking-[0.25em] text-white/40 group-hover:text-kh-pink transition-colors uppercase">
                      {item.label}
                    </span>
                    <span className="font-condensed font-black text-base md:text-lg text-white group-hover:text-white uppercase tracking-wide leading-tight break-words max-w-[140px]">
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
