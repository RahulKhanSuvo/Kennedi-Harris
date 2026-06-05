import { useState } from "react";
import { ImageIcon, Film, Trophy, Flame } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import Container from "@/components/common/Container";
import MediaLightboxModal from "@/components/common/MediaLightboxModal";
import type { GalleryPhoto } from "@/types";

const CATEGORIES = [
  { id: "all", label: "ALL MEDIA", icon: ImageIcon },
  { id: "photoshoot", label: "PHOTOSHOOTS", icon: Flame },
  { id: "highlights", label: "GAME HIGHLIGHTS", icon: Trophy },
  { id: "training", label: "TRAINING SESSIONS", icon: Film },
] as const;

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: kineticSpring,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export function GalleryGrid({
  data,
  isLoading,
}: {
  data: GalleryPhoto[];
  isLoading: boolean;
}) {
  const [activeCategory, setActiveCategory] =
    useState<GalleryPhoto["type"]>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filteredItems = data.filter(
    (item) => activeCategory === "all" || item.type === activeCategory,
  );

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex(
      (p) => p._id === selectedPhoto._id,
    );
    setSelectedPhoto(filteredItems[(currentIndex + 1) % filteredItems.length]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex(
      (p) => p._id === selectedPhoto._id,
    );
    setSelectedPhoto(
      filteredItems[
        (currentIndex - 1 + filteredItems.length) % filteredItems.length
      ],
    );
  };

  return (
    <section id="gallery-grid" className="py-20 bg-[#09090b] relative">
      <Container>
        {/* INTERACTIVE CONTROLS — Horizontal Filter Track */}
        <div className="flex flex-wrap items-center justify-start gap-3 border-b border-white/5 pb-8 mb-12 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                disabled={isLoading}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-lg font-condensed font-bold text-xs tracking-widest uppercase border transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-kh-pink border-kh-pink text-white shadow-[0_4px_20px_rgba(236,72,153,0.25)]"
                    : "bg-[#111115] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-white" : "text-gray-500"}
                />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* GALLERY GRID — Standard multi-column shell */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? /* Precision Frame Skeleton Loader Grid */
                Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className={`break-inside-avoid w-full ${idx % 2 !== 0 ? "aspect-4/5" : "aspect-5/6"} bg-[#111115] border border-white/5 rounded-xl overflow-hidden relative shadow-lg`}
                  >
                    <div className="w-full h-full bg-white/5 animate-pulse" />
                  </div>
                ))
              : filteredItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    layout="position"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.3 }}
                    onClick={() => setSelectedPhoto(item)}
                    className={`relative break-inside-avoid w-full ${idx % 2 !== 0 ? "aspect-4/5" : "aspect-5/6"} bg-[#111115] border border-white/10 rounded-xl overflow-hidden group shadow-lg transition-colors duration-500 hover:border-white/20 cursor-pointer will-change-transform`}
                  >
                    {/* Image Canvas Container */}
                    <div className="w-full h-full bg-[#16161c] relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase pointer-events-none px-4 text-center">
                        {item.name}
                      </div>

                      <img
                        src={item.url}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                    </div>

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 z-10" />

                    {/* Hover Interactive Text Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                      {/* Top Row: Meta Badge Tag */}
                      <div className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-condensed text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                          {item.type}
                        </span>
                      </div>

                      {/* Bottom Row: Title */}
                      <div className="flex items-end justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="max-w-[80%]">
                          <p className="font-condensed font-bold text-lg sm:text-xl text-white uppercase tracking-wide leading-tight line-clamp-2">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* Empty State Feedback when no filters match */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-[#111115]"
          >
            <p className="font-condensed font-bold text-gray-500 tracking-wider uppercase text-sm">
              No media found in this collection category.
            </p>
          </motion.div>
        )}
      </Container>

      <MediaLightboxModal
        isOpen={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
        activeItem={
          selectedPhoto
            ? {
                _id: selectedPhoto._id,
                url: selectedPhoto.url,
                name: selectedPhoto.name,
                type: selectedPhoto.type,
              }
            : null
        }
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
