import heroImg from "@/assets/hero.png";
import {
  ArrowRightIcon,
  StarIcon,
  UserIcon,
  BookIcon,
  UsersIcon,
} from "./icons";

const traits = [
  { icon: <StarIcon />, title: "COMPETITIVE", desc: "Relentless on both ends" },
  { icon: <UserIcon />, title: "LEADER", desc: "Leads by example" },
  { icon: <BookIcon />, title: "STUDENT", desc: "Academic driven" },
  { icon: <UsersIcon />, title: "TEAM FIRST", desc: "Success together" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-kh-dark-2 py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex gap-8 items-start">
          {/* Left – photo */}
          <div className="shrink-0 hidden md:block" style={{ width: "280px" }}>
            <div
              style={{
                background: "#111120",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                height: "370px",
              }}
            >
              <img
                src={heroImg}
                alt="Kennedi Harris"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "grayscale(1) brightness(0.8)",
                }}
              />
              {/* Pink accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background: "#E8176A",
                }}
              />
            </div>
          </div>

          {/* Middle – text */}
          <div className="flex-1 max-w-[520px]">
            <p className="font-condensed font-bold text-kh-pink text-xs tracking-[0.3em] uppercase mb-3">
              ABOUT KENNEDI
            </p>
            <div
              className="font-condensed font-black leading-none mb-4"
              style={{ fontSize: "clamp(36px, 4vw, 54px)" }}
            >
              <div className="text-white">PURPOSE DRIVES.</div>
              <div className="text-kh-pink">PASSION DEFINES.</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Kennedi Harris is a Class of 2030 basketball prospect known for
              her rare combination of size, versatility, rebounding, shot
              blocking, and guard-level skill. At 6'2, she impacts the game on
              both ends of the floor with the ability to score, defend, rebound,
              push the ball, and create opportunities for her team.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-7">
              Her journey is rooted in purpose, discipline, family, and legacy.
              Kennedi plays with a competitive edge and continues to develop
              into one of the most exciting young prospects in girls basketball.
            </p>
            <button
              id="btn-learn-more"
              className="btn-outline flex items-center gap-2 text-white"
            >
              LEARN MORE ABOUT KENNEDI <ArrowRightIcon />
            </button>
          </div>

          {/* Right – trait cards */}
          <div
            className="shrink-0 flex flex-col gap-5 hidden lg:flex"
            style={{ minWidth: "200px" }}
          >
            {traits.map((t) => (
              <div key={t.title} className="flex items-start gap-3">
                <div className="trait-icon shrink-0">{t.icon}</div>
                <div>
                  <div className="font-condensed font-black text-white text-sm tracking-wider uppercase">
                    {t.title}
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
