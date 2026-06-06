"use client";

import { useState } from "react";
import { NavLink, Link } from "react-router";
import {
  Home,
  Video,
  User,
  Image as ImageIcon,
  Phone,
  LayoutTemplate,
  ChevronRight,
  Menu,
  X,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home Page", to: "/dashboard/home", icon: Home },
  { label: "Highlights", to: "/dashboard/highlights", icon: Video },
  { label: "Schedule", to: "/dashboard/schedule", icon: Calendar },
  { label: "About", to: "/dashboard/about", icon: User },
  { label: "Gallery", to: "/dashboard/gallery", icon: ImageIcon },
  { label: "Contact", to: "/dashboard/contact", icon: Phone },
  { label: "Footer", to: "/dashboard/footer", icon: LayoutTemplate },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ========================================== */}
      {/* 📱 MOBILE HEADER BAR */}
      {/* ========================================== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-kh-dark-2 border-b border-white/5 backdrop-blur-md bg-kh-dark-2/95">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-black leading-none text-white">
            <span className="text-kh-pink">A</span>
            <span className="text-white">D</span>
          </span>
          <span className="font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-0.5">
            CMS Panel
          </span>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/2 text-zinc-300 border border-white/5 hover:text-white hover:bg-white/5 transition-all cursor-pointer active:scale-95"
            title="Go to Live Website"
          >
            <span className="font-condensed text-[10px] font-bold tracking-wider uppercase">
              Live Site
            </span>
            <ArrowUpRight size={14} className="text-kh-pink" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop Blur Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ========================================== */}
      {/* 🎛️ SIDEBAR CONTAINER CORE */}
      {/* ========================================== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col w-[240px]
          bg-kh-dark-2 border-r border-white/5
          transition-transform duration-300 ease-in-out pt-[68px] lg:pt-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header/Identity Plate */}
        <div className="hidden lg:flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <div className="text-3xl font-display font-black leading-none shrink-0">
            <span className="text-kh-pink">A</span>
            <span className="text-white">D</span>
          </div>
          <div>
            <p className="font-condensed text-sm font-bold tracking-widest text-white uppercase leading-none">
              Admin
            </p>
            <p className="font-condensed text-[9px] tracking-widest text-zinc-500 uppercase mt-1">
              CMS BACKEND
            </p>
          </div>
        </div>

        {/* 🚀 MAIN RETURN GATEWAY: VIEW PORTFOLIO LIVE WEBSITE */}
        <div className="p-3 border-b border-white/5 bg-white/[0.01]">
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-zinc-100 bg-kh-pink/10 border border-kh-pink/20 hover:bg-kh-pink/20 transition-all cursor-pointer group shadow-[0_0_20px_rgba(236,72,153,0.05)]"
          >
            <span className="font-condensed text-xs font-bold tracking-wider uppercase flex-1 text-white">
              Go to Live Website
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-kh-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Dynamic Nav Node List */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative cursor-pointer
                ${
                  isActive
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/2 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                  )}
                  <Icon size={18} className="shrink-0" />
                  <span className="font-condensed text-xs font-bold tracking-wider uppercase flex-1">
                    {label}
                  </span>
                  {isActive && (
                    <ChevronRight size={14} className="opacity-60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Accent Block */}
        <div className="border-t border-white/5 p-4 text-center"></div>
      </aside>
    </>
  );
}
