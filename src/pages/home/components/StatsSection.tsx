import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from "motion/react";
import statsImg from "@/assets/modal/f84dc78b-5abc-44a4-a0cb-07c9baf66f16-scaled.png";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

interface StatItem {
  value: string;
  label: string | string[];
}

const stats: StatItem[] = [
  { value: "20+", label: "PPG" },
  { value: "16+", label: "RPG" },
  { value: "3+", label: "BPG" },
  { value: "24+", label: "DOUBLE-DOUBLES" },
  { value: "31", label: ["REBOUNDS", "SINGLE GAME"] },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: kineticSpring },
  },
};

// Reusable Count Core Engine
function DigitCounter({ value }: { value: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  // Extract number and suffix character safely (e.g., "20+" -> target: 20, suffix: "+")
  const numericTarget = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    // Set up an IntersectionObserver to trigger counting only when the stat enters view
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(count, numericTarget, {
            duration: 1.5,
            ease: "easeOut",
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numericTarget, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${latest}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return (
    <span ref={nodeRef} className="will-change-transform">
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-black/20 relative overflow-hidden py-12 lg:py-16">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
        {/* Left Stat Array */}
        <div className="flex flex-col w-full lg:w-[72%]">
          {/* Header Title Section */}
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-condensed font-semibold text-base xl:text-lg tracking-widest text-white uppercase">
              BY THE NUMBERS
            </h3>
            <div className="h-px w-12 bg-kh-pink"></div>
          </div>

          {/* Grid Layout Engine */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-2 md:gap-x-0 items-start"
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col items-center relative text-center px-2
                  ${index < 4 ? "md:border-r border-white/10" : ""}
                  ${index === 2 ? "border-r-0 md:border-r" : ""}
                  ${index % 3 === 2 ? "max-md:border-r-0" : "max-md:border-r max-md:border-white/5"}
                  ${index >= 3 ? "max-md:col-span-1.5" : ""}
                `}
              >
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none tracking-tight">
                  <DigitCounter value={item.value} />
                </div>

                <div className="font-condensed font-bold text-xs sm:text-sm tracking-widest text-kh-pink mt-3 uppercase max-w-[140px] mx-auto leading-tight">
                  {Array.isArray(item.label)
                    ? item.label.map((line, i) => (
                        <div
                          key={i}
                          className={
                            i > 0 ? "text-[10px] text-zinc-400 mt-0.5" : ""
                          }
                        >
                          {line}
                        </div>
                      ))
                    : item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Dynamic Live Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: kineticSpring, delay: 0.2 }}
          className="w-full lg:w-[28%] flex flex-row items-center gap-6 bg-neutral-900/40 p-5 rounded border border-white/10 backdrop-blur-sm"
        >
          <div className="w-20 h-24 bg-zinc-950 rounded overflow-hidden shrink-0 border border-white/5">
            <img
              src={statsImg}
              alt="Live Scout Log Data"
              className="w-full h-full object-cover object-top contrast-[1.03]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.classList.add(
                  "flex",
                  "items-center",
                  "justify-center",
                  "bg-kh-blue/20",
                );
                e.currentTarget.parentElement!.innerHTML =
                  '<span class="text-[9px] text-kh-gray font-condensed tracking-widest">LIVE</span>';
              }}
            />
          </div>

          <div className="flex flex-col justify-center gap-3 h-full">
            <div className="font-condensed font-bold text-base tracking-widest text-white uppercase leading-snug">
              STATS UPDATED
              <br />
              THROUGHOUT
              <br />
              THE SEASON.
            </div>
            <span className="w-12 bg-kh-pink h-0.5 rounded-full block"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
