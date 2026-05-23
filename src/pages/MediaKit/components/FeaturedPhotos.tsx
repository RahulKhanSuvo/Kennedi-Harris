import { Link } from "react-router";
import { ChevronRight, Maximize2 } from "lucide-react";
import img1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img4 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img5 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import Container from "@/components/common/Container";

export default function FeaturedPhotos() {
  const photos = [
    {
      id: 1,
      src: img1,
      alt: "On-court action",
      gridClass: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto", // Big Hero Shot
    },
    {
      id: 2,
      src: img2,
      alt: "Player portrait",
      gridClass: "col-span-1 aspect-[3/4]",
    },
    {
      id: 3,
      src: img3,
      alt: "Jersey detail",
      gridClass: "col-span-1 aspect-[3/4]",
    },
    {
      id: 4,
      src: img4,
      alt: "In-game defense",
      gridClass: "col-span-1 aspect-[3/4] md:aspect-square lg:aspect-[3/4]",
    },
    {
      id: 5,
      src: img5,
      alt: "Game focus",
      gridClass: "col-span-2 sm:col-span-1 aspect-[2/1] sm:aspect-[3/4]", // Spans wide on tiny screens, boxes up on large
    },
  ];

  return (
    <section className="py-24 bg-kh-dark border-t border-white/5 relative">
      {/* Decorative subtle numbering/branding context in background */}
      <div className="absolute left-4 bottom-4 font-display text-[12vw] text-white/[0.01] select-none uppercase tracking-tighter leading-none pointer-events-none">
        05 // GALLERIA
      </div>

      <Container>
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 mb-12 border-b border-white/5 pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs">
              VISUAL CAPTURES
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-tight">
              FEATURED <span className="text-kh-pink">PHOTOS</span>
            </h2>
          </div>

          <Link
            to="/gallery"
            className="group flex items-center gap-3 font-condensed font-black text-xs tracking-[0.2em] text-white/60 hover:text-kh-pink transition-colors uppercase pb-1"
          >
            VIEW ALL IMAGES
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-kh-pink group-hover:bg-kh-pink/10 transition-all duration-300">
              <ChevronRight className="w-3.5 h-3.5 text-white/60 group-hover:text-kh-pink transition-colors transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        {/* Dynamic Bento Style Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:auto-rows-[180px] lg:auto-rows-[220px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`relative rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-white/[0.02] hover:border-kh-pink/40 transition-all duration-500 shadow-xl shadow-black/20 ${photo.gridClass}`}
            >
              {/* Image Container with deep cinematic zoom */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 will-change-transform"
                />
              </div>

              {/* Sophisticated dual-stage vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Hover content: Minimalist context tag and view icon */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/80">
                    <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-condensed font-bold tracking-widest text-kh-pink uppercase">
                    CAPSULE_0{photo.id}
                  </span>
                  <p className="font-sans font-medium text-xs text-white uppercase tracking-wider">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
