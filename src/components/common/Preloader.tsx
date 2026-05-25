import { motion } from "motion/react";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09050d] select-none pointer-events-auto overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2a85]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Perspective Stage */}
      <div
        className="relative flex flex-col items-center justify-center w-80 h-[450px]"
        style={{ perspective: "1000px" }}
      >
        {/* =========================================================
            THE BOUNCING BALL WRAPPER
            ========================================================= */}
        <motion.div
          animate={{ y: [0, -160, 0] }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.25, 1, 0.5, 1], // Realistic gravitational bounce
          }}
          className="relative w-44 h-44 z-10 filter drop-shadow-[0_30px_40px_rgba(255,42,133,0.4)]"
        >
          {/* Main SVG Container */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative"
          >
            <defs>
              {/* 1. Base color underlay */}
              <radialGradient id="ballBase" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff2a85" />
                <stop offset="100%" stopColor="#800033" />
              </radialGradient>

              {/* 2. Fixed 3D Light Shading Overlay (Crucial for 3D illusion) */}
              <radialGradient id="sphericalLight" cx="30%" cy="25%" r="65%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="30%" stopColor="white" stopOpacity="0.0" />
                <stop offset="75%" stopColor="black" stopOpacity="0.4" />
                <stop offset="100%" stopColor="black" stopOpacity="0.85" />
              </radialGradient>

              {/* Seam Depth Filter */}
              <filter id="seamDepth">
                <feDropShadow
                  dx="0.5"
                  dy="1.5"
                  stdDeviation="1"
                  floodColor="#000"
                  floodOpacity="0.7"
                />
              </filter>
            </defs>

            {/* LAYER A: Base Spherical Volume */}
            <circle cx="50" cy="50" r="46" fill="url(#ballBase)" />

            {/* =========================================================
                LAYER B: SPINNING TEXTURE CORE (Embedded Motion)
                Only the seams spin. This mimics true 3D surface rotation.
                ========================================================= */}
            <motion.g
              animate={{
                rotate: 360,
                scaleX: [1, 0.85, 1], // Simulates slight orbital turning
              }}
              transition={{
                rotate: { duration: 1.8, repeat: Infinity, ease: "linear" },
                scaleX: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "50px 50px" }}
              filter="url(#seamDepth)"
            >
              {/* Center Grid Ribs */}
              <path
                d="M4 50C25 52 75 52 96 50"
                stroke="#120007"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M50 4C52 25 52 75 50 96"
                stroke="#120007"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Left Dynamic Contour Line */}
              <path
                d="M16 16C36 30 36 70 16 84"
                stroke="#120007"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M16 16C36 30 36 70 16 84"
                stroke="#ffd700"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />

              {/* Right Dynamic Contour Line */}
              <path
                d="M84 16C64 30 64 70 84 84"
                stroke="#120007"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M84 16C64 30 64 70 84 84"
                stroke="#ffd700"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
            </motion.g>

            {/* LAYER C: FIXED 3D LIGHT SHIELD (Does NOT rotate) */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="url(#sphericalLight)"
              style={{ mixBlendMode: "multiply" }}
            />

            {/* Fine Rim Highlight Accent */}
            <circle
              cx="50"
              cy="50"
              r="45.5"
              stroke="#ffb3d1"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          </svg>
        </motion.div>

        {/* =========================================================
            DYNAMIC FLOOR GLOW SHADOW
            ========================================================= */}
        <motion.div
          animate={{
            scale: [1, 0.25, 1],
            opacity: [0.75, 0.1, 0.75],
            filter: ["blur(5px)", "blur(16px)", "blur(5px)"],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.25, 1, 0.5, 1],
          }}
          className="w-36 h-3 rounded-full bg-[#00f0ff]/25 border border-[#00f0ff]/20 mt-10 z-0"
        />
      </div>
    </motion.div>
  );
}
