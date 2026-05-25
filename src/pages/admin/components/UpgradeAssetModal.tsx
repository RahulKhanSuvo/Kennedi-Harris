import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { highlightsService } from "@/api/services";
import { X, FileVideo, Trash2, Layers } from "lucide-react";
import VideoFormRow from "./VideoFormRow";
import type { HighlightData } from "@/api/types";

interface LocalAsset {
  file: File;
  title: string;
  extra?: string;
}

interface UpgradeAssetModalProps {
  type: "MASTER" | "PRIMARY" | "FEED";
  existingData: HighlightData | undefined;
  onClose: () => void;
}

export default function UpgradeAssetModal({
  type,
  existingData,
  onClose,
}: UpgradeAssetModalProps) {
  const queryClient = useQueryClient();
  const { updateHighlight, createHighlight } = highlightsService;

  // Target States depending on configuration selection
  const [mainVideo, setMainVideo] = useState<File | null>(null);
  const [primaryVideos, setPrimaryVideos] = useState<LocalAsset[]>([]);
  const [feedVideos, setFeedVideos] = useState<LocalAsset[]>([]);

  const { mutate: handleUpgrade, isPending } = useMutation({
    mutationFn: (payload: FormData) => {
      if (existingData?._id) {
        return updateHighlight(existingData._id, payload);
      }
      return createHighlight(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      alert(`Successfully updated your ${type} assets.`);
      onClose();
    },
    onError: (err: unknown) => {
      console.error(err);
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const serverMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      alert(`Error: ${serverMsg}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();

    if (type === "MASTER") {
      if (!mainVideo)
        return alert("Please select a new Master core video asset.");
      payload.append("MainVideo_url", mainVideo);
    }

    if (type === "PRIMARY") {
      if (primaryVideos.length === 0)
        return alert("Add at least one Primary cluster asset node.");
      primaryVideos.forEach((vid) => {
        payload.append("videos", vid.file);
        payload.append("video_name", vid.title);
        payload.append("video_type", vid.extra || "");
      });
    }

    if (type === "FEED") {
      if (feedVideos.length === 0)
        return alert("Add at least one Social feed video node.");
      feedVideos.forEach((feed) => {
        payload.append("feedVideos", feed.file);
        payload.append("title", feed.title);
      });
    }

    handleUpgrade(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#090b0d] border border-white/10 rounded-2xl text-white shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h3 className="font-display text-xl uppercase tracking-wide">
              Update Panel: <span className="text-kh-pink">{type}</span>
            </h3>
            <p className="text-[10px] font-condensed tracking-wider text-zinc-400 uppercase mt-0.5">
              Target Node ID: {existingData?._id?.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Dynamic Form Segment */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar"
        >
          {/* CONDITION A: MASTER VIDEO */}
          {type === "MASTER" && (
            <div className="space-y-3">
              <label className="font-condensed text-xs font-black tracking-widest uppercase text-zinc-400 block">
                Replace Core Spotlight Stream *
              </label>
              <div className="p-8 rounded-xl bg-neutral-900/20 border border-dashed border-white/10 hover:border-kh-pink/40 transition-all flex flex-col items-center justify-center text-center relative group">
                <input
                  type="file"
                  accept="video/mp4"
                  required
                  onChange={(e) => setMainVideo(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FileVideo
                  size={36}
                  className={`mb-2 ${mainVideo ? "text-kh-pink" : "text-zinc-600 group-hover:text-zinc-400"}`}
                />
                <span className="font-display text-xs uppercase tracking-wide text-white truncate max-w-xs">
                  {mainVideo ? mainVideo.name : "Select New Master Component"}
                </span>
              </div>
            </div>
          )}

          {/* CONDITION B: PRIMARY MEDIA CLUSTERS */}
          {type === "PRIMARY" && (
            <div className="space-y-4">
              <label className="font-condensed text-xs font-black tracking-widest uppercase text-sky-400 block">
                Inject Primary Media Clusters
              </label>

              {primaryVideos.length > 0 && (
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {primaryVideos.map((vid, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-white/5 text-xs"
                    >
                      <div className="truncate">
                        <span className="text-sky-400 font-condensed text-[9px] block tracking-widest">
                          {vid.extra || "RAW"}
                        </span>
                        <span className="text-white font-display uppercase tracking-wide block truncate">
                          {vid.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPrimaryVideos((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        className="text-zinc-500 hover:text-rose-400 cursor-pointer p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <VideoFormRow
                type="primary"
                onAdd={(node) => setPrimaryVideos((prev) => [...prev, node])}
              />
            </div>
          )}

          {/* CONDITION C: SOCIAL FEED STREAMS */}
          {type === "FEED" && (
            <div className="space-y-4">
              <label className="font-condensed text-xs font-black tracking-widest uppercase text-amber-400 block">
                Inject Social Feed Component Rows
              </label>

              {feedVideos.length > 0 && (
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {feedVideos.map((feed, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-white/5 text-xs"
                    >
                      <div className="truncate">
                        <span className="text-amber-400 font-condensed text-[9px] block tracking-widest">
                          FEED
                        </span>
                        <span className="text-white font-display uppercase tracking-wide block truncate">
                          {feed.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFeedVideos((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        className="text-zinc-500 hover:text-rose-400 cursor-pointer p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <VideoFormRow
                type="feed"
                onAdd={(node) => setFeedVideos((prev) => [...prev, node])}
              />
            </div>
          )}

          {/* Form Action Controls Footer */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 border border-white/5 hover:bg-neutral-800 text-zinc-400 hover:text-white font-condensed font-bold tracking-wider text-xs uppercase rounded-md cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center px-5 py-2.5 bg-white hover:bg-kh-pink text-black hover:text-white font-condensed font-black tracking-wider text-xs uppercase rounded-md cursor-pointer transition-all disabled:opacity-40"
            >
              <Layers size={13} className="mr-1.5" />
              {isPending ? "Deploying Injection..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
