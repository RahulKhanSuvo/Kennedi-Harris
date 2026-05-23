import { Play } from "lucide-react";
import img1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
// import img4 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
// import img5 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import Container from "@/components/common/Container";

const CATEGORIES = [
  { id: 1, title: "SCORING", count: "28 Videos", img: img1 },
  { id: 2, title: "DEFENSE", count: "24 Videos", img: img2 },
  { id: 3, title: "PLAYMAKING", count: "18 Videos", img: img3 },
  // { id: 4, title: "LEADERSHIP", count: "12 Videos", img: img4 },
  // { id: 5, title: "CLUTCH MOMENTS", count: "15 Videos", img: img5 },
];

export function TopPlayCategories() {
  return (
    <section className="py-8">
      <Container>
        <h3 className="font-condensed text-xl font-bold text-white uppercase tracking-wider mb-6">
          GAME FOOTAGE
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col bg-kh-dark-2 border border-white/5 rounded-md overflow-hidden cursor-pointer hover:border-kh-pink/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center bg-black/40 group-hover:bg-kh-pink group-hover:border-kh-pink transition-all duration-300">
                    <Play fill="white" className="w-4 h-4 ml-0.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wide">
                  {category.title}
                </h4>
                <p className="text-gray-400 text-xs mt-1">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
