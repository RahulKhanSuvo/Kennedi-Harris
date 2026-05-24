"use client";

import { motion, type Variants } from "motion/react";
import gal1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import gal2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";

const kineticSpring = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: kineticSpring },
  },
};

const imageArray = [
  { src: gal1, alt: "In-game baseline drive" },
  { src: gal2, alt: "Defensive closeout block" },
  { src: gal1, alt: "Mid-range pull up jumper" },
  { src: gal1, alt: "Fastbreak transition attack" },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-kh-dark border-t border-white/10 relative overflow-hidden"
    >
      {/* 
        Tailwind Global Style Injection Core
        Injects a clean hardware-accelerated horizontal translation utility directly.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-12 items-stretch">
          {/* Left Side: Photo Gallery Deck */}
          <div className="w-full xl:w-[46%] flex flex-col justify-between">
            <div className="flex justify-between items-end mb-8">
              <div className="flex items-center gap-4">
                <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                  PHOTO GALLERY
                </h3>
                <div className="h-px w-8 bg-kh-pink"></div>
              </div>
              <a
                href="#"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-white transition-colors uppercase border-b border-kh-blue/30 pb-0.5"
              >
                VIEW GALLERY
              </a>
            </div>

            {/* Configured to trigger animation engine exactly at 30% section view threshold */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {imageArray.map((img, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  className="aspect-square bg-neutral-900 rounded-sm border border-white/5 overflow-hidden cursor-pointer group relative"
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 will-change-transform"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML =
                        '<div class="absolute inset-0 flex items-center justify-center text-[10px] font-condensed tracking-widest text-zinc-600">// MEDIA</div>';
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Structural Row/Col Divider */}
          <div className="hidden xl:block w-px bg-white/10 self-stretch my-2"></div>
          <div className="block xl:hidden h-px w-full bg-white/10"></div>

          {/* Right Side: Brand Partner Matrix */}
          <div className="w-full xl:w-[54%] flex flex-col justify-between xl:pl-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                    BRAND OPPORTUNITIES
                  </h3>
                  <div className="h-px w-8 bg-kh-pink"></div>
                </div>
                <a
                  href="#"
                  className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-white transition-colors uppercase border-b border-kh-blue/30 pb-0.5"
                >
                  LEARN MORE
                </a>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans max-w-2xl mb-8 font-light">
                Kennedi partners with brands that align with youth sports,
                wellness, elite performance, academic development, and local
                community impact. Let's construct scalable, authentic narratives
                together.
              </p>
            </div>

            {/* 
              Marquee Mask Container Box
              Uses CSS masks to softly fade out logo edges on either side seamlessly.
            */}
            <div className="w-full overflow-hidden border-t border-white/5 pt-8 relative [mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%)]">
              <div className="animate-marquee-infinite gap-16 items-center pr-16 select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
                {/* Track Group A */}
                <div className="flex items-center gap-16 shrink-0">
                  <div className="w-16 h-8 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full fill-white"
                    >
                      <path d="M21 6.5c-1.5 1.7-4.5 3.3-8.5 4.5-3.5 1-6.5 1.2-8.5.5-1-.3-1.5-.8-1.5-1.5 0-1.2 1.5-3 4-4.5.5-.3 1-.3.8.3-.3 1.2.2 2.5 1.5 3.5 1.8 1.2 4.5 1.5 7.5.5 3-1 5.5-2.5 6.5-4 .3-.5.7-.2.2.7z" />
                    </svg>
                  </div>
                  <div className="font-display text-3xl font-black italic text-white leading-none">
                    G<span className="text-kh-pink text-xl -ml-0.5">⚡</span>
                  </div>
                  <div className="font-condensed font-bold text-white text-base tracking-wider italic whitespace-nowrap">
                    THE STINGER
                  </div>
                  <div className="font-condensed font-bold text-white text-lg tracking-widest italic whitespace-nowrap">
                    BOUNCEWEAR
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-display font-black tracking-tighter text-xl flex items-center leading-none">
                      <span className="text-kh-pink">BODY</span>
                      <span className="text-white">ARMOR</span>
                    </div>
                    <span className="text-[7px] text-zinc-400 tracking-widest uppercase mt-0.5 font-condensed">
                      SPORTS DRINK
                    </span>
                  </div>
                </div>

                {/* Duplicate Track Group B (Enables Seamless Loop Assembly) */}
                <div
                  className="flex items-center gap-16 shrink-0"
                  aria-hidden="true"
                >
                  <div className="w-16 h-8 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full fill-white"
                    >
                      <path d="M21 6.5c-1.5 1.7-4.5 3.3-8.5 4.5-3.5 1-6.5 1.2-8.5.5-1-.3-1.5-.8-1.5-1.5 0-1.2 1.5-3 4-4.5.5-.3 1-.3.8.3-.3 1.2.2 2.5 1.5 3.5 1.8 1.2 4.5 1.5 7.5.5 3-1 5.5-2.5 6.5-4 .3-.5.7-.2.2.7z" />
                    </svg>
                  </div>
                  <div className="font-display text-3xl font-black italic text-white leading-none">
                    G<span className="text-kh-pink text-xl -ml-0.5">⚡</span>
                  </div>
                  <div className="font-condensed font-bold text-white text-base tracking-wider italic whitespace-nowrap">
                    THE STINGER
                  </div>
                  <div className="font-condensed font-bold text-white text-lg tracking-widest italic whitespace-nowrap">
                    BOUNCEWEAR
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-display font-black tracking-tighter text-xl flex items-center leading-none">
                      <span className="text-kh-pink">BODY</span>
                      <span className="text-white">ARMOR</span>
                    </div>
                    <span className="text-[7px] text-zinc-400 tracking-widest uppercase mt-0.5 font-condensed">
                      SPORTS DRINK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
