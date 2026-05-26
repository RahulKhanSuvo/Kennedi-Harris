import { Link } from "react-router";
import { ChevronRight, Maximize2, Camera } from "lucide-react";
import img1 from "@/assets/gallery/drib2.avif";
import img2 from "@/assets/gallery/dribliing.avif";
import img3 from "@/assets/gallery/working.avif";
import img4 from "@/assets/gallery/jumping4.avif";
import Container from "@/components/common/Container";
import MediaLightboxModal from "@/components/common/MediaLightboxModal";
import { useState } from "react";
interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  gridClass: string;
}
const photos: PhotoItem[] = [
  {
    id: 1,
    src: img1,
    alt: "On-court action",
    // Monster Anchor Tile
    gridClass:
      "col-span-2 md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-auto",
  },
  {
    id: 2,
    src: img2,
    alt: "Player portrait",
    // Tall asymmetric cut
    gridClass: "col-span-1 md:row-span-2 min-h-[240px] md:min-h-auto",
  },
  {
    id: 3,
    src: img3,
    alt: "Jersey detail",
    gridClass: "col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    id: 4,
    src: img4,
    alt: "In-game defense",
    gridClass: "col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
];
export default function FeaturedPhotos() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    setSelectedPhoto(photos[(currentIndex + 1) % photos.length]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    setSelectedPhoto(
      photos[(currentIndex - 1 + photos.length) % photos.length],
    );
  };
  return (
    <section className="py-24 bg-kh-dark border-t border-white/5 relative overflow-hidden">
      {/* Heavy Cyber Atmosphere Watermarks */}
      <div className="absolute right-[-5%] top-1/4 font-display text-[15vw] text-white/1 select-none font-black uppercase tracking-tighter leading-none pointer-events-none transform -rotate-90 origin-right">
        RAW_CAPTURES
      </div>
      <div className="absolute left-6 bottom-6 font-mono text-xs text-white/5 tracking-[0.4em] select-none uppercase pointer-events-none hidden md:block">
        [SYS_INDEX // 005_GALLERIA]
      </div>

      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8 relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-kh-pink rounded-full animate-pulse" />
              <span className="text-kh-pink font-condensed tracking-[0.3em] uppercase font-bold text-xs">
                VISUAL MATRICES
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight font-black">
              FEATURED{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-kh-pink to-pink-500">
                PHOTOS
              </span>
            </h2>
          </div>

          <Link
            to="/gallery"
            className="group inline-flex items-center gap-4 font-condensed font-black text-xs tracking-[0.25em] text-zinc-400 hover:text-white transition-colors uppercase self-start sm:self-auto"
          >
            LAUNCH ARCHIVE
            <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center bg-neutral-950/40 group-hover:border-kh-pink/50 group-hover:bg-kh-pink/10 group-hover:rotate-45 transition-all duration-500 ease-out">
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-kh-pink transition-colors transform group-hover:-rotate-45" />
            </div>
          </Link>
        </div>

        {/* Funky High-Density Bento Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[210px] xl:auto-rows-[240px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-neutral-900/40 transition-all duration-500 hover:border-kh-pink/40 shadow-2xl hover:shadow-kh-pink/5 ${photo.gridClass}`}
            >
              {/* Image Engine with specialized responsive object placement */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 will-change-transform"
                />
              </div>

              {/* Dynamic Industrial Tint Layer */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

              {/* Subtle Linear Neon Accent Mask */}
              <div className="absolute inset-0 bg-linear-to-tr from-kh-pink/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Technical Blueprint Elements - Static Layout Decors */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/20 tracking-wider group-hover:text-kh-pink/60 transition-colors duration-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5">
                // 0{photo.id}
              </div>

              {/* Advanced Cyber UI Hover Overlays */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                {/* Upper Section: Diagonal action triggers */}
                <div className="flex justify-end transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div
                    onClick={() => setSelectedPhoto(photo)}
                    className="w-9 h-9 rounded-xl bg-neutral-900/90 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-kh-pink hover:border-kh-pink transition-all duration-300 shadow-lg"
                  >
                    <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Lower Section: Data Block */}
                <div className="transform translate-y-3 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-lg mb-2 transform -skew-x-12 origin-left">
                    <Camera size={10} className="text-kh-pink skew-x-12" />
                    <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-300 uppercase skew-x-12">
                      FRAME_CAP_{photo.id}
                    </span>
                  </div>

                  <p className="font-display font-bold text-sm md:text-base text-white uppercase tracking-wide drop-shadow-md">
                    {photo.alt}
                  </p>
                </div>
              </div>

              {/* Interactive Corner Tech Trim Markers */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-r-10 border-b-10 border-r-transparent border-b-transparent group-hover:border-r-kh-pink group-hover:border-b-kh-pink transition-all duration-300 z-20" />
              <div className="absolute top-0 right-0 w-8 h-px bg-cyan-400/0 group-hover:bg-cyan-400/50 transition-all duration-500 z-20" />
            </div>
          ))}
        </div>
      </Container>
      <MediaLightboxModal
        isOpen={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
        activeItem={selectedPhoto}
        onNext={handleNext}
        onPrev={handlePrev}
        systemIndex="GALLERIA_CORE_SYS"
      />
    </section>
  );
}
