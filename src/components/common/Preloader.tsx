import { useEffect } from "react";
import { motion } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    // Automatically dismisses loader after 2.8 seconds to maintain a swift user experience
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080a] select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-center w-40 h-52">
        {/* Bouncing Basketball Vector Container */}
        <motion.div
          animate={{
            y: [0, -70, 0],
          }}
          transition={{
            duration: 0.65,
            repeat: 3, // Loops through bounce cycles during load duration
            repeatType: "reverse",
            ease: "easeOut",
          }}
          className="w-16 h-16 drop-shadow-[0_10px_15px_rgba(241,19,106,0.2)]"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Base Ball Structure */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="#f1136a"
              stroke="#07080a"
              strokeWidth="4"
            />

            {/* Tactical Grip Seam Overlays */}
            <path
              d="M2 50H98"
              stroke="#07080a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M50 2V98"
              stroke="#07080a"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M16 20C30 32 30 68 16 80"
              stroke="#07080a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M84 20C70 32 70 68 84 80"
              stroke="#07080a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Dynamic Floor Shadow Scale Node */}
        <motion.div
          animate={{
            scaleX: [1, 0.35, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 0.65,
            repeat: 3,
            repeatType: "reverse",
            ease: "easeOut",
          }}
          className="absolute bottom-12 w-12 h-2 rounded-full bg-black/60 blur-[2px]"
        />

        {/* Status Copy Label */}
        <div className="absolute bottom-0 text-center w-max">
          <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase ml-[0.4em]">
            Loading Experience
          </span>
        </div>
      </div>
    </motion.div>
  );
}
