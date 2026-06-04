"use client";

import { Trophy, Edit2, FileImage, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HomeDetailsViewProps {
  activeRecord: {
    _id: string;
    PPG: string;
    RPG: string;
    BPG: string;
    DOUBLE_DOUBLES: string;
    REBOUNDS: string;
    frist_img?: string;
    second_img?: string;
  };
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function HomeDetailsView({
  activeRecord,
  onEditClick,
  // onDeleteClick,
}: HomeDetailsViewProps) {
  const statMetrics = [
    {
      label: "Points Per Game",
      val: activeRecord.PPG,
      short: "PPG",
      highlight: true,
    },
    {
      label: "Rebounds Per Game",
      val: activeRecord.RPG,
      short: "RPG",
      highlight: false,
    },
    {
      label: "Blocks Per Game",
      val: activeRecord.BPG,
      short: "BPG",
      highlight: false,
    },
    {
      label: "Double Doubles",
      val: activeRecord.DOUBLE_DOUBLES,
      short: "DDBL",
      highlight: false,
    },
    {
      label: "Total Rebounds",
      val: activeRecord.REBOUNDS,
      short: "REB",
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6 w-full ">
      {/* SECTION 1: HEADER & ACTION CONTROL PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-kh-dark-2 border border-white/5 p-4 rounded">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kh-pink/10 rounded-xl border border-kh-pink/20 text-kh-pink hidden xs:block">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="font-display text-xl uppercase tracking-wider text-white">
              Profile Showcase
            </h2>
            <p className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500">
              Active system parameters and deployed media modules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={onEditClick}
            className="flex-1 sm:flex-none bg-white hover:bg-zinc-200 text-black font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 h-9 rounded-xl flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            <Edit2 size={12} />
            Edit Profile
          </Button>
          {/* <Button
            variant="destructive"
            onClick={onDeleteClick}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 h-9 rounded-xl flex items-center justify-center gap-2 border border-red-500/20 cursor-pointer"
          >
            <Trash2 size={12} />
            Delete
          </Button> */}
        </div>
      </div>

      {/* SECTION 2: GRID CORE METRICS SUMMARY MATRIX */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statMetrics.map((stat, idx) => (
          <Card
            key={idx}
            className={`bg-[#0c0c14] border-white/5 p-4 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
              stat.highlight
                ? "col-span-2 md:col-span-1 border-kh-pink/20 shadow-[0_4px_20px_rgba(236,72,153,0.05)]"
                : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-condensed text-[10px] font-black uppercase tracking-widest text-zinc-500 block max-w-[80%] leading-tight">
                {stat.label}
              </span>
              <span className="font-mono text-[9px] font-bold text-zinc-600 uppercase">
                {stat.short}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span
                className={`font-display text-2xl md:text-3xl uppercase tracking-wider ${stat.highlight ? "text-kh-pink" : "text-white"}`}
              >
                {stat.val || "0.0"}
              </span>
              {stat.highlight && (
                <BarChart3 size={14} className="text-kh-pink/40" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* SECTION 3: FULL DOCK MEDIA DISPLAYS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Primary Showcase Interface Asset",
            url: activeRecord.frist_img,
          },
          {
            title: "Secondary Stat Summary Visual",
            url: activeRecord.second_img,
          },
        ].map((img, idx) => (
          <Card
            key={idx}
            className="bg-[#0c0c14] border-white/5 overflow-hidden flex flex-col rounded-2xl"
          >
            <CardHeader className="p-4 bg-neutral-950/40 border-b border-white/5">
              <CardTitle className="font-display text-xs uppercase tracking-wider text-zinc-400">
                {img.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex items-center justify-center bg-neutral-950/10 min-h-[220px] sm:min-h-[280px]">
              {img.url ? (
                <div className="relative w-full h-full max-h-[300px] rounded-xl overflow-hidden border border-white/5 group">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="text-zinc-700 flex flex-col items-center gap-2">
                  <FileImage size={32} className="text-zinc-800" />
                  <span className="font-condensed text-[10px] uppercase tracking-widest font-bold">
                    No Asset Streams Configured
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
