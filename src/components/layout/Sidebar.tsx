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
  const [collapsed, setCollapsed] = useState(false);
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
          fixed top-0 left-0 h-screen z-50 flex flex-col
          bg-kh-dark-2 border-r border-white/5
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[240px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header/Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <div className="text-3xl font-display font-black leading-none shrink-0">
            <span className="text-kh-pink">A</span>
            <span className="text-white">D</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-condensed text-sm font-bold tracking-widest text-white uppercase leading-none">
                Admin
              </p>
              <p className="font-condensed text-[9px] tracking-widest text-zinc-500 uppercase mt-1">
                CMS BACKEND
              </p>
            </div>
          )}
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
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-kh-pink rounded-r-full" />
                  )}
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-condensed text-xs font-bold tracking-wider uppercase flex-1">
                        {label}
                      </span>
                      {isActive && (
                        <ChevronRight size={14} className="opacity-60" />
                      )}
                    </>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1a1a28] text-white text-xs font-condensed tracking-widest uppercase rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer/Toggle */}
        <div className="border-t border-white/5 p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-0" : "rotate-180"
              }`}
            />
            {!collapsed && (
              <span className="font-condensed text-[10px] tracking-wider uppercase">
                Collapse Sidebar
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
