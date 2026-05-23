import Container from "@/components/common/Container";

// --- Partner Logo Text Components ---
// Refined typography variables with fixed layout bounding layers for accurate positioning
function NikeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-4xl md:text-5xl italic font-black tracking-tighter select-none uppercase ${className}`}
    >
      Nike
    </span>
  );
}

function GatoradeLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-baseline font-display italic font-black text-4xl md:text-5xl tracking-tighter select-none ${className}`}
    >
      <span>G</span>
      <span className="text-kh-pink text-xl ml-0.5 not-italic">⚡</span>
    </div>
  );
}

function WilsonLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl md:text-3xl font-medium tracking-wide normal-case select-none ${className}`}
    >
      Wilson
    </span>
  );
}

function BodyArmorLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 select-none ${className}`}
    >
      <span className="font-display text-xl md:text-2xl font-black tracking-widest uppercase">
        BODYARMOR
      </span>
      <span className="font-condensed text-[9px] tracking-[0.25em] text-white/30 uppercase">
        SPORTS DRINK
      </span>
    </div>
  );
}

function UnderArmourLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <span className="font-display text-2xl font-black text-white tracking-tighter">
        UA
      </span>
      <span className="font-condensed text-[9px] tracking-[0.15em] text-white/30 uppercase mt-0.5">
        UNDER ARMOUR
      </span>
    </div>
  );
}

function ShotMechanicsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <span className="font-display text-xl font-extrabold text-white tracking-widest">
        SHOT
      </span>
      <span className="font-condensed text-[9px] tracking-[0.2em] text-white/30 uppercase">
        MECHANICS
      </span>
    </div>
  );
}

function VertimaxLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-lg font-black tracking-[0.2em] uppercase select-none ${className}`}
    >
      VERTIMAX
    </span>
  );
}

function HypericeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-lg font-bold tracking-[0.15em] uppercase select-none ${className}`}
    >
      HYPERICE
    </span>
  );
}

function GirlsEYBLLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <span className="font-sans italic font-black text-xl text-white tracking-tight">
        Girls
      </span>
      <span className="font-condensed text-[9px] tracking-[0.25em] text-white/30 uppercase -mt-1">
        EYBL
      </span>
    </div>
  );
}

function PositiveCoachingLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center text-center select-none ${className}`}
    >
      <span className="font-display text-sm font-black tracking-wider uppercase leading-none">
        POSITIVE COACHING
      </span>
      <span className="font-condensed text-[9px] tracking-[0.2em] text-white/30 uppercase mt-1">
        ALLIANCE
      </span>
    </div>
  );
}

function HoopCultureLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-base font-black tracking-[0.15em] uppercase select-none ${className}`}
    >
      HOOPCULTURE
    </span>
  );
}

function BallerTVLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-lg font-bold uppercase select-none ${className}`}
    >
      BALLER
      <span className="text-kh-pink font-black ml-0.5 lowercase italic">
        tv
      </span>
    </span>
  );
}

// --- Partner Tier Data Configuration ---
// Included structural configuration parameters to automatically alter the layouts per tier
const PARTNER_TIERS = [
  {
    id: "premier",
    title: "PREMIER PARTNERS",
    gridStyles: "grid-cols-2 md:grid-cols-4",
    cardHeight: "h-28 md:h-36",
    cardBg: "bg-white/[0.01] hover:bg-white/[0.03]",
    logos: [
      { id: 1, Component: NikeLogo },
      { id: 2, Component: GatoradeLogo },
      { id: 3, Component: WilsonLogo },
      { id: 4, Component: BodyArmorLogo },
    ],
  },
  {
    id: "performance",
    title: "PERFORMANCE PARTNERS",
    gridStyles: "grid-cols-2 md:grid-cols-4",
    cardHeight: "h-24 md:h-28",
    cardBg: "bg-white/[0.01] hover:bg-white/[0.02]",
    logos: [
      { id: 5, Component: UnderArmourLogo },
      { id: 6, Component: ShotMechanicsLogo },
      { id: 7, Component: VertimaxLogo },
      { id: 8, Component: HypericeLogo },
    ],
  },
  {
    id: "community",
    title: "COMMUNITY PARTNERS",
    gridStyles: "grid-cols-2 sm:grid-cols-4",
    cardHeight: "h-20 md:h-24",
    cardBg: "bg-transparent hover:bg-white/[0.01]",
    logos: [
      { id: 9, Component: GirlsEYBLLogo },
      { id: 10, Component: PositiveCoachingLogo },
      { id: 11, Component: HoopCultureLogo },
      { id: 12, Component: BallerTVLogo },
    ],
  },
];

export function OurPartners() {
  return (
    <section className="py-24 bg-[#08080a] border-t border-white/5 relative overflow-hidden">
      {/* Structural ambient environment backdrop glows */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-kh-pink/[0.01] blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-kh-blue/[0.01] blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kh-pink" />
              <span className="text-white/40 font-condensed tracking-[0.2em] font-bold text-xs uppercase">
                ALLIANCES
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-tight">
              BRAND <span className="text-kh-pink">COLLABORATIONS</span>
            </h2>
          </div>
          <p className="text-white/40 text-xs md:text-sm max-w-md font-sans font-light leading-relaxed lg:text-right">
            Partnering with premium global brands and athletic organizations to
            elevate the platform, support athletes, and grow the game.
          </p>
        </div>

        {/* Partner Tiers Container Stack */}
        <div className="flex flex-col gap-16">
          {PARTNER_TIERS.map((tier) => (
            <div key={tier.id} className="group/tier">
              {/* Minimalist Split Tier Label Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white/30 font-condensed tracking-[0.25em] uppercase font-black text-[10px] group-hover/tier:text-kh-pink transition-colors duration-500">
                  {tier.title}
                </span>
                <div className="flex-grow h-px bg-white/[0.04] group-hover/tier:bg-kh-pink/10 transition-colors duration-500" />
              </div>

              {/* Dynamic Scaling Grid Layout */}
              <div className={`grid ${tier.gridStyles} gap-3`}>
                {tier.logos.map(({ id, Component }) => (
                  <div
                    key={id}
                    className={`group/card flex items-center justify-center ${tier.cardHeight} border border-white/[0.03] rounded-xl transition-all duration-500 px-6 relative overflow-hidden backdrop-blur-sm ${tier.cardBg} hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]`}
                  >
                    {/* Atmospheric internal card glow mesh */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <Component className="text-white/30 group-hover/card:text-white group-hover/card:scale-[1.02] transition-all duration-500 ease-out" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
