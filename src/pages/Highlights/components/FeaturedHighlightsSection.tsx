import Container from "@/components/common/Container";

export default function FeaturedHighlightsSection() {
  return (
    <section
      id="latest-highlights"
      className="relative bg-black py-24 overflow-hidden"
    >
      {/* Structural Neon Ambient Glows */}
      <div className="absolute top-1/2 left-[-10%] pointer-events-none h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]"></div>
      <div className="absolute top-1/3 right-[-10%] pointer-events-none h-[400px] w-[400px] rounded-full bg-kh-pink/5 blur-[120px]"></div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
        {/* Left Column: The Big Cinematic Video Player Frame */}
        <div className="w-full lg:w-[60%] animate-fade-in">
          <div className="relative w-full aspect-video bg-zinc-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-none overflow-hidden group">
            {/* Tech Bracket Overlays */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-cyan-400 opacity-40"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-cyan-400 opacity-40"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-cyan-400 opacity-40"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-cyan-400 opacity-40"></div>

            {/* Real Production Video Embed Container */}
            <iframe
              className="w-full h-full object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE" // <-- Replace with your client's YouTube/Vimeo embed URL link
              title="Kennedi Harris Official Highlight Tape"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            {/* Micro-HUD Camera feed overlay lines */}
            <div className="absolute inset-0 pointer-events-none z-20 border border-white/5 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-[size:100%_4px]"></div>
          </div>
        </div>

        {/* Right Column: Dynamic Breakdown Data Panel */}
        <div className="w-full lg:w-[38%] flex flex-col gap-5 text-left">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-kh-pink inline-block"></span>
            <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs">
              On-Court Film
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-none text-white uppercase">
            SEASON{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              REEL
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
            Watch the comprehensive footage breakdown detailing elite
            ball-handling, perimeter precision shooting, and defensive
            transition execution.
          </p>

          <hr className="border-white/5 my-2" />

          {/* Bulleted Performance Points Track */}
          <div className="space-y-4 font-condensed">
            {/* Track 1 */}
            <div className="flex items-start gap-4 group">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 mt-0.5 border border-cyan-500/20">
                01
              </span>
              <div>
                <h4 className="text-white text-base font-bold tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                  Perimeter & 3PT Shooting
                </h4>
                <p className="text-gray-500 text-xs font-sans mt-0.5">
                  Showcasing deep catch-and-shoot conversion consistency under
                  pressure.
                </p>
              </div>
            </div>

            {/* Track 2 */}
            <div className="flex items-start gap-4 group">
              <span className="font-mono text-xs text-kh-pink bg-kh-pink/10 px-2 py-0.5 mt-0.5 border border-kh-pink/20">
                02
              </span>
              <div>
                <h4 className="text-white text-base font-bold tracking-wide uppercase group-hover:text-pink-400 transition-colors">
                  Elite Transition Speed
                </h4>
                <p className="text-gray-500 text-xs font-sans mt-0.5">
                  Explosive court vision, fast-break management, and attacking
                  the rim.
                </p>
              </div>
            </div>

            {/* Track 3 */}
            <div className="flex items-start gap-4 group">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 mt-0.5 border border-cyan-500/20">
                03
              </span>
              <div>
                <h4 className="text-white text-base font-bold tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                  Lockdown Perimeter Defense
                </h4>
                <p className="text-gray-500 text-xs font-sans mt-0.5">
                  Lateral quickness tracking, forced turnovers, and
                  high-pressure shot contesting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
