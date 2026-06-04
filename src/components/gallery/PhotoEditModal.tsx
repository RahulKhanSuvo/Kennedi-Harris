"use client";

import { FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhotoEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  photoName: string;
  setPhotoName: (name: string) => void;
  photoType: string;
  setPhotoType: (type: string) => void;
  singlePhotoPreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export function PhotoEditModal({
  isOpen,
  onOpenChange,
  photoName,
  setPhotoName,
  photoType,
  setPhotoType,
  singlePhotoPreview,
  onFileChange,
  onSubmit,
  isPending,
}: PhotoEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0c0c14] border-white/5 text-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wide text-white">
            Edit Photo Asset
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="photoName"
              className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-bold"
            >
              Photo Label
            </Label>
            <Input
              id="photoName"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              required
              disabled={isPending}
              className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus-visible:ring-kh-pink/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-bold">
              Category
            </Label>
            <Select
              value={photoType}
              onValueChange={setPhotoType}
              disabled={isPending}
            >
              <SelectTrigger className="bg-neutral-900 border-white/10 text-xs text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action Shot</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="mentorship">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-condensed text-xs uppercase tracking-wider text-zinc-400 font-bold">
              Replacement File
            </Label>
            <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/30 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-colors group/upload">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                disabled={isPending}
              />
              {singlePhotoPreview ? (
                <div className="relative w-full h-[100px] rounded-lg overflow-hidden border border-white/5">
                  <img
                    src={singlePhotoPreview}
                    alt="Single Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="space-y-1.5 pointer-events-none">
                  <FileImage
                    size={20}
                    className="mx-auto text-zinc-700 group-hover/upload:text-kh-pink/60 transition-colors"
                  />
                  <p className="font-condensed text-[9px] font-black uppercase text-zinc-500 tracking-wider">
                    Upload Image
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-0">
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
              {isPending && <Loader2 size={12} className="animate-spin" />}
              Save Details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
