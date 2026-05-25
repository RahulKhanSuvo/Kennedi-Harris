import { Shield, Flame, HeartHandshake } from "lucide-react";
import Container from "@/components/common/Container";

// TODO: Import your early training or family legacy media asset here
// import foundationImg from "../../../assets/heritage-foundation.png";

export function GalleryHeritage() {
  return (
    <section className="py-24 relative bg-[#0c0c0f] border-t border-white/5 overflow-hidden">
      {/* Structural Backdrop Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT CANVAS BLOCK (5 Columns) — Raw Archival Media Frame */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative">
          {/* Subtle Ambient Behind Glow */}
          <div className="absolute -inset-2 bg-linear-to-r from-kh-pink/20 to-cyan-500/10 rounded-2xl opacity-30 blur-xl pointer-events-none" />

          <div className="relative aspect-4/5 w-full max-w-[380px] mx-auto lg:max-w-none bg-[#121216] border border-white/10 p-3 rounded-2xl shadow-2xl">
            <div className="w-full h-full rounded-xl bg-[#17171d] overflow-hidden relative flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase">
              {/* <img src={foundationImg} alt="Early Mentorship & Roots" className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.15]" /> */}
              [ FOUNDATION_ARCHIVE_IMAGE ]
              {/* High-Contrast Vintage Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-black/30" />
            </div>

            {/* Float Overlay Identity Ribbon */}
            <div className="absolute -bottom-4 -right-4 bg-[#15151a] border border-white/10 px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2">
              <HeartHandshake size={14} className="text-kh-pink" />
              <span className="font-condensed text-[11px] font-bold tracking-widest text-white uppercase">
                EST. 2016 // COACHED BY DAD
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT TEXT BLOCK (7 Columns) — Narrative Legacy Layout */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
          <div className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-4 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-kh-pink inline-block" />
            The Foundation
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight text-white uppercase mb-6">
            ROOTED IN LEGACY.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              SHAPED BY MENTORSHIP.
            </span>
          </h2>

          <p className="text-gray-400 font-sans font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Before the packed gymnasiums and tournament circuits, the grind
            began in empty driveways and local courts. Guided by her dad's
            coaching from age six, Kennedi developed the elite IQ, court vision,
            and work ethic that define her current game.
          </p>

          {/* Core Values Asymmetric Grid Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-8 max-w-xl">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-kh-pink">
                <Shield size={18} />
              </div>
              <div>
                <h4 className="font-condensed font-bold text-white text-base tracking-wider uppercase mb-1">
                  Elite Court IQ
                </h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Learning the architectural mechanics of basketball directly
                  from high-level, detailed family mentorship.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Flame size={18} />
              </div>
              <div>
                <h4 className="font-condensed font-bold text-white text-base tracking-wider uppercase mb-1">
                  Early Development
                </h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Building fundamental frame balances, defensive versatility,
                  and shot control track layouts since age six.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
