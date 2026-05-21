import heroImg from "@/assets/hero.png";
import {
  PlayIcon,
  FileIcon,
  MailIcon,
  CalIcon,
  RulerIcon,
  BasketballIcon,
  MapPinIcon,
  StarIcon,
} from "./icons";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background:
          "linear-gradient(135deg, #050508 0%, #08091a 50%, #0a0515 100%)",
        minHeight: "92vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow layers */}
      <div className="absolute inset-0 hero-glow-pink pointer-events-none" />
      <div className="absolute inset-0 hero-glow-blue pointer-events-none" />

      {/* Extra blue glow bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-80px",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,64,200,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="max-w-[1280px] mx-auto px-6 relative"
        style={{ paddingTop: "3rem", paddingBottom: "1rem" }}
      >
        <div className="flex items-start justify-between gap-4 relative">
          {/* ── LEFT CONTENT ── */}
          <div className="z-10 max-w-[500px] animate-fade-in-up">
            {/* Class badge */}
            <p className="font-condensed font-bold text-kh-pink text-sm tracking-[0.25em] uppercase mb-3">
              Class of 2030
            </p>

            {/* Name */}
            <div
              className="font-display leading-none mb-2"
              style={{ fontSize: "clamp(70px, 9vw, 112px)" }}
            >
              <div className="text-white" style={{ lineHeight: 0.9 }}>
                KENNEDI
              </div>
              <div className="text-kh-pink" style={{ lineHeight: 0.9 }}>
                HARRIS
              </div>
            </div>

            {/* Position */}
            <p className="font-condensed font-bold text-white text-xl tracking-widest uppercase mt-3 mb-2">
              6'2 GUARD / FORWARD
            </p>

            {/* Tagline */}
            <p
              className="font-script text-kh-pink text-2xl mb-1"
              style={{ fontWeight: 700 }}
            >
              Unfinished Legacy.
            </p>
            <p className="font-condensed font-semibold text-white/70 text-sm tracking-[0.18em] uppercase mb-6">
              BUILT DAILY. PROVEN GAME BY GAME.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button id="btn-watch-highlights" className="btn-primary">
                <PlayIcon /> WATCH HIGHLIGHTS
              </button>
              <button id="btn-view-media-kit" className="btn-outline">
                <FileIcon /> VIEW MEDIA KIT
              </button>
              <button id="btn-contact-nil" className="btn-outline">
                <MailIcon /> CONTACT FOR NIL / RECRUITING
              </button>
            </div>
          </div>

          {/* ── CENTER: Player Image ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "140px",
              bottom: 0,
              height: "88vh",
              maxHeight: "680px",
              zIndex: 5,
            }}
          >
            <img
              src={heroImg}
              alt="Kennedi Harris"
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom center",
                filter: "drop-shadow(0 0 40px rgba(232,23,106,0.25))",
              }}
            />
          </div>

          {/* ── RIGHT: #30 outline + signature ── */}
          <div
            className="shrink-0 relative z-10 flex flex-col items-end"
            style={{ minWidth: "110px" }}
          >
            <div
              className="font-display outline-text-blue select-none"
              style={{
                fontSize: "clamp(120px, 14vw, 190px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              30
            </div>
            <div
              className="font-script text-kh-pink text-right mt-2 select-none"
              style={{
                fontSize: "clamp(18px, 2vw, 26px)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Kennedi
              <br />
              Harris #30
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT BAR ── */}
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(8px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center flex-wrap">
            {[
              { icon: <CalIcon />, text: "CLASS OF 2030" },
              { icon: <RulerIcon />, text: "6'2" },
              { icon: <BasketballIcon />, text: "GUARD / FORWARD" },
              { icon: <MapPinIcon />, text: "GEORGIA" },
              { icon: <StarIcon />, text: "NATIONAL PROSPECT" },
            ].map((item, i) => (
              <div
                key={i}
                className="stat-bar-item flex items-center gap-2 py-4"
                style={{ color: "#aaa" }}
              >
                <span className="text-kh-pink">{item.icon}</span>
                <span className="font-condensed font-bold text-xs tracking-widest text-white uppercase">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
