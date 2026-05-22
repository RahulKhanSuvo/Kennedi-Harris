import { Download } from "lucide-react";
import galleryHeroPlayer from "../../../assets/highlight-main.png";

export function GalleryHero() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center pt-24 pb-16 overflow-hidden bg-kh-dark">
      {/* Background Glows */}
      <div
        className="absolute inset-0 hero-glow-pink opacity-40 pointer-events-none"
        style={{ left: "-10%", top: "20%" }}
      ></div>
      <div
        className="absolute inset-0 hero-glow-blue opacity-40 pointer-events-none"
        style={{ left: "50%", top: "10%" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm">
            Gallery
          </span>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight">
            <span className="block text-white">MOMENTS.</span>
            <span className="block text-kh-pink mt-2">MEMORIES.</span>
          </h1>

          <p className="text-gray-300 max-w-md text-sm md:text-base leading-relaxed mt-2 font-sans font-light">
            A collection of moments that define the journey, the grind, and the
            game I love.
          </p>

          <div className="mt-4">
            <button className="btn-outline border-kh-pink text-kh-pink hover:text-white group">
              DOWNLOAD PHOTOS
              <Download className="w-4 h-4 ml-2 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Content - Player Image & Number */}
        <div className="relative flex justify-center items-center animate-fade-in-up delay-200 mt-12 lg:mt-0">
          <div className="relative z-10">
            <img
              src={galleryHeroPlayer}
              alt="Kennedi Harris Gallery"
              className="h-[450px] md:h-[600px] object-contain object-bottom drop-shadow-[0_0_20px_rgba(26,64,200,0.3)]"
            />
          </div>
          {/* Outline Number Behind */}
          <div className="absolute right-0 md:right-4 top-0 font-display text-[200px] md:text-[300px] outline-text-pink opacity-30 -z-10 leading-none select-none tracking-tighter">
            30
          </div>
          {/* Signature */}
          <div className="absolute -bottom-4 right-0 md:-right-8 transform -rotate-12 z-20">
            <span className="font-script text-4xl md:text-6xl text-kh-pink drop-shadow-md">
              Kennedi
            </span>
            <br />
            <span className="font-script text-4xl md:text-6xl text-kh-pink drop-shadow-md ml-12">
              Harris{" "}
              <span className="font-sans text-xl md:text-2xl font-bold ml-2 opacity-80">
                #30
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
