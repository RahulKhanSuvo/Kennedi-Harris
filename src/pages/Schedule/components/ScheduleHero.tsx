import Container from "@/components/common/Container";
import scheduleBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function ScheduleHeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      {/* 1. Muted Deep-Space Canvas */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <img
          src={scheduleBg}
          alt="Space Canvas"
          className="w-full h-full object-cover scale-110 filter brightness-50"
        />
      </div>

      {/* Elegant Linear Gradient Shadow */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black via-zinc-950/40 to-black"></div>
      <div className="absolute bottom-0 right-0 pointer-events-none h-[300px] w-[500px] bg-cyan-500/10 blur-[120px]"></div>

      <Container className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        {/* Left Side: Editorial Typography */}
        <div className="flex flex-col gap-4 max-w-xl text-left animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs sm:text-sm">
            On-Court Calendar
          </span>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.85] uppercase text-white">
            2026
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-white">
              SEASON
            </span>
            <br />
            SCHEDULE
          </h1>

          <p className="text-gray-400 mt-4 max-w-md text-sm sm:text-base leading-relaxed font-light">
            An overview of upcoming appearances, seasonal games, and
            tournaments. Find out where and when Kennedi Harris is playing next.
          </p>
        </div>

        {/* Right Side: Premium Clean "Season Pass" Graphic Layout */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end animate-fade-in">
          <div className="relative border border-white/10 bg-zinc-900/30 backdrop-blur-md p-8 w-full max-w-[360px] h-[460px] flex flex-col justify-between overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            {/* Design Elements: Clean Tech Grids */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-kh-pink/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-gray-600 tracking-widest uppercase select-none">
              KH11 // OFFICIAL PASS
            </div>

            {/* Top Pass Brand Block */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div>
                <span className="block font-display text-xl text-white tracking-wide">
                  KENNEDI
                </span>
                <span className="block font-display text-xl text-kh-pink tracking-wide">
                  HARRIS
                </span>
              </div>
              <span className="font-mono text-3xl font-black text-cyan-400 leading-none">
                #11
              </span>
            </div>

            {/* Middle Big Display Text: The Vibe */}
            <div className="my-auto py-6">
              <span className="block font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-1">
                Current Tour
              </span>
              <div className="font-condensed text-4xl font-extrabold text-white leading-tight uppercase tracking-tight">
                ELITE
                <br />
                BOUNDless
                <br />
                ENERGY.
              </div>
            </div>

            {/* Bottom Details Footer */}
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-left font-condensed">
              <div>
                <span className="block text-[11px] text-gray-500 uppercase tracking-wider">
                  Next Stop
                </span>
                <span className="text-white text-sm font-bold uppercase tracking-wide">
                  Regular Season Games
                </span>
              </div>
              <a
                href="#all-dates"
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-kh-pink hover:border-kh-pink transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
