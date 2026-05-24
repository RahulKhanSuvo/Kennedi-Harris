import Container from "@/components/common/Container";
import { Star, ChevronRight, Quote } from "lucide-react";
import { motion, type Variants } from "motion/react";

const fluidSpring = [0.16, 1, 0.3, 1] as const;

const viewportSettings = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -40px 0px",
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const leftElementVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: fluidSpring },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: fluidSpring },
  },
};

const TESTIMONIALS_PARTNERS = [
  {
    id: 1,
    name: "NIKE BASKETBALL",
    logoText: "Nike",
    logoStyle:
      "font-display text-4xl lg:text-5xl italic font-black tracking-tighter text-white group-hover:text-rose-500 transition-colors duration-300 select-none",
    stars: 5,
  },
  {
    id: 2,
    name: "GATORADE",
    logoText: "G",
    logoStyle:
      "font-display text-5xl lg:text-6xl font-black tracking-wide text-white group-hover:text-orange-500 transition-colors duration-300 select-none",
    stars: 5,
  },
  {
    id: 3,
    name: "WILSON",
    logoText: "Wilson",
    logoStyle:
      "font-display text-2xl lg:text-3xl font-bold tracking-widest text-white uppercase group-hover:text-amber-600 transition-colors duration-300 select-none",
    stars: 5,
  },
];

export function PartnerTestimonials() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-kh-dark-2/20 to-kh-dark-2/50 border-t border-white/5 overflow-hidden">
      <Container>
        {/* Animated Headline Anchor */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.5, ease: fluidSpring }}
          className="flex items-center gap-4 mb-12 lg:mb-16"
        >
          <div className="h-6 w-1 bg-kh-pink rounded-full" />
          <h2 className="font-condensed font-black text-lg md:text-xl text-white uppercase tracking-widest">
            PARTNER TESTIMONIALS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left - Quote Presentation Panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={leftElementVariants}
            className="lg:col-span-5 flex gap-6 bg-neutral-900/10 border border-white/[0.02] p-6 lg:p-8 rounded-2xl relative overflow-hidden backdrop-blur-xs"
          >
            <div className="absolute -right-4 -bottom-4 text-white/[0.02] pointer-events-none">
              <Quote size={160} strokeWidth={1} />
            </div>

            <div className="text-kh-pink shrink-0 mt-1">
              <Quote
                size={32}
                fill="currentColor"
                stroke="none"
                className="opacity-80"
              />
            </div>

            <div className="space-y-4">
              <p className="text-zinc-300 text-sm md:text-base font-sans font-light leading-relaxed italic relative z-10">
                Kennedi represents the future of the game. Her work ethic,
                leadership, and commitment to excellence align perfectly with
                our brand vision.
              </p>
              <div className="h-px w-12 bg-zinc-800" />
              <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
                Global Brand Syndicate Statement
              </p>
            </div>
          </motion.div>

          {/* Right - Interactive Partner Grid Platform */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:pl-6"
          >
            {TESTIMONIALS_PARTNERS.map((partner) => (
              <motion.div
                key={partner.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: fluidSpring }}
                className="group flex flex-col items-center justify-center text-center gap-5 border border-white/5 rounded-xl bg-neutral-950/40 p-8 hover:border-kh-pink/30 hover:bg-neutral-900/30 transition-colors duration-300 cursor-pointer relative shadow-xl overflow-hidden"
              >
                {/* Subtle Ambient Light Spill Hover Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Brand Logo Anchor Node */}
                <div className="h-16 flex items-center justify-center">
                  <span className={partner.logoStyle}>{partner.logoText}</span>
                </div>

                {/* Meta Description Layer Stack */}
                <div className="space-y-2.5 w-full border-t border-white/5 pt-4">
                  <span className="font-condensed font-black text-[11px] tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-200 uppercase block truncate">
                    {partner.name}
                  </span>

                  {/* Rating Matrix Layer */}
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: partner.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-kh-pink fill-kh-pink transform scale-95 group-hover:scale-100 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 40}ms` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Arrow Icon Trigger Link */}
                <div className="absolute top-4 right-4 text-zinc-600 group-hover:text-kh-pink transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
