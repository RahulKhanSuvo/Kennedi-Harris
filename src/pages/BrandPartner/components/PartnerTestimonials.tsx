import React from "react";
import { Star, ChevronRight } from "lucide-react";

const TESTIMONIALS_PARTNERS = [
  {
    id: 1,
    name: "NIKE BASKETBALL",
    logoText: "Nike",
    logoStyle: "font-display text-5xl italic tracking-tighter text-white",
    stars: 5,
  },
  {
    id: 2,
    name: "GATORADE",
    logoText: "G",
    logoStyle: "font-display text-5xl font-bold tracking-wide text-white",
    stars: 5,
  },
  {
    id: 3,
    name: "WILSON",
    logoText: "Wilson",
    logoStyle:
      "font-display text-3xl font-bold tracking-widest text-white uppercase",
    stars: 5,
  },
];

export function PartnerTestimonials() {
  return (
    <section className="py-16 bg-kh-dark-2/40 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider mb-10">
          PARTNER TESTIMONIALS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left - Quote */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="text-kh-pink font-display text-5xl leading-none">
              &ldquo;
            </div>
            <p className="text-gray-300 text-sm md:text-base font-sans font-light leading-relaxed italic">
              Kennedi represents the future of the game. Her work ethic,
              leadership, and commitment to excellence align perfectly with our
              brand.
            </p>
          </div>

          {/* Right - Partner Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center justify-center text-center gap-4 border border-white/5 rounded-md bg-black/20 p-8 hover:border-kh-pink/30 hover:bg-white/5 transition-all duration-300 cursor-pointer relative"
              >
                {/* Logo */}
                <span className={partner.logoStyle}>{partner.logoText}</span>

                {/* Name */}
                <span className="font-condensed font-bold text-xs tracking-widest text-gray-400 uppercase">
                  {partner.name}
                </span>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: partner.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-kh-pink fill-kh-pink"
                    />
                  ))}
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-kh-pink" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
