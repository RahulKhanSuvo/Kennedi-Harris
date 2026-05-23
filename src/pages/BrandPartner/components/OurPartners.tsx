// --- Partner Logo Text Components ---
// Since we don't have actual brand logo image files, we render stylized text logos.
// Replace these with <img> tags when real logo assets are available.

function NikeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-5xl md:text-6xl italic tracking-tighter text-white ${className}`}
    >
      Nike
    </span>
  );
}

function GatoradeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-4xl md:text-5xl font-bold tracking-wide text-white ${className}`}
    >
      G
    </span>
  );
}

function WilsonLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-3xl md:text-4xl font-bold tracking-widest text-white uppercase ${className}`}
    >
      Wilson
    </span>
  );
}

function BodyArmorLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="font-display text-2xl md:text-3xl font-black tracking-widest text-white uppercase">
        BODYARMOR
      </span>
      <span className="font-condensed text-xs tracking-[0.3em] text-gray-400 uppercase">
        Sports Drink
      </span>
    </div>
  );
}

function UnderArmourLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="font-display text-3xl md:text-4xl font-bold text-white">
        UA
      </span>
      <span className="font-condensed text-[10px] tracking-[0.2em] text-gray-400 uppercase">
        Under Armour
      </span>
    </div>
  );
}

function ShotMechanicsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="font-display text-2xl md:text-3xl font-bold text-white tracking-wider">
        SHOT
      </span>
      <span className="font-condensed text-xs tracking-[0.2em] text-gray-400 uppercase">
        Mechanics
      </span>
    </div>
  );
}

function VertimaxLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-white uppercase ${className}`}
    >
      VERTIMAX
    </span>
  );
}

function HypericeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-white uppercase ${className}`}
    >
      HYPERICE
    </span>
  );
}

function GirlsEYBLLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="font-script text-4xl text-white">Girls</span>
      <span className="font-condensed text-xs tracking-[0.2em] text-gray-400 uppercase">
        EYBL
      </span>
    </div>
  );
}

function PositiveCoachingLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <span className="font-condensed text-lg font-bold tracking-wider text-white uppercase">
        Positive
      </span>
      <span className="font-display text-2xl font-black text-white uppercase">
        Coaching
      </span>
      <span className="font-condensed text-xs tracking-[0.2em] text-gray-400 uppercase">
        Alliance
      </span>
    </div>
  );
}

function HoopCultureLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl md:text-3xl font-black tracking-wider text-white uppercase ${className}`}
    >
      HOOPCULTURE
    </span>
  );
}

function BallerTVLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl md:text-3xl font-bold text-white uppercase ${className}`}
    >
      BALLER <span className="text-kh-pink font-black">tv</span>
    </span>
  );
}

// --- Partner Tier Data ---
const PARTNER_TIERS = [
  {
    id: "premier",
    title: "PREMIER PARTNERS",
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
    <section className="py-16 bg-kh-dark-2/40 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
            OUR PARTNERS
          </h2>
          <p className="text-gray-400 text-sm max-w-md font-sans font-light leading-relaxed md:text-right">
            We're proud to collaborate with forward-thinking brands that share
            our values of excellence, integrity, and impact.
          </p>
        </div>

        {/* Partner Tiers */}
        <div className="space-y-12">
          {PARTNER_TIERS.map((tier) => (
            <div key={tier.id}>
              {/* Tier Label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-xs">
                  {tier.title}
                </span>
                <div className="flex-grow h-px bg-kh-pink/20"></div>
              </div>

              {/* Logos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tier.logos.map(({ id, Component }) => (
                  <div
                    key={id}
                    className="group flex items-center justify-center h-28 md:h-32 border border-white/5 rounded-md bg-black/20 hover:border-kh-pink/30 hover:bg-white/5 transition-all duration-300 cursor-pointer px-6"
                  >
                    <Component className="opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
