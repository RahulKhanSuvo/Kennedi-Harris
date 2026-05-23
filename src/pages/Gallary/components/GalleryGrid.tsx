import { useState } from "react";
import { ImageIcon, Film, Trophy, Flame, Eye } from "lucide-react";
import Container from "@/components/common/Container";

// Types for our gallery items
interface GalleryItem {
  id: number;
  title: string;
  category: "all" | "photoshoot" | "highlights" | "training";
  tag: string;
  aspectRatio: string; // Tailored for editorial masonry rhythm
  imagePlaceholder: string;
}

const CATEGORIES = [
  { id: "all", label: "ALL MEDIA", icon: ImageIcon },
  { id: "photoshoot", label: "PHOTOSHOOTS", icon: Flame },
  { id: "highlights", label: "GAME HIGHLIGHTS", icon: Trophy },
  { id: "training", label: "TRAINING SESSIONS", icon: Film },
] as const;

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    title: "Official Season Media Day",
    category: "photoshoot",
    tag: "Studio",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ MEDIA_DAY_PORTRAIT ]",
  },
  {
    id: 2,
    title: "Clutch Three-Pointer vs. Rival Team",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-video",
    imagePlaceholder: "[ GAME_ACTION_WIDE ]",
  },
  {
    id: 3,
    title: "Late Night Ball Handling Drill",
    category: "training",
    tag: "The Grind",
    aspectRatio: "aspect-square",
    imagePlaceholder: "[ DRILL_SESSION_SQUARE ]",
  },
  {
    id: 4,
    title: "Fast Break Finish & Transition",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ FAST_BREAK_PORTRAIT ]",
  },
  {
    id: 5,
    title: "Aggressive Defensive Stance Showcase",
    category: "photoshoot",
    tag: "Studio",
    aspectRatio: "aspect-square",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
  },
  {
    id: 6,
    title: "Weighted Vest Explosion Vertical Jumps",
    category: "training",
    tag: "Conditioning",
    aspectRatio: "aspect-video",
    imagePlaceholder: "[ VERT_TRAINING_WIDE ]",
  },
];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryItem["category"]>("all");

  // Filtering the dataset reactively based on UI state selection
  const filteredItems = GALLERY_DATA.filter(
    (item) => activeCategory === "all" || item.category === activeCategory,
  );

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
                className={`flex items-center gap-2.5 px-5 py-3 rounded-lg font-condensed font-bold text-xs tracking-widest uppercase border transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-kh-pink border-kh-pink text-white shadow-[0_4px_20px_rgba(236,72,153,0.25)]"
                    : "bg-[#111115] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                }`}
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

        {/* GALLERY GRID — Dynamic Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`relative break-inside-avoid w-full ${item.aspectRatio} bg-[#111115] border border-white/10 rounded-xl overflow-hidden group shadow-lg cursor-pointer transition-all duration-500 hover:border-white/20`}
            >
              {/* Image Canvas Container */}
              <div className="w-full h-full bg-[#16161c] flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase transition-transform duration-700 group-hover:scale-105">
                {/* Once images are ready, map them like this: */}
                {/* <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" /> */}
                {item.imagePlaceholder}
              </div>

              {/* Premium Dark Gradient & Interactive Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 z-10" />

              {/* Hover Interactive Content Layout */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                {/* Top Row: Meta Badge Tag */}
                <div className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-condensed text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Row: Title and View Icon */}
                <div className="flex items-end justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="max-w-[80%]">
                    <p className="font-condensed font-bold text-lg sm:text-xl text-white uppercase tracking-wide leading-tight line-clamp-2">
                      {item.title}
                    </p>
                  </div>

                  {/* Glassmorphic View Trigger button circle */}
                  <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <Eye size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Feedback when no filters match */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-[#111115]">
            <p className="font-condensed font-bold text-gray-500 tracking-wider uppercase text-sm">
              No media found in this collection category.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
