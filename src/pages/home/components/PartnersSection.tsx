export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="py-16 bg-kh-dark-2 border-t border-white/5"
    >
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
                BRAND PARTNER OPPORTUNITIES
              </h3>
              <a
                href="#"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase lg:hidden"
              >
                LEARN MORE
              </a>
            </div>

            <p className="text-kh-gray text-sm leading-relaxed font-sans max-w-lg">
              Kennedi partners with brands that align with youth sports,
              wellness, performance, education, and community impact. Let's
              build something meaningful together.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-end">
            <div className="hidden lg:flex justify-end mb-6">
              <a
                href="#"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase"
              >
                LEARN MORE
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {/* Nike Text Logo Placeholder */}
              <div className="text-2xl font-bold italic tracking-tighter text-white">
                NIKE
              </div>
              {/* Gatorade Text Logo Placeholder */}
              <div className="text-xl font-black italic text-white flex items-center">
                G<span className="text-orange-500 text-sm ml-1">⚡</span>
              </div>
              {/* The Stinger */}
              <div className="font-serif font-bold text-white text-lg italic">
                THE STINGER
              </div>
              {/* Bouncewear */}
              <div className="font-condensed font-bold text-white text-xl tracking-wider">
                BOUNCEWEAR
              </div>
              {/* BodyArmor */}
              <div className="flex flex-col items-center">
                <span className="font-black text-red-600 tracking-tighter text-lg leading-none">
                  BODYARMOR
                </span>
                <span className="text-[6px] text-white tracking-widest uppercase">
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
