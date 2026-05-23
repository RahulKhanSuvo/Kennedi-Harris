import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/modal/hero.png";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function AboutHeroSection() {
  return (
    <section className="relative min-h-[95vh] bg-[#0a0a0c] flex flex-col justify-center overflow-hidden pt-24 pb-12">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.12] mix-blend-luminosity grayscale">
        <img
          src={backgroundImage}
          alt="Atmospheric Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0c]/60 via-[#0a0a0c] to-[#0a0a0c]"></div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT SIDE (6 Columns) - Strong Balanced Copy Structure */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-4 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-kh-pink inline-block" />
              The Biography
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-[80px] xl:text-[90px] leading-[0.85] text-white uppercase tracking-tight mb-8">
              PURPOSE DRIVES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kh-pink to-white">
                PASSION DEFINES.
              </span>
            </h1>

            <div className="text-gray-300 space-y-5 text-base sm:text-lg leading-relaxed font-sans font-light max-w-xl border-l border-white/10 pl-6">
              <p>
                Kennedi Harris is a Class of 2030 basketball prospect known for
                her rare combination of size, versatility, rebounding, shot
                blocking, and guard-level skill.
              </p>
              <p>
                At 6'4", she impacts the game on both ends of the floor with the
                ability to score, defend, rebound, push the ball, and create
                opportunities for her team.
              </p>
              <p className="text-kh-pink font-medium">
                Her journey is rooted in purpose, discipline, family, and
                legacy. Kennedi plays with a competitive edge and continues to
                develop into one of the most exciting young prospects in girls
                basketball.
              </p>
            </div>

            {/* Scroll Indicator or Next Section Trigger */}
            <div className="mt-10 flex items-center gap-4 text-gray-500 font-condensed tracking-widest text-xs uppercase">
              <span>EXPLORE THE JOURNEY</span>
              <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white animate-bounce">
                <ArrowDown size={14} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (6 Columns) - Massive, Balanced Image Canvas */}
          <div className="lg:col-span-6 w-full h-full min-h-[500px] lg:min-h-[650px] relative mt-8 lg:mt-0">
            {/* Structural Geometric Frame behind the image */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl z-0" />

            {/* Colorful soft backlights mapped strictly inside the graphic frame */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 h-72 rounded-full bg-kh-pink opacity-20 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-72 h-72 rounded-full bg-cyan-500 opacity-15 blur-[90px] pointer-events-none" />

            <div className="absolute inset-4 overflow-hidden rounded-xl bg-[#111115] border border-white/5 shadow-2xl z-10 flex items-end">
              <img
                src={heroImg}
                alt="Kennedi Harris Portrait Showcase"
                className="w-full h-full object-cover object-top filter saturate-[1.05] contrast-[1.02]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-gray-600 font-condensed tracking-widest text-sm">PLAYER SHOWCASE IMAGE</div>';
                }}
              />

              {/* Dynamic Overlay Meta Strips along the bottom of the canvas */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex items-center justify-between border-t border-white/5 backdrop-blur-xs">
                <div>
                  <div className="font-display text-2xl text-white tracking-wide">
                    KENNEDI HARRIS
                  </div>
                  <div className="font-condensed text-xs text-gray-400 tracking-widest uppercase mt-0.5">
                    POSITION // 6'4" GUARD & FORWARD
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl text-kh-pink">#11</div>
                  <div className="font-condensed text-[10px] text-gray-500 tracking-wider uppercase mt-1">
                    CLASS OF 2030
                  </div>
                </div>
              </div>
            </div>

            {/* Asymmetric Structural watermark layer running up the outer border */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[120px] text-white/[0.01] uppercase select-none pointer-events-none origin-center rotate-90 hidden xl:block whitespace-nowrap">
              ATHLETE PROFILE
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
