import { useState } from "react";
import { NavLink } from "react-router";
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
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-kh-dark-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-black leading-none text-white">
            <span className="text-kh-pink">A</span>
            <span className="text-white">D</span>
          </span>
          <span className="font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-0.5">
            CMS Panel
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col w-[240px]
          bg-kh-dark-2 border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header/Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
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

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative cursor-pointer
                ${
                  isActive
                    ? "bg-kh-pink/10 text-kh-pink border border-kh-pink/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-kh-pink rounded-r-full" />
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
      </aside>
    </>
  );
}
