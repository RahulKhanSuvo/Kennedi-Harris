import { Grid, Layers, ArrowDown } from "lucide-react";
import Container from "@/components/common/Container";

import galleryHeroMain from "@/assets/gallery/12c168ed-4b81-4cd0-a9b7-2dab64e505ea.jpeg";
import galleryHeroSub from "@/assets/gallery/5a3f0dac-6e17-403f-b599-d526116806c7.jpeg";

export function GalleryHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#09090b] border-b border-white/5 overflow-hidden">
      {/* Decorative Editorial Background Text Grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-kh-pink/5 blur-[150px] pointer-events-none" />
      <div className="absolute -left-12 top-1/3 text-[14vw] font-display font-black text-white/1 uppercase select-none tracking-tighter leading-none pointer-events-none">
        VISUALS // 11
      </div>

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN (7 Columns) — Typography & Core Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Section Breadcrumb Badge */}
          <div className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-kh-pink inline-block" />
            Media Gallery
          </div>

          {/* Giant Title Typography Stacks */}
          <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tight text-white uppercase mb-8">
            MOMENTS.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink via-[#d946ef] to-white">
              MEMORIES.
            </span>
          </h1>

          {/* Body Content Description */}
          <p className="text-gray-400 font-sans font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            A collection of moments that define the journey, the grind, and the
            game I love. Each frame captures the sweat behind closed doors and
            the energy on the court.
          </p>

          {/* Action Metrics Row / Quick Controls Navigation */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-t border-white/5 pt-8 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-kh-pink">
                <Layers size={18} />
              </div>
              <div>
                <div className="font-condensed font-bold text-white uppercase text-sm tracking-wider">
                  ALL MEDIA
                </div>
                <div className="text-xs text-gray-500 font-sans">
                  Photos & Highlights
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Grid size={18} />
              </div>
              <div>
                <div className="font-condensed font-bold text-white uppercase text-sm tracking-wider">
                  ARCHIVE
                </div>
                <div className="text-xs text-gray-500 font-sans">
                  Filtered by Seasons
                </div>
              </div>
            </div>

            {/* Micro-Scroll Down Anchor Button */}
            <a
              href="#gallery-grid"
              className="ml-auto h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-kh-pink hover:bg-kh-pink/10 transition-all duration-300 group"
            >
              <ArrowDown
                size={16}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Columns) — Premium Layered Graphic Composition */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end pt-8 lg:pt-0">
          {/* CHANGED: Adjusted aspect-[4/5] to aspect-[4/4.5] for a slight height reduction */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none aspect-square">
            {/* Background Structural Accent Box */}
            <div className="absolute inset-0 bg-[#111115] border border-white/10 rounded-2xl transform -rotate-3 transition-transform duration-500 hover:rotate-0 shadow-xl overflow-hidden z-0">
              <div className="absolute inset-0 dot-grid opacity-[0.1]" />
              {/* Optional Back Frame Fallback Texture/Image */}
              <div className="absolute bottom-6 left-6 font-display text-4xl text-white/5 font-black uppercase">
                THE GRIND
              </div>
            </div>

            {/* Main Foreground Frame Canvas */}
            <div className="absolute inset-4 bg-[#16161c] border border-white/10 rounded-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl overflow-hidden z-10 flex items-end">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10" />

              {/* Main Image Replacement Layer */}
              <div className="w-full h-full bg-[#1c1c24] flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase">
                <img
                  src={galleryHeroMain}
                  alt="On Court Action"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Frame Badge Tag */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md">
                <span className="w-2 h-2 rounded-full bg-kh-pink animate-pulse" />
                <span className="font-condensed text-[10px] tracking-widest text-white uppercase">
                  IN-GAME CAPTURES
                </span>
              </div>
            </div>

            {/* Asymmetrical Offset Floating Secondary Mini-Frame */}
            <div className="absolute -bottom-6 -left-6 sm:-left-10 w-1/2 aspect-square bg-[#1a1a22] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-300 hidden sm:block">
              <div className="w-full h-full bg-[#22222a] flex items-center justify-center text-gray-600 font-condensed text-[9px] tracking-wider uppercase text-center">
                <img
                  src={galleryHeroSub}
                  alt="Training Session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
