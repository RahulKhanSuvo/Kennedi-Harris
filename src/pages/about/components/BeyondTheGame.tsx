import { MdOutlineInsertPhoto } from "react-icons/md";
import Container from "@/components/common/Container";

import gal1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal2 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal4 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";

export function BeyondTheGame() {
  // Array configuration with custom grid mapping variables
  const galleryItems = [
    { src: gal1, span: "col-span-2 md:col-span-2 md:row-span-2" }, // The Hero Frame
    { src: gal2, span: "col-span-1 md:col-span-1 md:row-span-1" },
    { src: gal3, span: "col-span-1 md:col-span-1 md:row-span-1" },
    { src: gal4, span: "col-span-2 md:col-span-2 md:row-span-1" },
  ];

  return (
    <section className="py-24 bg-[#08080a] border-t border-white/5 relative overflow-hidden group/section">
      {/* Structural environment light arrays */}
      <div className="absolute left-1/3 top-1/4 w-[500px] h-[300px] bg-kh-blue/[0.01] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute right-10 bottom-0 w-[400px] h-[200px] bg-kh-pink/[0.01] blur-[100px] rounded-full pointer-events-none" />

      <Container>
        {/* Section Header Frame */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kh-pink" />
              <span className="text-white/40 font-condensed tracking-[0.2em] font-bold text-xs uppercase">
                VISUAL STORIES
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-tight">
              BEYOND THE <span className="text-kh-pink">GAME</span>
            </h2>
          </div>
          <p className="text-white/40 text-xs md:text-sm max-w-sm font-sans font-light leading-relaxed md:text-right">
            A raw, behind-the-scenes look at the training, focus, lifestyle, and
            moments that define the journey.
          </p>
        </div>

        {/* Asymmetric Cinematic Mosaic */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4 overflow-hidden">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`group/frame relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.01]`}
            >
              {/* Image Layer with dynamic smooth pacing zoom */}
              <img
                src={item.src}
                alt={`Gallery visual frame ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/frame:scale-105"
                loading="lazy"
              />

              {/* High-contrast interior shadow overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/frame:opacity-20 transition-opacity duration-500 pointer-events-none" />

              {/* Fine subtle inner border border shine */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/0 group-hover/frame:border-white/10 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Controlled Action Button Anchor */}
        <div className="flex items-center justify-center pt-12">
          <button className="group/btn flex items-center justify-center gap-2.5 px-6 py-3 border border-kh-pink/30 hover:border-kh-pink bg-transparent text-kh-pink hover:text-white rounded-xl font-condensed font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.2)]">
            VIEW FULL GALLERY
            <MdOutlineInsertPhoto className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
          </button>
        </div>
      </Container>
    </section>
  );
}
