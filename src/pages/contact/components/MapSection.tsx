import { Link } from "react-router";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Calendar, MapPin, Target } from "lucide-react";
import "leaflet/dist/leaflet.css";
import Container from "@/components/common/Container";

// Enhanced custom red pin marker icon with double glowing aura rings
const customMarkerIcon = L.divIcon({
  className: "custom-pin-marker",
  html: `
        <div class="relative w-10 h-10 flex items-center justify-center">
            <div class="absolute w-10 h-10 bg-kh-pink/20 rounded-full animate-ping"></div>
            <div class="absolute w-6 h-6 bg-kh-pink/40 rounded-full animate-pulse"></div>
            <div class="absolute w-3.5 h-3.5 bg-kh-pink rounded-full border-2 border-white shadow-[0_0_15px_rgba(236,72,153,0.6)]"></div>
        </div>
    `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const BasketballIcon = () => (
  <div className="w-14 h-14 rounded-xl border border-white/5 flex items-center justify-center bg-[#111115] text-kh-pink mb-6 shrink-0 relative group-hover:border-kh-pink/30 transition-colors shadow-lg">
    <div className="absolute inset-0 bg-linear-to-br from-kh-pink/5 to-transparent rounded-xl" />
    <svg
      className="w-7 h-7 relative z-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M12 2a14.5 14.5 0 0 1 0 20" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
    </svg>
  </div>
);

export function MapSection() {
  // Warner Robins, Georgia coordinates
  const position: [number, number] = [32.613, -83.5996];

  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Asset Track Layer */}
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* RIGHT MAP FRAME CANVAS (7 Columns) — Editorial Interactive Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative w-full">
            {/* Soft Ambient Shadow Backdrop Glow */}
            <div className="absolute -inset-2 bg-linear-to-r from-kh-pink/10 to-cyan-500/10 rounded-2xl opacity-40 blur-2xl pointer-events-none" />

            <div className="relative aspect-video lg:aspect-16/10 w-full bg-[#111115] border border-white/10 p-3 rounded-2xl shadow-2xl overflow-hidden group/map">
              {/* Internal Map Rendering Window Container */}
              <div className="w-full h-full rounded-xl overflow-hidden relative z-0">
                <MapContainer
                  center={position}
                  zoom={11}
                  scrollWheelZoom={false}
                  className="w-full h-full absolute inset-0 filter grayscale contrast-[1.08] brightness-[0.85]"
                  style={{ background: "#050508" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <Marker position={position} icon={customMarkerIcon} />
                </MapContainer>

                {/* Aesthetic High-Contrast Vignette Corner Film Shield Layer */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/40 via-transparent to-black/20 z-10" />
              </div>

              {/* Float Floating Utility Coordinate Tag */}
              <div className="absolute bottom-6 right-6 bg-[#0c0c0f]/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 z-20 pointer-events-none">
                <Target size={12} className="text-cyan-400" />
                <span className="font-condensed text-[9px] tracking-widest text-gray-400 uppercase">
                  32.613° N / 83.599° W
                </span>
              </div>
            </div>
          </div>
          {/* LEFT CONTENT BLOCK (5 Columns) — Premium Headquarters Copy */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center group">
            <BasketballIcon />

            <div className="font-condensed font-bold tracking-[0.2em] text-cyan-400 text-xs uppercase mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Scouting Region
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-6 leading-[0.9]">
              COME
              <br />
              SAY HI!
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 bg-[#111115] border border-white/5 px-4 py-3 rounded-xl max-w-sm">
                <MapPin size={16} className="text-kh-pink shrink-0" />
                <p className="text-sm font-sans font-light text-gray-300">
                  Based in{" "}
                  <span className="text-white font-semibold">
                    Warner Robins, Georgia
                  </span>
                </p>
              </div>

              <p className="text-sm font-sans font-light text-gray-400 leading-relaxed max-w-sm">
                Always training. Always improving. Catch me on the home courts
                or tracking circuits during the tournament season.
              </p>
            </div>

            {/* Premium Interactive Action Route Link */}
            <div className="flex">
              <Link
                to="/schedule"
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-kh-pink/5 border border-kh-pink text-white font-condensed font-bold text-xs tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-kh-pink/5 group/btn"
              >
                VIEW FULL SCHEDULE
                <Calendar className="w-4 h-4 text-kh-pink group-hover/btn:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
