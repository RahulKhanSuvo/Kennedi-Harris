import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Maximize2, Camera } from "lucide-react";
import Container from "@/components/common/Container";
import MediaLightboxModal from "@/components/common/MediaLightboxModal";

// Asset imports
import img1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img4 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img5 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  gridClass: string;
}

export default function FeaturedPhotos() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const photos: PhotoItem[] = [
    {
      id: 1,
      src: img1,
      alt: "On-court action",
      gridClass:
        "col-span-2 md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-auto",
    },
    {
      id: 2,
      src: img2,
      alt: "Player portrait",
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
    {
      id: 5,
      src: img5,
      alt: "Game focus",
      gridClass:
        "col-span-2 md:col-span-2 md:row-span-1 min-h-[160px] md:min-h-auto",
    },
  ];

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
      {/* Decorative Branding */}
      <div className="absolute right-[-5%] top-1/4 font-display text-[15vw] text-white/[0.01] select-none font-black uppercase tracking-tighter leading-none pointer-events-none transform -rotate-90 origin-right">
        RAW_CAPTURES
      </div>

      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8 relative">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight font-black">
              FEATURED{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink to-pink-500">
                PHOTOS
              </span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-4 font-condensed font-black text-xs tracking-[0.25em] text-zinc-400 hover:text-white transition-colors uppercase"
          >
            LAUNCH ARCHIVE
            <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center bg-neutral-950/40 group-hover:border-kh-pink/50 transition-all duration-300">
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-kh-pink" />
            </div>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[210px] xl:auto-rows-[240px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-neutral-900/40 transition-all duration-500 hover:border-kh-pink/40 shadow-2xl ${photo.gridClass}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />

              {/* UI Overlays */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900/90 border border-white/15 flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg mb-2 transform -skew-x-12">
                    <Camera size={10} className="text-kh-pink skew-x-12" />
                    <span className="text-[9px] font-mono font-bold text-zinc-300 skew-x-12">
                      FRAME_CAP_{photo.id}
                    </span>
                  </div>
                  <p className="font-display font-bold text-sm text-white uppercase">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Reusable Modal Injection */}
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
