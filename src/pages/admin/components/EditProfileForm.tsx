import React from "react";
import { Save, X, Trash2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { HomeData } from "@/api/types";
import { ImagePreviewBox } from "../../Dashboard/ImagePreviewBox";
import { StatCardBlock } from "../../Dashboard/StatCardBlock";

interface EditProfileFormProps {
  stats: Pick<HomeData, "PPG" | "RPG" | "BPG" | "DOUBLE_DOUBLES" | "REBOUNDS">;
  handleStatChange: (key: string, value: string) => void;
  homeData: HomeData | undefined;
  firstImg: File | null;
  setFirstImg: (file: File | null) => void;
  secondImg: File | null;
  setSecondImg: (file: File | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isBusy: boolean;
  existingId: string | undefined;
  setIsEditing: (val: boolean) => void;
  handleDelete: () => void;
}

export function EditProfileForm({
  stats,
  handleStatChange,
  homeData,
  firstImg,
  setFirstImg,
  secondImg,
  setSecondImg,
  handleSubmit,
  isBusy,
  existingId,
  setIsEditing,
  handleDelete,
}: EditProfileFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Interactive Image Drop Block Panel */}
        <div className="bg-[#0a0d10] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-[10px] font-condensed font-black tracking-widest uppercase text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kh-pink inline-block"></span>
              Media Viewport Core Configurations
            </h2>
            <p className="text-zinc-500 text-[10px] font-condensed tracking-wider mt-1.5 uppercase">
              Update asset graphics mapped to external presentation viewports.
            </p>
          </div>

          <div className="space-y-6 relative z-10">
            <ImagePreviewBox
              label="Primary Spotlight View Asset (Image 1)"
              existingUrl={homeData?.frist_img}
              file={firstImg}
              onChange={setFirstImg}
            />
            <ImagePreviewBox
              label="Alternate Action Field Graphic (Image 2)"
              existingUrl={homeData?.second_img}
              file={secondImg}
              onChange={setSecondImg}
            />
          </div>
        </div>

        {/* Functional Stats Form Block */}
        <div className="bg-[#0a0d10] border border-white/5 rounded-2xl p-2 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-kh-pink/5 to-transparent pointer-events-none opacity-50" />
          <div className="relative z-10">
            <StatCardBlock stats={stats} onChange={handleStatChange} />
          </div>
        </div>
      </div>

      {/* Action Execution Footer Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="submit"
            disabled={isBusy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-kh-pink to-kh-pink-bright text-white font-condensed font-black text-[10px] tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(232,23,106,0.3)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            {isBusy ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {existingId ? "Save Profile Parameters" : "Publish Record Entry"}
          </button>

          {existingId && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900/50 border border-white/10 text-zinc-300 hover:text-white hover:bg-neutral-800 font-condensed font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer"
            >
              <X size={16} />
              Discard Changes
            </button>
          )}
        </div>

        {existingId && (
          <button
            type="button"
            disabled={isBusy}
            onClick={handleDelete}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 font-condensed font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer"
          >
            <Trash2 size={16} />
            Purge Database Node
          </button>
        )}
      </motion.div>
    </motion.form>
  );
}
