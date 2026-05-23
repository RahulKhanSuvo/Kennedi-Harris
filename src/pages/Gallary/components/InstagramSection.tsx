import { ArrowRight } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import img1 from "../../../assets/gal-1.png";
import img2 from "../../../assets/gal-2.png";
import img3 from "../../../assets/gal-3.png";
import img4 from "../../../assets/gal-4.png";

export function InstagramSection() {
  return (
    <section className="border-y border-white/5 py-12 bg-kh-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-kh-pink/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-4">
        {/* Left Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start xl:items-center text-center md:text-left gap-6 xl:w-1/3">
          {/* Icon Container */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="absolute inset-0 border border-kh-pink/30 rounded-full scale-[1.3] animate-pulse-glow"></div>
            <div className="absolute inset-0 border border-kh-pink/50 rounded-full scale-[1.15]"></div>
            <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-black/50 text-kh-pink">
              <BsInstagram className="w-7 h-7" />
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-2">
              FOLLOW THE JOURNEY
            </h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Behind the scenes, game days, workouts, and more.
              <br className="hidden md:block" />
              Follow me on Instagram{" "}
              <span className="text-kh-pink font-semibold">
                @kennediharrishoops
              </span>
            </p>
          </div>
        </div>

        {/* Middle Content - Image Strip */}
        <div className="flex justify-center xl:w-1/3">
          <div className="flex items-center gap-2">
            {[img1, img2, img3, img4].map((src, index) => (
              <div
                key={index}
                className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-md overflow-hidden group cursor-pointer border border-white/10 hover:border-kh-pink/50 transition-colors"
              >
                <img
                  src={src}
                  alt={`Instagram preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BsInstagram className="w-4 h-4 text-white drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - CTA Button */}
        <div className="flex justify-center xl:justify-end xl:w-1/3">
          <a
            href="https://instagram.com/kennediharrishoops"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group flex items-center"
          >
            FOLLOW ON INSTAGRAM
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
