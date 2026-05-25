import { useState } from "react";
import { ImageIcon, Film, Trophy, Flame } from "lucide-react";
import Container from "@/components/common/Container";
import image1 from "@/assets/gallery/af5d1be2-879a-4fe8-9b30-1573fdab0236.jpeg";
import image2 from "@/assets/gallery/a84e107a-2998-4ccc-bd2b-f19d6190ba07.jpeg";
import image3 from "@/assets/gallery/a7286e71-4987-4e08-a51c-dd0ca0b09558.jpeg";
import image4 from "@/assets/gallery/934a20cc-5406-4916-8cf6-5bc1b61c7eb9.jpeg";
import image5 from "@/assets/gallery/79dfa626-ee91-46e1-baaa-6512749032da.jpeg";
import image6 from "@/assets/gallery/1eacf89b-2aff-430c-8936-4008aad10692.jpeg";
import image7 from "@/assets/gallery/af5d1be2-879a-4fe8-9b30-1573fdab0236.jpeg";
import image8 from "@/assets/gallery/a84e107a-2998-4ccc-bd2b-f19d6190ba07.jpeg";
import image9 from "@/assets/gallery/a7286e71-4987-4e08-a51c-dd0ca0b09558.jpeg";
import image10 from "@/assets/gallery/934a20cc-5406-4916-8cf6-5bc1b61c7eb9.jpeg";
import image11 from "@/assets/gallery/79dfa626-ee91-46e1-baaa-6512749032da.jpeg";
import image12 from "@/assets/gallery/1eacf89b-2aff-430c-8936-4008aad10692.jpeg";

// Types for our gallery items
interface GalleryItem {
  id: number;
  title: string;
  category: "all" | "photoshoot" | "highlights" | "training";
  tag: string;
  aspectRatio: string; // Tailored for editorial masonry rhythm
  imagePlaceholder: string;
  imageSrc: string;
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
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image1,
  },
  {
    id: 2,
    title: "Clutch Three-Pointer vs. Rival Team",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image2,
  },
  {
    id: 3,
    title: "Late Night Ball Handling Drill",
    category: "training",
    tag: "The Grind",
    aspectRatio: "aspect-square",
    imagePlaceholder: "[ DRILL_SESSION_SQUARE ]",
    imageSrc: image3,
  },
  {
    id: 4,
    title: "Fast Break Finish & Transition",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ FAST_BREAK_PORTRAIT ]",
    imageSrc: image4,
  },
  {
    id: 5,
    title: "Aggressive Defensive Stance Showcase",
    category: "photoshoot",
    tag: "Studio",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image5,
  },
  {
    id: 6,
    title: "Weighted Vest Explosion Vertical Jumps",
    category: "training",
    tag: "Conditioning",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ VERT_TRAINING_WIDE ]",
    imageSrc: image6,
  },
  {
    id: 7,
    title: "Official Season Media Day",
    category: "photoshoot",
    tag: "Studio",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image7,
  },
  {
    id: 8,
    title: "Clutch Three-Pointer vs. Rival Team",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image8,
  },
  {
    id: 9,
    title: "Late Night Ball Handling Drill",
    category: "training",
    tag: "The Grind",
    aspectRatio: "aspect-square",
    imagePlaceholder: "[ DRILL_SESSION_SQUARE ]",
    imageSrc: image9,
  },
  {
    id: 10,
    title: "Fast Break Finish & Transition",
    category: "highlights",
    tag: "In-Game",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ FAST_BREAK_PORTRAIT ]",
    imageSrc: image10,
  },
  {
    id: 11,
    title: "Aggressive Defensive Stance Showcase",
    category: "photoshoot",
    tag: "Studio",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ DEFENSE_STUDIO_SQUARE ]",
    imageSrc: image11,
  },
  {
    id: 12,
    title: "Weighted Vest Explosion Vertical Jumps",
    category: "training",
    tag: "Conditioning",
    aspectRatio: "aspect-[4/5]",
    imagePlaceholder: "[ VERT_TRAINING_WIDE ]",
    imageSrc: image12,
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`relative break-inside-avoid w-full ${item.aspectRatio} bg-[#111115] border border-white/10 rounded-xl overflow-hidden group shadow-lg transition-all duration-500 hover:border-white/20`}
            >
              {/* Image Canvas Container */}
              <div className="w-full h-full bg-[#16161c] relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                {/* Fallback Text Asset: Sits behind image, visible only if image fails to resolve */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-condensed text-xs tracking-widest uppercase pointer-events-none px-4 text-center">
                  {item.imagePlaceholder}
                </div>

                {/* Media Image Layer */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              </div>

              {/* Premium Dark Gradient & Interactive Text Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 z-10" />

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
                  {/* <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <Eye size={16} />
                  </div> */}
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
