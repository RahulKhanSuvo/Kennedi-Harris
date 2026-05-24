import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Film,
  LogOut,
  ShieldAlert,
  ArrowLeft,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { apiService } from "@/lib/api";
import HomePanel from "./components/HomePanel";
import HighlightsPanel from "./components/HighlightsPanel";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "highlights">("home");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      apiService.logout();
      navigate("/login");
    }
  };

  // Navigation Items Helper
  const navItems = [
    {
      id: "home" as const,
      label: "Home Details",
      icon: Sparkles,
      description: "Manage hero stats & images",
    },
    {
      id: "highlights" as const,
      label: "Highlight Films",
      icon: Film,
      description: "Manage highlight tapes & feeds",
    },
  ];

  return (
    <div className="min-h-screen bg-kh-dark text-white font-sans flex flex-col md:flex-row relative selection:bg-kh-pink selection:text-white overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-kh-pink/5 rounded-full blur-[180px] animate-pulse-glow pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-kh-blue/5 rounded-full blur-[180px] animate-pulse-glow pointer-events-none z-0" />

      {/* MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-400 hover:text-white focus:outline-none transition-colors cursor-pointer"
            aria-label="Open Sidebar"
          >
            <Menu size={22} />
          </button>
          <div className="inline-flex text-2xl font-display font-black tracking-tighter leading-none">
            <span className="text-kh-blue">K</span>
            <span className="text-kh-pink">H</span>
          </div>
          <span className="font-display text-sm font-bold tracking-widest text-zinc-300 uppercase">
            PORTAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
            LIVE
          </span>
        </div>
      </header>

      {/* SIDEBAR BACKDROP OVERLAY FOR MOBILE */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
        />
      )}

      {/* SIDEBAR CONTAINER (Desktop sticky, Mobile drawer) */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-30 w-72 md:w-80 h-screen bg-zinc-950/95 md:bg-black/30 backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div className="space-y-8">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="flex items-center gap-3.5">
              <div className="inline-flex text-3xl font-display font-black tracking-tighter leading-none">
                <span className="text-kh-blue">K</span>
                <span className="text-kh-pink">H</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-display text-sm font-bold tracking-widest text-white leading-none">
                  ADMIN PORTAL
                </h1>
                <span className="font-sans text-[8px] tracking-[0.25em] text-kh-pink font-black uppercase mt-1 leading-none">
                  Kennedi Harris Hoops
                </span>
              </div>
            </div>

            {/* Close button for Mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* User profile card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kh-pink to-kh-blue flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-md">
                AD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full" />
            </div>
            <div className="min-w-0">
              <h3 className="text-white text-xs font-bold font-sans tracking-wide truncate">
                Angela Daugher
              </h3>
              <p className="text-[10px] text-zinc-500 font-condensed tracking-widest uppercase mt-0.5">
                ADMINISTRATOR
              </p>
            </div>
          </div>

          {/* Nav list */}
          <nav className="space-y-1.5">
            <span className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-3 pl-2">
              NAVIGATION MENU
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer relative group ${
                    isActive
                      ? "bg-gradient-to-r from-kh-pink/15 to-kh-pink/5 border border-kh-pink/20 text-white shadow-[0_4px_20px_rgba(232,23,106,0.05)]"
                      : "border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02] hover:border-white/5"
                  }`}
                >
                  {/* Left indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-kh-pink rounded-r-md" />
                  )}
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-kh-pink"
                        : "text-zinc-500 group-hover:text-zinc-300 transition-colors"
                    }
                  />
                  <div className="text-left min-w-0">
                    <span className="block text-[11px] font-condensed font-bold tracking-wider uppercase">
                      {item.label}
                    </span>
                    <span className="block text-[9px] text-zinc-500 truncate leading-none mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 border-t border-white/5 pt-6">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-between px-4 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white rounded-xl text-xs font-condensed tracking-wider font-bold uppercase transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-2.5">
              <Globe
                size={14}
                className="text-zinc-400 group-hover:text-white transition-colors"
              />
              <span>VIEW PUBLIC SITE</span>
            </span>
            <ArrowLeft
              size={12}
              className="rotate-180 text-zinc-500 group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 border border-kh-red/20 bg-kh-red/5 hover:bg-kh-red hover:border-kh-red text-red-400 hover:text-white rounded-xl text-xs font-condensed tracking-wider font-bold uppercase transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>SIGN OUT PORTAL</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 z-10 relative">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 flex flex-col gap-8">
          {/* Security Status HUD Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/40 border border-white/5 text-zinc-400 text-[10px] font-mono tracking-wider px-5 py-3.5 rounded-xl uppercase">
            <div className="flex items-center gap-2.5">
              <ShieldAlert
                size={14}
                className="text-kh-pink shrink-0 animate-pulse"
              />
              <span>
                PORTAL_SESSION_ACTIVE // ADMIN_ID: ANGELA_DAUGHTER //
                SECURE_SYNC
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>DB_V1_CONNECTED</span>
            </div>
          </div>

          {/* Active View Container */}
          <div className="flex-1">
            {activeTab === "home" ? <HomePanel /> : <HighlightsPanel />}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-white/5 text-center mt-12 bg-black/10">
          <p className="text-[10px] tracking-[0.35em] text-zinc-700 uppercase font-mono">
            SYSTEM_SYNC_ACTIVE // DATABASE_V1 // ANGELA_DAUGHTER_DASHBOARD
          </p>
        </footer>
      </div>
    </div>
  );
}
