/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FileImage, Edit2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface ImageField {
  key: string;
  label: string;
}

interface ActiveShowcaseCardProps {
  activeAbout: any;
  imageFields: readonly ImageField[];
  onEditClick: () => void; // Trigger form directly from the blinking badge
}

export function ActiveShowcaseCard({
  activeAbout,
  imageFields,
  onEditClick,
}: ActiveShowcaseCardProps) {
  return (
    <Card className="bg-kh-dark-2 border-white/5 shadow-2xl p-6 rounded relative overflow-hidden group/card w-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
            Active Showcase
          </CardTitle>
          <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
            Live timeline presentation assets
          </CardDescription>
        </div>

        {/* Blinking Live Matrix Interactive Edit Action */}
        <Button
          onClick={onEditClick}
          className="group/btn flex items-center gap-1.5 bg-kh-pink/10 hover:bg-kh-pink/20 border border-kh-pink/20 rounded-md px-2.5 py-1 transition-all cursor-pointer"
        >
          <span className="font-condensed text-kh-pink text-base group-hover:text-white transition-colors">
            Edit Profile
          </span>
          <Edit2
            size={9}
            className="text-kh-pink/70 group-hover/btn:text-white transition-colors ml-0.5"
          />
        </Button>
      </CardHeader>

      <div className="space-y-6">
        {/* High-Tech Image Showcase Frame */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {imageFields.map((img) => (
            <div
              key={img.key}
              className="group/item relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/80 min-h-[140px] md:min-h-[180px] flex flex-col justify-end transition-all duration-300 hover:border-kh-pink/30 shadow-lg"
            >
              {activeAbout[img.key] ? (
                <>
                  <img
                    src={activeAbout[img.key]}
                    alt={img.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105 group-hover/item:brightness-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 gap-1.5">
                  <FileImage size={20} className="text-zinc-800" />
                  <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-600">
                    Empty Track
                  </span>
                </div>
              )}
              <div className="relative p-3 w-full text-left z-10">
                <span className="font-condensed text-[10px] font-black text-zinc-300 uppercase tracking-widest block drop-shadow-md group-hover/item:text-white transition-colors">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Tech Stats Display Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-white/5">
          <div className="p-4 bg-neutral-900/20 border border-white/3 rounded-xl flex items-center justify-between group/stat transition-colors hover:bg-neutral-900/40">
            <span className="font-condensed text-xs uppercase tracking-widest text-zinc-400 font-bold">
              Major Rewards
            </span>
            <span className="font-display text-3xl text-kh-pink font-black drop-shadow-[0_4px_12px_rgba(236,72,153,0.15)]">
              {activeAbout.totalMajorReward}
            </span>
          </div>

          <div className="p-4 bg-neutral-900/20 border border-white/3 rounded-xl flex items-center justify-between group/stat transition-colors hover:bg-neutral-900/40">
            <span className="font-condensed text-xs uppercase tracking-widest text-zinc-400 font-bold">
              Games Played
            </span>
            <span className="font-display text-3xl text-white font-black">
              {activeAbout.totalGamePlayed}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
