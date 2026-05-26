import { Link, useNavigate } from "react-router";
import { motion, type Variants } from "motion/react";
import { Home, ArrowLeft, AlertCircle, Info } from "lucide-react";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  // Staggered layout variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-kh-dark pt-24 pb-16">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 hero-glow-pink opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 hero-glow-blue opacity-50 pointer-events-none z-0" />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none z-0" />

      {/* Grid Pattern and Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050508_80%)] pointer-events-none z-0" />

      <Container className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* LEFT COLUMN: 404 Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-kh-pink/20 bg-kh-pink/5 text-kh-pink font-mono text-xs tracking-wider uppercase">
                <AlertCircle size={14} /> ERROR CODE: 404
              </div>

              {/* Giant Outline Typography */}
              <h1 className="font-display text-8xl md:text-[140px] font-black leading-none text-white tracking-tighter relative select-none">
                404
                <span className="absolute left-[3px] top-[3px] outline-text-pink opacity-40 select-none pointer-events-none">
                  404
                </span>
              </h1>

              <h2 className="font-display text-4xl md:text-6xl font-bold uppercase text-white tracking-tight">
                OUT OF <span className="text-kh-pink">BOUNDS</span>
              </h2>
            </motion.div>

            {/* Narrative Explanation */}
            <motion.div
              variants={itemVariants}
              className="border-l-2 border-kh-pink pl-6 py-1 max-w-xl"
            >
              <p className="text-zinc-400 font-sans font-light text-lg md:text-xl leading-relaxed">
                Looks like you drove down the wrong lane. The page you are
                looking for has been benched, traded, or simply never made the
                roster.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button asChild variant="khPrimary" className="cursor-pointer">
                <Link to="/" className="flex items-center gap-2">
                  <Home size={16} />
                  BACK TO HOME
                </Link>
              </Button>

              <Button
                onClick={() => navigate(-1)}
                variant="khOutline"
                className="cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                GO BACK
              </Button>
            </motion.div>

            {/* Court Telemetry Tele-Screen (HUD style) */}
            <motion.div
              variants={itemVariants}
              className="border border-white/5 rounded-2xl bg-kh-dark-2/60 backdrop-blur-md p-6 max-w-xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-px bg-kh-pink" />
              <div className="absolute bottom-0 right-0 w-24 h-px bg-kh-blue" />

              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <Info size={14} className="text-kh-blue" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  Telemetry Report // court_diagnostics
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-wider">
                    Shot Clock
                  </div>
                  <div className="font-display text-xl font-bold text-kh-pink mt-0.5">
                    00.0s
                  </div>
                </div>
                <div>
                  <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-wider">
                    Possession
                  </div>
                  <div className="font-display text-xl font-bold text-white mt-0.5">
                    LOST
                  </div>
                </div>
                <div>
                  <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-wider">
                    Accuracy
                  </div>
                  <div className="font-display text-xl font-bold text-kh-blue mt-0.5">
                    0.0%
                  </div>
                </div>
                <div>
                  <div className="font-condensed text-[11px] text-zinc-500 uppercase tracking-wider">
                    Game Status
                  </div>
                  <div className="font-display text-xl font-bold text-white mt-0.5">
                    OVERTIME
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive SVG Hoop / Clang Animation */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="w-full aspect-square max-w-md bg-kh-dark-2/40 border border-white/5 rounded-3xl relative overflow-hidden shadow-3xl backdrop-blur-md">
              {/* Subtle Inner HUD Borders */}
              <div className="absolute inset-0 bg-gradient-to-tr from-kh-pink/3 via-transparent to-kh-blue/5 pointer-events-none z-0" />

              {/* Neon Grid Layout Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none select-none z-0">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Vector Court Drawing with Clanging Hoop */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10 p-6 select-none"
              >
                {/* Court Arc Lines (Background vector blueprint style) */}
                <path
                  d="M 50,400 A 150,150 0 0,1 350,400"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Backboard Support */}
                <path
                  d="M 200,80 L 200,50"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Backboard Frame */}
                <rect
                  x="120"
                  y="80"
                  width="160"
                  height="100"
                  rx="6"
                  fill="rgba(12, 12, 20, 0.7)"
                  stroke="rgba(38, 85, 245, 0.4)"
                  strokeWidth="3"
                  className="shadow-inner"
                />

                {/* Backboard Inner Target Box */}
                <rect
                  x="165"
                  y="125"
                  width="70"
                  height="55"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2.5"
                />

                {/* Net Mesh (SVG lines grid) */}
                <path
                  d="M 175,182 L 180,225 L 200,240 L 220,225 L 225,182 M 175,182 L 200,225 M 225,182 L 200,225 M 190,182 L 195,225 M 210,182 L 205,225"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Rim / Hoop */}
                <ellipse
                  cx="200"
                  cy="180"
                  rx="26"
                  ry="6"
                  fill="none"
                  stroke="#e8176a"
                  strokeWidth="4"
                  className="drop-shadow-[0_0_8px_rgba(232,23,106,0.8)]"
                />

                {/* Basketball with looping path keyframes using Framer Motion */}
                <motion.g
                  animate={{
                    // Loop animation simulating a shot clanging the rim and falling out of bounds
                    x: [0, 110, 190, 204, 250, 310, 380],
                    y: [320, 150, 172, 168, 220, 330, 450],
                    rotate: [0, 180, 320, 380, 480, 600, 720],
                    opacity: [0, 1, 1, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94], // Custom Bezier for realistic gravity bounce
                    times: [0, 0.35, 0.48, 0.53, 0.7, 0.88, 1], // Timing keyframes
                  }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  {/* Ball Graphic */}
                  <circle
                    cx="0"
                    cy="0"
                    r="15"
                    fill="#e8176a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_12px_rgba(232,23,106,0.9)]"
                  />
                  {/* Basketball Grooves */}
                  <path
                    d="M -15,0 Q 0,-5 15,0 M 0,-15 Q 5,0 0,15 M -11,-10 Q 0,0 11,10 M -11,10 Q 0,0 11,-10"
                    stroke="#050508"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.8"
                  />
                </motion.g>

                {/* "CLANG!" Indicator Text (triggers when ball hits the rim) */}
                <motion.text
                  x="235"
                  y="155"
                  fill="#ff1e78"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="Barlow Condensed"
                  letterSpacing="0.1em"
                  className="drop-shadow-[0_0_6px_rgba(255,30,120,0.8)]"
                  animate={{
                    scale: [0, 0, 1.3, 1, 0],
                    opacity: [0, 0, 1, 1, 0],
                    y: [0, 0, -10, -15, -20],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    times: [0, 0.46, 0.49, 0.65, 0.75],
                  }}
                >
                  CLANG!
                </motion.text>
              </svg>

              {/* Technical Blueprint Metadata bottom banner */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center z-20 pointer-events-none select-none">
                <span className="font-mono text-[9px] text-zinc-600 tracking-wider">
                  SYS_ERROR_DRIFT_RADIAL
                </span>
                <span className="font-mono text-[9px] text-kh-pink font-bold animate-pulse">
                  MISSED SHOT
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
