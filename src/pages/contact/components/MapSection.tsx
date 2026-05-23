import React from "react";
import { Link } from "react-router";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Calendar } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Custom red pin marker icon matching mockup
const customMarkerIcon = L.divIcon({
  className: "custom-pin-marker",
  html: `
        <div class="relative w-8 h-8 flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-kh-pink/30 rounded-full animate-ping"></div>
            <div class="absolute w-4 h-4 bg-kh-pink rounded-full border-2 border-white shadow-lg"></div>
        </div>
    `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const BasketballIcon = () => (
  <div className="w-16 h-16 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 mb-6 shrink-0">
    <svg
      className="w-8 h-8 text-kh-pink"
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
  // Atlanta, Georgia coordinates
  const position: [number, number] = [33.749, -84.388];

  return (
    <section className="py-12 bg-kh-dark">
      <div className="container mx-auto px-6">
        <div className="border border-white/10 rounded-lg overflow-hidden bg-kh-dark-2 grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
          {/* Left - Interactive Map */}
          <div className="lg:col-span-3 h-[300px] lg:h-auto min-h-[350px] relative border-b lg:border-b-0 lg:border-r border-white/10 z-0">
            <MapContainer
              center={position}
              zoom={11}
              scrollWheelZoom={false}
              className="w-full h-full absolute inset-0"
              style={{ background: "#050508" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={position} icon={customMarkerIcon} />
            </MapContainer>
          </div>

          {/* Right - Come Say Hi Details */}
          <div className="lg:col-span-2 flex flex-col justify-center items-start p-8 md:p-12 bg-kh-dark-2">
            <BasketballIcon />

            <h2 className="font-display text-4xl text-white tracking-wide uppercase mb-3 leading-none">
              COME SAY HI!
            </h2>

            <div className="w-12 h-1 bg-kh-pink mb-6"></div>

            <p className="text-sm font-sans font-light text-gray-300 mb-2">
              Based in{" "}
              <span className="text-kh-pink font-semibold">
                Atlanta, Georgia
              </span>
            </p>

            <p className="text-sm font-sans font-light text-gray-400 leading-relaxed mb-8">
              Always training. Always improving. Always grateful for the
              support.
            </p>

            <Link
              to="/schedule"
              className="btn-outline border-kh-pink text-white hover:bg-kh-pink/10 group flex items-center justify-center gap-2 cursor-pointer"
            >
              VIEW SCHEDULE
              <Calendar className="w-4 h-4 text-kh-pink group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
