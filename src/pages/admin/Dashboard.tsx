import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Film, LogOut, ShieldAlert, ArrowLeft } from "lucide-react";
import { apiService } from "@/lib/api";
import HomePanel from "./components/HomePanel";
import HighlightsPanel from "./components/HighlightsPanel";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "highlights">("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      apiService.logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-kh-dark text-white font-sans overflow-x-hidden selection:bg-kh-pink selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-kh-pink/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-kh-blue/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />

      {/* Admin Panel Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
        {/* Left Brand Area */}
        <div className="flex items-center gap-4">
          <div className="inline-flex text-3xl font-display font-black tracking-tighter leading-none">
            <span className="text-kh-blue">K</span>
            <span className="text-kh-pink">H</span>
          </div>
          <div className="h-6 w-[1.5px] bg-white/10 hidden sm:block" />
          <div className="flex-col hidden sm:flex">
            <h1 className="font-display text-lg font-bold tracking-widest leading-none">
              ADMIN CONTROL CENTER
            </h1>
            <span className="font-sans text-[8px] tracking-[0.3em] text-kh-pink font-black uppercase mt-1 leading-none">
              Kennedi Harris Hoops
            </span>
          </div>
        </div>

        {/* Center Panel Navigation Tabs */}
        <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-lg p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded font-condensed font-bold tracking-wider text-xs uppercase cursor-pointer transition-all ${
              activeTab === "home"
                ? "bg-kh-pink text-white shadow-lg shadow-kh-pink/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles size={14} />
            <span>HOME DETAILS</span>
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded font-condensed font-bold tracking-wider text-xs uppercase cursor-pointer transition-all ${
              activeTab === "highlights"
                ? "bg-kh-pink text-white shadow-lg shadow-kh-pink/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Film size={14} />
            <span>HIGHLIGHT FILMS</span>
          </button>
        </div>

        {/* Right Logout and Return */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hidden lg:flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 bg-white/5 rounded text-[11px] font-condensed tracking-wider font-bold uppercase transition-all cursor-pointer text-white/70 hover:text-white"
          >
            <ArrowLeft size={13} />
            <span>PUBLIC SITE</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-kh-red/20 bg-kh-red/5 hover:bg-kh-red hover:border-kh-red text-red-400 hover:text-white rounded text-[11px] font-condensed tracking-wider font-bold uppercase transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content Container */}
      <main className="max-w-[1900px] mx-auto py-12 px-6 lg:px-12 relative z-10 min-h-[calc(100vh-80px)]">
        {/* Security Warning Line */}
        <div className="flex items-center gap-2.5 bg-cyan-950/10 border border-cyan-500/10 text-cyan-400 text-[10px] font-mono tracking-wider px-4 py-2 rounded-lg mb-8 uppercase animate-pulse">
          <ShieldAlert size={14} className="shrink-0" />
          <span>
            AUTHORIZED_ACCESS_ONLY // ADMIN_ID: ANGELA_DAUGHTER // REMOTE_IP:
            RESOLVED_SYNCED
          </span>
        </div>

        {/* Active Panel View Render */}
        {activeTab === "home" ? <HomePanel /> : <HighlightsPanel />}
      </main>

      {/* Subtle bottom footer */}
      <footer className="py-6 border-t border-white/5 text-center mt-12">
        <p className="text-[10px] tracking-[0.35em] text-zinc-700 uppercase font-mono">
          SYSTEM_SYNC_ACTIVE // DATABASE_V1 // ANGELA_DAUGHTER_DASHBOARD
        </p>
      </footer>
    </div>
  );
}
