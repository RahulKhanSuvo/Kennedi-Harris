import { Handshake, Download, FileText, ArrowUpRight } from "lucide-react";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function BrandPartnerHero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden bg-black py-12">
      {/* Background Graphic Adjustments */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>

      {/* Decorative Brand Accent Grid Line */}
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden lg:block pointer-events-none" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-white/5 hidden lg:block pointer-events-none" />

      {/* Main Content Layout */}
      <Container className="relative z-10 flex flex-col justify-center flex-grow pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* 1. Tagline and Core Title Statement */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-condensed font-bold tracking-widest text-kh-pink text-xs uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-kh-pink animate-pulse" />
              Now accepting NIL Collaborations
            </div>

            <h1 className="font-display text-5xl sm:text-7xl xl:text-[110px] leading-[0.9] text-white tracking-tight uppercase">
              Elevate Your Story With{" "}
              <span className="text-kh-pink">Kennedi Harris</span>
            </h1>
          </div>

          {/* 2. Short Pitch Box (Asymmetrical Placement) */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8 pb-2">
            <p className="font-condensed text-gray-400 tracking-wider text-base sm:text-lg uppercase leading-relaxed">
              Align your brand with elite athletic performance, authentic
              culture, and a legacy built daily from the ground up.
            </p>
          </div>
        </div>

        {/* 3. Action Hub - Modern Rows instead of clustered buttons */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <button className="flex items-center justify-between p-5 bg-white text-black font-condensed font-bold tracking-wider uppercase group hover:bg-kh-pink hover:text-white transition-all duration-300">
            <span className="flex items-center gap-3">
              <Handshake size={20} />
              Pitch a Partnership
            </span>
            <ArrowUpRight
              size={18}
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>

          <button className="flex items-center justify-between p-5 bg-white/5 border border-white/10 text-white font-condensed font-bold tracking-wider uppercase hover:bg-white/10 hover:border-white/30 transition-all duration-300">
            <span className="flex items-center gap-3">
              <Download size={20} className="text-kh-pink" />
              Download NIL Deck
            </span>
            <span className="text-xs text-gray-500 font-sans">PDF</span>
          </button>

          <button className="flex items-center justify-between p-5 bg-white/5 border border-white/10 text-white font-condensed font-bold tracking-wider uppercase hover:bg-white/10 hover:border-white/30 transition-all duration-300">
            <span className="flex items-center gap-3">
              <FileText size={20} className="text-kh-pink" />
              Media & Press Kit
            </span>
            <span className="text-xs text-gray-500 font-sans">ZIP</span>
          </button>
        </div>
      </Container>

      {/* 4. Brand Ticker Row (Anchored to the absolute bottom of the Hero) */}
      <div className="relative z-10 w-full bg-white/[0.02] border-y border-white/5 py-6 mt-auto">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="font-condensed text-xs tracking-[0.2em] text-gray-500 uppercase whitespace-nowrap">
              Featured Partnerships & Press
            </div>
            {/* Horizontal Lineup of Brand Placeholders */}
            <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-40 grayscale contrast-200">
              <span className="font-display text-lg tracking-widest text-white">
                NIKE / EYBL
              </span>
              <span className="font-display text-lg tracking-widest text-white">
                SPATORADE
              </span>
              <span className="font-display text-lg tracking-widest text-white">
                WILSON
              </span>
              <span className="font-display text-lg tracking-widest text-white">
                SLAM MAG
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
