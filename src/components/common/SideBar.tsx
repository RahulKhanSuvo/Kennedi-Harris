import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Video,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { authService } from "@/api/services";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Highlights",
    to: "/admin/highlights",
    icon: Video,
    end: false,
  },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-[#0c0c14] border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-black leading-none">
            <span className="text-kh-blue">K</span>
            <span className="text-kh-pink">H</span>
          </span>
          <span className="font-condensed text-xs tracking-widest text-white/50 uppercase">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/70 hover:text-white transition-colors cursor-pointer"
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

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          bg-kh-dark-2 border-r border-white/8
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[240px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-5 py-6 border-b border-white/8 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <div className="text-3xl font-display font-black leading-none shrink-0">
            <span className="text-[#1a40c8]">K</span>
            <span className="text-[#e8176a]">H</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-condensed text-sm font-bold tracking-widest text-white uppercase leading-none">
                Admin
              </p>
              <p className="font-condensed text-[10px] tracking-widest text-white/40 uppercase mt-0.5">
                Control Panel
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative cursor-pointer
                ${
                  isActive
                    ? "bg-kh-pink/15 text-kh-pink border border-kh-pink/25"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#e8176a] rounded-r-full" />
                  )}
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-condensed text-sm font-semibold tracking-wide uppercase flex-1">
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

        {/* Bottom Section */}
        <div className="border-t border-white/8 p-3 space-y-2">
          {/* Collapse Toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}
            />
            {!collapsed && (
              <span className="font-condensed text-xs tracking-widest uppercase">
                Collapse
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer group ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && (
              <span className="font-condensed text-xs tracking-widest uppercase">
                Logout
              </span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1a1a28] text-white text-xs font-condensed tracking-widest uppercase rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
