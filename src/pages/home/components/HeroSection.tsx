import { PlayCircle, FileText } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.avif";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemRevealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: kineticSpring },
  },
};

export default function HeroSection({
  heroImage,
}: {
  heroImage: string | undefined;
}) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center lg:justify-end overflow-hidden hero-glow-blue bg-black">
      {/* Background Graphic Engine */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: kineticSpring }}
        className="absolute inset-0 z-0"
      >
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover object-center transform scale-100"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </motion.div>

      {/* Heavy Giant Canvas Jersey Background Number */}
      <div className="absolute top-20 hidden md:block right-0 lg:right-10 pointer-events-none select-none z-0 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: kineticSpring }}
          className="block font-display text-[300px] lg:text-[450px] leading-none outline-text-blue select-none will-change-transform"
        >
          11
        </motion.span>
      </div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between pt-24 h-full w-full">
        {/* Left Typography Matrix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-[45%] flex flex-col items-start gap-2 lg:pb-16"
        >
          <motion.div
            variants={itemRevealLeft}
            className="font-condensed font-bold tracking-[0.2em] text-kh-pink text-base uppercase"
          >
            Class of 2030
          </motion.div>

          <div className="flex flex-col overflow-hidden">
            <motion.h1
              variants={itemRevealLeft}
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[200px] font-medium text-white uppercase"
            >
              KENNEDI
            </motion.h1>
            <motion.h1
              variants={itemRevealLeft}
              className="font-display text-6xl sm:text-7xl lg:text-9xl xl:text-[200px] text-kh-pink uppercase"
            >
              HARRIS
            </motion.h1>
          </div>

          <motion.div
            variants={itemRevealLeft}
            className="font-condensed font-semibold tracking-widest text-white text-xl sm:text-2xl"
          >
            6'4 GUARD / FORWARD
          </motion.div>

          <motion.div
            variants={itemRevealLeft}
            className="mt-4 flex flex-col gap-2"
          >
            <div className="font-script text-4xl sm:text-5xl text-kh-pink">
              Unfinished Legacy.
            </div>
            <div className="font-condensed tracking-widest text-zinc-400 text-lg sm:text-xl uppercase">
              Built daily. Proven game by game.
            </div>
          </motion.div>

          {/* Action Trigger Block */}
          <motion.div
            variants={itemRevealLeft}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Button variant="khPrimary" asChild className="group">
              <Link to={"/highlights"}>
                <PlayCircle
                  size={18}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                WATCH HIGHLIGHTS
              </Link>
            </Button>
            <Button variant="khOutline" asChild>
              <Link to={"/media-kit"}>
                <FileText size={18} />
                VIEW MEDIA KIT
              </Link>
            </Button>
            {/* <Button variant="khOutline" asChild>
              <Mail size={18} />
              CONTACT FOR NIL / RECRUITING
            </Button> */}
          </motion.div>
        </motion.div>

        {/* Right Athlete Cutout Frame */}
        {/* CHANGED: Added `lg:translate-x-12 xl:translate-x-20` to shift the container right on desktops */}
        <div className="w-full lg:w-[55%] flex justify-center lg:justify-end items-end lg:self-end relative mt-12 lg:mt-0 overflow-visible lg:translate-x-12 xl:translate-x-20">
          {/* Ambient Identity Rings */}
          <div className="absolute bottom-[-10%] left-[25%] -translate-x-1/2 pointer-events-none h-[300px] w-[300px] rounded-full bg-[#ec4899] opacity-20 blur-[80px]" />
          <div className="absolute bottom-0 right-0 pointer-events-none h-[400px] w-[500px] rounded-tl-[100px] bg-linear-to-br from-[#06b6d4] to-[#3b82f6] opacity-15 blur-[100px]" />

          {/* Decorative Calligraphy Identity Tag */}
          {/* CHANGED: Adjusted positioning to `right-[45%] lg:right-[55%] bottom-[25%]` to pull it left of the player */}
          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -10, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.6, ease: kineticSpring }}
            className="absolute right-[5%] lg:right-[55%] bottom-[5%] md:bottom-[25%]  font-script text-4xl lg:text-7xl text-kh-pink z-30 select-none pointer-events-none origin-bottom-right whitespace-nowrap text-right"
          >
            Kennedi
            <br />
            Harris
            <br />
            <span className="text-white">#11</span>
          </motion.div>

          {/* Main Visual Player Array Wrapper */}
          <div className="relative z-10 w-full flex justify-center lg:justify-end items-end">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.35, ease: kineticSpring }}
              className="w-[85%] md:w-[70%] lg:w-[85%] xl:w-[80%] flex items-end justify-center overflow-hidden will-change-transform"
            >
              {heroImage && (
                <img
                  src={heroImage}
                  alt="Kennedi Harris Court Profile"
                  className="w-full max-h-[750px] object-contain block align-bottom contrast-[1.05]"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement?.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                    );
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="text-kh-gray font-condensed tracking-widest border border-white/10 p-12 bg-zinc-950">// DATA FEED MISSING</div>';
                  }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
