import { ArrowRight } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import img1 from "@/assets/gallery/looking.avif";
import img2 from "@/assets/gallery/looking2.avif";
import img3 from "@/assets/gallery/dribling3.avif";

export function InstagramSection() {
  const images = [img1, img2, img3];

  return (
    <section className="border-t border-b border-white/5 py-20 bg-[#09090b] relative overflow-hidden">
      {/* High-Contrast Abstract Background Glows */}
      <div className="absolute right-[-10%] bottom-[-20%] w-[500px] h-[400px] bg-kh-pink/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute left-[-5%] top-[-10%] w-[300px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* LEFT PROFILE ACCENT BLOCK — Text & Handles */}
        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center text-center md:text-left gap-6 lg:w-5/12">
          {/* Enhanced Pulsing Icon Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="absolute inset-0 border border-kh-pink/20 rounded-2xl scale-[1.3] animate-pulse pointer-events-none" />
            <div className="absolute inset-0 border border-kh-pink/40 rounded-xl scale-[1.15] pointer-events-none" />
            <div className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center bg-[#111115] text-kh-pink shadow-xl">
              <BsInstagram className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="font-condensed font-bold tracking-[0.2em] text-cyan-400 text-xs uppercase mb-1">
              Live Feed Updates
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3 uppercase">
              FOLLOW THE JOURNEY
            </h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-sans font-light">
              Behind the scenes, game days, explosive workouts, and more.
              Connect directly on Instagram{" "}
              <a
                href="https://instagram.com/kennediharrishoops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kh-pink font-semibold hover:underline block md:inline mt-1 md:mt-0"
              >
                @kennediharrishoops
              </a>
            </p>
          </div>
        </div>

        {/* MIDDLE DYNAMIC COMPOSITION — Premium Scattered Photo Pile */}
        <div className="flex justify-center items-center py-6 w-full lg:w-4/12 group max-w-md lg:max-w-none">
          <div className="relative h-32 w-full flex items-center justify-center">
            {images.map((src, index) => {
              // Custom rotation formulas to style a scattered physical photo grid layer
              const rotations = [
                "-rotate-12 -translate-x-16",
                "-rotate-3 -translate-x-5 scale-105",
                "rotate-6 translate-x-8",
                "rotate-12 translate-x-20",
              ];
              const hoverTransforms = [
                "group-hover:-rotate-6 group-hover:-translate-x-20",
                "group-hover:-rotate-2 group-hover:-translate-x-7 group-hover:scale-110",
                "group-hover:rotate-2 group-hover:translate-x-7 group-hover:scale-110",
                "group-hover:rotate-6 group-hover:translate-x-20",
              ];

              return (
                <div
                  key={index}
                  className={`absolute w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#16161c] transition-all duration-500 ease-out cursor-pointer z-${index * 10} ${rotations[index]} ${hoverTransforms[index]} hover:!scale-125 hover:!z-50 hover:border-kh-pink/60`}
                >
                  <img
                    src={src}
                    alt={`Instagram real moment preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  {/* Glass Canvas Darkening Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40 hover:opacity-10 transition-opacity duration-300" />

                  {/* Micro Branding Node Tag */}
                  <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-white/40">
                    <BsInstagram size={10} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT ACTION BUTTON (3 Columns) — Action Link Router */}
        <div className="flex justify-center lg:justify-end lg:w-3/12 w-full">
          <a
            href="https://instagram.com/kennediharrishoops"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-kh-pink text-black hover:text-white font-condensed font-bold text-xs tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-white/5 hover:shadow-kh-pink/20"
          >
            FOLLOW ON INSTAGRAM
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
