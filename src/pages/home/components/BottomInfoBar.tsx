"use client";

import { motion, type Variants } from "motion/react";
import { MapPin, Star } from "lucide-react";
import { LuCalendarDays } from "react-icons/lu";
import { PiBasketball } from "react-icons/pi";
import { TbRuler2 } from "react-icons/tb";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: kineticSpring },
  },
};

export default function BottomInfoBar() {
  // Cleaned configuration matrix: layout logic is kept purely in the JSX loop
  const metrics = [
    { icon: LuCalendarDays, label: "CLASS OF 2030" },
    { icon: TbRuler2, label: "6'4\"" },
    { icon: PiBasketball, label: "GUARD / FORWARD" },
    { icon: MapPin, label: "WARNER ROBINS, GA" },
    { icon: Star, label: "NATIONAL PROSPECT", isFeatured: true },
  ];

  return (
    <div className="w-full border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1920px] w-full mx-auto px-5 sm:px-10 py-5 lg:py-7 
                   grid grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-4
                   items-center justify-items-start md:justify-items-center lg:justify-between
                   font-condensed font-semibold tracking-widest text-sm sm:text-base lg:text-lg text-white"
      >
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center gap-2.5 min-w-0 w-full md:w-auto
                ${metric.isFeatured ? "col-span-2 md:col-span-1" : ""} 
                ${index % 2 === 1 ? "justify-self-start pl-2 md:pl-0" : ""}
                md:justify-center lg:justify-start
              `}
            >
              <IconComponent className="text-kh-pink shrink-0 text-lg sm:text-xl lg:text-2xl" />
              <span className="truncate uppercase select-none">
                {metric.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
