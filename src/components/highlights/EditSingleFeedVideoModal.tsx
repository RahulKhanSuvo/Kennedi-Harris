/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Award, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditSingleFeedVideoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  feedVideo: any;
  onSubmit: (data: { title: string; file: File | null }) => void;
  isPending: boolean;
}

export function EditSingleFeedVideoModal({
  isOpen,
  onOpenChange,
  feedVideo,
  onSubmit,
  isPending,
}: EditSingleFeedVideoModalProps) {
  // 💡 Initialize local state directly from props since the key below resets it automatically
  const [title, setTitle] = useState(feedVideo?.title || "");
  const [feedFile, setFeedFile] = useState<File | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      file: feedFile,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* 
        💡 Using feedVideo.id as a React key ensures that whenever a different 
        clip is loaded into the modal, the internal component state fully resets.
      */}
      <DialogContent
        key={feedVideo?.id || "no-feed-video"}
        className="bg-[#0c0c14] border-white/5 text-white rounded-2xl max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wider flex items-center gap-2">
            <Award className="text-kh-pink" size={18} />
            Edit Feed Clip
          </DialogTitle>
          <DialogDescription className="font-condensed text-xs uppercase tracking-wider text-zinc-500">
            Update the title banner or replace the video file for this feed item
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
              Clip Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aut cupiditate odit"
              disabled={isPending}
              required
              className="bg-neutral-900 border-white/10"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
              Replace Video File (Optional)
            </Label>
            <div className="relative h-9 rounded-md border border-white/10 bg-neutral-900/60 flex items-center px-3 cursor-pointer hover:border-white/20 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFeedFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isPending}
              />
              <span className="text-zinc-400 text-xs truncate">
                {feedFile ? feedFile.name : "Select new MP4 file to replace..."}
              </span>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-white/5 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_4px_20px_rgba(236,72,153,0.25)]"
            >
              {isPending && <Loader2 size={12} className="animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
