import gal1 from "@/assets/gal-1.png";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-kh-dark">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-8">
          <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
            PHOTO GALLERY
          </h3>
          <a
            href="#"
            className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
          >
            VIEW GALLERY
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-4/5 bg-kh-dark-2 rounded overflow-hidden border border-white/5 cursor-pointer">
            <img
              src={gal1}
              alt="Gallery 1"
              className="w-full h-full object-cover gallery-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div className="aspect-4/5 bg-kh-dark-2 rounded overflow-hidden border border-white/5 cursor-pointer">
            <img
              src={gal1}
              alt="Gallery 2"
              className="w-full h-full object-cover gallery-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div className="aspect-4/5 bg-kh-dark-2 rounded overflow-hidden border border-white/5 cursor-pointer">
            <img
              src={gal1}
              alt="Gallery 3"
              className="w-full h-full object-cover gallery-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div className="aspect-4/5 bg-kh-dark-2 rounded overflow-hidden border border-white/5 cursor-pointer">
            <img
              src={gal1}
              alt="Gallery 4"
              className="w-full h-full object-cover gallery-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
