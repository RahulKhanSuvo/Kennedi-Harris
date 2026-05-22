import { Play, ArrowRight } from "lucide-react";
import img1 from "../../../assets/highlight-1.png";
import img2 from "../../../assets/highlight-2.png";
import img3 from "../../../assets/highlight-3.png";
import img4 from "../../../assets/hero-player.png"; // Reusing as 4th thumb

const HIGHLIGHTS = [
  {
    id: 1,
    title: "vs. Team Elite",
    subtitle: "Atlanta, GA",
    duration: "3:45",
    img: img1,
  },
  {
    id: 2,
    title: "AAU Championship Highlights",
    subtitle: "",
    duration: "4:12",
    img: img2,
  },
  {
    id: 3,
    title: "Shot Blocking Highlights",
    subtitle: "",
    duration: "2:58",
    img: img3,
  },
  {
    id: 4,
    title: "Full Game vs. Georgia Stars",
    subtitle: "",
    duration: "16:24",
    img: img4,
  },
];

export function FeaturedHighlights() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="font-condensed text-xl font-bold text-white uppercase tracking-wider mb-6">
        FEATURED HIGHLIGHTS
      </h3>

      <div className="flex flex-col gap-4 flex-grow">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 p-2 rounded-md hover:bg-white/5 transition-colors duration-200 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-16 md:w-32 md:h-20 shrink-0 rounded overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center bg-black/40 group-hover:bg-kh-pink group-hover:border-kh-pink transition-colors">
                  <Play fill="white" className="w-4 h-4 ml-0.5 text-white" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-grow min-w-0">
              <h4 className="font-sans text-sm md:text-base font-medium text-white truncate">
                {item.title}
              </h4>
              {item.subtitle && (
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="text-xs text-gray-400 font-sans shrink-0">
              {item.duration}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 btn-outline justify-center border-kh-pink text-kh-pink hover:text-white group">
        VIEW ALL HIGHLIGHTS
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
