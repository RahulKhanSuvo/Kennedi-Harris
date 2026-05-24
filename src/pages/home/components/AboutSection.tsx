import { Star, User, GraduationCap, Users, ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import aboutImg from "@/assets/me-removebg-preview.png";
import { Button } from "@/components/ui/button";

const fluidSpring = [0.16, 1, 0.3, 1] as const;

const scrollViewport = {
  once: true,
  amount: 0.15,
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const elementFadeVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: fluidSpring },
  },
};

const traitsGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const traitItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: fluidSpring },
  },
};

const features = [
  {
    icon: Star,
    title: "COMPETITIVE",
    desc: "Relentless on both ends of the floor",
  },
  {
    icon: User,
    title: "LEADER",
    desc: "Vocal and leads completely by example",
  },
  {
    icon: GraduationCap,
    title: "STUDENT",
    desc: "Academic driven and elite focus",
  },
  {
    icon: Users,
    title: "TEAM FIRST",
    desc: "Achieving true success together",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-kh-dark relative overflow-hidden py-24 border-t border-white/5"
    >
      {/* Structural Accent Assets */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-kh-pink/[0.01] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute left-1/3 top-1/4 w-[1px] h-2/3 bg-white/[0.02] hidden lg:block pointer-events-none z-0" />

      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Left Frame - Graphic Mask & Athlete Media Showcase */}
          <motion.div
            variants={elementFadeVariants}
            className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="dot-grid absolute w-32 h-[60%] -left-6 top-[10%] opacity-20 pointer-events-none" />

            {/* Split Color Technical Accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] transform -skew-x-12 -translate-x-6 hidden lg:block bg-gradient-to-b from-kh-pink via-kh-blue to-transparent" />

            <div className="relative w-full max-w-[360px] aspect-[3/4] bg-neutral-950/40 border border-white/5 rounded-2xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

              <img
                src={aboutImg}
                alt="Kennedi Harris Portrait"
                className="w-full h-full object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-103"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const container = e.currentTarget.parentElement;
                  if (container) {
                    container.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                    );
                    container.innerHTML =
                      '<div class="text-zinc-600 font-mono text-xs tracking-widest">MEDIA_MISSING //</div>';
                  }
                }}
              />

              {/* Bold Floating Uniform Identity Tag */}
              <div className="absolute bottom-6 right-6 font-display text-8xl font-black italic select-none leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent z-0">
                05
              </div>
            </div>
          </motion.div>

          {/* Center Frame - Editorial Core Narrative Statement */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            <div className="font-mono font-bold tracking-[0.3em] text-kh-pink text-xs uppercase">
              ATHLETE PROFILE //
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tighter">
              PURPOSE DRIVES.
              <br />
              <span className="text-kh-pink">PASSION DEFINES.</span>
            </h2>

            <div className="text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 font-sans font-light">
              <p>
                Kennedi Harris is a Class of 2030 basketball prospect known for
                her rare combination of size, versatility, rebounding, shot
                blocking, and guard-level skill. At 6'4", she impacts the game
                on both ends of the floor with the ability to score, defend,
                rebound, push the ball, and create opportunities for her team.
              </p>
              <p>
                Her journey is rooted in purpose, discipline, family, and
                legacy. Kennedi plays with a competitive edge and continues to
                develop into one of the most exciting young prospects in girls
                basketball.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 mt-4">
              <Button
                variant="outline"
                className="inline-flex items-center gap-3 font-condensed font-black tracking-widest text-white border-white/10 hover:border-kh-pink hover:bg-kh-pink/5 hover:text-kh-pink transition-all uppercase text-xs px-6 py-5 group rounded-xl cursor-pointer"
              >
                LEARN MORE ABOUT KENNEDI
                <ArrowRight
                  size={14}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </Button>
            </div>
          </div>

          {/* Right Frame - Structured Trait System Block */}
          <motion.div
            variants={traitsGridVariants}
            className="col-span-1 lg:col-span-3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-8 gap-6 w-full"
          >
            {features.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={traitItemVariants}
                  className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-neutral-950/20 transition-all duration-300 group/trait"
                >
                  {/* Dynamic Action Trigger Node */}
                  <div className="rounded-xl border border-white/10 text-zinc-500 bg-neutral-900/40 p-3.5 group-hover/trait:border-kh-pink/50 group-hover/trait:text-kh-pink group-hover/trait:bg-kh-pink/5 transition-all duration-300 shadow-md">
                    <IconComponent
                      strokeWidth={1.75}
                      className="w-5 h-5 transition-transform duration-500 group-hover/trait:rotate-[8deg]"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="font-display font-black italic text-sm tracking-wide text-white uppercase transition-colors group-hover/trait:text-kh-pink">
                      {item.title}
                    </div>
                    <div className="text-zinc-500 text-xs font-sans font-medium">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
