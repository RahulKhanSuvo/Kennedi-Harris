import { Link } from "react-router";
import {
  Download,
  ArrowRight,
  Image,
  Play,
  FileText,
  BarChart3,
} from "lucide-react";
import Container from "@/components/common/Container";

export default function AboutAndAssets() {
  const assets = [
    {
      id: 1,
      title: "PHOTOS",
      description: "High-Res Images (JPG)",
      badge: "120+ FILES",
      Icon: Image,
    },
    {
      id: 2,
      title: "VIDEO HIGHLIGHTS",
      description: "Game & Season Highlights",
      badge: "15+ VIDEOS",
      Icon: Play,
    },
    {
      id: 3,
      title: "BIOGRAPHY",
      description: "Player Bio & Achievements",
      badge: "PDF",
      Icon: FileText,
    },
    {
      id: 4,
      title: "STATS & RECORDS",
      description: "Season Stats & Accolades",
      badge: "PDF",
      Icon: BarChart3,
    },
  ];

  const handleDownloadAll = () => {
    alert("Downloading all media assets bundle...");
  };

  return (
    <section className="py-24 bg-kh-dark relative overflow-hidden">
      {/* Editorial glowing backdrop elements */}
      <div className="absolute right-[-10%] top-[20%] w-[600px] h-[400px] bg-kh-blue/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute left-[-5%] bottom-[-10%] w-[400px] h-[300px] bg-kh-pink/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column - About Storytelling */}
        <div className="lg:col-span-5 flex flex-col justify-center relative pl-6 md:pl-8">
          {/* Vertical Tech Hairline Accent */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-kh-pink via-white/10 to-transparent" />

          <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs mb-3">
            ABOUT KENNEDI
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.85] tracking-tighter mb-8 uppercase">
            <span className="block text-white">PURPOSE, LEGACY</span>
            <span className="block text-kh-pink mt-1">AND DETERMINATION.</span>
          </h2>

          <div className="flex flex-col gap-5 text-white/70 text-sm md:text-base leading-relaxed font-sans font-light">
            <p>
              Kennedi Harris is a Class of 2030 basketball prospect known for
              her rare combination of size, versatility, rebounding, shot
              blocking, and guard-level skill. At 6'4", she impacts the game on
              both ends of the floor with the ability to score, defend, rebound,
              push the ball, and create opportunities for her team.
            </p>
            <p>
              Her journey is rooted in purpose, discipline, family, and legacy.
              Kennedi plays with a competitive edge and continues to develop
              into one of the most exciting young prospects in girls basketball.
            </p>
          </div>

          <div className="mt-10">
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 text-xs font-condensed font-black tracking-[0.2em] text-white hover:text-kh-pink transition-colors uppercase"
            >
              <span className="border-b border-white/20 group-hover:border-kh-pink pb-1 transition-colors">
                VIEW FULL BIO
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-kh-pink group-hover:bg-kh-pink/10 transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-kh-pink transition-colors transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column - Press & Media Assets */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs">
              MEDIA & MEDIA ASSETS
            </span>
            <span className="text-[10px] font-sans font-light text-white/30 tracking-wider">
              PRESS KIT UTILITY
            </span>
          </div>

          {/* Re-designed Assets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((asset) => {
              const IconComponent = asset.Icon;
              return (
                <div
                  key={asset.id}
                  className="group relative border border-white/5 rounded-lg bg-white/[0.01] p-6 flex flex-col justify-between min-h-[160px] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Subtle diagonal background overlay highlight on card hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-kh-pink/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-start justify-between w-full z-10">
                    {/* Modern minimalist flat icon styling instead of repeating thick pink circles */}
                    <div className="text-white/40 group-hover:text-kh-pink transition-colors duration-300">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    {/* Tiny clean badge layout */}
                    <span className="text-[9px] font-condensed font-bold tracking-widest text-white/40 group-hover:text-kh-pink border border-white/10 group-hover:border-kh-pink/30 rounded px-2 py-0.5 bg-white/[0.02] transition-colors uppercase">
                      {asset.badge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-auto z-10">
                    <span className="font-condensed font-black text-sm tracking-wider text-white group-hover:text-kh-pink transition-colors uppercase">
                      {asset.title}
                    </span>
                    <span className="text-white/50 text-xs font-sans font-light">
                      {asset.description}
                    </span>
                  </div>

                  {/* Sleek, hidden reveal action link on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 text-[10px] font-condensed font-bold tracking-wider text-kh-pink">
                    DOWNLOAD <Download className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <button
              onClick={handleDownloadAll}
              className="w-full relative overflow-hidden rounded-lg border border-kh-pink/40 bg-kh-pink/5 hover:bg-kh-pink text-white font-condensed font-bold text-xs tracking-[0.2em] py-4 transition-all duration-300 group shadow-lg shadow-kh-pink/5"
            >
              <div className="relative z-10 flex items-center justify-center gap-2.5">
                DOWNLOAD ALL ASSETS
                <Download className="w-3.5 h-3.5 transform group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
