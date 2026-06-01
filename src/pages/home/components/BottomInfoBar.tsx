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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: kineticSpring },
  },
};

export default function BottomInfoBar() {
  // Centralized metric collection matrix
  const metrics = [
    {
      icon: LuCalendarDays,
      label: "CLASS OF 2030",
      customClass: "justify-start md:justify-center lg:justify-start",
    },
    {
      icon: TbRuler2,
      label: "6'4\"",
      customClass: "justify-start md:justify-center",
    },
    {
      icon: PiBasketball,
      label: "GUARD / FORWARD",
      customClass: "justify-start md:justify-center",
    },
    {
      icon: MapPin,
      label: "WARNER ROBINS, GA",
      customClass: "justify-start md:justify-center",
    },
    {
      icon: Star,
      label: "NATIONAL PROSPECT",
      customClass:
        "col-span-2 md:col-span-1 justify-start md:justify-center lg:justify-end",
    },
  ];

  return (
    <div className="w-full border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1920px] w-full mx-auto px-6 sm:px-10 py-6 md:py-8 
                   grid grid-cols-1 md:flex md:flex-row md:flex-wrap lg:flex-nowrap 
                   items-center justify-between gap-y-6 gap-x-4 md:gap-0
                   font-condensed font-semibold tracking-widest text-base sm:text-lg lg:text-xl text-white"
      >
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center gap-3 md:w-1/5 truncate ${metric.customClass}`}
            >
              <IconComponent className="text-kh-pink shrink-0 text-xl md:text-2xl" />
              <span className="truncate">{metric.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
