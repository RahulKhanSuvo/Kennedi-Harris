import gal1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-kh-dark border-t border-white/5">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          {/* Gallery Side */}
          <div className="w-full xl:w-[45%] flex flex-col justify-between">
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                PHOTO GALLERY
              </h3>
              <a
                href="#"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
              >
                VIEW GALLERY
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-full">
              <div className="aspect-5/5 bg-kh-dark-2 rounded overflow-hidden cursor-pointer group">
                <img
                  src={gal1}
                  alt="Gallery 1"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="aspect-5/5 bg-kh-dark-2 rounded overflow-hidden cursor-pointer group">
                <img
                  src={gal2}
                  alt="Gallery 2"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="aspect-5/5 bg-kh-dark-2 rounded overflow-hidden cursor-pointer group">
                <img
                  src={gal1}
                  alt="Gallery 3"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="aspect-5/5 bg-kh-dark-2 rounded overflow-hidden cursor-pointer group">
                <img
                  src={gal1}
                  alt="Gallery 4"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden xl:block w-px bg-white/10 my-2"></div>
          <div className="block xl:hidden h-px w-full bg-white/10 my-4"></div>

          {/* Partners Side */}
          <div className="w-full xl:w-[55%] flex flex-col justify-between pt-2 xl:pt-0">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                  BRAND PARTNER OPPORTUNITIES
                </h3>
                <a
                  href="#"
                  className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
                >
                  LEARN MORE
                </a>
              </div>

              <p className="text-kh-gray text-sm leading-relaxed font-sans max-w-2xl mb-8">
                Kennedi partners with brands that align with youth sports,
                wellness, performance, education, and community impact. Let's
                build something meaningful together.
              </p>
            </div>

            {/* Logos */}
            <div className="flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-all duration-500 pb-2">
              {/* Nike */}
              <svg viewBox="0 0 24 24" className="w-16 h-8 fill-white">
                <path d="M24 8.2c-.3 1.2-1.3 2.5-2.8 3.5-3.3 2.1-8.5 2.1-13.6-.5C4.2 9.4 1 6.3 1 3.2 1 2.2 1.3 1.2 2 .5c.1-.1.2-.2.3-.2C1 .8-.1 2.4.4 4c.6 1.7 2.2 3.1 4.7 4.1 3.5 1.3 7.8 1.4 11.2.1-1.2.7-2.6 1-4.2.9-3.7-.3-6.6-2.6-6.6-2.6s2.5 2.7 7.7 2.4c3.4-.2 7.1-1.6 9.4-3.5.7-.6 1.2-1.2 1.4-1.8.2-.5.1-.4 0 .6z" />
              </svg>
              {/* Gatorade */}
              <div className="text-4xl font-black italic text-white flex items-center">
                G<span className="text-orange-500 text-2xl -ml-1">⚡</span>
              </div>
              {/* The Stinger */}
              <div className="font-serif font-bold text-white text-xl italic flex items-center">
                <span className="mr-1">🐝</span> THE STINGER
              </div>
              {/* Bouncewear */}
              <div className="font-condensed font-bold text-white text-2xl tracking-wider italic">
                BOUNCEWEAR
              </div>
              {/* BodyArmor */}
              <div className="flex flex-col items-center justify-center">
                <div className="font-black tracking-tighter text-2xl flex items-center leading-none">
                  <span className="text-[#E31837]">BODY</span>
                  <span className="text-white">ARMOR</span>
                </div>
                <span className="text-[8px] text-white tracking-widest uppercase mt-1">
                  Sports Drink
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
