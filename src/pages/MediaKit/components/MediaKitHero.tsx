import Container from "@/components/common/Container";
import mediaKitBg from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function MediaKitHeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      {/* 1. Deep Space Cosmic Backdrop (Shifted hue for unique page identity) */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <img
          src={mediaKitBg}
          alt="Cosmic Horizon"
          className="w-full h-full object-cover scale-125 rotate-90 filter hue-rotate-30 brightness-50"
        />
      </div>

      {/* Cybernetic Structural Grid Overlays */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:5rem_5rem]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* High-intensity Ambient Backlights */}
      <div className="absolute top-[25%] right-[-10%] pointer-events-none h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]"></div>
      <div className="absolute bottom-[5%] left-[-5%] pointer-events-none h-[350px] w-[350px] rounded-full bg-kh-pink/10 blur-[100px]"></div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
        {/* Left Column: Editorial Brand Copy */}
        <div className="flex flex-col gap-5 w-full lg:w-[50%] text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-zinc-900 border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
              Official Partnership Deck // 2026
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.85] uppercase text-white">
            BRAND
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink via-pink-400 to-white">
              PORTFOLIO
            </span>
            <br />& MEDIA
          </h1>

          <p className="text-gray-400 mt-3 max-w-lg text-sm sm:text-base leading-relaxed font-light">
            Welcome to the official press kit for Kennedi Harris #11. This
            portal provides verified audience data, visual assets, and brand
            partnership metrics compiled for agencies, sponsors, and media
            outlets.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="/assets/kennedi-harris-mediakit.pdf"
              download
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-condensed font-bold tracking-widest text-white uppercase transition-all duration-300 bg-kh-pink border border-kh-pink hover:bg-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] rounded-none group cursor-pointer text-sm"
            >
              Download Press Kit
            </a>
            <a
              href="#assets"
              className="inline-flex items-center justify-center px-8 py-4 font-condensed font-bold tracking-widest text-gray-300 uppercase transition-all duration-300 bg-transparent border border-white/10 hover:border-cyan-400 hover:text-cyan-400 rounded-none text-sm"
            >
              View Assets ↓
            </a>
          </div>
        </div>

        {/* Right Column: Premium Digital Dossier / Telemetry Card */}
        <div className="w-full lg:w-[45%] max-w-md lg:max-w-full animate-fade-in">
          <div className="relative border border-white/10 bg-zinc-950/70 backdrop-blur-md p-6 sm:p-8 rounded-none shadow-[0_30px_70px_rgba(0,0,0,0.9)] before:absolute before:inset-0 before:border-l-2 before:border-cyan-400 before:h-1/3">
            {/* Top Branding Track */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              <span>Verified Audience Profile</span>
              <span className="text-cyan-400 font-bold">SYS_ACTIVE</span>
            </div>

            {/* Micro Metrics Grid Layout */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-between h-[100px]">
                <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">
                  Gross Reach
                </span>
                <div className="font-display text-3xl text-white tracking-wide">
                  250K+
                </div>
                <span className="text-kh-pink font-condensed text-[11px] uppercase tracking-widest font-semibold">
                  Followers
                </span>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-between h-[100px]">
                <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">
                  Engagement
                </span>
                <div className="font-display text-3xl text-white tracking-wide">
                  12.4%
                </div>
                <span className="text-cyan-400 font-condensed text-[11px] uppercase tracking-widest font-semibold">
                  Average Rate
                </span>
              </div>
            </div>

            {/* Included Content Assets Checklist */}
            <div className="border-t border-white/5 pt-4">
              <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                Included Download Files:
              </span>
              <ul className="space-y-2 font-condensed text-xs sm:text-sm text-gray-300 uppercase tracking-wider">
                <li className="flex items-center gap-2.5">
                  <span className="text-cyan-400">✓</span> High-Resolution
                  Action Cutouts (.PNG)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-cyan-400">✓</span> Verified Commercial
                  Demographics (.PDF)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-cyan-400">✓</span> Pre-Approved Brand
                  Biographies (.DOCX)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
