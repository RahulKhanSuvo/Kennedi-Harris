import { Activity, RefreshCw, Eye, Edit3 } from "lucide-react";
import { motion } from "motion/react";

interface DashboardHeaderProps {
  refetch: () => void;
  isLoading: boolean;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  existingId?: string;
}

export function DashboardHeader({
  refetch,
  isLoading,
  isEditing,
  setIsEditing,
  existingId,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-[#090b0d]/80 border-b border-white/5 pb-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-900/50 border border-white/10 flex items-center justify-center shrink-0 shadow-lg relative group overflow-hidden">
          <div className="absolute inset-0 bg-kh-pink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Activity size={20} className="text-kh-pink relative z-10" />
        </div>
        <div>
          <h1 className="font-display text-xl lg:text-2xl font-black tracking-wide uppercase leading-tight text-white">
            Roster Presentation Manager
          </h1>
          <p className="text-zinc-500 text-[11px] font-condensed font-bold tracking-widest uppercase mt-0.5">
            Live Showcase Viewport & Metrics Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 text-[10px] font-condensed font-bold tracking-widest uppercase transition-all duration-200 bg-neutral-900/40 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw
            size={14}
            className={isLoading ? "animate-spin text-kh-pink" : ""}
          />
          Sync Server Data
        </button>

        {existingId && (
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-condensed font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              isEditing
                ? "bg-neutral-800 border border-white/10 text-white hover:bg-neutral-700 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                : "bg-kh-pink/10 border border-kh-pink/30 text-kh-pink hover:bg-kh-pink/20 hover:border-kh-pink/50 shadow-[0_0_20px_rgba(232,23,106,0.15)]"
            }`}
          >
            {isEditing ? (
              <>
                <Eye size={14} /> View Live Profile
              </>
            ) : (
              <>
                <Edit3 size={14} /> Edit Statistics
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
