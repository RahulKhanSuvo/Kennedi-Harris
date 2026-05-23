import { Play, ArrowRight } from "lucide-react";
import mainHighlightImg from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";

export function MainHighlight() {
  return (
    <div className="group relative border border-white/10 rounded-md overflow-hidden  flex flex-col cursor-pointer hover:border-kh-pink/50 transition-colors duration-300">
      {/* Image Container */}
      <div className="relative max-h-96 overflow-hidden">
        <img
          src={mainHighlightImg}
          alt="Official Highlight Reel"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:bg-kh-pink/90 group-hover:border-kh-pink transition-all duration-300 transform group-hover:scale-110">
            <Play
              fill="white"
              className="w-8 h-8 md:w-10 md:h-10 ml-1 text-white"
            />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 text-xs font-sans text-white rounded border border-white/20">
          5:32
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex justify-between items-end">
        <div>
          <h3 className="font-condensed text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
            OFFICIAL HIGHLIGHT REEL 2024-2025
          </h3>
          <p className="text-gray-400 text-sm mt-1">Season Highlights</p>
        </div>
        <ArrowRight className="w-6 h-6 text-kh-pink transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
}
