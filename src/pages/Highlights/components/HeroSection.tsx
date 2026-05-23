import Container from "@/components/common/Container";
import highlightBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";
// Tip: If you have a secondary basketball action image, use it here!

export default function HighlightsHeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      {/* 1. Starfield / Nebula Background (Muted compared to home) */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <img
          src={highlightBg}
          alt="Space Background"
          className="w-full h-full object-cover scale-110 rotate-180" // Rotated to change the nebula shape from home page
        />
      </div>

      {/* Cyber Grid Overlay to make it feel like film/analysis space */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/70 to-black"></div>

      {/* Ambient Neon Flares positioned differently than home page */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 pointer-events-none h-[300px] w-[600px] rounded-full bg-cyan-500/20 blur-[120px]"></div>

      <Container className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-kh-pink/30 bg-kh-pink/10 mb-6 backdrop-blur-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-kh-pink animate-ping"></span>
          <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs sm:text-sm">
            Media & Mixtapes
          </span>
        </div>

        {/* Big Impact Headline - Centered & Stacked */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-4 uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            THE REEL DEPT.
          </span>
        </h1>

        <p className="text-gray-400 font-condensed tracking-widest text-lg sm:text-xl uppercase max-w-2xl font-semibold mb-8">
          Kennedi Harris <span className="text-kh-pink">#11</span> // Complete
          On-Court Performance Tape
        </p>

        {/* 2. THE HIGHLIGHT SCREEN - This completely breaks the home page layout */}
        <div className="relative w-full max-w-4xl aspect-video bg-gray-900/40 border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group backdrop-blur-md">
          {/* Cyber Video Frame Corner UI Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>

          {/* Video Metadata overlay */}
          <div className="absolute top-4 left-10 font-mono text-[10px] text-cyan-400 tracking-wider hidden sm:block">
            REC [•] 4K HDR // 60FPS // CAM_A
          </div>

          {/* Simulated Dark Video Thumbnail backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-pink-500/10 mix-blend-color-dodge"></div>

          {/* Main Action Content Center Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 group-hover:bg-black/30 transition-all duration-300">
            {/* Pulsing Glowing Play Button Trigger */}
            <button className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-black transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] group-hover:bg-kh-pink group-hover:text-white cursor-pointer z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <span className="mt-4 font-condensed text-white tracking-widest font-bold uppercase text-sm group-hover:text-cyan-300 transition-colors duration-300">
              Play 2026 Season Mixtape
            </span>
            <span className="text-xs text-gray-500 font-mono mt-1">
              Duration: 4:12
            </span>
          </div>

          {/* Optional: Subtle scanning line effect across video */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/5 via-transparent to-transparent h-[10%] w-full animate-scan opacity-20"></div>
        </div>

        {/* Quick Filter Navigation underneath the screen */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 font-condensed text-xs sm:text-sm tracking-wider uppercase">
          <span className="text-gray-500 font-bold">Quick Jump:</span>
          <a
            href="#mixtapes"
            className="text-white hover:text-kh-pink transition-colors"
          >
            ⚡ Full Mixtapes
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="#game-winners"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            🏀 Game Winners
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="#defense"
            className="text-white hover:text-kh-pink transition-colors"
          >
            🛡️ Defensive Stops
          </a>
        </div>
      </Container>
    </section>
  );
}
