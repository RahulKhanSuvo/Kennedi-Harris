import { motion, type Variants } from "motion/react";
import { MapPin, Star } from "lucide-react";
import { LuCalendarDays } from "react-icons/lu";
import { PiBasketball } from "react-icons/pi";
import { TbRuler2 } from "react-icons/tb";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

// Sequence engine variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
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

export default function BottomInfoBar() {
  return (
    <div className="w-full border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1920px] w-full mx-auto px-6 sm:px-10 py-6 md:py-8 
                   grid grid-cols-2 md:flex md:flex-row md:flex-wrap lg:flex-nowrap 
                   items-center justify-between gap-y-6 gap-x-4 md:gap-0
                   font-condensed font-semibold tracking-widest text-base sm:text-lg lg:text-xl text-white"
      >
        {/* Metric Item 1 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 stat-bar-item md:w-1/5 justify-start md:justify-center lg:justify-start"
        >
          <LuCalendarDays className="text-kh-pink shrink-0" size={26} />
          <span className="truncate">CLASS OF 2030</span>
        </motion.div>

        {/* Metric Item 2 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 stat-bar-item md:w-1/5 justify-start md:justify-center"
        >
          <TbRuler2 className="text-kh-pink shrink-0" size={26} />
          <span>6'4</span>
        </motion.div>

        {/* Metric Item 3 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 stat-bar-item md:w-1/5 justify-start md:justify-center"
        >
          <PiBasketball className="text-kh-pink shrink-0" size={26} />
          <span className="truncate">GUARD / FORWARD</span>
        </motion.div>

        {/* Metric Item 4 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 stat-bar-item md:w-1/5 justify-start md:justify-center"
        >
          <MapPin className="text-kh-pink shrink-0" size={26} />
          <span className="truncate">WARNER ROBINS, GA</span>
        </motion.div>

        {/* Metric Item 5 - Spans full width on mobile grid if odd, or cleanly occupies column 1 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 stat-bar-item col-span-2 md:col-span-1 md:w-1/5 justify-start md:justify-center lg:justify-end"
        >
          <Star className="text-kh-pink shrink-0" size={26} />
          <span className="truncate">NATIONAL PROSPECT</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
