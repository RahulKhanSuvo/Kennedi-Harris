import { Star, User, GraduationCap, Users, ArrowRight } from "lucide-react";
import aboutImg from "@/assets/me-removebg-preview.png";
import { Button } from "@/components/ui/button";
const features = [
  {
    icon: Star,
    title: "COMPETITIVE",
    desc: "Relentless on both ends",
  },
  {
    icon: User,
    title: "LEADER",
    desc: "Leads by example",
  },
  {
    icon: GraduationCap,
    title: "STUDENT",
    desc: "Academic driven",
  },
  {
    icon: Users,
    title: "TEAM FIRST",
    desc: "Success together",
  },
];
export default function AboutSection() {
  return (
    <section id="about" className=" bg-kh-dark relative overflow-hidden">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row  items-center justify-between gap-20">
          {/* Left - Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
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
          <div className=" flex flex-col gap-6">
            <div className="font-condensed font-bold tracking-[0.15em] text-kh-pink text-sm uppercase">
              ABOUT KENNEDI
            </div>
            <h2 className="font-condensed font-semibold text-5xl lg:text-7xl text-white uppercase leading-[0.95]">
              PURPOSE DRIVES.
              <br />
              <span className="text-kh-pink">PASSION DEFINES.</span>
            </h2>

            <div className="text-kh-gray text-sm leading-relaxed space-y-4 font-sans">
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
                  size={50}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </div>

          {/* Right - Traits */}
          <div className="w-full lg:w-2/4 flex flex-col border-l border-gray-600 pl-8 gap-8">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="group">
                  <div className="flex items-center gap-4">
                    <div className="group-hover:bg-kh-pink group-hover:text-white transition-colors">
                      <Icon size={50} />
                    </div>

                    <div>
                      <div className="font-condensed font-bold tracking-widest text-white uppercase">
                        {item.title}
                      </div>
                      <div className="text-kh-gray text-xs">{item.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
