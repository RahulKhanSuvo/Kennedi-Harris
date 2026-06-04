/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const aboutSchema = zod.object({
  totalMajorReward: zod.string().min(1, "Major rewards count is required"),
  totalGamePlayed: zod.string().min(1, "Games played count is required"),
});

export type AboutFormValues = zod.infer<typeof aboutSchema>;

interface ImageField {
  key: string;
  label: string;
}

interface AboutFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  selectedAbout: any;
  isPending: boolean;
  imageFields: readonly ImageField[];
  previews: Record<string, string>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  onSubmit: (values: AboutFormValues) => void;
}

export function AboutFormModal({
  isOpen,
  onOpenChange,
  isEdit,
  isPending,
  imageFields,
  previews,
  onFileChange,
  onSubmit,
}: AboutFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#0c0c14] border-white/5 text-white max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl scrollbar-none">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
            {isEdit ? "Modify Biography Node" : "Deploy New About Record"}
          </DialogTitle>
          <DialogDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
            Populate profile analytics and load operational history parameters
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Statistics Grid Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="totalMajorReward"
                className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-bold"
              >
                Total Major Rewards
              </Label>
              <Input
                id="totalMajorReward"
                {...register("totalMajorReward")}
                placeholder="e.g. 5"
                disabled={isPending}
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus-visible:ring-kh-pink/40"
              />
              {errors.totalMajorReward && (
                <span className="text-red-400 font-mono text-[10px] uppercase block mt-1">
                  {errors.totalMajorReward.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="totalGamePlayed"
                className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-bold"
              >
                Total Games Played
              </Label>
              <Input
                id="totalGamePlayed"
                {...register("totalGamePlayed")}
                placeholder="e.g. 120"
                disabled={isPending}
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus-visible:ring-kh-pink/40"
              />
              {errors.totalGamePlayed && (
                <span className="text-red-400 font-mono text-[10px] uppercase block mt-1">
                  {errors.totalGamePlayed.message}
                </span>
              )}
            </div>
          </div>

          {/* Canvas Assets Configuration Block */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <Label className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-black">
              Milestone Image Tracks
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imageFields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <span className="font-condensed text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                    {field.label}
                  </span>
                  <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/40 flex flex-col items-center justify-center text-center cursor-pointer min-h-[145px] transition-colors group/upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onFileChange(e, field.key)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {previews[field.key] ? (
                      <div className="relative w-full h-[110px] rounded-lg overflow-hidden border border-white/5">
                        <img
                          src={previews[field.key]}
                          alt={field.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1.5 pointer-events-none">
                        <FileImage
                          size={22}
                          className="mx-auto text-zinc-700 group-hover/upload:text-kh-pink/60 transition-colors"
                        />
                        <p className="font-condensed text-[9px] font-black uppercase text-zinc-500 tracking-wider">
                          Upload Asset
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-8 border-t border-white/5 pt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 py-2 rounded-xl flex items-center gap-2 border-none shadow-[0_4px_20px_rgba(236,72,153,0.15)] cursor-pointer"
            >
              {isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : null}
              {isEdit ? "Update Node Block" : "Deploy Node Block"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
