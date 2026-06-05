import { Link } from "react-router";
import { ChevronRight, Maximize2 } from "lucide-react";

import Container from "@/components/common/Container";
import MediaLightboxModal from "@/components/common/MediaLightboxModal";
import { useState } from "react";
import { useActiveGallery } from "@/hooks/useGallery";
import type { GalleryPhoto } from "@/types";

export default function FeaturedPhotos() {
  const { data: gallery } = useActiveGallery();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const handleNext = () => {
    if (!selectedPhoto || !gallery) return;
    const currentIndex = gallery?.photos.findIndex(
      (p) => p._id === selectedPhoto._id,
    );
    setSelectedPhoto(
      gallery?.photos[(currentIndex + 1) % gallery.photos.length],
    );
  };

  const handlePrev = () => {
    if (!selectedPhoto || !gallery) return;
    const currentIndex = gallery?.photos.findIndex(
      (p) => p._id === selectedPhoto._id,
    );
    setSelectedPhoto(
      gallery?.photos[
        (currentIndex - 1 + gallery.photos.length) % gallery.photos.length
      ],
    );
  };

  return (
    <section className="py-16 md:py-24 bg-kh-dark border-t border-white/5 relative overflow-hidden">
      {/* Heavy Cyber Atmosphere Watermarks */}
      <div className="absolute right-[-5%] top-1/4 font-display text-[15vw] text-white/1 select-none font-black uppercase tracking-tighter leading-none pointer-events-none transform -rotate-90 origin-right">
        RAW_CAPTURES
      </div>
      <div className="absolute left-6 bottom-6 font-mono text-xs text-white/5 tracking-[0.4em] select-none uppercase pointer-events-none hidden md:block">
        [SYS_INDEX // 005_GALLERIA]
      </div>

      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-16 border-b border-white/5 pb-8 relative">
          <div className="flex flex-col gap-2">
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

        {/* 
          Flex layout on mobile avoids rigid grid cropping bugs.
          Transforms seamlessly into a premium bento matrix on desktop frames.
        */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:auto-rows-auto">
          {gallery?.photos?.slice(0, 4).map((photo) => (
            <div
              key={photo._id}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative w-full rounded overflow-hidden group cursor-pointer border border-white/5 bg-neutral-900/40 transition-all duration-500 hover:border-kh-pink/40 shadow-2xl hover:shadow-kh-pink/5`}
            >
              {/* Image Engine */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 will-change-transform"
                />
              </div>

              {/* Dynamic Industrial Tint Layer */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85 md:opacity-75 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

              {/* Subtle Linear Neon Accent Mask */}
              <div className="absolute inset-0 bg-linear-to-tr from-kh-pink/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Technical Blueprint Elements */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/40 md:text-white/20 tracking-wider group-hover:text-kh-pink/60 transition-colors duration-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5">
                // 0{photo._id}
              </div>

              {/* Advanced Cyber UI Overlays */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                {/* Upper Section: Diagonal action triggers */}
                <div className="flex justify-end md:transform md:-translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900/90 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-kh-pink hover:border-kh-pink transition-all duration-300 shadow-lg">
                    <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Lower Section: Data Block */}
                <div className="transition-all duration-300">
                  {/* <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-lg mb-2 transform -skew-x-12 origin-left">
                    <Camera size={10} className="text-kh-pink skew-x-12" />
                    <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-300 uppercase skew-x-12">
                      FRAME_CAP_{photo._id}
                    </span>
                  </div> */}

                  <p className="font-display font-bold text-base md:text-lg text-white uppercase tracking-wide drop-shadow-md">
                    {photo.name}
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
