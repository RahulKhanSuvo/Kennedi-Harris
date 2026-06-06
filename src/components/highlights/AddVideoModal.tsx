/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { X, UploadCloud, Film, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAddNewVideo } from "@/hooks/useHighlights";
import { toast } from "sonner";

interface AddVideoModalProps {
  isOpen: string;
  onClose: () => void;
}

export function AddVideoModal({ isOpen, onClose }: AddVideoModalProps) {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useAddNewVideo();

  // Check if the actual hook is currently working through its server payload transition
  const isSubmitting = createMutation.isPending;

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("feedVideo", selectedFile);
      formData.append("title", title);

      createMutation.mutate(
        { formData, highlightId: isOpen },
        {
          onSuccess: () => {
            toast.success(" video added successfully!");
            setTitle("");
            setSelectedFile(null);
            onClose(); // Cleanly exit only when stream finishes
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to add feed video",
            );
          },
        },
      );
    } catch (error) {
      console.error("Failed to append feed video node:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={!isSubmitting ? onClose : undefined}
      />

      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in scale-in duration-200">
        <div className="px-6 py-4 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film size={16} className="text-kh-pink" />
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              ADD NEW VIDEO
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Feed Title Header Value
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Title"
              className="w-full h-10 px-3 bg-black/40 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-kh-pink/50 focus:ring-1 focus:ring-kh-pink/30 font-mono transition-all disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Feed Video Media Payload (.mp4, .mov)
            </label>

            <div
              onDragEnter={!isSubmitting ? handleDrag : undefined}
              onDragOver={!isSubmitting ? handleDrag : undefined}
              onDragLeave={!isSubmitting ? handleDrag : undefined}
              onDrop={!isSubmitting ? handleDrop : undefined}
              onClick={() => !isSubmitting && fileInputRef.current?.click()}
              className={`w-full py-8 px-4 rounded-xl border border-dashed flex flex-col items-center justify-center text-center transition-all ${
                isSubmitting
                  ? "cursor-not-allowed opacity-40 border-white/5"
                  : "cursor-pointer"
              } ${
                dragActive
                  ? "border-kh-pink bg-kh-pink/5"
                  : selectedFile
                    ? "border-cyan-500/40 bg-cyan-500/5"
                    : "border-white/10 bg-black/20 hover:bg-black/40 hover:border-white/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                required
                className="hidden"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />

              <div
                className={`p-3 rounded-xl mb-3 ${selectedFile ? "bg-cyan-500/10 text-cyan-400" : "bg-zinc-900 text-zinc-400"}`}
              >
                <UploadCloud
                  size={20}
                  className={
                    !selectedFile && dragActive && !isSubmitting
                      ? "animate-bounce"
                      : ""
                  }
                />
              </div>

              {selectedFile ? (
                <div className="space-y-1 max-w-full px-2">
                  <p className="font-mono text-xs text-white font-bold truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • READY
                    FOR APPEND
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-mono text-xs text-zinc-300 font-medium">
                    Click to browse or drop video clip asset here
                  </p>
                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                    Binary Multipart Buffer Node
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title || !selectedFile}
              className="font-mono text-xs uppercase tracking-wider h-9 bg-linear-to-r from-kh-pink to-rose-600 text-white font-bold min-w-[100px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <Loader2 size={13} className="animate-spin" /> Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
