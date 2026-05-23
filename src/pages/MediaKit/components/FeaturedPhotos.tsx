import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import img1 from "../../../assets/gal-1.png";
import img2 from "../../../assets/gal-2.png";
import img3 from "../../../assets/stats-player.png";
import img4 from "../../../assets/gal-3.png";
import img5 from "../../../assets/gal-4.png";

export default function FeaturedPhotos() {
  const photos = [
    { id: 1, src: img1, alt: "On-court action" },
    { id: 2, src: img2, alt: "Player portrait" },
    { id: 3, src: img3, alt: "Jersey detail" },
    { id: 4, src: img4, alt: "In-game defense" },
    { id: 5, src: img5, alt: "Game focus" },
  ];

  return (
    <section className="py-16 bg-kh-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <h2 className="font-condensed font-black text-xl md:text-2xl text-white uppercase tracking-wider">
            FEATURED PHOTOS
          </h2>
          <Link
            to="/gallery"
            className="group flex items-center gap-1 font-condensed font-bold text-xs tracking-widest text-kh-pink hover:text-white transition-colors"
          >
            VIEW ALL PHOTOS
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-3/4 rounded-md overflow-hidden group cursor-pointer border border-white/5 hover:border-kh-pink/40 transition-colors duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
