"use client";

import { motion } from "framer-motion";

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
        className="relative flex flex-col items-center justify-center w-80 h-[500px]"
        style={{ perspective: "1200px" }}
      >
        {/* =========================================================
            THE REALISTIC BOUNCING, STRETCHING & SQUISHING BALL
            ========================================================= */}
        <motion.div
          animate={{
            // 0%: Apex | 46%: Max stretch right before floor | 50%: Impact squish | 54%: Launch snapback | 100%: Apex
            y: [-180, 0, 12, 0, -180],
            scaleY: [1.0, 1.15, 0.65, 1.1, 1.0],
            scaleX: [1.0, 0.88, 1.35, 0.92, 1.0],
          }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            repeatType: "loop",
            ease: [
              [0.33, 0, 0.66, 0.33], // Fall (Gravity acceleration)
              [0.1, 0.8, 0.2, 1.0], // Impact compression
              [0.25, 1.0, 0.5, 1.0], // Bounce push-off
              [0.33, 1, 0.68, 1], // Rise (Gravity deceleration)
            ],
            times: [0, 0.46, 0.5, 0.54, 1.0],
          }}
          style={{ transformOrigin: "bottom center" }}
          className="relative w-44 h-44 z-10 overflow-visible"
        >
          {/* Main SVG Container */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative overflow-visible drop-shadow-[0_25px_30px_rgba(255,42,133,0.35)]"
          >
            <defs>
              {/* Spherical Base Colors */}
              <radialGradient id="ballBase" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ff4093" />
                <stop offset="65%" stopColor="#cc1562" />
                <stop offset="100%" stopColor="#590022" />
              </radialGradient>

              {/* Clean 3D Lighting Environment */}
              <radialGradient id="sphericalLight" cx="32%" cy="28%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="20%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="55%" stopColor="#000000" stopOpacity="0.0" />
                <stop offset="85%" stopColor="#000000" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
              </radialGradient>

              {/* Seam Line Inner Shadow Mask */}
              <filter id="seamDepth">
                <feDropShadow
                  dx="0"
                  dy="1.2"
                  stdDeviation="0.8"
                  floodColor="#000000"
                  floodOpacity="0.8"
                />
              </filter>
            </defs>

            {/* LAYER 1: Core Sphere (Safely scaled to r=42 so squash space never clips) */}
            <circle cx="50" cy="50" r="42" fill="url(#ballBase)" />

            {/* LAYER 2: 3D-ROTATING SEAM CORES */}
            <motion.g
              animate={{
                rotate: [0, 360],
                rotateX: [0, 15, 0],
                skewX: [0, 4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "50px 50px" }}
              filter="url(#seamDepth)"
            >
              {/* Center Rib Lines */}
              <path
                d="M10 50C25 52.5 75 52.5 90 50"
                stroke="#170009"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M50 10C52.5 25 52.5 75 50 90"
                stroke="#170009"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Left Contour Line */}
              <path
                d="M20 20C36 30 36 70 20 80"
                stroke="#170009"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M21 20C37 30 37 70 21 80"
                stroke="#ff7db4"
                strokeWidth="0.75"
                strokeOpacity="0.15"
                strokeLinecap="round"
              />

              {/* Right Contour Line */}
              <path
                d="M80 20C64 30 64 70 80 80"
                stroke="#170009"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M79 20C63 30 63 70 79 80"
                stroke="#ff7db4"
                strokeWidth="0.75"
                strokeOpacity="0.15"
                strokeLinecap="round"
              />
            </motion.g>

            {/* LAYER 3: Volumetric Specular and Core Shadows */}
            <circle cx="50" cy="50" r="42" fill="url(#sphericalLight)" />

            {/* LAYER 4: Micro Edge Rim Highlight */}
            <circle
              cx="50"
              cy="50"
              r="41.5"
              stroke="#ffccd0"
              strokeWidth="0.75"
              strokeOpacity="0.2"
            />
          </svg>
        </motion.div>

        {/* =========================================================
            DYNAMIC FLOOR OCCLUSION & GLOW SHADOW
            ========================================================= */}
        <div className="relative w-40 h-4 mt-6 flex items-center justify-center overflow-visible">
          {/* Base Ambient Glow Ring */}
          <motion.div
            animate={{
              scale: [0.3, 0.9, 1.3, 0.9, 0.3],
              opacity: [0.1, 0.5, 0.8, 0.5, 0.1],
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              repeatType: "loop",
              ease: [
                [0.33, 0, 0.66, 0.33],
                [0.1, 0.8, 0.2, 1.0],
                [0.25, 1.0, 0.5, 1.0],
                [0.33, 1, 0.68, 1],
              ],
              times: [0, 0.46, 0.5, 0.54, 1.0],
            }}
            className="absolute w-36 h-3 rounded-full bg-[#00f0ff]/20 blur-[6px]"
          />

          {/* Hard Contact Shadow Core */}
          <motion.div
            animate={{
              scaleX: [0.1, 0.8, 1.5, 0.8, 0.1],
              scaleY: [0.05, 0.4, 1.1, 0.4, 0.05],
              opacity: [0.0, 0.7, 1.0, 0.7, 0.0],
              filter: [
                "blur(12px)",
                "blur(4px)",
                "blur(1px)",
                "blur(4px)",
                "blur(12px)",
              ],
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              repeatType: "loop",
              ease: [
                [0.33, 0, 0.66, 0.33],
                [0.1, 0.8, 0.2, 1.0],
                [0.25, 1.0, 0.5, 1.0],
                [0.33, 1, 0.68, 1],
              ],
              times: [0, 0.46, 0.5, 0.54, 1.0],
            }}
            className="absolute w-32 h-2.5 rounded-full bg-[#030008]"
          />
        </div>
      </div>
    </motion.div>
  );
}
