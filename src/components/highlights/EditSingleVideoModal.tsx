/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Film, Loader2 } from "lucide-react";
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

interface EditSingleVideoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  video: any;
  onSubmit: (data: {
    video_name: string;
    video_type: string;
    file: File | null;
  }) => void;
  isPending: boolean;
}

export function EditSingleVideoModal({
  isOpen,
  onOpenChange,
  video,
  onSubmit,
  isPending,
}: EditSingleVideoModalProps) {
  // 💡 Initialize state directly from the video prop object.
  // We completely removed the useEffect block from here.
  const [videoName, setVideoName] = useState(video?.video_name || "");
  const [videoType, setVideoType] = useState(video?.video_type || "");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      video_name: videoName,
      video_type: videoType,
      file: videoFile,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* 
        💡 KEY TRICK: Passing the video ID (or a fallback string) as a key 
        forces React to recreate this DOM subtree and reset state variables 
        whenever a completely different video is selected for editing.
      */}
      <DialogContent
        key={video?.id || "no-video"}
        className="bg-kh-dark-2 border-white/5 text-white rounded-2xl max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wider flex items-center gap-2">
            <Film className="text-cyan-400" size={18} />
            Edit Video Clip
          </DialogTitle>
          <DialogDescription className="font-condensed text-xs uppercase tracking-wider text-zinc-500">
            Update attributes or replace the video file for this clip
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
              Video Name
            </Label>
            <Input
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="e.g. Zachary Everett"
              disabled={isPending}
              required
              className="bg-neutral-900 border-white/10"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
              Video Type
            </Label>
            <Input
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              placeholder="e.g. Highlight Tape"
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
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isPending}
              />
              <span className="text-zinc-400 text-xs truncate">
                {videoFile
                  ? videoFile.name
                  : "Select new MP4 file to replace..."}
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
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_4px_20px_rgba(6,182,212,0.25)]"
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
