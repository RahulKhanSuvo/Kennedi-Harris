import { Star, User, GraduationCap, Users, ArrowRight } from "lucide-react";
import aboutImg from "@/assets/me-removebg-preview.png";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section id="about" className=" bg-kh-dark relative overflow-hidden">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row  items-center justify-between">
          {/* Left - Image */}
          <div className="w-full lg:w-1/3 relative flex justify-center">
            {/* Blue accent line */}
            {/* <div className="absolute left-0 bottom-0 w-1 h-3/4 bg-linear-to-t from-kh-blue to-transparent transform -skew-x-12 -translate-x-4 hidden lg:block" /> */}
            <div className="dot-grid absolute w-32 h-[60%] -left-10 top-[10%]"></div>
            <div className="absolute left-0 bottom-0 w-2 h-full transform -skew-x-24 -translate-x-4 hidden lg:block bg-[linear-gradient(to_top,#0046c0_0%,#0046c0_50%,#f1136a_50%,#f1136a_100%)]" />
            <div className="absolute left-0 bottom-0 w-2 h-2/5 bg-linear-to-t from-kh-blue to-transparent transform -skew-x-24 translate-x-10 hidden lg:block" />

            <div className="relative z-10 w-[80%] lg:w-full max-w-[400px] aspect-3/4 rounded overflow-hidden">
              <img
                src={aboutImg}
                alt="About Kennedi"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-kh-gray font-condensed">IMAGE PLACEHOLDER</div>';
                }}
              />
              <div className="absolute bottom-10 right-10 font-display text-[100px] leading-none outline-text opacity-30 select-none">
                30
              </div>
            </div>
          </div>

          {/* Middle - Content */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            <div className="font-condensed font-bold tracking-[0.15em] text-kh-pink text-sm uppercase">
              ABOUT KENNEDI
            </div>
            <h2 className="font-condensed font-bold text-5xl lg:text-6xl text-white uppercase leading-[0.95]">
              PURPOSE DRIVES.
              <br />
              <span className="text-kh-pink">PASSION DEFINES.</span>
            </h2>

            <div className="text-kh-gray text-sm leading-relaxed space-y-4 font-sans max-w-lg">
              <p>
                Kennedi Harris is a Class of 2030 basketball prospect known for
                her rare combination of size, versatility, rebounding, shot
                blocking, and guard-level skill. At 6'2, she impacts the game on
                both ends of the floor with the ability to score, defend,
                rebound, push the ball, and create opportunities for her team.
              </p>
              <p>
                Her journey is rooted in purpose, discipline, family, and
                legacy. Kennedi plays with a competitive edge and continues to
                develop into one of the most exciting young prospects in girls
                basketball.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 mt-2">
              <Button
                variant="kh-outline"
                className="inline-flex items-center gap-2 font-condensed font-bold tracking-widest text-kh-blue hover:text-kh-blue-light transition-colors uppercase text-sm group"
              >
                LEARN MORE ABOUT KENNEDI
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </div>

          {/* Right - Traits */}
          <div className="w-full lg:w-1/4 flex flex-col border-l border-gray-600 pl-8 gap-8">
            <div className="trait-card group">
              <div className="flex items-center gap-4">
                <div className="trait-icon group-hover:bg-kh-pink group-hover:text-white transition-colors">
                  <Star size={16} />
                </div>
                <div className="font-condensed font-bold tracking-widest text-white uppercase">
                  COMPETITIVE
                </div>
              </div>
              <div className="text-kh-gray text-xs pl-12">
                Relentless on both ends
              </div>
            </div>

            <div className="trait-card group">
              <div className="flex items-center gap-4">
                <div className="trait-icon group-hover:bg-kh-pink group-hover:text-white transition-colors">
                  <User size={16} />
                </div>
                <div className="font-condensed font-bold tracking-widest text-white uppercase">
                  LEADER
                </div>
              </div>
              <div className="text-kh-gray text-xs pl-12">Leads by example</div>
            </div>

            <div className="trait-card group">
              <div className="flex items-center gap-4">
                <div className="trait-icon group-hover:bg-kh-pink group-hover:text-white transition-colors">
                  <GraduationCap size={16} />
                </div>
                <div className="font-condensed font-bold tracking-widest text-white uppercase">
                  STUDENT
                </div>
              </div>
              <div className="text-kh-gray text-xs pl-12">Academic driven</div>
            </div>

            <div className="trait-card group">
              <div className="flex items-center gap-4">
                <div className="trait-icon group-hover:bg-kh-pink group-hover:text-white transition-colors">
                  <Users size={16} />
                </div>
                <div className="font-condensed font-bold tracking-widest text-white uppercase">
                  TEAM FIRST
                </div>
              </div>
              <div className="text-kh-gray text-xs pl-12">Success together</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
