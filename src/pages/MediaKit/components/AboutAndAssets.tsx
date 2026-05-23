import { Link } from "react-router";
import {
  Download,
  ArrowRight,
  Image,
  Play,
  FileText,
  BarChart3,
} from "lucide-react";

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
    <section className="py-20 bg-kh-dark relative overflow-hidden">
      {/* Background element */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[300px] bg-kh-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column - About */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm mb-4">
            ABOUT KENNEDI
          </span>

          <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight mb-6">
            <span className="block text-white">PURPOSE, LEGACY</span>
            <span className="block text-kh-pink mt-1">AND DETERMINATION.</span>
          </h2>

          <div className="flex flex-col gap-4 text-gray-300 text-sm md:text-base leading-relaxed font-sans font-light">
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

          <div className="mt-8">
            <Link
              to="/about"
              className="btn-outline border-kh-pink text-kh-pink hover:text-white group inline-flex items-center gap-2 text-[13px] font-condensed font-bold tracking-widest py-3 px-6"
            >
              VIEW FULL BIO
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column - Media Assets */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="mb-6">
            <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm">
              MEDIA ASSETS
            </span>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((asset) => {
              const IconComponent = asset.Icon;
              return (
                <div
                  key={asset.id}
                  className="group relative border border-white/5 rounded-md bg-kh-dark-2/40 p-6 flex flex-col justify-between gap-6 hover:border-kh-pink/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-full border border-kh-pink bg-black/40 flex items-center justify-center text-kh-pink group-hover:bg-kh-pink group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-condensed font-bold text-xs tracking-wider text-white uppercase">
                      {asset.title}
                    </span>
                    <span className="text-gray-400 text-xs font-sans font-light">
                      {asset.description}
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="inline-block text-[10px] font-condensed font-black tracking-widest text-kh-pink border border-kh-pink/30 rounded px-2 py-0.5 bg-kh-pink/5 uppercase">
                      {asset.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <button
              onClick={handleDownloadAll}
              className="w-full btn-outline border-kh-pink/30 text-white hover:text-kh-pink hover:border-kh-pink/80 group flex items-center justify-center gap-2 text-[13px] font-condensed font-bold tracking-widest py-3.5"
            >
              DOWNLOAD ALL ASSETS
              <Download className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
