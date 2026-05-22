import gal1 from "../../../assets/gal-1.png";
import gal2 from "../../../assets/gal-2.png";
import gal3 from "../../../assets/gal-3.png";
import gal4 from "../../../assets/gal-4.png";

export function BeyondTheGame() {
  const images = [gal1, gal2, gal3, gal4];

  return (
    <section className="bg-kh-dark pb-20">
      <div className="container mx-auto px-6 mb-6">
        <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm block">
          Beyond The Game
        </span>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 h-48 md:h-64 lg:h-80 overflow-hidden">
        {images.map((src, index) => (
          <div key={index} className="w-full h-full overflow-hidden">
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover gallery-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
