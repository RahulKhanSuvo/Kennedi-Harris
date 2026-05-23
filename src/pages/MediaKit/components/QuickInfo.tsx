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
      value: "#30",
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
            30
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
    <section className="py-12 bg-kh-dark border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center divide-x-0 lg:divide-x divide-white/10">
          {infoItems.map((item, idx) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center text-center gap-4 ${
                  idx > 0 ? "lg:pl-6" : ""
                }`}
              >
                {/* Icon Container */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-black/40 text-kh-pink hover:border-kh-pink hover:bg-kh-pink/10 transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Text labels */}
                <div className="flex flex-col gap-1">
                  <span className="font-condensed font-bold text-xs tracking-[0.2em] text-kh-pink uppercase">
                    {item.label}
                  </span>
                  <span className="font-condensed font-black text-lg md:text-xl text-white uppercase tracking-wider">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
