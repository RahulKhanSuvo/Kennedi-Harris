import gal1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal2 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal4 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import { MdOutlineInsertPhoto } from "react-icons/md";

export function BeyondTheGame() {
  const images = [gal1, gal2, gal3, gal4];

  return (
    <section className="p-8">
      <div className="mb-6">
        <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-lg block ">
          Beyond The Game
        </span>
      </div>

      <div className="w-full grid grid-cols-2 gap-8 md:grid-cols-4 h-48 md:h-64 lg:h-80 overflow-hidden">
        {images.map((src, index) => (
          <div key={index} className="w-full h-full overflow-hidden border-2">
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover gallery-img"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center w-full justify-center pt-8 ">
        <button className="border-kh-pink cursor-pointer text-kh-pink text-lg px-6 py-2 border flex items-center justify-center gap-1.5">
          VIEW FULL GALLERY{" "}
          <div>
            <MdOutlineInsertPhoto size={30} className="text-3xl" />
          </div>
        </button>
      </div>
    </section>
  );
}
