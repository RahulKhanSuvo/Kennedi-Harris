import { useState } from "react";
import {
  LayoutGrid,
  UserCircle,
  Users,
  Camera,
  Heart,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import gal1 from "../../../assets/gal-1.png";
import gal2 from "../../../assets/gal-2.png";
import gal3 from "../../../assets/gal-3.png";
import gal4 from "../../../assets/gal-4.png";
import hl1 from "../../../assets/highlight-1.png";
import hl2 from "../../../assets/highlight-2.png";
import hl3 from "../../../assets/highlight-3.png";
import hero from "../../../assets/hero-player.png";
import Container from "@/components/common/Container";

const TABS = [
  { id: "ALL", label: "ALL", icon: null },
  { id: "GAME_ACTION", label: "GAME ACTION", icon: LayoutGrid },
  { id: "PORTRAITS", label: "PORTRAITS", icon: UserCircle },
  { id: "TEAM", label: "TEAM", icon: Users },
  { id: "BEHIND_SCENES", label: "BEHIND THE SCENES", icon: Camera },
  { id: "COMMUNITY", label: "COMMUNITY", icon: Heart },
];

const IMAGES = [
  gal1,
  hl1,
  gal2,
  hl2,
  gal3,
  hl3,
  gal4,
  hero,
  hl2,
  gal1,
  hl3,
  gal3,
];

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <section className="bg-kh-dark-2/40 py-12 border-t border-white/5">
      <Container>
        {/* Filters & Sorting */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 font-condensed font-bold tracking-widest text-sm py-2 px-4 transition-all duration-300 rounded-sm
                                        ${
                                          isActive
                                            ? "bg-kh-pink text-white"
                                            : "text-gray-400 hover:text-white bg-transparent hover:bg-white/5"
                                        }
                                    `}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <button className="flex items-center justify-between gap-4 font-condensed font-bold text-sm tracking-widest text-white border border-white/20 py-2 px-4 rounded-sm bg-black/50 hover:border-white/50 transition-colors w-40 shrink-0">
            LATEST
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {IMAGES.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-md group cursor-pointer relative"
            >
              <img
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="btn-outline border-kh-pink text-kh-pink hover:text-white group flex items-center gap-2">
            LOAD MORE PHOTOS
            <RefreshCw className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </Container>
    </section>
  );
}
