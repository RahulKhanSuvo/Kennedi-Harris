import heroImg from "@/assets/hero.png";
import { partners } from "./data";

export default function GalleryPartnersSection() {
  return (
    <>
      <div className="section-divider" />
      <section id="gallery" className="bg-kh-dark-2 py-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT – Photo Gallery */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-condensed font-black text-white text-lg tracking-widest uppercase">
                  PHOTO GALLERY
                </span>
                <a
                  href="#"
                  className="font-condensed font-bold text-kh-blue-light text-xs uppercase tracking-wider hover:text-white transition-colors"
                >
                  VIEW GALLERY
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    id={`gallery-img-${i + 1}`}
                    style={{
                      height: i === 0 ? "180px" : "88px",
                      gridColumn: i === 0 ? "span 1" : "auto",
                      borderRadius: "4px",
                      overflow: "hidden",
                      background: "#111120",
                      cursor: "pointer",
                    }}
                    className={i === 0 ? "row-span-2" : ""}
                  >
                    <img
                      src={heroImg}
                      alt={`gallery ${i + 1}`}
                      className="gallery-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: `${(i * 15) % 100}% center`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT – Brand Partner Opportunities */}
            <div id="partners">
              <div className="flex items-center justify-between mb-5">
                <span className="font-condensed font-black text-white text-lg tracking-widest uppercase">
                  BRAND PARTNER OPPORTUNITIES
                </span>
                <a
                  href="#"
                  className="font-condensed font-bold text-kh-blue-light text-xs uppercase tracking-wider hover:text-white transition-colors"
                >
                  LEARN MORE
                </a>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-7">
                Kennedi partners with brands that align with youth sports,
                wellness, performance, education, and community impact. Let's
                build something meaningful together.
              </p>

              {/* Partner logos (text placeholders styled as logos) */}
              <div className="flex flex-wrap items-center gap-6">
                {partners.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      color: p.color,
                      fontSize: p.size,
                      fontWeight: p.weight,
                      fontFamily: p.font,
                      opacity: 0.85,
                      letterSpacing: p.letterSpacing,
                      filter: "brightness(0.9)",
                    }}
                  >
                    {p.name}
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
