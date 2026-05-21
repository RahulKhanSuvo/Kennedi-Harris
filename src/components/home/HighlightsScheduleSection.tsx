import heroImg from "@/assets/hero.png";
import { PlayIcon, ArrowRightIcon, MapPinSmIcon } from "./icons";
import { highlights, scheduleItems } from "./data";

export default function HighlightsScheduleSection() {
  return (
    <>
      <div className="section-divider" />
      <section id="highlights" className="bg-kh-dark py-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT – Latest Highlights */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-condensed font-black text-white text-lg tracking-widest uppercase">
                  LATEST HIGHLIGHTS
                </span>
              </div>

              {/* Big play button reel */}
              <div className="flex gap-4 mb-4">
                <div
                  style={{
                    width: "160px",
                    height: "120px",
                    flexShrink: 0,
                    background: "linear-gradient(135deg,#111120,#1a1a2e)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={heroImg}
                    alt="highlight reel"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.5,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(232,23,106,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PlayIcon />
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(transparent,rgba(0,0,0,0.8))",
                      padding: "4px 8px",
                    }}
                  >
                    <p className="font-condensed font-bold text-white text-xs uppercase tracking-wider">
                      OFFICIAL HIGHLIGHT REEL
                    </p>
                  </div>
                </div>

                {/* Mini clip list */}
                <div className="flex flex-col gap-2 flex-1">
                  {highlights.map((h) => (
                    <div
                      key={h.title}
                      id={`highlight-${h.title.replace(/\s+/g, "-").toLowerCase()}`}
                      className="flex items-center gap-3 cursor-pointer group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "4px",
                        padding: "8px 10px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "rgba(232,23,106,0.15)",
                          border: "1px solid rgba(232,23,106,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "#E8176A",
                        }}
                      >
                        <PlayIcon />
                      </div>
                      <div>
                        <p className="font-condensed font-bold text-white text-xs uppercase tracking-wide group-hover:text-kh-pink transition-colors">
                          {h.title}
                        </p>
                        <p className="text-white/40 text-xs">{h.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#"
                id="btn-full-highlights"
                className="btn-outline inline-flex items-center gap-2 text-xs"
              >
                VIEW FULL HIGHLIGHTS PROFILE <ArrowRightIcon />
              </a>
            </div>

            {/* RIGHT – Upcoming Schedule */}
            <div id="schedule">
              <div className="flex items-center justify-between mb-5">
                <span className="font-condensed font-black text-white text-lg tracking-widest uppercase">
                  UPCOMING SCHEDULE
                </span>
                <a
                  href="#"
                  className="font-condensed font-bold text-kh-blue-light text-xs uppercase tracking-wider hover:text-white transition-colors"
                >
                  VIEW ALL SCHEDULE
                </a>
              </div>

              <div className="flex flex-col gap-0">
                {scheduleItems.map((s, i) => (
                  <div
                    key={i}
                    className="schedule-row flex items-center gap-4 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Date badge */}
                    <div
                      style={{
                        background: s.color,
                        borderRadius: "3px",
                        minWidth: "64px",
                        padding: "4px 6px",
                        textAlign: "center",
                      }}
                    >
                      <p className="font-condensed font-black text-white text-xs leading-tight uppercase">
                        {s.dates.split(" ")[0]}
                      </p>
                      <p className="font-condensed font-bold text-white text-xs leading-tight uppercase">
                        {s.dates.split(" ")[1]}
                      </p>
                    </div>

                    {/* Event info */}
                    <div className="flex-1">
                      <p className="font-condensed font-black text-white text-sm uppercase tracking-wide leading-tight">
                        {s.event}
                      </p>
                      <p className="font-condensed font-bold text-white/50 text-xs uppercase tracking-wider">
                        {s.org}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-white/40">
                      <MapPinSmIcon />
                      <span className="font-condensed text-xs uppercase tracking-wider">
                        TBD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
