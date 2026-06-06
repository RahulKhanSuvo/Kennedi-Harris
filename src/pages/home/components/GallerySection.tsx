"use client";

import { motion, type Variants } from "motion/react";
import { Link } from "react-router";
import { useActiveGallery } from "@/hooks/useGallery";
import { GraduationCap, Award, Compass, ArrowUpRight } from "lucide-react";

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

function GallerySkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="aspect-square bg-neutral-900 rounded-sm border border-white/5 relative overflow-hidden animate-pulse"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-700 uppercase">
              LOADING
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default function GallerySection() {
  const { data, isLoading } = useActiveGallery();

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-black border-t border-white/10 relative overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
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
              <Link
                to="/gallery"
                className="font-condensed font-bold text-xs tracking-widest text-kh-blue hover:text-white transition-colors uppercase border-b border-kh-blue/30 pb-0.5"
              >
                VIEW GALLERY
              </Link>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {isLoading ? (
                <GallerySkeleton />
              ) : (
                data?.photos?.slice(0, 4).map((img, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUpVariants}
                    className="aspect-square bg-neutral-900 rounded-sm border border-white/5 overflow-hidden group relative"
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML =
                          '<div class="absolute inset-0 flex items-center justify-center text-[10px] font-condensed tracking-widest text-zinc-600">// MEDIA</div>';
                      }}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

          {/* Structural Row/Col Divider */}
          <div className="hidden xl:block w-px bg-white/10 self-stretch my-2"></div>
          <div className="block xl:hidden h-px w-full bg-white/10"></div>

          {/* Right Side: Professional Core Pillars & Roadmap */}
          <div className="w-full xl:w-[54%] flex flex-col justify-between xl:pl-6 text-left">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-condensed font-semibold text-xl tracking-widest text-white uppercase">
                    IDENTITY & PILLARS
                  </h3>
                  <div className="h-px w-8 bg-kh-blue"></div>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                  DNA // PROFILE
                </span>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans max-w-2xl mb-6 font-light">
                An elite standard built on rigorous discipline. Beyond athletic
                architecture, execution is driven by academic distinction,
                community alignment, and dedicated leadership.
              </p>
            </div>

            {/* Premium Vertical Timeline Architecture */}
            <div className="flex flex-col gap-4 w-full relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
              {/* Pillar 1: Academic Rigor */}
              <div className="bg-neutral-900/20 border border-white/5 hover:border-kh-pink/20 p-4 rounded-xl flex gap-5 items-start group transition-all duration-300">
                <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-kh-pink shrink-0 z-10 group-hover:bg-black transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-1 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      ACADEMIC EXCELLENCE
                    </h4>
                    <span className="font-mono text-[10px] text-kh-pink font-semibold tracking-wider">
                      3.8+ GPA EXPECTED
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed">
                    Prioritizing conceptual development and structural
                    discipline off the floor to balance collegiate athletic
                    high-volumes.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Leadership Culture */}
              <div className="bg-neutral-900/20 border border-white/5 hover:border-kh-blue/20 p-4 rounded-xl flex gap-5 items-start group transition-all duration-300">
                <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-kh-blue shrink-0 z-10 group-hover:bg-black transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-1 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      VANGUARD LEADERSHIP
                    </h4>
                    <span className="font-mono text-[10px] text-kh-blue font-semibold tracking-wider">
                      TEAM CAPTAIN
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed">
                    Fostering an intentional team culture, defensive
                    communication systems, and persistent accountability under
                    stress environments.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Purpose & Blueprint */}
              <div className="bg-neutral-900/20 border border-white/5 hover:border-kh-pink/20 p-4 rounded-xl flex gap-5 items-start group transition-all duration-300">
                <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-kh-pink shrink-0 z-10 group-hover:bg-black transition-colors">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-1 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      COMMUNITY IMPACT
                    </h4>
                    <span className="font-mono text-[10px] text-kh-pink font-semibold tracking-wider">
                      ADVOCACY
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed">
                    Utilizing athletic platforms to activate localized
                    development, youth mentorship clinics, and positive
                    systematic outreach.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Strategic Anchor Block */}
            <div className="mt-8 pt-4 border-t border-dashed border-white/10 flex items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-kh-blue rounded-full animate-pulse" />
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                  CHARACTER PORTFOLIO COMPLETE
                </span>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-condensed font-bold text-xs tracking-widest text-white hover:text-kh-blue transition-colors uppercase"
              >
                <span>FULL ADVANCED BIO</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-kh-blue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
