"use client";

import { useState, useMemo } from "react";
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
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: kineticSpring,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" },
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

  // ⚡ STRATIFY DATA INTO 3 UNIFORM VERTICAL COLUMNS
  const columns = useMemo(() => {
    const col1: GalleryPhoto[] = [];
    const col2: GalleryPhoto[] = [];
    const col3: GalleryPhoto[] = [];

    filteredItems.forEach((item, index) => {
      if (index % 3 === 0) col1.push(item);
      else if (index % 3 === 1) col2.push(item);
      else col3.push(item);
    });

    return [col1, col2, col3];
  }, [filteredItems]);

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

        {/* ⚡ COLUMN-BASED STRUCTURAL LAYOUT ENGINE */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? // Skeleton Screen Layout Loader
                Array.from({ length: 3 }).map((_, colIdx) => (
                  <div
                    key={`col-skeleton-${colIdx}`}
                    className="flex flex-col gap-6 flex-1 w-full"
                  >
                    {Array.from({ length: 2 }).map((_, itemIdx) => (
                      <div
                        key={`item-skeleton-${itemIdx}`}
                        className={`w-full bg-[#111115] border border-white/5 rounded-xl overflow-hidden relative shadow-lg ${
                          colIdx === 1 ? "aspect-3/4" : "aspect-4/5"
                        }`}
                      >
                        <div className="w-full h-full bg-white/5 animate-pulse" />
                      </div>
                    ))}
                  </div>
                ))
              : // Dynamic Columns Loop Map
                columns.map((columnItems, colIdx) => (
                  <div
                    key={`gallery-column-${colIdx}`}
                    className={`flex flex-col gap-6 flex-1 w-full ${
                      colIdx === 1 ? "lg:scale-[1.015]" : ""
                    }`}
                  >
                    {columnItems.map((item) => (
                      <motion.div
                        key={item._id}
                        layout="position"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        onClick={() => setSelectedPhoto(item)}
                        className={`relative w-full bg-[#111115] border border-white/10 rounded-xl overflow-hidden group shadow-lg transition-colors duration-500 hover:border-white/20 cursor-pointer will-change-transform ${
                          colIdx === 1 ? "aspect-3/4" : "aspect-4/5"
                        }`}
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
                          <div className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                            <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-condensed text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                              {item.type}
                            </span>
                          </div>

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
                  </div>
                ))}
          </AnimatePresence>
        </div>

        {/* Empty State Feedback */}
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
