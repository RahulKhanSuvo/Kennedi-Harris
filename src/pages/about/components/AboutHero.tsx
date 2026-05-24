import { motion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/modal/hero.png";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: kineticSpring },
  },
};

const imageCanvasVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: kineticSpring, delay: 0.2 },
  },
};

export default function AboutHeroSection() {
  return (
    <section className="relative min-h-[95vh] bg-[#0a0a0c] flex flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Background Media Engine Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.08] mix-blend-luminosity grayscale pointer-events-none">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={backgroundImage}
          alt="Atmospheric Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c] to-[#0a0a0c] pointer-events-none" />

      <Container className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* LEFT SIDE (6 Columns) - Typography & Copy Matrix */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              variants={fadeUpVariants}
              className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-5 flex items-center gap-3"
            >
              <span className="w-6 h-[1px] bg-kh-pink inline-block" />
              THE BIOGRAPHY
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="font-display text-5xl sm:text-7xl lg:text-[76px] xl:text-[86px] leading-[0.85] text-white uppercase tracking-tight mb-8"
            >
              PURPOSE DRIVES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink via-white to-white py-1 block">
                PASSION DEFINES.
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUpVariants}
              className="text-zinc-300 space-y-5 text-base sm:text-lg leading-relaxed font-sans font-light max-w-xl border-l-2 border-white/10 pl-6"
            >
              <p>
                Kennedi Harris is a Class of 2030 basketball prospect known for
                her rare combination of size, versatility, rebounding, shot
                blocking, and guard-level skill.
              </p>
              <p>
                At 6'4", she impacts the game on both ends of the floor with the
                ability to score, defend, rebound, push the ball, and create
                opportunities for her team.
              </p>
              <p className="text-kh-pink font-semibold">
                Her journey is rooted in purpose, discipline, family, and
                legacy. Kennedi plays with a competitive edge and continues to
                develop into one of the most exciting young prospects in girls
                basketball.
              </p>
            </motion.div>

            {/* Interactive Scroll Anchor */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-12 flex items-center gap-4 text-zinc-500 font-condensed tracking-widest text-xs uppercase select-none cursor-pointer group"
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="group-hover:text-white transition-colors duration-300">
                EXPLORE THE JOURNEY
              </span>
              <div className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/[0.01] group-hover:bg-white/[0.05] group-hover:border-white/30 transition-all duration-300 animate-bounce">
                <ArrowDown size={14} />
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE (6 Columns) - High Fidelity Image Presenter */}
          <motion.div
            variants={imageCanvasVariants}
            className="lg:col-span-6 w-full h-full min-h-[500px] lg:min-h-[680px] relative mt-6 lg:mt-0"
          >
            {/* Ambient Structural Mesh Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl z-0" />

            {/* Dynamic Volumetric Backlights */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-kh-pink opacity-15 blur-[100px] pointer-events-none will-change-transform" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500 opacity-10 blur-[100px] pointer-events-none will-change-transform" />

            <div className="absolute inset-4 overflow-hidden rounded-xl bg-neutral-950 border border-white/5 shadow-2xl z-10 flex items-end group">
              <img
                src={heroImg}
                alt="Kennedi Harris Portrait Showcase"
                className="w-full h-full object-cover object-top filter saturate-[1.03] contrast-[1.02] transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out will-change-transform"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-zinc-600 font-condensed tracking-widest text-sm">// PLAYER PROFILE SHOWCASE</div>';
                }}
              />

              {/* Dynamic Overlay Meta Strips along the bottom of the canvas */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-6 flex items-end justify-between border-t border-white/5 backdrop-blur-[2px]">
                <div className="flex flex-col gap-1">
                  <div className="font-display text-2xl lg:text-3xl text-white tracking-wide uppercase leading-none">
                    KENNEDI HARRIS
                  </div>
                  <div className="font-condensed text-[11px] text-zinc-400 tracking-widest uppercase font-medium">
                    POSITION // 6'4" GUARD & FORWARD
                  </div>
                </div>

                <div className="text-right flex flex-col items-end justify-end">
                  <div className="font-display text-3xl lg:text-4xl text-kh-pink leading-none">
                    #11
                  </div>
                  <div className="font-condensed text-[10px] text-zinc-500 tracking-wider uppercase mt-1 font-bold">
                    CLASS OF 2030
                  </div>
                </div>
              </div>
            </div>

            {/* Asymmetric Typography Watermark Layer */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[130px] text-white/[0.01] uppercase select-none pointer-events-none origin-center rotate-90 hidden xl:block whitespace-nowrap tracking-widest">
              ATHLETE PROFILE
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
