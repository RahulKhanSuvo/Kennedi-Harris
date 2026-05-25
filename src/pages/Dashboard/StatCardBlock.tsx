"use client";

import type { HomeData } from "@/api/types";

const STAT_FIELDS: {
  key: keyof Pick<
    HomeData,
    "PPG" | "RPG" | "BPG" | "DOUBLE_DOUBLES" | "REBOUNDS"
  >;
  label: string;
  placeholder: string;
}[] = [
  { key: "PPG", label: "Points Per Game", placeholder: "e.g. 24.5" },
  { key: "RPG", label: "Rebounds Per Game", placeholder: "e.g. 8.2" },
  { key: "BPG", label: "Blocks Per Game", placeholder: "e.g. 2.1" },
  { key: "DOUBLE_DOUBLES", label: "Double-Doubles", placeholder: "e.g. 18" },
  { key: "REBOUNDS", label: "Total Rebounds", placeholder: "e.g. 312" },
];

interface StatCardBlockProps {
  stats: Pick<HomeData, "PPG" | "RPG" | "BPG" | "DOUBLE_DOUBLES" | "REBOUNDS">;
  onChange: (key: string, value: string) => void;
}

export function StatCardBlock({ stats, onChange }: StatCardBlockProps) {
  return (
    <div className="bg-[#08080c] border border-zinc-900 rounded-2xl p-5 md:p-6 space-y-6">
      <div>
        <h2 className="font-condensed text-xs font-bold tracking-[0.2em] uppercase text-white/80">
          Player Statistics
        </h2>
        <p className="text-zinc-500 font-sans text-[11px] font-light mt-0.5">
          Live metric matrix tracking values rendered on the core public panel
          arrays.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STAT_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <label className="block text-[11px] font-condensed font-bold tracking-wider text-zinc-400 uppercase">
              {label}
            </label>
            <input
              type="text"
              value={stats[key] ?? ""}
              placeholder={placeholder}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl py-3 px-4 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-kh-pink focus:bg-zinc-950/90 transition-all font-condensed tracking-wide"
            />
          </div>
        ))}
      </div>

      {/* Live Preview Display Matrix Grid */}
      {Object.values(stats).some((v) => v) && (
        <div className="pt-4 border-t border-zinc-900">
          <div className="text-[10px] font-condensed tracking-[0.15em] text-zinc-500 uppercase mb-3">
            Metric Output Preview
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {STAT_FIELDS.filter(({ key }) => stats[key]).map(
              ({ key, label }) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950 border border-zinc-900"
                >
                  <span className="font-display text-2xl font-black italic text-kh-pink leading-none tracking-tight">
                    {stats[key]}
                  </span>
                  <span className="font-condensed text-[9px] font-bold tracking-wider text-zinc-500 uppercase mt-1 text-center truncate w-full">
                    {label.split(" ")[0]}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
