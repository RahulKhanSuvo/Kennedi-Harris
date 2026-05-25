import { useState } from "react";
import { highlightsService } from "@/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Film,
  Radio,
  Star,
  FileVideo,
  PlusCircle,
  Trash2,
  Layers,
} from "lucide-react";
import VideoFormRow from "./VideoFormRow";

interface LocalAsset {
  file: File;
  title: string;
  extra?: string; // Used exclusively for video_type strings
}

export default function CreateHighlight() {
  const queryClient = useQueryClient();
  const { createHighlight } = highlightsService;

  // Form Core Binary States
  const [mainVideo, setMainVideo] = useState<File | null>(null);
  const [primaryVideos, setPrimaryVideos] = useState<LocalAsset[]>([]);
  const [feedVideos, setFeedVideos] = useState<LocalAsset[]>([]);

  // Mutation Pipeline Configuration
  const { mutate: handleUpload, isPending } = useMutation({
    mutationFn: createHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      // Reset Form Matrix
      setMainVideo(null);
      setPrimaryVideos([]);
      setFeedVideos([]);
      alert("Highlight ecosystem cluster created successfully!");
    },
    onError: (err) => {
      console.error(err);
      alert("Ecosystem upload failure. Verify form parameters.");
    },
  });

  // Append Methods
  const addPrimaryVideo = (node: LocalAsset) =>
    setPrimaryVideos((prev) => [...prev, node]);
  const addFeedVideo = (node: LocalAsset) =>
    setFeedVideos((prev) => [...prev, node]);

  // Remove Handlers
  const removePrimaryVideo = (idx: number) =>
    setPrimaryVideos((prev) => prev.filter((_, i) => i !== idx));
  const removeFeedVideo = (idx: number) =>
    setFeedVideos((prev) => prev.filter((_, i) => i !== idx));

  // Form Submitting Pipeline Architecture
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainVideo) return alert("A Master Core Video asset is required.");

    const payload = new FormData();

    // 1. Append Master Video File Key
    payload.append("MainVideo_url", mainVideo);

    // 2. Map & Append Primary Videos matching exact Postman Form-Data indices
    primaryVideos.forEach((vid) => {
      payload.append("videos", vid.file);
      payload.append("video_name", vid.title);
      payload.append("video_type", vid.extra || "");
    });

    // 3. Map & Append Social Feed Videos matching exact Postman Form-Data indices
    feedVideos.forEach((feed) => {
      payload.append("feedVideos", feed.file);
      payload.append("title", feed.title);
    });

    handleUpload(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#050607] text-white p-6 lg:p-10 rounded-3xl border border-white/[0.02] relative shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-kh-pink/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Workspace Header Panel */}
      <div className="flex items-center gap-3 pb-6 mb-8 border-b border-white/5">
        <div className="p-3 bg-kh-pink/10 border border-kh-pink/20 text-kh-pink rounded-xl">
          <PlusCircle size={20} />
        </div>
        <div>
          <h2 className="font-display text-3xl uppercase tracking-tight">
            Deploy Asset Node
          </h2>
          <span className="font-condensed text-[10px] tracking-wider text-zinc-500 uppercase block mt-0.5">
            Compile modern media streams into database matrix
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* A. MASTER VIDEO FILE SLOT */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-kh-pink">
            <Star size={14} className="fill-current" />
            <h4 className="font-condensed text-xs font-black tracking-widest uppercase">
              Master core spotlight showcase *
            </h4>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900/10 border border-dashed border-white/10 hover:border-kh-pink/30 transition-all flex flex-col items-center justify-center text-center relative group">
            <input
              type="file"
              accept="video/mp4"
              required
              onChange={(e) => setMainVideo(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FileVideo
              size={32}
              className={`mb-2 ${mainVideo ? "text-kh-pink" : "text-zinc-600 group-hover:text-zinc-400"}`}
            />
            <span className="font-display text-sm uppercase tracking-wide text-white">
              {mainVideo ? mainVideo.name : "Upload Primary Master Component"}
            </span>
            <span className="font-condensed text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
              MP4 Container Formats Only
            </span>
          </div>
        </div>

        {/* B. PRIMARY VIDEO CLUSTER SECTION */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-sky-400">
            <Film size={14} />
            <h4 className="font-condensed text-xs font-black tracking-widest uppercase">
              Primary Media Clusters
            </h4>
          </div>

          {/* Staged Lists Previews */}
          {primaryVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {primaryVideos.map((vid, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-white/5 text-xs font-display uppercase tracking-wide"
                >
                  <div className="truncate pr-4">
                    <span className="text-sky-400 block font-condensed text-[9px] tracking-widest">
                      {vid.extra || "RAW"}
                    </span>
                    <span className="text-white block truncate">
                      {vid.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePrimaryVideo(idx)}
                    className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <VideoFormRow type="primary" onAdd={addPrimaryVideo} />
        </div>

        {/* C. SOCIAL FEED STREAM SECTION */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-amber-400">
            <Radio size={14} />
            <h4 className="font-condensed text-xs font-black tracking-widest uppercase">
              Social Feed Raw Cuts
            </h4>
          </div>

          {/* Staged Lists Previews */}
          {feedVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {feedVideos.map((feed, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-white/5 text-xs font-display uppercase tracking-wide"
                >
                  <div className="truncate pr-4">
                    <span className="text-amber-400 block font-condensed text-[9px] tracking-widest">
                      FEED INSTANCE
                    </span>
                    <span className="text-white block truncate">
                      {feed.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeedVideo(idx)}
                    className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <VideoFormRow type="feed" onAdd={addFeedVideo} />
        </div>

        {/* D. MASTER TRIGGER ENGINE BUTTON */}
        <div className="pt-6 border-t border-white/5">
          <button
            type="submit"
            disabled={isPending || !mainVideo}
            className="w-full flex items-center justify-center p-5 bg-white disabled:bg-neutral-900 text-black disabled:text-zinc-600 font-condensed font-black tracking-widest text-sm uppercase group hover:bg-kh-pink hover:text-white disabled:hover:bg-neutral-900 transition-all duration-300 rounded-lg cursor-pointer shadow-xl shadow-black/40"
          >
            <Layers size={16} className="mr-2" />
            {isPending
              ? "Executing Multi-part Deployment Pipeline..."
              : "Publish Highlight Collection"}
          </button>
        </div>
      </form>
    </div>
  );
}
