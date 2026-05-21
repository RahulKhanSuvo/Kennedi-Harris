import heroImg from "@/assets/hero.png";
import { stats } from "./data";

export default function StatsSection() {
  return (
    <>
      <div className="section-divider" />
      <section id="stats" className="bg-kh-dark py-14">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="font-condensed font-bold text-white text-sm tracking-[0.3em] uppercase">
              BY THE NUMBERS
            </span>
            <div
              style={{
                height: "3px",
                width: "40px",
                background: "#E8176A",
                borderRadius: "2px",
              }}
            />
          </div>

          <div className="flex flex-wrap items-end gap-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <div
                  className={`font-display leading-none ${s.pink ? "text-kh-pink" : "text-white"}`}
                  style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-condensed font-bold text-white/50 text-xs tracking-widest uppercase whitespace-pre-line"
                  style={{ lineHeight: 1.3 }}
                >
                  {s.label}
                </div>
              </div>
            ))}

            {/* Small player photo */}
            <div
              className="ml-auto shrink-0 hidden xl:block"
              style={{ width: "130px", height: "130px" }}
            >
              <img
                src={heroImg}
                alt="stats photo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "4px",
                  filter: "brightness(0.8)",
                }}
              />
            </div>

            {/* Stats note */}
            <div className="ml-2 hidden xl:block">
              <p className="font-condensed font-bold text-white/40 text-xs tracking-widest uppercase leading-relaxed">
                STATS UPDATED
                <br />
                THROUGHOUT
                <br />
                THE SEASON.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
