import Container from "@/components/common/Container";
import mediaKitBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function MediaKitHeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      {/* Deep Space Cosmic Backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <img
          src={mediaKitBg}
          alt="Cosmic Horizon"
          className="w-full h-full object-cover scale-125 rotate-90 filter hue-rotate-30 brightness-50"
        />
      </div>

      {/* Cybernetic Structural Grid Overlays */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:5rem_5rem]"></div>
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black via-transparent to-black"></div>

      {/* High-intensity Ambient Backlights */}
      <div className="absolute top-[25%] right-[-10%] pointer-events-none h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]"></div>
      <div className="absolute bottom-[5%] left-[-5%] pointer-events-none h-[350px] w-[350px] rounded-full bg-kh-pink/10 blur-[100px]"></div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
        {/* Left Column: Authentic Basketball Editorial Copy */}
        <div className="flex flex-col gap-5 w-full lg:w-[50%] text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-zinc-900 border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-kh-pink"></span>
            <span className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
              Player Profile & Media Hub // No. 11
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl uppercase text-white">
            ATHLETE
            <br />
            <span className="text-kh-pink ">DOSSIER</span>
            <br />& PRESS
          </h1>

          <p className="text-gray-400 mt-3 max-w-lg text-sm sm:text-base leading-relaxed font-light">
            Official recruitment and brand partnership vault for Kennedi Harris
            #11. Access verified player dimensions, high-resolution court
            captures, and media assets curated for scouts, sports journalists,
            and potential brand partners.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="/assets/kennedi-harris-scouting-deck.pdf"
              download
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-condensed font-bold tracking-widest text-white uppercase transition-all duration-300 bg-kh-pink border border-kh-pink hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] rounded-md group cursor-pointer text-sm"
            >
              Download Scouting Deck
            </a>
            <a
              href="#latest-highlights"
              className="inline-flex items-center justify-center px-8 py-4 font-condensed font-bold tracking-widest text-gray-300 uppercase transition-all duration-300 bg-transparent border border-white/10 hover:border-cyan-400 hover:text-cyan-400 rounded text-sm"
            >
              Watch Highlight Reel ↓
            </a>
          </div>
        </div>

        {/* Right Column: Premium Basketball Player File Vault */}
        <div className="w-full lg:w-[45%] max-w-md lg:max-w-full animate-fade-in">
          <div className="relative border border-white/10 bg-zinc-950/70 backdrop-blur-md p-6 sm:p-8 rounded-none shadow-[0_30px_70px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:border-l-2 before:border-cyan-400 before:h-1/3">
            {/* Top Operational Status Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              <span>Verified Player Network</span>
              <span className="text-cyan-400 font-bold">ROSTER_VERIFIED</span>
            </div>

            {/* Premium Basketball Asset Folders */}
            <div className="space-y-4">
              {/* Asset Item 1 - Action Photos */}
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="text-cyan-400 text-2xl font-light select-none">
                    🏀
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-condensed font-bold text-white tracking-wide uppercase">
                      In-Game Captures
                    </span>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">
                      High-Res Action Cuts & Jersey Shots
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400 group-hover:text-cyan-400 transition-colors pr-1">
                  PNG/JPG
                </span>
              </div>

              {/* Asset Item 2 - Physical Stats & Measurements */}
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:border-kh-pink/30 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="text-kh-pink text-2xl font-light select-none">
                    📋
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-condensed font-bold text-white tracking-wide uppercase">
                      Athletic Measurements
                    </span>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">
                      Height, Wingspan, Vertical & Combine Data
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400 group-hover:text-kh-pink transition-colors pr-1">
                  PDF
                </span>
              </div>

              {/* Asset Item 3 - Official Bio & Background */}
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="text-cyan-400 text-2xl font-light select-none">
                    🆔
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-condensed font-bold text-white tracking-wide uppercase">
                      Player Bio & Schedule
                    </span>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">
                      Press Release Bio & Tournament Dates
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400 group-hover:text-cyan-400 transition-colors pr-1">
                  DOCX
                </span>
              </div>
            </div>

            {/* Basketball Distribution Note */}
            <div className="border-t border-white/5 pt-4 mt-6">
              <p className="text-left font-mono text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed">
                * Media distribution asset packages authorized for athletic
                recruitment, athletic press, and brand sponsorship validation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
