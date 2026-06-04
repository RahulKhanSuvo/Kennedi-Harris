"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function GalleryDeleteModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isPending,
}: GalleryDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0c0c14] border-white/5 text-white rounded-2xl max-w-sm p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wider text-red-500 font-black">
            Confirm Purge
          </DialogTitle>
          <DialogDescription className="font-condensed text-xs uppercase tracking-wide text-zinc-400 mt-2 leading-relaxed">
            Are you absolutely sure you want to delete this Gallery? This will
            delete all containing photos. This pipeline action cannot be
            reverted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex flex-row justify-end gap-2.5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="rounded-xl border-white/5 bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white font-condensed uppercase tracking-wider text-xs px-4"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 font-condensed font-bold uppercase tracking-wider text-xs py-2 px-4 rounded-xl transition-all shadow-[0_4px_12px_rgba(239,68,68,0.1)] cursor-pointer"
          >
            {isPending ? "Purging Record..." : "Confirm Purge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
